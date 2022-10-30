"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCaptcha = exports.syncUserInfoWechatMp = exports.loginWechatMp = exports.loginWechat = exports.loginByMobile = void 0;
var tslib_1 = require("tslib");
var oak_external_sdk_1 = require("oak-external-sdk");
var assert_1 = require("oak-domain/lib/utils/assert");
var lodash_1 = require("oak-domain/lib/utils/lodash");
var types_1 = require("oak-domain/lib/types");
var extraFile_1 = require("../utils/extraFile");
var Exception_1 = require("../types/Exception");
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
                    return [2 /*return*/, new Exception_1.OakDistinguishUserException(userId, !!(password || passwordOrigin), idState === 'verified', wechatUser$user.length > 0, email$user.length > 0)];
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
                        return [2 /*return*/, new Exception_1.OakChangeLoginWayException(userId, idState === 'verified', wechatUser$user.length > 0, email$user.length > 0)];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function setupMobile(mobile, env, context) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var rowStore, currentToken, applicationId, systemId, result2, _b, mobileRow, userId, tokenData, user, userState, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, mobileData, _o, _p, _q, userData, _r, _s, _t, tokenData, _u, _v, _w;
        var _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12;
        return tslib_1.__generator(this, function (_13) {
            switch (_13.label) {
                case 0:
                    rowStore = context.rowStore;
                    return [4 /*yield*/, context.getToken(true)];
                case 1:
                    currentToken = _13.sent();
                    return [4 /*yield*/, context.getApplicationId()];
                case 2:
                    applicationId = _13.sent();
                    return [4 /*yield*/, context.getSystemId()];
                case 3:
                    systemId = _13.sent();
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
                        }, context, { dontCollect: true })];
                case 4:
                    result2 = (_13.sent()).result;
                    if (!(result2.length > 0)) return [3 /*break*/, 22];
                    // 此手机号已经存在
                    (0, assert_1.assert)(result2.length === 1);
                    _b = tslib_1.__read(result2, 1), mobileRow = _b[0];
                    if (!currentToken) return [3 /*break*/, 8];
                    if (!(currentToken.userId === mobileRow.userId)) return [3 /*break*/, 5];
                    return [2 /*return*/, currentToken.id];
                case 5:
                    userId = mobileRow.userId;
                    return [4 /*yield*/, makeDistinguishException(userId, context)];
                case 6: throw _13.sent();
                case 7: return [3 /*break*/, 21];
                case 8:
                    _x = {};
                    return [4 /*yield*/, generateNewId()];
                case 9:
                    tokenData = (_x.id = _13.sent(),
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
                        case 'disabled': return [3 /*break*/, 10];
                        case 'shadow': return [3 /*break*/, 11];
                    }
                    return [3 /*break*/, 13];
                case 10:
                    {
                        throw new Exception_1.OakUserDisabledException();
                    }
                    _13.label = 11;
                case 11:
                    _e = (_d = Object).assign;
                    _f = [tokenData];
                    _y = {
                        userId: mobileRow.userId
                    };
                    _z = {};
                    return [4 /*yield*/, generateNewId()];
                case 12:
                    _e.apply(_d, _f.concat([(_y.user = (_z.id = _13.sent(),
                            _z.action = 'activate',
                            _z),
                            _y)]));
                    return [3 /*break*/, 14];
                case 13:
                    {
                        (0, assert_1.assert)(userState === 'normal');
                        Object.assign(tokenData, {
                            userId: mobileRow.userId,
                        });
                    }
                    _13.label = 14;
                case 14:
                    _h = (_g = rowStore).operate;
                    _j = ['token'];
                    _0 = {};
                    return [4 /*yield*/, generateNewId()];
                case 15: return [4 /*yield*/, _h.apply(_g, _j.concat([(_0.id = _13.sent(),
                            _0.data = tokenData,
                            _0.action = 'create',
                            _0), context, {
                            dontCollect: true,
                        }]))];
                case 16:
                    _13.sent();
                    if (!(((_a = user === null || user === void 0 ? void 0 : user.userSystem$user) === null || _a === void 0 ? void 0 : _a.length) == 0)) return [3 /*break*/, 20];
                    _l = (_k = rowStore).operate;
                    _m = ['userSystem'];
                    _1 = {};
                    return [4 /*yield*/, generateNewId()];
                case 17:
                    _1.id = _13.sent(),
                        _1.action = 'create';
                    _2 = {};
                    return [4 /*yield*/, generateNewId()];
                case 18: return [4 /*yield*/, _l.apply(_k, _m.concat([(_1.data = (_2.id = _13.sent(),
                            _2.userId = user.id,
                            _2.systemId = systemId,
                            _2),
                            _1), context, {
                            dontCollect: true,
                        }]))];
                case 19:
                    _13.sent();
                    _13.label = 20;
                case 20: return [2 /*return*/, tokenData.id];
                case 21: return [3 /*break*/, 37];
                case 22:
                    if (!currentToken) return [3 /*break*/, 26];
                    _3 = {};
                    return [4 /*yield*/, generateNewId()];
                case 23:
                    mobileData = (_3.id = _13.sent(),
                        _3.mobile = mobile,
                        _3.userId = currentToken.userId,
                        _3);
                    _p = (_o = rowStore).operate;
                    _q = ['mobile'];
                    _4 = {};
                    return [4 /*yield*/, generateNewId()];
                case 24: return [4 /*yield*/, _p.apply(_o, _q.concat([(_4.id = _13.sent(),
                            _4.action = 'create',
                            _4.data = mobileData,
                            _4), context, {}]))];
                case 25:
                    _13.sent();
                    return [2 /*return*/, currentToken.id];
                case 26:
                    _5 = {};
                    return [4 /*yield*/, generateNewId()];
                case 27:
                    _5.id = _13.sent(),
                        _5.userState = 'normal';
                    _6 = {};
                    return [4 /*yield*/, generateNewId()];
                case 28:
                    _6.id = _13.sent(),
                        _6.action = 'create';
                    _7 = {};
                    return [4 /*yield*/, generateNewId()];
                case 29:
                    userData = (_5.userSystem$user = [(_6.data = (_7.id = _13.sent(),
                            _7.systemId = systemId,
                            _7),
                            _6)],
                        _5);
                    _s = (_r = rowStore).operate;
                    _t = ['user'];
                    _8 = {};
                    return [4 /*yield*/, generateNewId()];
                case 30: return [4 /*yield*/, _s.apply(_r, _t.concat([(_8.id = _13.sent(),
                            _8.action = 'create',
                            _8.data = userData,
                            _8), context, {}]))];
                case 31:
                    _13.sent();
                    _9 = {};
                    return [4 /*yield*/, generateNewId()];
                case 32:
                    _9.id = _13.sent(),
                        _9.userId = userData.id,
                        _9.playerId = userData.id,
                        _9.env = env;
                    _10 = {};
                    return [4 /*yield*/, generateNewId()];
                case 33:
                    _10.id = _13.sent(),
                        _10.action = 'create';
                    _11 = {};
                    return [4 /*yield*/, generateNewId()];
                case 34:
                    tokenData = (_9.mobile = (_10.data = (_11.id = _13.sent(),
                        _11.mobile = mobile,
                        _11.userId = userData.id,
                        _11),
                        _10),
                        _9);
                    _v = (_u = rowStore).operate;
                    _w = ['token'];
                    _12 = {};
                    return [4 /*yield*/, generateNewId()];
                case 35: return [4 /*yield*/, _v.apply(_u, _w.concat([(_12.id = _13.sent(),
                            _12.action = 'create',
                            _12.data = tokenData,
                            _12), context, {}]))];
                case 36:
                    _13.sent();
                    return [2 /*return*/, tokenData.id];
                case 37: return [2 /*return*/];
            }
        });
    });
}
function loadTokenInfo(tokenId, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.rowStore.select('token', {
                        data: {
                            id: 1,
                            userId: 1,
                            ableState: 1,
                            user: {
                                id: 1,
                                name: 1,
                                nickname: 1,
                            },
                            player: {
                                id: 1,
                                userRole$user: {
                                    $entity: 'userRole',
                                    data: {
                                        id: 1,
                                        userId: 1,
                                        roleId: 1,
                                    },
                                },
                            },
                        },
                        filter: {
                            id: tokenId,
                        },
                    }, context, {})];
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
                        var rowStore, application, _a, type, config, systemId, appId, appSecret, config2, config2, wechatInstance, _b, sessionKey, openId, unionId, _c, wechatUser, id, wechatUser2, wechatUserUpdateData, _d, token, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, wechatUser3, wechatUser2, _t, _u, _v, wechatUserCreateData_1, _w, _x, _y, userData, wechatUserCreateData, _z, _0, _1;
                        var _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24;
                        return tslib_1.__generator(this, function (_25) {
                            switch (_25.label) {
                                case 0:
                                    rowStore = context.rowStore;
                                    return [4 /*yield*/, context.getApplication()];
                                case 1:
                                    application = _25.sent();
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
                                case 2:
                                    _b = _25.sent(), sessionKey = _b.sessionKey, openId = _b.openId, unionId = _b.unionId;
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
                                    _c = tslib_1.__read.apply(void 0, [(_25.sent()).result, 1]), wechatUser = _c[0];
                                    return [4 /*yield*/, generateNewId()];
                                case 4:
                                    id = _25.sent();
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
                                    _d = tslib_1.__read.apply(void 0, [(_25.sent()).result, 1]), token = _d[0];
                                    if (!(token && (0, lodash_1.isEqual)(token.env, env))) return [3 /*break*/, 9];
                                    _f = (_e = rowStore).operate;
                                    _g = ['token'];
                                    _2 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 6:
                                    _2.id = _25.sent(),
                                        _2.action = 'update';
                                    _3 = {};
                                    _4 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 7: return [4 /*yield*/, _f.apply(_e, _g.concat([(_2.data = (_3.wechatUser = (_4.id = _25.sent(),
                                            _4.action = 'update',
                                            _4.data = wechatUserUpdateData,
                                            _4),
                                            _3),
                                            _2.filter = {
                                                id: token.id,
                                            },
                                            _2), context, {
                                            dontCollect: true,
                                        }]))];
                                case 8:
                                    _25.sent();
                                    return [2 /*return*/, token.id];
                                case 9:
                                    _j = (_h = rowStore).operate;
                                    _k = ['token'];
                                    _5 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 10: return [4 /*yield*/, _j.apply(_h, _k.concat([(_5.id = _25.sent(),
                                            _5.action = 'disable',
                                            _5.data = {},
                                            _5.filter = {
                                                applicationId: application.id,
                                                ableState: 'enabled',
                                                userId: wechatUser2.userId,
                                                playerId: wechatUser2.userId,
                                            },
                                            _5), context, {
                                            dontCollect: true,
                                        }]))];
                                case 11:
                                    _25.sent();
                                    return [3 /*break*/, 15];
                                case 12:
                                    // 创建user
                                    _m = (_l = Object).assign;
                                    _o = [wechatUserUpdateData];
                                    _6 = {};
                                    _7 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 13:
                                    _7.id = _25.sent(),
                                        _7.action = 'create';
                                    _8 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 14:
                                    // 创建user
                                    _m.apply(_l, _o.concat([(_6.user = (_7.data = (_8.id = _25.sent(),
                                            _8.userState = 'normal',
                                            _8),
                                            _7),
                                            _6)]));
                                    _25.label = 15;
                                case 15:
                                    _q = (_p = rowStore).operate;
                                    _r = ['token'];
                                    _9 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 16:
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
                                    return [4 /*yield*/, generateNewId()];
                                case 17: return [4 /*yield*/, _q.apply(_p, _r.concat([(_9.data = (_10.wechatUser = (_11.id = _25.sent(),
                                            _11.action = 'update',
                                            _11.data = wechatUserUpdateData,
                                            _11),
                                            _10.env = env,
                                            _10),
                                            _9), context, {}]))];
                                case 18:
                                    _25.sent();
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
                                    _s = tslib_1.__read.apply(void 0, [(_25.sent()).result, 1]), wechatUser3 = _s[0];
                                    wechatUser2 = wechatUser3;
                                    if (!(wechatUser2 && wechatUser2.userId)) return [3 /*break*/, 27];
                                    _u = (_t = rowStore).operate;
                                    _v = ['token'];
                                    _12 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 21: return [4 /*yield*/, _u.apply(_t, _v.concat([(_12.id = _25.sent(),
                                            _12.action = 'disable',
                                            _12.data = {},
                                            _12.filter = {
                                                applicationId: application.id,
                                                ableState: 'enabled',
                                                userId: wechatUser2.userId,
                                                playerId: wechatUser2.userId,
                                            },
                                            _12), context, {
                                            dontCollect: true,
                                        }]))];
                                case 22:
                                    _25.sent();
                                    _13 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 23:
                                    wechatUserCreateData_1 = (_13.id = _25.sent(),
                                        _13.sessionKey = sessionKey,
                                        _13.unionId = unionId,
                                        _13.origin = 'mp',
                                        _13.openId = openId,
                                        _13.applicationId = application.id,
                                        _13.userId = wechatUser2.userId,
                                        _13);
                                    _x = (_w = rowStore).operate;
                                    _y = ['token'];
                                    _14 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 24:
                                    _14.id = _25.sent(),
                                        _14.action = 'create';
                                    _15 = {
                                        id: id,
                                        userId: wechatUser2.userId,
                                        playerId: wechatUser2.userId,
                                        applicationId: application.id
                                    };
                                    _16 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 25: return [4 /*yield*/, _x.apply(_w, _y.concat([(_14.data = (_15.wechatUser = (_16.id = _25.sent(),
                                            _16.action = 'create',
                                            _16.data = wechatUserCreateData_1,
                                            _16),
                                            _15.env = env,
                                            _15),
                                            _14), context, {
                                            dontCollect: true,
                                        }]))];
                                case 26:
                                    _25.sent();
                                    return [2 /*return*/, id];
                                case 27:
                                    _17 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 28:
                                    _17.id = _25.sent(),
                                        _17.userState = 'normal';
                                    _18 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 29:
                                    _18.id = _25.sent(),
                                        _18.action = 'create';
                                    _19 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 30:
                                    userData = (_17.userSystem$user = [
                                        (_18.data = (_19.id = _25.sent(),
                                            _19.systemId = systemId,
                                            _19),
                                            _18)
                                    ],
                                        _17);
                                    _20 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 31:
                                    _20.id = _25.sent(),
                                        _20.sessionKey = sessionKey,
                                        _20.unionId = unionId,
                                        _20.origin = type === 'wechatPublic' ? 'public' : 'web',
                                        _20.openId = openId,
                                        _20.applicationId = application.id;
                                    _21 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 32:
                                    wechatUserCreateData = (_20.user = (_21.id = _25.sent(),
                                        _21.action = 'create',
                                        _21.data = userData,
                                        _21),
                                        _20);
                                    _0 = (_z = rowStore).operate;
                                    _1 = ['token'];
                                    _22 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 33:
                                    _22.id = _25.sent(),
                                        _22.action = 'create';
                                    _23 = {
                                        id: id,
                                        userId: userData.id,
                                        playerId: userData.id,
                                        applicationId: application.id
                                    };
                                    _24 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 34: return [4 /*yield*/, _0.apply(_z, _1.concat([(_22.data = (_23.wechatUser = (_24.id = _25.sent(),
                                            _24.action = 'create',
                                            _24.data = wechatUserCreateData,
                                            _24),
                                            _23.env = env,
                                            _23),
                                            _22), context, {
                                            dontCollect: true,
                                        }]))];
                                case 35:
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
                        var rowStore, application, _a, type, config, systemId, config2, appId, appSecret, wechatInstance, _b, sessionKey, openId, unionId, _c, wechatUser, id, wechatUser2, wechatUserUpdateData, _d, token, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, wechatUser3, wechatUser2, _t, _u, _v, wechatUserCreateData_2, _w, _x, _y, userData, wechatUserCreateData, _z, _0, _1;
                        var _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24;
                        return tslib_1.__generator(this, function (_25) {
                            switch (_25.label) {
                                case 0:
                                    rowStore = context.rowStore;
                                    return [4 /*yield*/, context.getApplication()];
                                case 1:
                                    application = _25.sent();
                                    _a = application, type = _a.type, config = _a.config, systemId = _a.systemId;
                                    (0, assert_1.assert)(type === 'wechatMp' || config.type === 'wechatMp');
                                    config2 = config;
                                    appId = config2.appId, appSecret = config2.appSecret;
                                    wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, appSecret, 'wechatMp');
                                    return [4 /*yield*/, wechatInstance.code2Session(code)];
                                case 2:
                                    _b = _25.sent(), sessionKey = _b.sessionKey, openId = _b.openId, unionId = _b.unionId;
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
                                    _c = tslib_1.__read.apply(void 0, [(_25.sent()).result, 1]), wechatUser = _c[0];
                                    return [4 /*yield*/, generateNewId()];
                                case 4:
                                    id = _25.sent();
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
                                    _d = tslib_1.__read.apply(void 0, [(_25.sent()).result, 1]), token = _d[0];
                                    if (!(token && (0, lodash_1.isEqual)(token.env, env))) return [3 /*break*/, 9];
                                    _f = (_e = rowStore).operate;
                                    _g = ['token'];
                                    _2 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 6:
                                    _2.id = _25.sent(),
                                        _2.action = 'update';
                                    _3 = {};
                                    _4 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 7: return [4 /*yield*/, _f.apply(_e, _g.concat([(_2.data = (_3.wechatUser = (_4.id = _25.sent(),
                                            _4.action = 'update',
                                            _4.data = wechatUserUpdateData,
                                            _4),
                                            _3),
                                            _2.filter = {
                                                id: token.id,
                                            },
                                            _2), context, {
                                            dontCollect: true,
                                        }]))];
                                case 8:
                                    _25.sent();
                                    return [2 /*return*/, token.id];
                                case 9:
                                    _j = (_h = rowStore).operate;
                                    _k = ['token'];
                                    _5 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 10: return [4 /*yield*/, _j.apply(_h, _k.concat([(_5.id = _25.sent(),
                                            _5.action = 'disable',
                                            _5.data = {},
                                            _5.filter = {
                                                applicationId: application.id,
                                                ableState: 'enabled',
                                                userId: wechatUser2.userId,
                                                playerId: wechatUser2.userId,
                                            },
                                            _5), context, {
                                            dontCollect: true,
                                        }]))];
                                case 11:
                                    _25.sent();
                                    return [3 /*break*/, 15];
                                case 12:
                                    // 创建user
                                    _m = (_l = Object).assign;
                                    _o = [wechatUserUpdateData];
                                    _6 = {};
                                    _7 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 13:
                                    _7.id = _25.sent(),
                                        _7.action = 'create';
                                    _8 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 14:
                                    // 创建user
                                    _m.apply(_l, _o.concat([(_6.user = (_7.data = (_8.id = _25.sent(),
                                            _8.userState = 'normal',
                                            _8),
                                            _7),
                                            _6)]));
                                    _25.label = 15;
                                case 15:
                                    _q = (_p = rowStore).operate;
                                    _r = ['token'];
                                    _9 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 16:
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
                                    return [4 /*yield*/, generateNewId()];
                                case 17: return [4 /*yield*/, _q.apply(_p, _r.concat([(_9.data = (_10.wechatUser = (_11.id = _25.sent(),
                                            _11.action = 'update',
                                            _11.data = wechatUserUpdateData,
                                            _11),
                                            _10.env = env,
                                            _10),
                                            _9), context, {
                                            dontCollect: true,
                                        }]))];
                                case 18:
                                    _25.sent();
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
                                    _s = tslib_1.__read.apply(void 0, [(_25.sent()).result, 1]), wechatUser3 = _s[0];
                                    wechatUser2 = wechatUser3;
                                    if (!(wechatUser2 && wechatUser2.userId)) return [3 /*break*/, 27];
                                    _u = (_t = rowStore).operate;
                                    _v = ['token'];
                                    _12 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 21: return [4 /*yield*/, _u.apply(_t, _v.concat([(_12.id = _25.sent(),
                                            _12.action = 'disable',
                                            _12.data = {},
                                            _12.filter = {
                                                applicationId: application.id,
                                                ableState: 'enabled',
                                                userId: wechatUser2.userId,
                                                playerId: wechatUser2.userId,
                                            },
                                            _12), context, {
                                            dontCollect: true,
                                        }]))];
                                case 22:
                                    _25.sent();
                                    _13 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 23:
                                    wechatUserCreateData_2 = (_13.id = _25.sent(),
                                        _13.sessionKey = sessionKey,
                                        _13.unionId = unionId,
                                        _13.origin = 'mp',
                                        _13.openId = openId,
                                        _13.applicationId = application.id,
                                        _13.userId = wechatUser2.userId,
                                        _13);
                                    _x = (_w = rowStore).operate;
                                    _y = ['token'];
                                    _14 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 24:
                                    _14.id = _25.sent(),
                                        _14.action = 'create';
                                    _15 = {
                                        id: id,
                                        userId: wechatUser2.userId,
                                        playerId: wechatUser2.userId,
                                        applicationId: application.id
                                    };
                                    _16 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 25: return [4 /*yield*/, _x.apply(_w, _y.concat([(_14.data = (_15.wechatUser = (_16.id = _25.sent(),
                                            _16.action = 'create',
                                            _16.data = wechatUserCreateData_2,
                                            _16),
                                            _15.env = env,
                                            _15),
                                            _14), context, {
                                            dontCollect: true,
                                        }]))];
                                case 26:
                                    _25.sent();
                                    return [2 /*return*/, id];
                                case 27:
                                    _17 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 28:
                                    _17.id = _25.sent(),
                                        _17.userState = 'normal';
                                    _18 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 29:
                                    _18.id = _25.sent(),
                                        _18.action = 'create';
                                    _19 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 30:
                                    userData = (_17.userSystem$user = [
                                        (_18.data = (_19.id = _25.sent(),
                                            _19.systemId = systemId,
                                            _19),
                                            _18)
                                    ],
                                        _17);
                                    _20 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 31:
                                    _20.id = _25.sent(),
                                        _20.sessionKey = sessionKey,
                                        _20.unionId = unionId,
                                        _20.origin = 'mp',
                                        _20.openId = openId,
                                        _20.applicationId = application.id;
                                    _21 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 32:
                                    wechatUserCreateData = (_20.user = (_21.id = _25.sent(),
                                        _21.action = 'create',
                                        _21.data = userData,
                                        _21),
                                        _20);
                                    _0 = (_z = rowStore).operate;
                                    _1 = ['token'];
                                    _22 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 33:
                                    _22.id = _25.sent(),
                                        _22.action = 'create';
                                    _23 = {
                                        id: id,
                                        userId: userData.id,
                                        playerId: userData.id,
                                        applicationId: application.id
                                    };
                                    _24 = {};
                                    return [4 /*yield*/, generateNewId()];
                                case 34: return [4 /*yield*/, _0.apply(_z, _1.concat([(_22.data = (_23.wechatUser = (_24.id = _25.sent(),
                                            _24.action = 'create',
                                            _24.data = wechatUserCreateData,
                                            _24),
                                            _23.env = env,
                                            _23),
                                            _22), context, {
                                            dontCollect: true,
                                        }]))];
                                case 35:
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
