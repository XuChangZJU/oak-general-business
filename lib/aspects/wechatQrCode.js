"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMpUnlimitWxaCode = exports.createWechatQrCode = void 0;
const uuid_1 = require("oak-domain/lib/utils/uuid");
const assert_1 = require("oak-domain/lib/utils/assert");
const oak_external_sdk_1 = require("oak-external-sdk");
const uuid_2 = require("oak-domain/lib/utils/uuid");
/**
 * 生成二维码优先级如下：
 * 0）如果在SystemConfig中指定了qrCodeType，则按照qrCodeType去生成
 * 1）如果有服务号，优先生成关注服务号的带参二维码
 * 2）如果有小程序，优先生成小程序的二维码（如果小程序中配置了qrCodePrefix），其次生成小程序码
 * @param options
 * @param context
 * @returns
 */
async function createWechatQrCode(options, context) {
    const { entity, entityId, tag, permanent = false, props, type: qrCodeType } = options;
    const applicationId = context.getApplicationId();
    (0, assert_1.assert)(applicationId);
    const [system] = await context.select('system', {
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
            application$system: {
                id: applicationId,
            }
        },
    }, {
        dontCollect: true,
    });
    let appId = '', appType = undefined;
    let url = undefined;
    const { application$system: applications, config: sysConfig } = system;
    if (!applications || applications?.length === 0) {
        throw new Error('无法生成二维码，找不到此system下的应用信息');
    }
    const id = (0, uuid_1.generateNewId)();
    if (qrCodeType) {
        switch (qrCodeType) {
            case 'wechatPublic':
                {
                    const self = applications.find((ele) => ele.type === 'wechatPublic');
                    if (!(self && self.type === 'wechatPublic' &&
                        self.config.isService)) {
                        throw new Error('无法生成公众号二维码，服务号未正确配置');
                    }
                    appId = self.id;
                    appType = 'wechatPublic';
                    break;
                }
            case 'wechatMpDomainUrl': {
                const self = applications.find((ele) => ele.type === 'wechatMp');
                if (!(self.type === 'wechatMp' &&
                    self.config.qrCodePrefix)) {
                    throw new Error('无法生成小程序地址码，未配置跳转前缀');
                }
                url = `${self.config.qrCodePrefix}/${id}`;
                appId = self.id;
                appType = 'wechatMpDomainUrl';
                break;
            }
            case 'wechatMpWxaCode': {
                const self = applications.find((ele) => ele.type === 'wechatMp');
                if (self.type !== 'wechatMp') {
                    throw new Error('无法生成小程序地址码，未配置跳转前缀');
                }
                appId = self.id;
                appType = 'wechatMpWxaCode';
                break;
            }
            case 'wechatPublicForMp': {
                const self = applications.find((ele) => ele.type === 'wechatPublic');
                if (!(self && self.type === 'wechatPublic' &&
                    self.config.isService)) {
                    throw new Error('无法生成公众号-小程序二维码，服务号未正确配置');
                }
                const selfMp = applications.find((ele) => ele.type === 'wechatMp');
                if (!(selfMp && selfMp.config.appId &&
                    selfMp.config.appSecret)) {
                    throw new Error('无法生成公众号-小程序二维码，小程序未正确配置');
                }
                appId = self.id;
                appType = 'wechatPublic';
                break;
            }
            default: {
                throw new Error('当前类型二维码暂不支持');
            }
        }
    }
    else {
        if (sysConfig.App.qrCodeApplicationId) {
            appId = sysConfig.App.qrCodeApplicationId;
            appType = sysConfig.App.qrCodeType;
        }
        else {
            const self = applications.find((ele) => ele.id === applicationId);
            // 如果本身是服务号，则优先用自己的
            if (self.type === 'wechatPublic' &&
                self.config.isService) {
                appId = applicationId;
                appType = 'wechatPublic';
            }
            else if (self?.type === 'wechatMp') {
                // 如果本身是小程序，则次优先用小程序的地址码，再次优先用二维码
                appId = self.id;
                if (self.config.qrCodePrefix) {
                    appType = 'wechatMpDomainUrl';
                    url = `${self.config.qrCodePrefix}/${id}`;
                }
                else {
                    appType = 'wechatMpWxaCode';
                }
            }
            else {
                // 查找有没有服务号或者小程序的相关配置，如果有则使用之
                const publicApp = applications.find((ele) => ele.type === 'wechatPublic' &&
                    ele.config.isService);
                if (publicApp) {
                    appId = publicApp.id;
                    appType = 'wechatPublic';
                }
                else {
                    const mpApp = applications.find((ele) => ele.type === 'wechatMp');
                    if (mpApp) {
                        appId = mpApp.id;
                        if (mpApp.config.qrCodePrefix) {
                            appType = 'wechatMpDomainUrl';
                            url = `${mpApp.config.qrCodePrefix}/${id}`;
                        }
                        else {
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
    const data = {
        id,
        type: appType,
        tag,
        entity: entity,
        entityId,
        applicationId: appId,
        allowShare: true,
        permanent,
        url,
        expired: false,
        expiresAt: Date.now() + 2592000 * 1000,
        props,
    };
    // 直接创建
    const { type } = data;
    const application = applications.find((ele) => ele.id === data.applicationId);
    (0, assert_1.assert)(application);
    const { type: applicationType, config } = application;
    // console.log(process.env.OAK_PLATFORM, process.env.NODE_ENV);
    switch (type) {
        case 'wechatMpWxaCode': {
            (0, assert_1.assert)(applicationType === 'wechatMp' && config.type === 'wechatMp');
            const config2 = config;
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
            (0, assert_1.assert)(applicationType === 'wechatPublic' &&
                config.type === 'wechatPublic');
            if (process.env.OAK_PLATFORM === 'web') {
                Object.assign(data, {
                    ticket: 'develop环境下无法真实获取二维码数据',
                    url: `http://localhost:3000/wechatQrCode/scan?scene=${(0, uuid_2.shrinkUuidTo32Bytes)(id)}`,
                });
            }
            else {
                const config2 = config;
                const { appId, appSecret } = config2;
                const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, 'wechatPublic', appSecret);
                const result = await wechatInstance.getQrCode({
                    sceneStr: (0, uuid_2.shrinkUuidTo32Bytes)(id),
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
            (0, assert_1.assert)(false, `未实现的${type}`);
        }
    }
    await context.operate('wechatQrCode', {
        id: (0, uuid_1.generateNewId)(),
        action: 'create',
        data,
    }, {
        dontCollect: true,
    });
}
exports.createWechatQrCode = createWechatQrCode;
async function getMpUnlimitWxaCode(wechatQrCodeId, context) {
    const [wechatQrCode] = await context.select('wechatQrCode', {
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
    }, {});
    const application = wechatQrCode.application;
    const { config } = application;
    const config2 = config;
    const { appId, appSecret } = config2;
    if (process.env.OAK_PLATFORM === 'web') {
        return 'develop环境下无法真实获取二维码数据';
    }
    else {
        // 小程序码去实时获取（暂时不考虑缓存）
        const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, 'wechatMp', appSecret);
        const envVersionVersionDict = {
            development: 'develop',
            staging: 'trial',
            production: 'release',
        };
        const buffer = await wechatInstance.getMpUnlimitWxaCode({
            scene: (0, uuid_2.shrinkUuidTo32Bytes)(wechatQrCodeId),
            envVersion: envVersionVersionDict[process.env.NODE_ENV],
            page: 'pages/wechatQrCode/scan/index', // todo，这里用其它的页面微信服务器拒绝，因为没发布。应该是 pages/wechatQrCode/scan/index
        });
        // 把arrayBuffer转成字符串返回
        const str = String.fromCharCode(...new Uint8Array(buffer));
        return str;
    }
}
exports.getMpUnlimitWxaCode = getMpUnlimitWxaCode;
