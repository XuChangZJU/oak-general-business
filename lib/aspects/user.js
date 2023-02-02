"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeUser = void 0;
var tslib_1 = require("tslib");
var types_1 = require("oak-domain/lib/types");
var uuid_1 = require("oak-domain/lib/utils/uuid");
function mergeUser(params, context, innerLogic) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var from, to, schema, _a, _b, _c;
        var _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!innerLogic && !context.isRoot()) {
                        throw new types_1.OakUserUnpermittedException('不允许执行mergeUser操作');
                    }
                    from = params.from, to = params.to;
                    schema = context.getSchema();
                    _b = (_a = context).operate;
                    _c = ['user'];
                    _d = {};
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
                return [4 /*yield*/, _b.apply(_a, _c.concat([(_d.id = _e.sent(),
                            _d.action = 'merge',
                            _d.data = {
                                refId: to,
                                userState: 'merged',
                            },
                            _d.filter = {
                                id: from,
                            },
                            _d), {}]))];
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
                    _e.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.mergeUser = mergeUser;
