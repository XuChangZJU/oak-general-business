"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("oak-domain/lib/types");
const string_1 = require("oak-domain/lib/utils/string");
const uuid_1 = require("oak-domain/lib/utils/uuid");
const assert_1 = require("oak-domain/lib/utils/assert");
exports.default = OakComponent({
    entity: 'user',
    projection() {
        const userId = this.features.token.getUserId();
        const isRoot = this.features.token.isRoot();
        (0, assert_1.assert)(userId);
        const { entity, entityId } = this.props;
        const userRelationFilter = {
            entity: entity,
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
                }
            };
        }
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
                                        }
                                    }
                                }
                            }
                        }
                    }
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
        };
    },
    filters: [
        {
            filter() {
                const userId = this.features.token.getUserId();
                const isRoot = this.features.token.isRoot();
                const { entityId, entity } = this.props;
                const filter = {
                    entity,
                    entityId,
                };
                if (!isRoot) {
                    filter.relation = {
                        relationAuth$destRelation: {
                            sourceRelation: {
                                userRelation$relation: {
                                    userId,
                                }
                            }
                        }
                    };
                    /* filter.relationId = {
                        $in: {
                            entity: 'relationAuth',
                            data: {
                                destRelationId: 1,
                            },
                            filter: {
                                sourceRelationId: {
                                    $in: {
                                        entity: 'userRelation',
                                        data: {
                                            relationId: 1,
                                        },
                                        filter: {
                                            userId,
                                        },
                                    },
                                },
                            },
                        },
                    }; */
                }
                return {
                    userRelation$user: filter,
                    /* id: {
                        $in: {
                            entity: 'userRelation',
                            data: {
                                userId: 1,
                            },
                            filter,
                        },
                    }, */
                };
            },
        },
    ],
    isList: true,
    formData({ data: users, props, features }) {
        const { entity, entityId } = props;
        const filter = this.getFilterByName('fulltext');
        return {
            users: users?.map((ele) => {
                const { mobile$user, extraFile$entity } = ele;
                const mobile = mobile$user && mobile$user[0]?.mobile;
                const avatar = features.extraFile.getUrl(extraFile$entity && extraFile$entity[0]);
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
        entity: '',
        entityId: '',
        redirectToAfterConfirm: {},
        claimUrl: '',
        qrCodeType: '',
        onUpdate: (id) => { },
        onCreate: () => { },
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
            const { entity, entityId, redirectToAfterConfirm, qrCodeType, claimUrl, onCreate, } = this.props;
            if (onCreate) {
                onCreate();
            }
            else {
                if (process.env.NODE_ENV === 'development') {
                    console.warn('userRelation将不再作为page直接使用，请使用回调函数处理');
                }
                this.navigateTo({
                    url: '/userRelation/upsert',
                    entity,
                    entityId,
                }, {
                    redirectToAfterConfirm,
                    qrCodeType,
                    claimUrl,
                });
            }
        },
        goUpdate(id) {
            const { entity, entityId, onUpdate } = this.props;
            if (onUpdate) {
                onUpdate(id);
            }
            else {
                if (process.env.NODE_ENV === 'development') {
                    console.warn('userRelation将不再作为page直接使用，请使用回调函数处理');
                }
                this.navigateTo({
                    url: '/userRelation/upsert/byUser',
                    entity,
                    entityId,
                    oakId: id,
                });
            }
        },
        async confirmDelete(idRemove) {
            const { entity, entityId } = this.props;
            const entityStr = (0, string_1.firstLetterUpperCase)(entity);
            const { users } = this.state;
            const user = users.find((ele) => ele.id === idRemove);
            const relations = user.userRelation$user;
            try {
                this.updateItem({
                    userRelation$user: [
                        {
                            id: (0, uuid_1.generateNewId)(),
                            action: 'remove',
                            data: {},
                            filter: {
                                id: {
                                    $in: relations.map((ele) => ele.id),
                                },
                            },
                        },
                    ],
                }, idRemove, 'revoke');
                await this.execute();
            }
            catch (err) {
                if (err instanceof types_1.OakUserUnpermittedException) {
                    this.setMessage({
                        type: 'error',
                        content: err.message,
                    });
                    return;
                }
            }
        },
        searchChangeMp(event) {
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
        chooseActionMp(e) {
            const { entity, entityId, redirectToAfterConfirm, qrCodeType, } = this.props;
            const { item: { mode }, } = e.detail;
            if (mode === 'byMobile') {
                this.navigateTo({
                    url: '/userRelation/upsert/byMobile',
                    entity,
                    entityId,
                });
            }
            else {
                this.navigateTo({
                    url: '/userRelation/upsert/byUserEntityGrant',
                    entity,
                    entityId,
                    redirectToAfterConfirm,
                    qrCodeType,
                });
            }
        },
        cancelActionMp(e) {
            this.setState({
                showActionSheet: false,
            });
        },
        showActionSheetMp() {
            this.setState({
                showActionSheet: true,
            });
        },
        onItemTapMp(e) {
            const { entity, entityId } = this.props;
            const { id } = e.currentTarget.dataset;
            this.navigateTo({
                url: '/userRelation/upsert/byUser',
                oakId: id,
                entity,
                entityId,
            });
        },
        onDeleteMp(e) {
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
            }
            catch (err) {
                this.setState({
                    idRemoveMp: '',
                });
                if (err instanceof types_1.OakUserUnpermittedException) {
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
});
