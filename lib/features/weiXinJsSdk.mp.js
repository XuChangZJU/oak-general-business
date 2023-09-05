"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeiXinJsSdk = void 0;
var tslib_1 = require("tslib");
var oak_frontend_base_1 = require("oak-frontend-base");
var WeiXinJsSdk = /** @class */ (function (_super) {
    tslib_1.__extends(WeiXinJsSdk, _super);
    function WeiXinJsSdk(cache, storage) {
        var _this = _super.call(this) || this;
        _this.cache = cache;
        _this.storage = storage;
        return _this;
    }
    WeiXinJsSdk.prototype.wxConfig = function () {
        console.warn('小程序无需该操作');
    };
    WeiXinJsSdk.prototype.initWeiXinJsSDK = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                console.warn('小程序无需该操作');
                return [2 /*return*/];
            });
        });
    };
    WeiXinJsSdk.prototype.loadWeiXinJsSDK = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                console.warn('小程序无需该操作');
                return [2 /*return*/];
            });
        });
    };
    return WeiXinJsSdk;
}(oak_frontend_base_1.Feature));
exports.WeiXinJsSdk = WeiXinJsSdk;
