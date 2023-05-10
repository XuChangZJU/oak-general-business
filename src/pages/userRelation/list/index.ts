import { OakUserUnpermittedException } from 'oak-domain/lib/types';
import { difference, intersection } from 'oak-domain/lib/utils/lodash';
import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';
import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { EntityDict } from '../../../general-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base/lib/types/Page';
import assert from 'assert';

export default OakComponent({
    entity: 'user',
    projection() {
        const userId = this.features.token.getUserId();
        assert(userId);
        const { entity, entityId } = this.props;
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
            userRelation$user: {
                $entity: 'userRelation',
                data: {
                    id: 1,
                    entity: 1,
                    entityId: 1,
                    relationId: 1,
                    relation: {
                        id: 1,
                        name: 1,
                        display: 1,
                    }
                },
                filter: {
                    entity: entity as string,
                    entityId,
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
                const filter = {
                    entity,
                    entityId,
                };
                return {
                    id: {
                        $in: {
                            entity: 'userRelation',
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
        const filter = this.getFilterByName('fulltext');
        const pagination = this.getPagination();
        return {
            users: users?.map((ele: any) => {
                const { mobile$user, extraFile$entity } = ele;
                const mobile = mobile$user && mobile$user[0]?.mobile;
                const avatar = features.extraFile.getUrl(
                    extraFile$entity && extraFile$entity[0]
                );
                const user2 = Object.assign({}, ele, {
                    mobile,
                    avatar,
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
    },
    listeners: {
        'entity,entityId'(prev, next) {
            if (this.state.oakFullpath) {
                if (prev.entity !== next.entity || prev.entityId !== next.entityId) {
                    this.refresh();
                }
            }
        },
    },
    lifetimes: {
        attached() {
            // this.calcRelations();
        },
        ready() {
            // console.log('ready', this.props.relations);
        },
    },
    methods: {
        goUpsert() {
            const {
                entity,
                entityId,
                redirectToAfterConfirm,
                qrCodeType,
            } = this.props;
            this.navigateTo(
                {
                    url: '/userRelation/upsert',
                    entity,
                    entityId,
                },
                {
                    redirectToAfterConfirm,
                    qrCodeType,
                }
            );
        },
        goUpdate(id: string) {
            const { entity, entityId } = this.props;
            this.navigateTo(
                {
                    url: '/userRelation/upsert/byUser',
                    entity,
                    entityId,
                    oakId: id,
                },
            );
        },
        async confirmDelete(idRemove: string) {
            const { entity, entityId } = this.props;
            const entityStr = firstLetterUpperCase(entity!);
            const { users } = this.state;
            const user = users.find((ele: any) => ele.id === idRemove);
            const relations = user.userRelation$user;
            try {
                this.updateItem(
                    {
                        userRelation$user: [
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
            const {
                item: { mode },
            } = e.detail;
            if (mode === 'byMobile') {
                this.navigateTo({
                    url: '/userRelation/upsert/byMobile',
                    entity,
                    entityId,
                });
            } else {
                this.navigateTo({
                    url: '/userRelation/upsert/byUserEntityGrant',
                    entity,
                    entityId,
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
            const { id } = e.currentTarget.dataset;
            this.navigateTo({
                url: '/userRelation/upsert/onUser',
                oakId: id,
                entity,
                entityId,
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
