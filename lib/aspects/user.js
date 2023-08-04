"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChangePasswordChannels = exports.mergeUser = void 0;
var tslib_1 = require("tslib");
var types_1 = require("oak-domain/lib/types");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var assert_1 = tslib_1.__importDefault(require("assert"));
function mergeUser(params, context, innerLogic) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var from, to, schema, _a, _b, _c, _d, _e, _f;
        var _g, _h;
        return tslib_1.__generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    if (!innerLogic && !context.isRoot()) {
                        throw new types_1.OakUserUnpermittedException('不允许执行mergeUser操作');
                    }
                    from = params.from, to = params.to;
                    (0, assert_1.default)(from);
                    (0, assert_1.default)(to);
                    (0, assert_1.default)(from !== to, '不能merge到相同user');
                    schema = context.getSchema();
                    _b = (_a = context).operate;
                    _c = ['token'];
                    _g = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 1: 
                /* for (const entity in schema) {
                    if (['oper', 'modi', 'operEntity', 'modiEntity', 'userEntityGrant', 'wechatQrCode'].includes(entity)) {
                        continue;
                    }
            
                    const entityDesc = schema[entity];
                    if (entityDesc.view) {
                        continue;
                    }
                    const { attributes } = entityDesc;
                    for (const attr in attributes) {
                        const attrDef = attributes[attr as keyof typeof attributes];
                        if (attrDef.type === 'ref' && attrDef.ref === 'user') {
                            await context.operate(entity, {
                                action: 'update',
                                data: {
                                    [attr]: to,
                                },
                                filter: {
                                    [attr]: from,
                                }
                            } as any, { dontCollect: true, dontCreateOper: true, dontCreateModi: true });
                        }
                        if (attr === 'entity' && attributes.hasOwnProperty('entityId')) {
                            await context.operate(entity, {
                                action: 'update',
                                data: {
                                    entityId: to,
                                },
                                filter: {
                                    entity: 'user',
                                    entityId: from,
                                }
                            } as any, { dontCollect: true, dontCreateOper: true, dontCreateModi: true });
                        }
                    }
                } */
                return [4 /*yield*/, _b.apply(_a, _c.concat([(_g.id = _j.sent(),
                            _g.action = 'disable',
                            _g.data = {},
                            _g.filter = {
                                ableState: 'enabled',
                                playerId: from, // todo 这里是playerId, root如果正在扮演该用户待处理
                            },
                            _g), { dontCollect: true }]))];
                case 2:
                    /* for (const entity in schema) {
                        if (['oper', 'modi', 'operEntity', 'modiEntity', 'userEntityGrant', 'wechatQrCode'].includes(entity)) {
                            continue;
                        }
                
                        const entityDesc = schema[entity];
                        if (entityDesc.view) {
                            continue;
                        }
                        const { attributes } = entityDesc;
                        for (const attr in attributes) {
                            const attrDef = attributes[attr as keyof typeof attributes];
                            if (attrDef.type === 'ref' && attrDef.ref === 'user') {
                                await context.operate(entity, {
                                    action: 'update',
                                    data: {
                                        [attr]: to,
                                    },
                                    filter: {
                                        [attr]: from,
                                    }
                                } as any, { dontCollect: true, dontCreateOper: true, dontCreateModi: true });
                            }
                            if (attr === 'entity' && attributes.hasOwnProperty('entityId')) {
                                await context.operate(entity, {
                                    action: 'update',
                                    data: {
                                        entityId: to,
                                    },
                                    filter: {
                                        entity: 'user',
                                        entityId: from,
                                    }
                                } as any, { dontCollect: true, dontCreateOper: true, dontCreateModi: true });
                            }
                        }
                    } */
                    _j.sent();
                    _e = (_d = context).operate;
                    _f = ['user'];
                    _h = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 3: return [4 /*yield*/, _e.apply(_d, _f.concat([(_h.id = _j.sent(),
                            _h.action = 'merge',
                            _h.data = {
                                refId: to,
                                userState: 'merged',
                            },
                            _h.filter = {
                                $or: [
                                    {
                                        id: from,
                                    },
                                    {
                                        userState: 'merged',
                                        refId: from,
                                    }
                                ],
                            },
                            _h), {}]))];
                case 4:
                    _j.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.mergeUser = mergeUser;
function getChangePasswordChannels(params, context, innerLogic) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var userId, mobileList;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = params.userId;
                    return [4 /*yield*/, context.select('mobile', {
                            data: {
                                id: 1,
                                mobile: 1,
                                userId: 1,
                            },
                            filter: {
                                userId: userId,
                                ableState: 'enabled',
                            },
                        }, {})];
                case 1:
                    mobileList = _a.sent();
                    return [2 /*return*/, []];
            }
        });
    });
}
exports.getChangePasswordChannels = getChangePasswordChannels;
