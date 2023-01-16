"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("oak-domain/lib/types");
var string_1 = require("oak-domain/lib/utils/string");
var uuid_1 = require("oak-domain/lib/utils/uuid");
exports.default = OakComponent({
    entity: 'user',
    projection: function (_a) {
        var _b, _c, _d;
        var props = _a.props;
        var entity = props.entity, entityId = props.entityId;
        var entityStr = (0, string_1.firstLetterUpperCase)(entity);
        return _b = {
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
                }
            },
            _b["user".concat(entityStr, "$user")] = {
                $entity: "user".concat(entityStr),
                data: (_c = {
                        id: 1,
                        userId: 1
                    },
                    _c["".concat(entity, "Id")] = 1,
                    _c.relation = 1,
                    _c),
                filter: (_d = {},
                    _d["".concat(entity, "Id")] = entityId,
                    _d),
            },
            _b.extraFile$entity = {
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
            _b;
    },
    filters: [
        // 由调用者注入oakFilter
        {
            filter: function (_a) {
                var _b;
                var features = _a.features, props = _a.props;
                var entityId = props.entityId, entity = props.entity, relations = props.relations;
                var entityStr = (0, string_1.firstLetterUpperCase)(entity);
                return {
                    id: {
                        $in: {
                            entity: "user".concat(entityStr),
                            data: {
                                userId: 1,
                            },
                            filter: (_b = {},
                                _b["".concat(entity, "Id")] = entityId,
                                _b.relation = {
                                    $in: relations,
                                },
                                _b),
                        },
                    },
                };
            },
        },
    ],
    isList: true,
    formData: function (_a) {
        var users = _a.data, props = _a.props, features = _a.features;
        var entity = props.entity, entityId = props.entityId;
        var entityStr = (0, string_1.firstLetterUpperCase)(entity);
        var filter = this.getFilterByName('fulltext');
        var pagination = this.getPagination();
        return {
            users: users === null || users === void 0 ? void 0 : users.map(function (ele) {
                var _a, _b;
                var mobile$user = ele.mobile$user, extraFile$entity = ele.extraFile$entity;
                var mobile = mobile$user && ((_a = mobile$user[0]) === null || _a === void 0 ? void 0 : _a.mobile);
                var relations = (_b = ele["user".concat(entityStr, "$user")]) === null || _b === void 0 ? void 0 : _b.filter(function (rt) { return rt["".concat(entity, "Id")] === entityId; }).map(function (rt2) { return rt2.relation; });
                var avatar = features.extraFile.getUrl(extraFile$entity && extraFile$entity[0]);
                var user2 = Object.assign({}, ele, {
                    mobile: mobile,
                    avatar: avatar,
                    relations: relations,
                });
                return user2;
            }),
            searchValue: (filter === null || filter === void 0 ? void 0 : filter.$text) && filter.$text.$search,
            pagination: pagination,
        };
    },
    properties: {
        entity: String,
        entityId: String,
        userIds: Array,
        relations: Array,
        redirectToAfterConfirm: Object,
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
    observers: {
        'entity,entityId': function (entity, entityId) {
            if (this.state.oakFullpath && entity && entityId) {
                this.refresh();
            }
        },
    },
    lifetimes: {},
    methods: {
        goUpsert: function () {
            var _a = this.props, entity = _a.entity, entityId = _a.entityId, relations = _a.relations, redirectToAfterConfirm = _a.redirectToAfterConfirm;
            this.navigateTo({
                url: '/userRelation/upsert',
                entity: entity,
                entityId: entityId,
                redirectToAfterConfirm: redirectToAfterConfirm,
            }, {
                relations: relations,
            });
        },
        goUpdate: function (id) {
            var _a = this.props, entity = _a.entity, entityId = _a.entityId, relations = _a.relations;
            this.navigateTo({
                url: '/userRelation/upsert/byUser',
                entity: entity,
                entityId: entityId,
                oakId: id,
            }, {
                relations: relations,
            });
        },
        confirmDelete: function (idRemove) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, entity, entityId, entityStr, users, user, relations, err_1;
                var _b;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.props, entity = _a.entity, entityId = _a.entityId;
                            entityStr = (0, string_1.firstLetterUpperCase)(entity);
                            users = this.state.users;
                            user = users.find(function (ele) { return ele.id === idRemove; });
                            relations = user["user".concat(entityStr, "$user")];
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 4]);
                            this.updateItem((_b = {},
                                _b["user".concat(entityStr, "$user")] = [
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
                                _b), idRemove, 'revoke');
                            return [4 /*yield*/, this.execute()];
                        case 2:
                            _c.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _c.sent();
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
            var _a = this.props, entity = _a.entity, entityId = _a.entityId, relations = _a.relations, redirectToAfterConfirm = _a.redirectToAfterConfirm;
            var mode = e.detail.item.mode;
            if (mode === 'byMobile') {
                this.navigateTo({
                    url: '/userRelation/upsert/byMobile',
                    entity: entity,
                    entityId: entityId,
                    relations: relations,
                });
            }
            else {
                this.navigateTo({
                    url: '/userRelation/upsert/byUserEntityGrant',
                    entity: entity,
                    entityId: entityId,
                    relations: relations,
                    redirectToAfterConfirm: redirectToAfterConfirm,
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
            var _a = this.props, entity = _a.entity, entityId = _a.entityId, relations = _a.relations;
            var id = e.currentTarget.dataset.id;
            this.navigateTo({
                url: '/userRelation/upsert/onUser',
                oakId: id,
                entity: entity,
                entityId: entityId,
                relations: relations,
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
