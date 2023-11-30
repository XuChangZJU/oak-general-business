import { EntityDict } from '../oak-app-domain';
import {
    AppType,
    WechatPublicConfig,
} from '../oak-app-domain/Application/Schema';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { OakUserException } from 'oak-domain/lib/types';
import { WechatPublicEventData, WechatMpEventData } from 'oak-external-sdk';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { assert } from 'oak-domain/lib/utils/assert';
import { getSms } from '../utils/sms/index';

export async function syncSmsTemplate<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        origin: string,
        systemId: string,
    },
    context: Cxt
) {
    const { origin, systemId } = params;
    const Sms = getSms(origin);
    const templateFormalData = await Sms.syncTemplate(systemId!, context as any);
    const existTemplateList = await context.select(
        'smsTemplate',
        {
            data: {
                id: 1,
                templateName: 1,
                templateCode: 1,
                templateContent: 1,
            },
            filter: {
                systemId,
                origin,
            }
        },
        {
            dontCollect: true,
        }
    );
    const existsTemplateIds = existTemplateList.map(
        (ele) => ele.templateCode
    );
    const newTemplateList = templateFormalData.filter(
        (ele) => !existsTemplateIds.includes(ele.templateCode)
    );
    const newTemplateIds = newTemplateList.map((ele) => ele.templateCode);
    // const removeTemplateList = existTemplateList.filter(
    //     (ele) => !newTemplateIds.includes(ele.templateCode!)
    // );
    for (const template of templateFormalData) {
        const {
            templateName,
            templateCode,
            templateContent
        } = template;
        const existTemplateId = existsTemplateIds.find((ele) => ele === template.templateCode);
        if (existTemplateId) {
            await context.operate(
                'smsTemplate',
                {
                    id: await generateNewIdAsync(),
                    action: 'update',
                    data: {
                        templateName,
                        templateContent,
                        syncAt: Date.now(),
                    },
                    filter: {
                        id: existTemplateId,
                    },
                },
                {
                    dontCollect: true,
                }
            )
        } else {
            await context.operate(
                'smsTemplate',
                {
                    id: await generateNewIdAsync(),
                    action: 'create',
                    data: {
                        id: await generateNewIdAsync(),
                        origin,
                        systemId,
                        templateCode,
                        templateName,
                        templateContent,
                        syncAt: Date.now(),
                    },
                },
                {
                    dontCollect: true,
                }
            )
        }
    }
    // if (removeTemplateList.length > 0) {
    //     await context.operate(
    //         'smsTemplate',
    //         {
    //             id: await generateNewIdAsync(),
    //             action: 'remove',
    //             data: {},
    //             filter: {
    //                 id: {
    //                     $in: removeTemplateList.map((ele) => ele.id!),
    //                 },
    //             },
    //         },
    //         {}
    //     );
    // }
}
