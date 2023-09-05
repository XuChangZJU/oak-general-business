
import { SmsSdk, TencentSmsInstance } from 'oak-external-sdk';
import { assert } from 'oak-domain/lib/utils/assert';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { EntityDict } from '../oak-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import {
    TencentSmsConfig,
    TencentCloudConfig,
    AliCloudConfig,
    AliSmsConfig,
} from '../types/Config';
import { OakExternalException } from 'oak-domain/lib/types';

export async function sendSms<
    ED extends EntityDict & BaseEntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    options: {
        origin: 'ali' | 'tencent';
        templateName: string;
        mobile: string;
        templateParamSet?: Record<string, string> | string[];
    },
    context: Cxt
) {
    const {
        origin,
        templateName,
        mobile,
        templateParamSet,
    } = options;
    const application = context.getApplication();

    const { system } = application!;
    const { platform, config: systemConfig } = system!;
    const { config: platformConfig } = platform || {};
    const accountConfigs =
        systemConfig?.Account?.[origin] || platformConfig?.Account?.[origin];
    const smsConfigs =
        systemConfig?.Sms?.[origin] || platformConfig?.Sms?.[origin];
    if (
        !accountConfigs ||
        accountConfigs.length === 0 ||
        !smsConfigs ||
        smsConfigs.length === 0
    ) {
        assert(false, `${origin}短信未配置`);
    }
    if (origin === 'tencent') {
        for (const smsConfig of smsConfigs) {
            const smsConfig = smsConfigs[0] as TencentSmsConfig;
            const accountConfig = accountConfigs[0] as TencentCloudConfig;

            // const accountConfig = (accountConfigs as TencentCloudConfig[]).find(
            //     ele => ele.secretId === smsConfig.secretId
            // )!;

            const template = smsConfig.templates?.[templateName];
            const SmsSdkInstance = SmsSdk.getInstance(
                origin,
                accountConfig.secretId,
                accountConfig.secretKey,
                accountConfig.region,
                accountConfig.endpoint
            ) as TencentSmsInstance;
            const data = await SmsSdkInstance.sendSms({
                PhoneNumberSet: [mobile],
                SmsSdkAppId: smsConfig.smsSdkAppId,
                SignName: template.signName || smsConfig.defaultSignName,
                TemplateId: template.code,
                TemplateParamSet: templateParamSet as string[],
            });
            const sendStatus = data.SendStatusSet![0];
            if (sendStatus.Code === 'Ok') {
                return true;
            }
            console.warn(`通过微信云发送sms失败，电话是${mobile}，模板Id是${template.code}`, sendStatus);
        }
    } else {
        throw new Error('未实现');
    }

    throw new OakExternalException('尝试发送sms短信失败');
}