
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
import { MenuType } from '../types/WeChat';
import { generateNewIdAsync } from "oak-domain/lib/utils/uuid";

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

export async function getCurrentMenu<
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
        const result = await wechatInstance.getCurrentMenu();
        return result;
    } catch (e) {
        throw e;
    }
}

export async function getMenu<
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
    try {
        const result = await wechatInstance.getMenu();
        return result;
    } catch (e) {
        throw (e);
    }
}

export async function createMenu<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        menuConfig: any,
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
        const result = await wechatInstance.createMenu(params.menuConfig);
        await context.operate(
            'wechatMenu',
            {
                id: await generateNewIdAsync(),
                action: 'update',
                data: {
                    iState: 'success',
                },
                filter: {
                    id: params.id,
                }
            },
            {}
        )
    } catch (e) {
        await context.operate(
            'wechatMenu',
            {
                id: await generateNewIdAsync(),
                action: 'update',
                data: {
                    iState: 'fail',
                },
                filter: {
                    id: params.id,
                }
            },
            {}
        )
        throw e
    }
}

export async function createConditionalMenu<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        menuConfig: any,
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
        const result = await wechatInstance.createConditionalMenu(params.menuConfig);
        await context.operate(
            'wechatMenu',
            {
                id: await generateNewIdAsync(),
                action: 'update',
                data: {
                    iState: 'success',
                    menuId: result.menuid
                },
                filter: {
                    id: params.id,
                }
            },
            {}
        )
    } catch (e) {
        await context.operate(
            'wechatMenu',
            {
                id: await generateNewIdAsync(),
                action: 'update',
                data: {
                    iState: 'fail',
                },
                filter: {
                    id: params.id,
                }
            },
            {}
        )
        throw e
    }
}

export async function deleteConditionalMenu<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string;
        menuId: number;
    },
    context: Cxt
): Promise<any> {
    const application = await getWechatPublicConfig<ED, Cxt>(
        params.applicationId,
        context
    );
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
    try {
        const result = await wechatInstance.deleteConditionalMenu(params.menuId);
    } catch (e) {
        throw e;
    }
}

export async function deleteMenu<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string;
    },
    context: Cxt
): Promise<any> {
    const application = await getWechatPublicConfig<ED, Cxt>(
        params.applicationId,
        context
    );
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
    try {
        const result = await wechatInstance.deleteMenu();
        return result;
    } catch (e) {
        throw e;
    }
}

export async function batchGetArticle<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        offset?: number;
        count: number;
        noContent?: 0 | 1;
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
    try {
        const result = await wechatInstance.batchGetArticle(params);
        return result;
    } catch (e) {
        throw e;
    }
}

export async function getArticle<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        articleId: string
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
    try {
        const result = await wechatInstance.getArticle({
            articleId: params.articleId,
        });
        return result;
    } catch (e) {
        throw e;
    }
}



export async function batchGetMaterialList<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        type: MenuType,
        offset?: number;
        count: number;
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
    try {
        const result = await wechatInstance.batchGetMaterialList(params);
        return result;
    } catch (e) {
        throw e;
    }
}

export async function getMaterial<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        type: MenuType,
        mediaId: string,
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
    try {
        const result = await wechatInstance.getMaterial({
            mediaId: params.mediaId,
        });
        return result;
    } catch(e) {
        throw e;
    }
}





