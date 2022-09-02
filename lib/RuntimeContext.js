"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralRuntimeContext = void 0;
var tslib_1 = require("tslib");
var UniversalContext_1 = require("oak-domain/lib/store/UniversalContext");
var concurrent_1 = require("oak-domain/lib/utils/concurrent");
var assert_1 = require("oak-domain/lib/utils/assert");
var GeneralRuntimeContext = /** @class */ (function (_super) {
    tslib_1.__extends(GeneralRuntimeContext, _super);
    function GeneralRuntimeContext(store, applicationId) {
        var _this = _super.call(this, store) || this;
        _this.rwLockApplication = new concurrent_1.RWLock();
        _this.applicationId = applicationId;
        if (!applicationId) {
            _this.rwLockApplication.acquire('X');
        }
        return _this;
    }
    GeneralRuntimeContext.prototype.getApplicationId = function () {
        return this.applicationId;
    };
    GeneralRuntimeContext.prototype.getSystemId = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var app;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getApplication()];
                    case 1:
                        app = _a.sent();
                        return [2 /*return*/, app === null || app === void 0 ? void 0 : app.systemId];
                }
            });
        });
    };
    GeneralRuntimeContext.prototype.setToken = function (token) {
        this.token = token;
    };
    GeneralRuntimeContext.prototype.getApplication = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, _a, application;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.rwLockApplication.acquire('X')];
                    case 1:
                        _b.sent();
                        if (!this.application) return [3 /*break*/, 2];
                        result = this.application;
                        return [3 /*break*/, 4];
                    case 2:
                        if (!this.applicationId) return [3 /*break*/, 4];
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
                                    id: this.applicationId,
                                },
                            }, this, {})];
                    case 3:
                        _a = tslib_1.__read.apply(void 0, [(_b.sent()).result, 1]), application = _a[0];
                        result = application;
                        this.application = application;
                        _b.label = 4;
                    case 4:
                        this.rwLockApplication.release();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    GeneralRuntimeContext.prototype.setApplication = function (app) {
        (0, assert_1.assert)(!this.application);
        this.application = app;
        this.applicationId = app.id;
        this.rwLockApplication.release();
    };
    GeneralRuntimeContext.prototype.getToken = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tokenValue, _a, token;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        tokenValue = this.token;
                        if (!tokenValue) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.rowStore.select('token', {
                                data: {
                                    id: 1,
                                    userId: 1,
                                    playerId: 1,
                                },
                                filter: {
                                    id: tokenValue,
                                    ableState: 'enabled',
                                }
                            }, this, {})];
                    case 1:
                        _a = tslib_1.__read.apply(void 0, [(_b.sent()).result, 1]), token = _a[0];
                        return [2 /*return*/, token];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    GeneralRuntimeContext.prototype.getTokenValue = function () {
        return this.token;
    };
    GeneralRuntimeContext.prototype.getCurrentUserId = function () {
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
    GeneralRuntimeContext.prototype.toString = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, scene;
            return tslib_1.__generator(this, function (_a) {
                data = {
                    applicationId: this.getApplicationId(),
                };
                if (this.token) {
                    Object.assign(data, {
                        token: this.token,
                    });
                }
                scene = this.getScene();
                if (scene) {
                    Object.assign(data, {
                        scene: scene,
                    });
                }
                return [2 /*return*/, JSON.stringify(data)];
            });
        });
    };
    GeneralRuntimeContext.fromString = function (strCxt) {
        var _a = JSON.parse(strCxt), applicationId = _a.applicationId, scene = _a.scene, token = _a.token;
        return {
            applicationId: applicationId,
            scene: scene,
            token: token,
        };
    };
    return GeneralRuntimeContext;
}(UniversalContext_1.UniversalContext));
exports.GeneralRuntimeContext = GeneralRuntimeContext;
;
