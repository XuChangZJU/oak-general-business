"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUploader = void 0;
var tslib_1 = require("tslib");
var qiniu_1 = tslib_1.__importDefault(require("./qiniu"));
var qiniu = new qiniu_1.default();
var UploaderDict = (_a = {},
    _a[qiniu.name] = qiniu,
    _a);
exports.default = UploaderDict;
/**
 * 注入一个其它OSS上实现的uploader类
 * @param clazz
 */
function registerUploader(clazz) {
    var instance = new clazz();
    UploaderDict[instance.name] = instance;
}
exports.registerUploader = registerUploader;
