"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
var tslib_1 = require("tslib");
var oak_frontend_base_1 = require("oak-frontend-base");
var Exception_1 = require("oak-domain/lib/types/Exception");
var Projection_1 = require("../types/Projection");
var Exception_2 = require("../types/Exception");
var constants_1 = require("../config/constants");
var Token = /** @class */ (function (_super) {
    tslib_1.__extends(Token, _super);
    function Token(cache, storage, environment) {
        var _this = _super.call(this) || this;
        _this.isLoading = false;
        _this.cache = cache;
        _this.storage = storage;
        _this.environment = environment;
        var tokenValue = storage.load(constants_1.LOCAL_STORAGE_KEYS.token);
        if (!tokenValue) {
            // 历史数据，原来用的key太随意
            tokenValue = storage.load('token:token');
            if (tokenValue) {
                storage.save(constants_1.LOCAL_STORAGE_KEYS.token, tokenValue);
                storage.remove('token:token');
            }
        }
        if (tokenValue) {
            _this.tokenValue = tokenValue;
            // this.loadTokenInfo();
        }
        return _this;
    }
    Token.prototype.loadTokenInfo = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.tokenValue && !this.isLoading)) return [3 /*break*/, 2];
                        this.isLoading = true;
                        return [4 /*yield*/, this.cache.refresh('token', {
                                data: Projection_1.tokenProjection,
                                filter: {
                                    id: this.tokenValue,
                                },
                            })];
                    case 1:
                        _a.sent();
                        this.publish();
                        this.isLoading = false;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Token.prototype.loginByMobile = function (mobile, password, captcha) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var env, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.environment.getEnv()];
                    case 1:
                        env = _a.sent();
                        return [4 /*yield*/, this.cache.exec('loginByMobile', {
                                password: password,
                                mobile: mobile,
                                captcha: captcha,
                                env: env,
                            })];
                    case 2:
                        result = (_a.sent()).result;
                        this.tokenValue = result;
                        this.storage.save(constants_1.LOCAL_STORAGE_KEYS.token, result);
                        this.publish();
                        return [2 /*return*/];
                }
            });
        });
    };
    Token.prototype.loginByWechatInWebEnv = function (wechatLoginId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var env, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.environment.getEnv()];
                    case 1:
                        env = _a.sent();
                        return [4 /*yield*/, this.cache.exec('loginByWechat', {
                                env: env,
                                wechatLoginId: wechatLoginId,
                            })];
                    case 2:
                        result = (_a.sent()).result;
                        this.tokenValue = result;
                        this.storage.save(constants_1.LOCAL_STORAGE_KEYS.token, result);
                        this.publish();
                        return [2 /*return*/];
                }
            });
        });
    };
    Token.prototype.loginWechat = function (code, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var env, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.environment.getEnv()];
                    case 1:
                        env = _a.sent();
                        return [4 /*yield*/, this.cache.exec('loginWechat', {
                                code: code,
                                env: env,
                                wechatLoginId: params === null || params === void 0 ? void 0 : params.wechatLoginId,
                            })];
                    case 2:
                        result = (_a.sent()).result;
                        this.tokenValue = result;
                        this.storage.save(constants_1.LOCAL_STORAGE_KEYS.token, result);
                        this.publish();
                        return [2 /*return*/];
                }
            });
        });
    };
    Token.prototype.loginWechatMp = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var code, env, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, wx.login()];
                    case 1:
                        code = (_a.sent()).code;
                        return [4 /*yield*/, this.environment.getEnv()];
                    case 2:
                        env = _a.sent();
                        return [4 /*yield*/, this.cache.exec('loginWechatMp', {
                                code: code,
                                env: env,
                            })];
                    case 3:
                        result = (_a.sent()).result;
                        this.tokenValue = result;
                        this.storage.save(constants_1.LOCAL_STORAGE_KEYS.token, result);
                        this.publish();
                        return [2 /*return*/];
                }
            });
        });
    };
    Token.prototype.syncUserInfoWechatMp = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var info, _a, nickname, avatarUrl, encryptedData, signature, iv;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, wx.getUserProfile({
                            desc: '同步微信昵称和头像信息',
                        })];
                    case 1:
                        info = _b.sent();
                        _a = info.userInfo, nickname = _a.nickName, avatarUrl = _a.avatarUrl, encryptedData = info.encryptedData, signature = info.signature, iv = info.iv;
                        return [4 /*yield*/, this.cache.exec('syncUserInfoWechatMp', {
                                nickname: nickname,
                                avatarUrl: avatarUrl,
                                encryptedData: encryptedData,
                                signature: signature,
                                iv: iv,
                            })];
                    case 2:
                        _b.sent();
                        this.publish();
                        return [2 /*return*/];
                }
            });
        });
    };
    Token.prototype.logout = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // await this.cache.exec('logout', {});
                this.removeToken();
                return [2 /*return*/];
            });
        });
    };
    Token.prototype.removeToken = function () {
        this.tokenValue = undefined;
        this.storage.remove(constants_1.LOCAL_STORAGE_KEYS.token);
        this.publish();
    };
    Token.prototype.getTokenValue = function () {
        return this.tokenValue;
    };
    Token.prototype.getToken = function (allowUnloggedIn) {
        if (this.tokenValue) {
            var token = this.cache.get('token', {
                data: Projection_1.tokenProjection,
                filter: {
                    id: this.tokenValue,
                },
            })[0];
            if (!token) {
                this.loadTokenInfo();
                if (allowUnloggedIn) {
                    return undefined;
                }
                throw new Exception_2.OakUserInfoLoadingException();
            }
            return token;
        }
        if (allowUnloggedIn) {
            return undefined;
        }
        throw new Exception_1.OakUnloggedInException();
    };
    Token.prototype.getUserId = function (allowUnloggedIn) {
        var token = this.getToken(allowUnloggedIn);
        if (token === null || token === void 0 ? void 0 : token.userId) {
            return token.userId;
        }
    };
    // getUserInfo 不要求登录
    Token.prototype.getUserInfo = function () {
        var token = this.getToken(true);
        if (token === null || token === void 0 ? void 0 : token.user) {
            return token.user;
        }
    };
    Token.prototype.isRoot = function () {
        var _a;
        var token = this.getToken(true);
        return !!((_a = token === null || token === void 0 ? void 0 : token.user) === null || _a === void 0 ? void 0 : _a.isRoot);
    };
    /**
     * 这个是指token的player到底是不是root
     * @returns
     */
    Token.prototype.isReallyRoot = function () {
        var _a;
        var token = this.getToken(true);
        return !!((_a = token === null || token === void 0 ? void 0 : token.player) === null || _a === void 0 ? void 0 : _a.isRoot);
    };
    Token.prototype.sendCaptcha = function (mobile, type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var env, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.environment.getEnv()];
                    case 1:
                        env = _a.sent();
                        return [4 /*yield*/, this.cache.exec('sendCaptcha', {
                                mobile: mobile,
                                env: env,
                                type: type,
                            })];
                    case 2:
                        result = (_a.sent()).result;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Token.prototype.switchTo = function (userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var currentUserId;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isReallyRoot()) {
                            throw new Exception_1.OakUserUnpermittedException();
                        }
                        currentUserId = this.getUserId();
                        if (currentUserId === userId) {
                            throw new Exception_1.OakRowInconsistencyException(undefined, '您已经是当前用户');
                        }
                        return [4 /*yield*/, this.cache.exec('switchTo', {
                                userId: userId,
                            })];
                    case 1:
                        _a.sent();
                        this.publish();
                        return [2 /*return*/];
                }
            });
        });
    };
    Token.prototype.refreshWechatPublicUserInfo = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cache.exec('refreshWechatPublicUserInfo', {})];
                    case 1:
                        _a.sent();
                        this.publish();
                        return [2 /*return*/];
                }
            });
        });
    };
    Token.prototype.getWechatMpUserPhoneNumber = function (code) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var env;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.environment.getEnv()];
                    case 1:
                        env = _a.sent();
                        return [4 /*yield*/, this.cache.exec('getWechatMpUserPhoneNumber', {
                                code: code,
                                env: env,
                            })];
                    case 2:
                        _a.sent();
                        this.publish();
                        return [2 /*return*/];
                }
            });
        });
    };
    Token.prototype.wakeupParasite = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var env, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.environment.getEnv()];
                    case 1:
                        env = _a.sent();
                        return [4 /*yield*/, this.cache.exec('wakeupParasite', {
                                id: id,
                                env: env,
                            })];
                    case 2:
                        result = (_a.sent()).result;
                        this.tokenValue = result;
                        this.storage.save(constants_1.LOCAL_STORAGE_KEYS.token, result);
                        this.publish();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Token;
}(oak_frontend_base_1.Feature));
exports.Token = Token;
