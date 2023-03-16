import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { assert } from 'oak-domain/lib/utils/assert';
import { EntityDict } from "../general-app-domain";
import { Config as SysConfig, QrCodeType } from '../types/Config';
import { Schema as Application, WechatMpConfig, WechatPublicConfig } from "../general-app-domain/Application/Schema";
import { CreateOperationData as CreateWechatQrcodeData, WechatQrCodeProps } from '../general-app-domain/WechatQrCode/Schema';
import {
    WechatSDK,
    WechatMpInstance,
    WechatPublicInstance,
} from 'oak-external-sdk';
import { shrinkUuidTo32Bytes } from 'oak-domain/lib/utils/uuid';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';

/**
 * 生成二维码优先级如下：
 * 0）如果在SystemConfig中指定了qrCodeType，则按照qrCodeType去生成
 * 1）如果有服务号，优先生成关注服务号的带参二维码
 * 2）如果有小程序，优先生成小程序的二维码（如果小程序中配置了qrCodePrefix），其次生成小程序码
 * @param options 
 * @param context 
 * @returns 
 */
export async function createWechatQrCode<ED extends EntityDict, T extends keyof ED, Cxt extends BackendRuntimeContext<ED>>(options: {
    entity: T;
    entityId: string;
    tag?: string;
    permanent?: boolean;
    type?: QrCodeType;
    props: WechatQrCodeProps;
}, context: Cxt) {
    const { entity, entityId, tag, permanent = false, props, type: qrCodeType } = options;
    const applicationId = context.getApplicationId();
    assert(applicationId);
    const [system] = await context.select(
        'system',
        {
            data: {
                id: 1,
                config: 1,
                application$system: {
                    $entity: 'application',
                    data: {
                        id: 1,
                        type: 1,
                        config: 1,
                        systemId: 1,
                    },
                },
            },
            filter: {
                id: {
                    $in: {
                        entity: 'application',
                        data: {
                            systemId: 1,
                        },
                        filter: {
                            id: applicationId,
                        },
                    },
                },
            },
        },
        {
            dontCollect: true,
        }
    );

    let appId: string = '', appType: QrCodeType | undefined = undefined;
    let url: string | undefined = undefined;
    const { application$system: applications, config: sysConfig } = system as {
        application$system: Application[];
        config: SysConfig;
    };
    if (!applications || applications?.length === 0) {
        throw new Error(
            '无法生成二维码，找不到此system下的应用信息'
        );
    }
    const id = generateNewId();
    if (qrCodeType) {
        switch (qrCodeType) {
            case 'wechatPublic':
                {
                    const self = applications.find((ele) => ele.type === 'wechatPublic');
                    if (
                        !(
                            self && self!.type === 'wechatPublic' &&
                            (self!.config as WechatPublicConfig).isService
                        )
                    ) {
                        throw new Error('无法生成公众号二维码，服务号未正确配置');
                    }
                    appId = self.id;
                    appType = 'wechatPublic';
                    break;
                }
            case 'wechatMpDomainUrl': {
                const self = applications.find((ele) => ele.type === 'wechatMp');
                if (
                    !(
                        self!.type === 'wechatMp' &&
                        (self!.config as WechatMpConfig).qrCodePrefix
                    )
                ) {
                    throw new Error('无法生成小程序地址码，未配置跳转前缀');
                }
                url = `${(self!.config as WechatMpConfig).qrCodePrefix}/${id}`;
                appId = self!.id;
                appType = 'wechatMpDomainUrl';
                break;
            }
            case 'wechatMpWxaCode': {
                const self = applications.find((ele) => ele.type === 'wechatMp');
                if (self!.type !== 'wechatMp') {
                    throw new Error('无法生成小程序地址码，未配置跳转前缀');
                }
                appId = self!.id;
                appType = 'wechatMpWxaCode';
                break;
            }
            case 'wechatPublicForMp': {
                const self = applications.find((ele) => ele.type === 'wechatPublic');
                if (
                    !(
                        self && self!.type === 'wechatPublic' &&
                        (self!.config as WechatPublicConfig).isService
                    )
                ) {
                    throw new Error('无法生成公众号-小程序二维码，服务号未正确配置');
                }
                const selfMp = applications.find((ele) => ele.type === 'wechatMp');
                if (
                    !(
                        selfMp && (selfMp!.config as WechatMpConfig).appId &&
                        (selfMp!.config as WechatMpConfig).appSecret
                    )
                ) {
                    throw new Error(
                        '无法生成公众号-小程序二维码，小程序未正确配置'
                    );
                }
                appId = self.id;
                appType = 'wechatPublic';
                break;
            }
            default: {
                throw new Error('当前类型二维码暂不支持');
            }
        }
    } else {
        if (sysConfig.App.qrCodeApplicationId) {
            appId = sysConfig.App.qrCodeApplicationId;
            appType = sysConfig.App.qrCodeType!;
        } else {
            const self = applications.find((ele) => ele.id === applicationId);
            // 如果本身是服务号，则优先用自己的
            if (
                self!.type === 'wechatPublic' &&
                (self!.config as WechatPublicConfig).isService
            ) {
                appId = applicationId;
                appType = 'wechatPublic';
            } else if (self?.type === 'wechatMp') {
                // 如果本身是小程序，则次优先用小程序的地址码，再次优先用二维码
                appId = self.id;
                if ((self!.config as WechatMpConfig).qrCodePrefix) {
                    appType = 'wechatMpDomainUrl';
                    url = `${(self!.config as WechatMpConfig).qrCodePrefix
                        }/${id}`;
                } else {
                    appType = 'wechatMpWxaCode';
                }
            } else {
                // 查找有没有服务号或者小程序的相关配置，如果有则使用之
                const publicApp = applications.find(
                    (ele) =>
                        ele.type === 'wechatPublic' &&
                        (ele.config as WechatPublicConfig).isService
                );
                if (publicApp) {
                    appId = publicApp.id;
                    appType = 'wechatPublic';
                } else {
                    const mpApp = applications.find(
                        (ele) => ele.type === 'wechatMp'
                    );
                    if (mpApp) {
                        appId = mpApp.id;
                        if ((mpApp!.config as WechatMpConfig).qrCodePrefix) {
                            appType = 'wechatMpDomainUrl';
                            url = `${(mpApp!.config as WechatMpConfig).qrCodePrefix
                                }/${id}`;
                        } else {
                            appType = 'wechatMpWxaCode';
                        }
                    }
                }
            }
        }
    }

    if (!appId || !appType) {
        throw new Error('无法生成二维码，找不到此system下的服务号或者小程序信息');
    }

    const data: CreateWechatQrcodeData = {
        id,
        type: appType,
        tag,
        entity: entity as string,
        entityId,
        applicationId: appId,
        allowShare: true,
        permanent,
        url,
        expired: false,
        expiresAt: Date.now() + 2592000 * 1000,     // wecharQrCode里的过期时间都放到最大，由上层关联对象来主动过期（by Xc, 20230131)
        props,
    };

    // 直接创建
    const { type } = data;

    const application = applications.find(
        (ele) => ele.id === data.applicationId
    );

    assert(application);

    const { type: applicationType, config } = application;

    // console.log(process.env.OAK_PLATFORM, process.env.NODE_ENV);
    switch (type) {
        case 'wechatMpWxaCode': {
            assert(
                applicationType === 'wechatMp' && config!.type === 'wechatMp'
            );
            const config2 = config as WechatMpConfig;
            const { appId, appSecret } = config2;
            // if (process.env.OAK_PLATFORM === 'web') {
            //     Object.assign(data, {
            //         buffer: 'develop环境下无法真实获取二维码数据',
            //     });
            // }
            // else {
            //     // 小程序码去实时获取（暂时不考虑缓存）
            //     const wechatInstance = WechatSDK.getInstance(
            //         appId,
            //         'wechatMp',
            //         appSecret
            //     ) as WechatMpInstance;

            //     const envVersionVersionDict = {
            //         development: 'develop',
            //         staging: 'trial',
            //         production: 'release',
            //     };

            //     const buffer = await wechatInstance.getMpUnlimitWxaCode({
            //         scene: shrinkUuidTo32Bytes(id),
            //         envVersion:
            //             envVersionVersionDict[
            //                 process.env
            //                     .NODE_ENV as keyof typeof envVersionVersionDict
            //             ] as 'release',
            //         page: 'pages/wechatQrCode/scan/index', // todo，这里用其它的页面微信服务器拒绝，因为没发布。应该是 pages/wechatQrCode/scan/index
            //     });
            //     // 把arrayBuffer转成字符串返回
            //     const str = String.fromCharCode(...new Uint8Array(buffer));
            //     Object.assign(data, {
            //         buffer: str,
            //     });
            // }

            break;
        }
        case 'wechatPublicForMp':
        case 'wechatPublic': {
            assert(
                applicationType === 'wechatPublic' &&
                config!.type === 'wechatPublic'
            );
            if (process.env.OAK_PLATFORM === 'web') {
                Object.assign(data, {
                    ticket: 'develop环境下无法真实获取二维码数据',
                    url: `http://localhost:3000/wechatQrCode/scan?scene=${shrinkUuidTo32Bytes(id)}`,
                });
            }
            else {
                const config2 = config as WechatPublicConfig;
                const { appId, appSecret } = config2;
                const wechatInstance = WechatSDK.getInstance(
                    appId,
                    'wechatPublic',
                    appSecret
                ) as WechatPublicInstance;

                const result = await wechatInstance.getQrCode({
                    sceneStr: shrinkUuidTo32Bytes(id),
                    isPermanent: false,
                    expireSeconds: 2592000,
                });
                Object.assign(data, {
                    ticket: result?.ticket,
                    url: result?.url,
                });
            }
            break;
        }
        case 'wechatMpDomainUrl': {
            break;
        }
        default: {
            assert(false, `未实现的${type}`);
        }
    }

    await context.operate(
        'wechatQrCode',
        {
            id: generateNewId(),
            action: 'create',
            data,
        },
        {
            dontCollect: true,
        }
    );
}


