import {
    WechatMpInstance,
    WechatPublicInstance,
    WechatSDK,
} from 'oak-external-sdk';
import { handleException } from "../utils/wechatPublicException";
import { EntityDict } from "../oak-app-domain";
import { AppType, WechatPublicConfig } from "../oak-app-domain/Application/Schema";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { OakPreConditionUnsetException, OakUserException } from 'oak-domain/lib/types';

import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import assert from "assert";
import { User } from '../types/WeChat';

async function getWechatPublicConfig<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    applicationId: string,
    context: Cxt
) {
    const [application] = await context.select(
        'application',
        {
            data: {
                id: 1,
                config: 1,
                type: 1,
            },
            filter: {
                id: applicationId,
            },
        },
        {
            dontCollect: true
        }
    );
    return application;
}

async function getSubScribedUsers<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    applicationId: string,
    context: Cxt
) {
    const subscribedUsers = await context.select(
        'wechatUser',
        {
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
        },
        {
            dontCollect: true
        }
    );
    return subscribedUsers;
}

async function getSubScribedUserByOpenId<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    applicationId: string,
    openId: string,
    context: Cxt
) {
    const [subscribedUser] = await context.select(
        'wechatUser',
        {
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
        },
        {
            dontCollect: true
        }
    );
    return subscribedUser.id;
}

async function getWechatPublicTagId<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        tagId: number,
    },
    context: Cxt,
) {
    const [tag] = await context.select(
        'wechatPublicTag',
        {
            data: {
                id: 1,
                wechatId: 1,
                applicationId: 1,
            },
            filter: {
                applicationId: params.applicationId,
                wechatId: params.tagId
            },
        },
        {
            dontCollect: true
        }
    );
    return tag.id || null;
}

async function getUserWechatPublicTagsByOpenId<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    applicationId: string,
    openId: string,
    context: Cxt,
) {
    const userWechatPublicTags = await context.select(
        'userWechatPublicTag',
        {
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
        },
        {
            dontCollect: true
        }
    );
    return userWechatPublicTags
}

async function getUserWechatPublicTagById<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    applicationId: string,
    id: string,
    context: Cxt,
) {
    const [userWechatPublicTag] = await context.select(
        'userWechatPublicTag',
        {
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
        },
        {
            dontCollect: true
        }
    );
    return userWechatPublicTag
}

