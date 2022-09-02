"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtraFile = void 0;
var tslib_1 = require("tslib");
var Feature_1 = require("oak-frontend-base/lib/types/Feature");
var upload_1 = require("oak-frontend-base/lib/utils/upload");
var ExtraFile = /** @class */ (function (_super) {
    tslib_1.__extends(ExtraFile, _super);
    function ExtraFile(aspectWrapper) {
        return _super.call(this, aspectWrapper) || this;
    }
    ExtraFile.prototype.getUploadInfo = function (origin, key) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uploadInfo;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAspectWrapper().exec('getUploadInfo', {
                            origin: origin,
                            key: key,
                        })];
                    case 1:
                        uploadInfo = (_a.sent()).result;
                        return [2 /*return*/, uploadInfo];
                }
            });
        });
    };
    ExtraFile.prototype.upload = function (extraFile) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var origin_1, extra1, filename, objectId, extension, entity, key, uploadInfo, up, result, up, result, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        origin_1 = extraFile.origin, extra1 = extraFile.extra1, filename = extraFile.filename, objectId = extraFile.objectId, extension = extraFile.extension, entity = extraFile.entity;
                        key = "".concat(entity ? entity + '/' : '').concat(objectId, ".").concat(extension);
                        return [4 /*yield*/, this.getUploadInfo(origin_1, key)];
                    case 1:
                        uploadInfo = _a.sent();
                        if (!(process.env.OAK_PLATFORM === 'wechatMp')) return [3 /*break*/, 3];
                        up = new upload_1.Upload();
                        return [4 /*yield*/, up.uploadFile(origin_1, extra1, uploadInfo)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        up = new upload_1.Upload();
                        return [4 /*yield*/, up.uploadFile(origin_1, extra1, uploadInfo)];
                    case 4:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_1 = _a.sent();
                        throw err_1;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        Feature_1.Action
    ], ExtraFile.prototype, "getUploadInfo", null);
    tslib_1.__decorate([
        Feature_1.Action
    ], ExtraFile.prototype, "upload", null);
    return ExtraFile;
}(Feature_1.Feature));
exports.ExtraFile = ExtraFile;
