import { assert } from 'oak-domain/lib/utils/assert';
import { get } from 'oak-domain/lib/utils/lodash';
import SDK from 'oak-external-sdk/lib/SmsSdk';
export default class CTYun {
    name = 'ctyun';
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
                },
            }, {
                dontCollect: true,
            });
        }
        else {
            system = context.getApplication().system;
        }
        const { config: systemConfig } = system;
        const ctyunConfig = get(systemConfig, 'Sms.ctyun.0', {});
        const { accessKey, securityKey, endpoint } = ctyunConfig;
        assert(accessKey, 'accessKey未配置');
        assert(securityKey, 'securityKey未配置');
        return ctyunConfig;
    }
    async syncTemplate(systemId, context) {
        const { accessKey, securityKey, endpoint } = await this.getConfig(context, systemId);
        const ctyunInstance = SDK.getInstance('ctyun', accessKey, securityKey, endpoint);
        const result = await ctyunInstance.syncTemplate({
            pageIndex: 1,
            pageSize: 50, // pageSize必须小于或等于50
        });
        // // todo  templateName: string,
        // templateCode: string,
        // templateContent: string
        const { data } = result;
        if (data) {
            return data.map((ele) => {
                return {
                    templateCode: ele.templateCode,
                    templateName: ele.templateName,
                    templateContent: ele.templateContent,
                };
            });
        }
        return [];
    }
    async sendSms(params, context) {
        const { mobile, templateParam, smsTemplate } = params;
        const { templateCode } = smsTemplate;
        const { accessKey, securityKey, endpoint, defaultSignName, } = await this.getConfig(context);
        const ctyunInstance = SDK.getInstance('ctyun', accessKey, securityKey, endpoint);
        const result = await ctyunInstance.sendSms({
            phoneNumber: mobile,
            templateParam,
            templateCode: templateCode,
            signName: defaultSignName,
        });
        const code = result?.code || '';
        if (code === 'OK') {
            return {
                success: true,
                res: result,
            };
        }
        return {
            success: false,
            res: result,
        };
    }
}
;
