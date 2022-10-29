"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendRuntimeContext = void 0;
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
var Exceptions_1 = require("../types/Exceptions");
var Exception_1 = require("oak-domain/lib/types/Exception");
var constants_1 = require("../constants");
var UniversalContext_1 = require("oak-domain/lib/store/UniversalContext");
/**
 * general数据结构要求的后台上下文
 */
var BackendRuntimeContext = /** @class */ (function (_super) {
    tslib_1.__extends(BackendRuntimeContext, _super);
    function BackendRuntimeContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BackendRuntimeContext.prototype.initialize = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var appId, tokenValue, result, result, token, player, _a, userState, userRole$user;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!data) return [3 /*break*/, 5];
                        appId = data.a, tokenValue = data.t;
                        if (!appId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.rowStore.select('application', {
                                data: {
                                    id: 1,
                                    name: 1,
                                    config: 1,
                                    type: 1,
                                    systemId: 1,
                                    system: {
                                        id: 1,
                                        name: 1,
                                        config: 1,
                                    },
                                },
                                filter: {
                                    id: appId,
                                },
                            }, this, {})];
                    case 1:
                        result = (_b.sent()).result;
                        (0, assert_1.default)(result.length > 0, "\u6784\u5EFABackendRuntimeContext\u5BF9\u5E94appId\u300C".concat(appId, "\u300D\u627E\u4E0D\u5230application"));
                        this.application = result[0];
                        _b.label = 2;
                    case 2:
                        if (!tokenValue) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.rowStore.select('token', {
                                data: {
                                    id: 1,
                                    userId: 1,
                                    playerId: 1,
                                    ableState: 1,
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
                                },
                                filter: {
                                    id: tokenValue,
                                },
                            }, this, {})];
                    case 3:
                        result = (_b.sent()).result;
                        if (result.length === 0) {
                            console.log("\u6784\u5EFABackendRuntimeContext\u5BF9\u5E94tokenValue\u300C".concat(tokenValue, "\u627E\u4E0D\u5230\u76F8\u5173\u7684user"));
                            throw new Exceptions_1.OakTokenExpiredException();
                        }
                        token = result[0];
                        if (token.ableState === 'disabled') {
                            throw new Exceptions_1.OakTokenExpiredException();
                        }
                        player = token.player;
                        _a = player, userState = _a.userState, userRole$user = _a.userRole$user;
                        if (['disabled', 'merged'].includes(userState)) {
                            throw new Exceptions_1.OakUserDisabledException();
                        }
                        this.amIRoot = userRole$user.length > 0 && userRole$user.find(function (ele) { return ele.role.name === 'root'; });
                        this.token = token;
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        // 否则是后台模式，默认用root
                        this.rootMode = true;
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    BackendRuntimeContext.prototype.getApplicationId = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                return [2 /*return*/, (_a = this.application) === null || _a === void 0 ? void 0 : _a.id];
            });
        });
    };
    BackendRuntimeContext.prototype.getSystemId = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                return [2 /*return*/, (_a = this.application) === null || _a === void 0 ? void 0 : _a.systemId];
            });
        });
    };
    BackendRuntimeContext.prototype.getApplication = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.application];
            });
        });
    };
    BackendRuntimeContext.prototype.getTokenValue = function (allowUnloggedIn) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                if (this.rootMode) {
                    return [2 /*return*/, constants_1.ROOT_TOKEN_ID];
                }
                if (!this.token && !allowUnloggedIn) {
                    throw new Exception_1.OakUnloggedInException();
                }
                return [2 /*return*/, (_a = this.token) === null || _a === void 0 ? void 0 : _a.id];
            });
        });
    };
    BackendRuntimeContext.prototype.getToken = function (allowUnloggedIn) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (!this.token && !allowUnloggedIn) {
                    throw new Exception_1.OakUnloggedInException();
                }
                return [2 /*return*/, this.token];
            });
        });
    };
    BackendRuntimeContext.prototype.getCurrentUserId = function (allowUnloggedIn) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                if (this.rootMode) {
                    return [2 /*return*/, constants_1.ROOT_USER_ID];
                }
                if (!this.token && !allowUnloggedIn) {
                    throw new Exception_1.OakUnloggedInException();
                }
                return [2 /*return*/, (_a = this.token) === null || _a === void 0 ? void 0 : _a.userId];
            });
        });
    };
    BackendRuntimeContext.prototype.toString = function () {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_c) {
                if (this.rootMode) {
                    return [2 /*return*/, JSON.stringify({ rootMode: true })];
                }
                return [2 /*return*/, JSON.stringify({ a: (_a = this.application) === null || _a === void 0 ? void 0 : _a.id, t: (_b = this.token) === null || _b === void 0 ? void 0 : _b.id })];
            });
        });
    };
    BackendRuntimeContext.prototype.isRoot = function (allowUnloggedIn) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (this.rootMode) {
                    return [2 /*return*/, true];
                }
                if (!this.token && !allowUnloggedIn) {
                    throw new Exception_1.OakUnloggedInException();
                }
                return [2 /*return*/, !!this.amIRoot];
            });
        });
    };
    return BackendRuntimeContext;
}(UniversalContext_1.UniversalContext));
exports.BackendRuntimeContext = BackendRuntimeContext;
