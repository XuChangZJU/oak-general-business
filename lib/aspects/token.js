"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWechatMpUserPhoneNumber = exports.switchTo = exports.sendCaptcha = exports.syncUserInfoWechatMp = exports.loginWechatMp = exports.loginWechat = exports.refreshWechatPublicUserInfo = exports.loginByMobile = void 0;
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
function setUserInfoFromWechat(user, userInfo, context) {
    var _a, _b, _c;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var application, config, nickname, gender, avatar, originalNickname, originalGender, extraFile$entity, updateData, extraFileOperations, _d, _e, _f, _g, _h, _j, _k;
        var _l, _m, _o, _p;
        return tslib_1.__generator(this, function (_q) {
            switch (_q.label) {
                case 0:
                    application = context.getApplication();
                    config = ((_a = application === null || application === void 0 ? void 0 : application.system) === null || _a === void 0 ? void 0 : _a.config) || ((_c = (_b = application === null || application === void 0 ? void 0 : application.system) === null || _b === void 0 ? void 0 : _b.platform) === null || _c === void 0 ? void 0 : _c.config);
                    nickname = userInfo.nickname, gender = userInfo.gender, avatar = userInfo.avatar;
                    originalNickname = user.nickname, originalGender = user.gender, extraFile$entity = user.extraFile$entity;
                    updateData = {};
                    if (nickname && nickname !== originalNickname) {
                        Object.assign(updateData, {
                            nickname: nickname,
                        });
                    }
                    if (gender && gender !== originalGender) {
                        Object.assign(updateData, {
                            gender: gender,
                        });
                    }
                    if (!(avatar && ((extraFile$entity === null || extraFile$entity === void 0 ? void 0 : extraFile$entity.length) === 0 ||
                        (0, extraFile_1.composeFileUrl)(extraFile$entity[0], config) !== avatar))) return [3 /*break*/, 6];
                    _l = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 1:
                    _l.id = _q.sent(),
                        _l.action = 'create';
                    _e = (_d = Object).assign;
                    _m = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 2:
                    _m.id = _q.sent(),
                        _m.tag1 = 'avatar',
                        _m.entity = 'user',
                        _m.entityId = user.id;
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 3:
                    extraFileOperations = [
                        (_l.data = _e.apply(_d, [(_m.objectId = _q.sent(),
                                _m), (0, extraFile_1.decomposeFileUrl)(avatar)]),
                            _l)
                    ];
                    if (!(extraFile$entity.length > 0)) return [3 /*break*/, 5];
                    _g = (_f = extraFileOperations).push;
                    _o = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 4:
                    _g.apply(_f, [(_o.id = _q.sent(),
                            _o.action = 'remove',
                            _o.data = {},
                            _o.filter = {
                                id: extraFile$entity[0].id,
                            },
                            _o)]);
                    _q.label = 5;
                case 5:
                    Object.assign(updateData, {
                        extraFile$entity: extraFileOperations,
                    });
                    _q.label = 6;
                case 6:
                    if (!(Object.keys(updateData).length > 0)) return [3 /*break*/, 9];
                    _j = (_h = context).operate;
                    _k = ['user'];
                    _p = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 7: return [4 /*yield*/, _j.apply(_h, _k.concat([(_p.id = _q.sent(),
                            _p.action = 'update',
                            _p.data = updateData,
                            _p.filter = {
                                id: user.id,
                            },
                            _p), {}]))];
                case 8:
                    _q.sent();
                    _q.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
function tryRefreshWechatPublicUserInfo(wechatUserId, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, wechatUser, application, _b, type, config, appId, appSecret, config2, wechatInstance, accessToken, refreshToken, atExpiredAt, rtExpiredAt, scope, openId, user, now, _c, at2, ate2, s2, _d, _e, _f, _g, nickname, gender, avatar;
        var _h;
        return tslib_1.__generator(this, function (_j) {
            switch (_j.label) {
                case 0: return [4 /*yield*/, context.select('wechatUser', {
                        data: {
                            id: 1,
                            accessToken: 1,
                            refreshToken: 1,
                            atExpiredAt: 1,
                            rtExpiredAt: 1,
                            scope: 1,
                            openId: 1,
                            user: {
                                id: 1,
                                nickname: 1,
                                gender: 1,
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
                                },
                            },
                        },
                        filter: {
                            id: wechatUserId,
                        }
                    }, { dontCollect: true })];
                case 1:
                    _a = tslib_1.__read.apply(void 0, [_j.sent(), 1]), wechatUser = _a[0];
                    application = context.getApplication();
                    _b = application, type = _b.type, config = _b.config;
                    (0, assert_1.assert)(type !== 'wechatMp' && config.type !== 'wechatMp');
                    config2 = config;
                    appId = config2.appId;
                    appSecret = config2.appSecret;
                    wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
                    accessToken = wechatUser.accessToken, refreshToken = wechatUser.refreshToken, atExpiredAt = wechatUser.atExpiredAt, rtExpiredAt = wechatUser.rtExpiredAt, scope = wechatUser.scope, openId = wechatUser.openId, user = wechatUser.user;
                    now = Date.now();
                    (0, assert_1.assert)(scope.toLowerCase().includes('userinfo'));
                    if (rtExpiredAt < now) {
                        // refreshToken过期，直接返回未登录异常，使用户去重新登录
                        throw new types_1.OakUnloggedInException();
                    }
                    if (!(atExpiredAt < now)) return [3 /*break*/, 5];
                    return [4 /*yield*/, wechatInstance.refreshUserAccessToken(refreshToken)];
                case 2:
                    _c = _j.sent(), at2 = _c.accessToken, ate2 = _c.atExpiredAt, s2 = _c.scope;
                    _e = (_d = context).operate;
                    _f = ['wechatUser'];
                    _h = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 3: return [4 /*yield*/, _e.apply(_d, _f.concat([(_h.id = _j.sent(),
                            _h.action = 'update',
                            _h.data = {
                                accessToken: at2,
                                atExpiredAt: ate2,
                                scope: s2,
                            },
                            _h), { dontCollect: true, dontCreateModi: true, dontCreateOper: true }]))];
                case 4:
                    _j.sent();
                    accessToken = at2;
                    _j.label = 5;
                case 5: return [4 /*yield*/, wechatInstance.getUserInfo(accessToken, openId)];
                case 6:
                    _g = _j.sent(), nickname = _g.nickname, gender = _g.gender, avatar = _g.avatar;
                    return [4 /*yield*/, setUserInfoFromWechat(user, { nickname: nickname, gender: gender, avatar: avatar }, context)];
                case 7:
                    _j.sent();
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
function loginFromWechatEnv(code, env, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var application, _a, type, config, systemId, appId, appSecret, config2, config2, config2, wechatInstance, _b, isSnapshotUser, openId, unionId, wechatUserData, _c, wechatUser, OriginMap, id, newUserId, wechatUser2, wechatUserUpdateData, userId, _d, token, _e, _f, _g, _h, _j, _k, userData2, _l, _m, _o, _p, wechatUser3, wechatUserCreateData_1, _q, _r, _s, _t, _u, _v, userData, wechatUserCreateData, _w, _x, _y;
        var _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22;
        return tslib_1.__generator(this, function (_23) {
            switch (_23.label) {
                case 0:
                    application = context.getApplication();
                    _a = application, type = _a.type, config = _a.config, systemId = _a.systemId;
                    if (type === 'wechatPublic') {
                        config2 = config;
                        appId = config2.appId;
                        appSecret = config2.appSecret;
                    }
                    else if (type === 'wechatMp') {
                        config2 = config;
                        appId = config2.appId;
                        appSecret = config2.appSecret;
                    }
                    else {
                        (0, assert_1.assert)(type === 'web');
                        config2 = config;
                        (0, assert_1.assert)(config2.wechat);
                        appId = config2.wechat.appId;
                        appSecret = config2.wechat.appSecret;
                    }
                    wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
                    return [4 /*yield*/, wechatInstance.code2Session(code)];
                case 1:
                    _b = _23.sent(), isSnapshotUser = _b.isSnapshotUser, openId = _b.openId, unionId = _b.unionId, wechatUserData = tslib_1.__rest(_b, ["isSnapshotUser", "openId", "unionId"]);
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
                    _c = tslib_1.__read.apply(void 0, [_23.sent(), 1]), wechatUser = _c[0];
                    OriginMap = {
                        'web': 'web',
                        'wechatPublic': 'public',
                        'wechatMp': 'mp',
                    };
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 3:
                    id = _23.sent();
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 4:
                    newUserId = _23.sent();
                    if (!wechatUser) return [3 /*break*/, 21];
                    wechatUser2 = wechatUser;
                    wechatUserUpdateData = wechatUserData;
                    if (unionId !== wechatUser.unionId) {
                        Object.assign(wechatUserUpdateData, {
                            unionId: unionId,
                        });
                    }
                    userId = wechatUser2.userId;
                    if (!wechatUser2.userId) return [3 /*break*/, 12];
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
                case 5:
                    _d = tslib_1.__read.apply(void 0, [_23.sent(), 1]), token = _d[0];
                    if (!(token && (0, lodash_1.isEqual)(token.env, env))) return [3 /*break*/, 9];
                    _f = (_e = context).operate;
                    _g = ['token'];
                    _z = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 6:
                    _z.id = _23.sent(),
                        _z.action = 'update';
                    _0 = {};
                    _1 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 7: return [4 /*yield*/, _f.apply(_e, _g.concat([(_z.data = (_0.wechatUser = (_1.id = _23.sent(),
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
                case 8:
                    _23.sent();
                    return [2 /*return*/, token.id];
                case 9:
                    _j = (_h = context).operate;
                    _k = ['token'];
                    _2 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 10: return [4 /*yield*/, _j.apply(_h, _k.concat([(_2.id = _23.sent(),
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
                case 11:
                    _23.sent();
                    return [3 /*break*/, 17];
                case 12:
                    _3 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 13:
                    _3.id = _23.sent(),
                        _3.action = 'create';
                    _4 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 14:
                    _4.id = _23.sent(),
                        _4.userState = 'normal';
                    _5 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 15:
                    _5.id = _23.sent(),
                        _5.action = 'create';
                    _6 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 16:
                    userData2 = (_3.data = (_4.userSystem$user = (_5.data = (_6.id = _23.sent(),
                        _6.systemId = context.getSystemId(),
                        _6),
                        _5),
                        _4),
                        _3);
                    Object.assign(wechatUserUpdateData, {
                        user: userData2,
                    });
                    userId = userData2.data.id;
                    _23.label = 17;
                case 17:
                    _m = (_l = context).operate;
                    _o = ['token'];
                    _7 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 18:
                    _7.id = _23.sent(),
                        _7.action = 'create';
                    _8 = {
                        id: id,
                        userId: userId,
                        playerId: userId,
                        applicationId: application.id,
                        entity: 'wechatUser',
                        entityId: wechatUser2.id
                    };
                    _9 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 19: return [4 /*yield*/, _m.apply(_l, _o.concat([(_7.data = (_8.wechatUser = (_9.id = _23.sent(),
                            _9.action = 'update',
                            _9.data = wechatUserUpdateData,
                            _9),
                            _8.env = env,
                            _8),
                            _7), {}]))];
                case 20:
                    _23.sent();
                    return [2 /*return*/, id];
                case 21:
                    if (!unionId) return [3 /*break*/, 30];
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
                case 22:
                    _p = tslib_1.__read.apply(void 0, [_23.sent(), 1]), wechatUser3 = _p[0];
                    if (!wechatUser3) return [3 /*break*/, 30];
                    if (!wechatUser3.userId) return [3 /*break*/, 27];
                    _10 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 23:
                    wechatUserCreateData_1 = tslib_1.__assign.apply(void 0, [(_10.id = _23.sent(), _10.unionId = unionId, _10.origin = OriginMap[type], _10.openId = openId, _10.applicationId = application.id, _10.userId = wechatUser3.userId, _10), wechatUserData]);
                    _r = (_q = context).operate;
                    _s = ['token'];
                    _11 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 24:
                    _11.id = _23.sent(),
                        _11.action = 'create';
                    _12 = {
                        id: id,
                        userId: wechatUser3.userId,
                        playerId: wechatUser3.userId,
                        applicationId: application.id
                    };
                    _13 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 25: return [4 /*yield*/, _r.apply(_q, _s.concat([(_11.data = (_12.wechatUser = (_13.id = _23.sent(),
                            _13.action = 'create',
                            _13.data = wechatUserCreateData_1,
                            _13),
                            _12.env = env,
                            _12),
                            _11), {
                            dontCollect: true,
                        }]))];
                case 26:
                    _23.sent();
                    return [2 /*return*/, id];
                case 27:
                    _u = (_t = context).operate;
                    _v = ['wechatUser'];
                    _14 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 28: 
                // 这里顺便帮其它wechatUser数据也补上相应的userId
                return [4 /*yield*/, _u.apply(_t, _v.concat([(_14.id = _23.sent(),
                            _14.action = 'update',
                            _14.data = {
                                userId: newUserId,
                            },
                            _14.filter = {
                                id: wechatUser3.id,
                            },
                            _14), { dontCollect: true }]))];
                case 29:
                    // 这里顺便帮其它wechatUser数据也补上相应的userId
                    _23.sent();
                    _23.label = 30;
                case 30:
                    _15 = {
                        id: newUserId,
                        userState: 'normal'
                    };
                    _16 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 31:
                    _16.id = _23.sent(),
                        _16.action = 'create';
                    _17 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 32:
                    userData = (_15.userSystem$user = [
                        (_16.data = (_17.id = _23.sent(),
                            _17.systemId = systemId,
                            _17),
                            _16)
                    ],
                        _15);
                    _18 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 33:
                    _18.id = _23.sent(), _18.unionId = unionId, _18.origin = OriginMap[type], _18.openId = openId, _18.applicationId = application.id;
                    _19 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 34:
                    wechatUserCreateData = tslib_1.__assign.apply(void 0, [(_18.user = (_19.id = _23.sent(),
                            _19.action = 'create',
                            _19.data = userData,
                            _19), _18), wechatUserData]);
                    _x = (_w = context).operate;
                    _y = ['token'];
                    _20 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 35:
                    _20.id = _23.sent(),
                        _20.action = 'create';
                    _21 = {
                        id: id,
                        userId: newUserId,
                        playerId: newUserId,
                        applicationId: application.id
                    };
                    _22 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 36: return [4 /*yield*/, _x.apply(_w, _y.concat([(_20.data = (_21.wechatUser = (_22.id = _23.sent(),
                            _22.action = 'create',
                            _22.data = wechatUserCreateData,
                            _22),
                            _21.env = env,
                            _21),
                            _20), {
                            dontCollect: true,
                        }]))];
                case 37:
                    _23.sent();
                    return [2 /*return*/, id];
            }
        });
    });
}
/**
 * 公众号授权登录
 * @param param0
 * @param context
 */
function loginWechat(_a, context) {
    var code = _a.code, env = _a.env;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var tokenId, _b, tokenInfo;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, loginFromWechatEnv(code, env, context)];
                case 1:
                    tokenId = _c.sent();
                    return [4 /*yield*/, loadTokenInfo(tokenId, context)];
                case 2:
                    _b = tslib_1.__read.apply(void 0, [_c.sent(), 1]), tokenInfo = _b[0];
                    (0, assert_1.assert)(tokenInfo.entity === 'wechatUser');
                    return [4 /*yield*/, context.setTokenValue(tokenId)];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, tryRefreshWechatPublicUserInfo(tokenInfo.entityId, context)];
                case 4:
                    _c.sent();
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
        var tokenId;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, loginFromWechatEnv(code, env, context)];
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
        var userId, application, config, _e, _f, sessionKey, user;
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
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
                                    gender: 1,
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
                    _e = tslib_1.__read.apply(void 0, [_g.sent(), 1]), _f = _e[0], sessionKey = _f.sessionKey, user = _f.user;
                    // console.log(avatarUrl);
                    // const { type, config } = application;
                    // assert(type === 'wechatMp' || config.type === 'wechatMp');
                    // const config2 = config as WechatMpConfig;
                    // const { appId, appSecret } = config2;
                    // const wechatInstance = WechatSDK.getInstance(appId, 'wechatMp', appSecret);
                    // const result = wechatInstance.decryptData(sessionKey as string, encryptedData, iv, signature);
                    // 实测发现解密出来的和userInfo完全一致……
                    // console.log(result);
                    return [4 /*yield*/, setUserInfoFromWechat(user, { nickname: nickname, avatar: avatarUrl }, context)];
                case 2:
                    // console.log(avatarUrl);
                    // const { type, config } = application;
                    // assert(type === 'wechatMp' || config.type === 'wechatMp');
                    // const config2 = config as WechatMpConfig;
                    // const { appId, appSecret } = config2;
                    // const wechatInstance = WechatSDK.getInstance(appId, 'wechatMp', appSecret);
                    // const result = wechatInstance.decryptData(sessionKey as string, encryptedData, iv, signature);
                    // 实测发现解密出来的和userInfo完全一致……
                    // console.log(result);
                    _g.sent();
                    return [2 /*return*/];
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
                    if (!(process.env.NODE_ENV !== 'production' || mockSend)) return [3 /*break*/, 4];
                    return [2 /*return*/, "\u9A8C\u8BC1\u7801[".concat(code, "]\u5DF2\u521B\u5EFA")];
                case 4:
                    if (!(captcha.$$createAt$$ - now < 60000)) return [3 /*break*/, 5];
                    throw new types_1.OakUserException('您的操作太迅捷啦，请稍等再点吧');
                case 5: return [4 /*yield*/, (0, sms_1.sendSms)({
                        origin: 'tencent',
                        templateName: '登录',
                        mobile: mobile,
                        templateParamSet: [
                            code,
                            duration.toString(),
                        ],
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
                        templateParamSet: [
                            code,
                            duration.toString(),
                        ],
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
function getWechatMpUserPhoneNumber(_a, context) {
    var code = _a.code, env = _a.env;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var application, _b, type, config, systemId, config2, appId, appSecret, wechatInstance, result, phoneNumber;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    application = context.getApplication();
                    _b = application, type = _b.type, config = _b.config, systemId = _b.systemId;
                    (0, assert_1.assert)(type === 'wechatMp' && config.type === 'wechatMp');
                    config2 = config;
                    appId = config2.appId, appSecret = config2.appSecret;
                    wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, 'wechatMp', appSecret);
                    return [4 /*yield*/, wechatInstance.getUserPhoneNumber(code)];
                case 1:
                    result = _c.sent();
                    phoneNumber = result === null || result === void 0 ? void 0 : result.phoneNumber;
                    return [4 /*yield*/, setupMobile(phoneNumber, env, context)];
                case 2: return [2 /*return*/, _c.sent()];
            }
        });
    });
}
exports.getWechatMpUserPhoneNumber = getWechatMpUserPhoneNumber;
