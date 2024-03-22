import WechatSDK from 'oak-external-sdk/lib/WechatSDK';
import { assert } from 'oak-domain/lib/utils/assert';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
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
        dontCollect: true,
    });
    return application;
}
export async function getCurrentMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    assert(application);
    const { type, config } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    try {
        const result = await wechatInstance.getCurrentMenu();
        return result;
    }
    catch (e) {
        throw e;
    }
}
export async function getMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    assert(application);
    const { type, config } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    try {
        const result = await wechatInstance.getMenu();
        return result;
    }
    catch (e) {
        throw e;
    }
}
export async function createMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    assert(application);
    const { type, config } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    try {
        const result = await wechatInstance.createMenu(params.menuConfig);
        await context.operate('wechatMenu', {
            id: await generateNewIdAsync(),
            action: 'update',
            data: {
                iState: 'success',
            },
            filter: {
                id: params.id,
            },
        }, {});
    }
    catch (e) {
        await context.operate('wechatMenu', {
            id: await generateNewIdAsync(),
            action: 'update',
            data: {
                iState: 'fail',
            },
            filter: {
                id: params.id,
            },
        }, {});
        throw e;
    }
}
export async function createConditionalMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    assert(application);
    const { type, config } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    try {
        const result = await wechatInstance.createConditionalMenu(params.menuConfig);
        await context.operate('wechatMenu', {
            id: await generateNewIdAsync(),
            action: 'update',
            data: {
                iState: 'success',
                menuId: result.menuid,
            },
            filter: {
                id: params.id,
            },
        }, {});
    }
    catch (e) {
        await context.operate('wechatMenu', {
            id: await generateNewIdAsync(),
            action: 'update',
            data: {
                iState: 'fail',
            },
            filter: {
                id: params.id,
            },
        }, {});
        throw e;
    }
}
export async function deleteConditionalMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    assert(application);
    const { type, config } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.deleteConditionalMenu(params.menuId);
    return result;
}
export async function deleteMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    assert(application);
    const { type, config } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.deleteMenu();
    return result;
}
