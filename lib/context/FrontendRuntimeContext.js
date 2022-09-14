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
        return this.application.getApplicationId();
    };
    FrontendRuntimeContext.prototype.getSystemId = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var app;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.application.getApplication()];
                    case 1:
                        app = _a.sent();
                        return [2 /*return*/, app.systemId];
                }
            });
        });
    };
    FrontendRuntimeContext.prototype.getApplication = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.application.getApplication()];
            });
        });
    };
    FrontendRuntimeContext.prototype.getTokenValue = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.token.getTokenValue()];
            });
        });
    };
    FrontendRuntimeContext.prototype.getToken = function () {
        return this.token.getToken();
    };
    FrontendRuntimeContext.prototype.getCurrentUserId = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.token.getUserId()];
            });
        });
    };
    FrontendRuntimeContext.prototype.toString = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, tokenValue;
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {};
                        return [4 /*yield*/, this.application.getApplicationId(true)];
                    case 1:
                        data = (_a.a = _b.sent(),
                            _a);
                        return [4 /*yield*/, this.token.getTokenValue(true)];
                    case 2:
                        tokenValue = _b.sent();
                        if (tokenValue) {
                            Object.assign(data, {
                                t: tokenValue,
                            });
                        }
                        return [2 /*return*/, JSON.stringify(data)];
                }
            });
        });
    };
    FrontendRuntimeContext.prototype.isRoot = function () {
        return this.token.isRoot();
    };
    return FrontendRuntimeContext;
}(UniversalContext_1.UniversalContext));
exports.FrontendRuntimeContext = FrontendRuntimeContext;
;
