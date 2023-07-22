"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("oak-domain/lib/types");
var string_1 = require("oak-domain/lib/utils/string");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var assert_1 = tslib_1.__importDefault(require("assert"));
exports.default = OakComponent({
    entity: 'user',
    projection: function () {
        var userId = this.features.token.getUserId();
        var isRoot = this.features.token.isRoot();
        (0, assert_1.default)(userId);
        var _a = this.props, entity = _a.entity, entityId = _a.entityId;
        var userRelationFilter = {
            entity: entity,
            entityId: entityId,
        };
        if (!isRoot) {
            userRelationFilter.relation = {
                relationAuth$destRelation: {
                    sourceRelation: {
                        userRelation$relation: {
                            userId: userId,
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
                    relationId: 1,
                    relation: {
                        id: 1,
                        name: 1,
                        display: 1,
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
            filter: function () {
                var userId = this.features.token.getUserId();
                var isRoot = this.features.token.isRoot();
                var _a = this.props, entityId = _a.entityId, entity = _a.entity;
                var filter = {
                    entity: entity,
                    entityId: entityId,
                };
                if (!isRoot) {
                    filter.relation = {
                        relationAuth$destRelation: {
                            sourceRelation: {
                                userRelation$relation: {
                                    userId: userId,
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
    formData: function (_a) {
        var users = _a.data, props = _a.props, features = _a.features;
        var entity = props.entity, entityId = props.entityId;
        var filter = this.getFilterByName('fulltext');
        var pagination = this.getPagination();
        return {
            users: users === null || users === void 0 ? void 0 : users.map(function (ele) {
                var _a;
                var mobile$user = ele.mobile$user, extraFile$entity = ele.extraFile$entity;
                var mobile = mobile$user && ((_a = mobile$user[0]) === null || _a === void 0 ? void 0 : _a.mobile);
                var avatar = features.extraFile.getUrl(extraFile$entity && extraFile$entity[0]);
                var user2 = Object.assign({}, ele, {
                    mobile: mobile,
                    avatar: avatar,
                });
                return user2;
            }),
            searchValue: (filter === null || filter === void 0 ? void 0 : filter.$text) && filter.$text.$search,
            pagination: pagination,
        };
    },
    properties: {
        entity: '',
        entityId: '',
        redirectToAfterConfirm: {},
        qrCodeType: '',
        showTitle: true,
        showBack: false,
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
        'entity,entityId': function (prev, next) {
            if (this.state.oakFullpath) {
                if (prev.entity !== next.entity || prev.entityId !== next.entityId) {
                    this.refresh();
                }
            }
        },
    },
    lifetimes: {
        attached: function () {
            // this.calcRelations();
        },
        ready: function () {
            // console.log('ready', this.props.relations);
        },
    },
    methods: {
        goUpsert: function () {
            var _a = this.props, entity = _a.entity, entityId = _a.entityId, redirectToAfterConfirm = _a.redirectToAfterConfirm, qrCodeType = _a.qrCodeType;
            this.navigateTo({
                url: '/userRelation/upsert',
                entity: entity,
                entityId: entityId,
            }, {
                redirectToAfterConfirm: redirectToAfterConfirm,
                qrCodeType: qrCodeType,
            });
        },
        goUpdate: function (id) {
            var _a = this.props, entity = _a.entity, entityId = _a.entityId;
            this.navigateTo({
                url: '/userRelation/upsert/byUser',
                entity: entity,
                entityId: entityId,
                oakId: id,
            });
        },
        confirmDelete: function (idRemove) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, entity, entityId, entityStr, users, user, relations, err_1;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.props, entity = _a.entity, entityId = _a.entityId;
                            entityStr = (0, string_1.firstLetterUpperCase)(entity);
                            users = this.state.users;
                            user = users.find(function (ele) { return ele.id === idRemove; });
                            relations = user.userRelation$user;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            this.updateItem({
                                userRelation$user: [
                                    {
                                        id: (0, uuid_1.generateNewId)(),
                                        action: 'remove',
                                        data: {},
                                        filter: {
                                            id: {
                                                $in: relations.map(function (ele) { return ele.id; }),
                                            },
                                        },
                                    },
                                ],
                            }, idRemove, 'revoke');
                            return [4 /*yield*/, this.execute()];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _b.sent();
                            if (err_1 instanceof types_1.OakUserUnpermittedException) {
                                this.setMessage({
                                    type: 'error',
                                    content: err_1.message,
                                });
                                return [2 /*return*/];
                            }
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        searchChangeMp: function (event) {
            var value = event.detail.value;
            this.addNamedFilter({
                filter: {
                    $text: {
                        $search: value,
                    },
                },
                '#name': 'fulltext',
            });
        },
        searchCancelMp: function () {
            this.removeNamedFilterByName('fulltext', true);
        },
        searchConfirmMp: function () {
            this.refresh();
        },
        chooseActionMp: function (e) {
            var _a = this.props, entity = _a.entity, entityId = _a.entityId, redirectToAfterConfirm = _a.redirectToAfterConfirm, qrCodeType = _a.qrCodeType;
            var mode = e.detail.item.mode;
            if (mode === 'byMobile') {
                this.navigateTo({
                    url: '/userRelation/upsert/byMobile',
                    entity: entity,
                    entityId: entityId,
                });
            }
            else {
                this.navigateTo({
                    url: '/userRelation/upsert/byUserEntityGrant',
                    entity: entity,
                    entityId: entityId,
                    redirectToAfterConfirm: redirectToAfterConfirm,
                    qrCodeType: qrCodeType,
                });
            }
        },
        cancelActionMp: function (e) {
            this.setState({
                showActionSheet: false,
            });
        },
        showActionSheetMp: function () {
            this.setState({
                showActionSheet: true,
            });
        },
        onItemTapMp: function (e) {
            var _a = this.props, entity = _a.entity, entityId = _a.entityId;
            var id = e.currentTarget.dataset.id;
            this.navigateTo({
                url: '/userRelation/upsert/onUser',
                oakId: id,
                entity: entity,
                entityId: entityId,
            });
        },
        onDeleteMp: function (e) {
            var id = e.currentTarget.dataset.id;
            this.setState({
                idRemoveMp: id,
            });
        },
        cancelDeleteMp: function () {
            this.setState({
                idRemoveMp: '',
            });
        },
        confirmDeleteMp: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var idRemoveMp, err_2;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            idRemoveMp = this.state.idRemoveMp;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.confirmDelete(idRemoveMp)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_2 = _a.sent();
                            this.setState({
                                idRemoveMp: '',
                            });
                            if (err_2 instanceof types_1.OakUserUnpermittedException) {
                                this.setMessage({
                                    type: 'error',
                                    content: err_2.message,
                                });
                                return [2 /*return*/];
                            }
                            return [3 /*break*/, 4];
                        case 4:
                            this.setState({
                                idRemoveMp: '',
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
