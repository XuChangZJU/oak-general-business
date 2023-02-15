"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSms = void 0;
var tslib_1 = require("tslib");
var oak_external_sdk_1 = require("oak-external-sdk");
var assert_1 = require("oak-domain/lib/utils/assert");
var types_1 = require("oak-domain/lib/types");
function sendSms(options, context) {
    var _a, _b, _c, _d, _e;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var origin, templateName, mobile, templateParamSet, application, system, _f, platform, systemConfig, platformConfig, accountConfigs, smsConfigs, _loop_1, smsConfigs_1, smsConfigs_1_1, smsConfig, state_1, e_1_1;
        var e_1, _g;
        return tslib_1.__generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    origin = options.origin, templateName = options.templateName, mobile = options.mobile, templateParamSet = options.templateParamSet;
                    application = context.getApplication();
                    system = application.system;
                    _f = system, platform = _f.platform, systemConfig = _f.config;
                    platformConfig = platform.config;
                    accountConfigs = ((_a = systemConfig === null || systemConfig === void 0 ? void 0 : systemConfig.Account) === null || _a === void 0 ? void 0 : _a[origin]) || ((_b = platformConfig === null || platformConfig === void 0 ? void 0 : platformConfig.Account) === null || _b === void 0 ? void 0 : _b[origin]);
                    smsConfigs = ((_c = systemConfig === null || systemConfig === void 0 ? void 0 : systemConfig.Sms) === null || _c === void 0 ? void 0 : _c[origin]) || ((_d = platformConfig === null || platformConfig === void 0 ? void 0 : platformConfig.Sms) === null || _d === void 0 ? void 0 : _d[origin]);
                    if (!accountConfigs ||
                        accountConfigs.length === 0 ||
                        !smsConfigs ||
                        smsConfigs.length === 0) {
                        (0, assert_1.assert)(false, "".concat(origin, "\u77ED\u4FE1\u672A\u914D\u7F6E"));
                    }
                    if (!(origin === 'tencent')) return [3 /*break*/, 9];
                    _loop_1 = function (smsConfig) {
                        var smsConfig_1, accountConfig, template, SmsSdkInstance, data, sendStatus;
                        return tslib_1.__generator(this, function (_j) {
                            switch (_j.label) {
                                case 0:
                                    smsConfig_1 = smsConfigs[0];
                                    accountConfig = accountConfigs.find(function (ele) { return ele.secretId === smsConfig_1.secretId; });
                                    template = (_e = smsConfig_1.templates) === null || _e === void 0 ? void 0 : _e[templateName];
                                    SmsSdkInstance = oak_external_sdk_1.SmsSdk.getInstance(origin, accountConfig.secretId, accountConfig.secretKey, accountConfig.region, accountConfig.endpoint);
                                    return [4 /*yield*/, SmsSdkInstance.sendSms({
                                            PhoneNumberSet: [mobile],
                                            SmsSdkAppId: smsConfig_1.smsSdkAppId,
                                            SignName: template.signName || smsConfig_1.defaultSignName,
                                            TemplateId: template.code,
                                            TemplateParamSet: templateParamSet,
                                        })];
                                case 1:
                                    data = _j.sent();
                                    sendStatus = data.SendStatusSet[0];
                                    if (sendStatus.Code === 'Ok') {
                                        return [2 /*return*/, { value: true }];
                                    }
                                    console.warn("\u901A\u8FC7\u5FAE\u4FE1\u4E91\u53D1\u9001sms\u5931\u8D25\uFF0C\u7535\u8BDD\u662F".concat(mobile, "\uFF0C\u6A21\u677FId\u662F").concat(template.code), sendStatus);
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _h.label = 1;
                case 1:
                    _h.trys.push([1, 6, 7, 8]);
                    smsConfigs_1 = tslib_1.__values(smsConfigs), smsConfigs_1_1 = smsConfigs_1.next();
                    _h.label = 2;
                case 2:
                    if (!!smsConfigs_1_1.done) return [3 /*break*/, 5];
                    smsConfig = smsConfigs_1_1.value;
                    return [5 /*yield**/, _loop_1(smsConfig)];
                case 3:
                    state_1 = _h.sent();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    _h.label = 4;
                case 4:
                    smsConfigs_1_1 = smsConfigs_1.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_1_1 = _h.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (smsConfigs_1_1 && !smsConfigs_1_1.done && (_g = smsConfigs_1.return)) _g.call(smsConfigs_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 8: return [3 /*break*/, 10];
                case 9: throw new Error('未实现');
                case 10: throw new types_1.OakExternalException('尝试发送sms短信失败');
            }
        });
    });
}
exports.sendSms = sendSms;
