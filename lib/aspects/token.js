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
                        }, context, {
                            dontCollect: true,
                        })];
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
                        }, context, {
                            dontCollect: true,
                        })];
                case 1:
                    _a = tslib_1.__read.apply(void 0, [(_c.sent()).result, 1]), user = _a[0];
                    (0, assert_1.assert)(user);
                    _b = user, idState = _b.idState, wechatUser$user = _b.wechatUser$user, email$user = _b.email$user;
                    if (idState === 'verified' || wechatUser$user.length > 0 || email$user.length > 0) {
                        return [2 /*return*/, new Exceptions_1.OakChangeLoginWayException(userId, idState === 'verified', wechatUser$user.length > 0, email$user.length > 0)];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function setupMobile(mobile, env, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var rowStore, currentToken, applicationId, systemId, result2, _a, mobileRow, userId, tokenData, user, userState, _b, _c, _d, _e, _f, _g, _h, mobileData, _j, _k, _l, userData, _m, _o, _p, tokenData, _q, _r, _s;
        var _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
        return tslib_1.__generator(this, function (_5) {
            switch (_5.label) {
                case 0:
                    rowStore = context.rowStore;
                    return [4 /*yield*/, context.getToken()];
                case 1:
                    currentToken = _5.sent();
                    applicationId = context.getApplicationId();
                    return [4 /*yield*/, context.getSystemId()];
                case 2:
                    systemId = _5.sent();
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
                    result2 = (_5.sent()).result;
                    if (!(result2.length > 0)) return [3 /*break*/, 17];
                    // 此手机号已经存在
                    (0, assert_1.assert)(result2.length === 1);
                    _a = tslib_1.__read(result2, 1), mobileRow = _a[0];
                    if (!currentToken) return [3 /*break*/, 7];
                    if (!(currentToken.userId === mobileRow.userId)) return [3 /*break*/, 4];
                    return [2 /*return*/, currentToken.id];
                case 4:
                    userId = mobileRow.userId;
                    return [4 /*yield*/, makeDistinguishException(userId, context)];
                case 5: throw _5.sent();
                case 6: return [3 /*break*/, 16];
                case 7:
                    _t = {};
                    return [4 /*yield*/, generateNewId()];
                case 8:
                    tokenData = (_t.id = _5.sent(),
                        _t.applicationId = applicationId,
                        _t.playerId = mobileRow.userId,
                        _t.env = env,
                        _t.entity = 'mobile',
                        _t.entityId = mobileRow.id,
                        _t);
                    user = mobileRow.user;
                    userState = user.userState;
                    _b = userState;
                    switch (_b) {
                        case 'disabled': return [3 /*break*/, 9];
                        case 'shadow': return [3 /*break*/, 10];
                    }
                    return [3 /*break*/, 12];
                case 9:
                    {
                        throw new Exceptions_1.OakUserDisabledException();
                    }
                    _5.label = 10;
                case 10:
                    _d = (_c = Object).assign;
                    _e = [tokenData];
                    _u = {
                        userId: mobileRow.userId
                    };
                    _v = {};
                    return [4 /*yield*/, generateNewId()];
                case 11:
                    _d.apply(_c, _e.concat([(_u.user = (_v.id = _5.sent(),
                            _v.action = 'activate',
                            _v),
                            _u)]));
                    return [3 /*break*/, 13];
                case 12:
                    {
                        (0, assert_1.assert)(userState === 'normal');
                        Object.assign(tokenData, {
                            userId: mobileRow.userId,
                        });
                    }
                    _5.label = 13;
                case 13:
                    _g = (_f = rowStore).operate;
                    _h = ['token'];
                    _w = {};
                    return [4 /*yield*/, generateNewId()];
                case 14: return [4 /*yield*/, _g.apply(_f, _h.concat([(_w.id = _5.sent(),
                            _w.data = tokenData,
                            _w.action = 'create',
                            _w), context, {}]))];
                case 15:
                    _5.sent();
                    return [2 /*return*/, tokenData.id];
                case 16: return [3 /*break*/, 30];
                case 17:
                    if (!currentToken) return [3 /*break*/, 21];
                    _x = {};
                    return [4 /*yield*/, generateNewId()];
                case 18:
                    mobileData = (_x.id = _5.sent(),
                        _x.mobile = mobile,
                        _x.userId = currentToken.userId,
                        _x);
                    _k = (_j = rowStore).operate;
                    _l = ['mobile'];
                    _y = {};
                    return [4 /*yield*/, generateNewId()];
                case 19: return [4 /*yield*/, _k.apply(_j, _l.concat([(_y.id = _5.sent(),
                            _y.action = 'create',
                            _y.data = mobileData,
                            _y), context, {}]))];
                case 20:
                    _5.sent();
                    return [2 /*return*/, currentToken.id];
                case 21:
                    _z = {};
                    return [4 /*yield*/, generateNewId()];
                case 22:
                    userData = (_z.id = _5.sent(),
                        _z.userState = 'normal',
                        _z.systemId = systemId,
                        _z);
                    _o = (_m = rowStore).operate;
                    _p = ['user'];
                    _0 = {};
                    return [4 /*yield*/, generateNewId()];
                case 23: return [4 /*yield*/, _o.apply(_m, _p.concat([(_0.id = _5.sent(),
                            _0.action = 'create',
                            _0.data = userData,
                            _0), context, {}]))];
                case 24:
                    _5.sent();
                    _1 = {};
                    return [4 /*yield*/, generateNewId()];
                case 25:
                    _1.id = _5.sent(),
                        _1.userId = userData.id,
                        _1.playerId = userData.id,
                        _1.env = env;
                    _2 = {};
                    return [4 /*yield*/, generateNewId()];
                case 26:
                    _2.id = _5.sent(),
                        _2.action = 'create';
                    _3 = {};
                    return [4 /*yield*/, generateNewId()];
                case 27:
                    tokenData = (_1.mobile = (_2.data = (_3.id = _5.sent(),
                        _3.mobile = mobile,
                        _3.userId = userData.id,
                        _3),
                        _2),
                        _1);
                    _r = (_q = rowStore).operate;
                    _s = ['token'];
                    _4 = {};
                    return [4 /*yield*/, generateNewId()];
                case 28: return [4 /*yield*/, _r.apply(_q, _s.concat([(_4.id = _5.sent(),
                            _4.action = 'create',
                            _4.data = tokenData,
                            _4), context, {}]))];
                case 29:
                    _5.sent();
                    return [2 /*return*/, tokenData.id];
                case 30: return [2 /*return*/];
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
                        }, context, {
                            dontCollect: true,
                        })];
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
        var _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23;
        return tslib_1.__generator(this, function (_24) {
            switch (_24.label) {
                case 0:
                    rowStore = context.rowStore;
                    return [4 /*yield*/, context.getApplication()];
                case 1:
                    application = _24.sent();
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
                    _c = _24.sent(), sessionKey = _c.sessionKey, openId = _c.openId, unionId = _c.unionId;
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
                        }, context, {
                            dontCollect: true,
                        })];
                case 3:
                    _d = tslib_1.__read.apply(void 0, [(_24.sent()).result, 1]), wechatUser = _d[0];
                    return [4 /*yield*/, generateNewId()];
                case 4:
                    id = _24.sent();
                    if (!wechatUser) return [3 /*break*/, 19];
                    wechatUser2 = wechatUser;
                    wechatUserUpdateData = {
                        sessionKey: sessionKey,
                    };
                    if (unionId !== wechatUser.unionId) {
                        Object.assign(wechatUserUpdateData, {
                            unionId: unionId,
                        });
                    }
                    if (!wechatUser2.userId) return [3 /*break*/, 12];
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
                            blockTrigger: true,
                        })];
                case 5:
                    _e = tslib_1.__read.apply(void 0, [(_24.sent()).result, 1]), token = _e[0];
                    if (!(token && (0, lodash_1.isEqual)(token.env, env))) return [3 /*break*/, 9];
                    _g = (_f = rowStore).operate;
                    _h = ['token'];
                    _3 = {};
                    return [4 /*yield*/, generateNewId()];
                case 6:
                    _3.id = _24.sent(),
                        _3.action = 'update';
                    _4 = {};
                    _5 = {};
                    return [4 /*yield*/, generateNewId()];
                case 7: return [4 /*yield*/, _g.apply(_f, _h.concat([(_3.data = (_4.wechatUser = (_5.id = _24.sent(),
                            _5.action = 'update',
                            _5.data = wechatUserUpdateData,
                            _5),
                            _4),
                            _3.filter = {
                                id: token.id,
                            },
                            _3), context, {
                            dontCollect: true,
                        }]))];
                case 8:
                    _24.sent();
                    return [2 /*return*/, token.id];
                case 9:
                    _k = (_j = rowStore).operate;
                    _l = ['token'];
                    _6 = {};
                    return [4 /*yield*/, generateNewId()];
                case 10: return [4 /*yield*/, _k.apply(_j, _l.concat([(_6.id = _24.sent(),
                            _6.action = 'disable',
                            _6.data = {},
                            _6.filter = {
                                applicationId: application.id,
                                ableState: 'enabled',
                                userId: wechatUser2.userId,
                                playerId: wechatUser2.userId,
                            },
                            _6), context, {
                            dontCollect: true,
                        }]))];
                case 11:
                    _24.sent();
                    return [3 /*break*/, 15];
                case 12:
                    // 创建user
                    _o = (_m = Object).assign;
                    _p = [wechatUserUpdateData];
                    _7 = {};
                    _8 = {};
                    return [4 /*yield*/, generateNewId()];
                case 13:
                    _8.id = _24.sent(),
                        _8.action = 'create';
                    _9 = {};
                    return [4 /*yield*/, generateNewId()];
                case 14:
                    // 创建user
                    _o.apply(_m, _p.concat([(_7.user = (_8.data = (_9.id = _24.sent(),
                            _9.userState = 'normal',
                            _9),
                            _8),
                            _7)]));
                    _24.label = 15;
                case 15:
                    _r = (_q = rowStore).operate;
                    _s = ['token'];
                    _10 = {};
                    return [4 /*yield*/, generateNewId()];
                case 16:
                    _10.id = _24.sent(),
                        _10.action = 'create';
                    _11 = {
                        id: id,
                        userId: wechatUser2.userId,
                        playerId: wechatUser2.userId,
                        applicationId: application.id,
                        entity: 'wechatUser',
                        entityId: wechatUser2.id
                    };
                    _12 = {};
                    return [4 /*yield*/, generateNewId()];
                case 17: return [4 /*yield*/, _r.apply(_q, _s.concat([(_10.data = (_11.wechatUser = (_12.id = _24.sent(),
                            _12.action = 'update',
                            _12.data = wechatUserUpdateData,
                            _12),
                            _11.env = env,
                            _11),
                            _10), context, {}]))];
                case 18:
                    _24.sent();
                    return [2 /*return*/, id];
                case 19:
                    if (!unionId) return [3 /*break*/, 27];
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
                        }, context, {
                            dontCollect: true,
                        })];
                case 20:
                    _t = tslib_1.__read.apply(void 0, [(_24.sent()).result, 1]), wechatUser3 = _t[0];
                    wechatUser2 = wechatUser3;
                    if (!(wechatUser2 && wechatUser2.userId)) return [3 /*break*/, 27];
                    _v = (_u = rowStore).operate;
                    _w = ['token'];
                    _13 = {};
                    return [4 /*yield*/, generateNewId()];
                case 21: return [4 /*yield*/, _v.apply(_u, _w.concat([(_13.id = _24.sent(),
                            _13.action = 'disable',
                            _13.data = {},
                            _13.filter = {
                                applicationId: application.id,
                                ableState: 'enabled',
                                userId: wechatUser2.userId,
                                playerId: wechatUser2.userId,
                            },
                            _13), context, {
                            dontCollect: true,
                        }]))];
                case 22:
                    _24.sent();
                    _14 = {};
                    return [4 /*yield*/, generateNewId()];
                case 23:
                    wechatUserCreateData_1 = (_14.id = _24.sent(),
                        _14.sessionKey = sessionKey,
                        _14.unionId = unionId,
                        _14.origin = 'mp',
                        _14.openId = openId,
                        _14.applicationId = application.id,
                        _14.userId = wechatUser2.userId,
                        _14);
                    _y = (_x = rowStore).operate;
                    _z = ['token'];
                    _15 = {};
                    return [4 /*yield*/, generateNewId()];
                case 24:
                    _15.id = _24.sent(),
                        _15.action = 'create';
                    _16 = {
                        id: id,
                        userId: wechatUser2.userId,
                        playerId: wechatUser2.userId,
                        applicationId: application.id
                    };
                    _17 = {};
                    return [4 /*yield*/, generateNewId()];
                case 25: return [4 /*yield*/, _y.apply(_x, _z.concat([(_15.data = (_16.wechatUser = (_17.id = _24.sent(),
                            _17.action = 'create',
                            _17.data = wechatUserCreateData_1,
                            _17),
                            _16.env = env,
                            _16),
                            _15), context, {
                            dontCollect: true,
                        }]))];
                case 26:
                    _24.sent();
                    return [2 /*return*/, id];
                case 27:
                    _18 = {};
                    return [4 /*yield*/, generateNewId()];
                case 28:
                    userData = (_18.id = _24.sent(),
                        _18.userState = 'normal',
                        _18.systemId = systemId,
                        _18);
                    _19 = {};
                    return [4 /*yield*/, generateNewId()];
                case 29:
                    _19.id = _24.sent(),
                        _19.sessionKey = sessionKey,
                        _19.unionId = unionId,
                        _19.origin = type === 'wechatPublic' ? 'public' : 'web',
                        _19.openId = openId,
                        _19.applicationId = application.id;
                    _20 = {};
                    return [4 /*yield*/, generateNewId()];
                case 30:
                    wechatUserCreateData = (_19.user = (_20.id = _24.sent(),
                        _20.action = 'create',
                        _20.data = userData,
                        _20),
                        _19);
                    _1 = (_0 = rowStore).operate;
                    _2 = ['token'];
                    _21 = {};
                    return [4 /*yield*/, generateNewId()];
                case 31:
                    _21.id = _24.sent(),
                        _21.action = 'create';
                    _22 = {
                        id: id,
                        userId: userData.id,
                        playerId: userData.id,
                        applicationId: application.id
                    };
                    _23 = {};
                    return [4 /*yield*/, generateNewId()];
                case 32: return [4 /*yield*/, _1.apply(_0, _2.concat([(_21.data = (_22.wechatUser = (_23.id = _24.sent(),
                            _23.action = 'create',
                            _23.data = wechatUserCreateData,
                            _23),
                            _22.env = env,
                            _22),
                            _21), context, {
                            dontCollect: true,
                        }]))];
                case 33:
                    _24.sent();
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
        var _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23;
        return tslib_1.__generator(this, function (_24) {
            switch (_24.label) {
                case 0:
                    rowStore = context.rowStore;
                    return [4 /*yield*/, context.getApplication()];
                case 1:
                    application = _24.sent();
                    _b = application, type = _b.type, config = _b.config, systemId = _b.systemId;
                    (0, assert_1.assert)(type === 'wechatMp' || config.type === 'wechatMp');
                    config2 = config;
                    appId = config2.appId, appSecret = config2.appSecret;
                    wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, appSecret, 'wechatMp');
                    return [4 /*yield*/, wechatInstance.code2Session(code)];
                case 2:
                    _c = _24.sent(), sessionKey = _c.sessionKey, openId = _c.openId, unionId = _c.unionId;
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
                        }, context, {
                            dontCollect: true,
                        })];
                case 3:
                    _d = tslib_1.__read.apply(void 0, [(_24.sent()).result, 1]), wechatUser = _d[0];
                    return [4 /*yield*/, generateNewId()];
                case 4:
                    id = _24.sent();
                    if (!wechatUser) return [3 /*break*/, 19];
                    wechatUser2 = wechatUser;
                    wechatUserUpdateData = {
                        sessionKey: sessionKey,
                    };
                    if (unionId !== wechatUser.unionId) {
                        Object.assign(wechatUserUpdateData, {
                            unionId: unionId,
                        });
                    }
                    if (!wechatUser2.userId) return [3 /*break*/, 12];
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
                        }, context, { dummy: 1, blockTrigger: true, dontCollect: true })];
                case 5:
                    _e = tslib_1.__read.apply(void 0, [(_24.sent()).result, 1]), token = _e[0];
                    if (!(token && (0, lodash_1.isEqual)(token.env, env))) return [3 /*break*/, 9];
                    _g = (_f = rowStore).operate;
                    _h = ['token'];
                    _3 = {};
                    return [4 /*yield*/, generateNewId()];
                case 6:
                    _3.id = _24.sent(),
                        _3.action = 'update';
                    _4 = {};
                    _5 = {};
                    return [4 /*yield*/, generateNewId()];
                case 7: return [4 /*yield*/, _g.apply(_f, _h.concat([(_3.data = (_4.wechatUser = (_5.id = _24.sent(),
                            _5.action = 'update',
                            _5.data = wechatUserUpdateData,
                            _5),
                            _4),
                            _3.filter = {
                                id: token.id,
                            },
                            _3), context, {
                            dontCollect: true,
                        }]))];
                case 8:
                    _24.sent();
                    return [2 /*return*/, token.id];
                case 9:
                    _k = (_j = rowStore).operate;
                    _l = ['token'];
                    _6 = {};
                    return [4 /*yield*/, generateNewId()];
                case 10: return [4 /*yield*/, _k.apply(_j, _l.concat([(_6.id = _24.sent(),
                            _6.action = 'disable',
                            _6.data = {},
                            _6.filter = {
                                applicationId: application.id,
                                ableState: 'enabled',
                                userId: wechatUser2.userId,
                                playerId: wechatUser2.userId,
                            },
                            _6), context, {
                            dontCollect: true,
                        }]))];
                case 11:
                    _24.sent();
                    return [3 /*break*/, 15];
                case 12:
                    // 创建user
                    _o = (_m = Object).assign;
                    _p = [wechatUserUpdateData];
                    _7 = {};
                    _8 = {};
                    return [4 /*yield*/, generateNewId()];
                case 13:
                    _8.id = _24.sent(),
                        _8.action = 'create';
                    _9 = {};
                    return [4 /*yield*/, generateNewId()];
                case 14:
                    // 创建user
                    _o.apply(_m, _p.concat([(_7.user = (_8.data = (_9.id = _24.sent(),
                            _9.userState = 'normal',
                            _9),
                            _8),
                            _7)]));
                    _24.label = 15;
                case 15:
                    _r = (_q = rowStore).operate;
                    _s = ['token'];
                    _10 = {};
                    return [4 /*yield*/, generateNewId()];
                case 16:
                    _10.id = _24.sent(),
                        _10.action = 'create';
                    _11 = {
                        id: id,
                        userId: wechatUser2.userId,
                        playerId: wechatUser2.userId,
                        applicationId: application.id,
                        entity: 'wechatUser',
                        entityId: wechatUser2.id
                    };
                    _12 = {};
                    return [4 /*yield*/, generateNewId()];
                case 17: return [4 /*yield*/, _r.apply(_q, _s.concat([(_10.data = (_11.wechatUser = (_12.id = _24.sent(),
                            _12.action = 'update',
                            _12.data = wechatUserUpdateData,
                            _12),
                            _11.env = env,
                            _11),
                            _10), context, {
                            dontCollect: true,
                        }]))];
                case 18:
                    _24.sent();
                    return [2 /*return*/, id];
                case 19:
                    if (!unionId) return [3 /*break*/, 27];
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
                        }, context, {
                            dontCollect: true,
                        })];
                case 20:
                    _t = tslib_1.__read.apply(void 0, [(_24.sent()).result, 1]), wechatUser3 = _t[0];
                    wechatUser2 = wechatUser3;
                    if (!(wechatUser2 && wechatUser2.userId)) return [3 /*break*/, 27];
                    _v = (_u = rowStore).operate;
                    _w = ['token'];
                    _13 = {};
                    return [4 /*yield*/, generateNewId()];
                case 21: return [4 /*yield*/, _v.apply(_u, _w.concat([(_13.id = _24.sent(),
                            _13.action = 'disable',
                            _13.data = {},
                            _13.filter = {
                                applicationId: application.id,
                                ableState: 'enabled',
                                userId: wechatUser2.userId,
                                playerId: wechatUser2.userId,
                            },
                            _13), context, {
                            dontCollect: true,
                        }]))];
                case 22:
                    _24.sent();
                    _14 = {};
                    return [4 /*yield*/, generateNewId()];
                case 23:
                    wechatUserCreateData_2 = (_14.id = _24.sent(),
                        _14.sessionKey = sessionKey,
                        _14.unionId = unionId,
                        _14.origin = 'mp',
                        _14.openId = openId,
                        _14.applicationId = application.id,
                        _14.userId = wechatUser2.userId,
                        _14);
                    _y = (_x = rowStore).operate;
                    _z = ['token'];
                    _15 = {};
                    return [4 /*yield*/, generateNewId()];
                case 24:
                    _15.id = _24.sent(),
                        _15.action = 'create';
                    _16 = {
                        id: id,
                        userId: wechatUser2.userId,
                        playerId: wechatUser2.userId,
                        applicationId: application.id
                    };
                    _17 = {};
                    return [4 /*yield*/, generateNewId()];
                case 25: return [4 /*yield*/, _y.apply(_x, _z.concat([(_15.data = (_16.wechatUser = (_17.id = _24.sent(),
                            _17.action = 'create',
                            _17.data = wechatUserCreateData_2,
                            _17),
                            _16.env = env,
                            _16),
                            _15), context, {
                            dontCollect: true,
                        }]))];
                case 26:
                    _24.sent();
                    return [2 /*return*/, id];
                case 27:
                    _18 = {};
                    return [4 /*yield*/, generateNewId()];
                case 28:
                    userData = (_18.id = _24.sent(),
                        _18.userState = 'normal',
                        _18.systemId = systemId,
                        _18);
                    _19 = {};
                    return [4 /*yield*/, generateNewId()];
                case 29:
                    _19.id = _24.sent(),
                        _19.sessionKey = sessionKey,
                        _19.unionId = unionId,
                        _19.origin = 'mp',
                        _19.openId = openId,
                        _19.applicationId = application.id;
                    _20 = {};
                    return [4 /*yield*/, generateNewId()];
                case 30:
                    wechatUserCreateData = (_19.user = (_20.id = _24.sent(),
                        _20.action = 'create',
                        _20.data = userData,
                        _20),
                        _19);
                    _1 = (_0 = rowStore).operate;
                    _2 = ['token'];
                    _21 = {};
                    return [4 /*yield*/, generateNewId()];
                case 31:
                    _21.id = _24.sent(),
                        _21.action = 'create';
                    _22 = {
                        id: id,
                        userId: userData.id,
                        playerId: userData.id,
                        applicationId: application.id
                    };
                    _23 = {};
                    return [4 /*yield*/, generateNewId()];
                case 32: return [4 /*yield*/, _1.apply(_0, _2.concat([(_21.data = (_22.wechatUser = (_23.id = _24.sent(),
                            _23.action = 'create',
                            _23.data = wechatUserCreateData,
                            _23),
                            _22.env = env,
                            _22),
                            _21), context, {
                            dontCollect: true,
                        }]))];
                case 33:
                    _24.sent();
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
                        }, context, {
                            dontCollect: true,
                        })];
                case 3:
                    _b = tslib_1.__read.apply(void 0, [(_o.sent()).result, 1]), _c = _b[0], sessionKey = _c.sessionKey, user = _c.user;
                    _d = user, originNickname = _d.nickname, extraFile$entity = _d.extraFile$entity;
                    updateData = {};
                    if (nickname !== originNickname) {
                        Object.assign(updateData, {
                            nickname: nickname,
                        });
                    }
                    if (!((extraFile$entity === null || extraFile$entity === void 0 ? void 0 : extraFile$entity.length) === 0 || (0, extraFile_1.composeFileUrl)(extraFile$entity[0]) !== avatarUrl)) return [3 /*break*/, 6];
                    _k = {};
                    return [4 /*yield*/, generateNewId()];
                case 4:
                    _k.id = _o.sent(),
                        _k.action = 'create';
                    _f = (_e = Object).assign;
                    _l = {};
                    return [4 /*yield*/, generateNewId()];
                case 5:
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
                    _o.label = 6;
                case 6:
                    if (!(Object.keys(updateData).length > 0)) return [3 /*break*/, 9];
                    _h = (_g = rowStore).operate;
                    _j = ['user'];
                    _m = {};
                    return [4 /*yield*/, generateNewId()];
                case 7: return [4 /*yield*/, _h.apply(_g, _j.concat([(_m.id = _o.sent(),
                            _m.action = 'update',
                            _m.data = updateData,
                            _m.filter = {
                                id: userId,
                            },
                            _m), context, {
                            dontCollect: true,
                        }]))];
                case 8:
                    _o.sent();
                    _o.label = 9;
                case 9: return [2 /*return*/];
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
                            }, context, {
                                dontCollect: true,
                            }),
                            rowStore.count('captcha', {
                                filter: {
                                    mobile: mobile,
                                    $$createAt$$: {
                                        $gt: now - 3600 * 1000,
                                    },
                                }
                            }, context, {
                                dontCollect: true,
                            })
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
                    }, context, {
                        dontCollect: true,
                    })];
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
                            _g), context, {
                            dontCollect: true,
                        }]))];
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
