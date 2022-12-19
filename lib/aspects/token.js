"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCaptcha = exports.syncUserInfoWechatMp = exports.loginWechatMp = exports.loginWechat = exports.loginByMobile = void 0;
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var oak_external_sdk_1 = require("oak-external-sdk");
var assert_1 = require("oak-domain/lib/utils/assert");
var lodash_1 = require("oak-domain/lib/utils/lodash");
var types_1 = require("oak-domain/lib/types");
var extraFile_1 = require("../utils/extraFile");
var Exception_1 = require("../types/Exception");
var password_1 = require("../utils/password");
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
        var currentToken, applicationId, systemId, result2, _b, mobileRow, userId, tokenData, user, userState, mobileData, userData, tokenData;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
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
                    result2 = _c.sent();
                    if (!(result2.length > 0)) return [3 /*break*/, 10];
                    // 此手机号已经存在
                    (0, assert_1.assert)(result2.length === 1);
                    _b = tslib_1.__read(result2, 1), mobileRow = _b[0];
                    if (!currentToken) return [3 /*break*/, 5];
                    if (!(currentToken.userId === mobileRow.userId)) return [3 /*break*/, 2];
                    return [2 /*return*/, currentToken.id];
                case 2:
                    userId = mobileRow.userId;
                    return [4 /*yield*/, makeDistinguishException(userId, context)];
                case 3: throw _c.sent();
                case 4: return [3 /*break*/, 9];
                case 5:
                    tokenData = {
                        id: (0, uuid_1.generateNewId)(),
                        applicationId: applicationId,
                        playerId: mobileRow.userId,
                        env: env,
                        entity: 'mobile',
                        entityId: mobileRow.id,
                    };
                    user = mobileRow.user;
                    userState = user.userState;
                    switch (userState) {
                        case 'disabled': {
                            throw new Exception_1.OakUserDisabledException();
                        }
                        case 'shadow': {
                            Object.assign(tokenData, {
                                userId: mobileRow.userId,
                                user: {
                                    id: (0, uuid_1.generateNewId)(),
                                    action: 'activate',
                                    data: {},
                                }
                            });
                            break;
                        }
                        default: {
                            (0, assert_1.assert)(userState === 'normal');
                            Object.assign(tokenData, {
                                userId: mobileRow.userId,
                            });
                        }
                    }
                    return [4 /*yield*/, context.operate('token', {
                            id: (0, uuid_1.generateNewId)(),
                            data: tokenData,
                            action: 'create',
                        }, {
                            dontCollect: true,
                        })];
                case 6:
                    _c.sent();
                    if (!(((_a = user === null || user === void 0 ? void 0 : user.userSystem$user) === null || _a === void 0 ? void 0 : _a.length) == 0)) return [3 /*break*/, 8];
                    return [4 /*yield*/, context.operate('userSystem', {
                            id: (0, uuid_1.generateNewId)(),
                            action: 'create',
                            data: {
                                id: (0, uuid_1.generateNewId)(),
                                userId: user.id,
                                systemId: systemId,
                            }
                        }, {
                            dontCollect: true,
                        })];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8: return [2 /*return*/, tokenData.id];
                case 9: return [3 /*break*/, 15];
                case 10:
                    if (!currentToken) return [3 /*break*/, 12];
                    mobileData = {
                        id: (0, uuid_1.generateNewId)(),
                        mobile: mobile,
                        userId: currentToken.userId,
                    };
                    return [4 /*yield*/, context.operate('mobile', {
                            id: (0, uuid_1.generateNewId)(),
                            action: 'create',
                            data: mobileData
                        }, {})];
                case 11:
                    _c.sent();
                    return [2 /*return*/, currentToken.id];
                case 12:
                    userData = {
                        id: (0, uuid_1.generateNewId)(),
                        userState: 'normal',
                    };
                    return [4 /*yield*/, context.operate('user', {
                            id: (0, uuid_1.generateNewId)(),
                            action: 'create',
                            data: userData,
                        }, {})];
                case 13:
                    _c.sent();
                    tokenData = {
                        id: (0, uuid_1.generateNewId)(),
                        userId: userData.id,
                        playerId: userData.id,
                        env: env,
                        mobile: {
                            id: (0, uuid_1.generateNewId)(),
                            action: 'create',
                            data: {
                                id: (0, uuid_1.generateNewId)(),
                                mobile: mobile,
                                userId: userData.id,
                            }
                        }
                    };
                    return [4 /*yield*/, context.operate('token', {
                            id: (0, uuid_1.generateNewId)(),
                            action: 'create',
                            data: tokenData,
                        }, {})];
                case 14:
                    _c.sent();
                    return [2 /*return*/, tokenData.id];
                case 15: return [2 /*return*/];
            }
        });
    });
}
function loadTokenInfo(tokenId, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.select('token', {
                        data: {
                            id: 1,
                            userId: 1,
                            ableState: 1,
                            user: {
                                id: 1,
                                nickname: 1,
                                name: 1,
                                userState: 1,
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
                                        type: 1,
                                        entity: 1,
                                        entityId: 1,
                                        extension: 1,
                                    },
                                    filter: {
                                        tag1: 'avatar',
                                    },
                                    indexFrom: 0,
                                    count: 1,
                                },
                                mobile$user: {
                                    $entity: 'mobile',
                                    data: {
                                        id: 1,
                                        mobile: 1,
                                        userId: 1,
                                    },
                                },
                                userRole$user: {
                                    $entity: 'userRole',
                                    data: {
                                        id: 1,
                                        userId: 1,
                                        roleId: 1,
                                    },
                                },
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
                        var application, _a, type, config, systemId, appId, appSecret, config2, config2, wechatInstance, _b, sessionKey, openId, unionId, _c, wechatUser, id, wechatUser2, wechatUserUpdateData, _d, token, _e, wechatUser3, wechatUser2, wechatUserCreateData_1, userData, wechatUserCreateData;
                        return tslib_1.__generator(this, function (_f) {
                            switch (_f.label) {
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
                                    _b = _f.sent(), sessionKey = _b.sessionKey, openId = _b.openId, unionId = _b.unionId;
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
                                    _c = tslib_1.__read.apply(void 0, [_f.sent(), 1]), wechatUser = _c[0];
                                    id = (0, uuid_1.generateNewId)();
                                    if (!wechatUser) return [3 /*break*/, 10];
                                    wechatUser2 = wechatUser;
                                    wechatUserUpdateData = {
                                        sessionKey: sessionKey,
                                    };
                                    if (unionId !== wechatUser.unionId) {
                                        Object.assign(wechatUserUpdateData, {
                                            unionId: unionId,
                                        });
                                    }
                                    if (!wechatUser2.userId) return [3 /*break*/, 7];
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
                                case 3:
                                    _d = tslib_1.__read.apply(void 0, [_f.sent(), 1]), token = _d[0];
                                    if (!(token && (0, lodash_1.isEqual)(token.env, env))) return [3 /*break*/, 5];
                                    return [4 /*yield*/, context.operate('token', {
                                            id: (0, uuid_1.generateNewId)(),
                                            action: 'update',
                                            data: {
                                                wechatUser: {
                                                    id: (0, uuid_1.generateNewId)(),
                                                    action: 'update',
                                                    data: wechatUserUpdateData,
                                                }
                                            },
                                            filter: {
                                                id: token.id,
                                            },
                                        }, {
                                            dontCollect: true,
                                        })];
                                case 4:
                                    _f.sent();
                                    return [2 /*return*/, token.id];
                                case 5: return [4 /*yield*/, context.operate('token', {
                                        id: (0, uuid_1.generateNewId)(),
                                        action: 'disable',
                                        data: {},
                                        filter: {
                                            applicationId: application.id,
                                            ableState: 'enabled',
                                            userId: wechatUser2.userId,
                                            playerId: wechatUser2.userId,
                                        },
                                    }, {
                                        dontCollect: true,
                                    })];
                                case 6:
                                    _f.sent();
                                    return [3 /*break*/, 8];
                                case 7:
                                    // 创建user
                                    Object.assign(wechatUserUpdateData, {
                                        user: {
                                            id: (0, uuid_1.generateNewId)(),
                                            action: 'create',
                                            data: {
                                                id: (0, uuid_1.generateNewId)(),
                                                userState: 'normal',
                                            },
                                        },
                                    });
                                    _f.label = 8;
                                case 8: return [4 /*yield*/, context.operate('token', {
                                        id: (0, uuid_1.generateNewId)(),
                                        action: 'create',
                                        data: {
                                            id: id,
                                            userId: wechatUser2.userId,
                                            playerId: wechatUser2.userId,
                                            applicationId: application.id,
                                            entity: 'wechatUser',
                                            entityId: wechatUser2.id,
                                            wechatUser: {
                                                id: (0, uuid_1.generateNewId)(),
                                                action: 'update',
                                                data: wechatUserUpdateData,
                                            },
                                            env: env
                                        }
                                    }, {})];
                                case 9:
                                    _f.sent();
                                    return [2 /*return*/, id];
                                case 10:
                                    if (!unionId) return [3 /*break*/, 14];
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
                                case 11:
                                    _e = tslib_1.__read.apply(void 0, [_f.sent(), 1]), wechatUser3 = _e[0];
                                    wechatUser2 = wechatUser3;
                                    if (!(wechatUser2 && wechatUser2.userId)) return [3 /*break*/, 14];
                                    return [4 /*yield*/, context.operate('token', {
                                            id: (0, uuid_1.generateNewId)(),
                                            action: 'disable',
                                            data: {},
                                            filter: {
                                                applicationId: application.id,
                                                ableState: 'enabled',
                                                userId: wechatUser2.userId,
                                                playerId: wechatUser2.userId,
                                            },
                                        }, {
                                            dontCollect: true,
                                        })];
                                case 12:
                                    _f.sent();
                                    wechatUserCreateData_1 = {
                                        id: (0, uuid_1.generateNewId)(),
                                        sessionKey: sessionKey,
                                        unionId: unionId,
                                        origin: 'mp',
                                        openId: openId,
                                        applicationId: application.id,
                                        userId: wechatUser2.userId,
                                    };
                                    return [4 /*yield*/, context.operate('token', {
                                            id: (0, uuid_1.generateNewId)(),
                                            action: 'create',
                                            data: {
                                                id: id,
                                                userId: wechatUser2.userId,
                                                playerId: wechatUser2.userId,
                                                applicationId: application.id,
                                                wechatUser: {
                                                    id: (0, uuid_1.generateNewId)(),
                                                    action: 'create',
                                                    data: wechatUserCreateData_1,
                                                },
                                                env: env,
                                            }
                                        }, {
                                            dontCollect: true,
                                        })];
                                case 13:
                                    _f.sent();
                                    return [2 /*return*/, id];
                                case 14:
                                    userData = {
                                        id: (0, uuid_1.generateNewId)(),
                                        userState: 'normal',
                                        userSystem$user: [
                                            {
                                                id: (0, uuid_1.generateNewId)(),
                                                action: 'create',
                                                data: {
                                                    id: (0, uuid_1.generateNewId)(),
                                                    systemId: systemId,
                                                },
                                            }
                                        ],
                                    };
                                    wechatUserCreateData = {
                                        id: (0, uuid_1.generateNewId)(),
                                        sessionKey: sessionKey,
                                        unionId: unionId,
                                        origin: type === 'wechatPublic' ? 'public' : 'web',
                                        openId: openId,
                                        applicationId: application.id,
                                        user: {
                                            id: (0, uuid_1.generateNewId)(),
                                            action: 'create',
                                            data: userData,
                                        }
                                    };
                                    return [4 /*yield*/, context.operate('token', {
                                            id: (0, uuid_1.generateNewId)(),
                                            action: 'create',
                                            data: {
                                                id: id,
                                                userId: userData.id,
                                                playerId: userData.id,
                                                applicationId: application.id,
                                                wechatUser: {
                                                    id: (0, uuid_1.generateNewId)(),
                                                    action: 'create',
                                                    data: wechatUserCreateData,
                                                },
                                                env: env,
                                            }
                                        }, {
                                            dontCollect: true,
                                        })];
                                case 15:
                                    _f.sent();
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
                        var application, _a, type, config, systemId, config2, appId, appSecret, wechatInstance, _b, sessionKey, openId, unionId, _c, wechatUser, id, wechatUser2, wechatUserUpdateData, _d, token, _e, wechatUser3, wechatUser2, wechatUserCreateData_2, userData, wechatUserCreateData;
                        return tslib_1.__generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    application = context.getApplication();
                                    _a = application, type = _a.type, config = _a.config, systemId = _a.systemId;
                                    (0, assert_1.assert)(type === 'wechatMp' || config.type === 'wechatMp');
                                    config2 = config;
                                    appId = config2.appId, appSecret = config2.appSecret;
                                    wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, appSecret, 'wechatMp');
                                    return [4 /*yield*/, wechatInstance.code2Session(code)];
                                case 1:
                                    _b = _f.sent(), sessionKey = _b.sessionKey, openId = _b.openId, unionId = _b.unionId;
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
                                    _c = tslib_1.__read.apply(void 0, [_f.sent(), 1]), wechatUser = _c[0];
                                    id = (0, uuid_1.generateNewId)();
                                    if (!wechatUser) return [3 /*break*/, 10];
                                    wechatUser2 = wechatUser;
                                    wechatUserUpdateData = {
                                        sessionKey: sessionKey,
                                    };
                                    if (unionId !== wechatUser.unionId) {
                                        Object.assign(wechatUserUpdateData, {
                                            unionId: unionId,
                                        });
                                    }
                                    if (!wechatUser2.userId) return [3 /*break*/, 7];
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
                                case 3:
                                    _d = tslib_1.__read.apply(void 0, [_f.sent(), 1]), token = _d[0];
                                    if (!(token && (0, lodash_1.isEqual)(token.env, env))) return [3 /*break*/, 5];
                                    return [4 /*yield*/, context.operate('token', {
                                            id: (0, uuid_1.generateNewId)(),
                                            action: 'update',
                                            data: {
                                                wechatUser: {
                                                    id: (0, uuid_1.generateNewId)(),
                                                    action: 'update',
                                                    data: wechatUserUpdateData,
                                                }
                                            },
                                            filter: {
                                                id: token.id,
                                            },
                                        }, {
                                            dontCollect: true,
                                        })];
                                case 4:
                                    _f.sent();
                                    return [2 /*return*/, token.id];
                                case 5: return [4 /*yield*/, context.operate('token', {
                                        id: (0, uuid_1.generateNewId)(),
                                        action: 'disable',
                                        data: {},
                                        filter: {
                                            applicationId: application.id,
                                            ableState: 'enabled',
                                            userId: wechatUser2.userId,
                                            playerId: wechatUser2.userId,
                                        },
                                    }, {
                                        dontCollect: true,
                                    })];
                                case 6:
                                    _f.sent();
                                    return [3 /*break*/, 8];
                                case 7:
                                    // 创建user
                                    Object.assign(wechatUserUpdateData, {
                                        user: {
                                            id: (0, uuid_1.generateNewId)(),
                                            action: 'create',
                                            data: {
                                                id: (0, uuid_1.generateNewId)(),
                                                userState: 'normal',
                                            },
                                        },
                                    });
                                    _f.label = 8;
                                case 8: return [4 /*yield*/, context.operate('token', {
                                        id: (0, uuid_1.generateNewId)(),
                                        action: 'create',
                                        data: {
                                            id: id,
                                            userId: wechatUser2.userId,
                                            playerId: wechatUser2.userId,
                                            applicationId: application.id,
                                            entity: 'wechatUser',
                                            entityId: wechatUser2.id,
                                            wechatUser: {
                                                id: (0, uuid_1.generateNewId)(),
                                                action: 'update',
                                                data: wechatUserUpdateData,
                                            },
                                            env: env
                                        }
                                    }, {
                                        dontCollect: true,
                                    })];
                                case 9:
                                    _f.sent();
                                    return [2 /*return*/, id];
                                case 10:
                                    if (!unionId) return [3 /*break*/, 14];
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
                                case 11:
                                    _e = tslib_1.__read.apply(void 0, [_f.sent(), 1]), wechatUser3 = _e[0];
                                    wechatUser2 = wechatUser3;
                                    if (!(wechatUser2 && wechatUser2.userId)) return [3 /*break*/, 14];
                                    return [4 /*yield*/, context.operate('token', {
                                            id: (0, uuid_1.generateNewId)(),
                                            action: 'disable',
                                            data: {},
                                            filter: {
                                                applicationId: application.id,
                                                ableState: 'enabled',
                                                userId: wechatUser2.userId,
                                                playerId: wechatUser2.userId,
                                            },
                                        }, {
                                            dontCollect: true,
                                        })];
                                case 12:
                                    _f.sent();
                                    wechatUserCreateData_2 = {
                                        id: (0, uuid_1.generateNewId)(),
                                        sessionKey: sessionKey,
                                        unionId: unionId,
                                        origin: 'mp',
                                        openId: openId,
                                        applicationId: application.id,
                                        userId: wechatUser2.userId,
                                    };
                                    return [4 /*yield*/, context.operate('token', {
                                            id: (0, uuid_1.generateNewId)(),
                                            action: 'create',
                                            data: {
                                                id: id,
                                                userId: wechatUser2.userId,
                                                playerId: wechatUser2.userId,
                                                applicationId: application.id,
                                                wechatUser: {
                                                    id: (0, uuid_1.generateNewId)(),
                                                    action: 'create',
                                                    data: wechatUserCreateData_2,
                                                },
                                                env: env,
                                            }
                                        }, {
                                            dontCollect: true,
                                        })];
                                case 13:
                                    _f.sent();
                                    return [2 /*return*/, id];
                                case 14:
                                    userData = {
                                        id: (0, uuid_1.generateNewId)(),
                                        userState: 'normal',
                                        userSystem$user: [
                                            {
                                                id: (0, uuid_1.generateNewId)(),
                                                action: 'create',
                                                data: {
                                                    id: (0, uuid_1.generateNewId)(),
                                                    systemId: systemId,
                                                },
                                            }
                                        ],
                                    };
                                    wechatUserCreateData = {
                                        id: (0, uuid_1.generateNewId)(),
                                        sessionKey: sessionKey,
                                        unionId: unionId,
                                        origin: 'mp',
                                        openId: openId,
                                        applicationId: application.id,
                                        user: {
                                            id: (0, uuid_1.generateNewId)(),
                                            action: 'create',
                                            data: userData,
                                        }
                                    };
                                    return [4 /*yield*/, context.operate('token', {
                                            id: (0, uuid_1.generateNewId)(),
                                            action: 'create',
                                            data: {
                                                id: id,
                                                userId: userData.id,
                                                playerId: userData.id,
                                                applicationId: application.id,
                                                wechatUser: {
                                                    id: (0, uuid_1.generateNewId)(),
                                                    action: 'create',
                                                    data: wechatUserCreateData,
                                                },
                                                env: env,
                                            }
                                        }, {
                                            dontCollect: true,
                                        })];
                                case 15:
                                    _f.sent();
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
        var userId, application, _b, _c, sessionKey, user, _d, originNickname, extraFile$entity, updateData, extraFileOperations;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, context.getToken()];
                case 1:
                    userId = (_e.sent()).userId;
                    return [4 /*yield*/, context.getApplication()];
                case 2:
                    application = _e.sent();
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
                case 3:
                    _b = tslib_1.__read.apply(void 0, [_e.sent(), 1]), _c = _b[0], sessionKey = _c.sessionKey, user = _c.user;
                    _d = user, originNickname = _d.nickname, extraFile$entity = _d.extraFile$entity;
                    updateData = {};
                    if (nickname !== originNickname) {
                        Object.assign(updateData, {
                            nickname: nickname,
                        });
                    }
                    if ((extraFile$entity === null || extraFile$entity === void 0 ? void 0 : extraFile$entity.length) === 0 || (0, extraFile_1.composeFileUrl)(extraFile$entity[0]) !== avatarUrl) {
                        extraFileOperations = [
                            {
                                id: (0, uuid_1.generateNewId)(),
                                action: 'create',
                                data: Object.assign({
                                    id: (0, uuid_1.generateNewId)(),
                                    tag1: 'avatar',
                                    entity: 'user',
                                    entityId: userId,
                                }, (0, extraFile_1.decomposeFileUrl)(avatarUrl))
                            }
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
                    }
                    if (!(Object.keys(updateData).length > 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, context.operate('user', {
                            id: (0, uuid_1.generateNewId)(),
                            action: 'update',
                            data: updateData,
                            filter: {
                                id: userId,
                            }
                        }, {
                            dontCollect: true,
                        })];
                case 4:
                    _e.sent();
                    _e.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.syncUserInfoWechatMp = syncUserInfoWechatMp;
function sendCaptcha(_a, context) {
    var mobile = _a.mobile, env = _a.env;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var type, visitorId, now, _b, count1, count2, _c, captcha, code, code, id;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    type = env.type;
                    (0, assert_1.assert)(type === 'web');
                    visitorId = env.visitorId;
                    now = Date.now();
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
                    _b = tslib_1.__read.apply(void 0, [_d.sent(), 2]), count1 = _b[0], count2 = _b[1];
                    if (count1 > 5 || count2 > 5) {
                        throw new types_1.OakUserException('您已发送很多次短信，请休息会再发吧');
                    }
                    _d.label = 2;
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
                    _c = tslib_1.__read.apply(void 0, [_d.sent(), 1]), captcha = _c[0];
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
                    return [3 /*break*/, 6];
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
                    id = (0, uuid_1.generateNewId)();
                    return [4 /*yield*/, context.operate('captcha', {
                            id: (0, uuid_1.generateNewId)(),
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
                        }, {
                            dontCollect: true,
                        })];
                case 5:
                    _d.sent();
                    if (process.env.NODE_ENV === 'development') {
                        return [2 /*return*/, "\u9A8C\u8BC1\u7801[".concat(code, "]\u5DF2\u521B\u5EFA")];
                    }
                    else {
                        return [2 /*return*/, '验证码已创建'];
                    }
                    _d.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.sendCaptcha = sendCaptcha;
