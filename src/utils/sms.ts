
import { SmsSdk, TencentSmsInstance } from 'oak-external-sdk';
import { assert } from 'oak-domain/lib/utils/assert';
import { EntityDict } from '../general-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import {
    TencentSmsConfig,
    TencentCloudConfig,
    AliCloudConfig,
    AliSmsConfig,
} from '../types/Config';

export async function sendSms<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    options: {
        origin: 'ali' | 'tencent';
        templateName: string;
        mobile: string;
        templateParamSet?: Record<string, string>;
        templateParamSetFn?: (
            origin: 'ali' | 'tencent',
            templateParamSet?: Record<string, string>
        ) => string[] | Record<string, string> | undefined;
    },
    context: Cxt
) {
    const {
        origin,
        templateName,
        mobile,
        templateParamSet,
        templateParamSetFn,
    } = options;
    const application = context.getApplication();

    const { system } = application!;
    const { platform, config: systemConfig } = system!;
    const { config: platformConfig } = platform;
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
    const templateParamSet2 = templateParamSetFn
        ? templateParamSetFn(origin, templateParamSet)
        : templateParamSet;
    if (origin === 'tencent') {
        const accountConfig = accountConfigs[0] as TencentCloudConfig;
        const smsConfig = smsConfigs[0] as TencentSmsConfig;
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
            TemplateParamSet: templateParamSet2 as string[],
        });
        const sendStatus = data.SendStatusSet[0];
        if (sendStatus.Code === 'Ok') {
            return true;
        }
        return false;
    } else {
        throw new Error('未实现');
    }
}