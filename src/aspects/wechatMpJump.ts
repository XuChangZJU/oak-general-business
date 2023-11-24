import { EntityDict } from "../oak-app-domain";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { OakUserException } from 'oak-domain/lib/types';
import { cloneDeep } from 'oak-domain/lib/utils/lodash';
import { applicationProjection } from '../types/Projection';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { assert } from 'oak-domain/lib/utils/assert';
import {
    AppType,
    WechatPublicConfig,
    WechatMpConfig,
} from '../oak-app-domain/Application/Schema';
import {
    WechatPublicInstance,
    WechatMpInstance,
    WechatSDK,
} from 'oak-external-sdk';
export async function wechatMpJump<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string;
        jump_wxa: { path: string, query: string, env_version: string };
        expireType: number;
        expiresAt: number;
        expireInterval: number;
    },
    context: Cxt
): Promise<any> {
    const { applicationId, jump_wxa, expireType, expiresAt, expireInterval } = params;
    assert(applicationId);
    const [application] = await context.select(
        'application',
        {
            data: cloneDeep(applicationProjection),
            filter: {
                id: applicationId,
            },
        },
        {
            dontCollect: true,
        }
    );
    assert(application);
    const { type, config } = application!;
    assert(type === 'wechatMp');

    const config2 = config as WechatMpConfig;
    const { appId, appSecret } = config2;

    const wechatInstance = WechatSDK.getInstance(
        appId,
        'wechatMp',
        appSecret
    ) as WechatMpInstance;

    const result = await wechatInstance.getURLScheme({ jump_wxa, expireType, expiresAt, expireInterval });

    return result;
}
