"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSms = void 0;
var tslib_1 = require("tslib");
var oak_external_sdk_1 = require("oak-external-sdk");
var assert_1 = require("oak-domain/lib/utils/assert");
function sendSms(options, context) {
    var _a, _b, _c, _d, _e;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var origin, templateName, mobile, templateParamSet, templateParamSetFn, application, system, _f, platform, systemConfig, platformConfig, accountConfigs, smsConfigs, templateParamSet2, accountConfig, smsConfig, template, SmsSdkInstance, data, sendStatus;
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    origin = options.origin, templateName = options.templateName, mobile = options.mobile, templateParamSet = options.templateParamSet, templateParamSetFn = options.templateParamSetFn;
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
                    templateParamSet2 = templateParamSetFn
                        ? templateParamSetFn(origin, templateParamSet)
                        : templateParamSet;
                    if (!(origin === 'tencent')) return [3 /*break*/, 2];
                    accountConfig = accountConfigs[0];
                    smsConfig = smsConfigs[0];
                    template = (_e = smsConfig.templates) === null || _e === void 0 ? void 0 : _e[templateName];
                    SmsSdkInstance = oak_external_sdk_1.SmsSdk.getInstance(origin, accountConfig.secretId, accountConfig.secretKey, accountConfig.region, accountConfig.endpoint);
                    return [4 /*yield*/, SmsSdkInstance.sendSms({
                            PhoneNumberSet: [mobile],
                            SmsSdkAppId: smsConfig.smsSdkAppId,
                            SignName: template.signName || smsConfig.defaultSignName,
                            TemplateId: template.code,
                            TemplateParamSet: templateParamSet2,
                        })];
                case 1:
                    data = _g.sent();
                    sendStatus = data.SendStatusSet[0];
                    if (sendStatus.Code === 'Ok') {
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, false];
                case 2: throw new Error('未实现');
            }
        });
    });
}
exports.sendSms = sendSms;
