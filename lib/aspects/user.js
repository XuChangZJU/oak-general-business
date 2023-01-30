"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeUser = void 0;
var tslib_1 = require("tslib");
var types_1 = require("oak-domain/lib/types");
function mergeUser(params, context, innerLogic) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var from, to, schema, _a, _b, _i, entity, entityDesc, attributes, _c, _d, _e, attr, attrDef;
        var _f, _g;
        return tslib_1.__generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    if (!innerLogic && !context.isRoot()) {
                        throw new types_1.OakUserUnpermittedException('不允许执行mergeUser操作');
                    }
                    from = params.from, to = params.to;
                    schema = context.getSchema();
                    _a = [];
                    for (_b in schema)
                        _a.push(_b);
                    _i = 0;
                    _h.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 8];
                    entity = _a[_i];
                    if (['oper', 'modi', 'operEntity', 'modiEntity', 'userEntityGrant', 'wechatQrCode'].includes(entity)) {
                        return [3 /*break*/, 7];
                    }
                    entityDesc = schema[entity];
                    if (entityDesc.view) {
                        return [3 /*break*/, 7];
                    }
                    attributes = entityDesc.attributes;
                    _c = [];
                    for (_d in attributes)
                        _c.push(_d);
                    _e = 0;
                    _h.label = 2;
                case 2:
                    if (!(_e < _c.length)) return [3 /*break*/, 7];
                    attr = _c[_e];
                    attrDef = attributes[attr];
                    if (!(attrDef.type === 'ref' && attrDef.ref === 'user')) return [3 /*break*/, 4];
                    return [4 /*yield*/, context.operate(entity, {
                            action: 'update',
                            data: (_f = {},
                                _f[attr] = to,
                                _f),
                            filter: (_g = {},
                                _g[attr] = from,
                                _g)
                        }, { dontCollect: true, dontCreateOper: true, dontCreateModi: true })];
                case 3:
                    _h.sent();
                    _h.label = 4;
                case 4:
                    if (!(attr === 'entity' && attributes.hasOwnProperty('entityId'))) return [3 /*break*/, 6];
                    return [4 /*yield*/, context.operate(entity, {
                            action: 'update',
                            data: {
                                entityId: to,
                            },
                            filter: {
                                entity: 'user',
                                entityId: from,
                            }
                        }, { dontCollect: true, dontCreateOper: true, dontCreateModi: true })];
                case 5:
                    _h.sent();
                    _h.label = 6;
                case 6:
                    _e++;
                    return [3 /*break*/, 2];
                case 7:
                    _i++;
                    return [3 /*break*/, 1];
                case 8: return [4 /*yield*/, context.operate('user', {
                        action: 'merge',
                        data: {
                            refId: to,
                            userState: 'merged',
                        },
                        filter: {
                            id: from,
                        }
                    }, {})];
                case 9:
                    _h.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.mergeUser = mergeUser;
