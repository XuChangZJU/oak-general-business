"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeFileUrl = exports.getCos = exports.registerCos = void 0;
const tslib_1 = require("tslib");
const assert_1 = require("oak-domain/lib/utils/assert");
const qiniu_1 = tslib_1.__importDefault(require("./qiniu"));
const wechat_1 = tslib_1.__importDefault(require("./wechat"));
const ctyun_1 = tslib_1.__importDefault(require("./ctyun"));
const ctyun = new ctyun_1.default();
const qiniu = new qiniu_1.default();
const wechat = new wechat_1.default();
const CosDict = {
    [qiniu.name]: qiniu,
    [wechat.name]: wechat,
    [ctyun.name]: ctyun,
};
/**
 * 注入一个其它OSS上实现的uploader类
 * @param clazz
 */
function registerCos(clazz) {
    const instance = new clazz();
    CosDict[instance.name] = instance;
}
exports.registerCos = registerCos;
function getCos(origin) {
    (0, assert_1.assert)(CosDict.hasOwnProperty(origin));
    return CosDict[origin];
}
exports.getCos = getCos;
function composeFileUrl(extraFile, context, style) {
    const { origin } = extraFile;
    const cos = CosDict[origin];
    return cos.composeFileUrl(extraFile, context, style);
}
exports.composeFileUrl = composeFileUrl;
