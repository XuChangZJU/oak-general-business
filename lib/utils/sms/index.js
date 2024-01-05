"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrigin = exports.getSms = exports.registSms = void 0;
const tslib_1 = require("tslib");
const assert_1 = require("oak-domain/lib/utils/assert");
const ali_1 = tslib_1.__importDefault(require("./ali"));
const tencent_1 = tslib_1.__importDefault(require("./tencent"));
const ctyun_1 = tslib_1.__importDefault(require("./ctyun"));
const ali = new ali_1.default();
const tencent = new tencent_1.default();
const ctyun = new ctyun_1.default();
const SmsDict = {
    [ali.name]: ali,
    [tencent.name]: tencent,
    [ctyun.name]: ctyun,
};
/**
 * 注入一个其它OSS上实现的uploader类
 * @param clazz
 */
function registSms(clazz) {
    const instance = new clazz();
    SmsDict[instance.name] = instance;
}
exports.registSms = registSms;
function getSms(origin) {
    (0, assert_1.assert)(SmsDict.hasOwnProperty(origin));
    return SmsDict[origin];
}
exports.getSms = getSms;
function getOrigin() {
    return Object.keys(SmsDict);
}
exports.getOrigin = getOrigin;
