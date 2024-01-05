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

    async getConfig(context: BackendRuntimeContext<ED>, systemId?: string) {
        let system;
        if (systemId) {
            [system] = await context.select(
                'system',
                {
                    data: {
                        id: 1,
                        config: 1,
                    },
                    filter: {
                        id: systemId,
                    },
                },
                {
                    dontCollect: true,
                }
            );
        } else {
            system = context.getApplication()!.system;
        }
        const { config: systemConfig } =
            system as EntityDict['system']['Schema'];
        const aliConfig = get(systemConfig, 'Sms.ali.0', {}) as AliSmsConfig;
        const { accessKeyId, accessKeySecret, defaultSignName, endpoint } =
            aliConfig;
        assert(accessKeyId, 'accessKeyId未配置');
        assert(accessKeySecret, 'accessKeySecret未配置');
        assert(defaultSignName, 'defaultSignName未配置');
        assert(endpoint, 'endpoint未配置');
        return aliConfig;
    }
    async syncTemplate(systemId: string, context: BackendRuntimeContext<ED>) {
        const { accessKeyId, accessKeySecret, endpoint, apiVersion } = await this.getConfig(
            context,
            systemId
        );
        const aliInstance = SDK.getInstance(
            'ali',
            accessKeyId,
            accessKeySecret,
            endpoint,
            undefined,
            apiVersion
        ) as AliSmsInstance;
        const result = await aliInstance.syncTemplate({
            PageIndex: 1,
            PageSize: 100,
        });
        // // todo  templateName: string,
        // templateCode: string,
        // templateContent: string
        const { smsTemplateList } = result;
        if (smsTemplateList) {
            return smsTemplateList.map((ele) => {
                return {
                    templateCode: ele.templateCode!,
                    templateName: ele.templateName!,
                    templateContent: ele.templateContent!,
                };
            });
        }
        return [];
    }
    async sendSms(
        params: {
            mobile: string;
            templateParam?: Record<string, any>;
            smsTemplate: Partial<EntityDict['smsTemplate']['Schema']>;
        },
        context: BackendRuntimeContext<ED>
    ): Promise<{ success: boolean; res: any }> {
        const { mobile, templateParam, smsTemplate } = params;
        const { templateCode } = smsTemplate;
        const { accessKeyId, accessKeySecret, defaultSignName, endpoint } =
            await this.getConfig(context);
        const aliInstance = SDK.getInstance(
            'ali',
            accessKeyId,
            accessKeySecret,
            endpoint
        ) as AliSmsInstance;
        const result = await aliInstance.sendSms({
            phoneNumbers: [mobile],
            templateCode: templateCode!,
            templateParam: templateParam,
            signName: defaultSignName,
        });
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
