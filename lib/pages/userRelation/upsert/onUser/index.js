"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
var types_1 = require("oak-domain/lib/types");
var string_1 = require("oak-domain/lib/utils/string");
exports.default = OakComponent({
    entity: 'user',
    projection: function (_a) {
        var props = _a.props;
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var entity, entityId, entityStr;
            var _b, _c, _d;
            return tslib_1.__generator(this, function (_e) {
                entity = props.entity, entityId = props.entityId;
                entityStr = (0, string_1.firstLetterUpperCase)(entity);
                return [2 /*return*/, (_b = {
                            id: 1,
                            name: 1,
                            password: 1,
                            nickname: 1
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
                        _b)];
            });
        });
    },
    isList: false,
    formData: function (_a) {
        var user = _a.data, props = _a.props;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var entity, entityId, entityStr, _b, name, nickname, password, userRelations;
            return tslib_1.__generator(this, function (_c) {
                entity = props.entity, entityId = props.entityId;
                entityStr = (0, string_1.firstLetterUpperCase)(entity);
                _b = user || {}, name = _b.name, nickname = _b.nickname, password = _b.password;
                userRelations = user && user["user".concat(entityStr, "$user")];
                return [2 /*return*/, {
                        password: password,
                        userRelations: userRelations,
                        name: name,
                        nickname: nickname,
                    }];
            });
        });
    },
    properties: {
        entity: String,
        entityId: String,
        relations: Array,
    },
    lifetimes: {
        ready: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, entity, entityId, entityStr, _b;
                var _c, _d;
                var _this = this;
                return tslib_1.__generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _a = this.props, entity = _a.entity, entityId = _a.entityId;
                            entityStr = (0, string_1.firstLetterUpperCase)(entity);
                            if (!!this.props.oakId) return [3 /*break*/, 3];
                            _b = this.addOperation;
                            _c = {
                                action: 'create'
                            };
                            _d = {};
                            return [4 /*yield*/, generateNewId()];
                        case 1: return [4 /*yield*/, _b.apply(this, [(_c.data = (_d.id = _e.sent(),
                                    _d.password = '12345678',
                                    _d),
                                    _c), function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var operations, _a, operation;
                                    var _b;
                                    return tslib_1.__generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0: return [4 /*yield*/, this.getOperations()];
                                            case 1:
                                                operations = _c.sent();
                                                _a = tslib_1.__read(operations, 1), operation = _a[0];
                                                if (!operation.data.name) {
                                                    throw new types_1.OakInputIllegalException('user', ['name'], '用户姓名不能为空');
                                                }
                                                if (((_b = operation.data["user".concat(entityStr, "$user")]) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                                                    return [2 /*return*/];
                                                }
                                                throw new types_1.OakInputIllegalException('user', ["user".concat(entityStr, "$user")], '需要至少选择一个权限');
                                        }
                                    });
                                }); }])];
                        case 2:
                            _e.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, this.addOperation({
                                action: 'update',
                                data: {}
                            }, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var operations, _a, operation;
                                var _b;
                                return tslib_1.__generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0: return [4 /*yield*/, this.getOperations()];
                                        case 1:
                                            operations = _c.sent();
                                            _a = tslib_1.__read(operations, 1), operation = _a[0];
                                            if (((_b = operation.data["user".concat(entityStr, "$user")]) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                                                return [2 /*return*/];
                                            }
                                            throw new types_1.OakInputIllegalException('user', ["user".concat(entityStr, "$user")], '需要至少选择一个权限');
                                    }
                                });
                            }); })];
                        case 4:
                            _e.sent();
                            _e.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
    },
    methods: {
        onRelationChange: function (value) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, entity, entityId, oakId, entityStr, userRelations, toBeRemoved, toBeInserted, _b, _c;
                var _d, _e, _f, _g, _h;
                return tslib_1.__generator(this, function (_j) {
                    switch (_j.label) {
                        case 0:
                            _a = this.props, entity = _a.entity, entityId = _a.entityId, oakId = _a.oakId;
                            entityStr = (0, string_1.firstLetterUpperCase)(entity);
                            userRelations = this.state.userRelations;
                            if (!(userRelations.length > value.length)) return [3 /*break*/, 1];
                            (0, assert_1.default)(userRelations.length === value.length + 1);
                            toBeRemoved = userRelations.find(function (ele) { return !value.includes(ele.relation); });
                            (0, assert_1.default)(userRelations.length === value.length + 1);
                            this.addOperation({
                                action: oakId ? 'update' : 'create',
                                data: (_d = {},
                                    _d["user".concat(entityStr, "$user")] = [{
                                            action: 'remove',
                                            data: {},
                                            filter: {
                                                id: toBeRemoved.id,
                                            },
                                        }],
                                    _d),
                            });
                            return [3 /*break*/, 3];
                        case 1:
                            // 增加一个relation
                            (0, assert_1.default)(userRelations.length === value.length - 1);
                            toBeInserted = value.find(function (ele) { return !userRelations.find(function (userRelation) { return userRelation.relation === ele; }); });
                            _b = this.addOperation;
                            _e = {
                                action: oakId ? 'update' : 'create'
                            };
                            _f = {};
                            _c = "user".concat(entityStr, "$user");
                            _g = {
                                action: 'create'
                            };
                            _h = {};
                            return [4 /*yield*/, generateNewId()];
                        case 2:
                            _b.apply(this, [(_e.data = (_f[_c] = [(_g.data = (_h.id = _j.sent(),
                                        _h["".concat(entity, "Id")] = entityId,
                                        _h.relation = toBeInserted,
                                        _h),
                                        _g)],
                                    _f),
                                    _e)]);
                            _j.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        onConfirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
