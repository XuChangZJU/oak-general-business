"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
var tslib_1 = require("tslib");
var Feature_1 = require("oak-frontend-base/lib/types/Feature");
var concurrent_1 = require("oak-domain/lib/utils/concurrent");
var env_1 = require("../utils/env");
var constants_1 = require("../constants");
var Token = /** @class */ (function (_super) {
    tslib_1.__extends(Token, _super);
    function Token(aspectWrapper, cache, storage, context) {
        var _this = _super.call(this, aspectWrapper) || this;
        _this.rwLock = new concurrent_1.RWLock();
        _this.cache = cache;
        _this.context = context;
        _this.storage = storage;
        var token = storage.load('token:token');
        if (token) {
            _this.token = token;
            _this.context.setToken(token);
            // _this.loadTokenInfo();
        }
        return _this;
    }
    Token.prototype.loadTokenInfo = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rwLock.acquire('X')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.cache.refresh('token', {
                                data: {
                                    id: 1,
                                    userId: 1,
                                    ableState: 1,
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
                                    id: this.token,
                                },
                            })];
                    case 2:
                        _a.sent();
                        this.rwLock.release();
                        return [2 /*return*/];
                }
            });
        });
    };
    Token.prototype.loginByMobile = function (mobile, password, captcha) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var env, result, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, env_1.getEnv)()];
                    case 1:
                        env = _a.sent();
                        return [4 /*yield*/, this.rwLock.acquire('X')];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.getAspectWrapper().exec('loginByMobile', { password: password, mobile: mobile, captcha: captcha, env: env })];
                    case 4:
                        result = (_a.sent()).result;
                        this.token = result;
                        this.rwLock.release();
                        this.storage.save('token:token', result);
                        this.context.setToken(result);
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        this.rwLock.release();
                        throw err_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Token.prototype.loginWechat = function (code) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var env, result, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rwLock.acquire('X')];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, (0, env_1.getEnv)()];
                    case 3:
                        env = _a.sent();
                        return [4 /*yield*/, this.getAspectWrapper().exec('loginWechat', {
                                code: code,
                                env: env,
                            })];
                    case 4:
                        result = (_a.sent()).result;
                        this.token = result;
                        this.rwLock.release();
                        this.storage.save('token:token', result);
                        this.context.setToken(result);
                        return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        this.rwLock.release();
                        throw err_2;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Token.prototype.loginWechatMp = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var code, env, result, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rwLock.acquire('X')];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        return [4 /*yield*/, wx.login()];
                    case 3:
                        code = (_a.sent()).code;
                        return [4 /*yield*/, (0, env_1.getEnv)()];
                    case 4:
                        env = _a.sent();
                        return [4 /*yield*/, this.getAspectWrapper().exec('loginWechatMp', {
                                code: code,
                                env: env,
                            })];
                    case 5:
                        result = (_a.sent()).result;
                        this.token = result;
                        this.rwLock.release();
                        this.storage.save('token:token', result);
                        this.context.setToken(result);
                        return [3 /*break*/, 7];
                    case 6:
                        err_3 = _a.sent();
                        this.rwLock.release();
                        throw err_3;
                    case 7: return [2 /*return*/];
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
                        return [4 /*yield*/, this.getAspectWrapper().exec('syncUserInfoWechatMp', {
                                nickname: nickname,
                                avatarUrl: avatarUrl,
                                encryptedData: encryptedData,
                                signature: signature,
                                iv: iv,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Token.prototype.logout = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.token = undefined;
                this.context.setToken(undefined);
                this.storage.remove('token:token');
                return [2 /*return*/];
            });
        });
    };
    Token.prototype.getToken = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var token;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rwLock.acquire('S')];
                    case 1:
                        _a.sent();
                        try {
                            token = this.token;
                            this.rwLock.release();
                            return [2 /*return*/, token];
                        }
                        catch (err) {
                            this.rwLock.release();
                            throw err;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Token.prototype.getUserId = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var token, result;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getToken()];
                    case 1:
                        token = _b.sent();
                        if (!token) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.cache.get('token', {
                                data: {
                                    id: 1,
                                    userId: 1,
                                    ableState: 1,
                                },
                                filter: {
                                    id: token,
                                },
                            })];
                    case 2:
                        result = _b.sent();
                        if (!(result.length === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.cache.refresh('token', {
                                data: {
                                    id: 1,
                                    userId: 1,
                                    ableState: 1,
                                },
                                filter: {
                                    id: token,
                                },
                            })];
                    case 3:
                        // user信息未取到
                        result = (_b.sent()).data;
                        _b.label = 4;
                    case 4: return [2 /*return*/, (_a = result[0]) === null || _a === void 0 ? void 0 : _a.userId];
                }
            });
        });
    };
    Token.prototype.isRoot = function () {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var token, _d, tokenValue;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.getToken()];
                    case 1:
                        token = _e.sent();
                        if (!token) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.cache.get('token', {
                                data: {
                                    id: 1,
                                    userId: 1,
                                    ableState: 1,
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
                                    id: token,
                                },
                            })];
                    case 2:
                        _d = tslib_1.__read.apply(void 0, [(_e.sent()), 1]), tokenValue = _d[0];
                        return [2 /*return*/, ((_a = tokenValue === null || tokenValue === void 0 ? void 0 : tokenValue.player) === null || _a === void 0 ? void 0 : _a.userRole$user).length > 0
                                ? ((_c = ((_b = tokenValue === null || tokenValue === void 0 ? void 0 : tokenValue.player) === null || _b === void 0 ? void 0 : _b.userRole$user)[0]) === null || _c === void 0 ? void 0 : _c.roleId) ===
                                    constants_1.ROOT_ROLE_ID
                                : false];
                }
            });
        });
    };
    Token.prototype.sendCaptcha = function (mobile) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var env, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, env_1.getEnv)()];
                    case 1:
                        env = _a.sent();
                        return [4 /*yield*/, this.getAspectWrapper().exec('sendCaptcha', {
                                mobile: mobile,
                                env: env,
                            })];
                    case 2:
                        result = (_a.sent()).result;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    tslib_1.__decorate([
        Feature_1.Action
    ], Token.prototype, "loginByMobile", null);
    tslib_1.__decorate([
        Feature_1.Action
    ], Token.prototype, "loginWechat", null);
    tslib_1.__decorate([
        Feature_1.Action
    ], Token.prototype, "loginWechatMp", null);
    tslib_1.__decorate([
        Feature_1.Action
    ], Token.prototype, "syncUserInfoWechatMp", null);
    tslib_1.__decorate([
        Feature_1.Action
    ], Token.prototype, "logout", null);
    tslib_1.__decorate([
        Feature_1.Action
    ], Token.prototype, "sendCaptcha", null);
    return Token;
}(Feature_1.Feature));
exports.Token = Token;
