"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const assert_1 = require("oak-domain/lib/utils/assert");
const Exception_1 = require("oak-domain/lib/types/Exception");
const oak_external_sdk_1 = require("oak-external-sdk");
/**
 * 目前虽然数据结构上config也可能在platform上，但是实际中暂时还没有
 * @param context
 * @param service
 * @param origin
 * @returns
 */
function getConfig(context, service, origin) {
    const { system } = context.getApplication();
    const { config: systemConfig, platform } = system;
    let originConfig = systemConfig[service] && systemConfig[service][origin];
    let originCloudAccounts = originConfig && systemConfig.Account && systemConfig.Account[origin];
    if (!originConfig && platform) {
        const { config: platformConfig } = platform;
        originConfig =
            platformConfig[service] && platformConfig[service][origin];
        originCloudAccounts =
            originConfig &&
                platformConfig.Account &&
                platformConfig.Account[origin];
    }
    if (!originConfig) {
        throw new Exception_1.OakDataException(`调用的服务${service}源${origin}找不到相应的配置，请联系管理员`);
    }
    switch (origin) {
        case 'ali': {
            const aliAccount = originCloudAccounts.find((ele) => ele.accessKeyId === originConfig.accessKeyId);
            (0, assert_1.assert)(aliAccount, `调用的服务${service}源${origin}找不到相应的云平台帐号，请联系管理员`);
            throw new Error('阿里云的external SDK还未实现');
        }
        case 'tencent': {
            const tencentAccount = originCloudAccounts.find((ele) => ele.secretId === originConfig.secretId);
            (0, assert_1.assert)(tencentAccount, `调用的服务${service}源${origin}找不到相应的云平台帐号，请联系管理员`);
            throw new Error('腾讯云的external SDK还未实现');
        }
        case 'qiniu': {
            const qiniuAccount = originCloudAccounts.find((ele) => ele.accessKey === originConfig.accessKey);
            (0, assert_1.assert)(qiniuAccount, `调用的服务${service}源${origin}找不到相应的云平台帐号，请联系管理员`);
            const qiniuInstance = oak_external_sdk_1.QiniuSDK.getInstance(qiniuAccount.accessKey, qiniuAccount.secretKey);
            return {
                instance: qiniuInstance,
                config: originConfig,
            };
        }
        case 'ctyun': {
            const ctyunAccount = originCloudAccounts.find((ele) => ele.accessKey === originConfig.accessKey);
            (0, assert_1.assert)(ctyunAccount, `调用的服务${service}源${origin}找不到相应的云平台帐号，请联系管理员`);
            const ctyunInstance = oak_external_sdk_1.CTYunSDk.getInstance(ctyunAccount.accessKey, ctyunAccount.securityKey);
            return {
                instance: ctyunInstance,
                config: originConfig,
            };
        }
        default: {
            (0, assert_1.assert)(origin === 'amap');
            const amapAccount = originCloudAccounts.find((ele) => ele.webApiKey === originConfig.webApiKey);
            (0, assert_1.assert)(amapAccount, `调用的服务${service}源${origin}找不到相应的云平台帐号，请联系管理员`);
            const amapInstance = oak_external_sdk_1.AmapSDK.getInstance(amapAccount.webApiKey);
            return {
                instance: amapInstance,
                config: originConfig,
            };
        }
    }
}
exports.getConfig = getConfig;
