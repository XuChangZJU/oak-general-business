"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = require("oak-domain/lib/utils/assert");
const lodash_1 = require("oak-domain/lib/utils/lodash");
const SmsSdk_1 = tslib_1.__importDefault(require("oak-external-sdk/lib/SmsSdk"));
class Tencent {
    name = 'tencent';
    async getConfig(context, systemId) {
        let system;
        if (systemId) {
            [system] = await context.select('system', {
                data: {
                    id: 1,
                    config: 1,
                },
                filter: {
                    id: systemId,
                }
            }, {
                dontCollect: true,
            });
        }
        else {
            system = context.getApplication().system;
        }
        const { config: systemConfig } = system;
        const tencentConfig = (0, lodash_1.get)(systemConfig, 'Sms.tencent.0', {});
        const { secretId, secretKey, region, endpoint, smsSdkAppId } = tencentConfig;
        (0, assert_1.assert)(secretId, 'secretId未配置');
        (0, assert_1.assert)(secretKey, 'secretKey未配置');
        (0, assert_1.assert)(region, 'region未配置');
        (0, assert_1.assert)(endpoint, 'endpoint未配置');
        (0, assert_1.assert)(smsSdkAppId, 'smsSdkAppId未配置');
        return tencentConfig;
    }
    async syncTemplate(systemId, context) {
        const { secretId, secretKey, region, endpoint, } = await this.getConfig(context, systemId);
        const tencentInstance = SmsSdk_1.default.getInstance('tencent', secretId, secretKey, endpoint, region);
        const result = await tencentInstance.syncTemplate({
            International: 0,
            Limit: 100,
            Offset: 0,
        });
        // // todo  templateName: string,
        // templateCode: string,
        // templateContent: string
        const { DescribeTemplateStatusSet } = result;
        if (DescribeTemplateStatusSet) {
            return DescribeTemplateStatusSet.map((ele) => {
                return {
                    templateCode: ele.TemplateId.toString(),
                    templateName: ele.TemplateName,
                    templateContent: ele.TemplateContent
                };
            });
        }
        return [];
    }
    async sendSms(params, context) {
        const { mobile, templateParam, smsTemplate } = params;
        const { templateCode } = smsTemplate;
        const { secretId, secretKey, region, endpoint, defaultSignName, smsSdkAppId, } = await this.getConfig(context);
        const tencentInstance = SmsSdk_1.default.getInstance('tencent', secretId, secretKey, endpoint, region);
        // const params: SendSmsRequest = {
        //     PhoneNumberSet: [],
        //     TemplateParamSet: [],
        //     SmsSdkAppId: '',
        //     TemplateId: '',
        // };
        const TemplateParamSet = [];
        if (templateParam) {
            Object.keys(templateParam).forEach((ele) => {
                TemplateParamSet.push(templateParam[ele]);
            });
        }
        const result = await tencentInstance.sendSms({
            PhoneNumberSet: [mobile],
            SmsSdkAppId: smsSdkAppId,
            TemplateParamSet,
            TemplateId: templateCode,
            SignName: defaultSignName,
        });
        const code = (0, lodash_1.get)(result, 'SendStatusSet.[0].Code', '');
        if (code === 'Ok') {
            return {
                success: true,
                res: result,
            };
        }
        return {
            success: true,
            res: result,
        };
    }
}
exports.default = Tencent;
;