export async function getMpUnlimitWxaCode<
    ED extends EntityDict,
    T extends keyof ED,
    Cxt extends BackendRuntimeContext<ED>
>(wechatQrCodeId: string, context: Cxt) {
    const [wechatQrCode] = await context.select(
        'wechatQrCode',
        {
            data: {
                id: 1,
                application: {
                    id: 1,
                    config: 1,
                },
            },
            filter: {
                id: wechatQrCodeId,
            },
        },
        {}
    );
    const application = wechatQrCode.application;
    const { config } = application!;

    const config2 = config as WechatMpConfig;
    const { appId, appSecret } = config2;
    if (process.env.OAK_PLATFORM === 'web') {
        return 'develop环境下无法真实获取二维码数据';
    } else {
        // 小程序码去实时获取（暂时不考虑缓存）
        const wechatInstance = WechatSDK.getInstance(
            appId,
            'wechatMp',
            appSecret
        ) as WechatMpInstance;

        const envVersionVersionDict = {
            development: 'develop',
            staging: 'trial',
            production: 'release',
        };

        const buffer = await wechatInstance.getMpUnlimitWxaCode({
            scene: shrinkUuidTo32Bytes(wechatQrCodeId),
            envVersion: envVersionVersionDict[
                process.env.NODE_ENV as keyof typeof envVersionVersionDict
            ] as 'release',
            page: 'pages/wechatQrCode/scan/index', // todo，这里用其它的页面微信服务器拒绝，因为没发布。应该是 pages/wechatQrCode/scan/index
        });
        // 把arrayBuffer转成字符串返回
        const str = String.fromCharCode(...new Uint8Array(buffer));
        return str;
    }
}