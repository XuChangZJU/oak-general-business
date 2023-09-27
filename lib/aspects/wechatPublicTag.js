"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTag = exports.editTag = exports.getTags = exports.createTag = void 0;
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
async function createTag(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config, systemId } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.createTag({ name: params.name });
    return result;
}
exports.createTag = createTag;
async function getTags(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config, systemId } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.getTags();
    return result;
}
exports.getTags = getTags;
async function editTag(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config, systemId } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.editTag({ id: params.id, name: params.name });
    return result;
}
exports.editTag = editTag;
async function deleteTag(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config, systemId } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.deleteTag({ id: params.id });
    return result;
}
exports.deleteTag = deleteTag;
