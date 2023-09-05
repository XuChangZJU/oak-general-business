import { assert } from 'oak-domain/lib/utils/assert';
import { OakDataException } from 'oak-domain/lib/types/Exception';
import { AmapSDK, QiniuSDK } from 'oak-external-sdk';
export async function getConfig(context, service, origin) {
    const systemId = context.getSystemId();
    assert(systemId);
    const [system] = await context.select('system', {
        data: {
            id: 1,
            config: 1,
            platform: {
                id: 1,
                config: 1,
            },
        },
        filter: {
            id: systemId,
        },
    }, {
        dontCollect: true,
    });
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
        throw new OakDataException(`调用的服务${service}源${origin}找不到相应的配置，请联系管理员`);
    }
    switch (origin) {
        case 'ali': {
            const aliAccount = originCloudAccounts.find((ele) => ele.accessKeyId === originConfig.accessKeyId);
            assert(aliAccount, `调用的服务${service}源${origin}找不到相应的云平台帐号，请联系管理员`);
            throw new Error('阿里云的external SDK还未实现');
        }
        case 'tencent': {
            const tencentAccount = originCloudAccounts.find((ele) => ele.secretId === originConfig.secretId);
            assert(tencentAccount, `调用的服务${service}源${origin}找不到相应的云平台帐号，请联系管理员`);
            throw new Error('腾讯云的external SDK还未实现');
        }
        case 'qiniu': {
            const qiniuAccount = originCloudAccounts.find((ele) => ele.accessKey === originConfig.accessKey);
            assert(qiniuAccount, `调用的服务${service}源${origin}找不到相应的云平台帐号，请联系管理员`);
            const qiniuInstance = QiniuSDK.getInstance(qiniuAccount.accessKey, qiniuAccount.secretKey);
            return {
                instance: qiniuInstance,
                config: originConfig,
            };
        }
        default: {
            assert(origin === 'amap');
            const amapAccount = originCloudAccounts.find((ele) => ele.webApiKey === originConfig.webApiKey);
            assert(amapAccount, `调用的服务${service}源${origin}找不到相应的云平台帐号，请联系管理员`);
            const amapInstance = AmapSDK.getInstance(amapAccount.webApiKey);
            return {
                instance: amapInstance,
                config: originConfig,
            };
        }
    }
}
