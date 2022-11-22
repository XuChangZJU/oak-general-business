"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var assert_1 = tslib_1.__importDefault(require("assert"));
var types_1 = require("oak-domain/lib/types");
var string_1 = require("oak-domain/lib/utils/string");
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
            _b;
    },
    isList: false,
    formData: function (_a) {
        var user = _a.data, props = _a.props;
        var entity = props.entity, entityId = props.entityId;
        var entityStr = (0, string_1.firstLetterUpperCase)(entity);
        var _b = user || {}, name = _b.name, nickname = _b.nickname, password = _b.password;
        var userRelations = user && user["user".concat(entityStr, "$user")];
        return {
            password: password,
            userRelations: userRelations,
            name: name,
            nickname: nickname,
        };
    },
    properties: {
        entity: String,
        entityId: String,
        relations: Array,
    },
    lifetimes: {
        ready: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, entity, entityId, entityStr;
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
                    _a = this.props, entity = _a.entity, entityId = _a.entityId;
                    entityStr = (0, string_1.firstLetterUpperCase)(entity);
                    this.update({
                        password: '12345678',
                    }, undefined, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var operations, _a, operation;
                        var _b;
                        return tslib_1.__generator(this, function (_c) {
                            operations = this.getOperations();
                            _a = tslib_1.__read(operations, 1), operation = _a[0].operation;
                            if (!operation.data.name) {
                                throw new types_1.OakInputIllegalException('user', ['name'], '用户姓名不能为空');
                            }
                            if (((_b = operation.data["user".concat(entityStr, "$user")]) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                                return [2 /*return*/];
                            }
                            throw new types_1.OakInputIllegalException('user', ["user".concat(entityStr, "$user")], '需要至少选择一个权限');
                        });
                    }); });
                    return [2 /*return*/];
                });
            });
        },
    },
    methods: {
        onRelationChange: function (value) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, entity, entityId, oakId, entityStr, userRelations, toBeRemoved, toBeInserted;
                var _b, _c, _d;
                return tslib_1.__generator(this, function (_e) {
                    _a = this.props, entity = _a.entity, entityId = _a.entityId, oakId = _a.oakId;
                    entityStr = (0, string_1.firstLetterUpperCase)(entity);
                    userRelations = this.state.userRelations;
                    if (userRelations.length > value.length) {
                        (0, assert_1.default)(userRelations.length === value.length + 1);
                        toBeRemoved = userRelations.find(function (ele) { return !value.includes(ele.relation); });
                        (0, assert_1.default)(userRelations.length === value.length + 1);
                        // todo 这里应该改成component
                        this.update((_b = {},
                            _b["user".concat(entityStr, "$user")] = [{
                                    action: 'remove',
                                    data: {},
                                    filter: {
                                        id: toBeRemoved.id,
                                    },
                                }],
                            _b));
                    }
                    else {
                        // 增加一个relation
                        (0, assert_1.default)(userRelations.length === value.length - 1);
                        toBeInserted = value.find(function (ele) { return !userRelations.find(function (userRelation) { return userRelation.relation === ele; }); });
                        this.update((_c = {},
                            _c["user".concat(entityStr, "$user")] = [{
                                    action: 'create',
                                    data: (_d = {
                                            id: (0, uuid_1.generateNewId)()
                                        },
                                        _d["".concat(entity, "Id")] = entityId,
                                        _d.relation = toBeInserted,
                                        _d),
                                }],
                            _c));
                    }
                    return [2 /*return*/];
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
