import { WechatSDK, } from 'oak-external-sdk';
import { assert } from 'oak-domain/lib/utils/assert';
async function getWechatPublicConfig(applicationId, context) {
    const [application] = await context.select('application', {
        data: {
            id: 1,
            config: 1,
            type: 1,
        },
        filter: {
            id: applicationId,
        },
    }, {
        dontCollect: true
    });
    return application;
}
export async function createTag(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.createTag({ name: params.name });
    return result;
}
export async function getTags(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.getTags();
    return result;
}
export async function editTag(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.editTag({ id: params.id, name: params.name });
    return result;
}
export async function deleteTag(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.deleteTag({ id: params.id });
    return result;
}
