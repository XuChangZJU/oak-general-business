"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontendRuntimeContext = void 0;
var tslib_1 = require("tslib");
var UniversalContext_1 = require("oak-domain/lib/store/UniversalContext");
var FrontendRuntimeContext = /** @class */ (function (_super) {
    tslib_1.__extends(FrontendRuntimeContext, _super);
    function FrontendRuntimeContext(store, application, token) {
        var _this = _super.call(this, store) || this;
        _this.application = application;
        _this.token = token;
        return _this;
    }
    FrontendRuntimeContext.prototype.getApplicationId = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                return [2 /*return*/, (_a = this.application) === null || _a === void 0 ? void 0 : _a.getApplicationId()];
            });
        });
    };
    FrontendRuntimeContext.prototype.getSystemId = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var app;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.application) === null || _a === void 0 ? void 0 : _a.getApplication())];
                    case 1:
                        app = _b.sent();
                        return [2 /*return*/, app === null || app === void 0 ? void 0 : app.systemId];
                }
            });
        });
    };
    FrontendRuntimeContext.prototype.getApplication = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                return [2 /*return*/, (_a = this.application) === null || _a === void 0 ? void 0 : _a.getApplication()];
            });
        });
    };
    FrontendRuntimeContext.prototype.getTokenValue = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                return [2 /*return*/, (_a = this.token) === null || _a === void 0 ? void 0 : _a.getTokenValue()];
            });
        });
    };
    FrontendRuntimeContext.prototype.getToken = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                return [2 /*return*/, (_a = this.token) === null || _a === void 0 ? void 0 : _a.getToken()];
            });
        });
    };
    FrontendRuntimeContext.prototype.getCurrentUserId = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                return [2 /*return*/, (_a = this.token) === null || _a === void 0 ? void 0 : _a.getUserId()];
            });
        });
    };
    FrontendRuntimeContext.prototype.toString = function () {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, a, t;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        data = {};
                        return [4 /*yield*/, ((_a = this.application) === null || _a === void 0 ? void 0 : _a.getApplicationId(true))];
                    case 1:
                        a = _c.sent();
                        return [4 /*yield*/, ((_b = this.token) === null || _b === void 0 ? void 0 : _b.getTokenValue(true))];
                    case 2:
                        t = _c.sent();
                        if (t) {
                            Object.assign(data, {
                                t: t,
                            });
                        }
                        if (a) {
                            Object.assign(data, {
                                a: a,
                            });
                        }
                        return [2 /*return*/, JSON.stringify(data)];
                }
            });
        });
    };
    FrontendRuntimeContext.prototype.isRoot = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                return [2 /*return*/, ((_a = this.token) === null || _a === void 0 ? void 0 : _a.isRoot()) || false];
            });
        });
    };
    return FrontendRuntimeContext;
}(UniversalContext_1.UniversalContext));
exports.FrontendRuntimeContext = FrontendRuntimeContext;
;
