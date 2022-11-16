"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
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
        name: '当userEntityGrant准备确认时，附上被授权者id',
        entity: 'userEntityGrant',
        action: 'confirm',
        when: 'before',
        fn: function (_a, context, params) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, filter, userId, result, _b, number, confirmed;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            data = operation.data, filter = operation.filter;
                            return [4 /*yield*/, context.getToken()];
                        case 1:
                            userId = (_c.sent()).userId;
                            return [4 /*yield*/, context.rowStore.select('userEntityGrant', {
                                    data: {
                                        id: 1,
                                        entity: 1,
                                        entityId: 1,
                                        relation: 1,
                                        number: 1,
                                        confirmed: 1,
                                    },
                                    filter: {
                                        id: filter.id,
                                    },
                                    indexFrom: 0,
                                    count: 1,
                                }, context, {
                                    dontCollect: true,
                                })];
                        case 2:
                            result = (_c.sent()).result;
                            _b = result[0], number = _b.number, confirmed = _b.confirmed;
                            if (confirmed > number) {
                                throw new types_1.OakUserUnpermittedException("\u8D85\u51FA\u5206\u4EAB\u4E0A\u9650\u4EBA\u6570");
                            }
                            Object.assign(data, {
                                confirmed: confirmed + 1,
                            });
                            if (number === 1) {
                                Object.assign(data, {
                                    granteeId: userId,
                                });
                            }
                            return [2 /*return*/, 0];
                    }
                });
            });
        }
    },
    {
        name: '当userEntityGrant被确认时，生成user和entity关系',
        entity: 'userEntityGrant',
        action: 'confirm',
        when: 'after',
        fn: function (_a, context, params) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, filter, userId, result, _b, entity, entityId, relation, number, confirmed, entityStr, userRelation, result2, _c, _d, _e;
                var _f, _g, _h, _j;
                return tslib_1.__generator(this, function (_k) {
                    switch (_k.label) {
                        case 0:
                            data = operation.data, filter = operation.filter;
                            return [4 /*yield*/, context.getToken()];
                        case 1:
                            userId = (_k.sent()).userId;
                            return [4 /*yield*/, context.rowStore.select('userEntityGrant', {
                                    data: {
                                        id: 1,
                                        entity: 1,
                                        entityId: 1,
                                        relation: 1,
                                        number: 1,
                                        confirmed: 1,
                                    },
                                    filter: {
                                        id: filter.id,
                                    },
                                    indexFrom: 0,
                                    count: 1,
                                }, context, {
                                    dontCollect: true,
                                })];
                        case 2:
                            result = (_k.sent()).result;
                            _b = result[0], entity = _b.entity, entityId = _b.entityId, relation = _b.relation, number = _b.number, confirmed = _b.confirmed;
                            if (number === 1 && confirmed > 0) {
                                Object.assign(data, {
                                    confirmed: confirmed + 1,
                                });
                            }
                            entityStr = (0, string_1.firstLetterUpperCase)(entity);
                            userRelation = "user".concat(entityStr);
                            return [4 /*yield*/, context.rowStore.select(userRelation, {
                                    data: (_f = {
                                            id: 1,
                                            userId: 1,
                                            relation: 1
                                        },
                                        _f["".concat(entity, "Id")] = 1,
                                        _f),
                                    filter: (_g = {
                                            userId: userId,
                                            relation: relation
                                        },
                                        _g["".concat(entity, "Id")] = entityId,
                                        _g),
                                    indexFrom: 0,
                                    count: 1,
                                }, context, {
                                    dontCollect: true,
                                })];
                        case 3:
                            result2 = (_k.sent()).result;
                            if (!result2.length) return [3 /*break*/, 4];
                            throw new types_1.OakRowInconsistencyException({
                                a: 'c',
                                e: userRelation,
                                d: result2,
                            }, '已领用该权限');
                        case 4:
                            _d = (_c = context.rowStore).operate;
                            _e = [userRelation];
                            _h = {};
                            return [4 /*yield*/, generateNewId()];
                        case 5:
                            _h.id = _k.sent(),
                                _h.action = 'create';
                            _j = {};
                            return [4 /*yield*/, generateNewId()];
                        case 6: return [4 /*yield*/, _d.apply(_c, _e.concat([(_h.data = (_j.id = _k.sent(),
                                    _j.userId = userId,
                                    _j["".concat(entity, "Id")] = entityId,
                                    _j.relation = relation,
                                    _j),
                                    _h), context,
                                params]))];
                        case 7:
                            _k.sent();
                            return [2 /*return*/, 1];
                    }
                });
            });
        }
    }
];
exports.default = triggers;
