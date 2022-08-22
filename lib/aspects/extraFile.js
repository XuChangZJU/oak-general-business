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
        var rowStore, application, _a, type, config, systemId, origin, key, _b, system, systemConfig, originConfig, instance, uploadInfo;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    rowStore = context.rowStore;
                    return [4 /*yield*/, context.getApplication()];
                case 1:
                    application = _c.sent();
                    _a = application, type = _a.type, config = _a.config, systemId = _a.systemId;
                    origin = params.origin, key = params.key;
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
                    try {
                        systemConfig = system.config;
                        originConfig = systemConfig.Cos[origin];
                        instance = new ExternalUploadClazz[origin](originConfig);
                        uploadInfo = instance.getUploadInfo(key);
                        return [2 /*return*/, uploadInfo];
                    }
                    catch (err) {
                        throw err;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.getUploadInfo = getUploadInfo;
