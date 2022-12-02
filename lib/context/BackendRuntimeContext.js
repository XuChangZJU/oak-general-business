"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendRuntimeContext = void 0;
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
var Exception_1 = require("../types/Exception");
var Exception_2 = require("oak-domain/lib/types/Exception");
var constants_1 = require("../constants");
var AsyncRowStore_1 = require("oak-domain/lib/store/AsyncRowStore");
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
            var appId, tokenValue, result, result, token, user, _a, userState, userRole$user, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!data) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.begin()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 8, , 10]);
                        appId = data.a, tokenValue = data.t;
                        if (!appId) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.select('application', {
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
                    case 3:
                        result = _b.sent();
                        (0, assert_1.default)(result.length > 0, "\u6784\u5EFABackendRuntimeContext\u5BF9\u5E94appId\u300C".concat(appId, "\u300D\u627E\u4E0D\u5230application"));
                        this.application = result[0];
                        _b.label = 4;
                    case 4:
                        if (!tokenValue) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.select('token', {
                                data: {
                                    id: 1,
                                    userId: 1,
                                    playerId: 1,
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
                    case 5:
                        result = _b.sent();
                        if (result.length === 0) {
                            console.log("\u6784\u5EFABackendRuntimeContext\u5BF9\u5E94tokenValue\u300C".concat(tokenValue, "\u627E\u4E0D\u5230\u76F8\u5173\u7684user"));
                            throw new Exception_1.OakTokenExpiredException();
                        }
                        token = result[0];
                        if (token.ableState === 'disabled') {
                            throw new Exception_1.OakTokenExpiredException();
                        }
                        user = token.user;
                        _a = user, userState = _a.userState, userRole$user = _a.userRole$user;
                        /* if (['disabled', 'merged'].includes(userState as string)) {
                            throw new OakUserDisabledException();
                        } */
                        this.amIRoot = userRole$user.length > 0 && userRole$user.find(function (ele) { return ele.role.name === 'root'; });
                        this.token = token;
                        _b.label = 6;
                    case 6: return [4 /*yield*/, this.commit()];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 8:
                        err_1 = _b.sent();
                        return [4 /*yield*/, this.rollback()];
                    case 9:
                        _b.sent();
                        throw err_1;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        // 否则是后台模式，默认用root
                        this.rootMode = true;
                        _b.label = 12;
                    case 12: return [2 /*return*/];
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
        if (!this.token && !allowUnloggedIn) {
            throw new Exception_2.OakUnloggedInException();
        }
        return (_a = this.token) === null || _a === void 0 ? void 0 : _a.id;
    };
    BackendRuntimeContext.prototype.getToken = function (allowUnloggedIn) {
        if (!this.token && !allowUnloggedIn) {
            throw new Exception_2.OakUnloggedInException();
        }
        if (this.token) {
            var userState = this.token.user.userState;
            if (['disabled', 'merged'].includes(userState)) {
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
    return BackendRuntimeContext;
}(AsyncRowStore_1.AsyncContext));
exports.BackendRuntimeContext = BackendRuntimeContext;
