import { WechatSDK, } from 'oak-external-sdk';
import { handleException } from "../utils/wechatPublicException";
import { OakPreConditionUnsetException } from 'oak-domain/lib/types';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
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
async function getSubScribedUsers(applicationId, context) {
    const subscribedUsers = await context.select('wechatUser', {
        data: {
            id: 1,
            applicationId: 1,
            openId: 1,
            subscribed: 1,
            origin: 1,
        },
        filter: {
            applicationId,
            subscribed: true,
            origin: 'public'
        },
    }, {
        dontCollect: true
    });
    return subscribedUsers;
}
async function getSubScribedUserByOpenId(applicationId, openId, context) {
    const [subscribedUser] = await context.select('wechatUser', {
        data: {
            id: 1,
            applicationId: 1,
            openId: 1,
            subscribed: 1,
            origin: 1,
        },
        filter: {
            applicationId,
            subscribed: true,
            origin: 'public',
            openId,
        },
    }, {
        dontCollect: true
    });
    return subscribedUser.id;
}
async function getWechatPublicTagId(params, context) {
    const [tag] = await context.select('wechatPublicTag', {
        data: {
            id: 1,
            wechatId: 1,
            applicationId: 1,
        },
        filter: {
            applicationId: params.applicationId,
            wechatId: params.tagId
        },
    }, {
        dontCollect: true
    });
    assert(tag.id);
    return tag.id;
}
async function getUserWechatPublicTagsByOpenId(applicationId, openId, context) {
    const userWechatPublicTags = await context.select('userWechatPublicTag', {
        data: {
            id: 1,
            wechatPublicTagId: 1,
            wechatPublicTag: {
                wechatId: 1,
            },
            wechatUserId: 1,
            sync: 1,
        },
        filter: {
            wechatPublicTag: {
                applicationId,
            },
            wechatUser: {
                applicationId,
                openId: openId
            }
        },
    }, {
        dontCollect: true
    });
    return userWechatPublicTags;
}
async function getUserWechatPublicTagById(applicationId, id, context) {
    const [userWechatPublicTag] = await context.select('userWechatPublicTag', {
        data: {
            id: 1,
            wechatPublicTagId: 1,
            wechatPublicTag: {
                wechatId: 1,
            },
            wechatUserId: 1,
            sync: 1,
            iState: 1,
        },
        filter: {
            wechatPublicTag: {
                applicationId,
            },
            wechatUser: {
                applicationId,
            },
            id,
        },
    }, {
        dontCollect: true
    });
    return userWechatPublicTag;
}
export async function getTagUsers(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    try {
        const result = await wechatInstance.getTagUsers(params.tagId);
    }
    catch (e) {
        throw new OakPreConditionUnsetException(`${handleException(e)}`);
    }
}
export async function batchtagging(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.batchtagging(params.openIdList, params.tagId);
    return result;
}
export async function batchuntagging(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.batchuntagging(params.openIdList, params.tagId);
    return result;
}
export async function getUserTags(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    try {
        const result = await wechatInstance.getUserTags(params.openId);
        return result;
    }
    catch (e) {
        throw new OakPreConditionUnsetException(`${handleException(e)}`);
    }
}
export async function getUsers(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    try {
        const result = await wechatInstance.getUsers(params.nextOpenId);
        return result;
    }
    catch (e) {
        throw new OakPreConditionUnsetException(`${handleException(e)}`);
    }
}
export async function getSubscribedUserInfo(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    try {
        const userInfos = await wechatInstance.getSubscribedUserInfo(params.openId);
        return userInfos;
    }
    catch (e) {
        throw new OakPreConditionUnsetException(`${handleException(e)}`);
    }
}
export async function tagging(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    const userWechatPublicTags = await getUserWechatPublicTagsByOpenId(params.applicationId, params.openId, context);
    const tagsToAdd = userWechatPublicTags?.length > 0 ? params.tagIdList?.filter((ele) => {
        return !userWechatPublicTags.some(item => item?.wechatPublicTag.wechatId === ele);
    }) : params.tagIdList;
    const tagsToRemove = params.tagIdList?.length > 0 ? userWechatPublicTags.filter((ele) => {
        return !params.tagIdList?.some((item) => item === ele?.wechatPublicTag?.wechatId);
    }) : userWechatPublicTags;
    for (let tagId of tagsToAdd) {
        try {
            const result = await batchtagging({ applicationId: params.applicationId, openIdList: [params.openId], tagId }, context);
            await context.operate('userWechatPublicTag', {
                id: await generateNewIdAsync(),
                action: 'create',
                data: {
                    id: await generateNewIdAsync(),
                    wechatUserId: await getSubScribedUserByOpenId(params.applicationId, params.openId, context),
                    wechatPublicTagId: await getWechatPublicTagId({ applicationId: params.applicationId, tagId }, context),
                    sync: true,
                    syncAt: Date.now(),
                    iState: 'success',
                },
            }, {});
        }
        catch (e) {
            await context.operate('userWechatPublicTag', {
                id: await generateNewIdAsync(),
                action: 'create',
                data: {
                    id: await generateNewIdAsync(),
                    wechatUserId: await getSubScribedUserByOpenId(params.applicationId, params.openId, context),
                    wechatPublicTagId: await getWechatPublicTagId({ applicationId: params.applicationId, tagId }, context),
                    sync: false,
                    syncAt: Date.now(),
                    iState: 'fail',
                },
            }, {});
            throw e;
        }
    }
    for (let userWechatPublicTag of tagsToRemove) {
        try {
            const result = await batchuntagging({ applicationId: params.applicationId, openIdList: [params.openId], tagId: userWechatPublicTag.wechatPublicTag?.wechatId }, context);
            await context.operate('userWechatPublicTag', {
                id: await generateNewIdAsync(),
                action: 'remove',
                data: {},
                filter: {
                    id: userWechatPublicTag.id
                }
            }, {});
        }
        catch (e) {
            await context.operate('userWechatPublicTag', {
                id: await generateNewIdAsync(),
                action: 'update',
                data: {
                    sync: false,
                    syncAt: Date.now(),
                    iState: 'fail',
                },
                filter: {
                    id: userWechatPublicTag.id
                }
            }, {});
            throw e;
        }
    }
}
export async function syncToLocale(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    const userWechatPublicTags = await getUserWechatPublicTagsByOpenId(params.applicationId, params.openId, context);
    const { tagid_list } = await getUserTags({ applicationId: params.applicationId, openId: params.openId }, context);
    const tagsToAdd = userWechatPublicTags?.length > 0 ? tagid_list?.filter((ele) => {
        return !userWechatPublicTags.some(item => item?.wechatPublicTag.wechatId === ele);
    }) : tagid_list;
    const tagsToRemove = tagid_list?.length > 0 ? userWechatPublicTags.filter((ele) => {
        return !tagid_list?.some((item) => item === ele?.wechatPublicTag?.wechatId);
    }) : userWechatPublicTags;
    for (let tagId of tagsToAdd) {
        try {
            const result = await batchtagging({ applicationId: params.applicationId, openIdList: [params.openId], tagId }, context);
            await context.operate('userWechatPublicTag', {
                id: await generateNewIdAsync(),
                action: 'create',
                data: {
                    id: await generateNewIdAsync(),
                    wechatUserId: await getSubScribedUserByOpenId(params.applicationId, params.openId, context),
                    wechatPublicTagId: await getWechatPublicTagId({ applicationId: params.applicationId, tagId }, context),
                    sync: true,
                    syncAt: Date.now(),
                    iState: 'success',
                },
            }, {});
        }
        catch (e) {
            await context.operate('userWechatPublicTag', {
                id: await generateNewIdAsync(),
                action: 'create',
                data: {
                    id: await generateNewIdAsync(),
                    wechatUserId: await getSubScribedUserByOpenId(params.applicationId, params.openId, context),
                    wechatPublicTagId: await getWechatPublicTagId({ applicationId: params.applicationId, tagId }, context),
                    sync: false,
                    syncAt: Date.now(),
                    iState: 'fail',
                },
            }, {});
            throw e;
        }
    }
    for (let userWechatPublicTag of tagsToRemove) {
        try {
            const result = await batchuntagging({ applicationId: params.applicationId, openIdList: [params.openId], tagId: userWechatPublicTag.wechatPublicTag?.wechatId }, context);
            await context.operate('userWechatPublicTag', {
                id: await generateNewIdAsync(),
                action: 'remove',
                data: {},
                filter: {
                    id: userWechatPublicTag.id
                }
            }, {});
        }
        catch (e) {
            await context.operate('userWechatPublicTag', {
                id: await generateNewIdAsync(),
                action: 'update',
                data: {
                    sync: false,
                    syncAt: Date.now(),
                    iState: 'fail',
                },
                filter: {
                    id: userWechatPublicTag.id
                }
            }, {});
            throw e;
        }
    }
}
export async function syncToWechat(params, context) {
    const application = await getWechatPublicConfig(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    const userWechatPublicTag = await getUserWechatPublicTagById(params.applicationId, params.id, context);
    const { tagid_list } = await getUserTags({ applicationId: params.applicationId, openId: params.openId }, context);
    if (tagid_list?.find((ele) => ele === userWechatPublicTag.wechatPublicTag?.wechatId) && userWechatPublicTag.iState === 'fail') {
        try {
            const result = await batchuntagging({ applicationId: params.applicationId, openIdList: [params.openId], tagId: userWechatPublicTag.wechatPublicTag?.wechatId }, context);
            await context.operate('userWechatPublicTag', {
                id: await generateNewIdAsync(),
                action: 'remove',
                data: {},
                filter: {
                    id: userWechatPublicTag.id
                }
            }, {});
        }
        catch (e) {
            throw new OakPreConditionUnsetException(`${handleException(e)}`);
        }
    }
    if (!tagid_list?.find((ele) => ele === userWechatPublicTag.wechatPublicTag?.wechatId) && userWechatPublicTag.iState === 'fail') {
        try {
            const result = await batchtagging({ applicationId: params.applicationId, openIdList: [params.openId], tagId: userWechatPublicTag.wechatPublicTag?.wechatId }, context);
            await context.operate('userWechatPublicTag', {
                id: await generateNewIdAsync(),
                action: 'update',
                data: {
                    sync: true,
                    syncAt: Date.now(),
                    iState: 'success',
                },
                filter: {
                    id: params.id
                }
            }, {});
        }
        catch (e) {
            throw new OakPreConditionUnsetException(`${handleException(e)}`);
        }
    }
    if (tagid_list?.find((ele) => ele === userWechatPublicTag.wechatPublicTag?.wechatId) && userWechatPublicTag.iState === 'success') {
        await context.operate('userWechatPublicTag', {
            id: await generateNewIdAsync(),
            action: 'update',
            data: {
                sync: true,
                syncAt: Date.now(),
                iState: 'success',
            },
            filter: {
                id: params.id
            }
        }, {});
    }
}
