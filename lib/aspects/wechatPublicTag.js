"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneKeySync = exports.syncTag = exports.deleteTag = exports.editTag = exports.getTags = exports.createTag = void 0;
const tslib_1 = require("tslib");
const WechatSDK_1 = tslib_1.__importDefault(require("oak-external-sdk/lib/WechatSDK"));
const assert_1 = require("oak-domain/lib/utils/assert");
const types_1 = require("oak-domain/lib/types");
const uuid_1 = require("oak-domain/lib/utils/uuid");
const wechatPublicException_1 = require("../utils/wechatPublicException");
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
async function getWechatPublicTags(applicationId, context) {
    const wechatPublicTags = await context.select('wechatPublicTag', {
        data: {
            id: 1,
            wechatId: 1,
            applicationId: 1,
        },
        filter: {
            applicationId,
        },
    }, {
        dontCollect: true
    });
    return wechatPublicTags;
}
async function getWechatPublicTagById(applicationId, id, context) {
    const [wechatPublicTag] = await context.select('wechatPublicTag', {
        data: {
            id: 1,
            wechatId: 1,
            text: 1,
            applicationId: 1,
        },
        filter: {
            id,
            applicationId,
        },
    }, {
        dontCollect: true
    });
    return wechatPublicTag;
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
    const wechatInstance = WechatSDK_1.default.getInstance(appId, type, appSecret);
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
    const wechatInstance = WechatSDK_1.default.getInstance(appId, type, appSecret);
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
    const wechatInstance = WechatSDK_1.default.getInstance(appId, type, appSecret);
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
    const wechatInstance = WechatSDK_1.default.getInstance(appId, type, appSecret);
    const result = await wechatInstance.deleteTag({ id: params.wechatId });
    return result;
}
exports.deleteTag = deleteTag;
async function syncTag(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config, systemId } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    const wechatPublicTag = await getWechatPublicTagById(params.applicationId, params.id, context);
    (0, assert_1.assert)(wechatPublicTag);
    try {
        const { tags } = await getTags({
            applicationId: params.applicationId
        }, context);
        if (!wechatPublicTag.wechatId) {
            const result = await createTag({
                applicationId: params.applicationId,
                name: wechatPublicTag.text,
            }, context);
            await context.operate('wechatPublicTag', {
                id: await (0, uuid_1.generateNewIdAsync)(),
                action: 'update',
                data: {
                    syncAt: Date.now(),
                    sync: true,
                    iState: 'success',
                    wechatId: result.tag.id
                },
                filter: {
                    id: params.id,
                }
            }, {});
        }
        if (wechatPublicTag.wechatId && tags.find((ele) => ele.id === wechatPublicTag.wechatId && ele.name !== wechatPublicTag.text)) {
            const result = await editTag({
                applicationId: params.applicationId,
                id: wechatPublicTag.wechatId,
                name: wechatPublicTag.text,
            }, context);
            await context.operate('wechatPublicTag', {
                id: await (0, uuid_1.generateNewIdAsync)(),
                action: 'update',
                data: {
                    syncAt: Date.now(),
                    sync: true,
                    iState: 'success',
                },
                filter: {
                    id: params.id,
                }
            }, {});
        }
        if (wechatPublicTag.wechatId && tags.find((ele) => ele.id === wechatPublicTag.wechatId && ele.name === wechatPublicTag.text)) {
            const result = await deleteTag({
                applicationId: params.applicationId,
                id: wechatPublicTag.id,
                wechatId: wechatPublicTag.wechatId,
            }, context);
            await context.operate('wechatPublicTag', {
                id: await (0, uuid_1.generateNewIdAsync)(),
                action: 'remove',
                data: {},
                filter: {
                    id: params.id,
                }
            }, {});
        }
    }
    catch (e) {
        await context.operate('wechatPublicTag', {
            id: await (0, uuid_1.generateNewIdAsync)(),
            action: 'update',
            data: {
                sync: false,
                iState: 'fail',
            },
            filter: {
                id: params.id,
            }
        }, {});
        throw new types_1.OakPreConditionUnsetException(`${(0, wechatPublicException_1.handleException)(e)}`);
    }
}
exports.syncTag = syncTag;
async function oneKeySync(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    (0, assert_1.assert)(application);
    const { type, config, systemId } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    const wechatPublicTags = await getWechatPublicTags(params.applicationId, context);
    try {
        const tags = await getTags(params, context);
        if (wechatPublicTags && wechatPublicTags.length > 0) {
            const tagsToAdd = tags.tags?.filter((ele) => {
                return !wechatPublicTags.some(item => item?.wechatId === ele.id);
            });
            const tagsToRemove = tags.tags?.length ? wechatPublicTags.filter((ele) => {
                return !tags.tags?.some((item) => item.id === ele?.wechatId);
            }) : wechatPublicTags;
            tagsToAdd?.map(async (ele) => {
                await context.operate('wechatPublicTag', {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    action: 'create',
                    data: {
                        id: await (0, uuid_1.generateNewIdAsync)(),
                        applicationId: params.applicationId,
                        wechatId: ele.id,
                        text: ele.name,
                        sync: true,
                        syncAt: Date.now(),
                        iState: 'success',
                    },
                }, {});
            });
            tagsToRemove?.map(async (ele) => {
                await context.operate('wechatPublicTag', {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    action: 'remove',
                    data: {},
                    filter: {
                        id: ele.id
                    }
                }, {});
            });
            wechatPublicTags?.map(async (ele) => {
                await context.operate('wechatPublicTag', {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    action: 'update',
                    data: {
                        syncAt: Date.now(),
                        sync: true,
                        iState: 'success'
                    },
                    filter: {
                        id: ele.id
                    }
                }, {});
            });
        }
        else {
            tags.tags?.map(async (ele) => {
                await context.operate('wechatPublicTag', {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    action: 'create',
                    data: {
                        id: await (0, uuid_1.generateNewIdAsync)(),
                        applicationId: params.applicationId,
                        wechatId: ele.id,
                        text: ele.name,
                        sync: true,
                        syncAt: Date.now(),
                        iState: 'success',
                    },
                }, {});
            });
        }
    }
    catch (e) {
        throw new types_1.OakPreConditionUnsetException(`${(0, wechatPublicException_1.handleException)(e)}`);
    }
}
exports.oneKeySync = oneKeySync;
