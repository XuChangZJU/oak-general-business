import { WechatSDK, } from 'oak-external-sdk';
async function getWechatPublicConfig(applicationId, context) {
    const [application] = await context.select('application', {
        data: {
            id: 1,
            config: 1,
            type: 1,
        },
        filter: {
            id: applicationId,
            type: 'wechatPublic'
        },
    }, {
        dontCollect: true
    });
    return application;
}
export async function getCurrentMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    if (application) {
        const { type, config, systemId } = application;
        let appId, appSecret;
        const config2 = config;
        appId = config2.appId;
        appSecret = config2.appSecret;
        const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
        const result = await wechatInstance.getCurrentMenu();
        return result;
    }
}
export async function getMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    if (application) {
        const { type, config, systemId } = application;
        let appId, appSecret;
        const config2 = config;
        appId = config2.appId;
        appSecret = config2.appSecret;
        const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
        const result = await wechatInstance.getMenu();
        return result;
    }
}
export async function createMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    if (application) {
        const { type, config, systemId } = application;
        let appId, appSecret;
        const config2 = config;
        appId = config2.appId;
        appSecret = config2.appSecret;
        const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
        const result = await wechatInstance.createMenu(params.menuConfig);
        return result;
    }
}
export async function createConditionalMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    if (application) {
        const { type, config, systemId } = application;
        let appId, appSecret;
        const config2 = config;
        appId = config2.appId;
        appSecret = config2.appSecret;
        const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
        const result = await wechatInstance.createConditionalMenu(params.menuConfig);
        return result;
    }
}
export async function deleteConditionalMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    if (application) {
        const { type, config, systemId } = application;
        let appId, appSecret;
        const config2 = config;
        appId = config2.appId;
        appSecret = config2.appSecret;
        const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
        const result = await wechatInstance.deleteConditionalMenu(params.menuid);
        return result;
    }
}
export async function batchGetArticle(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    if (application) {
        const { type, config, systemId } = application;
        let appId, appSecret;
        const config2 = config;
        appId = config2.appId;
        appSecret = config2.appSecret;
        const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
        const result = await wechatInstance.batchGetArticle(params);
        return result;
    }
}
export async function getArticle(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    if (application) {
        const { type, config, systemId } = application;
        let appId, appSecret;
        const config2 = config;
        appId = config2.appId;
        appSecret = config2.appSecret;
        const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
        const result = await wechatInstance.getArticle(params);
        return result;
    }
}
export async function createMaterial(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    if (application) {
        const { type, config, systemId } = application;
        let appId, appSecret;
        const config2 = config;
        appId = config2.appId;
        appSecret = config2.appSecret;
        const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
        const result = await wechatInstance.createMaterial(params);
        return result;
    }
}
export async function batchGetMaterialList(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    if (application) {
        const { type, config, systemId } = application;
        let appId, appSecret;
        const config2 = config;
        appId = config2.appId;
        appSecret = config2.appSecret;
        const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
        const result = await wechatInstance.batchGetMaterialList(params);
        return result;
    }
}
export async function getMaterial(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    if (application) {
        const { type, config, systemId } = application;
        let appId, appSecret;
        const config2 = config;
        appId = config2.appId;
        appSecret = config2.appSecret;
        const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
        const result = await wechatInstance.getMaterial(params);
        return result;
    }
}
