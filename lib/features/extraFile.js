"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtraFile = void 0;
var tslib_1 = require("tslib");
var Feature_1 = require("oak-frontend-base/lib/types/Feature");
var upload_1 = require("oak-frontend-base/lib/utils/upload");
var extraFile_1 = require("../utils/extraFile");
var assert_1 = tslib_1.__importDefault(require("assert"));
var ExtraFile = /** @class */ (function (_super) {
    tslib_1.__extends(ExtraFile, _super);
    function ExtraFile(cache, application, locales) {
        var _this = _super.call(this) || this;
        _this.cache = cache;
        _this.application = application;
        _this.locales = locales;
        return _this;
    }
    ExtraFile.prototype.getUploadInfo = function (origin, key) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uploadInfo;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cache.exec('getUploadInfo', {
                            origin: origin,
                            key: key,
                        })];
                    case 1:
                        uploadInfo = _a.sent();
                        return [2 /*return*/, uploadInfo];
                }
            });
        });
    };
    ExtraFile.prototype.upload = function (extraFile) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var origin, extra1, filename, objectId, extension, entity, key, uploadInfo, up, result, up, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        origin = extraFile.origin, extra1 = extraFile.extra1, filename = extraFile.filename, objectId = extraFile.objectId, extension = extraFile.extension, entity = extraFile.entity;
                        key = "".concat(entity ? entity + '/' : '').concat(objectId).concat(extension ? '.' + extension : '');
                        (0, assert_1.default)(origin && origin !== 'unknown');
                        return [4 /*yield*/, this.getUploadInfo(origin, key)];
                    case 1:
                        uploadInfo = (_a.sent()).result;
                        if (!(process.env.OAK_PLATFORM === 'wechatMp')) return [3 /*break*/, 3];
                        up = new upload_1.Upload();
                        return [4 /*yield*/, up.uploadFile(origin, extra1, uploadInfo)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        up = new upload_1.Upload();
                        return [4 /*yield*/, up.uploadFile(origin, extra1, uploadInfo)];
                    case 4:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ExtraFile.prototype.getUrl = function (extraFile, style) {
        var _a, _b, _c;
        if (!extraFile) {
            return '';
        }
        var application = this.application.getApplication();
        var config = ((_a = application === null || application === void 0 ? void 0 : application.system) === null || _a === void 0 ? void 0 : _a.config) ||
            ((_c = (_b = application === null || application === void 0 ? void 0 : application.system) === null || _b === void 0 ? void 0 : _b.platform) === null || _c === void 0 ? void 0 : _c.config);
        var url;
        if ((extraFile === null || extraFile === void 0 ? void 0 : extraFile.isBridge) && (extraFile === null || extraFile === void 0 ? void 0 : extraFile.extra1)) {
            if (typeof (extraFile === null || extraFile === void 0 ? void 0 : extraFile.extra1) === 'string') {
                url = this.locales.makeBridgeUrl(extraFile === null || extraFile === void 0 ? void 0 : extraFile.extra1);
                return url;
            }
        }
        url = (0, extraFile_1.composeFileUrl)(extraFile, config, style);
        return url;
    };
    /**
     * 使用该方法，要在使用完url时，通过URL.revokeObjectURL释放缓存
     *
     * @param url 需要桥接访问的图片链接
     * @returns 浏览器 img可访问的url
     */
    ExtraFile.prototype.getBridgeUrl = function (url) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, blob;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cache.exec('crossBridge', {
                            url: url,
                        })];
                    case 1:
                        result = (_a.sent()).result;
                        blob = new Blob([result], { type: 'image/png' });
                        return [2 /*return*/, URL.createObjectURL(blob)];
                }
            });
        });
    };
    ExtraFile.prototype.getFileName = function (extraFile) {
        var name = extraFile.filename +
            (extraFile.extension ? ".".concat(extraFile.extension) : '');
        return name;
    };
    ExtraFile.prototype.formatBytes = function (size) {
        return (0, extraFile_1.bytesToSize)(size);
    };
    return ExtraFile;
}(Feature_1.Feature));
exports.ExtraFile = ExtraFile;
