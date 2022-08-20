"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCaptcha = exports.syncUserInfoWechatMp = exports.loginWechatMp = exports.loginWechat = exports.loginByMobile = void 0;
var tslib_1 = require("tslib");
var oak_external_sdk_1 = require("oak-external-sdk");
var assert_1 = require("oak-domain/lib/utils/assert");
var lodash_1 = require("oak-domain/lib/utils/lodash");
var types_1 = require("oak-domain/lib/types");
var extraFile_1 = require("../utils/extraFile");
var Exceptions_1 = require("../types/Exceptions");
var password_1 = require("../utils/password");
function makeDistinguishException(userId, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var rowStore, _a, user, password, passwordOrigin, idState, wechatUser$user, email$user;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    rowStore = context.rowStore;
                    return [4 /*yield*/, rowStore.select('user', {
                            data: {
                                id: 1,
                                password: 1,
                                passwordOrigin: 1,
                                idState: 1,
                                wechatUser$user: {
                                    $entity: 'wechatUser',
                                    data: {
                                        id: 1,
                                    },
                                },
                                email$user: {
                                    $entity: 'email',
                                    data: {
                                        id: 1,
                                        email: 1,
                                    }
                                }
                            },
                            filter: {
                                id: userId,
                            }
                        }, context)];
                case 1:
                    _a = tslib_1.__read.apply(void 0, [(_b.sent()).result, 1]), user = _a[0];
                    (0, assert_1.assert)(user);
                    password = user.password, passwordOrigin = user.passwordOrigin, idState = user.idState, wechatUser$user = user.wechatUser$user, email$user = user.email$user;
                    return [2 /*return*/, new Exceptions_1.OakDistinguishUserException(userId, !!(password || passwordOrigin), idState === 'verified', wechatUser$user.length > 0, email$user.length > 0)];
            }
        });
    });
}
function tryMakeChangeLoginWay(userId, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var rowStore, _a, user, _b, idState, wechatUser$user, email$user;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    rowStore = context.rowStore;
                    return [4 /*yield*/, rowStore.select('user', {
                            data: {
                                id: 1,
                                idState: 1,
                                wechatUser$user: {
                                    $entity: 'wechatUser',
                                    data: {
                                        id: 1,
                                    },
                                },
                                email$user: {
                                    $entity: 'email',
                                    data: {
                                        id: 1,
                                        email: 1,
                                    }
                                }
                            },
                            filter: {
                                id: userId,
                            }
                        }, context)];
                case 1:
                    _a = tslib_1.__read.apply(void 0, [(_c.sent()).result, 1]), user = _a[0];
                    (0, assert_1.assert)(user);
                    _b = user, idState = _b.idState, wechatUser$user = _b.wechatUser$user, email$user = _b.email$user;
                    if (idState === 'verified' || wechatUser$user.length > 0 || email$user.length > 0) {
                        return [2 /*return*/, new Exceptions_1.OakChangLoginWayException(userId, idState === 'verified', wechatUser$user.length > 0, email$user.length > 0)];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function setupMobile(mobile, env, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var rowStore, currentToken, applicationId, systemId, result2, _a, mobileRow, userId, tokenData, user, userState, _b, _c, _d, mobileData, _e, _f, _g, userData, _h, _j, _k, tokenData, _l, _m, _o;
        var _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        return tslib_1.__generator(this, function (_z) {
            switch (_z.label) {
                case 0:
                    rowStore = context.rowStore;
                    return [4 /*yield*/, context.getToken()];
                case 1:
                    currentToken = _z.sent();
                    applicationId = context.getApplicationId();
                    return [4 /*yield*/, context.getSystemId()];
                case 2:
                    systemId = _z.sent();
                    return [4 /*yield*/, rowStore.select('mobile', {
                            data: {
                                id: 1,
                                mobile: 1,
                                userId: 1,
                                ableState: 1,
                                user: {
                                    id: 1,
                                    userState: 1,
                                    wechatUser$user: {
                                        $entity: 'wechatUser',
                                        data: {
                                            id: 1,
                                        },
                                    },
                                },
                            },
                            filter: {
                                mobile: mobile,
                                ableState: 'enabled',
                                user: {
                                    systemId: systemId,
                                }
                            }
                        }, context, { dontCollect: true })];
                case 3:
                    result2 = (_z.sent()).result;
                    if (!(result2.length > 0)) return [3 /*break*/, 12];
                    // 此手机号已经存在
                    (0, assert_1.assert)(result2.length === 1);
                    _a = tslib_1.__read(result2, 1), mobileRow = _a[0];
                    if (!currentToken) return [3 /*break*/, 7];
                    if (!(currentToken.userId === mobileRow.userId)) return [3 /*break*/, 4];
                    return [2 /*return*/, currentToken.id];
                case 4:
                    userId = mobileRow.userId;
                    return [4 /*yield*/, makeDistinguishException(userId, context)];
                case 5: throw _z.sent();
                case 6: return [3 /*break*/, 11];
                case 7:
                    _p = {};
                    return [4 /*yield*/, generateNewId()];
                case 8:
                    tokenData = (_p.id = _z.sent(),
                        _p.applicationId = applicationId,
                        _p.playerId = mobileRow.userId,
                        _p.env = env,
                        _p);
                    user = mobileRow.user;
                    userState = user.userState;
                    switch (userState) {
                        case 'disabled': {
                            throw new Exceptions_1.OakUserDisabledException();
                        }
                        case 'shadow': {
                            Object.assign(tokenData, {
                                userId: mobileRow.userId,
                                user: {
                                    action: 'activate',
                                }
                            });
                            break;
                        }
                        default: {
                            (0, assert_1.assert)(userState === 'normal');
                            Object.assign(tokenData, {
                                userId: mobileRow.id,
                            });
                        }
                    }
                    _c = (_b = rowStore).operate;
                    _d = ['token'];
                    _q = {};
                    return [4 /*yield*/, generateNewId()];
                case 9: return [4 /*yield*/, _c.apply(_b, _d.concat([(_q.id = _z.sent(),
                            _q.data = tokenData,
                            _q.action = 'create',
                            _q), context]))];
                case 10:
                    _z.sent();
                    return [2 /*return*/, tokenData.id];
                case 11: return [3 /*break*/, 24];
                case 12:
                    if (!currentToken) return [3 /*break*/, 16];
                    _r = {};
                    return [4 /*yield*/, generateNewId()];
                case 13:
                    mobileData = (_r.id = _z.sent(),
                        _r.mobile = mobile,
                        _r.userId = currentToken.userId,
                        _r);
                    _f = (_e = rowStore).operate;
                    _g = ['mobile'];
                    _s = {};
                    return [4 /*yield*/, generateNewId()];
                case 14: return [4 /*yield*/, _f.apply(_e, _g.concat([(_s.id = _z.sent(),
                            _s.action = 'create',
                            _s.data = mobileData,
                            _s), context]))];
                case 15:
                    _z.sent();
                    return [2 /*return*/, currentToken.id];
                case 16:
                    _t = {};
                    return [4 /*yield*/, generateNewId()];
                case 17:
                    userData = (_t.id = _z.sent(),
                        _t.userState = 'normal',
                        _t.systemId = systemId,
                        _t);
                    _j = (_h = rowStore).operate;
                    _k = ['user'];
                    _u = {};
                    return [4 /*yield*/, generateNewId()];
                case 18: return [4 /*yield*/, _j.apply(_h, _k.concat([(_u.id = _z.sent(),
                            _u.action = 'create',
                            _u.data = userData,
                            _u), context]))];
                case 19:
                    _z.sent();
                    _v = {};
                    return [4 /*yield*/, generateNewId()];
                case 20:
                    _v.id = _z.sent(),
                        _v.userId = userData.id,
                        _v.playerId = userData.id,
                        _v.env = env;
                    _w = {
                        action: 'create'
                    };
                    _x = {};
                    return [4 /*yield*/, generateNewId()];
                case 21:
                    tokenData = (_v.mobile = (_w.data = (_x.id = _z.sent(),
                        _x.mobile = mobile,
                        _x.userId = userData.id,
                        _x),
                        _w),
                        _v);
                    _m = (_l = rowStore).operate;
                    _o = ['token'];
                    _y = {};
                    return [4 /*yield*/, generateNewId()];
                case 22: return [4 /*yield*/, _m.apply(_l, _o.concat([(_y.id = _z.sent(),
                            _y.action = 'create',
                            _y.data = tokenData,
                            _y), context]))];
                case 23:
                    _z.sent();
                    return [2 /*return*/, tokenData.id];
                case 24: return [2 /*return*/];
            }
        });
    });
}
function loginByMobile(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var mobile, captcha, password, env, rowStore, systemId, result, _a, captchaRow, result, _b, _c, mobileRow, _d, ableState, userId, exception;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    mobile = params.mobile, captcha = params.captcha, password = params.password, env = params.env;
                    rowStore = context.rowStore;
                    return [4 /*yield*/, context.getSystemId()];
                case 1:
                    systemId = _e.sent();
                    if (!captcha) return [3 /*break*/, 6];
                    return [4 /*yield*/, rowStore.select('captcha', {
                            data: {
                                id: 1,
                                expired: 1,
                            },
                            filter: {
                                mobile: mobile,
                                code: captcha,
                            },
                            sorter: [{
                                    $attr: {
                                        $$createAt$$: 1,
                                    },
                                    $direction: 'desc',
                                }],
                            indexFrom: 0,
                            count: 1,
                        }, context, { dontCollect: true })];
                case 2:
                    result = (_e.sent()).result;
                    if (!(result.length > 0)) return [3 /*break*/, 4];
                    _a = tslib_1.__read(result, 1), captchaRow = _a[0];
                    if (captchaRow.expired) {
                        throw new types_1.OakUserException('验证码已经过期');
                    }
                    return [4 /*yield*/, setupMobile(mobile, env, context)];
                case 3: 
                // 到这里说明验证码已经通过
                return [2 /*return*/, _e.sent()];
                case 4: throw new types_1.OakUserException('验证码无效');
                case 5: return [3 /*break*/, 14];
                case 6:
                    (0, assert_1.assert)(password);
                    return [4 /*yield*/, rowStore.select('mobile', {
                            data: {
                                id: 1,
                                userId: 1,
                                ableState: 1,
                            },
                            filter: {
                                mobile: mobile,
                                user: {
                                    $or: [
                                        {
                                            password: password,
                                        },
                                        {
                                            passwordSha1: (0, password_1.encryptPasswordSha1)(password),
                                        }
                                    ],
                                    systemId: systemId,
                                },
                            }
                        }, context)];
                case 7:
                    result = (_e.sent()).result;
                    _b = result.length;
                    switch (_b) {
                        case 0: return [3 /*break*/, 8];
                        case 1: return [3 /*break*/, 9];
                    }
                    return [3 /*break*/, 13];
                case 8:
                    {
                        throw new types_1.OakUserException('用户名与密码不匹配');
                    }
                    _e.label = 9;
                case 9:
                    _c = tslib_1.__read(result, 1), mobileRow = _c[0];
                    _d = mobileRow, ableState = _d.ableState, userId = _d.userId;
                    if (!(ableState === 'disabled')) return [3 /*break*/, 11];
                    return [4 /*yield*/, tryMakeChangeLoginWay(userId, context)];
                case 10:
                    exception = _e.sent();
                    if (exception) {
                        throw exception;
                    }
                    _e.label = 11;
                case 11: return [4 /*yield*/, setupMobile(mobile, env, context)];
                case 12: return [2 /*return*/, _e.sent()];
                case 13:
                    {
                        throw new Error("\u624B\u673A\u53F7\u548C\u5BC6\u7801\u5339\u914D\u51FA\u73B0\u96F7\u540C\uFF0Cmobile id\u662F[".concat(result.map(function (ele) { return ele.id; }).join(','), "], mobile\u662F").concat(mobile));
                    }
                    _e.label = 14;
                case 14: return [2 /*return*/];
            }
        });
    });
}
exports.loginByMobile = loginByMobile;
/**
 * 公众号授权登录
 * @param param0
 * @param context
 */
