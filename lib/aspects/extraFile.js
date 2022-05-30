"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUploadInfo = void 0;
const qiniu_1 = __importDefault(require("../utils/externalUpload/qiniu"));
const ExternalUploadClazz = {
    qiniu: qiniu_1.default,
};
async function getUploadInfo(params, context) {
    const { rowStore } = context;
    const application = await context.getApplication();
    const { type, config, systemId } = application;
    const { origin, fileName } = params;
    const { result: [system] } = await rowStore.select('system', {
        data: {
            id: 1,
            config: 1
        },
        filter: {
            id: systemId
        }
    }, context);
    try {
        const { config: systemConfig } = system;
        const originConfig = systemConfig.Cos[origin];
        const instance = new ExternalUploadClazz[origin](originConfig);
        const uploadInfo = await instance.getUploadInfo(fileName);
        return uploadInfo;
    }
    catch (err) {
        throw err;
    }
}
exports.getUploadInfo = getUploadInfo;
