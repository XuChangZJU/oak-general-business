"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmUserEntityGrant = void 0;
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var types_1 = require("oak-domain/lib/types");
function confirmUserEntityGrant(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var id, env, userId, _a, userEntityGrant, closeRootMode, number, confirmed, entity, entityId, relationId, granterId, type, result2, e, _b, _c, _d, _e, _f, _g, err_1;
        var _h, _j, _k;
        return tslib_1.__generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    id = params.id, env = params.env;
                    userId = context.getToken().userId;
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
                                id: id,
                            },
                            indexFrom: 0,
                            count: 1,
                        }, {
                            dontCollect: true,
                        })];
                case 1:
                    _a = tslib_1.__read.apply(void 0, [_l.sent(), 1]), userEntityGrant = _a[0];
                    closeRootMode = context.openRootMode();
                    number = userEntityGrant.number, confirmed = userEntityGrant.confirmed;
                    if (confirmed >= number) {
                        closeRootMode();
                        throw new types_1.OakUserException("\u8D85\u51FA\u5206\u4EAB\u4E0A\u9650\u4EBA\u6570".concat(number, "\u4EBA"));
                    }
                    Object.assign(userEntityGrant, {
                        confirmed: confirmed + 1,
                    });
                    if (number === 1) {
                        // 单次分享 附上接收者id
                        Object.assign(userEntityGrant, {
                            granteeId: userId,
                        });
                    }
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
                    result2 = _l.sent();
                    if (!result2.length) return [3 /*break*/, 3];
                    e = new types_1.OakRowInconsistencyException(undefined, '已领取该权限');
                    e.addData('userRelation', result2);
                    closeRootMode();
                    throw e;
                case 3:
                    _l.trys.push([3, 10, , 11]);
                    _c = (_b = context).operate;
                    _d = ['userRelation'];
                    _h = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 4:
                    _h.id = _l.sent(),
                        _h.action = 'create';
                    _j = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 5: return [4 /*yield*/, _c.apply(_b, _d.concat([(_h.data = (_j.id = _l.sent(),
                            _j.userId = userId,
                            _j.relationId = relationId,
                            _j.entity = entity,
                            _j.entityId = entityId,
                            _j),
                            _h), {
                            dontCollect: true,
                        }]))];
                case 6:
                    _l.sent();
                    if (!(type === 'transfer')) return [3 /*break*/, 9];
                    _f = (_e = context).operate;
                    _g = ['userRelation'];
                    _k = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 7: return [4 /*yield*/, _f.apply(_e, _g.concat([(_k.id = _l.sent(),
                            _k.action = 'remove',
                            _k.data = {},
                            _k.filter = {
                                relationId: relationId,
                                userId: granterId,
                                entity: entity,
                                entityId: entityId,
                            },
                            _k), {
                            dontCollect: true,
                        }]))];
                case 8:
                    _l.sent();
                    _l.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    err_1 = _l.sent();
                    closeRootMode();
                    throw err_1;
                case 11:
                    closeRootMode();
                    return [2 /*return*/, 1];
            }
        });
    });
}
exports.confirmUserEntityGrant = confirmUserEntityGrant;
