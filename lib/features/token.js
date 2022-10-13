"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
var tslib_1 = require("tslib");
var Feature_1 = require("oak-frontend-base/lib/types/Feature");
var concurrent_1 = require("oak-domain/lib/utils/concurrent");
var env_1 = require("../utils/env");
var tokenProjection = {
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
                role: {
                    id: 1,
                    name: 1,
                },
            },
        },
    },
    playerId: 1,
};
var Token = /** @class */ (function (_super) {
    tslib_1.__extends(Token, _super);
    function Token(aspectWrapper, cache, storage) {
        var _this = _super.call(this, aspectWrapper) || this;
        _this.rwLock = new concurrent_1.RWLock();
        _this.cache = cache;
        _this.storage = storage;
        var tokenValue = storage.load('token:token');
        if (tokenValue) {
            _this.tokenValue = tokenValue;
        }
        return _this;
    }
    Token.prototype.loadTokenInfo = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rwLock.acquire('X')];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, , 5, 6]);
                        if (!!this.token) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getAspectWrapper().exec('select', {
                                entity: 'token',
                                selection: {
                                    data: tokenProjection,
                                    filter: {
                                        id: this.tokenValue,
                                    },
                                },
                            })];
                    case 3:
                        result = (_a.sent()).result;
                        data = result.data;
                        this.token = data[0];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        this.rwLock.release();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
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
                        _a.trys.push([3, 5, 6, 7]);
                        return [4 /*yield*/, this.getAspectWrapper().exec('loginByMobile', { password: password, mobile: mobile, captcha: captcha, env: env })];
                    case 4:
                        result = (_a.sent()).result;
                        this.tokenValue = result;
                        this.storage.save('token:token', result);
                        return [3 /*break*/, 7];
                    case 5:
                        err_1 = _a.sent();
                        throw err_1;
                    case 6:
                        this.rwLock.release();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
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
                        _a.trys.push([2, 5, 6, 7]);
                        return [4 /*yield*/, (0, env_1.getEnv)()];
                    case 3:
                        env = _a.sent();
                        return [4 /*yield*/, this.getAspectWrapper().exec('loginWechat', {
                                code: code,
                                env: env,
                            })];
                    case 4:
                        result = (_a.sent()).result;
                        this.tokenValue = result;
                        this.storage.save('token:token', result);
                        return [3 /*break*/, 7];
                    case 5:
                        err_2 = _a.sent();
                        throw err_2;
                    case 6:
                        this.rwLock.release();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
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
                        _a.trys.push([2, 6, 7, 8]);
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
                        this.tokenValue = result;
                        this.storage.save('token:token', result);
                        return [3 /*break*/, 8];
                    case 6:
                        err_3 = _a.sent();
                        throw err_3;
                    case 7:
                        this.rwLock.release();
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
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
                this.tokenValue = undefined;
                this.storage.remove('token:token');
                return [2 /*return*/];
            });
        });
    };
    Token.prototype.getTokenValue = function (noWait) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var token;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (noWait) {
                            return [2 /*return*/, this.tokenValue];
                        }
                        return [4 /*yield*/, this.rwLock.acquire('S')];
                    case 1:
                        _a.sent();
                        token = this.tokenValue;
                        this.rwLock.release();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    Token.prototype.getToken = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.token) {
                            return [2 /*return*/, this.token];
                        }
                        if (!this.tokenValue) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadTokenInfo()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.token];
                }
            });
        });
    };
    Token.prototype.getUserId = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var token;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getToken()];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, token === null || token === void 0 ? void 0 : token.userId];
                }
            });
        });
    };
    Token.prototype.getUserInfo = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userId, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserId()];
                    case 1:
                        userId = _a.sent();
                        if (!userId) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.cache.get('user', {
                                data: {
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
                                        },
                                    },
                                },
                                filter: {
                                    id: userId,
                                },
                            })];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data[0]];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Token.prototype.isRoot = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var token, player, userRole$user;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getToken()];
                    case 1:
                        token = _a.sent();
                        player = token.player;
                        userRole$user = player.userRole$user;
                        return [2 /*return*/, (userRole$user.length > 0 &&
                                userRole$user.find(function (ele) { return ele.role.name === 'root'; }))];
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