function loginWechat(_a, context) {
    var code = _a.code, env = _a.env;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var rowStore, application, _b, type, config, systemId, config2, appId, appSecret, wechatInstance, _c, sessionKey, openId, unionId, _d, wechatUser, id, wechatUser2, wechatUserUpdateData, _e, token, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, wechatUser3, wechatUser2, _u, _v, _w, wechatUserCreateData_1, _x, _y, _z, userData, wechatUserCreateData, _0, _1, _2;
        var _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15;
        return tslib_1.__generator(this, function (_16) {
            switch (_16.label) {
                case 0:
                    rowStore = context.rowStore;
                    return [4 /*yield*/, context.getApplication()];
                case 1:
                    application = _16.sent();
                    _b = application, type = _b.type, config = _b.config, systemId = _b.systemId;
                    // 可能type是web或者wechatPublic
                    (0, assert_1.assert)(type !== 'wechatMp' && config.type !== 'wechatMp');
                    if (type === 'wechatPublic') {
                        config2 = config;
                    }
                    else {
                        config2 = config;
                    }
                    appId = config2.appId, appSecret = config2.appSecret;
                    wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, appSecret, type);
                    return [4 /*yield*/, wechatInstance.code2Session(code)];
                case 2:
                    _c = _16.sent(), sessionKey = _c.sessionKey, openId = _c.openId, unionId = _c.unionId;
                    return [4 /*yield*/, rowStore.select('wechatUser', {
                            data: {
                                id: 1,
                                userId: 1,
                                unionId: 1,
                                user: {
                                    id: 1,
                                    name: 1,
                                    nickname: 1,
                                    userRole$user: {
                                        $entity: 'userRole',
                                        data: {
                                            id: 1,
                                            userId: 1,
                                            roleId: 1,
                                        },
                                    }
                                }
                            },
                            filter: {
                                applicationId: application.id,
                                openId: openId,
                            }
                        }, context)];
                case 3:
                    _d = tslib_1.__read.apply(void 0, [(_16.sent()).result, 1]), wechatUser = _d[0];
                    return [4 /*yield*/, generateNewId()];
                case 4:
                    id = _16.sent();
                    if (!wechatUser) return [3 /*break*/, 16];
                    wechatUser2 = wechatUser;
                    wechatUserUpdateData = {
                        sessionKey: sessionKey,
                    };
                    if (unionId !== wechatUser.unionId) {
                        Object.assign(wechatUserUpdateData, {
                            unionId: unionId,
                        });
                    }
                    if (!wechatUser2.userId) return [3 /*break*/, 11];
                    return [4 /*yield*/, rowStore.select('token', {
                            data: {
                                id: 1,
                                applicationId: 1,
                                env: 1,
                            },
                            filter: {
                                applicationId: application.id,
                                ableState: 'enabled',
                                userId: wechatUser2.userId,
                                playerId: wechatUser2.userId,
                                entity: 'wechatUser',
                                entityId: wechatUser2.id,
                            },
                        }, context, {
                            ignoreTrigger: true,
                        })];
                case 5:
                    _e = tslib_1.__read.apply(void 0, [(_16.sent()).result, 1]), token = _e[0];
                    if (!(token && (0, lodash_1.isEqual)(token.env, env))) return [3 /*break*/, 8];
                    _g = (_f = rowStore).operate;
                    _h = ['token'];
                    _3 = {};
                    return [4 /*yield*/, generateNewId()];
                case 6: return [4 /*yield*/, _g.apply(_f, _h.concat([(_3.id = _16.sent(),
                            _3.action = 'update',
                            _3.data = {
                                wechatUser: {
                                    action: 'update',
                                    data: wechatUserUpdateData,
                                }
                            },
                            _3.filter = {
                                id: token.id,
                            },
                            _3), context]))];
                case 7:
                    _16.sent();
                    return [2 /*return*/, token.id];
                case 8:
                    _k = (_j = rowStore).operate;
                    _l = ['token'];
                    _4 = {};
                    return [4 /*yield*/, generateNewId()];
                case 9: return [4 /*yield*/, _k.apply(_j, _l.concat([(_4.id = _16.sent(),
                            _4.action = 'disable',
                            _4.data = {},
                            _4.filter = {
                                applicationId: application.id,
                                ableState: 'enabled',
                                userId: wechatUser2.userId,
                                playerId: wechatUser2.userId,
                            },
                            _4), context]))];
                case 10:
                    _16.sent();
                    return [3 /*break*/, 13];
                case 11:
                    // 创建user
                    _o = (_m = Object).assign;
                    _p = [wechatUserUpdateData];
                    _5 = {};
                    _6 = {
                        action: 'create'
                    };
                    _7 = {};
                    return [4 /*yield*/, generateNewId()];
                case 12:
                    // 创建user
                    _o.apply(_m, _p.concat([(_5.user = (_6.data = (_7.id = _16.sent(),
                            _7.userState = 'normal',
                            _7),
                            _6),
                            _5)]));
                    _16.label = 13;
                case 13:
                    _r = (_q = rowStore).operate;
                    _s = ['token'];
                    _8 = {};
                    return [4 /*yield*/, generateNewId()];
                case 14: return [4 /*yield*/, _r.apply(_q, _s.concat([(_8.id = _16.sent(),
                            _8.action = 'create',
                            _8.data = {
                                id: id,
                                userId: wechatUser2.userId,
                                playerId: wechatUser2.userId,
                                applicationId: application.id,
                                entity: 'wechatUser',
                                entityId: wechatUser2.id,
                                wechatUser: {
                                    action: 'update',
                                    data: wechatUserUpdateData,
                                },
                                env: env
                            },
                            _8), context]))];
                case 15:
                    _16.sent();
                    return [2 /*return*/, id];
                case 16:
                    if (!unionId) return [3 /*break*/, 23];
                    return [4 /*yield*/, rowStore.select('wechatUser', {
                            data: {
                                id: 1,
                                userId: 1,
                                unionId: 1,
                            },
                            filter: {
                                application: {
                                    systemId: application.systemId,
                                },
                                unionId: unionId,
                            }
                        }, context)];
                case 17:
                    _t = tslib_1.__read.apply(void 0, [(_16.sent()).result, 1]), wechatUser3 = _t[0];
                    wechatUser2 = wechatUser3;
                    if (!(wechatUser2 && wechatUser2.userId)) return [3 /*break*/, 23];
                    _v = (_u = rowStore).operate;
                    _w = ['token'];
                    _9 = {};
                    return [4 /*yield*/, generateNewId()];
                case 18: return [4 /*yield*/, _v.apply(_u, _w.concat([(_9.id = _16.sent(),
                            _9.action = 'disable',
                            _9.data = {},
                            _9.filter = {
                                applicationId: application.id,
                                ableState: 'enabled',
                                userId: wechatUser2.userId,
                                playerId: wechatUser2.userId,
                            },
                            _9), context]))];
                case 19:
                    _16.sent();
                    _10 = {};
                    return [4 /*yield*/, generateNewId()];
                case 20:
                    wechatUserCreateData_1 = (_10.id = _16.sent(),
                        _10.sessionKey = sessionKey,
                        _10.unionId = unionId,
                        _10.origin = 'mp',
                        _10.openId = openId,
                        _10.applicationId = application.id,
                        _10.userId = wechatUser2.userId,
                        _10);
                    _y = (_x = rowStore).operate;
                    _z = ['token'];
                    _11 = {};
                    return [4 /*yield*/, generateNewId()];
                case 21: return [4 /*yield*/, _y.apply(_x, _z.concat([(_11.id = _16.sent(),
                            _11.action = 'create',
                            _11.data = {
                                id: id,
                                userId: wechatUser2.userId,
                                playerId: wechatUser2.userId,
                                applicationId: application.id,
                                wechatUser: {
                                    action: 'create',
                                    data: wechatUserCreateData_1,
                                },
                                env: env,
                            },
                            _11), context]))];
                case 22:
                    _16.sent();
                    return [2 /*return*/, id];
                case 23:
                    _12 = {};
                    return [4 /*yield*/, generateNewId()];
                case 24:
                    userData = (_12.id = _16.sent(),
                        _12.userState = 'normal',
                        _12.systemId = systemId,
                        _12);
                    _13 = {};
                    return [4 /*yield*/, generateNewId()];
                case 25:
                    _13.id = _16.sent(),
                        _13.sessionKey = sessionKey,
                        _13.unionId = unionId,
                        _13.origin = type === 'wechatPublic' ? 'public' : 'web',
                        _13.openId = openId,
                        _13.applicationId = application.id;
                    _14 = {};
                    return [4 /*yield*/, generateNewId()];
                case 26:
                    wechatUserCreateData = (_13.user = (_14.id = _16.sent(),
                        _14.action = 'create',
                        _14.data = userData,
                        _14),
                        _13);
                    _1 = (_0 = rowStore).operate;
                    _2 = ['token'];
                    _15 = {};
                    return [4 /*yield*/, generateNewId()];
                case 27: return [4 /*yield*/, _1.apply(_0, _2.concat([(_15.id = _16.sent(),
                            _15.action = 'create',
                            _15.data = {
                                id: id,
                                userId: userData.id,
                                playerId: userData.id,
                                applicationId: application.id,
                                wechatUser: {
                                    action: 'create',
                                    data: wechatUserCreateData,
                                },
                                env: env,
                            },
                            _15), context]))];
                case 28:
                    _16.sent();
                    return [2 /*return*/, id];
            }
        });
    });
}
exports.loginWechat = loginWechat;
/**
 * 小程序授权登录
 * @param param0
 * @param context
 * @returns
 */
