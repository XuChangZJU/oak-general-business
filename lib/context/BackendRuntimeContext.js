"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendRuntimeContext = void 0;
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
var Exception_1 = require("../types/Exception");
var Exception_2 = require("oak-domain/lib/types/Exception");
var constants_1 = require("../constants");
var AsyncRowStore_1 = require("oak-domain/lib/store/AsyncRowStore");
var uuid_1 = require("oak-domain/lib/utils/uuid");
/**
 * general数据结构要求的后台上下文
 */
var BackendRuntimeContext = /** @class */ (function (_super) {
    tslib_1.__extends(BackendRuntimeContext, _super);
    function BackendRuntimeContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BackendRuntimeContext.prototype.setTokenValue = function (tokenValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, token, user, player, userRole$user, userRole$player;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.select('token', {
                            data: {
                                id: 1,
                                userId: 1,
                                playerId: 1,
                                player: {
                                    id: 1,
                                    userState: 1,
                                    userRole$user: {
                                        $entity: 'userRole',
                                        data: {
                                            id: 1,
                                            userId: 1,
                                            roleId: 1,
                                            role: {
                                                id: 1,
                                                name: 1,
                                            }
                                        },
                                    },
                                },
                                ableState: 1,
                                user: {
                                    id: 1,
                                    userState: 1,
                                    userRole$user: {
                                        $entity: 'userRole',
                                        data: {
                                            id: 1,
                                            userId: 1,
                                            roleId: 1,
                                            role: {
                                                id: 1,
                                                name: 1,
                                            }
                                        },
                                    },
                                },
                            },
                            filter: {
                                id: tokenValue,
                            },
                        }, {
                            dontCollect: true,
                            blockTrigger: true,
                        })];
                    case 1:
                        result = _a.sent();
                        if (result.length === 0) {
                            console.log("\u6784\u5EFABackendRuntimeContext\u5BF9\u5E94tokenValue\u300C".concat(tokenValue, "\u627E\u4E0D\u5230\u76F8\u5173\u7684user"));
                            // throw new OakTokenExpiredException();
                            this.tokenException = new Exception_1.OakTokenExpiredException();
                            return [2 /*return*/];
                        }
                        token = result[0];
                        if (token.ableState === 'disabled') {
                            console.log("\u6784\u5EFABackendRuntimeContext\u5BF9\u5E94tokenValue\u300C".concat(tokenValue, "\u5DF2\u7ECF\u88ABdisable"));
                            this.tokenException = new Exception_1.OakTokenExpiredException();
                            return [2 /*return*/];
                        }
                        user = token.user, player = token.player;
                        userRole$user = user.userRole$user;
                        this.amIRoot = userRole$user.length > 0 && userRole$user.find(function (ele) { return ele.role.name === 'root'; });
                        userRole$player = player.userRole$user;
                        this.amIReallyRoot = userRole$player.length > 0 && userRole$player.find(function (ele) { return ele.role.name === 'root'; });
                        this.token = token;
                        return [2 /*return*/];
                }
            });
        });
    };
    BackendRuntimeContext.prototype.setApplication = function (appId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.select('application', {
                            data: {
                                id: 1,
                                name: 1,
                                config: 1,
                                type: 1,
                                systemId: 1,
                                style: 1,
                                system: {
                                    id: 1,
                                    name: 1,
                                    config: 1,
                                    platformId: 1,
                                    style: 1,
                                    folder: 1,
                                    super: 1,
                                    platform: {
                                        id: 1,
                                        config: 1,
                                        style: 1,
                                    },
                                },
                            },
                            filter: {
                                id: appId,
                            },
                        }, {
                            dontCollect: true,
                            blockTrigger: true,
                        })];
                    case 1:
                        result = _a.sent();
                        (0, assert_1.default)(result.length > 0, "\u6784\u5EFABackendRuntimeContext\u5BF9\u5E94appId\u300C".concat(appId, "\u300D\u627E\u4E0D\u5230application"));
                        this.application = result[0];
                        return [2 /*return*/];
                }
            });
        });
    };
    BackendRuntimeContext.prototype.initialize = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var appId, tokenValue, promises, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.begin()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 8]);
                        appId = data.a, tokenValue = data.t;
                        promises = [];
                        if (appId) {
                            promises.push(this.setApplication(appId));
                        }
                        if (tokenValue) {
                            promises.push(this.setTokenValue(tokenValue));
                        }
                        if (!(promises.length > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all(promises)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.commit()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        err_1 = _a.sent();
                        return [4 /*yield*/, this.rollback()];
                    case 7:
                        _a.sent();
                        throw err_1;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        // 否则是后台模式，默认用root
                        this.rootMode = true;
                        _a.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    BackendRuntimeContext.prototype.getApplicationId = function () {
        var _a;
        return (_a = this.application) === null || _a === void 0 ? void 0 : _a.id;
    };
    BackendRuntimeContext.prototype.getSystemId = function () {
        var _a;
        return (_a = this.application) === null || _a === void 0 ? void 0 : _a.systemId;
    };
    BackendRuntimeContext.prototype.getApplication = function () {
        return this.application;
    };
    BackendRuntimeContext.prototype.getTokenValue = function (allowUnloggedIn) {
        var _a;
        if (this.rootMode) {
            return constants_1.ROOT_TOKEN_ID;
        }
        if (this.tokenException) {
            throw this.tokenException;
        }
        if (!this.token && !allowUnloggedIn) {
            throw new Exception_2.OakUnloggedInException();
        }
        return (_a = this.token) === null || _a === void 0 ? void 0 : _a.id;
    };
    BackendRuntimeContext.prototype.getToken = function (allowUnloggedIn) {
        if (this.tokenException) {
            throw this.tokenException;
        }
        if (!this.token && !allowUnloggedIn) {
            throw new Exception_2.OakUnloggedInException();
        }
        if (this.token) {
            var userState = this.token.user.userState;
            if (['disabled', 'merged'].includes(userState) && !this.isReallyRoot()) {
                throw new Exception_1.OakUserDisabledException();
            }
        }
        return this.token;
    };
    BackendRuntimeContext.prototype.getCurrentUserId = function (allowUnloggedIn) {
        if (this.rootMode) {
            return constants_1.ROOT_USER_ID;
        }
        var token = this.getToken(allowUnloggedIn);
        return token === null || token === void 0 ? void 0 : token.userId;
    };
    BackendRuntimeContext.prototype.toString = function () {
        var _a, _b;
        if (this.rootMode) {
            return JSON.stringify({ rootMode: true });
        }
        return JSON.stringify({ a: (_a = this.application) === null || _a === void 0 ? void 0 : _a.id, t: (_b = this.token) === null || _b === void 0 ? void 0 : _b.id });
    };
    BackendRuntimeContext.prototype.isRoot = function () {
        if (this.rootMode) {
            return true;
        }
        return !!this.amIRoot;
    };
    BackendRuntimeContext.prototype.isReallyRoot = function () {
        return !!this.amIReallyRoot;
    };
    BackendRuntimeContext.prototype.sendMessage = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.operate;
                        _b = ['message'];
                        _c = {};
                        return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                    case 1: return [2 /*return*/, _a.apply(this, _b.concat([(_c.id = _d.sent(),
                                _c.action = 'create',
                                _c.data = data,
                                _c), {
                                dontCollect: true,
                            }]))];
                }
            });
        });
    };
    BackendRuntimeContext.prototype.allowUserUpdate = function () {
        var _a;
        if (this.isReallyRoot()) {
            return true;
        }
        var userInfo = (_a = this.token) === null || _a === void 0 ? void 0 : _a.user;
        if (userInfo) {
            var userState = userInfo.userState;
            if (userState === 'disabled') {
                throw new Exception_1.OakUserDisabledException('您的帐号已经被禁用，请联系客服');
            }
            else if (['shadow', 'merged'].includes(userState)) {
                throw new Exception_1.OakTokenExpiredException('您的登录状态有异常，请重新登录 ');
            }
            else {
                (0, assert_1.default)(userState === 'normal');
            }
            return true;
        }
        throw new Exception_2.OakUnloggedInException('您尚未登录');
    };
    return BackendRuntimeContext;
}(AsyncRowStore_1.AsyncContext));
exports.BackendRuntimeContext = BackendRuntimeContext;
