"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getWechatMpUserPhoneNumber = exports.switchTo = exports.sendCaptcha = exports.syncUserInfoWechatMp = exports.loginWechatMp = exports.loginWechat = exports.refreshWechatPublicUserInfo = exports.loginByMobile = void 0;
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var oak_external_sdk_1 = require("oak-external-sdk");
var assert_1 = require("oak-domain/lib/utils/assert");
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
function dealWithUserState(user, context, tokenData) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, _b, user2;
        var _c, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = user.userState;
                    switch (_a) {
                        case 'disabled': return [3 /*break*/, 1];
                        case 'shadow': return [3 /*break*/, 2];
                        case 'merged': return [3 /*break*/, 4];
                    }
                    return [3 /*break*/, 7];
                case 1:
                    {
                        throw new Exception_1.OakUserDisabledException();
                    }
                    _e.label = 2;
                case 2:
                    _c = {
                        userId: user.id
                    };
                    _d = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 3: return [2 /*return*/, (_c.user = (_d.id = _e.sent(),
                        _d.action = 'activate',
                        _d.data = {},
                        _d),
                        _c)];
                case 4:
                    (0, assert_1.assert)(user === null || user === void 0 ? void 0 : user.refId);
                    return [4 /*yield*/, context.select('user', {
                            data: {
                                id: 1,
                                userState: 1,
                                refId: 1,
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
                            filter: {
                                id: user.refId,
                            }
                        }, {
                            dontCollect: true,
                        })];
                case 5:
                    _b = tslib_1.__read.apply(void 0, [_e.sent(), 1]), user2 = _b[0];
                    return [4 /*yield*/, dealWithUserState(user2, context, tokenData)];
                case 6: return [2 /*return*/, _e.sent()];
                case 7:
                    {
                        (0, assert_1.assert)(user.userState === 'normal');
                        return [2 /*return*/, {
                                userId: user.id,
                            }];
                    }
                    _e.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
/**
 * 根据user的不同情况，完成登录动作
 * @param env
 * @param context
 * @param user
 * @return tokenId
 */
function setUpTokenAndUser(env, context, entity, // 支持更多的登录渠道使用此函数创建token
entityId, // 如果是现有对象传id，如果没有对象传createData
createData, user) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var currentToken, schema, userState, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, application, _l, originToken, tokenData, userState, userId, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, userData, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9;
        var _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22;
        return tslib_1.__generator(this, function (_23) {
            switch (_23.label) {
                case 0:
                    currentToken = context.getToken(true);
                    schema = context.getSchema();
                    (0, assert_1.assert)(schema.hasOwnProperty(entity), "".concat(entity, "\u5FC5\u987B\u662F\u6709\u6548\u7684\u5BF9\u8C61\u540D "));
                    (0, assert_1.assert)(schema.token.attributes.entity.ref.includes(entity), "".concat(entity, "\u5FC5\u987B\u662Ftoken\u7684\u6709\u6548\u5173\u8054\u5BF9\u8C61"));
                    (0, assert_1.assert)(schema[entity].attributes.hasOwnProperty('userId') && schema[entity].attributes.userId.ref === 'user', "".concat(entity, "\u5FC5\u987B\u6709\u6307\u5411user\u7684userId\u5C5E\u6027"));
                    if (!currentToken) return [3 /*break*/, 20];
                    (0, assert_1.assert)(currentToken.id);
                    (0, assert_1.assert)(currentToken.userId);
                    if (!user) return [3 /*break*/, 12];
                    userState = user.userState;
                    _a = userState;
                    switch (_a) {
                        case 'normal': return [3 /*break*/, 1];
                        case 'shadow': return [3 /*break*/, 3];
                        case 'disabled': return [3 /*break*/, 7];
                        case 'merged': return [3 /*break*/, 8];
                    }
                    return [3 /*break*/, 10];
                case 1:
                    if (currentToken.userId === user.id) {
                        return [2 /*return*/, currentToken.id];
                    }
                    return [4 /*yield*/, (0, user_1.mergeUser)({ from: user.id, to: currentToken.userId }, context, true)];
                case 2:
                    _23.sent();
                    return [2 /*return*/, currentToken.id];
                case 3:
                    (0, assert_1.assert)(currentToken.userId !== user.id);
                    return [4 /*yield*/, (0, user_1.mergeUser)({ from: user.id, to: currentToken.userId }, context, true)];
                case 4:
                    _23.sent();
                    _c = (_b = context).operate;
                    _d = ['user'];
                    _10 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 5: return [4 /*yield*/, _c.apply(_b, _d.concat([(_10.id = _23.sent(),
                            _10.action = 'activate',
                            _10.data = {},
                            _10.filter = {
                                id: user.id,
                            },
                            _10), { dontCollect: true }]))];
                case 6:
                    _23.sent();
                    return [2 /*return*/, currentToken.id];
                case 7:
                    {
                        throw new Exception_1.OakUserDisabledException();
                    }
                    _23.label = 8;
                case 8:
                    (0, assert_1.assert)(user.refId);
                    if (user.refId === currentToken.userId) {
                        return [2 /*return*/, currentToken.id];
                    }
                    // 说明一个用户被其他用户merge了，现在还是暂时先merge，后面再说
                    console.warn("\u7528\u6237".concat(user.id, "\u5DF2\u7ECF\u662Fmerged\u72B6\u6001\u300C").concat(user.refId, "\u300D\uFF0C\u518D\u6B21\u88ABmerged\u5230\u300C").concat(currentToken.userId, "]\u300D"));
                    return [4 /*yield*/, (0, user_1.mergeUser)({ from: user.id, to: currentToken.userId }, context, true)];
                case 9:
                    _23.sent();
                    return [2 /*return*/, currentToken.id];
                case 10:
                    {
                        (0, assert_1.assert)(false, "\u4E0D\u80FD\u7406\u89E3\u7684user\u72B6\u6001\u300C".concat(userState, "\u300D"));
                    }
                    _23.label = 11;
                case 11: return [3 /*break*/, 19];
                case 12:
                    // 没用户，指向当前用户
                    (0, assert_1.assert)(createData && !entityId);
                    if (!createData) return [3 /*break*/, 15];
                    _f = (_e = context).operate;
                    _g = [entity];
                    _11 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 13: return [4 /*yield*/, _f.apply(_e, _g.concat([(_11.id = _23.sent(),
                            _11.action = 'create',
                            _11.data = Object.assign(createData, {
                                userId: currentToken.userId,
                            }),
                            _11), { dontCollect: true }]))];
                case 14:
                    _23.sent();
                    return [3 /*break*/, 18];
                case 15:
                    (0, assert_1.assert)(entityId);
                    _j = (_h = context).operate;
                    _k = [entity];
                    _12 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 16: return [4 /*yield*/, _j.apply(_h, _k.concat([(_12.id = _23.sent(),
                            _12.action = 'update',
                            _12.data = {
                                userId: currentToken.userId,
                            },
                            _12.filter = {
                                id: entityId,
                            },
                            _12), { dontCollect: true }]))];
                case 17:
                    _23.sent();
                    _23.label = 18;
                case 18: return [2 /*return*/, currentToken.id];
                case 19: return [3 /*break*/, 50];
                case 20:
                    if (!entityId) return [3 /*break*/, 22];
                    application = context.getApplication();
                    return [4 /*yield*/, context.select('token', {
                            data: {
                                id: 1,
                            },
                            filter: {
                                applicationId: application.id,
                                ableState: 'enabled',
                                entity: entity,
                                entityId: entityId,
                            },
                        }, { dontCollect: true })];
                case 21:
                    _l = tslib_1.__read.apply(void 0, [_23.sent(), 1]), originToken = _l[0];
                    if (originToken) {
                        return [2 /*return*/, originToken.id];
                    }
                    _23.label = 22;
                case 22:
                    _13 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 23:
                    tokenData = (_13.id = _23.sent(),
                        _13.env = env,
                        _13);
                    if (!user) return [3 /*break*/, 37];
                    userState = user.userState;
                    userId = user.id;
                    _m = userState;
                    switch (_m) {
                        case 'normal': return [3 /*break*/, 24];
                        case 'merged': return [3 /*break*/, 25];
                        case 'disabled': return [3 /*break*/, 26];
                        case 'shadow': return [3 /*break*/, 27];
                    }
                    return [3 /*break*/, 30];
                case 24:
                    {
                        return [3 /*break*/, 31];
                    }
                    _23.label = 25;
                case 25:
                    {
                        userId = user.refId;
                        return [3 /*break*/, 31];
                    }
                    _23.label = 26;
                case 26:
                    {
                        throw new Exception_1.OakUserDisabledException();
                    }
                    _23.label = 27;
                case 27:
                    _p = (_o = context).operate;
                    _q = ['user'];
                    _14 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 28: return [4 /*yield*/, _p.apply(_o, _q.concat([(_14.id = _23.sent(),
                            _14.action = 'activate',
                            _14.data = {},
                            _14.filter = {
                                id: userId,
                            },
                            _14), { dontCollect: true }]))];
                case 29:
                    _23.sent();
                    return [3 /*break*/, 31];
                case 30:
                    {
                        (0, assert_1.assert)(false, "\u4E0D\u80FD\u7406\u89E3\u7684user\u72B6\u6001\u300C".concat(userState, "\u300D"));
                    }
                    _23.label = 31;
                case 31:
                    tokenData.userId = userId;
                    tokenData.playerId = userId;
                    if (!entityId) return [3 /*break*/, 32];
                    tokenData.entity = entity;
                    tokenData.entityId = entityId;
                    return [3 /*break*/, 34];
                case 32:
                    (0, assert_1.assert)(createData);
                    _s = (_r = Object).assign;
                    _t = [tokenData];
                    _15 = {};
                    _u = entity;
                    _16 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 33:
                    _s.apply(_r, _t.concat([(_15[_u] = (_16.id = _23.sent(),
                            _16.action = 'create',
                            _16.data = Object.assign(createData, {
                                userId: userId,
                            }),
                            _16),
                            _15)]));
                    _23.label = 34;
                case 34:
                    _w = (_v = context).operate;
                    _x = ['token'];
                    _17 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 35: return [4 /*yield*/, _w.apply(_v, _x.concat([(_17.id = _23.sent(),
                            _17.action = 'create',
                            _17.data = tokenData,
                            _17), { dontCollect: true }]))];
                case 36:
                    _23.sent();
                    return [2 /*return*/, tokenData.id];
                case 37:
                    _18 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 38:
                    userData = (_18.id = _23.sent(),
                        _18.userState = 'normal',
                        _18);
                    _z = (_y = context).operate;
                    _0 = ['user'];
                    _19 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 39: return [4 /*yield*/, _z.apply(_y, _0.concat([(_19.id = _23.sent(),
                            _19.action = 'create',
                            _19.data = userData,
                            _19), {}]))];
                case 40:
                    _23.sent();
                    (0, assert_1.assert)(entityId || createData.id, 'entityId和createData必须存在一项');
                    tokenData.userId = userData.id;
                    tokenData.playerId = userData.id;
                    tokenData.entity = entity;
                    tokenData.entityId = entityId || createData.id;
                    _2 = (_1 = context).operate;
                    _3 = ['token'];
                    _20 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 41: return [4 /*yield*/, _2.apply(_1, _3.concat([(_20.id = _23.sent(),
                            _20.action = 'create',
                            _20.data = tokenData,
                            _20), { dontCollect: true }]))];
                case 42:
                    _23.sent();
                    return [4 /*yield*/, context.setTokenValue(tokenData.id)];
                case 43:
                    _23.sent();
                    if (!createData) return [3 /*break*/, 46];
                    _5 = (_4 = context).operate;
                    _6 = [entity];
                    _21 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 44: return [4 /*yield*/, _5.apply(_4, _6.concat([(_21.id = _23.sent(),
                            _21.action = 'create',
                            _21.data = Object.assign(createData, {
                                userId: userData.id,
                            }),
                            _21), { dontCollect: true }]))];
                case 45:
                    _23.sent();
                    return [3 /*break*/, 49];
                case 46:
                    (0, assert_1.assert)(entityId);
                    _8 = (_7 = context).operate;
                    _9 = [entity];
                    _22 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 47: return [4 /*yield*/, _8.apply(_7, _9.concat([(_22.id = _23.sent(),
                            _22.action = 'update',
                            _22.data = {
                                userId: userData.id,
                            },
                            _22.filter = {
                                id: entityId,
                            },
                            _22), { dontCollect: true }]))];
                case 48:
                    _23.sent();
                    _23.label = 49;
                case 49: return [2 /*return*/, tokenData.id];
                case 50: return [2 /*return*/];
            }
        });
    });
}
function setupMobile(mobile, env, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var result2, _a, mobileRow, user, _b, userState, ref, _c, _d;
        var _e;
        return tslib_1.__generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, context.select('mobile', {
                        data: {
                            id: 1,
                            mobile: 1,
                            userId: 1,
                            ableState: 1,
                            user: {
                                id: 1,
                                userState: 1,
                                refId: 1,
                                ref: {
                                    id: 1,
                                    userState: 1,
                                    refId: 1,
                                },
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
                    result2 = _f.sent();
                    if (!(result2.length > 0)) return [3 /*break*/, 5];
                    // 此手机号已经存在
                    (0, assert_1.assert)(result2.length === 1);
                    _a = tslib_1.__read(result2, 1), mobileRow = _a[0];
                    user = mobileRow.user;
                    _b = user, userState = _b.userState, ref = _b.ref;
                    if (!(userState === 'merged')) return [3 /*break*/, 3];
                    return [4 /*yield*/, setUpTokenAndUser(env, context, 'mobile', mobileRow.id, undefined, ref)];
                case 2: return [2 /*return*/, _f.sent()];
                case 3: return [4 /*yield*/, setUpTokenAndUser(env, context, 'mobile', mobileRow.id, undefined, user)];
                case 4: return [2 /*return*/, _f.sent()];
                case 5:
                    _c = setUpTokenAndUser;
                    _d = [env, context, 'mobile', undefined];
                    _e = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 6: return [4 /*yield*/, _c.apply(void 0, _d.concat([(_e.id = _f.sent(),
                            _e.mobile = mobile,
                            _e)]))];
                case 7: 
                //此手机号不存在
                return [2 /*return*/, _f.sent()];
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
                    if (type === 'web') {
                        return [2 /*return*/];
                    }
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
        var application, _a, type, config, systemId, appId, appSecret, config2, config2, config2, wechatInstance, _b, isSnapshotUser, openId, unionId, wechatUserData, OriginMap, _c, wechatUser, tokenId_1, wechatUserUpdateData, _d, _e, _f, _g, wechatUser3, wechatUserCreateData_1, tokenId_2, _h, _j, _k, wechatUserCreateData, tokenId;
        var _l, _m, _o, _p;
        return tslib_1.__generator(this, function (_q) {
            switch (_q.label) {
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
                    _b = _q.sent(), isSnapshotUser = _b.isSnapshotUser, openId = _b.openId, unionId = _b.unionId, wechatUserData = tslib_1.__rest(_b, ["isSnapshotUser", "openId", "unionId"]);
                    if (isSnapshotUser) {
                        throw new types_1.OakUserException('请使用完整服务后再进行登录操作');
                    }
                    OriginMap = {
                        'web': 'web',
                        'wechatPublic': 'public',
                        'wechatMp': 'mp',
                    };
                    return [4 /*yield*/, context.select('wechatUser', {
                            data: {
                                id: 1,
                                userId: 1,
                                unionId: 1,
                                user: {
                                    id: 1,
                                    name: 1,
                                    nickname: 1,
                                    userState: 1,
                                    refId: 1,
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
                                origin: OriginMap[type],
                            }
                        }, {
                            dontCollect: true,
                        })];
                case 2:
                    _c = tslib_1.__read.apply(void 0, [_q.sent(), 1]), wechatUser = _c[0];
                    if (!wechatUser) return [3 /*break*/, 6];
                    return [4 /*yield*/, setUpTokenAndUser(env, context, 'wechatUser', wechatUser.id, undefined, wechatUser.user)];
                case 3:
                    tokenId_1 = _q.sent();
                    wechatUserUpdateData = wechatUserData;
                    if (unionId !== wechatUser.unionId) {
                        Object.assign(wechatUserUpdateData, {
                            unionId: unionId,
                        });
                    }
                    _e = (_d = context).operate;
                    _f = ['wechatUser'];
                    _l = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 4: return [4 /*yield*/, _e.apply(_d, _f.concat([(_l.id = _q.sent(),
                            _l.action = 'update',
                            _l.data = wechatUserUpdateData,
                            _l.filter = {
                                id: wechatUser.id,
                            },
                            _l), { dontCollect: true }]))];
                case 5:
                    _q.sent();
                    return [2 /*return*/, tokenId_1];
                case 6:
                    if (!unionId) return [3 /*break*/, 13];
                    return [4 /*yield*/, context.select('wechatUser', {
                            data: {
                                id: 1,
                                userId: 1,
                                unionId: 1,
                                user: {
                                    id: 1,
                                    userState: 1,
                                    refId: 1,
                                },
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
                case 7:
                    _g = tslib_1.__read.apply(void 0, [_q.sent(), 1]), wechatUser3 = _g[0];
                    if (!wechatUser3) return [3 /*break*/, 13];
                    _m = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 8:
                    wechatUserCreateData_1 = tslib_1.__assign.apply(void 0, [(_m.id = _q.sent(), _m.unionId = unionId, _m.origin = OriginMap[type], _m.openId = openId, _m.applicationId = application.id, _m), wechatUserData]);
                    return [4 /*yield*/, setUpTokenAndUser(env, context, 'wechatUser', undefined, wechatUserCreateData_1, wechatUser3.user)];
                case 9:
                    tokenId_2 = _q.sent();
                    if (!!wechatUser3.userId) return [3 /*break*/, 12];
                    _j = (_h = context).operate;
                    _k = ['wechatUser'];
                    _o = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 10: 
                // 这里顺便帮其它wechatUser数据也补上相应的userId
                return [4 /*yield*/, _j.apply(_h, _k.concat([(_o.id = _q.sent(),
                            _o.action = 'update',
                            _o.data = {
                                userId: wechatUserCreateData_1.userId, // 在setUpTokenAndUser内赋上值
                            },
                            _o.filter = {
                                id: wechatUser3.id,
                            },
                            _o), { dontCollect: true }]))];
                case 11:
                    // 这里顺便帮其它wechatUser数据也补上相应的userId
                    _q.sent();
                    _q.label = 12;
                case 12: return [2 /*return*/, tokenId_2];
                case 13:
                    _p = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 14:
                    wechatUserCreateData = tslib_1.__assign.apply(void 0, [(_p.id = _q.sent(), _p.unionId = unionId, _p.origin = OriginMap[type], _p.openId = openId, _p.applicationId = application.id, _p), wechatUserData]);
                    return [4 /*yield*/, setUpTokenAndUser(env, context, 'wechatUser', undefined, wechatUserCreateData, undefined)];
                case 15:
                    tokenId = _q.sent();
                    return [2 /*return*/, tokenId];
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
    var code = _a.code, env = _a.env, wechatLoginId = _a.wechatLoginId;
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
        var userId, application, config, _e, _f, sessionKey, user, _g, type, config2, _h, appId, appSecret, wechatInstance, result;
        return tslib_1.__generator(this, function (_j) {
            switch (_j.label) {
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
                    _e = tslib_1.__read.apply(void 0, [_j.sent(), 1]), _f = _e[0], sessionKey = _f.sessionKey, user = _f.user;
                    _g = application, type = _g.type, config2 = _g.config;
                    (0, assert_1.assert)(type === 'wechatMp' || config2.type === 'wechatMp');
                    _h = config2, appId = _h.appId, appSecret = _h.appSecret;
                    wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, 'wechatMp', appSecret);
                    result = wechatInstance.decryptData(sessionKey, encryptedData, iv, signature);
                    // 实测发现解密出来的和userInfo完全一致……
                    console.log(result);
                    return [4 /*yield*/, setUserInfoFromWechat(user, { nickname: nickname, avatar: avatarUrl }, context)];
                case 2:
                    _j.sent();
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
function logout(_a, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var tokenId, _b, _c, _d;
        var _e;
        return tslib_1.__generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    tokenId = context.getTokenValue();
                    if (!tokenId) return [3 /*break*/, 3];
                    _c = (_b = context).operate;
                    _d = ['token'];
                    _e = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 1: return [4 /*yield*/, _c.apply(_b, _d.concat([(_e.id = _f.sent(),
                            _e.action = 'disable',
                            _e.data = {},
                            _e.filter = {
                                id: tokenId,
                            },
                            _e), { dontCollect: true }]))];
                case 2:
                    _f.sent();
                    _f.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.logout = logout;