function loginWechatMp(_a, context) {
    var code = _a.code, env = _a.env;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var rowStore, application, _b, type, config, systemId, config2, appId, appSecret, wechatInstance, _c, sessionKey, openId, unionId, _d, wechatUser, id, wechatUser2, wechatUserUpdateData, _e, token, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, wechatUser3, wechatUser2, _u, _v, _w, wechatUserCreateData_2, _x, _y, _z, userData, wechatUserCreateData, _0, _1, _2;
        var _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17;
        return tslib_1.__generator(this, function (_18) {
            switch (_18.label) {
                case 0:
                    rowStore = context.rowStore;
                    return [4 /*yield*/, context.getApplication()];
                case 1:
                    application = _18.sent();
                    _b = application, type = _b.type, config = _b.config, systemId = _b.systemId;
                    (0, assert_1.assert)(type === 'wechatMp' || config.type === 'wechatMp');
                    config2 = config;
                    appId = config2.appId, appSecret = config2.appSecret;
                    wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, appSecret, 'wechatMp');
                    return [4 /*yield*/, wechatInstance.code2Session(code)];
                case 2:
                    _c = _18.sent(), sessionKey = _c.sessionKey, openId = _c.openId, unionId = _c.unionId;
                    return [4 /*yield*/, rowStore.select('wechatUser', {
                            data: {
                                id: 1,
                                userId: 1,
                                unionId: 1,
                                user: {
                                    id: 1,
                                    name: 1,
                                    nickname: 1,
                                    userRole$user: {
                                        $entity: 'userRole',
                                        data: {
                                            id: 1,
                                            userId: 1,
                                            roleId: 1,
                                        },
                                    }
                                }
                            },
                            filter: {
                                applicationId: application.id,
                                openId: openId,
                            }
                        }, context)];
                case 3:
                    _d = tslib_1.__read.apply(void 0, [(_18.sent()).result, 1]), wechatUser = _d[0];
                    return [4 /*yield*/, generateNewId()];
                case 4:
                    id = _18.sent();
                    if (!wechatUser) return [3 /*break*/, 16];
                    wechatUser2 = wechatUser;
                    wechatUserUpdateData = {
                        sessionKey: sessionKey,
                    };
                    if (unionId !== wechatUser.unionId) {
                        Object.assign(wechatUserUpdateData, {
                            unionId: unionId,
                        });
                    }
                    if (!wechatUser2.userId) return [3 /*break*/, 11];
                    return [4 /*yield*/, rowStore.select('token', {
                            data: {
                                id: 1,
                                applicationId: 1,
                                env: 1,
                            },
                            filter: {
                                applicationId: application.id,
                                ableState: 'enabled',
                                userId: wechatUser2.userId,
                                playerId: wechatUser2.userId,
                                entity: 'wechatUser',
                                entityId: wechatUser2.id,
                            },
                        }, context, { dummy: 1, ignoreTrigger: true })];
                case 5:
                    _e = tslib_1.__read.apply(void 0, [(_18.sent()).result, 1]), token = _e[0];
                    if (!(token && (0, lodash_1.isEqual)(token.env, env))) return [3 /*break*/, 8];
                    _g = (_f = rowStore).operate;
                    _h = ['token'];
                    _3 = {};
                    return [4 /*yield*/, generateNewId()];
                case 6: return [4 /*yield*/, _g.apply(_f, _h.concat([(_3.id = _18.sent(),
                            _3.action = 'update',
                            _3.data = {
                                wechatUser: {
                                    action: 'update',
                                    data: wechatUserUpdateData,
                                }
                            },
                            _3.filter = {
                                id: token.id,
                            },
                            _3), context]))];
                case 7:
                    _18.sent();
                    return [2 /*return*/, token.id];
                case 8:
                    _k = (_j = rowStore).operate;
                    _l = ['token'];
                    _4 = {};
                    return [4 /*yield*/, generateNewId()];
                case 9: return [4 /*yield*/, _k.apply(_j, _l.concat([(_4.id = _18.sent(),
                            _4.action = 'disable',
                            _4.data = {},
                            _4.filter = {
                                applicationId: application.id,
                                ableState: 'enabled',
                                userId: wechatUser2.userId,
                                playerId: wechatUser2.userId,
                            },
                            _4), context]))];
                case 10:
                    _18.sent();
                    return [3 /*break*/, 13];
                case 11:
                    // 创建user
                    _o = (_m = Object).assign;
                    _p = [wechatUserUpdateData];
                    _5 = {};
                    _6 = {
                        action: 'create'
                    };
                    _7 = {};
                    return [4 /*yield*/, generateNewId()];
                case 12:
                    // 创建user
                    _o.apply(_m, _p.concat([(_5.user = (_6.data = (_7.id = _18.sent(),
                            _7.userState = 'normal',
                            _7),
                            _6),
                            _5)]));
                    _18.label = 13;
                case 13:
                    _r = (_q = rowStore).operate;
                    _s = ['token'];
                    _8 = {};
                    return [4 /*yield*/, generateNewId()];
                case 14: return [4 /*yield*/, _r.apply(_q, _s.concat([(_8.id = _18.sent(),
                            _8.action = 'create',
                            _8.data = {
                                id: id,
                                userId: wechatUser2.userId,
                                playerId: wechatUser2.userId,
                                applicationId: application.id,
                                entity: 'wechatUser',
                                entityId: wechatUser2.id,
                                wechatUser: {
                                    action: 'update',
                                    data: wechatUserUpdateData,
                                },
                                env: env
                            },
                            _8), context]))];
                case 15:
                    _18.sent();
                    return [2 /*return*/, id];
                case 16:
                    if (!unionId) return [3 /*break*/, 23];
                    return [4 /*yield*/, rowStore.select('wechatUser', {
                            data: {
                                id: 1,
                                userId: 1,
                                unionId: 1,
                            },
                            filter: {
                                application: {
                                    systemId: application.systemId,
                                },
                                unionId: unionId,
                            }
                        }, context)];
                case 17:
                    _t = tslib_1.__read.apply(void 0, [(_18.sent()).result, 1]), wechatUser3 = _t[0];
                    wechatUser2 = wechatUser3;
                    if (!(wechatUser2 && wechatUser2.userId)) return [3 /*break*/, 23];
                    _v = (_u = rowStore).operate;
                    _w = ['token'];
                    _9 = {};
                    return [4 /*yield*/, generateNewId()];
                case 18: return [4 /*yield*/, _v.apply(_u, _w.concat([(_9.id = _18.sent(),
                            _9.action = 'disable',
                            _9.data = {},
                            _9.filter = {
                                applicationId: application.id,
                                ableState: 'enabled',
                                userId: wechatUser2.userId,
                                playerId: wechatUser2.userId,
                            },
                            _9), context]))];
                case 19:
                    _18.sent();
                    _10 = {};
                    return [4 /*yield*/, generateNewId()];
                case 20:
                    wechatUserCreateData_2 = (_10.id = _18.sent(),
                        _10.sessionKey = sessionKey,
                        _10.unionId = unionId,
                        _10.origin = 'mp',
                        _10.openId = openId,
                        _10.applicationId = application.id,
                        _10.userId = wechatUser2.userId,
                        _10);
                    _y = (_x = rowStore).operate;
                    _z = ['token'];
                    _11 = {};
                    return [4 /*yield*/, generateNewId()];
                case 21: return [4 /*yield*/, _y.apply(_x, _z.concat([(_11.id = _18.sent(),
                            _11.action = 'create',
                            _11.data = {
                                id: id,
                                userId: wechatUser2.userId,
                                playerId: wechatUser2.userId,
                                applicationId: application.id,
                                wechatUser: {
                                    action: 'create',
                                    data: wechatUserCreateData_2,
                                },
                                env: env,
                            },
                            _11), context]))];
                case 22:
                    _18.sent();
                    return [2 /*return*/, id];
                case 23:
                    _12 = {};
                    return [4 /*yield*/, generateNewId()];
                case 24:
                    userData = (_12.id = _18.sent(),
                        _12.userState = 'normal',
                        _12.systemId = systemId,
                        _12);
                    _13 = {};
                    return [4 /*yield*/, generateNewId()];
                case 25:
                    _13.id = _18.sent(),
                        _13.sessionKey = sessionKey,
                        _13.unionId = unionId,
                        _13.origin = 'mp',
                        _13.openId = openId,
                        _13.applicationId = application.id;
                    _14 = {};
                    return [4 /*yield*/, generateNewId()];
                case 26:
                    wechatUserCreateData = (_13.user = (_14.id = _18.sent(),
                        _14.action = 'create',
                        _14.data = userData,
                        _14),
                        _13);
                    _1 = (_0 = rowStore).operate;
                    _2 = ['token'];
                    _15 = {};
                    return [4 /*yield*/, generateNewId()];
                case 27:
                    _15.id = _18.sent(),
                        _15.action = 'create';
                    _16 = {
                        id: id,
                        userId: userData.id,
                        playerId: userData.id,
                        applicationId: application.id
                    };
                    _17 = {};
                    return [4 /*yield*/, generateNewId()];
                case 28: return [4 /*yield*/, _1.apply(_0, _2.concat([(_15.data = (_16.wechatUser = (_17.id = _18.sent(),
                            _17.action = 'create',
                            _17.data = wechatUserCreateData,
                            _17),
                            _16.env = env,
                            _16),
                            _15), context]))];
                case 29:
                    _18.sent();
                    return [2 /*return*/, id];
            }
        });
    });
}
exports.loginWechatMp = loginWechatMp;
/**
 * 同步从wx.getUserProfile拿到的用户信息
 * @param param0
 * @param context
 */
