"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var string_1 = require("oak-domain/lib/utils/string");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var react_1 = tslib_1.__importDefault(require("../../../utils/react"));
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
                    _d)
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
                var entityId = props.entityId, entity = props.entity;
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
                                _b),
                        },
                    },
                };
            },
        },
    ],
    isList: true,
    formData: function (_a) {
        var _b;
        var users = _a.data, props = _a.props, features = _a.features;
        var entity = props.entity, entityId = props.entityId;
        var entityStr = (0, string_1.firstLetterUpperCase)(entity);
        var filter = this.getFilterByName('name');
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
            searchValue: (filter === null || filter === void 0 ? void 0 : filter.$or) &&
                ((_b = filter.$or[0]) === null || _b === void 0 ? void 0 : _b.name.$includes),
            pagination: pagination,
        };
    },
    properties: {
        entity: String,
        entityId: String,
        userIds: Array,
        relations: Array,
    },
    data: {
        searchValue: '',
    },
    lifetimes: {
        created: function () {
            if (process.env.OAK_PLATFORM === 'web') {
                this.tableRef = react_1.default.createRef();
                this.editMap = {};
                this.currentSaveId = '';
            }
        },
    },
    methods: {
        goUpsert: function () {
            var _a = this.props, entity = _a.entity, entityId = _a.entityId, relations = _a.relations;
            this.navigateTo({
                url: '/userRelation/upsert',
                entity: entity,
                entityId: entityId,
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
                var _a, entity, entityId, entityStr, users, user, relations;
                var _b;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.props, entity = _a.entity, entityId = _a.entityId;
                            entityStr = (0, string_1.firstLetterUpperCase)(entity);
                            users = this.state.users;
                            user = users.find(function (ele) { return ele.id === idRemove; });
                            relations = user["user".concat(entityStr, "$user")];
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
                                    }
                                ],
                                _b), idRemove);
                            return [4 /*yield*/, this.execute()];
                        case 1:
                            _c.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        // 这三个函数貌似还没用上
        searchChange: function (event) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var value;
                return tslib_1.__generator(this, function (_a) {
                    value = this.resolveInput(event).value;
                    this.addNamedFilter({
                        filter: {
                            id: {
                                $in: {
                                    entity: 'mobile',
                                    data: {
                                        userId: 1,
                                    },
                                    filter: {
                                        mobile: {
                                            $includes: value,
                                        },
                                    },
                                },
                            },
                        },
                        '#name': 'mobile',
                    });
                    return [2 /*return*/];
                });
            });
        },
        searchCancel: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    this.removeNamedFilterByName('mobile');
                    return [2 /*return*/];
                });
            });
        },
        searchConfirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    this.refresh();
                    return [2 /*return*/];
                });
            });
        },
    },
});
