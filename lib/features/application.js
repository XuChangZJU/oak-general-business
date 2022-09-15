"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
var tslib_1 = require("tslib");
var Feature_1 = require("oak-frontend-base/lib/types/Feature");
var concurrent_1 = require("oak-domain/lib/utils/concurrent");
var assert_1 = require("oak-domain/lib/utils/assert");
var projection = {
    id: 1,
    name: 1,
    config: 1,
    type: 1,
    systemId: 1,
    system: {
        id: 1,
        name: 1,
        config: 1,
    }
};
var Application = /** @class */ (function (_super) {
    tslib_1.__extends(Application, _super);
    function Application(aspectWrapper, type, cache, storage) {
        var _this = _super.call(this, aspectWrapper) || this;
        _this.rwLock = new concurrent_1.RWLock();
        _this.cache = cache;
        _this.storage = storage;
        var applicationId = storage.load('application:applicationId');
        if (applicationId) {
            _this.applicationId = applicationId;
        }
        else {
            _this.refresh(type);
        }
        return _this;
    }
    Application.prototype.loadApplicationInfo = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rwLock.acquire('X')];
                    case 1:
                        _a.sent();
                        if (!!this.application) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.cache.refresh('application', {
                                data: projection,
                                filter: {
                                    id: this.applicationId,
                                }
                            })];
                    case 2:
                        data = (_a.sent()).data;
                        (0, assert_1.assert)(data.length === 1, "applicationId".concat(this.applicationId, "\u6CA1\u6709\u53D6\u5230\u6709\u6548\u6570\u636E"));
                        this.application = data[0];
                        _a.label = 3;
                    case 3:
                        this.rwLock.release();
                        return [2 /*return*/];
                }
            });
        });
    };
    Application.prototype.getApplicationFromCache = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cache.get('application', {
                            data: projection,
                            filter: {
                                id: this.applicationId,
                            }
                        })];
                    case 1:
                        data = _a.sent();
                        (0, assert_1.assert)(data.length === 1, "applicationId".concat(this.applicationId, "\u6CA1\u6709\u53D6\u5230\u6709\u6548\u6570\u636E"));
                        this.application = data[0];
                        return [2 /*return*/];
                }
            });
        });
    };
    Application.prototype.refresh = function (type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var applicationId;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rwLock.acquire('X')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getAspectWrapper().exec('getApplication', {
                                type: type,
                            })];
                    case 2:
                        applicationId = (_a.sent()).result;
                        this.applicationId = applicationId;
                        this.storage.save('application:applicationId', applicationId);
                        this.getApplicationFromCache();
                        this.rwLock.release();
                        return [2 /*return*/];
                }
            });
        });
    };
    Application.prototype.getApplication = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.application) {
                            return [2 /*return*/, this.application];
                        }
                        return [4 /*yield*/, this.loadApplicationInfo()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.application];
                }
            });
        });
    };
    Application.prototype.getApplicationId = function (noWait) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (noWait) {
                            return [2 /*return*/, this.applicationId];
                        }
                        if (this.applicationId) {
                            return [2 /*return*/, this.applicationId];
                        }
                        return [4 /*yield*/, this.rwLock.acquire('S')];
                    case 1:
                        _a.sent();
                        result = this.applicationId;
                        this.rwLock.release();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return Application;
}(Feature_1.Feature));
exports.Application = Application;
