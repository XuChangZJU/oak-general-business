"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uploader_1 = tslib_1.__importDefault(require("../utils/uploader"));
var oak_domain_1 = require("oak-domain");
var triggers = [
    {
        name: '生成extraFile需要的上传meta',
        when: 'before',
        entity: 'extraFile',
        action: 'create',
        fn: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, formMeta;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            data = operation.data;
                            formMeta = function (data) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                var origin, uploader;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            origin = data.origin;
                                            uploader = uploader_1.default[origin];
                                            if (!uploader) {
                                                throw new oak_domain_1.OakException("origin\u4E3A".concat(origin, "\u7684extraFile\u6CA1\u6709\u5B9A\u4E49\u4E0A\u4F20\u7C7B\uFF0C\u8BF7\u8C03\u7528registerUploader\u6CE8\u5165"));
                                            }
                                            return [4 /*yield*/, uploader.formUploadMeta(data, context)];
                                        case 1:
                                            _a.sent();
                                            Object.assign(data, {
                                                uploadState: 'uploading',
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            if (!(data instanceof Array)) return [3 /*break*/, 2];
                            return [4 /*yield*/, Promise.all(data.map(function (ele) { return formMeta(ele); }))];
                        case 1:
                            _b.sent();
                            return [2 /*return*/, data.length];
                        case 2: return [4 /*yield*/, formMeta(data)];
                        case 3:
                            _b.sent();
                            return [2 /*return*/, 1];
                    }
                });
            });
        }
    },
];
exports.default = triggers;
