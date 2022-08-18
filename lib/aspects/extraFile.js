"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUploadInfo = void 0;
var tslib_1 = require("tslib");
var qiniu_1 = tslib_1.__importDefault(require("../utils/externalUpload/qiniu"));
var ExternalUploadClazz = {
    qiniu: qiniu_1.default,
};
function getUploadInfo(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var rowStore, application, _a, type, config, systemId, origin, fileName, _b, system, systemConfig, originConfig, instance, uploadInfo, err_1;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    rowStore = context.rowStore;
                    return [4 /*yield*/, context.getApplication()];
                case 1:
                    application = _c.sent();
                    _a = application, type = _a.type, config = _a.config, systemId = _a.systemId;
                    origin = params.origin, fileName = params.fileName;
                    return [4 /*yield*/, rowStore.select('system', {
                            data: {
                                id: 1,
                                config: 1
                            },
                            filter: {
                                id: systemId
                            }
                        }, context)];
                case 2:
                    _b = tslib_1.__read.apply(void 0, [(_c.sent()).result, 1]), system = _b[0];
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 5, , 6]);
                    systemConfig = system.config;
                    originConfig = systemConfig.Cos[origin];
                    instance = new ExternalUploadClazz[origin](originConfig);
                    return [4 /*yield*/, instance.getUploadInfo(fileName)];
                case 4:
                    uploadInfo = _c.sent();
                    return [2 /*return*/, uploadInfo];
                case 5:
                    err_1 = _c.sent();
                    throw err_1;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getUploadInfo = getUploadInfo;
