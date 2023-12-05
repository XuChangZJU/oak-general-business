import { cloneDeep } from 'oak-domain/lib/utils/lodash';
import { applicationProjection } from '../types/Projection';
import { assert } from 'oak-domain/lib/utils/assert';
import { WechatSDK, } from 'oak-external-sdk';
export async function wechatMpJump(params, context) {
    const { applicationId, jump_wxa, expireType, expiresAt, expireInterval } = params;
    assert(applicationId);
    const [application] = await context.select('application', {
        data: cloneDeep(applicationProjection),
        filter: {
            id: applicationId,
        },
    }, {
        dontCollect: true,
    });
    assert(application);
    const { systemId } = application;
    const { type } = application;
    let application2;
    if (type === 'wechatMp') {
        application2 = application;
    }
    else {
        [application2] = await context.select('application', {
            data: cloneDeep(applicationProjection),
            filter: {
                systemId,
                type: 'wechatMp',
            },
        }, {
            dontCollect: true,
        });
    }
    assert(application2);
    const { config } = application2;
    const config2 = config;
    const { appId, appSecret } = config2;
    const wechatInstance = WechatSDK.getInstance(appId, 'wechatMp', appSecret);
    const result = await wechatInstance.getURLScheme({ jump_wxa, expireType, expiresAt, expireInterval });
    return result;
}
