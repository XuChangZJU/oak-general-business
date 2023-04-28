import { OakUserUnpermittedException } from 'oak-domain/lib/types';
import { difference, intersection } from 'oak-domain/lib/utils/lodash';
import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';
import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { EntityDict } from '../../../general-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base/lib/types/Page';

export default OakComponent({
    entity: 'user',
    projection() {
        const { entity, entityId } = this.props;
        const entityStr = firstLetterUpperCase(entity!);
        return {
            id: 1,
            name: 1,
            nickname: 1,
            mobile$user: {
                $entity: 'mobile',
                data: {
                    id: 1,
                    userId: 1,
                    mobile: 1,
                },
            },
            [`user${entityStr}$user`]: {
                $entity: `user${entityStr}`,
                data: {
                    id: 1,
                    userId: 1,
                    [`${entity}Id`]: 1,
                    relation: 1,
                },
                filter: {
                    [`${entity}Id`]: entityId,
                },
            },
            extraFile$entity: {
                $entity: 'extraFile',
                data: {
                    id: 1,
                    tag1: 1,
                    origin: 1,
                    bucket: 1,
                    objectId: 1,
                    filename: 1,
                    extra1: 1,
                    type: 1,
                    entity: 1,
                    entityId: 1,
                    extension: 1,
                },
                filter: {
                    tag1: 'avatar',
                },
                indexFrom: 0,
                count: 1,
            },
        } as EntityDict['user']['Selection']['data'];
    },
    filters: [
        {
            filter() {
                const { entityId, entity } = this.props;
                const { relationss } = this.state;
                const relationEntity = `user${firstLetterUpperCase(entity!)}`;
                const filter = {
                    [`${entity}Id`]: entityId,
                    relation: {
                        $in: relationss,
                    },
                };
                return {
                    id: {
                        $in: {
                            entity: relationEntity,
                            data: {
                                userId: 1,
                            },
                            filter,
                        },
                    },
                };
            },
        },
    ],
    isList: true,
    formData({ data: users, props, features }) {
        const { entity, entityId } = props;
        const entityStr = firstLetterUpperCase(entity!);
        const filter = this.getFilterByName('fulltext');
        const pagination = this.getPagination();
        return {
            users: users?.map((ele: any) => {
                const { mobile$user, extraFile$entity } = ele;
                const mobile = mobile$user && mobile$user[0]?.mobile;
                const relations = ele[`user${entityStr}$user`]
                    ?.filter((rt: any) => rt[`${entity}Id`] === entityId)
                    .map((rt2: any) => rt2.relation);
                const avatar = features.extraFile.getUrl(
                    extraFile$entity && extraFile$entity[0]
                );
                const user2 = Object.assign({}, ele, {
                    mobile,
                    avatar,
                    relations,
                });
                return user2;
            }),
            searchValue: filter?.$text && filter.$text.$search,
            pagination,
        };
    },
    properties: {
        entity: '' as keyof EntityDict,
        entityId: '',
        relations: [] as string[],
        redirectToAfterConfirm: {} as EntityDict['userEntityGrant']['Schema']['redirectTo'],
        qrCodeType: '' as string,
    },
    data: {
        searchValue: '',
        showActionSheet: false,
        itemList: [
            {
                name: '从现有人员中选择（通过手机号）',
                mode: 'byMobile',
            },
            {
                name: '通过分享二维码',
                mode: 'byQrCode',
            },
        ],
        idRemoveMp: '',
        relationss: [] as string[],
    },
    listeners: {
        'entity,entityId'(prev, next) {
            if (this.state.oakFullpath) {
                if (prev.entity !== next.entity || prev.entityId !== next.entityId) {
                    this.refresh();
                }
            }
        },
        relations(prev, next) {
            if (this.state.oakFullpath && (prev.relations.length !== next.relations.length || difference(prev.relations, next.relations).length > 0)) {
                this.calcRelations();
                this.refresh();
            }
        }
    },
    lifetimes: {
        attached() {
            this.calcRelations();
        },
        ready() {
            //console.log('ready', this.props.relations);
        },
    },
    methods: {
        calcRelations() {
            const { relations, entity, entityId } = this.props;
            if (relations && relations.length > 0) {
                // 这里小程序肯定会传入空数组，很恶心
                this.setState({
                    relationss: relations,
                });
            }
            else {
                if (this.features.token.isRoot()) {
                    const schema = this.features.cache.getSchema();
                    const legalRelations = schema![entity as keyof EntityDict].relation!;
                    this.setState({
                        relationss: legalRelations,
                    });
                }
                else {
                    const userId = this.features.token.getUserId();
                    throw new Error('待实现');
                    /* const legalRelations = this.features.relation.getLegalRelations(entity as keyof EntityDict, userId!, entityId!);

                    this.setState({
                        relationss: legalRelations as string[] | undefined,
                    }); */
                }

            }
        },
        goUpsert() {
            const {
                entity,
                entityId,
                redirectToAfterConfirm,
                qrCodeType,
            } = this.props;
            const { relationss } = this.state;
            this.navigateTo(
                {
                    url: '/userRelation/upsert',
                    entity,
                    entityId,
                    redirectToAfterConfirm,
                    qrCodeType,
                },
                {
                    relations: relationss,
                }
            );
        },
        goUpdate(id: string) {
            const { entity, entityId } = this.props;
            const { relationss } = this.state;
            this.navigateTo(
                {
                    url: '/userRelation/upsert/byUser',
                    entity,
                    entityId,
                    oakId: id,
                },
                {
                    relations: relationss,
                }
            );
        },
        async confirmDelete(idRemove: string) {
            const { entity, entityId } = this.props;
            const entityStr = firstLetterUpperCase(entity!);
            const { users } = this.state;
            const user = users.find((ele: any) => ele.id === idRemove);
            const relations = user[`user${entityStr}$user`];
            try {
                this.updateItem(
                    {
                        [`user${entityStr}$user`]: [
                            {
                                id: generateNewId(),
                                action: 'remove',
                                data: {},
                                filter: {
                                    id: {
                                        $in: relations.map(
                                            (ele: any) => ele.id
                                        ),
                                    },
                                },
                            },
                        ],
                    },
                    idRemove,
                    'revoke'
                );
                await this.execute();
            } catch (err) {
                if (err instanceof OakUserUnpermittedException) {
                    this.setMessage({
                        type: 'error',
                        content: err.message,
                    });
                    return;
                }
            }
        },

        searchChangeMp(event: WechatMiniprogram.Input) {
            const { value } = event.detail;
            this.addNamedFilter({
                filter: {
                    $text: {
                        $search: value,
                    },
                },
                '#name': 'fulltext',
            });
        },

        searchCancelMp() {
            this.removeNamedFilterByName('fulltext', true);
        },

        searchConfirmMp() {
            this.refresh();
        },

        chooseActionMp(e: WechatMiniprogram.TouchEvent) {
            const {
                entity,
                entityId,
                redirectToAfterConfirm,
                qrCodeType,
            } = this.props;
            const { relationss } = this.state;
            const {
                item: { mode },
            } = e.detail;
            if (mode === 'byMobile') {
                this.navigateTo({
                    url: '/userRelation/upsert/byMobile',
                    entity,
                    entityId,
                    relations: relationss,
                });
            } else {
                this.navigateTo({
                    url: '/userRelation/upsert/byUserEntityGrant',
                    entity,
                    entityId,
                    relations: relationss,
                    redirectToAfterConfirm,
                    qrCodeType,
                });
            }
        },

        cancelActionMp(e: any) {
            this.setState({
                showActionSheet: false,
            });
        },

        showActionSheetMp() {
            this.setState({
                showActionSheet: true,
            });
        },

        onItemTapMp(e: WechatMiniprogram.TouchEvent) {
            const { entity, entityId } = this.props;
            const { relationss } = this.state;
            const { id } = e.currentTarget.dataset;
            this.navigateTo({
                url: '/userRelation/upsert/onUser',
                oakId: id,
                entity,
                entityId,
                relations: relationss,
            });
        },

        onDeleteMp(e: WechatMiniprogram.TouchEvent) {
            const { id } = e.currentTarget.dataset;
            this.setState({
                idRemoveMp: id,
            });
        },

        cancelDeleteMp() {
            this.setState({
                idRemoveMp: '',
            });
        },

        async confirmDeleteMp() {
            const { idRemoveMp } = this.state;
            try {
                await this.confirmDelete(idRemoveMp);
            } catch (err) {
                this.setState({
                    idRemoveMp: '',
                });
                if (err instanceof OakUserUnpermittedException) {
                    this.setMessage({
                        type: 'error',
                        content: err.message,
                    });
                    return;
                }
            }
            this.setState({
                idRemoveMp: '',
            });
        },
    },
}) as <ED2 extends EntityDict & BaseEntityDict, T2 extends keyof ED2>(
    props: ReactComponentProps<
        ED2,
        T2,
        true,
        {
            entity: keyof ED2,
            entityId: string,
            relations: string[],
            redirectToAfterConfirm: EntityDict['userEntityGrant']['Schema']['redirectTo'],
            qrCodeType: string,
        }
    >
) => React.ReactElement;
