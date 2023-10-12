import { assert } from 'oak-domain/lib/utils/assert';
import { OakDataException } from 'oak-domain/lib/types/Exception';
import { AmapSDK, QiniuSDK } from 'oak-external-sdk';
import {
    AliCloudConfig,
    AmapCloudConfig,
    Config,
    Origin,
    QiniuCloudConfig,
    Service,
    TencentCloudConfig,
} from '../types/Config';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext, AspectDict } from '../context/FrontendRuntimeContext';
import { ED as EntityDict } from '../types/RuntimeCxt';

/**
 * 目前虽然数据结构上config也可能在platform上，但是实际中暂时还没有
 * @param context 
 * @param service 
 * @param origin 
 * @returns 
 */
export function getConfig<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AspectDict<ED, Cxt>>
>(context: Cxt | FrontCxt, service: Service, origin: Origin) {
    const { system } = context.getApplication()!;

    const { config: systemConfig, platform } =
        system as EntityDict['system']['Schema'];
    let originConfig =
        systemConfig[service] && (systemConfig[service] as any)[origin];
    let originCloudAccounts =
        originConfig && systemConfig.Account && systemConfig.Account[origin];

    if (!originConfig && platform) {
        const { config: platformConfig } = platform;
        originConfig =
            platformConfig[service] && (platformConfig[service] as any)[origin];
        originCloudAccounts =
            originConfig &&
            platformConfig.Account &&
            platformConfig.Account[origin];
    }
    if (!originConfig) {
        throw new OakDataException(
            `调用的服务${service}源${origin}找不到相应的配置，请联系管理员`
        );
    }
    switch (origin) {
        case 'ali': {
            const aliAccount = (originCloudAccounts as AliCloudConfig[]).find(
                (ele) => ele.accessKeyId === originConfig.accessKeyId
            );
            assert(
                aliAccount,
                `调用的服务${service}源${origin}找不到相应的云平台帐号，请联系管理员`
            );
            throw new Error('阿里云的external SDK还未实现');
        }
        case 'tencent': {
            const tencentAccount = (
                originCloudAccounts as TencentCloudConfig[]
            ).find((ele) => ele.secretId === originConfig.secretId);
            assert(
                tencentAccount,
                `调用的服务${service}源${origin}找不到相应的云平台帐号，请联系管理员`
            );
            throw new Error('腾讯云的external SDK还未实现');
        }
        case 'qiniu': {
            const qiniuAccount = (
                originCloudAccounts as QiniuCloudConfig[]
            ).find((ele) => ele.accessKey === originConfig.accessKey);
            assert(
                qiniuAccount,
                `调用的服务${service}源${origin}找不到相应的云平台帐号，请联系管理员`
            );
            const qiniuInstance = QiniuSDK.getInstance(
                qiniuAccount!.accessKey,
                qiniuAccount!.secretKey,
            );
            return {
                instance: qiniuInstance,
                config: originConfig,
            };
        }
        default: {
            assert(origin === 'amap');
            const amapAccount = (originCloudAccounts as AmapCloudConfig[]).find(
                (ele) => ele.webApiKey === originConfig.webApiKey
            );
            assert(
                amapAccount,
                `调用的服务${service}源${origin}找不到相应的云平台帐号，请联系管理员`
            );
            const amapInstance = AmapSDK.getInstance(amapAccount!.webApiKey);
            return {
                instance: amapInstance,
                config: originConfig,
            };
        }
    }
}
