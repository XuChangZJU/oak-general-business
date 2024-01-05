import { EntityDict as BaseEntityDict } from 'oak-domain/lib/base-app-domain'
import { BackendRuntimeContext } from '../../context/BackendRuntimeContext';
import { assert } from 'oak-domain/lib/utils/assert';
import Sms from "../../types/Sms";
import { ED } from '../../types/RuntimeCxt';
import { EntityDict } from '../../oak-app-domain';
import { get } from 'oak-domain/lib/utils/lodash';
import SDK, { AliSmsInstance } from 'oak-external-sdk/lib/SmsSdk';
import { AliSmsConfig } from '../../types/Config';

export default class Ali implements Sms<ED, BackendRuntimeContext<ED>> {
    name = 'ali';

    getConfig(context: BackendRuntimeContext<ED>) {
        const { system } = context.getApplication()!;
        const { config: systemConfig } = system as EntityDict['system']['Schema'];
        const aliConfig = get(systemConfig, 'Sms.ali.0', {}) as AliSmsConfig;
        const { accessKeyId,
            accessKeySecret,
            defaultSignName,
            endpoint } = aliConfig;
        assert(accessKeyId, 'accessKeyId未配置');
        assert(accessKeySecret, 'accessKeySecret未配置');
        assert(defaultSignName, 'defaultSignName未配置');
        assert(endpoint, 'endpoint未配置');
        return aliConfig;
    }
    async syncTemplate(systemId: string) {
        // todo
        return [];
    }
    async sendSms(params: {
        mobile: string,
        templateParam?: Record<string, any>,
        smsTemplate: Partial<EntityDict['smsTemplate']['Schema']>
    }, context: BackendRuntimeContext<ED>): Promise<{ success: boolean, res: any }> {
        const { mobile, templateParam, smsTemplate } = params;
        const { templateCode } = smsTemplate;
        const { accessKeyId, accessKeySecret, defaultSignName, endpoint } = this.getConfig(context);
        const aliInstance = SDK.getInstance(
            'ali',
            accessKeyId,
            accessKeySecret,
            endpoint,
        ) as AliSmsInstance;
        const result = await aliInstance.sendSms({
            phoneNumbers: [mobile],
            templateCode: templateCode!,
            templateParam: templateParam,
            signName: defaultSignName,
        })
        const { code, message, requestId } = result;
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
};
