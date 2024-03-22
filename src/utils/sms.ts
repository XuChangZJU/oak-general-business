
import { TencentSmsInstance } from 'oak-external-sdk/lib/service/tencent/Sms';
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
import { getSms } from './sms/index';

export async function sendSms<
    ED extends EntityDict & BaseEntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    options: {
        messageType?: string;
        origin?: 'ali' | 'tencent';
        templateName?: string;
        mobile: string;
        templateParam?: Record<string, string> | string[];
    },
    context: Cxt
) {
    const {
        messageType,
        origin,
        templateName,
        mobile,
        templateParam,
    } = options;
    assert(messageType || (origin && templateName));
    if (origin && templateName) {
        const [smsTemplate] = await context.select(
            'smsTemplate', {
            data: {
                id: 1,
                origin: 1,
                systemId: 1,
                templateCode: 1,
            },
            filter: {
                origin,
                templateName
            }
        },
            {}
        );
        if (!smsTemplate) {
            return {
                success: false,
                res: `${origin}渠道的${templateName}短信模板未配置`
            }
        }
        try {
            const instance = getSms(origin!);
            const result = await instance.sendSms({
                mobile,
                templateParam,
                smsTemplate,
            }, context as BackendRuntimeContext<EntityDict>);
            return result;
        } catch (err) {
            return {
                success: false,
                res: err,
            }
        }

    } else {
        const systemId = context.getSystemId();
        const messageTypeSmsTemplateList = await context.select(
            'messageTypeSmsTemplate', {
            data: {
                id: 1,
                type: 1,
                templateId: 1,
                template: {
                    id: 1,
                    origin: 1,
                    systemId: 1,
                    templateCode: 1,
                }
            },
            filter: {
                template: {
                    systemId,
                },
                type: messageType,
            }
        },
            {}
        );
        // todo 多渠道短信的负载均衡，目前按照顺序发
        let resList = {} as Record<string, any>;
        if (messageTypeSmsTemplateList.length > 0) {
            for (const messageTypeSmsTemplate of messageTypeSmsTemplateList) {
                try {
                    const instance = getSms(messageTypeSmsTemplate.template!.origin!);
                    const result = await instance.sendSms({
                        mobile,
                        templateParam,
                        smsTemplate: messageTypeSmsTemplate.template!,
                    }, context as BackendRuntimeContext<EntityDict>);
                    Object.assign(resList, {
                        [messageTypeSmsTemplate.template!.origin!]: result.res,
                    })
                    if (result.success) {
                        return {
                            success: true,
                            res: resList,
                        };
                    }
                } catch (err) {
                    Object.assign(resList, {
                        [messageTypeSmsTemplate.template!.origin!]: err,
                    });
                }
            }
            return {
                success: false,
                res: {
                    message: '所有短信渠道均发送失败',
                    errorList: resList,
                }
            }
        } else {
            return {
                success: false,
                res: `短信未配置${messageType}模板`
            };
        }
    }



    // const application = context.getApplication();

    // const { system } = application!;
    // const { platform, config: systemConfig } = system!;
    // const { config: platformConfig } = platform || {};
    // const accountConfigs =
    //     systemConfig?.Account?.[origin] || platformConfig?.Account?.[origin];
    // const smsConfigs =
    //     systemConfig?.Sms?.[origin] || platformConfig?.Sms?.[origin];
    // if (
    //     !accountConfigs ||
    //     accountConfigs.length === 0 ||
    //     !smsConfigs ||
    //     smsConfigs.length === 0
    // ) {
    //     assert(false, `${origin}短信未配置`);
    // }
    // if (origin === 'tencent') {
    //     for (const smsConfig of smsConfigs) {
    //         const smsConfig = smsConfigs[0] as TencentSmsConfig;
    //         const accountConfig = accountConfigs[0] as TencentCloudConfig;

    //         // const accountConfig = (accountConfigs as TencentCloudConfig[]).find(
    //         //     ele => ele.secretId === smsConfig.secretId
    //         // )!;

    //         const template = smsConfig.templates?.[templateName];
    //         const SmsSdkInstance = SmsSdk.getInstance(
    //             origin,
    //             accountConfig.secretId,
    //             accountConfig.secretKey,
    //             accountConfig.region,
    //             accountConfig.endpoint
    //         ) as TencentSmsInstance;
    //         const data = await SmsSdkInstance.sendSms({
    //             PhoneNumberSet: [mobile],
    //             SmsSdkAppId: smsConfig.smsSdkAppId,
    //             SignName: template.signName || smsConfig.defaultSignName,
    //             TemplateId: template.code,
    //             TemplateParamSet: templateParamSet as string[],
    //         });
    //         const sendStatus = data.SendStatusSet![0];
    //         if (sendStatus.Code === 'Ok') {
    //             return true;
    //         }
    //         console.warn(`通过微信云发送sms失败，电话是${mobile}，模板Id是${template.code}`, sendStatus);
    //     }
    // } else {
    //     throw new Error('未实现');
    // }
}