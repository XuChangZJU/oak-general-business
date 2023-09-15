"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUploader = void 0;
const tslib_1 = require("tslib");
const qiniu_1 = tslib_1.__importDefault(require("./qiniu"));
const qiniu = new qiniu_1.default();
const UploaderDict = {
    [qiniu.name]: qiniu,
};
exports.default = UploaderDict;
/**
 * 注入一个其它OSS上实现的uploader类
 * @param clazz
 */
function registerUploader(clazz) {
    const instance = new clazz();
    UploaderDict[instance.name] = instance;
}
exports.registerUploader = registerUploader;
