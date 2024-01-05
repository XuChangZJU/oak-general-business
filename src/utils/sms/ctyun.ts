import { EntityDict as BaseEntityDict } from 'oak-domain/lib/base-app-domain'
import { BackendRuntimeContext } from '../../context/BackendRuntimeContext';
import { assert } from 'oak-domain/lib/utils/assert';
import Sms from "../../types/Sms";
import { ED } from '../../types/RuntimeCxt';
import { EntityDict } from '../../oak-app-domain';
import { get } from 'oak-domain/lib/utils/lodash';
import SDK, { CTYunSmsInstance } from 'oak-external-sdk/lib/SmsSdk';
import { CTYunSmsConfig } from '../../types/Config';

export default class CTYun implements Sms<ED, BackendRuntimeContext<ED>> {
    name = 'ctyun';

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
        const ctyunConfig = get(
            systemConfig,
            'Sms.ctyun.0',
            {}
        ) as CTYunSmsConfig;
        const { accessKey, securityKey, endpoint } =
            ctyunConfig;
        assert(accessKey, 'accessKey未配置');
        assert(securityKey, 'securityKey未配置');
        return ctyunConfig;
    }
    async syncTemplate(systemId: string, context: BackendRuntimeContext<ED>) {
        const { accessKey, securityKey, endpoint } =
            await this.getConfig(context, systemId);
        const ctyunInstance = SDK.getInstance(
            'ctyun',
            accessKey,
            securityKey,
            endpoint
        ) as CTYunSmsInstance;
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
            templateParam?: Record<string, string>;
            smsTemplate: Partial<EntityDict['smsTemplate']['Schema']>;
        },
        context: BackendRuntimeContext<ED>
    ): Promise<{ success: boolean; res: any }> {
        const { mobile, templateParam, smsTemplate } = params;
        const { templateCode } = smsTemplate;
        const {
            accessKey,
            securityKey,
            endpoint,
            defaultSignName,
        } = await this.getConfig(context);
        const ctyunInstance = SDK.getInstance(
            'ctyun',
            accessKey,
            securityKey,
            endpoint
        ) as CTYunSmsInstance;

        const result = await ctyunInstance.sendSms({
            phoneNumber: mobile,
            templateParam,
            templateCode: templateCode!,
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
};
