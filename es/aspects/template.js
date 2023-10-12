import { assert } from 'oak-domain/lib/utils/assert';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { WechatSDK, } from 'oak-external-sdk';
function analyseContent(content) {
    let content2 = content;
    let result = {};
    let pos1 = content2.indexOf('：');
    while (pos1 !== -1) {
        let prefix = content2.slice(0, pos1);
        let suffix = content2.slice(pos1 + 1);
        let keyNameStart = prefix.lastIndexOf('}}');
        let keyName = (prefix.slice(keyNameStart === -1 ? 0 : keyNameStart + 2)).trim();
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
export async function syncMessageTemplate(params, context) {
    const applicationId = params?.applicationId;
    const [application] = await context.select('application', {
        data: {
            id: 1,
            systemId: 1,
            type: 1,
            config: 1,
        },
        filter: {
            id: applicationId,
        }
    }, {});
    const { type, config } = application;
    assert(type === 'wechatPublic', '当前只支持微信公众号的消息配置');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, 'wechatPublic', appSecret);
    const callbackData = await wechatInstance.getAllPrivateTemplate();
    const { template_list } = callbackData;
    const WechatPublicTemplateList = await context.select('wechatPublicTemplate', {
        data: {
            id: 1,
            wechatId: 1,
        },
        filter: {
            applicationId,
        }
    }, {});
    const existsTemplateIds = WechatPublicTemplateList.map((ele) => ele.wechatId);
    const newTemplateList = template_list.filter((ele) => !existsTemplateIds.includes(ele.template_id));
    const newTemplateIds = template_list.map(ele => ele.template_id);
    const removeTemplateList = WechatPublicTemplateList.filter(ele => !newTemplateIds.includes(ele.wechatId));
    for (const template of newTemplateList) {
        await context.operate('wechatPublicTemplate', {
            id: await generateNewIdAsync(),
            action: 'create',
            data: {
                id: await generateNewIdAsync(),
                applicationId,
                wechatId: template.template_id,
                title: template.title,
                primaryIndustry: template.primary_industry,
                deputyIndustry: template.deputy_industry,
                content: template.content,
                example: template.example,
                syncAt: Date.now(),
                param: analyseContent(template.content)
            }
        }, {});
    }
    if (removeTemplateList.length > 0) {
        await context.operate('wechatPublicTemplate', {
            id: await generateNewIdAsync(),
            action: 'remove',
            data: {},
            filter: {
                id: {
                    $in: removeTemplateList.map((ele) => ele.id)
                }
            }
        }, {});
    }
    return template_list;
}
