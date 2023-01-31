"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
var tslib_1 = require("tslib");
var Feature_1 = require("oak-frontend-base/lib/types/Feature");
var assert_1 = require("oak-domain/lib/utils/assert");
var projection_1 = require("../types/projection");
var Application = /** @class */ (function (_super) {
    tslib_1.__extends(Application, _super);
    function Application(type, domain, cache, storage) {
        var _this = _super.call(this) || this;
        _this.cache = cache;
        _this.storage = storage;
        var applicationId = storage.load('application:applicationId');
        _this.applicationId = applicationId;
        _this.type = type;
        _this.domain = domain;
        return _this;
    }
    Application.prototype.refresh = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cache.refresh('application', {
                            data: projection_1.applicationProjection,
                            filter: {
                                id: this.applicationId,
                            },
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        (0, assert_1.assert)(data.length === 1, "refresh:applicationId".concat(this.applicationId, "\u6CA1\u6709\u53D6\u5230\u6709\u6548\u6570\u636E"));
                        this.application = data[0];
                        if (this.application.type !== this.type) {
                            this.storage.remove('application:applicationId');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Application.prototype.getApplicationFromCache = function () {
        var data = this.cache.get('application', {
            data: projection_1.applicationProjection,
            filter: {
                id: this.applicationId,
            },
        });
        (0, assert_1.assert)(data.length === 1, "cache:applicationId".concat(this.applicationId, "\u6CA1\u6709\u53D6\u5230\u6709\u6548\u6570\u636E"));
        this.application = data[0];
    };
    Application.prototype.loadApplicationInfo = function (type, domain) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var applicationId;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.cache.exec('getApplication', {
                            type: type,
                            domain: domain,
                        })];
                    case 1:
                        applicationId = _b.sent();
                        this.applicationId = applicationId;
                        this.getApplicationFromCache();
                        // 如果取得的type和当前环境不同，则不缓存id(未来可能有type相同的appliction上线)
                        if (((_a = this.application) === null || _a === void 0 ? void 0 : _a.type) === type) {
                            this.storage.save('application:applicationId', applicationId);
                        }
                        this.publish();
                        return [2 /*return*/];
                }
            });
        });
    };
    Application.prototype.initialize = function (appId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (process.env.NODE_ENV === 'development' && appId) {
                            // development环境下允许注入一个线上的appId
                            this.applicationId = appId;
                        }
                        if (!this.applicationId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.refresh()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.loadApplicationInfo(this.type, this.domain)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Application.prototype.getApplication = function () {
        return this.application;
    };
    Application.prototype.getApplicationId = function () {
        return this.applicationId;
    };
    return Application;
}(Feature_1.Feature));
exports.Application = Application;
