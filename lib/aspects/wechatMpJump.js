"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wechatMpJump = void 0;
const lodash_1 = require("oak-domain/lib/utils/lodash");
const Projection_1 = require("../types/Projection");
const assert_1 = require("oak-domain/lib/utils/assert");
const oak_external_sdk_1 = require("oak-external-sdk");
async function wechatMpJump(params, context) {
    const { applicationId, jump_wxa, expireType, expiresAt, expireInterval } = params;
    const envVersionVersionDict = {
        development: 'develop',
        staging: 'trial',
        production: 'release',
    };
    Object.assign(jump_wxa, {
        env_version: envVersionVersionDict[process.env.NODE_ENV],
    });
    (0, assert_1.assert)(applicationId);
    const [application] = await context.select('application', {
        data: (0, lodash_1.cloneDeep)(Projection_1.applicationProjection),
        filter: {
            id: applicationId,
        },
    }, {
        dontCollect: true,
    });
    (0, assert_1.assert)(application);
    const { systemId } = application;
    const { type } = application;
    let application2;
    if (type === 'wechatMp') {
        application2 = application;
    }
    else {
        [application2] = await context.select('application', {
            data: (0, lodash_1.cloneDeep)(Projection_1.applicationProjection),
            filter: {
                systemId,
                type: 'wechatMp',
            },
        }, {
            dontCollect: true,
        });
    }
    (0, assert_1.assert)(application2);
    const { config } = application2;
    const config2 = config;
    const { appId, appSecret } = config2;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, 'wechatMp', appSecret);
    const result = await wechatInstance.getURLScheme({ jump_wxa, expireType, expiresAt, expireInterval });
    return result;
}
exports.wechatMpJump = wechatMpJump;
