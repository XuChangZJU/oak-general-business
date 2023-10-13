
import { EntityDict } from '../oak-app-domain';
import {
    WechatMpInstance,
    WechatPublicInstance,
    WechatSDK,
} from 'oak-external-sdk';
import { assert } from 'oak-domain/lib/utils/assert';
import {
    WechatMpConfig,
    WechatPublicConfig,
    WebConfig,
} from '../oak-app-domain/Application/Schema';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { OakPreConditionUnsetException } from 'oak-domain/lib/types';
import { generateNewIdAsync } from "oak-domain/lib/utils/uuid";
import { Tag } from '../types/WeChat';
import { handleException } from '../utils/wechatPublicException';

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

async function getWechatPublicTags<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    applicationId: string,
    context: Cxt
) {
    const wechatPublicTags = await context.select(
        'wechatPublicTag',
        {
            data: {
                id: 1,
                wechatId: 1,
                applicationId: 1,
            },
            filter: {
                applicationId,
            },
        },
        {
            dontCollect: true
        }
    );
    return wechatPublicTags;
}

async function getWechatPublicTagById<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    applicationId: string,
    id: string,
    context: Cxt
) {
    const [wechatPublicTag] = await context.select(
        'wechatPublicTag',
        {
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
        },
        {
            dontCollect: true
        }
    );
    return wechatPublicTag;
}

export async function createTag<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        name: string,
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
    const result = await wechatInstance.createTag({ name: params.name });
    return result;
}

export async function getTags<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string
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
    const result = await wechatInstance.getTags();
    return result;
}

export async function editTag<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        id: number,
        name: string,
    },
    context: Cxt,
): Promise<any> {
    const application = await getWechatPublicConfig<
        ED,
        Cxt
    >(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application!;
    assert(type === 'wechatPublic');
    let appId: string, appSecret: string;
    const config2 = config as WechatPublicConfig;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(
        appId!,
        type!,
        appSecret!
    ) as WechatPublicInstance;
    const result = await wechatInstance.editTag({ id: params.id, name: params.name });
    return result;
}

export async function deleteTag<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        id: string,
        wechatId: number,
    },
    context: Cxt,
): Promise<any> {
    const application = await getWechatPublicConfig<
        ED,
        Cxt
    >(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application!;
    assert(type === 'wechatPublic');
    let appId: string, appSecret: string;
    const config2 = config as WechatPublicConfig;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(
        appId!,
        type!,
        appSecret!
    ) as WechatPublicInstance;
    const result = await wechatInstance.deleteTag({ id: params.wechatId });
    return result;
}

export async function syncTag<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        id: string,
    },
    context: Cxt,
): Promise<any> {
    const application = await getWechatPublicConfig<
        ED,
        Cxt
    >(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application!;
    assert(type === 'wechatPublic');
    const wechatPublicTag = await getWechatPublicTagById<
        ED,
        Cxt
    >(params.applicationId, params.id, context);
    assert(wechatPublicTag);
    try {
        const { tags } = await getTags<ED, Cxt>({
            applicationId: params.applicationId!
        }, context);
        if (!wechatPublicTag.wechatId) {
            const result = await createTag<ED, Cxt>({
                applicationId: params.applicationId!,
                name: wechatPublicTag.text!,
            }, context);
            await context.operate(
                'wechatPublicTag',
                {
                    id: await generateNewIdAsync(),
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
                },
                {}
            )
        }
        if (wechatPublicTag.wechatId && tags.find((ele: Tag) => ele.id === wechatPublicTag.wechatId && ele.name !== wechatPublicTag.text)) {
            const result = await editTag<ED, Cxt>({
                applicationId: params.applicationId!,
                id: wechatPublicTag.wechatId!,
                name: wechatPublicTag.text!,
            }, context);
            await context.operate(
                'wechatPublicTag',
                {
                    id: await generateNewIdAsync(),
                    action: 'update',
                    data: {
                        syncAt: Date.now(),
                        sync: true,
                        iState: 'success',
                    },
                    filter: {
                        id: params.id,
                    }
                },
                {}
            )
        }
        if (wechatPublicTag.wechatId && tags.find((ele: Tag) => ele.id === wechatPublicTag.wechatId && ele.name === wechatPublicTag.text)) {
            const result = await deleteTag<ED, Cxt>({
                applicationId: params.applicationId!,
                id: wechatPublicTag.id!,
                wechatId: wechatPublicTag.wechatId!,
            }, context);
            await context.operate(
                'wechatPublicTag',
                {
                    id: await generateNewIdAsync(),
                    action: 'remove',
                    data: {},
                    filter: {
                        id: params.id,
                    }
                },
                {}
            )
        }
    } catch (e) {
        await context.operate(
            'wechatPublicTag',
            {
                id: await generateNewIdAsync(),
                action: 'update',
                data: {
                    sync: false,
                    iState: 'fail',
                },
                filter: {
                    id: params.id,
                }
            },
            {}
        );
        throw new OakPreConditionUnsetException(`${handleException(e as string)}`);
    }
}

export async function oneKeySync<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,

    },
    context: Cxt,
): Promise<any> {
    const application = await getWechatPublicConfig<
        ED,
        Cxt
    >(params.applicationId, context);
    assert(application);
    const { type, config, systemId } = application!;
    assert(type === 'wechatPublic');
    const wechatPublicTags = await getWechatPublicTags<
        ED,
        Cxt
    >(params.applicationId, context);
    try {
        const tags = await getTags<ED, Cxt>(params, context);
        if (wechatPublicTags && wechatPublicTags.length > 0) {
            const tagsToAdd = tags.tags?.filter((ele: Tag) => {
                return !wechatPublicTags.some(item => item?.wechatId === ele.id)
            });
            const tagsToRemove = tags.tags?.length ? wechatPublicTags.filter((ele) => {
                return !tags.tags?.some((item: Tag) => item.id === ele?.wechatId);
            }) : wechatPublicTags;
            tagsToAdd?.map(async (ele: Tag) => {
                await context.operate(
                    'wechatPublicTag',
                    {
                        id: await generateNewIdAsync(),
                        action: 'create',
                        data: {
                            id: await generateNewIdAsync(),
                            applicationId: params.applicationId,
                            wechatId: ele.id,
                            text: ele.name,
                            sync: true,
                            syncAt: Date.now(),
                            iState: 'success',
                        },
                    },
                    {}
                )
            });
            tagsToRemove?.map(async (ele) => {
                await context.operate(
                    'wechatPublicTag',
                    {
                        id: await generateNewIdAsync(),
                        action: 'remove',
                        data: {},
                        filter: {
                            id: ele.id
                        }
                    },
                    {}
                )
            });
            wechatPublicTags?.map(async (ele) => {
                await context.operate(
                    'wechatPublicTag',
                    {
                        id: await generateNewIdAsync(),
                        action: 'update',
                        data: {
                            syncAt: Date.now(),
                            sync: true,
                            iState: 'success'
                        },
                        filter: {
                            id: ele.id
                        }
                    },
                    {}
                )
            })
        } else {
            tags.tags?.map(async (ele: Tag) => {
                await context.operate(
                    'wechatPublicTag',
                    {
                        id: await generateNewIdAsync(),
                        action: 'create',
                        data: {
                            id: await generateNewIdAsync(),
                            applicationId: params.applicationId,
                            wechatId: ele.id,
                            text: ele.name,
                            sync: true,
                            syncAt: Date.now(),
                            iState: 'success',
                        },
                    },
                    {}
                );
            });
        }
    } catch (e: any) {
        throw new OakPreConditionUnsetException(`${handleException(e)}`);
    }
}
