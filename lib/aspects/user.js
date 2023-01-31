"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeUser = void 0;
var tslib_1 = require("tslib");
var types_1 = require("oak-domain/lib/types");
var uuid_1 = require("oak-domain/lib/utils/uuid");
function mergeUser(params, context, innerLogic) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var from, to, schema, _a, _b, _i, entity, entityDesc, attributes, _c, _d, _e, attr, attrDef, _f, _g, _h;
        var _j, _k, _l;
        return tslib_1.__generator(this, function (_m) {
            switch (_m.label) {
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
                    _m.label = 1;
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
                    _m.label = 2;
                case 2:
                    if (!(_e < _c.length)) return [3 /*break*/, 7];
                    attr = _c[_e];
                    attrDef = attributes[attr];
                    if (!(attrDef.type === 'ref' && attrDef.ref === 'user')) return [3 /*break*/, 4];
                    return [4 /*yield*/, context.operate(entity, {
                            action: 'update',
                            data: (_j = {},
                                _j[attr] = to,
                                _j),
                            filter: (_k = {},
                                _k[attr] = from,
                                _k)
                        }, { dontCollect: true, dontCreateOper: true, dontCreateModi: true })];
                case 3:
                    _m.sent();
                    _m.label = 4;
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
                    _m.sent();
                    _m.label = 6;
                case 6:
                    _e++;
                    return [3 /*break*/, 2];
                case 7:
                    _i++;
                    return [3 /*break*/, 1];
                case 8:
                    _g = (_f = context).operate;
                    _h = ['user'];
                    _l = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 9: return [4 /*yield*/, _g.apply(_f, _h.concat([(_l.id = _m.sent(),
                            _l.action = 'merge',
                            _l.data = {
                                refId: to,
                                userState: 'merged',
                            },
                            _l.filter = {
                                id: from,
                            },
                            _l), {}]))];
                case 10:
                    _m.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.mergeUser = mergeUser;
