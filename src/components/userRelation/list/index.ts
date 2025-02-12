import { OakUserUnpermittedException } from 'oak-domain/lib/types';
import { difference, intersection } from 'oak-domain/lib/utils/lodash';
import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';
import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { EntityDict } from '../../../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base';
import { assert } from 'oak-domain/lib/utils/assert';

export default OakComponent({
    entity: 'user',
    projection() {
        const userId = this.features.token.getUserId();
        const isRoot = this.features.token.isRoot();
        assert(userId);
        const { entity, entityId } = this.props;
        const userRelationFilter: EntityDict['userRelation']['Selection']['filter'] =
            {
                entity: entity as string,
                entityId,
            };
        if (!isRoot) {
            userRelationFilter.relation = {
                relationAuth$destRelation: {
                    sourceRelation: {
                        userRelation$relation: {
                            userId,
                        },
                    },
                },
            };
        }
        return {
            id: 1,
            $$createAt$$: 1,
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
                    userId: 1,
                    relationId: 1,
                    relation: {
                        id: 1,
                        name: 1,
                        display: 1,
                        relationAuth$destRelation: {
                            $entity: 'relationAuth',
                            data: {
                                id: 1,
                                sourceRelation: {
                                    userRelation$relation: {
                                        $entity: 'userRelation',
                                        data: {
                                            id: 1,
                                            userId: 1,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                filter: userRelationFilter,
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
                    sort: 1,
                },
                filter: {
                    tag1: 'avatar',
                },
                indexFrom: 0,
                count: 1,
            },
        } as EntityDict['user']['Selection']['data'];
    },
    sorters: [
        {
            sorter() {
                return {
                    $attr: {
                        $$createAt$$: 1,
                    },
                    $direction: 'desc',
                };
            },
        },
    ],
    filters: [
        {
            filter() {
                const userId = this.features.token.getUserId();
                const isRoot = this.features.token.isRoot();
                const { entityId, entity } = this.props;
                const filter: EntityDict['userRelation']['Selection']['filter'] =
                    {
                        entity,
                        entityId,
                    };
                if (!isRoot) {
                    filter.relation = {
                        relationAuth$destRelation: {
                            sourceRelation: {
                                userRelation$relation: {
                                    userId,
                                },
                            },
                        },
                    };
                }
                return {
                    userRelation$user: filter,
                };
            },
        },
    ],
    isList: true,
    formData({ data: rows, props, features }) {
        const { entity, entityId } = props;
        const filter = this.getFilterByName('fulltext');
        const users = props.disableDisplay
            ? rows?.filter((ele) => {
                  const userRelations = ele.userRelation$user?.filter(
                      (ele) => !ele.$$deleteAt$$
                  );
                  return !!(userRelations && userRelations.length > 0);
              })
            : rows;
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
        };
    },
    properties: {
        entity: '' as keyof EntityDict,
        entityId: '',
        redirectToAfterConfirm:
            {} as EntityDict['userEntityGrant']['Schema']['redirectTo'],
        claimUrl: '',
        qrCodeType: '',
        onUpdate: (id: string) => {},
        onCreate: () => {},
        disableDisplay: false,
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
                if (
                    prev.entity !== next.entity ||
                    prev.entityId !== next.entityId
                ) {
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
                claimUrl,
                onCreate,
            } = this.props;
            if (onCreate) {
                onCreate();
            } else {
                if (process.env.NODE_ENV === 'development') {
                    console.warn(
                        'userRelation将不再作为page直接使用，请使用回调函数处理'
                    );
                }
                this.navigateTo(
                    {
                        url: '/userRelation/upsert',
                        entity,
                        entityId,
                    },
                    {
                        redirectToAfterConfirm,
                        qrCodeType,
                        claimUrl,
                    }
                );
            }
        },
        goUpdate(id: string) {
            const { entity, entityId, onUpdate } = this.props;
            if (onUpdate) {
                onUpdate(id);
            } else {
                if (process.env.NODE_ENV === 'development') {
                    console.warn(
                        'userRelation将不再作为page直接使用，请使用回调函数处理'
                    );
                }
                this.navigateTo({
                    url: '/userRelation/upsert/byUser',
                    entity,
                    entityId,
                    oakId: id,
                });
            }
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
            const { entity, entityId, redirectToAfterConfirm, qrCodeType } =
                this.props;
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
                url: '/userRelation/upsert/byUser',
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
            entity: keyof ED2;
            entityId: string;
            redirectToAfterConfirm: ED2['userEntityGrant']['Schema']['redirectTo'];
            qrCodeType: string;
            showTitle: true;
            showBack: false;
            onCreate: () => void;
            onUpdate: (id: string) => void;
            disableDisplay: false;
        }
    >
) => React.ReactElement;
