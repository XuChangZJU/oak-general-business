import { assert } from 'oak-domain/lib/utils/assert';
import { get } from 'oak-domain/lib/utils/lodash';
import SDK from 'oak-external-sdk/lib/SmsSdk';
export default class Tencent {
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
        const tencentConfig = get(systemConfig, 'Sms.tencent.0', {});
        const { secretId, secretKey, region, endpoint, smsSdkAppId } = tencentConfig;
        assert(secretId, 'secretId未配置');
        assert(secretKey, 'secretKey未配置');
        assert(region, 'region未配置');
        assert(endpoint, 'endpoint未配置');
        assert(smsSdkAppId, 'smsSdkAppId未配置');
        return tencentConfig;
    }
    async syncTemplate(systemId, context) {
        const { secretId, secretKey, region, endpoint, } = await this.getConfig(context, systemId);
        const tencentInstance = SDK.getInstance('tencent', secretId, secretKey, endpoint, region);
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
        const tencentInstance = SDK.getInstance('tencent', secretId, secretKey, endpoint, region);
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
        const code = get(result, 'SendStatusSet.[0].Code', '');
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
;
