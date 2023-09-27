
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
    const result = await wechatInstance.createTag({name: params.name});
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
    const result = await wechatInstance.editTag({id: params.id, name: params.name});
    return result;
}

export async function deleteTag<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string,
        id: number,
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
    const result = await wechatInstance.deleteTag({id: params.id});
    return result;
}