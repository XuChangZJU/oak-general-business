"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncMessageTemplate = exports.getMessageType = exports.registerMessageType = void 0;
const assert_1 = require("oak-domain/lib/utils/assert");
const uuid_1 = require("oak-domain/lib/utils/uuid");
const oak_external_sdk_1 = require("oak-external-sdk");
const lodash_1 = require("oak-domain/lib/utils/lodash");
let messageTypes = [];
function registerMessageType(messageType) {
    let messageTypes2 = messageTypes.concat(messageType);
    messageTypes = (0, lodash_1.uniq)(messageTypes2);
}
exports.registerMessageType = registerMessageType;
async function getMessageType() {
    return messageTypes;
}
exports.getMessageType = getMessageType;
function analyseContent(content) {
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
async function syncMessageTemplate(params, context) {
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
        },
    }, {});
    const { type, config } = application;
    (0, assert_1.assert)(['wechatPublic', 'wechatMp'].includes(type), '当前只支持微信公众号和小程序的消息配置');
    let template_list = [];
    if (type === 'wechatPublic') {
        let appId, appSecret;
        const config2 = config;
        appId = config2.appId;
        appSecret = config2.appSecret;
        const wechatPublicInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, 'wechatPublic', appSecret);
        const publicTemplateList = await wechatPublicInstance.getAllPrivateTemplate();
        template_list = publicTemplateList.map((ele) => {
            return {
                wechatId: ele.template_id,
                title: ele.title,
                primaryIndustry: ele.primary_industry,
                deputyIndustry: ele.deputy_industry,
                content: ele.content,
                example: ele.example,
            };
        });
    }
    else {
        let appId, appSecret;
        const config2 = config;
        appId = config2.appId;
        appSecret = config2.appSecret;
        const wechatMpInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, 'wechatMp', appSecret);
        const mpTemplateList = await wechatMpInstance.getAllPrivateTemplate();
        template_list = mpTemplateList.map((ele) => {
            return {
                wechatId: ele.priTmplId,
                title: ele.title,
                type: ele.type.toString(),
                content: ele.content,
                example: ele.example,
                keywordEnumValueList: ele.keywordEnumValueList || [],
            };
        });
    }
    const WechatTemplateList = await context.select('wechatTemplate', {
        data: {
            id: 1,
            wechatId: 1,
        },
        filter: {
            applicationId,
        },
    }, {});
    const existsTemplateIds = WechatTemplateList.map((ele) => ele.wechatId);
    const newTemplateList = template_list.filter((ele) => !existsTemplateIds.includes(ele.wechatId));
    const newTemplateIds = template_list.map((ele) => ele.wechatId);
    const removeTemplateList = WechatTemplateList.filter((ele) => !newTemplateIds.includes(ele.wechatId));
    for (const template of newTemplateList) {
        await context.operate('wechatTemplate', {
            id: await (0, uuid_1.generateNewIdAsync)(),
            action: 'create',
            data: Object.assign({
                id: await (0, uuid_1.generateNewIdAsync)(),
                applicationId,
                syncAt: Date.now(),
            }, template),
        }, {});
    }
    if (removeTemplateList.length > 0) {
        await context.operate('wechatTemplate', {
            id: await (0, uuid_1.generateNewIdAsync)(),
            action: 'remove',
            data: {},
            filter: {
                id: {
                    $in: removeTemplateList.map((ele) => ele.id),
                },
            },
        }, {});
    }
    return template_list;
}
exports.syncMessageTemplate = syncMessageTemplate;
