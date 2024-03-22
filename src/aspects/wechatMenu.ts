import { EntityDict } from '../oak-app-domain';
import WechatSDK, {
    WechatMpInstance,
    WechatPublicInstance,
} from 'oak-external-sdk/lib/WechatSDK';
import { assert } from 'oak-domain/lib/utils/assert';
import {
    WechatMpConfig,
    WechatPublicConfig,
    WebConfig,
} from '../oak-app-domain/Application/Schema';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';

async function getWechatPublicConfig<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(applicationId: string, context: Cxt) {
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
            dontCollect: true,
        }
    );
    return application;
}

export async function getCurrentMenu<
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
    const { type, config } = application!;
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
        applicationId: string;
    },
    context: Cxt
): Promise<any> {
    const application = await getWechatPublicConfig<ED, Cxt>(
        params.applicationId,
        context
    );
    assert(application);
    const { type, config } = application!;
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
        const result = await wechatInstance.getMenu();
        return result;
    } catch (e) {
        throw e;
    }
}

export async function createMenu<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string;
        menuConfig: any;
        id: string;
    },
    context: Cxt
): Promise<any> {
    const application = await getWechatPublicConfig<ED, Cxt>(
        params.applicationId,
        context
    );
    assert(application);
    const { type, config } = application!;
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
                },
            },
            {}
        );
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
                },
            },
            {}
        );
        throw e;
    }
}

export async function createConditionalMenu<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string;
        menuConfig: any;
        id: string;
    },
    context: Cxt
): Promise<any> {
    const application = await getWechatPublicConfig<ED, Cxt>(
        params.applicationId,
        context
    );
    assert(application);
    const { type, config } = application!;
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
        const result = await wechatInstance.createConditionalMenu(
            params.menuConfig
        );
        await context.operate(
            'wechatMenu',
            {
                id: await generateNewIdAsync(),
                action: 'update',
                data: {
                    iState: 'success',
                    menuId: result.menuid,
                },
                filter: {
                    id: params.id,
                },
            },
            {}
        );
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
                },
            },
            {}
        );
        throw e;
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
    const { type, config } = application!;
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
    const result = await wechatInstance.deleteConditionalMenu(params.menuId);

    return result;
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
    const { type, config } = application!;
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
    const result = await wechatInstance.deleteMenu();
    return result;
}
