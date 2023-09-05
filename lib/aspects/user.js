"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPassword = exports.getChangePasswordChannels = exports.mergeUser = void 0;
var tslib_1 = require("tslib");
var types_1 = require("oak-domain/lib/types");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var password_1 = require("../utils/password");
var assert_1 = require("oak-domain/lib/utils/assert");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
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
                    (0, assert_1.assert)(from);
                    (0, assert_1.assert)(to);
                    (0, assert_1.assert)(from !== to, '不能merge到相同user');
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
        var userId, mobileList, _a, user, result;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
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
                    mobileList = _b.sent();
                    return [4 /*yield*/, context.select('user', {
                            data: {
                                id: 1,
                                password: 1,
                            },
                            filter: {
                                id: userId,
                            }
                        }, {})];
                case 2:
                    _a = tslib_1.__read.apply(void 0, [_b.sent(), 1]), user = _a[0];
                    result = [];
                    if (mobileList.length > 0) {
                        result.push('mobile');
                    }
                    if (user.password) {
                        result.push('password');
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.getChangePasswordChannels = getChangePasswordChannels;
function updateUserPassword(params, context, innerLogic) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var userId, prevPassword, captcha, mobile, newPassword, closeRootMode, _a, user, _b, lastSuccessfulTemp, count1, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, aliveCaptcha, _o, _p, _q, _r, _s, _t, err_1;
        var _u, _v, _w, _x, _y, _z, _0, _1;
        return tslib_1.__generator(this, function (_2) {
            switch (_2.label) {
                case 0:
                    userId = params.userId, prevPassword = params.prevPassword, captcha = params.captcha, mobile = params.mobile, newPassword = params.newPassword;
                    closeRootMode = context.openRootMode();
                    _2.label = 1;
                case 1:
                    _2.trys.push([1, 23, , 24]);
                    return [4 /*yield*/, context.select('user', {
                            data: {
                                id: 1,
                                password: 1,
                            }
                        }, {})];
                case 2:
                    _a = tslib_1.__read.apply(void 0, [_2.sent(), 1]), user = _a[0];
                    if (!prevPassword) return [3 /*break*/, 14];
                    return [4 /*yield*/, context.select('changePasswordTemp', {
                            data: {
                                id: 1,
                                $$seq$$: 1,
                            },
                            filter: {
                                userId: userId,
                                $$createAt$$: {
                                    $gt: (0, dayjs_1.default)().startOf('day').valueOf(),
                                },
                                result: 'success',
                            },
                            sorter: [
                                {
                                    $attr: {
                                        $$seq$$: 1,
                                    },
                                    $direction: 'desc',
                                },
                            ],
                            indexFrom: 0,
                            count: 1,
                        }, {})];
                case 3:
                    _b = tslib_1.__read.apply(void 0, [_2.sent(), 1]), lastSuccessfulTemp = _b[0];
                    return [4 /*yield*/, context.count('changePasswordTemp', {
                            filter: lastSuccessfulTemp ? {
                                userId: userId,
                                $$seq$$: {
                                    $gt: lastSuccessfulTemp.$$seq$$,
                                },
                                result: 'fail',
                            } : {
                                userId: userId,
                                $$createAt$$: {
                                    $gt: (0, dayjs_1.default)().startOf('day').valueOf(),
                                },
                                result: 'fail',
                            },
                        }, {})];
                case 4:
                    count1 = _2.sent();
                    if (count1 >= 5) {
                        closeRootMode();
                        return [2 /*return*/, {
                                result: '您今天已尝试过太多次，请稍候再进行操作',
                                times: count1,
                            }];
                    }
                    if (!(user.password === prevPassword)) return [3 /*break*/, 10];
                    _d = (_c = context).operate;
                    _e = ['user'];
                    _u = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 5: return [4 /*yield*/, _d.apply(_c, _e.concat([(_u.id = _2.sent(),
                            _u.action = 'update',
                            _u.data = {
                                password: newPassword,
                                passwordSha1: (0, password_1.encryptPasswordSha1)(newPassword)
                            },
                            _u.filter = {
                                id: userId,
                            },
                            _u), {}]))];
                case 6:
                    _2.sent();
                    _g = (_f = context).operate;
                    _h = ['changePasswordTemp'];
                    _v = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 7:
                    _v.id = _2.sent(),
                        _v.action = 'create';
                    _w = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 8: return [4 /*yield*/, _g.apply(_f, _h.concat([(_v.data = (_w.id = _2.sent(),
                            _w.userId = userId,
                            _w.prevPassword = prevPassword,
                            _w.newPassword = newPassword,
                            _w.result = 'success',
                            _w),
                            _v), {}]))];
                case 9:
                    _2.sent();
                    closeRootMode();
                    return [2 /*return*/, {
                            result: 'success'
                        }];
                case 10:
                    _k = (_j = context).operate;
                    _l = ['changePasswordTemp'];
                    _x = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 11:
                    _x.id = _2.sent(),
                        _x.action = 'create';
                    _y = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 12: return [4 /*yield*/, _k.apply(_j, _l.concat([(_x.data = (_y.id = _2.sent(),
                            _y.userId = userId,
                            _y.prevPassword = prevPassword,
                            _y.newPassword = newPassword,
                            _y.result = 'fail',
                            _y),
                            _x), {}]))];
                case 13:
                    _2.sent();
                    closeRootMode();
                    return [2 /*return*/, {
                            result: '原密码不正确，请检查后输入',
                            times: count1,
                        }];
                case 14:
                    if (!(mobile && captcha)) return [3 /*break*/, 22];
                    return [4 /*yield*/, context.select('captcha', {
                            data: {
                                id: 1,
                            },
                            filter: {
                                mobile: mobile,
                                code: captcha,
                                expired: false,
                            },
                            indexFrom: 0,
                            count: 1,
                        }, {})];
                case 15:
                    _m = tslib_1.__read.apply(void 0, [_2.sent(), 1]), aliveCaptcha = _m[0];
                    if (!aliveCaptcha) return [3 /*break*/, 21];
                    _p = (_o = context).operate;
                    _q = ['user'];
                    _z = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 16: return [4 /*yield*/, _p.apply(_o, _q.concat([(_z.id = _2.sent(),
                            _z.action = 'update',
                            _z.data = {
                                password: newPassword,
                                passwordSha1: (0, password_1.encryptPasswordSha1)(newPassword)
                            },
                            _z.filter = {
                                id: userId,
                            },
                            _z), {}]))];
                case 17:
                    _2.sent();
                    _s = (_r = context).operate;
                    _t = ['changePasswordTemp'];
                    _0 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 18:
                    _0.id = _2.sent(),
                        _0.action = 'create';
                    _1 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 19: return [4 /*yield*/, _s.apply(_r, _t.concat([(_0.data = (_1.id = _2.sent(),
                            _1.userId = userId,
                            _1.prevPassword = user.password,
                            _1.newPassword = newPassword,
                            _1.result = 'success',
                            _1),
                            _0), {}]))];
                case 20:
                    _2.sent();
                    closeRootMode();
                    return [2 /*return*/, {
                            result: 'success'
                        }];
                case 21:
                    closeRootMode();
                    return [2 /*return*/, {
                            result: '验证码错误',
                        }];
                case 22:
                    closeRootMode();
                    return [2 /*return*/, {
                            result: '缺少原密码或验证码，请检查后再进行操作'
                        }];
                case 23:
                    err_1 = _2.sent();
                    closeRootMode();
                    throw err_1;
                case 24: return [2 /*return*/];
            }
        });
    });
}
exports.updateUserPassword = updateUserPassword;
