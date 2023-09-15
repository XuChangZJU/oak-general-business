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
    {
        name: '删除extraFile时远端也进行删除',
        when: 'before',
        entity: 'extraFile',
        action: 'remove',
        fn: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var filter, extraFileList, extraFileList_1, extraFileList_1_1, extraFile, origin_1, uploader, e_1_1;
                var e_1, _b;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            filter = operation.filter;
                            return [4 /*yield*/, context.select('extraFile', {
                                    data: {
                                        id: 1,
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
                                    filter: filter,
                                }, {
                                    dontCollect: true,
                                })];
                        case 1:
                            extraFileList = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 7, 8, 9]);
                            extraFileList_1 = tslib_1.__values(extraFileList), extraFileList_1_1 = extraFileList_1.next();
                            _c.label = 3;
                        case 3:
                            if (!!extraFileList_1_1.done) return [3 /*break*/, 6];
                            extraFile = extraFileList_1_1.value;
                            origin_1 = extraFile.origin;
                            uploader = uploader_1.default[origin_1];
                            return [4 /*yield*/, uploader.checkWhetherSuccess(extraFile, context)];
                        case 4:
                            _c.sent();
                            _c.label = 5;
                        case 5:
                            extraFileList_1_1 = extraFileList_1.next();
                            return [3 /*break*/, 3];
                        case 6: return [3 /*break*/, 9];
                        case 7:
                            e_1_1 = _c.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 9];
                        case 8:
                            try {
                                if (extraFileList_1_1 && !extraFileList_1_1.done && (_b = extraFileList_1.return)) _b.call(extraFileList_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                            return [7 /*endfinally*/];
                        case 9: return [2 /*return*/, 1];
                    }
                });
            });
        }
    },
];
exports.default = triggers;
