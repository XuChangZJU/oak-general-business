"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.Token = void 0;
var Feature_1 = require("oak-frontend-base/lib/types/Feature");
var concurrent_1 = require("oak-domain/lib/utils/concurrent");
var env_1 = require("../utils/env");
var constants_1 = require("../constants");
var Token = /** @class */ (function (_super) {
    __extends(Token, _super);
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
        }
        return _this;
    }
    Token.prototype.loginByMobile = function (mobile, password, captcha) {
        return __awaiter(this, void 0, void 0, function () {
            var env, result, err_1;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var env, result, err_2;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var code, env, result, err_3;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var info, _a, nickname, avatarUrl, encryptedData, signature, iv;
            return __generator(this, function (_b) {
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.token = undefined;
                this.context.setToken(undefined);
                this.storage.remove('token:token');
                return [2 /*return*/];
            });
        });
    };
    Token.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var token, result;
            return __generator(this, function (_b) {
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
                                },
                                filter: {
                                    id: token,
                                },
                            })];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, (_a = result[0]) === null || _a === void 0 ? void 0 : _a.userId];
                }
            });
        });
    };
    Token.prototype.isRoot = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var token, _d, tokenValue;
            return __generator(this, function (_e) {
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
                        _d = __read.apply(void 0, [(_e.sent()), 1]), tokenValue = _d[0];
                        return [2 /*return*/, ((_a = tokenValue === null || tokenValue === void 0 ? void 0 : tokenValue.player) === null || _a === void 0 ? void 0 : _a.userRole$user).length > 0
                                ? ((_c = ((_b = tokenValue === null || tokenValue === void 0 ? void 0 : tokenValue.player) === null || _b === void 0 ? void 0 : _b.userRole$user)[0]) === null || _c === void 0 ? void 0 : _c.roleId) ===
                                    constants_1.ROOT_ROLE_ID
                                : false];
                }
            });
        });
    };
    Token.prototype.sendCaptcha = function (mobile) {
        return __awaiter(this, void 0, void 0, function () {
            var env, result;
            return __generator(this, function (_a) {
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
    __decorate([
        Feature_1.Action
    ], Token.prototype, "loginByMobile", null);
    __decorate([
        Feature_1.Action
    ], Token.prototype, "loginWechat", null);
    __decorate([
        Feature_1.Action
    ], Token.prototype, "loginWechatMp", null);
    __decorate([
        Feature_1.Action
    ], Token.prototype, "syncUserInfoWechatMp", null);
    __decorate([
        Feature_1.Action
    ], Token.prototype, "logout", null);
    __decorate([
        Feature_1.Action
    ], Token.prototype, "sendCaptcha", null);
    return Token;
}(Feature_1.Feature));
exports.Token = Token;
