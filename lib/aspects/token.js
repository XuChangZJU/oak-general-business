"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchTo = exports.sendCaptcha = exports.syncUserInfoWechatMp = exports.loginWechatMp = exports.loginWechat = exports.refreshWechatPublicUserInfo = exports.loginByMobile = void 0;
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var oak_external_sdk_1 = require("oak-external-sdk");
var assert_1 = require("oak-domain/lib/utils/assert");
var lodash_1 = require("oak-domain/lib/utils/lodash");
var types_1 = require("oak-domain/lib/types");
var extraFile_1 = require("../utils/extraFile");
var Exception_1 = require("../types/Exception");
var password_1 = require("../utils/password");
var projection_1 = require("../types/projection");
var sms_1 = require("../utils/sms");
var user_1 = require("./user");
function makeDistinguishException(userId, context, message) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, user, password, passwordSha1, idState, wechatUser$user, email$user;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, context.select('user', {
                        data: {
                            id: 1,
                            password: 1,
                            passwordSha1: 1,
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
                    return [2 /*return*/, new Exception_1.OakDistinguishUserException(userId, !!(password || passwordSha1), idState === 'verified', wechatUser$user.length > 0, email$user.length > 0, message)];
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
        var currentToken, applicationId, systemId, result2, _b, mobileRow, userId, user, userState, _c, tokenData, user, userState, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, mobileData, _p, _q, _r, userData, _s, _t, _u, mobileData, tokenData, _v, _w, _x, _y, _z, _0;
        var _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14;
        return tslib_1.__generator(this, function (_15) {
            switch (_15.label) {
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
                    result2 = _15.sent();
                    if (!(result2.length > 0)) return [3 /*break*/, 23];
                    // 此手机号已经存在
                    (0, assert_1.assert)(result2.length === 1);
                    _b = tslib_1.__read(result2, 1), mobileRow = _b[0];
                    if (!currentToken) return [3 /*break*/, 9];
                    if (!(currentToken.userId === mobileRow.userId)) return [3 /*break*/, 2];
                    return [2 /*return*/, currentToken.id];
                case 2:
                    userId = mobileRow.userId, user = mobileRow.user;
                    userState = user.userState;
                    _c = userState;
                    switch (_c) {
                        case 'disabled': return [3 /*break*/, 3];
                        case 'shadow': return [3 /*break*/, 4];
                    }
                    return [3 /*break*/, 6];
                case 3:
                    {
                        throw new Exception_1.OakUserDisabledException();
                    }
                    _15.label = 4;
                case 4: 
                // 直接合并
                return [4 /*yield*/, (0, user_1.mergeUser)({ from: userId, to: currentToken.userId }, context, true)];
                case 5:
                    // 直接合并
                    _15.sent();
                    return [2 /*return*/, currentToken.id];
                case 6:
                    (0, assert_1.assert)(userState === 'normal');
                    return [4 /*yield*/, makeDistinguishException(userId, context, '该手机号已被一个有效用户占用，请联系管理员处理')];
                case 7: throw _15.sent();
                case 8: return [3 /*break*/, 22];
                case 9:
                    _1 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 10:
                    tokenData = (_1.id = _15.sent(),
                        _1.applicationId = applicationId,
                        _1.playerId = mobileRow.userId,
                        _1.env = env,
                        _1.entity = 'mobile',
                        _1.entityId = mobileRow.id,
                        _1);
                    user = mobileRow.user;
                    userState = user.userState;
                    _d = userState;
                    switch (_d) {
                        case 'disabled': return [3 /*break*/, 11];
                        case 'shadow': return [3 /*break*/, 12];
                    }
                    return [3 /*break*/, 14];
                case 11:
                    {
                        throw new Exception_1.OakUserDisabledException();
                    }
                    _15.label = 12;
                case 12:
                    _f = (_e = Object).assign;
                    _g = [tokenData];
                    _2 = {
                        userId: mobileRow.userId
                    };
                    _3 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 13:
                    _f.apply(_e, _g.concat([(_2.user = (_3.id = _15.sent(),
                            _3.action = 'activate',
                            _3.data = {},
                            _3),
                            _2)]));
                    return [3 /*break*/, 15];
                case 14:
                    {
                        (0, assert_1.assert)(userState === 'normal');
                        Object.assign(tokenData, {
                            userId: mobileRow.userId,
                        });
                    }
                    _15.label = 15;
                case 15:
                    _j = (_h = context).operate;
                    _k = ['token'];
                    _4 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 16: return [4 /*yield*/, _j.apply(_h, _k.concat([(_4.id = _15.sent(),
                            _4.data = tokenData,
                            _4.action = 'create',
                            _4), {
                            dontCollect: true,
                        }]))];
                case 17:
                    _15.sent();
                    if (!(((_a = user === null || user === void 0 ? void 0 : user.userSystem$user) === null || _a === void 0 ? void 0 : _a.length) == 0)) return [3 /*break*/, 21];
                    _m = (_l = context).operate;
                    _o = ['userSystem'];
                    _5 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 18:
                    _5.id = _15.sent(),
                        _5.action = 'create';
                    _6 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 19: return [4 /*yield*/, _m.apply(_l, _o.concat([(_5.data = (_6.id = _15.sent(),
                            _6.userId = user.id,
                            _6.systemId = systemId,
                            _6),
                            _5), {
                            dontCollect: true,
                        }]))];
                case 20:
                    _15.sent();
                    _15.label = 21;
                case 21: return [2 /*return*/, tokenData.id];
                case 22: return [3 /*break*/, 38];
                case 23:
                    if (!currentToken) return [3 /*break*/, 27];
                    _7 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 24:
                    mobileData = (_7.id = _15.sent(),
                        _7.mobile = mobile,
                        _7.userId = currentToken.userId,
                        _7);
                    _q = (_p = context).operate;
                    _r = ['mobile'];
                    _8 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 25: return [4 /*yield*/, _q.apply(_p, _r.concat([(_8.id = _15.sent(),
                            _8.action = 'create',
                            _8.data = mobileData,
                            _8), {}]))];
                case 26:
                    _15.sent();
                    return [2 /*return*/, currentToken.id];
                case 27:
                    _9 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 28:
                    userData = (_9.id = _15.sent(),
                        _9.userState = 'normal',
                        _9);
                    _t = (_s = context).operate;
                    _u = ['user'];
                    _10 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 29: return [4 /*yield*/, _t.apply(_s, _u.concat([(_10.id = _15.sent(),
                            _10.action = 'create',
                            _10.data = userData,
                            _10), {}]))];
                case 30:
                    _15.sent();
                    _11 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 31:
                    mobileData = (_11.id = _15.sent(),
                        _11.mobile = mobile,
                        _11.userId = userData.id,
                        _11);
                    _12 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 32:
                    tokenData = (_12.id = _15.sent(),
                        _12.userId = userData.id,
                        _12.playerId = userData.id,
                        _12.env = env,
                        _12.entity = 'mobile',
                        _12.entityId = mobileData.id,
                        _12);
                    _w = (_v = context).operate;
                    _x = ['token'];
                    _13 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 33: return [4 /*yield*/, _w.apply(_v, _x.concat([(_13.id = _15.sent(),
                            _13.action = 'create',
                            _13.data = tokenData,
                            _13), { dontCollect: true }]))];
                case 34:
                    _15.sent();
                    return [4 /*yield*/, context.setTokenValue(tokenData.id)];
                case 35:
                    _15.sent();
                    _z = (_y = context).operate;
                    _0 = ['mobile'];
                    _14 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 36: return [4 /*yield*/, _z.apply(_y, _0.concat([(_14.id = _15.sent(),
                            _14.action = 'create',
                            _14.data = mobileData,
                            _14), { dontCollect: true }]))];
                case 37:
                    _15.sent();
                    return [2 /*return*/, tokenData.id];
                case 38: return [2 /*return*/];
            }
        });
    });
}
function loadTokenInfo(tokenId, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.select('token', {
                        data: projection_1.tokenProjection,
                        filter: {
                            id: tokenId,
                        },
                    }, {})];
                case 1: return [2 /*return*/, _a.sent()];
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
function tryRefreshWechatPublicUserInfo(wechatUserId, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, wechatUser, accessToken, refreshToken, atExpiredAt, rtExpiredAt, scope, now;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, context.select('wechatUser', {
                        data: {
                            id: 1,
                            accessToken: 1,
                            refreshToken: 1,
                            atExpiredAt: 1,
                            rtExpiredAt: 1,
                            scope: 1,
                        },
                        filter: {
                            id: wechatUserId,
                        }
                    }, { dontCollect: true })];
                case 1:
                    _a = tslib_1.__read.apply(void 0, [_b.sent(), 1]), wechatUser = _a[0];
                    accessToken = wechatUser.accessToken, refreshToken = wechatUser.refreshToken, atExpiredAt = wechatUser.atExpiredAt, rtExpiredAt = wechatUser.rtExpiredAt, scope = wechatUser.scope;
                    now = Date.now();
                    (0, assert_1.assert)(scope.toLowerCase().includes('userinfo'));
                    if (rtExpiredAt < now) {
                        // refreshToken过期，直接返回失败
                        throw new Exception_1.OakWechatPublicNeedReloginException();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function refreshWechatPublicUserInfo(_a, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var tokenValue, _b, token;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    tokenValue = context.getTokenValue();
                    return [4 /*yield*/, context.select('token', {
                            data: {
                                id: 1,
                                entity: 1,
                                entityId: 1,
                            },
                            filter: {
                                id: tokenValue,
                            },
                        }, { dontCollect: true })];
                case 1:
                    _b = tslib_1.__read.apply(void 0, [_c.sent(), 1]), token = _b[0];
                    (0, assert_1.assert)(token.entity === 'wechatUser');
                    (0, assert_1.assert)(token.entityId);
                    return [4 /*yield*/, tryRefreshWechatPublicUserInfo(token.entityId, context)];
                case 2: return [2 /*return*/, _c.sent()];
            }
        });
    });
}
exports.refreshWechatPublicUserInfo = refreshWechatPublicUserInfo;
/**
 * 公众号授权登录
 * @param param0
 * @param context
 */
