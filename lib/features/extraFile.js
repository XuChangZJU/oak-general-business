"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtraFile = void 0;
var tslib_1 = require("tslib");
var oak_frontend_base_1 = require("oak-frontend-base");
var upload_1 = require("oak-frontend-base/es/utils/upload");
var extraFile_1 = require("../utils/extraFile");
var assert_1 = require("oak-domain/lib/utils/assert");
var uploader_1 = tslib_1.__importDefault(require("../utils/uploader"));
var uuid_1 = require("oak-domain/lib/utils/uuid");
var ExtraFile = /** @class */ (function (_super) {
    tslib_1.__extends(ExtraFile, _super);
    function ExtraFile(cache, application, locales) {
        var _this = _super.call(this) || this;
        _this.cache = cache;
        _this.application = application;
        _this.locales = locales;
        return _this;
    }
    ExtraFile.prototype.createAndUpload = function (extraFile) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, application, config, bucket;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.cache.operate('extraFile', {
                            action: 'create',
                            data: Object.assign({}, extraFile, { extra1: null }),
                            id: (0, uuid_1.generateNewId)(),
                        })];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, this.upload(Object.assign({}, extraFile, { extra1: null }), extraFile.extra1)];
                    case 2:
                        result = _d.sent();
                        application = this.application.getApplication();
                        config = ((_a = application === null || application === void 0 ? void 0 : application.system) === null || _a === void 0 ? void 0 : _a.config) ||
                            ((_c = (_b = application === null || application === void 0 ? void 0 : application.system) === null || _b === void 0 ? void 0 : _b.platform) === null || _c === void 0 ? void 0 : _c.config);
                        bucket = result.bucket;
                        return [2 /*return*/, {
                                url: this.getUrl(Object.assign({}, extraFile, {
                                    extra1: null,
                                })),
                                bucket: bucket,
                            }];
                }
            });
        });
    };
    ExtraFile.prototype.upload = function (extraFile, file) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var id, origin, _a, extraFileData, up, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = extraFile.id, origin = extraFile.origin;
                        (0, assert_1.assert)(origin, '未设置上传方式');
                        _a = tslib_1.__read(this.cache.get('extraFile', {
                            data: {
                                origin: 1,
                                type: 1,
                                bucket: 1,
                                objectId: 1,
                                tag1: 1,
                                tag2: 1,
                                filename: 1,
                                md5: 1,
                                entity: 1,
                                entityId: 1,
                                extra1: 1,
                                extension: 1,
                                size: 1,
                                sort: 1,
                                fileType: 1,
                                isBridge: 1,
                                uploadState: 1,
                                uploadMeta: 1,
                            },
                            filter: {
                                id: id,
                            },
                        }), 1), extraFileData = _a[0];
                        up = new upload_1.Upload();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 6]);
                        return [4 /*yield*/, uploader_1.default[origin].upload(extraFileData, up.uploadFile, file)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.cache.operate('extraFile', {
                                action: 'update',
                                data: {
                                    uploadState: 'success',
                                },
                                filter: {
                                    id: id,
                                },
                                id: (0, uuid_1.generateNewId)(),
                            })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, Object.assign(extraFileData, { uploadState: 'success' })];
                    case 4:
                        err_1 = _b.sent();
                        return [4 /*yield*/, this.cache.operate('extraFile', {
                                action: 'update',
                                data: {
                                    uploadState: 'failed',
                                },
                                filter: {
                                    id: id,
                                },
                                id: (0, uuid_1.generateNewId)(),
                            })];
                    case 5:
                        _b.sent();
                        throw err_1;
                    case 6: return [2 /*return*/];
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
        if (extraFile === null || extraFile === void 0 ? void 0 : extraFile.extra1) {
            // 有extra1就用extra1 可能File对象 可能外部链接
            if (typeof (extraFile === null || extraFile === void 0 ? void 0 : extraFile.extra1) === 'string') {
                return extraFile === null || extraFile === void 0 ? void 0 : extraFile.extra1;
            }
            if ((extraFile === null || extraFile === void 0 ? void 0 : extraFile.extra1) instanceof File) {
                return (0, extraFile_1.getFileURL)(extraFile === null || extraFile === void 0 ? void 0 : extraFile.extra1) || '';
            }
            return (extraFile === null || extraFile === void 0 ? void 0 : extraFile.extra1) || '';
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
                        blob = new Blob([result], {
                            type: 'image/png',
                        });
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
}(oak_frontend_base_1.Feature));
exports.ExtraFile = ExtraFile;
