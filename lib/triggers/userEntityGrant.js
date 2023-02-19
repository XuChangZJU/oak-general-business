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
                                var userId, id;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
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
                                                    type: userEntityGrantData.qrCodeType,
                                                }, context)];
                                        case 1:
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
                                        relation: 1,
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
        fn: function (_a, context, params) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, filter, userId, _b, userEntityGrant, entity, entityId, relation, granterId, type, entityStr, userRelation, result2, result3;
                var _c, _d, _e, _f, _g;
                return tslib_1.__generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            data = operation.data, filter = operation.filter;
                            userId = context.getToken().userId;
                            return [4 /*yield*/, context.select('userEntityGrant', {
                                    data: {
                                        id: 1,
                                        entity: 1,
                                        entityId: 1,
                                        relation: 1,
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
                            _b = tslib_1.__read.apply(void 0, [_h.sent(), 1]), userEntityGrant = _b[0];
                            entity = userEntityGrant.entity, entityId = userEntityGrant.entityId, relation = userEntityGrant.relation, granterId = userEntityGrant.granterId, type = userEntityGrant.type;
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
                        case 2:
                            result2 = _h.sent();
                            if (!result2.length) return [3 /*break*/, 3];
                            throw new types_1.OakRowInconsistencyException({
                                a: 'c',
                                e: userRelation,
                                d: result2,
                            }, '已领取该权限');
                        case 3: return [4 /*yield*/, context.operate(userRelation, {
                                id: (0, uuid_1.generateNewId)(),
                                action: 'create',
                                data: (_e = {
                                        id: (0, uuid_1.generateNewId)(),
                                        userId: userId
                                    },
                                    _e["".concat(entity, "Id")] = entityId,
                                    _e.relation = relation,
                                    _e),
                            }, params)];
                        case 4:
                            _h.sent();
                            if (!(type === 'transfer')) return [3 /*break*/, 7];
                            return [4 /*yield*/, context.select(userRelation, {
                                    data: (_f = {
                                            id: 1,
                                            userId: 1,
                                            relation: 1
                                        },
                                        _f["".concat(entity, "Id")] = 1,
                                        _f),
                                    filter: (_g = {
                                            userId: granterId,
                                            relation: relation
                                        },
                                        _g["".concat(entity, "Id")] = entityId,
                                        _g),
                                    indexFrom: 0,
                                    count: 1,
                                }, {
                                    dontCollect: true,
                                })];
                        case 5:
                            result3 = _h.sent();
                            (0, assert_1.assert)(result3[0]);
                            return [4 /*yield*/, context.operate(userRelation, {
                                    id: (0, uuid_1.generateNewId)(),
                                    action: 'remove',
                                    data: {},
                                    filter: {
                                        id: result3[0].id,
                                    },
                                }, params)];
                        case 6:
                            _h.sent();
                            _h.label = 7;
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
                var data, _b;
                var _c;
                return tslib_1.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            data = operation.data;
                            _b = data;
                            _c = {};
                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 1:
                            _b.wechatQrCode$entity = (_c.id = _d.sent(),
                                _c.action = 'update',
                                _c.data = {
                                    expired: true,
                                },
                                _c);
                            return [2 /*return*/, 1];
                    }
                });
            });
        },
    },
    {
        name: '当userEntityGrant查询时，使其相关的wechatQrCode动态生成buffer',
        entity: 'userEntityGrant',
        action: 'select',
        when: 'after',
        fn: function (_a, context) {
            var operation = _a.operation, result = _a.result;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var result_1, result_1_1, userEntityGrant, wechatQrCode, buffer, e_1_1;
                var e_1, _b;
                var _c, _d, _e;
                return tslib_1.__generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            if (!((_e = (_d = (_c = operation === null || operation === void 0 ? void 0 : operation.data) === null || _c === void 0 ? void 0 : _c.wechatQrCode$entity) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.buffer)) return [3 /*break*/, 8];
                            _f.label = 1;
                        case 1:
                            _f.trys.push([1, 6, 7, 8]);
                            result_1 = tslib_1.__values(result), result_1_1 = result_1.next();
                            _f.label = 2;
                        case 2:
                            if (!!result_1_1.done) return [3 /*break*/, 5];
                            userEntityGrant = result_1_1.value;
                            if (!(userEntityGrant.qrCodeType === 'wechatMpWxaCode')) return [3 /*break*/, 4];
                            wechatQrCode = userEntityGrant.wechatQrCode$entity &&
                                userEntityGrant.wechatQrCode$entity[0];
                            if (!wechatQrCode) return [3 /*break*/, 4];
                            return [4 /*yield*/, (0, wechatQrCode_1.getMpUnlimitWxaCode)(wechatQrCode.id, context)];
                        case 3:
                            buffer = _f.sent();
                            Object.assign(wechatQrCode, {
                                buffer: buffer,
                            });
                            _f.label = 4;
                        case 4:
                            result_1_1 = result_1.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_1_1 = _f.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (result_1_1 && !result_1_1.done && (_b = result_1.return)) _b.call(result_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/, 1];
                    }
                });
            });
        },
    },
];
exports.default = triggers;
