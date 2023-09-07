"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontendRuntimeContext = void 0;
var tslib_1 = require("tslib");
var assert_1 = require("oak-domain/lib/utils/assert");
var SyncRowStore_1 = require("oak-domain/lib/store/SyncRowStore");
var Exception_1 = require("../types/Exception");
var types_1 = require("oak-domain/lib/types");
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
    FrontendRuntimeContext.prototype.isReallyRoot = function () {
        var _a;
        return ((_a = this.token) === null || _a === void 0 ? void 0 : _a.isReallyRoot()) || false;
    };
    FrontendRuntimeContext.prototype.allowUserUpdate = function () {
        var _a;
        var userInfo = (_a = this.token) === null || _a === void 0 ? void 0 : _a.getUserInfo();
        if (userInfo) {
            var userState = userInfo.userState;
            if (userState === 'disabled') {
                throw new Exception_1.OakUserDisabledException('您的帐号已经被禁用，请联系客服');
            }
            else if (['merged'].includes(userState)) {
                throw new Exception_1.OakTokenExpiredException('您的登录状态有异常，请重新登录 ');
            }
            else {
                (0, assert_1.assert)(userState === 'normal' || userState === 'shadow');
            }
            return true;
        }
        throw new types_1.OakUnloggedInException('您尚未登录');
    };
    return FrontendRuntimeContext;
}(SyncRowStore_1.SyncContext));
exports.FrontendRuntimeContext = FrontendRuntimeContext;
