"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenu = exports.deleteConditionalMenu = exports.createConditionalMenu = exports.createMenu = exports.getMenu = exports.getCurrentMenu = void 0;
const oak_external_sdk_1 = require("oak-external-sdk");
const assert_1 = require("oak-domain/lib/utils/assert");
const uuid_1 = require("oak-domain/lib/utils/uuid");
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
async function getCurrentMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    try {
        const result = await wechatInstance.getCurrentMenu();
        return result;
    }
    catch (e) {
        throw e;
    }
}
exports.getCurrentMenu = getCurrentMenu;
async function getMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    try {
        const result = await wechatInstance.getMenu();
        return result;
    }
    catch (e) {
        throw e;
    }
}
exports.getMenu = getMenu;
async function createMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    try {
        const result = await wechatInstance.createMenu(params.menuConfig);
        await context.operate('wechatMenu', {
            id: await (0, uuid_1.generateNewIdAsync)(),
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
            id: await (0, uuid_1.generateNewIdAsync)(),
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
exports.createMenu = createMenu;
async function createConditionalMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    try {
        const result = await wechatInstance.createConditionalMenu(params.menuConfig);
        await context.operate('wechatMenu', {
            id: await (0, uuid_1.generateNewIdAsync)(),
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
            id: await (0, uuid_1.generateNewIdAsync)(),
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
exports.createConditionalMenu = createConditionalMenu;
async function deleteConditionalMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.deleteConditionalMenu(params.menuId);
    return result;
}
exports.deleteConditionalMenu = deleteConditionalMenu;
async function deleteMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.deleteMenu();
    return result;
}
exports.deleteMenu = deleteMenu;
