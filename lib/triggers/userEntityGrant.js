"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var types_1 = require("oak-domain/lib/types");
var assert_1 = require("oak-domain/lib/utils/assert");
var triggers = [
    {
        name: '当创建userEntityGrant时，尝试为之创建一个wechatQrCode',
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
                                var userId, id, _a;
                                var _b, _c;
                                return tslib_1.__generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            userId = context.getToken().userId;
                                            (0, assert_1.assert)(userId);
                                            id = userEntityGrantData.id;
                                            Object.assign(userEntityGrantData, {
                                                granterId: userId,
                                                expired: false,
                                            });
                                            if (!userEntityGrantData.expiresAt) {
                                                Object.assign(userEntityGrantData, {
                                                    expiresAt: Date.now() + 300 * 1000,
                                                });
                                            }
                                            _a = userEntityGrantData;
                                            _b = {};
                                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                        case 1:
                                            _b.id = _d.sent(),
                                                _b.action = 'create';
                                            _c = {};
                                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                        case 2:
                                            _a.wechatQrCode$entity = [
                                                (_b.data = (_c.id = _d.sent(),
                                                    _c.props = {
                                                        pathname: '/userEntityGrant/confirm',
                                                        props: {
                                                            oakId: id,
                                                        },
                                                    },
                                                    _c.type = userEntityGrantData.qrCodeType,
                                                    _c),
                                                    _b)
                                            ];
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
        },
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
                            return [4 /*yield*/, context.select('userEntityGrant', {
                                    data: {
                                        id: 1,
                                        entity: 1,
                                        entityId: 1,
                                        relationId: 1,
                                        number: 1,
                                        confirmed: 1,
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
                            result = _c.sent();
                            _b = result[0], number = _b.number, confirmed = _b.confirmed;
                            if (confirmed >= number) {
                                throw new types_1.OakExternalException("\u8D85\u51FA\u5206\u4EAB\u4E0A\u9650\u4EBA\u6570".concat(number, "\u4EBA"));
                            }
                            Object.assign(data, {
                                confirmed: confirmed + 1,
                            });
                            if (number === 1) {
                                // 单次分享 附上接收者id
                                Object.assign(data, {
                                    granteeId: userId,
                                });
                            }
                            return [2 /*return*/, 0];
                    }
                });
            });
        },
    },
    {
        name: '当userEntityGrant被确认时，生成user和entity关系',
        entity: 'userEntityGrant',
        action: 'confirm',
        when: 'after',
        fn: function (_a, context, option) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, filter, userId, _b, userEntityGrant, entity, entityId, relationId, granterId, type, result2, e, _c, _d, _e;
                var _f;
                return tslib_1.__generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            data = operation.data, filter = operation.filter;
                            userId = context.getToken().userId;
                            return [4 /*yield*/, context.select('userEntityGrant', {
                                    data: {
                                        id: 1,
                                        entity: 1,
                                        entityId: 1,
                                        relationId: 1,
                                        granterId: 1,
                                        type: 1,
                                    },
                                    filter: {
                                        id: filter.id,
                                    },
                                    indexFrom: 0,
                                    count: 1,
                                }, {
                                    dontCollect: true,
                                })];
                        case 1:
                            _b = tslib_1.__read.apply(void 0, [_g.sent(), 1]), userEntityGrant = _b[0];
                            entity = userEntityGrant.entity, entityId = userEntityGrant.entityId, relationId = userEntityGrant.relationId, granterId = userEntityGrant.granterId, type = userEntityGrant.type;
                            return [4 /*yield*/, context.select('userRelation', {
                                    data: {
                                        id: 1,
                                        userId: 1,
                                        relationId: 1,
                                    },
                                    filter: {
                                        userId: userId,
                                        relationId: relationId,
                                        entity: entity,
                                        entityId: entityId,
                                    },
                                    indexFrom: 0,
                                    count: 1,
                                }, {
                                    dontCollect: true,
                                })];
                        case 2:
                            result2 = _g.sent();
                            if (!result2.length) return [3 /*break*/, 3];
                            e = new types_1.OakRowInconsistencyException(undefined, '已领取该权限');
                            e.addData('userRelation', result2);
                            throw e;
                        case 3: return [4 /*yield*/, context.operate('userRelation', {
                                id: (0, uuid_1.generateNewId)(),
                                action: 'create',
                                data: {
                                    id: (0, uuid_1.generateNewId)(),
                                    userId: userId,
                                    relationId: relationId,
                                    entity: entity,
                                    entityId: entityId,
                                },
                            }, option)];
                        case 4:
                            _g.sent();
                            if (!(type === 'transfer')) return [3 /*break*/, 7];
                            _d = (_c = context).operate;
                            _e = ['userRelation'];
                            _f = {};
                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 5: return [4 /*yield*/, _d.apply(_c, _e.concat([(_f.id = _g.sent(),
                                    _f.action = 'remove',
                                    _f.data = {},
                                    _f.filter = {
                                        relationId: relationId,
                                        userId: granterId,
                                        entity: entity,
                                        entityId: entityId,
                                    },
                                    _f), option]))];
                        case 6:
                            _g.sent();
                            _g.label = 7;
                        case 7: return [2 /*return*/, 1];
                    }
                });
            });
        },
    },
    {
        name: '当userEntityGrant过期时，使其相关的wechatQrCode也过期',
        entity: 'userEntityGrant',
        action: 'update',
        check: function (operation) {
            var data = operation.data;
            return !!data.expired;
        },
        when: 'before',
        fn: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, filter, _b, _c, _d;
                var _e;
                return tslib_1.__generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            data = operation.data, filter = operation.filter;
                            _c = (_b = context).operate;
                            _d = ['wechatQrCode'];
                            _e = {};
                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 1: return [4 /*yield*/, _c.apply(_b, _d.concat([(_e.id = _f.sent(),
                                    _e.action = 'update',
                                    _e.data = {
                                        expired: true,
                                    },
                                    _e.filter = {
                                        userEntityGrant: filter,
                                    },
                                    _e), {}]))];
                        case 2:
                            _f.sent();
                            return [2 /*return*/, 1];
                    }
                });
            });
        },
    },
];
exports.default = triggers;
