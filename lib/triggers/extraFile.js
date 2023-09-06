"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var extraFile_1 = require("../aspects/extraFile");
var triggers = [
    {
        name: '创建extraFile时，获取uploadInfo并赋值',
        entity: 'extraFile',
        action: 'create',
        when: 'before',
        fn: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, filter, setUploadInfo, data_1, data_1_1, row;
                var e_1, _b;
                return tslib_1.__generator(this, function (_c) {
                    data = operation.data, filter = operation.filter;
                    setUploadInfo = function (extraFile) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        var uploaInfo;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, extraFile_1.getUploadInfo)({ extraFile: extraFile }, context)];
                                case 1:
                                    uploaInfo = _a.sent();
                                    Object.assign(data, { getUploadInfo: extraFile_1.getUploadInfo });
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    if (data instanceof Array) {
                        try {
                            for (data_1 = tslib_1.__values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                                row = data_1_1.value;
                                setUploadInfo(row);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (data_1_1 && !data_1_1.done && (_b = data_1.return)) _b.call(data_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                    else {
                        setUploadInfo(data);
                    }
                    return [2 /*return*/, 0];
                });
            });
        },
    },
    {
        name: '在删除extraFile前，若已上传成功，则将对应的远端文件也进行删除',
        entity: 'extraFile',
        action: 'remove',
        when: 'before',
        fn: function (event, context) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var _a, data, filter;
            return tslib_1.__generator(this, function (_b) {
                _a = event.operation, data = _a.data, filter = _a.filter;
                //todo
                return [2 /*return*/, 0];
            });
        }); },
    },
];
exports.default = triggers;
