"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
var tslib_1 = require("tslib");
var Feature_1 = require("oak-frontend-base/lib/types/Feature");
var Config = /** @class */ (function (_super) {
    tslib_1.__extends(Config, _super);
    function Config(aspectWrapper) {
        var _this = _super.call(this) || this;
        _this.aspectWrapper = aspectWrapper;
        return _this;
    }
    Config.prototype.updateConfig = function (entity, entityId, config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.aspectWrapper.exec('updateConfig', {
                            entity: entity,
                            entityId: entityId,
                            config: config
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        Feature_1.Action
    ], Config.prototype, "updateConfig", null);
    return Config;
}(Feature_1.Feature));
exports.Config = Config;
