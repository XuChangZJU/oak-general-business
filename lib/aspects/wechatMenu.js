"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaterial = exports.batchGetMaterialList = exports.getArticle = exports.batchGetArticle = exports.deleteMenu = exports.deleteConditionalMenu = exports.createConditionalMenu = exports.createMenu = exports.getMenu = exports.getCurrentMenu = void 0;
const oak_external_sdk_1 = require("oak-external-sdk");
const assert_1 = require("oak-domain/lib/utils/assert");
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
async function getCurrentMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config, systemId } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.getCurrentMenu();
    return result;
}
exports.getCurrentMenu = getCurrentMenu;
async function getMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config, systemId } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.getMenu();
    return result;
}
exports.getMenu = getMenu;
async function createMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config, systemId } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.createMenu(params.menuConfig);
    return result;
}
exports.createMenu = createMenu;
async function createConditionalMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config, systemId } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.createConditionalMenu(params.menuConfig);
    return result;
}
exports.createConditionalMenu = createConditionalMenu;
async function deleteConditionalMenu(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config, systemId } = application;
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
    const { type, config, systemId } = application;
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
async function batchGetArticle(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config, systemId } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.batchGetArticle(params);
    return result;
}
exports.batchGetArticle = batchGetArticle;
async function getArticle(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config, systemId } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.getArticle({
        articleId: params.articleId,
    });
    return result;
}
exports.getArticle = getArticle;
async function batchGetMaterialList(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config, systemId } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.batchGetMaterialList(params);
    return result;
}
exports.batchGetMaterialList = batchGetMaterialList;
async function getMaterial(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config, systemId } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.getMaterial({
        mediaId: params.mediaId,
    });
    return result;
}
exports.getMaterial = getMaterial;
