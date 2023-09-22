
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
    const result = await wechatInstance.getCurrentMenu();
    return result;
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
    const result = await wechatInstance.getMenu();
    return result;
}

export async function createMenu<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        menuConfig: any
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
    const result = await wechatInstance.createMenu(params.menuConfig);
    return result;
}

export async function createConditionalMenu<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        menuConfig: any
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
    const result = await wechatInstance.createConditionalMenu(params.menuConfig);
    return result;
}

export async function deleteConditionalMenu<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        menuid: number,
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
    const result = await wechatInstance.deleteConditionalMenu(params.menuid);
    return result;
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
    const result = await wechatInstance.batchGetArticle(params);
    return result;
}

export async function getArticle<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        article_id: string
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
    const result = await wechatInstance.getArticle(params);
    return result;
}

export async function createMaterial<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        type: 'image' | 'voice' | 'video' | 'thumb',
        media: FormData,
        description?: FormData
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
    const result = await wechatInstance.createMaterial(params);
    return result;
}

export async function batchGetMaterialList<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        type: 'image' | 'video' | 'voice' | 'news',
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
    const result = await wechatInstance.batchGetMaterialList(params);
    return result;
}

export async function getMaterial<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        type: 'image' | 'video' | 'voice' | 'news',
        media_id: string,
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
    const result = await wechatInstance.getMaterial(params);
    return result;
}





