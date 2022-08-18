"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("oak-domain/lib/types");
var assert_1 = require("oak-domain/lib/utils/assert");
var constants_1 = require("../constants");
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
                                var userId, _a, applicationId, appConfig, SystemConfig, systemId, type, entity, entityId, relation, id, result, expiresAt;
                                var _b;
                                return tslib_1.__generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0: return [4 /*yield*/, context.getToken()];
                                        case 1:
                                            userId = (_c.sent()).userId;
                                            return [4 /*yield*/, context.getApplication()];
                                        case 2:
                                            _a = (_c.sent()), applicationId = _a.id, appConfig = _a.config, SystemConfig = _a.system.config, systemId = _a.systemId;
                                            (0, assert_1.assert)(userId);
                                            type = userEntityGrantData.type, entity = userEntityGrantData.entity, entityId = userEntityGrantData.entityId, relation = userEntityGrantData.relation, id = userEntityGrantData.id;
                                            return [4 /*yield*/, context.rowStore.select('userEntityGrant', {
                                                    data: {
                                                        id: 1,
                                                        type: 1,
                                                        entity: 1,
                                                        entityId: 1,
                                                        relation: 1,
                                                        expired: 1,
                                                        granterId: 1,
                                                    },
                                                    filter: {
                                                        expired: false,
                                                        expiresAt: {
                                                            $gt: Date.now() - 600 * 1000,
                                                        },
                                                        type: type,
                                                        entity: entity,
                                                        entityId: entityId,
                                                        granterId: userId,
                                                        relation: relation,
                                                    },
                                                    indexFrom: 0,
                                                    count: 1,
                                                }, context, params)];
                                        case 3:
                                            result = (_c.sent()).result;
                                            if (result.length) {
                                                throw new types_1.OakCongruentRowExists(result[0], '有可重用的userEntityGrant');
                                            }
                                            expiresAt = Date.now() + (((_b = SystemConfig.UserEntityGrant) === null || _b === void 0 ? void 0 : _b.lifetimeLength) || constants_1.DefaultConfig.userEntityGrant.lifetimeLength);
                                            Object.assign(userEntityGrantData, {
                                                granterId: userId,
                                                expiresAt: expiresAt,
                                                expired: false,
                                            });
                                            if (!['wechatPublic', 'wechatMp', 'web'].includes(appConfig.type)) return [3 /*break*/, 5];
                                            return [4 /*yield*/, (0, wechatQrCode_1.createWechatQrCode)({
                                                    entity: 'userEntityGrant',
                                                    entityId: id,
                                                    applicationId: applicationId,
                                                    props: {
                                                        pathname: '/userEntityGrant/confirm',
                                                        props: {
                                                            oakId: id,
                                                        },
                                                    },
                                                }, context)];
                                        case 4:
                                            _c.sent();
                                            _c.label = 5;
                                        case 5: return [2 /*return*/];
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
        name: '当创建userEntityGrant确认时，附上被授权者id',
        entity: 'userEntityGrant',
        action: 'confirm',
        when: 'after',
        fn: function (_a, context, params) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, filter, userId, result, _b, entity, entityId, relation, type, entityStr, userRelation, result2;
                var _c, _d;
                return tslib_1.__generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            data = operation.data, filter = operation.filter;
                            return [4 /*yield*/, context.getToken()];
                        case 1:
                            userId = (_e.sent()).userId;
                            return [4 /*yield*/, context.rowStore.select('userEntityGrant', {
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
                                }, context, params)];
                        case 2:
                            result = (_e.sent()).result;
                            _b = result[0], entity = _b.entity, entityId = _b.entityId, relation = _b.relation, type = _b.type;
                            entityStr = (0, string_1.firstLetterUpperCase)(entity);
                            userRelation = "user".concat(entityStr);
                            return [4 /*yield*/, context.rowStore.select(userRelation, {
                                    data: {
                                        id: 1,
                                    },
                                    filter: (_c = {
                                            userId: userId,
                                            relation: relation
                                        },
                                        _c["".concat(entity, "Id")] = entityId,
                                        _c),
                                    indexFrom: 0,
                                    count: 1,
                                }, context, params)];
                        case 3:
                            result2 = (_e.sent()).result;
                            if (!result2.length) return [3 /*break*/, 4];
                            throw new types_1.OakCongruentRowExists(result2[0], '已领用该权限');
                        case 4: return [4 /*yield*/, context.rowStore.operate(userRelation, {
                                action: 'create',
                                data: (_d = {
                                        userId: userId
                                    },
                                    _d["".concat(entity, "Id")] = entityId,
                                    _d.relation = relation,
                                    _d),
                            }, context)];
                        case 5:
                            _e.sent();
                            return [2 /*return*/, 1];
                    }
                });
            });
        }
    }
];
exports.default = triggers;