function syncUserInfoWechatMp(_a, context) {
    var nickname = _a.nickname, avatarUrl = _a.avatarUrl, encryptedData = _a.encryptedData, iv = _a.iv, signature = _a.signature;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var rowStore, userId, application, _b, _c, sessionKey, user, _d, originNickname, extraFile$entity, updateData, extraFileOperations, _e, _f, _g, _h, _j;
        var _k, _l, _m;
        return tslib_1.__generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    rowStore = context.rowStore;
                    return [4 /*yield*/, context.getToken()];
                case 1:
                    userId = (_o.sent()).userId;
                    return [4 /*yield*/, context.getApplication()];
                case 2:
                    application = _o.sent();
                    return [4 /*yield*/, rowStore.select('wechatUser', {
                            data: {
                                id: 1,
                                sessionKey: 1,
                                nickname: 1,
                                avatar: 1,
                                user: {
                                    id: 1,
                                    nickname: 1,
                                    extraFile$entity: {
                                        $entity: 'extraFile',
                                        data: {
                                            id: 1,
                                            tag1: 1,
                                            origin: 1,
                                            bucket: 1,
                                            objectId: 1,
                                            filename: 1,
                                            extra1: 1,
                                        },
                                        filter: {
                                            tag1: 'avatar',
                                        },
                                    }
                                }
                            },
                            filter: {
                                userId: userId,
                                applicationId: application.id,
                            }
                        }, context)];
                case 3:
                    _b = tslib_1.__read.apply(void 0, [(_o.sent()).result, 1]), _c = _b[0], sessionKey = _c.sessionKey, user = _c.user;
                    _d = user, originNickname = _d.nickname, extraFile$entity = _d.extraFile$entity;
                    updateData = {};
                    if (nickname !== originNickname) {
                        Object.assign(updateData, {
                            nickname: nickname,
                        });
                    }
                    if (!((extraFile$entity === null || extraFile$entity === void 0 ? void 0 : extraFile$entity.length) === 0 || (0, extraFile_1.composeFileUrl)(extraFile$entity[0]) !== avatarUrl)) return [3 /*break*/, 5];
                    _k = {
                        action: 'create'
                    };
                    _f = (_e = Object).assign;
                    _l = {};
                    return [4 /*yield*/, generateNewId()];
                case 4:
                    extraFileOperations = [
                        (_k.data = _f.apply(_e, [(_l.id = _o.sent(),
                                _l.tag1 = 'avatar',
                                _l.entity = 'user',
                                _l.entityId = userId,
                                _l), (0, extraFile_1.decomposeFileUrl)(avatarUrl)]),
                            _k)
                    ];
                    if (extraFile$entity.length > 0) {
                        extraFileOperations.push({
                            action: 'remove',
                            data: {},
                            filter: {
                                id: extraFile$entity[0].id,
                            }
                        });
                    }
                    Object.assign(updateData, {
                        extraFile$entity: extraFileOperations,
                    });
                    _o.label = 5;
                case 5:
                    if (!(Object.keys(updateData).length > 0)) return [3 /*break*/, 8];
                    _h = (_g = rowStore).operate;
                    _j = ['user'];
                    _m = {};
                    return [4 /*yield*/, generateNewId()];
                case 6: return [4 /*yield*/, _h.apply(_g, _j.concat([(_m.id = _o.sent(),
                            _m.action = 'update',
                            _m.data = updateData,
                            _m.filter = {
                                id: userId,
                            },
                            _m), context]))];
                case 7:
                    _o.sent();
                    _o.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.syncUserInfoWechatMp = syncUserInfoWechatMp;
function sendCaptcha(_a, context) {
    var mobile = _a.mobile, env = _a.env;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var type, visitorId, rowStore, now, _b, count1, count2, _c, captcha, code, code, id, _d, _e, _f;
        var _g;
        return tslib_1.__generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    type = env.type;
                    (0, assert_1.assert)(type === 'web');
                    visitorId = env.visitorId;
                    rowStore = context.rowStore;
                    now = Date.now();
                    if (!(process.env.NODE_ENV !== 'development')) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.all([
                            rowStore.count('captcha', {
                                filter: {
                                    visitorId: visitorId,
                                    $$createAt$$: {
                                        $gt: now - 3600 * 1000,
                                    },
                                },
                            }, context),
                            rowStore.count('captcha', {
                                filter: {
                                    mobile: mobile,
                                    $$createAt$$: {
                                        $gt: now - 3600 * 1000,
                                    },
                                }
                            }, context)
                        ])];
                case 1:
                    _b = tslib_1.__read.apply(void 0, [_h.sent(), 2]), count1 = _b[0], count2 = _b[1];
                    if (count1 > 5 || count2 > 5) {
                        throw new types_1.OakUserException('您已发送很多次短信，请休息会再发吧');
                    }
                    _h.label = 2;
                case 2: return [4 /*yield*/, rowStore.select('captcha', {
                        data: {
                            id: 1,
                            code: 1,
                            $$createAt$$: 1,
                        },
                        filter: {
                            mobile: mobile,
                            $$createAt$$: {
                                $gt: now - 60 * 1000,
                            },
                            expired: false,
                        }
                    }, context)];
                case 3:
                    _c = tslib_1.__read.apply(void 0, [(_h.sent()).result, 1]), captcha = _c[0];
                    if (!captcha) return [3 /*break*/, 4];
                    if (process.env.NODE_ENV === 'development') {
                        code = captcha.code;
                        return [2 /*return*/, "\u9A8C\u8BC1\u7801[".concat(code, "]\u5DF2\u521B\u5EFA")];
                    }
                    else if (captcha.$$createAt$$ - now < 60000) {
                        throw new types_1.OakUserException('您的操作太迅捷啦，请稍等再点吧');
                    }
                    else {
                        // todo 再次发送
                        return [2 /*return*/, '验证码已发送'];
                    }
                    return [3 /*break*/, 8];
                case 4:
                    code = void 0;
                    if (process.env.NODE_ENV === 'development') {
                        code = mobile.substring(7);
                    }
                    else {
                        code = Math.floor(Math.random() * 10000).toString();
                        while (code.length < 4) {
                            code += '0';
                        }
                    }
                    return [4 /*yield*/, generateNewId()];
                case 5:
                    id = _h.sent();
                    console.log('captcha created', id);
                    _e = (_d = rowStore).operate;
                    _f = ['captcha'];
                    _g = {};
                    return [4 /*yield*/, generateNewId()];
                case 6: return [4 /*yield*/, _e.apply(_d, _f.concat([(_g.id = _h.sent(),
                            _g.action = 'create',
                            _g.data = {
                                id: id,
                                mobile: mobile,
                                code: code,
                                visitorId: visitorId,
                                env: env,
                                expired: false,
                                expiresAt: now + 660 * 1000,
                            },
                            _g), context]))];
                case 7:
                    _h.sent();
                    if (process.env.NODE_ENV === 'development') {
                        return [2 /*return*/, "\u9A8C\u8BC1\u7801[".concat(code, "]\u5DF2\u521B\u5EFA")];
                    }
                    else {
                        return [2 /*return*/, '验证码已创建'];
                    }
                    _h.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.sendCaptcha = sendCaptcha;
