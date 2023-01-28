"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchTo = exports.sendCaptcha = exports.syncUserInfoWechatMp = exports.loginWechatMp = exports.loginWechat = exports.loginByMobile = void 0;
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var oak_external_sdk_1 = require("oak-external-sdk");
var assert_1 = require("oak-domain/lib/utils/assert");
var lodash_1 = require("oak-domain/lib/utils/lodash");
var types_1 = require("oak-domain/lib/types");
var extraFile_1 = require("../utils/extraFile");
var Exception_1 = require("../types/Exception");
var password_1 = require("../utils/password");
var Token_1 = require("../types/Token");
var sms_1 = require("../utils/sms");
function makeDistinguishException(userId, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, user, password, passwordSha1, idState, wechatUser$user, email$user;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, context.select('user', {
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
                    }, {
                        dontCollect: true,
                    })];
                case 1:
                    _a = tslib_1.__read.apply(void 0, [_b.sent(), 1]), user = _a[0];
                    (0, assert_1.assert)(user);
                    password = user.password, passwordSha1 = user.passwordSha1, idState = user.idState, wechatUser$user = user.wechatUser$user, email$user = user.email$user;
                    return [2 /*return*/, new Exception_1.OakDistinguishUserException(userId, !!(password || passwordSha1), idState === 'verified', wechatUser$user.length > 0, email$user.length > 0)];
            }
        });
    });
}
function tryMakeChangeLoginWay(userId, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, user, idState, wechatUser$user, email$user;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, context.select('user', {
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
                    }, {
                        dontCollect: true,
                    })];
                case 1:
                    _a = tslib_1.__read.apply(void 0, [_b.sent(), 1]), user = _a[0];
                    (0, assert_1.assert)(user);
                    idState = user.idState, wechatUser$user = user.wechatUser$user, email$user = user.email$user;
                    if (idState === 'verified' || wechatUser$user && wechatUser$user.length > 0 || email$user && email$user.length > 0) {
                        return [2 /*return*/, new Exception_1.OakChangeLoginWayException(userId, idState === 'verified', !!(wechatUser$user && wechatUser$user.length > 0), !!(email$user && email$user.length > 0))];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function setupMobile(mobile, env, context) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var currentToken, applicationId, systemId, result2, _b, mobileRow, userId, tokenData, user, userState, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, mobileData, _o, _p, _q, userData, _r, _s, _t, tokenData, _u, _v, _w;
        var _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10;
        return tslib_1.__generator(this, function (_11) {
            switch (_11.label) {
                case 0:
                    currentToken = context.getToken(true);
                    applicationId = context.getApplicationId();
                    systemId = context.getSystemId();
                    return [4 /*yield*/, context.select('mobile', {
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
                                    userSystem$user: {
                                        $entity: 'userSystem',
                                        data: {
                                            id: 1,
                                            systemId: 1,
                                        },
                                    }
                                },
                            },
                            filter: {
                                mobile: mobile,
                                ableState: 'enabled',
                            }
                        }, { dontCollect: true })];
                case 1:
                    result2 = _11.sent();
                    if (!(result2.length > 0)) return [3 /*break*/, 19];
                    // 此手机号已经存在
                    (0, assert_1.assert)(result2.length === 1);
                    _b = tslib_1.__read(result2, 1), mobileRow = _b[0];
                    if (!currentToken) return [3 /*break*/, 5];
                    if (!(currentToken.userId === mobileRow.userId)) return [3 /*break*/, 2];
                    return [2 /*return*/, currentToken.id];
                case 2:
                    userId = mobileRow.userId;
                    return [4 /*yield*/, makeDistinguishException(userId, context)];
                case 3: throw _11.sent();
                case 4: return [3 /*break*/, 18];
                case 5:
                    _x = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 6:
                    tokenData = (_x.id = _11.sent(),
                        _x.applicationId = applicationId,
                        _x.playerId = mobileRow.userId,
                        _x.env = env,
                        _x.entity = 'mobile',
                        _x.entityId = mobileRow.id,
                        _x);
                    user = mobileRow.user;
                    userState = user.userState;
                    _c = userState;
                    switch (_c) {
                        case 'disabled': return [3 /*break*/, 7];
                        case 'shadow': return [3 /*break*/, 8];
                    }
                    return [3 /*break*/, 10];
                case 7:
                    {
                        throw new Exception_1.OakUserDisabledException();
                    }
                    _11.label = 8;
                case 8:
                    _e = (_d = Object).assign;
                    _f = [tokenData];
                    _y = {
                        userId: mobileRow.userId
                    };
                    _z = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 9:
                    _e.apply(_d, _f.concat([(_y.user = (_z.id = _11.sent(),
                            _z.action = 'activate',
                            _z.data = {},
                            _z),
                            _y)]));
                    return [3 /*break*/, 11];
                case 10:
                    {
                        (0, assert_1.assert)(userState === 'normal');
                        Object.assign(tokenData, {
                            userId: mobileRow.userId,
                        });
                    }
                    _11.label = 11;
                case 11:
                    _h = (_g = context).operate;
                    _j = ['token'];
                    _0 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 12: return [4 /*yield*/, _h.apply(_g, _j.concat([(_0.id = _11.sent(),
                            _0.data = tokenData,
                            _0.action = 'create',
                            _0), {
                            dontCollect: true,
                        }]))];
                case 13:
                    _11.sent();
                    if (!(((_a = user === null || user === void 0 ? void 0 : user.userSystem$user) === null || _a === void 0 ? void 0 : _a.length) == 0)) return [3 /*break*/, 17];
                    _l = (_k = context).operate;
                    _m = ['userSystem'];
                    _1 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 14:
                    _1.id = _11.sent(),
                        _1.action = 'create';
                    _2 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 15: return [4 /*yield*/, _l.apply(_k, _m.concat([(_1.data = (_2.id = _11.sent(),
                            _2.userId = user.id,
                            _2.systemId = systemId,
                            _2),
                            _1), {
                            dontCollect: true,
                        }]))];
                case 16:
                    _11.sent();
                    _11.label = 17;
                case 17: return [2 /*return*/, tokenData.id];
                case 18: return [3 /*break*/, 32];
                case 19:
                    if (!currentToken) return [3 /*break*/, 23];
                    _3 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 20:
                    mobileData = (_3.id = _11.sent(),
                        _3.mobile = mobile,
                        _3.userId = currentToken.userId,
                        _3);
                    _p = (_o = context).operate;
                    _q = ['mobile'];
                    _4 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 21: return [4 /*yield*/, _p.apply(_o, _q.concat([(_4.id = _11.sent(),
                            _4.action = 'create',
                            _4.data = mobileData,
                            _4), {}]))];
                case 22:
                    _11.sent();
                    return [2 /*return*/, currentToken.id];
                case 23:
                    _5 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 24:
                    userData = (_5.id = _11.sent(),
                        _5.userState = 'normal',
                        _5);
                    _s = (_r = context).operate;
                    _t = ['user'];
                    _6 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 25: return [4 /*yield*/, _s.apply(_r, _t.concat([(_6.id = _11.sent(),
                            _6.action = 'create',
                            _6.data = userData,
                            _6), {}]))];
                case 26:
                    _11.sent();
                    _7 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 27:
                    _7.id = _11.sent(),
                        _7.userId = userData.id,
                        _7.playerId = userData.id,
                        _7.env = env;
                    _8 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 28:
                    _8.id = _11.sent(),
                        _8.action = 'create';
                    _9 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 29:
                    tokenData = (_7.mobile = (_8.data = (_9.id = _11.sent(),
                        _9.mobile = mobile,
                        _9.userId = userData.id,
                        _9),
                        _8),
                        _7);
                    _v = (_u = context).operate;
                    _w = ['token'];
                    _10 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 30: return [4 /*yield*/, _v.apply(_u, _w.concat([(_10.id = _11.sent(),
                            _10.action = 'create',
                            _10.data = tokenData,
                            _10), {}]))];
                case 31:
                    _11.sent();
                    return [2 /*return*/, tokenData.id];
                case 32: return [2 /*return*/];
            }
        });
    });
}
function loadTokenInfo(tokenId, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.select('token', {
                        data: Token_1.tokenProjection,
                        filter: {
                            id: tokenId,
                        },
                    }, {})];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function loginByMobile(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var loginLogic, tokenId;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loginLogic = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var mobile, captcha, password, env, systemId, result, _a, captchaRow, result, _b, _c, mobileRow, ableState, userId, exception;
                        return tslib_1.__generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    mobile = params.mobile, captcha = params.captcha, password = params.password, env = params.env;
                                    systemId = context.getSystemId();
                                    if (!captcha) return [3 /*break*/, 5];
                                    return [4 /*yield*/, context.select('captcha', {
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
                                        }, { dontCollect: true })];
                                case 1:
                                    result = _d.sent();
                                    if (!(result.length > 0)) return [3 /*break*/, 3];
                                    _a = tslib_1.__read(result, 1), captchaRow = _a[0];
                                    if (captchaRow.expired) {
                                        throw new types_1.OakUserException('验证码已经过期');
                                    }
                                    return [4 /*yield*/, setupMobile(mobile, env, context)];
                                case 2: 
                                // 到这里说明验证码已经通过
                                return [2 /*return*/, _d.sent()];
                                case 3: throw new types_1.OakUserException('验证码无效');
                                case 4: return [3 /*break*/, 13];
                                case 5:
                                    (0, assert_1.assert)(password);
                                    return [4 /*yield*/, context.select('mobile', {
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
                                                },
                                            }
                                        }, {
                                            dontCollect: true,
                                        })];
                                case 6:
                                    result = _d.sent();
                                    _b = result.length;
                                    switch (_b) {
                                        case 0: return [3 /*break*/, 7];
                                        case 1: return [3 /*break*/, 8];
                                    }
                                    return [3 /*break*/, 12];
                                case 7:
                                    {
                                        throw new types_1.OakUserException('用户名与密码不匹配');
                                    }
                                    _d.label = 8;
                                case 8:
                                    _c = tslib_1.__read(result, 1), mobileRow = _c[0];
                                    ableState = mobileRow.ableState, userId = mobileRow.userId;
                                    if (!(ableState === 'disabled')) return [3 /*break*/, 10];
                                    return [4 /*yield*/, tryMakeChangeLoginWay(userId, context)];
                                case 9:
                                    exception = _d.sent();
                                    if (exception) {
                                        throw exception;
                                    }
                                    _d.label = 10;
                                case 10: return [4 /*yield*/, setupMobile(mobile, env, context)];
                                case 11: return [2 /*return*/, _d.sent()];
                                case 12:
                                    {
                                        throw new Error("\u624B\u673A\u53F7\u548C\u5BC6\u7801\u5339\u914D\u51FA\u73B0\u96F7\u540C\uFF0Cmobile id\u662F[".concat(result.map(function (ele) { return ele.id; }).join(','), "], mobile\u662F").concat(mobile));
                                    }
                                    _d.label = 13;
                                case 13: return [2 /*return*/];
                            }
                        });
                    }); };
                    return [4 /*yield*/, loginLogic()];
                case 1:
                    tokenId = _a.sent();
                    return [4 /*yield*/, loadTokenInfo(tokenId, context)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, tokenId];
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
        var loginLogic, tokenId;
        var _this = this;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    loginLogic = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var application, _a, type, config, systemId, appId, appSecret, config2, config2, wechatInstance, _b, sessionKey, openId, unionId, _c, wechatUser, id, wechatUser2, wechatUserUpdateData, _d, token, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, wechatUser3, wechatUser2, _t, _u, _v, wechatUserCreateData_1, _w, _x, _y, userData, wechatUserCreateData, _z, _0, _1;
                        var _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24;
                        return tslib_1.__generator(this, function (_25) {
                            switch (_25.label) {
                                case 0:
                                    application = context.getApplication();
                                    _a = application, type = _a.type, config = _a.config, systemId = _a.systemId;
                                    // 可能type是web或者wechatPublic
                                    (0, assert_1.assert)(type !== 'wechatMp' && config.type !== 'wechatMp');
                                    if (type === 'wechatPublic') {
                                        config2 = config;
                                        appId = config2.appId;
                                        appSecret = config2.appSecret;
                                    }
                                    else {
                                        config2 = config;
                                        (0, assert_1.assert)(config2.wechat);
                                        appId = config2.wechat.appId;
                                        appSecret = config2.wechat.appSecret;
                                    }
                                    wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, appSecret, type);
                                    return [4 /*yield*/, wechatInstance.code2Session(code)];
                                case 1:
                                    _b = _25.sent(), sessionKey = _b.sessionKey, openId = _b.openId, unionId = _b.unionId;
                                    return [4 /*yield*/, context.select('wechatUser', {
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
                                        }, {
                                            dontCollect: true,
                                        })];
                                case 2:
                                    _c = tslib_1.__read.apply(void 0, [_25.sent(), 1]), wechatUser = _c[0];
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 3:
                                    id = _25.sent();
                                    if (!wechatUser) return [3 /*break*/, 18];
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
                                    return [4 /*yield*/, context.select('token', {
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
                                        }, {
                                            blockTrigger: true,
                                        })];
                                case 4:
                                    _d = tslib_1.__read.apply(void 0, [_25.sent(), 1]), token = _d[0];
                                    if (!(token && (0, lodash_1.isEqual)(token.env, env))) return [3 /*break*/, 8];
                                    _f = (_e = context).operate;
                                    _g = ['token'];
                                    _2 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 5:
                                    _2.id = _25.sent(),
                                        _2.action = 'update';
                                    _3 = {};
                                    _4 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 6: return [4 /*yield*/, _f.apply(_e, _g.concat([(_2.data = (_3.wechatUser = (_4.id = _25.sent(),
                                            _4.action = 'update',
                                            _4.data = wechatUserUpdateData,
                                            _4),
                                            _3),
                                            _2.filter = {
                                                id: token.id,
                                            },
                                            _2), {
                                            dontCollect: true,
                                        }]))];
                                case 7:
                                    _25.sent();
                                    return [2 /*return*/, token.id];
                                case 8:
                                    _j = (_h = context).operate;
                                    _k = ['token'];
                                    _5 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 9: return [4 /*yield*/, _j.apply(_h, _k.concat([(_5.id = _25.sent(),
                                            _5.action = 'disable',
                                            _5.data = {},
                                            _5.filter = {
                                                applicationId: application.id,
                                                ableState: 'enabled',
                                                userId: wechatUser2.userId,
                                                playerId: wechatUser2.userId,
                                            },
                                            _5), {
                                            dontCollect: true,
                                        }]))];
                                case 10:
                                    _25.sent();
                                    return [3 /*break*/, 14];
                                case 11:
                                    // 创建user
                                    _m = (_l = Object).assign;
                                    _o = [wechatUserUpdateData];
                                    _6 = {};
                                    _7 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 12:
                                    _7.id = _25.sent(),
                                        _7.action = 'create';
                                    _8 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 13:
                                    // 创建user
                                    _m.apply(_l, _o.concat([(_6.user = (_7.data = (_8.id = _25.sent(),
                                            _8.userState = 'normal',
                                            _8),
                                            _7),
                                            _6)]));
                                    _25.label = 14;
                                case 14:
                                    _q = (_p = context).operate;
                                    _r = ['token'];
                                    _9 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 15:
                                    _9.id = _25.sent(),
                                        _9.action = 'create';
                                    _10 = {
                                        id: id,
                                        userId: wechatUser2.userId,
                                        playerId: wechatUser2.userId,
                                        applicationId: application.id,
                                        entity: 'wechatUser',
                                        entityId: wechatUser2.id
                                    };
                                    _11 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 16: return [4 /*yield*/, _q.apply(_p, _r.concat([(_9.data = (_10.wechatUser = (_11.id = _25.sent(),
                                            _11.action = 'update',
                                            _11.data = wechatUserUpdateData,
                                            _11),
                                            _10.env = env,
                                            _10),
                                            _9), {}]))];
                                case 17:
                                    _25.sent();
                                    return [2 /*return*/, id];
                                case 18:
                                    if (!unionId) return [3 /*break*/, 26];
                                    return [4 /*yield*/, context.select('wechatUser', {
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
                                        }, {
                                            dontCollect: true,
                                        })];
                                case 19:
                                    _s = tslib_1.__read.apply(void 0, [_25.sent(), 1]), wechatUser3 = _s[0];
                                    wechatUser2 = wechatUser3;
                                    if (!(wechatUser2 && wechatUser2.userId)) return [3 /*break*/, 26];
                                    _u = (_t = context).operate;
                                    _v = ['token'];
                                    _12 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 20: return [4 /*yield*/, _u.apply(_t, _v.concat([(_12.id = _25.sent(),
                                            _12.action = 'disable',
                                            _12.data = {},
                                            _12.filter = {
                                                applicationId: application.id,
                                                ableState: 'enabled',
                                                userId: wechatUser2.userId,
                                                playerId: wechatUser2.userId,
                                            },
                                            _12), {
                                            dontCollect: true,
                                        }]))];
                                case 21:
                                    _25.sent();
                                    _13 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 22:
                                    wechatUserCreateData_1 = (_13.id = _25.sent(),
                                        _13.sessionKey = sessionKey,
                                        _13.unionId = unionId,
                                        _13.origin = 'mp',
                                        _13.openId = openId,
                                        _13.applicationId = application.id,
                                        _13.userId = wechatUser2.userId,
                                        _13);
                                    _x = (_w = context).operate;
                                    _y = ['token'];
                                    _14 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 23:
                                    _14.id = _25.sent(),
                                        _14.action = 'create';
                                    _15 = {
                                        id: id,
                                        userId: wechatUser2.userId,
                                        playerId: wechatUser2.userId,
                                        applicationId: application.id
                                    };
                                    _16 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 24: return [4 /*yield*/, _x.apply(_w, _y.concat([(_14.data = (_15.wechatUser = (_16.id = _25.sent(),
                                            _16.action = 'create',
                                            _16.data = wechatUserCreateData_1,
                                            _16),
                                            _15.env = env,
                                            _15),
                                            _14), {
                                            dontCollect: true,
                                        }]))];
                                case 25:
                                    _25.sent();
                                    return [2 /*return*/, id];
                                case 26:
                                    _17 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 27:
                                    _17.id = _25.sent(),
                                        _17.userState = 'normal';
                                    _18 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 28:
                                    _18.id = _25.sent(),
                                        _18.action = 'create';
                                    _19 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 29:
                                    userData = (_17.userSystem$user = [
                                        (_18.data = (_19.id = _25.sent(),
                                            _19.systemId = systemId,
                                            _19),
                                            _18)
                                    ],
                                        _17);
                                    _20 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 30:
                                    _20.id = _25.sent(),
                                        _20.sessionKey = sessionKey,
                                        _20.unionId = unionId,
                                        _20.origin = type === 'wechatPublic' ? 'public' : 'web',
                                        _20.openId = openId,
                                        _20.applicationId = application.id;
                                    _21 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 31:
                                    wechatUserCreateData = (_20.user = (_21.id = _25.sent(),
                                        _21.action = 'create',
                                        _21.data = userData,
                                        _21),
                                        _20);
                                    _0 = (_z = context).operate;
                                    _1 = ['token'];
                                    _22 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 32:
                                    _22.id = _25.sent(),
                                        _22.action = 'create';
                                    _23 = {
                                        id: id,
                                        userId: userData.id,
                                        playerId: userData.id,
                                        applicationId: application.id
                                    };
                                    _24 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 33: return [4 /*yield*/, _0.apply(_z, _1.concat([(_22.data = (_23.wechatUser = (_24.id = _25.sent(),
                                            _24.action = 'create',
                                            _24.data = wechatUserCreateData,
                                            _24),
                                            _23.env = env,
                                            _23),
                                            _22), {
                                            dontCollect: true,
                                        }]))];
                                case 34:
                                    _25.sent();
                                    return [2 /*return*/, id];
                            }
                        });
                    }); };
                    return [4 /*yield*/, loginLogic()];
                case 1:
                    tokenId = _b.sent();
                    return [4 /*yield*/, loadTokenInfo(tokenId, context)];
                case 2:
                    _b.sent();
                    return [2 /*return*/, tokenId];
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
        var loginLogic, tokenId;
        var _this = this;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    loginLogic = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var application, _a, type, config, systemId, config2, appId, appSecret, wechatInstance, _b, sessionKey, openId, unionId, _c, wechatUser, id, wechatUser2, wechatUserUpdateData, _d, token, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, wechatUser3, wechatUser2, _t, _u, _v, wechatUserCreateData_2, _w, _x, _y, userData, wechatUserCreateData, _z, _0, _1;
                        var _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24;
                        return tslib_1.__generator(this, function (_25) {
                            switch (_25.label) {
                                case 0:
                                    application = context.getApplication();
                                    _a = application, type = _a.type, config = _a.config, systemId = _a.systemId;
                                    (0, assert_1.assert)(type === 'wechatMp' || config.type === 'wechatMp');
                                    config2 = config;
                                    appId = config2.appId, appSecret = config2.appSecret;
                                    wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, appSecret, 'wechatMp');
                                    return [4 /*yield*/, wechatInstance.code2Session(code)];
                                case 1:
                                    _b = _25.sent(), sessionKey = _b.sessionKey, openId = _b.openId, unionId = _b.unionId;
                                    return [4 /*yield*/, context.select('wechatUser', {
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
                                        }, {
                                            dontCollect: true,
                                        })];
                                case 2:
                                    _c = tslib_1.__read.apply(void 0, [_25.sent(), 1]), wechatUser = _c[0];
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 3:
                                    id = _25.sent();
                                    if (!wechatUser) return [3 /*break*/, 18];
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
                                    return [4 /*yield*/, context.select('token', {
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
                                        }, { dummy: 1, blockTrigger: true, dontCollect: true })];
                                case 4:
                                    _d = tslib_1.__read.apply(void 0, [_25.sent(), 1]), token = _d[0];
                                    if (!(token && (0, lodash_1.isEqual)(token.env, env))) return [3 /*break*/, 8];
                                    _f = (_e = context).operate;
                                    _g = ['token'];
                                    _2 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 5:
                                    _2.id = _25.sent(),
                                        _2.action = 'update';
                                    _3 = {};
                                    _4 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 6: return [4 /*yield*/, _f.apply(_e, _g.concat([(_2.data = (_3.wechatUser = (_4.id = _25.sent(),
                                            _4.action = 'update',
                                            _4.data = wechatUserUpdateData,
                                            _4),
                                            _3),
                                            _2.filter = {
                                                id: token.id,
                                            },
                                            _2), {
                                            dontCollect: true,
                                        }]))];
                                case 7:
                                    _25.sent();
                                    return [2 /*return*/, token.id];
                                case 8:
                                    _j = (_h = context).operate;
                                    _k = ['token'];
                                    _5 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 9: return [4 /*yield*/, _j.apply(_h, _k.concat([(_5.id = _25.sent(),
                                            _5.action = 'disable',
                                            _5.data = {},
                                            _5.filter = {
                                                applicationId: application.id,
                                                ableState: 'enabled',
                                                userId: wechatUser2.userId,
                                                playerId: wechatUser2.userId,
                                            },
                                            _5), {
                                            dontCollect: true,
                                        }]))];
                                case 10:
                                    _25.sent();
                                    return [3 /*break*/, 14];
                                case 11:
                                    // 创建user
                                    _m = (_l = Object).assign;
                                    _o = [wechatUserUpdateData];
                                    _6 = {};
                                    _7 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 12:
                                    _7.id = _25.sent(),
                                        _7.action = 'create';
                                    _8 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 13:
                                    // 创建user
                                    _m.apply(_l, _o.concat([(_6.user = (_7.data = (_8.id = _25.sent(),
                                            _8.userState = 'normal',
                                            _8),
                                            _7),
                                            _6)]));
                                    _25.label = 14;
                                case 14:
                                    _q = (_p = context).operate;
                                    _r = ['token'];
                                    _9 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 15:
                                    _9.id = _25.sent(),
                                        _9.action = 'create';
                                    _10 = {
                                        id: id,
                                        userId: wechatUser2.userId,
                                        playerId: wechatUser2.userId,
                                        applicationId: application.id,
                                        entity: 'wechatUser',
                                        ableState: 'enabled',
                                        entityId: wechatUser2.id
                                    };
                                    _11 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 16: return [4 /*yield*/, _q.apply(_p, _r.concat([(_9.data = (_10.wechatUser = (_11.id = _25.sent(),
                                            _11.action = 'update',
                                            _11.data = wechatUserUpdateData,
                                            _11),
                                            _10.env = env,
                                            _10),
                                            _9), {
                                            dontCollect: true,
                                        }]))];
                                case 17:
                                    _25.sent();
                                    return [2 /*return*/, id];
                                case 18:
                                    if (!unionId) return [3 /*break*/, 26];
                                    return [4 /*yield*/, context.select('wechatUser', {
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
                                        }, {
                                            dontCollect: true,
                                        })];
                                case 19:
                                    _s = tslib_1.__read.apply(void 0, [_25.sent(), 1]), wechatUser3 = _s[0];
                                    wechatUser2 = wechatUser3;
                                    if (!(wechatUser2 && wechatUser2.userId)) return [3 /*break*/, 26];
                                    _u = (_t = context).operate;
                                    _v = ['token'];
                                    _12 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 20: return [4 /*yield*/, _u.apply(_t, _v.concat([(_12.id = _25.sent(),
                                            _12.action = 'disable',
                                            _12.data = {},
                                            _12.filter = {
                                                applicationId: application.id,
                                                ableState: 'enabled',
                                                userId: wechatUser2.userId,
                                                playerId: wechatUser2.userId,
                                            },
                                            _12), {
                                            dontCollect: true,
                                        }]))];
                                case 21:
                                    _25.sent();
                                    _13 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 22:
                                    wechatUserCreateData_2 = (_13.id = _25.sent(),
                                        _13.sessionKey = sessionKey,
                                        _13.unionId = unionId,
                                        _13.origin = 'mp',
                                        _13.openId = openId,
                                        _13.applicationId = application.id,
                                        _13.userId = wechatUser2.userId,
                                        _13);
                                    _x = (_w = context).operate;
                                    _y = ['token'];
                                    _14 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 23:
                                    _14.id = _25.sent(),
                                        _14.action = 'create';
                                    _15 = {
                                        id: id,
                                        userId: wechatUser2.userId,
                                        playerId: wechatUser2.userId,
                                        applicationId: application.id
                                    };
                                    _16 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 24: return [4 /*yield*/, _x.apply(_w, _y.concat([(_14.data = (_15.wechatUser = (_16.id = _25.sent(),
                                            _16.action = 'create',
                                            _16.data = wechatUserCreateData_2,
                                            _16),
                                            _15.env = env,
                                            _15),
                                            _14), {
                                            dontCollect: true,
                                        }]))];
                                case 25:
                                    _25.sent();
                                    return [2 /*return*/, id];
                                case 26:
                                    _17 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 27:
                                    _17.id = _25.sent(),
                                        _17.userState = 'normal';
                                    _18 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 28:
                                    _18.id = _25.sent(),
                                        _18.action = 'create';
                                    _19 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 29:
                                    userData = (_17.userSystem$user = [
                                        (_18.data = (_19.id = _25.sent(),
                                            _19.systemId = systemId,
                                            _19),
                                            _18)
                                    ],
                                        _17);
                                    _20 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 30:
                                    _20.id = _25.sent(),
                                        _20.sessionKey = sessionKey,
                                        _20.unionId = unionId,
                                        _20.origin = 'mp',
                                        _20.openId = openId,
                                        _20.applicationId = application.id;
                                    _21 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 31:
                                    wechatUserCreateData = (_20.user = (_21.id = _25.sent(),
                                        _21.action = 'create',
                                        _21.data = userData,
                                        _21),
                                        _20);
                                    _0 = (_z = context).operate;
                                    _1 = ['token'];
                                    _22 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 32:
                                    _22.id = _25.sent(),
                                        _22.action = 'create';
                                    _23 = {
                                        id: id,
                                        userId: userData.id,
                                        playerId: userData.id,
                                        applicationId: application.id
                                    };
                                    _24 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 33: return [4 /*yield*/, _0.apply(_z, _1.concat([(_22.data = (_23.wechatUser = (_24.id = _25.sent(),
                                            _24.action = 'create',
                                            _24.data = wechatUserCreateData,
                                            _24),
                                            _23.env = env,
                                            _23),
                                            _22), {
                                            dontCollect: true,
                                        }]))];
                                case 34:
                                    _25.sent();
                                    return [2 /*return*/, id];
                            }
                        });
                    }); };
                    return [4 /*yield*/, loginLogic()];
                case 1:
                    tokenId = _b.sent();
                    return [4 /*yield*/, loadTokenInfo(tokenId, context)];
                case 2:
                    _b.sent();
                    return [2 /*return*/, tokenId];
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
    var _b, _c, _d;
    var nickname = _a.nickname, avatarUrl = _a.avatarUrl, encryptedData = _a.encryptedData, iv = _a.iv, signature = _a.signature;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var userId, application, config, _e, _f, sessionKey, user, _g, originNickname, extraFile$entity, updateData, extraFileOperations, _h, _j, _k, _l, _m, _o, _p;
        var _q, _r, _s, _t;
        return tslib_1.__generator(this, function (_u) {
            switch (_u.label) {
                case 0:
                    userId = context.getToken().userId;
                    application = context.getApplication();
                    config = ((_b = application === null || application === void 0 ? void 0 : application.system) === null || _b === void 0 ? void 0 : _b.config) || ((_d = (_c = application === null || application === void 0 ? void 0 : application.system) === null || _c === void 0 ? void 0 : _c.platform) === null || _d === void 0 ? void 0 : _d.config);
                    return [4 /*yield*/, context.select('wechatUser', {
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
                                            entity: 1,
                                            entityId: 1,
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
                        }, {
                            dontCollect: true,
                        })];
                case 1:
                    _e = tslib_1.__read.apply(void 0, [_u.sent(), 1]), _f = _e[0], sessionKey = _f.sessionKey, user = _f.user;
                    _g = user, originNickname = _g.nickname, extraFile$entity = _g.extraFile$entity;
                    updateData = {};
                    if (nickname !== originNickname) {
                        Object.assign(updateData, {
                            nickname: nickname,
                        });
                    }
                    if (!((extraFile$entity === null || extraFile$entity === void 0 ? void 0 : extraFile$entity.length) === 0 ||
                        (0, extraFile_1.composeFileUrl)(extraFile$entity[0], config) !== avatarUrl)) return [3 /*break*/, 7];
                    _q = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 2:
                    _q.id = _u.sent(),
                        _q.action = 'create';
                    _j = (_h = Object).assign;
                    _r = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 3:
                    _r.id = _u.sent(),
                        _r.tag1 = 'avatar',
                        _r.entity = 'user',
                        _r.entityId = userId;
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 4:
                    extraFileOperations = [
                        (_q.data = _j.apply(_h, [(_r.objectId = _u.sent(),
                                _r), (0, extraFile_1.decomposeFileUrl)(avatarUrl)]),
                            _q)
                    ];
                    if (!(extraFile$entity.length > 0)) return [3 /*break*/, 6];
                    _l = (_k = extraFileOperations).push;
                    _s = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 5:
                    _l.apply(_k, [(_s.id = _u.sent(),
                            _s.action = 'remove',
                            _s.data = {},
                            _s.filter = {
                                id: extraFile$entity[0].id,
                            },
                            _s)]);
                    _u.label = 6;
                case 6:
                    Object.assign(updateData, {
                        extraFile$entity: extraFileOperations,
                    });
                    _u.label = 7;
                case 7:
                    if (!(Object.keys(updateData).length > 0)) return [3 /*break*/, 10];
                    _o = (_m = context).operate;
                    _p = ['user'];
                    _t = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 8: return [4 /*yield*/, _o.apply(_m, _p.concat([(_t.id = _u.sent(),
                            _t.action = 'update',
                            _t.data = updateData,
                            _t.filter = {
                                id: userId,
                            },
                            _t), {
                            dontCollect: true,
                        }]))];
                case 9:
                    _u.sent();
                    _u.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.syncUserInfoWechatMp = syncUserInfoWechatMp;
function sendCaptcha(_a, context) {
    var mobile = _a.mobile, env = _a.env;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var type, visitorId, now, duration, _b, count1, count2, _c, captcha, code, result, code, id, _d, _e, _f, result;
        var _g;
        return tslib_1.__generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    type = env.type;
                    (0, assert_1.assert)(type === 'web');
                    visitorId = env.visitorId;
                    now = Date.now();
                    duration = 1;
                    if (!(process.env.NODE_ENV !== 'development')) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.all([
                            context.count('captcha', {
                                filter: {
                                    visitorId: visitorId,
                                    $$createAt$$: {
                                        $gt: now - 3600 * 1000,
                                    },
                                },
                            }, {
                                dontCollect: true,
                            }),
                            context.count('captcha', {
                                filter: {
                                    mobile: mobile,
                                    $$createAt$$: {
                                        $gt: now - 3600 * 1000,
                                    },
                                }
                            }, {
                                dontCollect: true,
                            })
                        ])];
                case 1:
                    _b = tslib_1.__read.apply(void 0, [_h.sent(), 2]), count1 = _b[0], count2 = _b[1];
                    if (count1 > 5 || count2 > 5) {
                        throw new types_1.OakUserException('您已发送很多次短信，请休息会再发吧');
                    }
                    _h.label = 2;
                case 2: return [4 /*yield*/, context.select('captcha', {
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
                    }, {
                        dontCollect: true,
                    })];
                case 3:
                    _c = tslib_1.__read.apply(void 0, [_h.sent(), 1]), captcha = _c[0];
                    if (!captcha) return [3 /*break*/, 8];
                    code = captcha.code;
                    if (!(process.env.NODE_ENV === 'development')) return [3 /*break*/, 4];
                    return [2 /*return*/, "\u9A8C\u8BC1\u7801[".concat(code, "]\u5DF2\u521B\u5EFA")];
                case 4:
                    if (!(captcha.$$createAt$$ - now < 60000)) return [3 /*break*/, 5];
                    throw new types_1.OakUserException('您的操作太迅捷啦，请稍等再点吧');
                case 5: return [4 /*yield*/, (0, sms_1.sendSms)({
                        origin: 'tencent',
                        templateName: '登录',
                        mobile: mobile,
                        templateParamSet: {
                            code: code,
                            duration: duration.toString(),
                        },
                        templateParamSetFn: function (origin, templateParamSet) {
                            if (!templateParamSet) {
                                return templateParamSet;
                            }
                            if (origin === 'tencent') {
                                return [
                                    templateParamSet.code,
                                    templateParamSet.duration,
                                ];
                            }
                            return undefined;
                        },
                    }, context)];
                case 6:
                    result = _h.sent();
                    if (result === true) {
                        return [2 /*return*/, '验证码已发送'];
                    }
                    return [2 /*return*/, '验证码发送失败'];
                case 7: return [3 /*break*/, 14];
                case 8:
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
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 9:
                    id = _h.sent();
                    _e = (_d = context).operate;
                    _f = ['captcha'];
                    _g = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 10: return [4 /*yield*/, _e.apply(_d, _f.concat([(_g.id = _h.sent(),
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
                            _g), {
                            dontCollect: true,
                        }]))];
                case 11:
                    _h.sent();
                    if (!(process.env.NODE_ENV === 'development')) return [3 /*break*/, 12];
                    return [2 /*return*/, "\u9A8C\u8BC1\u7801[".concat(code, "]\u5DF2\u521B\u5EFA")];
                case 12: return [4 /*yield*/, (0, sms_1.sendSms)({
                        origin: 'tencent',
                        templateName: '登录',
                        mobile: mobile,
                        templateParamSet: {
                            code: code,
                            duration: duration.toString(),
                        },
                        templateParamSetFn: function (origin, templateParamSet) {
                            if (!templateParamSet) {
                                return templateParamSet;
                            }
                            if (origin === 'tencent') {
                                return [
                                    templateParamSet.code,
                                    templateParamSet.duration,
                                ];
                            }
                            return undefined;
                        },
                    }, context)];
                case 13:
                    result = _h.sent();
                    if (result === true) {
                        return [2 /*return*/, '验证码已发送'];
                    }
                    return [2 /*return*/, '验证码发送失败'];
                case 14: return [2 /*return*/];
            }
        });
    });
}
exports.sendCaptcha = sendCaptcha;
function switchTo(_a, context) {
    var userId = _a.userId;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var reallyRoot, currentUserId, token, _b, _c, _d;
        var _e;
        return tslib_1.__generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    reallyRoot = context.isReallyRoot();
                    if (!reallyRoot) {
                        throw new types_1.OakUserUnpermittedException();
                    }
                    currentUserId = context.getCurrentUserId();
                    if (currentUserId === userId) {
                        throw new types_1.OakRowInconsistencyException(undefined, '您已经是当前用户');
                    }
                    token = context.getToken();
                    _c = (_b = context).operate;
                    _d = ['token'];
                    _e = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 1: return [4 /*yield*/, _c.apply(_b, _d.concat([(_e.id = _f.sent(),
                            _e.action = 'update',
                            _e.data = {
                                userId: userId,
                            },
                            _e.filter = {
                                id: token.id,
                            },
                            _e), {}]))];
                case 2:
                    _f.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.switchTo = switchTo;
