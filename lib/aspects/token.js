"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCaptcha = exports.syncUserInfoWechatMp = exports.loginWechatMp = exports.loginWechat = exports.loginByMobile = void 0;
var oak_external_sdk_1 = require("oak-external-sdk");
var assert_1 = require("oak-domain/lib/utils/assert");
var lodash_1 = require("oak-domain/lib/utils/lodash");
var types_1 = require("oak-domain/lib/types");
var extraFile_1 = require("../utils/extraFile");
var Exceptions_1 = require("../types/Exceptions");
var password_1 = require("../utils/password");
function makeDistinguishException(userId, context) {
    return __awaiter(this, void 0, void 0, function () {
        var rowStore, _a, user, password, passwordOrigin, idState, wechatUser$user, email$user;
        return __generator(this, function (_b) {
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
                    _a = __read.apply(void 0, [(_b.sent()).result, 1]), user = _a[0];
                    (0, assert_1.assert)(user);
                    password = user.password, passwordOrigin = user.passwordOrigin, idState = user.idState, wechatUser$user = user.wechatUser$user, email$user = user.email$user;
                    return [2 /*return*/, new Exceptions_1.OakDistinguishUserException(userId, !!(password || passwordOrigin), idState === 'verified', wechatUser$user.length > 0, email$user.length > 0)];
            }
        });
    });
}
function tryMakeChangeLoginWay(userId, context) {
    return __awaiter(this, void 0, void 0, function () {
        var rowStore, _a, user, _b, idState, wechatUser$user, email$user;
        return __generator(this, function (_c) {
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
                    _a = __read.apply(void 0, [(_c.sent()).result, 1]), user = _a[0];
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
    return __awaiter(this, void 0, void 0, function () {
        var rowStore, currentToken, applicationId, systemId, result2, _a, mobileRow, userId, tokenData, user, userState, mobileData, userData, tokenData;
        var _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    rowStore = context.rowStore;
                    return [4 /*yield*/, context.getToken()];
                case 1:
                    currentToken = _h.sent();
                    applicationId = context.getApplicationId();
                    return [4 /*yield*/, context.getSystemId()];
                case 2:
                    systemId = _h.sent();
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
                    result2 = (_h.sent()).result;
                    if (!(result2.length > 0)) return [3 /*break*/, 11];
                    // 此手机号已经存在
                    (0, assert_1.assert)(result2.length === 1);
                    _a = __read(result2, 1), mobileRow = _a[0];
                    if (!currentToken) return [3 /*break*/, 7];
                    if (!(currentToken.userId === mobileRow.userId)) return [3 /*break*/, 4];
                    return [2 /*return*/, currentToken.id];
                case 4:
                    userId = mobileRow.userId;
                    return [4 /*yield*/, makeDistinguishException(userId, context)];
                case 5: throw _h.sent();
                case 6: return [3 /*break*/, 10];
                case 7:
                    _b = {};
                    return [4 /*yield*/, generateNewId()];
                case 8:
                    tokenData = (_b.id = _h.sent(),
                        _b.applicationId = applicationId,
                        _b.playerId = mobileRow.userId,
                        _b.env = env,
                        _b);
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
                    return [4 /*yield*/, rowStore.operate('token', {
                            data: tokenData,
                            action: 'create',
                        }, context)];
                case 9:
                    _h.sent();
                    return [2 /*return*/, tokenData.id];
                case 10: return [3 /*break*/, 20];
                case 11:
                    if (!currentToken) return [3 /*break*/, 14];
                    _c = {};
                    return [4 /*yield*/, generateNewId()];
                case 12:
                    mobileData = (_c.id = _h.sent(),
                        _c.mobile = mobile,
                        _c.userId = currentToken.userId,
                        _c);
                    return [4 /*yield*/, rowStore.operate('mobile', {
                            action: 'create',
                            data: mobileData
                        }, context)];
                case 13:
                    _h.sent();
                    return [2 /*return*/, currentToken.id];
                case 14:
                    _d = {};
                    return [4 /*yield*/, generateNewId()];
                case 15:
                    userData = (_d.id = _h.sent(),
                        _d.userState = 'normal',
                        _d.systemId = systemId,
                        _d);
                    return [4 /*yield*/, rowStore.operate('user', {
                            action: 'create',
                            data: userData,
                        }, context)];
                case 16:
                    _h.sent();
                    _e = {};
                    return [4 /*yield*/, generateNewId()];
                case 17:
                    _e.id = _h.sent(),
                        _e.userId = userData.id,
                        _e.playerId = userData.id,
                        _e.env = env;
                    _f = {
                        action: 'create'
                    };
                    _g = {};
                    return [4 /*yield*/, generateNewId()];
                case 18:
                    tokenData = (_e.mobile = (_f.data = (_g.id = _h.sent(),
                        _g.mobile = mobile,
                        _g.userId = userData.id,
                        _g),
                        _f),
                        _e);
                    return [4 /*yield*/, rowStore.operate('token', {
                            action: 'create',
                            data: tokenData,
                        }, context)];
                case 19:
                    _h.sent();
                    return [2 /*return*/, tokenData.id];
                case 20: return [2 /*return*/];
            }
        });
    });
}
function loginByMobile(params, context) {
    return __awaiter(this, void 0, void 0, function () {
        var mobile, captcha, password, env, rowStore, systemId, result, _a, captchaRow, result, _b, _c, mobileRow, _d, ableState, userId, exception;
        return __generator(this, function (_e) {
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
                    _a = __read(result, 1), captchaRow = _a[0];
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
                    _c = __read(result, 1), mobileRow = _c[0];
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
    return __awaiter(this, void 0, void 0, function () {
        var rowStore, application, _b, type, config, systemId, config2, appId, appSecret, wechatInstance, _c, sessionKey, openId, unionId, _d, wechatUser, id, wechatUser2, wechatUserUpdateData, _e, token, _f, _g, _h, _j, wechatUser3, wechatUser2, wechatUserCreateData_1, userData, wechatUserCreateData;
        var _k, _l, _m, _o, _p, _q;
        return __generator(this, function (_r) {
            switch (_r.label) {
                case 0:
                    rowStore = context.rowStore;
                    return [4 /*yield*/, context.getApplication()];
                case 1:
                    application = _r.sent();
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
                    _c = _r.sent(), sessionKey = _c.sessionKey, openId = _c.openId, unionId = _c.unionId;
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
                    _d = __read.apply(void 0, [(_r.sent()).result, 1]), wechatUser = _d[0];
                    return [4 /*yield*/, generateNewId()];
                case 4:
                    id = _r.sent();
                    if (!wechatUser) return [3 /*break*/, 13];
                    wechatUser2 = wechatUser;
                    wechatUserUpdateData = {
                        sessionKey: sessionKey,
                    };
                    if (unionId !== wechatUser.unionId) {
                        Object.assign(wechatUserUpdateData, {
                            unionId: unionId,
                        });
                    }
                    if (!wechatUser2.userId) return [3 /*break*/, 9];
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
                    _e = __read.apply(void 0, [(_r.sent()).result, 1]), token = _e[0];
                    if (!(token && (0, lodash_1.isEqual)(token.env, env))) return [3 /*break*/, 7];
                    return [4 /*yield*/, rowStore.operate('token', {
                            action: 'update',
                            data: {
                                wechatUser: {
                                    action: 'update',
                                    data: wechatUserUpdateData,
                                }
                            },
                            filter: {
                                id: token.id,
                            },
                        }, context)];
                case 6:
                    _r.sent();
                    return [2 /*return*/, token.id];
                case 7: return [4 /*yield*/, rowStore.operate('token', {
                        action: 'disable',
                        data: {},
                        filter: {
                            applicationId: application.id,
                            ableState: 'enabled',
                            userId: wechatUser2.userId,
                            playerId: wechatUser2.userId,
                        },
                    }, context)];
                case 8:
                    _r.sent();
                    return [3 /*break*/, 11];
                case 9:
                    // 创建user
                    _g = (_f = Object).assign;
                    _h = [wechatUserUpdateData];
                    _k = {};
                    _l = {
                        action: 'create'
                    };
                    _m = {};
                    return [4 /*yield*/, generateNewId()];
                case 10:
                    // 创建user
                    _g.apply(_f, _h.concat([(_k.user = (_l.data = (_m.id = _r.sent(),
                            _m.userState = 'normal',
                            _m),
                            _l),
                            _k)]));
                    _r.label = 11;
                case 11: return [4 /*yield*/, rowStore.operate('token', {
                        action: 'create',
                        data: {
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
                        }
                    }, context)];
                case 12:
                    _r.sent();
                    return [2 /*return*/, id];
                case 13:
                    if (!unionId) return [3 /*break*/, 18];
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
                case 14:
                    _j = __read.apply(void 0, [(_r.sent()).result, 1]), wechatUser3 = _j[0];
                    wechatUser2 = wechatUser3;
                    if (!(wechatUser2 && wechatUser2.userId)) return [3 /*break*/, 18];
                    return [4 /*yield*/, rowStore.operate('token', {
                            action: 'disable',
                            data: {},
                            filter: {
                                applicationId: application.id,
                                ableState: 'enabled',
                                userId: wechatUser2.userId,
                                playerId: wechatUser2.userId,
                            },
                        }, context)];
                case 15:
                    _r.sent();
                    _o = {};
                    return [4 /*yield*/, generateNewId()];
                case 16:
                    wechatUserCreateData_1 = (_o.id = _r.sent(),
                        _o.sessionKey = sessionKey,
                        _o.unionId = unionId,
                        _o.origin = 'mp',
                        _o.openId = openId,
                        _o.applicationId = application.id,
                        _o.userId = wechatUser2.userId,
                        _o);
                    return [4 /*yield*/, rowStore.operate('token', {
                            action: 'create',
                            data: {
                                id: id,
                                userId: wechatUser2.userId,
                                playerId: wechatUser2.userId,
                                applicationId: application.id,
                                wechatUser: {
                                    action: 'create',
                                    data: wechatUserCreateData_1,
                                },
                                env: env,
                            }
                        }, context)];
                case 17:
                    _r.sent();
                    return [2 /*return*/, id];
                case 18:
                    _p = {};
                    return [4 /*yield*/, generateNewId()];
                case 19:
                    userData = (_p.id = _r.sent(),
                        _p.userState = 'normal',
                        _p.systemId = systemId,
                        _p);
                    _q = {};
                    return [4 /*yield*/, generateNewId()];
                case 20:
                    wechatUserCreateData = (_q.id = _r.sent(),
                        _q.sessionKey = sessionKey,
                        _q.unionId = unionId,
                        _q.origin = type === 'wechatPublic' ? 'public' : 'web',
                        _q.openId = openId,
                        _q.applicationId = application.id,
                        _q.user = {
                            action: 'create',
                            data: userData,
                        },
                        _q);
                    return [4 /*yield*/, rowStore.operate('token', {
                            action: 'create',
                            data: {
                                id: id,
                                userId: userData.id,
                                playerId: userData.id,
                                applicationId: application.id,
                                wechatUser: {
                                    action: 'create',
                                    data: wechatUserCreateData,
                                },
                                env: env,
                            }
                        }, context)];
                case 21:
                    _r.sent();
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
    return __awaiter(this, void 0, void 0, function () {
        var rowStore, application, _b, type, config, systemId, config2, appId, appSecret, wechatInstance, _c, sessionKey, openId, unionId, _d, wechatUser, id, wechatUser2, wechatUserUpdateData, _e, token, _f, _g, _h, _j, wechatUser3, wechatUser2, wechatUserCreateData_2, userData, wechatUserCreateData;
        var _k, _l, _m, _o, _p, _q;
        return __generator(this, function (_r) {
            switch (_r.label) {
                case 0:
                    rowStore = context.rowStore;
                    return [4 /*yield*/, context.getApplication()];
                case 1:
                    application = _r.sent();
                    _b = application, type = _b.type, config = _b.config, systemId = _b.systemId;
                    (0, assert_1.assert)(type === 'wechatMp' || config.type === 'wechatMp');
                    config2 = config;
                    appId = config2.appId, appSecret = config2.appSecret;
                    wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, appSecret, 'wechatMp');
                    return [4 /*yield*/, wechatInstance.code2Session(code)];
                case 2:
                    _c = _r.sent(), sessionKey = _c.sessionKey, openId = _c.openId, unionId = _c.unionId;
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
                    _d = __read.apply(void 0, [(_r.sent()).result, 1]), wechatUser = _d[0];
                    return [4 /*yield*/, generateNewId()];
                case 4:
                    id = _r.sent();
                    if (!wechatUser) return [3 /*break*/, 13];
                    wechatUser2 = wechatUser;
                    wechatUserUpdateData = {
                        sessionKey: sessionKey,
                    };
                    if (unionId !== wechatUser.unionId) {
                        Object.assign(wechatUserUpdateData, {
                            unionId: unionId,
                        });
                    }
                    if (!wechatUser2.userId) return [3 /*break*/, 9];
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
                    _e = __read.apply(void 0, [(_r.sent()).result, 1]), token = _e[0];
                    if (!(token && (0, lodash_1.isEqual)(token.env, env))) return [3 /*break*/, 7];
                    return [4 /*yield*/, rowStore.operate('token', {
                            action: 'update',
                            data: {
                                wechatUser: {
                                    action: 'update',
                                    data: wechatUserUpdateData,
                                }
                            },
                            filter: {
                                id: token.id,
                            },
                        }, context)];
                case 6:
                    _r.sent();
                    return [2 /*return*/, token.id];
                case 7: return [4 /*yield*/, rowStore.operate('token', {
                        action: 'disable',
                        data: {},
                        filter: {
                            applicationId: application.id,
                            ableState: 'enabled',
                            userId: wechatUser2.userId,
                            playerId: wechatUser2.userId,
                        },
                    }, context)];
                case 8:
                    _r.sent();
                    return [3 /*break*/, 11];
                case 9:
                    // 创建user
                    _g = (_f = Object).assign;
                    _h = [wechatUserUpdateData];
                    _k = {};
                    _l = {
                        action: 'create'
                    };
                    _m = {};
                    return [4 /*yield*/, generateNewId()];
                case 10:
                    // 创建user
                    _g.apply(_f, _h.concat([(_k.user = (_l.data = (_m.id = _r.sent(),
                            _m.userState = 'normal',
                            _m),
                            _l),
                            _k)]));
                    _r.label = 11;
                case 11: return [4 /*yield*/, rowStore.operate('token', {
                        action: 'create',
                        data: {
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
                        }
                    }, context)];
                case 12:
                    _r.sent();
                    return [2 /*return*/, id];
                case 13:
                    if (!unionId) return [3 /*break*/, 18];
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
                case 14:
                    _j = __read.apply(void 0, [(_r.sent()).result, 1]), wechatUser3 = _j[0];
                    wechatUser2 = wechatUser3;
                    if (!(wechatUser2 && wechatUser2.userId)) return [3 /*break*/, 18];
                    return [4 /*yield*/, rowStore.operate('token', {
                            action: 'disable',
                            data: {},
                            filter: {
                                applicationId: application.id,
                                ableState: 'enabled',
                                userId: wechatUser2.userId,
                                playerId: wechatUser2.userId,
                            },
                        }, context)];
                case 15:
                    _r.sent();
                    _o = {};
                    return [4 /*yield*/, generateNewId()];
                case 16:
                    wechatUserCreateData_2 = (_o.id = _r.sent(),
                        _o.sessionKey = sessionKey,
                        _o.unionId = unionId,
                        _o.origin = 'mp',
                        _o.openId = openId,
                        _o.applicationId = application.id,
                        _o.userId = wechatUser2.userId,
                        _o);
                    return [4 /*yield*/, rowStore.operate('token', {
                            action: 'create',
                            data: {
                                id: id,
                                userId: wechatUser2.userId,
                                playerId: wechatUser2.userId,
                                applicationId: application.id,
                                wechatUser: {
                                    action: 'create',
                                    data: wechatUserCreateData_2,
                                },
                                env: env,
                            }
                        }, context)];
                case 17:
                    _r.sent();
                    return [2 /*return*/, id];
                case 18:
                    _p = {};
                    return [4 /*yield*/, generateNewId()];
                case 19:
                    userData = (_p.id = _r.sent(),
                        _p.userState = 'normal',
                        _p.systemId = systemId,
                        _p);
                    _q = {};
                    return [4 /*yield*/, generateNewId()];
                case 20:
                    wechatUserCreateData = (_q.id = _r.sent(),
                        _q.sessionKey = sessionKey,
                        _q.unionId = unionId,
                        _q.origin = 'mp',
                        _q.openId = openId,
                        _q.applicationId = application.id,
                        _q.user = {
                            action: 'create',
                            data: userData,
                        },
                        _q);
                    return [4 /*yield*/, rowStore.operate('token', {
                            action: 'create',
                            data: {
                                id: id,
                                userId: userData.id,
                                playerId: userData.id,
                                applicationId: application.id,
                                wechatUser: {
                                    action: 'create',
                                    data: wechatUserCreateData,
                                },
                                env: env,
                            }
                        }, context)];
                case 21:
                    _r.sent();
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
    return __awaiter(this, void 0, void 0, function () {
        var rowStore, userId, application, _b, _c, sessionKey, user, _d, originNickname, extraFile$entity, updateData, extraFileOperations, _e, _f;
        var _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    rowStore = context.rowStore;
                    return [4 /*yield*/, context.getToken()];
                case 1:
                    userId = (_j.sent()).userId;
                    return [4 /*yield*/, context.getApplication()];
                case 2:
                    application = _j.sent();
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
                    _b = __read.apply(void 0, [(_j.sent()).result, 1]), _c = _b[0], sessionKey = _c.sessionKey, user = _c.user;
                    _d = user, originNickname = _d.nickname, extraFile$entity = _d.extraFile$entity;
                    updateData = {};
                    if (nickname !== originNickname) {
                        Object.assign(updateData, {
                            nickname: nickname,
                        });
                    }
                    if (!((extraFile$entity === null || extraFile$entity === void 0 ? void 0 : extraFile$entity.length) === 0 || (0, extraFile_1.composeFileUrl)(extraFile$entity[0]) !== avatarUrl)) return [3 /*break*/, 5];
                    _g = {
                        action: 'create'
                    };
                    _f = (_e = Object).assign;
                    _h = {};
                    return [4 /*yield*/, generateNewId()];
                case 4:
                    extraFileOperations = [
                        (_g.data = _f.apply(_e, [(_h.id = _j.sent(),
                                _h.tag1 = 'avatar',
                                _h.entity = 'user',
                                _h.entityId = userId,
                                _h), (0, extraFile_1.decomposeFileUrl)(avatarUrl)]),
                            _g)
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
                    _j.label = 5;
                case 5:
                    if (!(Object.keys(updateData).length > 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, rowStore.operate('user', {
                            action: 'update',
                            data: updateData,
                            filter: {
                                id: userId,
                            }
                        }, context)];
                case 6:
                    _j.sent();
                    _j.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.syncUserInfoWechatMp = syncUserInfoWechatMp;
function sendCaptcha(_a, context) {
    var mobile = _a.mobile, env = _a.env;
    return __awaiter(this, void 0, void 0, function () {
        var type, visitorId, rowStore, now, _b, count1, count2, _c, captcha, code, code, id;
        return __generator(this, function (_d) {
            switch (_d.label) {
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
                    _b = __read.apply(void 0, [_d.sent(), 2]), count1 = _b[0], count2 = _b[1];
                    if (count1 > 5 || count2 > 5) {
                        throw new types_1.OakUserException('您已发送很多次短信，请休息会再发吧');
                    }
                    _d.label = 2;
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
                    _c = __read.apply(void 0, [(_d.sent()).result, 1]), captcha = _c[0];
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
                    return [3 /*break*/, 7];
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
                    id = _d.sent();
                    console.log('captcha created', id);
                    return [4 /*yield*/, rowStore.operate('captcha', {
                            action: 'create',
                            data: {
                                id: id,
                                mobile: mobile,
                                code: code,
                                visitorId: visitorId,
                                env: env,
                                expired: false,
                                expiresAt: now + 660 * 1000,
                            }
                        }, context)];
                case 6:
                    _d.sent();
                    if (process.env.NODE_ENV === 'development') {
                        return [2 /*return*/, "\u9A8C\u8BC1\u7801[".concat(code, "]\u5DF2\u521B\u5EFA")];
                    }
                    else {
                        return [2 /*return*/, '验证码已创建'];
                    }
                    _d.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.sendCaptcha = sendCaptcha;
