import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { EntityDict } from '../oak-app-domain';
import { assert } from 'oak-domain/lib/utils/assert';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import  WechatSDK, { WechatMpInstance, WechatPublicInstance } from 'oak-external-sdk/lib/WechatSDK';

import { WechatPublicConfig } from '../oak-app-domain/Application/Schema';
import { template } from 'oak-domain/lib/utils/string';

import { uniq } from 'oak-domain/lib/utils/lodash';

let messageTypes = [] as string[];

export function registerMessageType(messageType: string[]) {
    let messageTypes2 = messageTypes.concat(messageType);
    messageTypes = uniq(messageTypes2);
}

export async function getMessageType() {
    return messageTypes;
}


function analyseContent(content: string): Object {
    let content2 = content;
    let result = {};
    let pos1 = content2.indexOf('：');
    while (pos1 !== -1) {
        let prefix = content2.slice(0, pos1);
        let suffix = content2.slice(pos1 + 1);
        let keyNameStart = prefix.lastIndexOf('}}');
        let keyName = prefix
            .slice(keyNameStart === -1 ? 0 : keyNameStart + 2)
            .trim();
        let valueNameStart = suffix.indexOf('{{');
        let valueNameEnd = suffix.indexOf('.');
        let valueName = suffix.slice(valueNameStart + 2, valueNameEnd).trim();
        Object.assign(result, {
            [keyName]: valueName,
        });
        let nextStart = suffix.indexOf('}}');
        content2 = suffix.slice(nextStart + 2);
        pos1 = content2.indexOf('：');
    }
    return result;
}
export async function syncMessageTemplate<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string;
    },
    context: Cxt
) {
    const applicationId = params?.applicationId;
    const [application] = await context.select(
        'application',
        {
            data: {
                id: 1,
                systemId: 1,
                type: 1,
                config: 1,
            },
            filter: {
                id: applicationId,
            },
        },
        {}
    );
    const { type, config } = application!;

    assert(['wechatPublic', 'wechatMp'].includes(type!), '当前只支持微信公众号和小程序的消息配置');
    let template_list = [];
    if (type === 'wechatPublic') {
        let appId: string, appSecret: string;
        const config2 = config as WechatPublicConfig;
        appId = config2.appId;
        appSecret = config2.appSecret;
        const wechatPublicInstance = WechatSDK.getInstance(
            appId,
            'wechatPublic',
            appSecret
        ) as WechatPublicInstance;
        const publicTemplateList = await wechatPublicInstance.getAllPrivateTemplate();
        template_list = publicTemplateList.map(
            (ele) => {
                return {
                    wechatId: ele.template_id,
                    title: ele.title,
                    primaryIndustry: ele.primary_industry,
                    deputyIndustry: ele.deputy_industry,
                    content: ele.content,
                    example: ele.example,
                }
            }
        );
    } else {
        let appId: string, appSecret: string;
        const config2 = config as WechatPublicConfig;
        appId = config2.appId;
        appSecret = config2.appSecret;
        const wechatMpInstance = WechatSDK.getInstance(
            appId,
            'wechatMp',
            appSecret
        ) as WechatMpInstance;
        const mpTemplateList = await wechatMpInstance.getAllPrivateTemplate();
        template_list = mpTemplateList.map(
            (ele) => {
                return {
                    wechatId: ele.priTmplId,
                    title: ele.title,
                    type: ele.type.toString(),
                    content: ele.content,
                    example: ele.example,
                    keywordEnumValueList: ele.keywordEnumValueList || [],
                }
            }
        )
    }

    const WechatTemplateList = await context.select(
        'wechatTemplate',
        {
            data: {
                id: 1,
                wechatId: 1,
            },
            filter: {
                applicationId,
            },
        },
        {}
    );
    const existsTemplateIds = WechatTemplateList.map(
        (ele) => ele.wechatId
    );
    const newTemplateList = template_list.filter(
        (ele) => !existsTemplateIds.includes(ele.wechatId)
    );
    const newTemplateIds = template_list.map((ele) => ele.wechatId);
    const removeTemplateList = WechatTemplateList.filter(
        (ele) => !newTemplateIds.includes(ele.wechatId!)
    );

    for (const template of newTemplateList) {
        await context.operate(
            'wechatTemplate',
            {
                id: await generateNewIdAsync(),
                action: 'create',
                data: Object.assign({
                    id: await generateNewIdAsync(),
                    applicationId,
                    syncAt: Date.now(),

                }, template) as EntityDict['wechatTemplate']['CreateSingle']['data'],
            },
            {}
        );
    }

    if (removeTemplateList.length > 0) {
        await context.operate(
            'wechatTemplate',
            {
                id: await generateNewIdAsync(),
                action: 'remove',
                data: {},
                filter: {
                    id: {
                        $in: removeTemplateList.map((ele) => ele.id!),
                    },
                },
            },
            {}
        );
    }
    return template_list;
}
