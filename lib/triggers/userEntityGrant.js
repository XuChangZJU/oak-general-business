"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var types_1 = require("oak-domain/lib/types");
var assert_1 = require("oak-domain/lib/utils/assert");
var wechatQrCode_1 = require("../aspects/wechatQrCode");
var string_1 = require("oak-domain/lib/utils/string");
var triggers = [
    {
        name: '当创建userEntityGrant时，查询是否有未过期可重用的对象',
        entity: 'userEntityGrant',
        action: 'create',
        when: 'before',
        fn: function (_a, context, params) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, filter, fn;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            data = operation.data, filter = operation.filter;
                            fn = function (userEntityGrantData) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                var userId, id;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, context.getToken()];
                                        case 1:
                                            userId = (_a.sent()).userId;
                                            (0, assert_1.assert)(userId);
                                            id = userEntityGrantData.id;
                                            Object.assign(userEntityGrantData, {
                                                granterId: userId,
                                                expired: false,
                                            });
                                            // 为之创建微信体系下的一个weChatQrCode
                                            return [4 /*yield*/, (0, wechatQrCode_1.createWechatQrCode)({
                                                    entity: 'userEntityGrant',
                                                    entityId: id,
                                                    props: {
                                                        pathname: '/userEntityGrant/confirm',
                                                        props: {
                                                            oakId: id,
                                                        },
                                                    },
                                                }, context)];
                                        case 2:
                                            // 为之创建微信体系下的一个weChatQrCode
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            if (!(data instanceof Array)) return [3 /*break*/, 1];
                            (0, assert_1.assert)('授权不存在一对多的情况');
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, fn(data)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3: return [2 /*return*/, 0];
                    }
                });
            });
        }
    },
    {
        name: '当userEntityGrant被确认时，附上被授权者id',
        entity: 'userEntityGrant',
        action: 'confirm',
        when: 'after',
        fn: function (_a, context, params) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, filter, userId, result, _b, entity, entityId, relation, entityStr, userRelation, result2;
                var _c, _d, _e;
                return tslib_1.__generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            data = operation.data, filter = operation.filter;
                            return [4 /*yield*/, context.getToken()];
                        case 1:
                            userId = (_f.sent()).userId;
                            return [4 /*yield*/, context.select('userEntityGrant', {
                                    data: {
                                        id: 1,
                                        entity: 1,
                                        entityId: 1,
                                        relation: 1,
                                    },
                                    filter: {
                                        id: filter.id,
                                    },
                                    indexFrom: 0,
                                    count: 1,
                                }, {
                                    dontCollect: true,
                                })];
                        case 2:
                            result = _f.sent();
                            _b = result[0], entity = _b.entity, entityId = _b.entityId, relation = _b.relation;
                            entityStr = (0, string_1.firstLetterUpperCase)(entity);
                            userRelation = "user".concat(entityStr);
                            return [4 /*yield*/, context.select(userRelation, {
                                    data: (_c = {
                                            id: 1,
                                            userId: 1,
                                            relation: 1
                                        },
                                        _c["".concat(entity, "Id")] = 1,
                                        _c),
                                    filter: (_d = {
                                            userId: userId,
                                            relation: relation
                                        },
                                        _d["".concat(entity, "Id")] = entityId,
                                        _d),
                                    indexFrom: 0,
                                    count: 1,
                                }, {
                                    dontCollect: true,
                                })];
                        case 3:
                            result2 = _f.sent();
                            if (!result2.length) return [3 /*break*/, 4];
                            throw new types_1.OakRowInconsistencyException({
                                a: 'c',
                                e: userRelation,
                                d: result2,
                            }, '已领用该权限');
                        case 4: return [4 /*yield*/, context.operate(userRelation, {
                                id: (0, uuid_1.generateNewId)(),
                                action: 'create',
                                data: (_e = {
                                        userId: userId
                                    },
                                    _e["".concat(entity, "Id")] = entityId,
                                    _e.relation = relation,
                                    _e),
                            }, params)];
                        case 5:
                            _f.sent();
                            return [2 /*return*/, 1];
                    }
                });
            });
        }
    }
];
exports.default = triggers;
