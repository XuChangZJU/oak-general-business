import { shrinkUuidTo32Bytes } from 'oak-domain/lib/utils/uuid';
import { assert } from 'oak-domain/lib/utils/assert';
import { WechatSDK } from 'oak-external-sdk';
const triggers = [
    {
        name: '当生成wechatQrCode时,调用外部接口完善数据',
        entity: 'wechatQrCode',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data } = operation;
            const applicationId = context.getApplicationId();
            assert(applicationId);
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
            const { application$system: applications, config: sysConfig } = system;
            if (!applications || applications?.length === 0) {
                throw new Error('无法生成二维码，找不到此system下的应用信息');
            }
            const fn = async (wechatQrCode) => {
                let appId = '', appType = undefined;
                let url = undefined;
                let qrCodeType = wechatQrCode.type;
                const id = wechatQrCode.id;
                const permanent = wechatQrCode.permanent;
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
                            url = `${self.config.qrCodePrefix}/${shrinkUuidTo32Bytes(id)}`;
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
                    if (sysConfig?.App.qrCodeApplicationId) {
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
                                url = `${self.config.qrCodePrefix}/${shrinkUuidTo32Bytes(id)}`;
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
                                        url = `${mpApp.config.qrCodePrefix}/${shrinkUuidTo32Bytes(id)}`;
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
                const updateData = {
                    applicationId: appId,
                    allowShare: true,
                    expired: false,
                    expiresAt: permanent ? null : Date.now() + 2592000 * 1000, // wecharQrCode里的过期时间都放到最大，由上层关联对象来主动过期（by Xc, 20230131)
                };
                if (url) {
                    Object.assign(updateData, { url });
                }
                if (!wechatQrCode.type) {
                    Object.assign(updateData, {
                        type: appType,
                    });
                }
                // 直接创建
                const application = applications.find((ele) => ele.id === updateData.applicationId);
                assert(application);
                const { type: applicationType, config } = application;
                switch (appType) {
                    case 'wechatMpWxaCode': {
                        assert(applicationType === 'wechatMp' && config.type === 'wechatMp');
                        break;
                    }
                    case 'wechatPublicForMp':
                    case 'wechatPublic': {
                        assert(applicationType === 'wechatPublic' &&
                            config.type === 'wechatPublic');
                        if (process.env.OAK_PLATFORM === 'web') {
                            Object.assign(updateData, {
                                ticket: 'develop环境下无法真实获取二维码数据',
                                url: `http://localhost:3000/wechatQrCode/scan?scene=${shrinkUuidTo32Bytes(id)}`,
                            });
                        }
                        else {
                            const config2 = config;
                            const { appId, appSecret } = config2;
                            const wechatInstance = WechatSDK.getInstance(appId, 'wechatPublic', appSecret);
                            const result = await wechatInstance.getQrCode({
                                sceneStr: shrinkUuidTo32Bytes(id),
                                isPermanent: false,
                                expireSeconds: 2592000,
                            });
                            Object.assign(updateData, {
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
                        assert(false, `未实现的${appType}`);
                    }
                }
                Object.assign(wechatQrCode, updateData);
            };
            if (data instanceof Array) {
                for (const ele of data) {
                    await fn(ele);
                }
            }
            else {
                await fn(data);
            }
            return 1;
        }
    }
];
export default triggers;