function loginWechat(_a, context) {
    var code = _a.code, env = _a.env;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var loginLogic, tokenId, _b, tokenInfo;
        var _this = this;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    loginLogic = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var application, _a, type, config, systemId, appId, appSecret, config2, config2, wechatInstance, _b, accessToken, refreshToken, atExpiredAt, rtExpiredAt, scope, isSnapshotUser, openId, unionId, _c, wechatUser, id, wechatUser2, wechatUserUpdateData, userId, _d, token, _e, _f, _g, _h, _j, _k, userData2, _l, _m, _o, _p, wechatUser3, wechatUser2, _q, _r, _s, wechatUserCreateData_1, _t, _u, _v, userData, wechatUserCreateData, _w, _x, _y;
                        var _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20;
                        return tslib_1.__generator(this, function (_21) {
                            switch (_21.label) {
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
                                    _b = _21.sent(), accessToken = _b.accessToken, refreshToken = _b.refreshToken, atExpiredAt = _b.atExpiredAt, rtExpiredAt = _b.rtExpiredAt, scope = _b.scope, isSnapshotUser = _b.isSnapshotUser, openId = _b.openId, unionId = _b.unionId;
                                    if (isSnapshotUser) {
                                        throw new types_1.OakUserException('请使用完整服务后再进行登录操作');
                                    }
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
                                    _c = tslib_1.__read.apply(void 0, [_21.sent(), 1]), wechatUser = _c[0];
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 3:
                                    id = _21.sent();
                                    if (!wechatUser) return [3 /*break*/, 18];
                                    wechatUser2 = wechatUser;
                                    wechatUserUpdateData = {
                                        accessToken: accessToken,
                                        refreshToken: refreshToken,
                                        atExpiredAt: atExpiredAt,
                                        rtExpiredAt: rtExpiredAt,
                                        scope: scope,
                                    };
                                    if (unionId !== wechatUser.unionId) {
                                        Object.assign(wechatUserUpdateData, {
                                            unionId: unionId,
                                        });
                                    }
                                    userId = wechatUser2.userId;
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
                                    _d = tslib_1.__read.apply(void 0, [_21.sent(), 1]), token = _d[0];
                                    if (!(token && (0, lodash_1.isEqual)(token.env, env))) return [3 /*break*/, 8];
                                    _f = (_e = context).operate;
                                    _g = ['token'];
                                    _z = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 5:
                                    _z.id = _21.sent(),
                                        _z.action = 'update';
                                    _0 = {};
                                    _1 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 6: return [4 /*yield*/, _f.apply(_e, _g.concat([(_z.data = (_0.wechatUser = (_1.id = _21.sent(),
                                            _1.action = 'update',
                                            _1.data = wechatUserUpdateData,
                                            _1),
                                            _0),
                                            _z.filter = {
                                                id: token.id,
                                            },
                                            _z), {
                                            dontCollect: true,
                                        }]))];
                                case 7:
                                    _21.sent();
                                    return [2 /*return*/, token.id];
                                case 8:
                                    _j = (_h = context).operate;
                                    _k = ['token'];
                                    _2 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 9: return [4 /*yield*/, _j.apply(_h, _k.concat([(_2.id = _21.sent(),
                                            _2.action = 'disable',
                                            _2.data = {},
                                            _2.filter = {
                                                applicationId: application.id,
                                                ableState: 'enabled',
                                                userId: wechatUser2.userId,
                                                playerId: wechatUser2.userId,
                                            },
                                            _2), {
                                            dontCollect: true,
                                        }]))];
                                case 10:
                                    _21.sent();
                                    return [3 /*break*/, 14];
                                case 11:
                                    _3 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 12:
                                    _3.id = _21.sent(),
                                        _3.action = 'create';
                                    _4 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 13:
                                    userData2 = (_3.data = (_4.id = _21.sent(),
                                        _4.userState = 'normal',
                                        _4),
                                        _3);
                                    Object.assign(wechatUserUpdateData, {
                                        user: userData2,
                                    });
                                    userId = userData2.data.id;
                                    _21.label = 14;
                                case 14:
                                    _m = (_l = context).operate;
                                    _o = ['token'];
                                    _5 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 15:
                                    _5.id = _21.sent(),
                                        _5.action = 'create';
                                    _6 = {
                                        id: id,
                                        userId: userId,
                                        playerId: userId,
                                        applicationId: application.id,
                                        entity: 'wechatUser',
                                        entityId: wechatUser2.id
                                    };
                                    _7 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 16: return [4 /*yield*/, _m.apply(_l, _o.concat([(_5.data = (_6.wechatUser = (_7.id = _21.sent(),
                                            _7.action = 'update',
                                            _7.data = wechatUserUpdateData,
                                            _7),
                                            _6.env = env,
                                            _6),
                                            _5), {}]))];
                                case 17:
                                    _21.sent();
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
                                    _p = tslib_1.__read.apply(void 0, [_21.sent(), 1]), wechatUser3 = _p[0];
                                    wechatUser2 = wechatUser3;
                                    if (!(wechatUser2 && wechatUser2.userId)) return [3 /*break*/, 26];
                                    _r = (_q = context).operate;
                                    _s = ['token'];
                                    _8 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 20: return [4 /*yield*/, _r.apply(_q, _s.concat([(_8.id = _21.sent(),
                                            _8.action = 'disable',
                                            _8.data = {},
                                            _8.filter = {
                                                applicationId: application.id,
                                                ableState: 'enabled',
                                                userId: wechatUser2.userId,
                                                playerId: wechatUser2.userId,
                                            },
                                            _8), {
                                            dontCollect: true,
                                        }]))];
                                case 21:
                                    _21.sent();
                                    _9 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 22:
                                    wechatUserCreateData_1 = (_9.id = _21.sent(),
                                        _9.accessToken = accessToken,
                                        _9.refreshToken = refreshToken,
                                        _9.atExpiredAt = atExpiredAt,
                                        _9.rtExpiredAt = rtExpiredAt,
                                        _9.scope = scope,
                                        _9.unionId = unionId,
                                        _9.origin = 'mp',
                                        _9.openId = openId,
                                        _9.applicationId = application.id,
                                        _9.userId = wechatUser2.userId,
                                        _9);
                                    _u = (_t = context).operate;
                                    _v = ['token'];
                                    _10 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 23:
                                    _10.id = _21.sent(),
                                        _10.action = 'create';
                                    _11 = {
                                        id: id,
                                        userId: wechatUser2.userId,
                                        playerId: wechatUser2.userId,
                                        applicationId: application.id
                                    };
                                    _12 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 24: return [4 /*yield*/, _u.apply(_t, _v.concat([(_10.data = (_11.wechatUser = (_12.id = _21.sent(),
                                            _12.action = 'create',
                                            _12.data = wechatUserCreateData_1,
                                            _12),
                                            _11.env = env,
                                            _11),
                                            _10), {
                                            dontCollect: true,
                                        }]))];
                                case 25:
                                    _21.sent();
                                    return [2 /*return*/, id];
                                case 26:
                                    _13 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 27:
                                    _13.id = _21.sent(),
                                        _13.userState = 'normal';
                                    _14 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 28:
                                    _14.id = _21.sent(),
                                        _14.action = 'create';
                                    _15 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 29:
                                    userData = (_13.userSystem$user = [
                                        (_14.data = (_15.id = _21.sent(),
                                            _15.systemId = systemId,
                                            _15),
                                            _14)
                                    ],
                                        _13);
                                    _16 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 30:
                                    _16.id = _21.sent(),
                                        _16.accessToken = accessToken,
                                        _16.refreshToken = refreshToken,
                                        _16.atExpiredAt = atExpiredAt,
                                        _16.rtExpiredAt = rtExpiredAt,
                                        _16.scope = scope,
                                        _16.unionId = unionId,
                                        _16.origin = type === 'wechatPublic' ? 'public' : 'web',
                                        _16.openId = openId,
                                        _16.applicationId = application.id;
                                    _17 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 31:
                                    wechatUserCreateData = (_16.user = (_17.id = _21.sent(),
                                        _17.action = 'create',
                                        _17.data = userData,
                                        _17),
                                        _16);
                                    _x = (_w = context).operate;
                                    _y = ['token'];
                                    _18 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 32:
                                    _18.id = _21.sent(),
                                        _18.action = 'create';
                                    _19 = {
                                        id: id,
                                        userId: userData.id,
                                        playerId: userData.id,
                                        applicationId: application.id
                                    };
                                    _20 = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 33: return [4 /*yield*/, _x.apply(_w, _y.concat([(_18.data = (_19.wechatUser = (_20.id = _21.sent(),
                                            _20.action = 'create',
                                            _20.data = wechatUserCreateData,
                                            _20),
                                            _19.env = env,
                                            _19),
                                            _18), {
                                            dontCollect: true,
                                        }]))];
                                case 34:
                                    _21.sent();
                                    return [2 /*return*/, id];
                            }
                        });
                    }); };
                    return [4 /*yield*/, loginLogic()];
                case 1:
                    tokenId = _c.sent();
                    return [4 /*yield*/, loadTokenInfo(tokenId, context)];
                case 2:
                    _b = tslib_1.__read.apply(void 0, [_c.sent(), 1]), tokenInfo = _b[0];
                    (0, assert_1.assert)(tokenInfo.entity === 'wechatUser');
                    tryRefreshWechatPublicUserInfo(tokenInfo.entityId, context);
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
    var _b, _c;
    var mobile = _a.mobile, env = _a.env;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var type, visitorId, application, system, mockSend, now, duration, _d, count1, count2, _e, captcha, code, result, code, id, _f, _g, _h, result;
        var _j;
        return tslib_1.__generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    type = env.type;
                    (0, assert_1.assert)(type === 'web');
                    visitorId = env.visitorId;
                    application = context.getApplication();
                    system = application.system;
                    mockSend = (_c = (_b = system === null || system === void 0 ? void 0 : system.config) === null || _b === void 0 ? void 0 : _b.Sms) === null || _c === void 0 ? void 0 : _c.mockSend;
                    now = Date.now();
                    duration = 1;
                    if (!(process.env.NODE_ENV !== 'development' && !mockSend)) return [3 /*break*/, 2];
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
                                },
                            }, {
                                dontCollect: true,
                            }),
                        ])];
                case 1:
                    _d = tslib_1.__read.apply(void 0, [_k.sent(), 2]), count1 = _d[0], count2 = _d[1];
                    if (count1 > 5 || count2 > 5) {
                        throw new types_1.OakUserException('您已发送很多次短信，请休息会再发吧');
                    }
                    _k.label = 2;
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
                    _e = tslib_1.__read.apply(void 0, [_k.sent(), 1]), captcha = _e[0];
                    if (!captcha) return [3 /*break*/, 8];
                    code = captcha.code;
                    if (!(process.env.NODE_ENV === 'development' || mockSend)) return [3 /*break*/, 4];
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
                    result = _k.sent();
                    if (result === true) {
                        return [2 /*return*/, '验证码已发送'];
                    }
                    return [2 /*return*/, '验证码发送失败'];
                case 7: return [3 /*break*/, 14];
                case 8:
                    code = void 0;
                    if (process.env.NODE_ENV === 'development' || mockSend) {
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
                    id = _k.sent();
                    _g = (_f = context).operate;
                    _h = ['captcha'];
                    _j = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 10: return [4 /*yield*/, _g.apply(_f, _h.concat([(_j.id = _k.sent(),
                            _j.action = 'create',
                            _j.data = {
                                id: id,
                                mobile: mobile,
                                code: code,
                                visitorId: visitorId,
                                env: env,
                                expired: false,
                                expiresAt: now + 660 * 1000,
                            },
                            _j), {
                            dontCollect: true,
                        }]))];
                case 11:
                    _k.sent();
                    if (!(process.env.NODE_ENV === 'development' || mockSend)) return [3 /*break*/, 12];
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
                    result = _k.sent();
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