export async function getTagUsers<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        tagId: number,
    },
    context: Cxt,
): Promise<any> {
    const application = await getWechatPublicConfig<
        ED,
        Cxt
    >(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application!;
    assert(type === 'wechatPublic')
    let appId: string, appSecret: string;
    const config2 = config as WechatPublicConfig;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(
        appId!,
        type!,
        appSecret!
    ) as WechatPublicInstance;
    try {
        const result = await wechatInstance.getTagUsers(params.tagId);

    } catch (e) {
        throw new OakPreConditionUnsetException(`${handleException(e as string)}`)
    }
}

export async function batchtagging<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        openIdList: string[],
        tagId: number,
    },
    context: Cxt,
): Promise<any> {
    const application = await getWechatPublicConfig<
        ED,
        Cxt
    >(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application!;
    assert(type === 'wechatPublic')
    let appId: string, appSecret: string;
    const config2 = config as WechatPublicConfig;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(
        appId!,
        type!,
        appSecret!
    ) as WechatPublicInstance;
    const result = await wechatInstance.batchtagging(params.openIdList, params.tagId);
    return result;
}

export async function batchuntagging<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        openIdList: string[],
        tagId: number,
    },
    context: Cxt,
): Promise<any> {
    const application = await getWechatPublicConfig<
        ED,
        Cxt
    >(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application!;
    assert(type === 'wechatPublic')
    let appId: string, appSecret: string;
    const config2 = config as WechatPublicConfig;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(
        appId!,
        type!,
        appSecret!
    ) as WechatPublicInstance;
    const result = await wechatInstance.batchuntagging(params.openIdList, params.tagId);
    return result;
}

export async function getUserTags<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        openId: string,
    },
    context: Cxt,
): Promise<any> {
    const application = await getWechatPublicConfig<
        ED,
        Cxt
    >(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application!;
    assert(type === 'wechatPublic')
    let appId: string, appSecret: string;
    const config2 = config as WechatPublicConfig;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(
        appId!,
        type!,
        appSecret!
    ) as WechatPublicInstance;
    try {
        const result = await wechatInstance.getUserTags(params.openId);
        return result;
    } catch (e) {
        throw new OakPreConditionUnsetException(`${handleException(e as string)}`)
    }
}

export async function getUsers<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        nextOpenId: string,
    },
    context: Cxt,
): Promise<any> {
    const application = await getWechatPublicConfig<
        ED,
        Cxt
    >(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application!;
    assert(type === 'wechatPublic')
    let appId: string, appSecret: string;
    const config2 = config as WechatPublicConfig;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(
        appId!,
        type!,
        appSecret!
    ) as WechatPublicInstance;
    try {
        const result = await wechatInstance.getUsers(params.nextOpenId);
        return result;
    } catch (e) {
        throw new OakPreConditionUnsetException(`${handleException(e as string)}`);
    }
}

export async function getSubscribedUserInfo<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        openId: string,
    },
    context: Cxt,
): Promise<any> {
    const application = await getWechatPublicConfig<
        ED,
        Cxt
    >(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application!;
    assert(type === 'wechatPublic')
    let appId: string, appSecret: string;
    const config2 = config as WechatPublicConfig;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(
        appId!,
        type!,
        appSecret!
    ) as WechatPublicInstance;
    try {
        const userInfos = await wechatInstance.getSubscribedUserInfo(params.openId);
        return userInfos
    } catch (e) {
        throw new OakPreConditionUnsetException(`${handleException(e as string)}`);
    }
}

export async function tagging<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        openId: string,
        tagIdList: number[],
    },
    context: Cxt
): Promise<any> {
    const application = await getWechatPublicConfig<
        ED,
        Cxt
    >(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application!;
    assert(type === 'wechatPublic')
    let appId: string, appSecret: string;
    const config2 = config as WechatPublicConfig;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(
        appId!,
        type!,
        appSecret!
    ) as WechatPublicInstance;
    const userWechatPublicTags = await getUserWechatPublicTagsByOpenId<ED, Cxt>(params.applicationId, params.openId!, context);
    const tagsToAdd = userWechatPublicTags?.length > 0 ? params.tagIdList?.filter((ele: number) => {
        return !userWechatPublicTags.some(item => item?.wechatPublicTag!.wechatId === ele)
    }) : params.tagIdList;
    const tagsToRemove = params.tagIdList?.length > 0 ? userWechatPublicTags.filter((ele) => {
        return !params.tagIdList?.some((item: number) => item === ele?.wechatPublicTag?.wechatId);
    }) : userWechatPublicTags;
    for (let tagId of tagsToAdd) {
        try {
            const result = await batchtagging<ED, Cxt>({ applicationId: params.applicationId!, openIdList: [params.openId], tagId }, context);
            await context.operate(
                'userWechatPublicTag',
                {
                    id: await generateNewIdAsync(),
                    action: 'create',
                    data: {
                        id: await generateNewIdAsync(),
                        wechatUserId: await getSubScribedUserByOpenId<ED, Cxt>(params.applicationId, params.openId, context),
                        wechatPublicTagId: await getWechatPublicTagId<ED, Cxt>({ applicationId: params.applicationId, tagId }, context),
                        sync: true,
                        syncAt: Date.now(),
                        iState: 'success',
                    },
                },
                {}
            );
        } catch (e) {
            await context.operate(
                'userWechatPublicTag',
                {
                    id: await generateNewIdAsync(),
                    action: 'create',
                    data: {
                        id: await generateNewIdAsync(),
                        wechatUserId: await getSubScribedUserByOpenId<ED, Cxt>(params.applicationId, params.openId, context),
                        wechatPublicTagId: await getWechatPublicTagId<ED, Cxt>({ applicationId: params.applicationId, tagId }, context),
                        sync: false,
                        syncAt: Date.now(),
                        iState: 'fail',
                    },
                },
                {}
            );
            throw e
        }
    }
    for (let userWechatPublicTag of tagsToRemove) {
        try {
            const result = await batchuntagging<ED, Cxt>({ applicationId: params.applicationId!, openIdList: [params.openId], tagId: userWechatPublicTag.wechatPublicTag?.wechatId! }, context);
            await context.operate(
                'userWechatPublicTag',
                {
                    id: await generateNewIdAsync(),
                    action: 'remove',
                    data: {
                    },
                    filter: {
                        id: userWechatPublicTag.id
                    }
                },
                {}
            );
        } catch (e) {
            await context.operate(
                'userWechatPublicTag',
                {
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
                },
                {}
            );
            throw e
        }
    }
}

export async function syncToLocale<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        openId: string,
    },
    context: Cxt
): Promise<any> {
    const application = await getWechatPublicConfig<
        ED,
        Cxt
    >(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application!;
    assert(type === 'wechatPublic')
    let appId: string, appSecret: string;
    const config2 = config as WechatPublicConfig;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(
        appId!,
        type!,
        appSecret!
    ) as WechatPublicInstance;
    const userWechatPublicTags = await getUserWechatPublicTagsByOpenId<ED, Cxt>(params.applicationId, params.openId!, context);
    const { tagid_list } = await getUserTags<ED, Cxt>({ applicationId: params.applicationId!, openId: params.openId! }, context);
    const tagsToAdd = userWechatPublicTags?.length > 0 ? tagid_list?.filter((ele: number) => {
        return !userWechatPublicTags.some(item => item?.wechatPublicTag!.wechatId === ele)
    }) : tagid_list;
    const tagsToRemove = tagid_list?.length > 0 ? userWechatPublicTags.filter((ele) => {
        return !tagid_list?.some((item: number) => item === ele?.wechatPublicTag?.wechatId);
    }) : userWechatPublicTags;
    for (let tagId of tagsToAdd) {
        try {
            const result = await batchtagging<ED, Cxt>({ applicationId: params.applicationId!, openIdList: [params.openId], tagId }, context);
            await context.operate(
                'userWechatPublicTag',
                {
                    id: await generateNewIdAsync(),
                    action: 'create',
                    data: {
                        id: await generateNewIdAsync(),
                        wechatUserId: await getSubScribedUserByOpenId<ED, Cxt>(params.applicationId, params.openId, context),
                        wechatPublicTagId: await getWechatPublicTagId<ED, Cxt>({ applicationId: params.applicationId, tagId }, context),
                        sync: true,
                        syncAt: Date.now(),
                        iState: 'success',
                    },
                },
                {}
            );
        } catch (e) {
            await context.operate(
                'userWechatPublicTag',
                {
                    id: await generateNewIdAsync(),
                    action: 'create',
                    data: {
                        id: await generateNewIdAsync(),
                        wechatUserId: await getSubScribedUserByOpenId<ED, Cxt>(params.applicationId, params.openId, context),
                        wechatPublicTagId: await getWechatPublicTagId<ED, Cxt>({ applicationId: params.applicationId, tagId }, context),
                        sync: false,
                        syncAt: Date.now(),
                        iState: 'fail',
                    },
                },
                {}
            );
            throw e
        }
    }
    for (let userWechatPublicTag of tagsToRemove) {
        try {
            const result = await batchuntagging<ED, Cxt>({ applicationId: params.applicationId!, openIdList: [params.openId], tagId: userWechatPublicTag.wechatPublicTag?.wechatId! }, context);
            await context.operate(
                'userWechatPublicTag',
                {
                    id: await generateNewIdAsync(),
                    action: 'remove',
                    data: {
                    },
                    filter: {
                        id: userWechatPublicTag.id
                    }
                },
                {}
            );
        } catch (e) {
            await context.operate(
                'userWechatPublicTag',
                {
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
                },
                {}
            );
            throw e
        }
    }
}

export async function syncToWechat<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        id: string,
        openId: string,
    },
    context: Cxt
): Promise<any> {
    const application = await getWechatPublicConfig<
        ED,
        Cxt
    >(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application!;
    assert(type === 'wechatPublic')
    let appId: string, appSecret: string;
    const config2 = config as WechatPublicConfig;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(
        appId!,
        type!,
        appSecret!
    ) as WechatPublicInstance;
    const userWechatPublicTag = await getUserWechatPublicTagById<ED, Cxt>(params.applicationId, params.id!, context);
    const { tagid_list } = await getUserTags<ED, Cxt>({ applicationId: params.applicationId!, openId: params.openId! }, context);
    if(tagid_list?.find((ele: number) => ele === userWechatPublicTag.wechatPublicTag?.wechatId) && userWechatPublicTag.iState === 'fail') {
        try {
            const result = await batchuntagging<ED, Cxt>({ applicationId: params.applicationId!, openIdList: [params.openId], tagId: userWechatPublicTag.wechatPublicTag?.wechatId! }, context);
            await context.operate(
                'userWechatPublicTag',
                {
                    id: await generateNewIdAsync(),
                    action: 'remove',
                    data: {
                    },
                    filter: {
                        id: userWechatPublicTag.id
                    }
                },
                {}
            );
        } catch(e) {
            throw new OakPreConditionUnsetException(`${handleException(e as string)}`);
        }
    }
    if(!tagid_list?.find((ele: number) => ele === userWechatPublicTag.wechatPublicTag?.wechatId) && userWechatPublicTag.iState === 'fail') {
        try {
            const result = await batchtagging<ED, Cxt>({ applicationId: params.applicationId!, openIdList: [params.openId], tagId: userWechatPublicTag.wechatPublicTag?.wechatId! }, context);
            await context.operate(
                'userWechatPublicTag',
                {
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
                },
                {}
            );
        } catch (e) {
            throw new OakPreConditionUnsetException(`${handleException(e as string)}`);
        }
    }
    if(tagid_list?.find((ele: number) => ele === userWechatPublicTag.wechatPublicTag?.wechatId) && userWechatPublicTag.iState === 'success') {
        await context.operate(
            'userWechatPublicTag',
            {
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
            },
            {}
        );
    }
}