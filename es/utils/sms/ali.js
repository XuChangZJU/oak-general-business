import { assert } from 'oak-domain/lib/utils/assert';
import { get } from 'oak-domain/lib/utils/lodash';
import SDK from 'oak-external-sdk/lib/SmsSdk';
export default class Ali {
    name = 'ali';
    getConfig(context) {
        const { system } = context.getApplication();
        const { config: systemConfig } = system;
        const aliConfig = get(systemConfig, 'Sms.ali.0', {});
        const { accessKeyId, accessKeySecret, defaultSignName, endpoint } = aliConfig;
        assert(accessKeyId, 'accessKeyId未配置');
        assert(accessKeySecret, 'accessKeySecret未配置');
        assert(defaultSignName, 'defaultSignName未配置');
        assert(endpoint, 'endpoint未配置');
        return aliConfig;
    }
    async syncTemplate(systemId) {
        // todo
        return [];
    }
    async sendSms(params, context) {
        const { mobile, templateParam, smsTemplate } = params;
        const { templateCode } = smsTemplate;
        const { accessKeyId, accessKeySecret, defaultSignName, endpoint } = this.getConfig(context);
        const aliInstance = SDK.getInstance('ali', accessKeyId, accessKeySecret, endpoint);
        const result = await aliInstance.sendSms({
            phoneNumbers: [mobile],
            templateCode: templateCode,
            templateParam: templateParam,
            signName: defaultSignName,
        });
        const { code, message, requestId } = result;
        if (code === 'Ok') {
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
