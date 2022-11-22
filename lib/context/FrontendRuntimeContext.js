"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontendRuntimeContext = void 0;
var tslib_1 = require("tslib");
var SyncRowStore_1 = require("oak-domain/lib/store/SyncRowStore");
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
        return (_a = this.application) === null || _a === void 0 ? void 0 : _a.getApplicationId();
    };
    FrontendRuntimeContext.prototype.getSystemId = function () {
        var _a;
        var app = (_a = this.application) === null || _a === void 0 ? void 0 : _a.getApplication();
        return app === null || app === void 0 ? void 0 : app.systemId;
    };
    FrontendRuntimeContext.prototype.getApplication = function () {
        var _a;
        return (_a = this.application) === null || _a === void 0 ? void 0 : _a.getApplication();
    };
    FrontendRuntimeContext.prototype.getTokenValue = function () {
        var _a;
        return (_a = this.token) === null || _a === void 0 ? void 0 : _a.getTokenValue();
    };
    FrontendRuntimeContext.prototype.getToken = function (allowUnloggedIn) {
        var _a;
        return (_a = this.token) === null || _a === void 0 ? void 0 : _a.getToken(allowUnloggedIn);
    };
    FrontendRuntimeContext.prototype.getCurrentUserId = function (allowUnloggedIn) {
        var _a;
        return (_a = this.token) === null || _a === void 0 ? void 0 : _a.getUserId(allowUnloggedIn);
    };
    FrontendRuntimeContext.prototype.toString = function () {
        var _a, _b;
        var data = {};
        var a = (_a = this.application) === null || _a === void 0 ? void 0 : _a.getApplicationId();
        var t = (_b = this.token) === null || _b === void 0 ? void 0 : _b.getTokenValue();
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
        return JSON.stringify(data);
    };
    FrontendRuntimeContext.prototype.isRoot = function () {
        var _a;
        return ((_a = this.token) === null || _a === void 0 ? void 0 : _a.isRoot()) || false;
    };
    return FrontendRuntimeContext;
}(SyncRowStore_1.SyncContext));
exports.FrontendRuntimeContext = FrontendRuntimeContext;
;
