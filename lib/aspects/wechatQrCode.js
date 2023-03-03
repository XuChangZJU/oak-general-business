"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMpUnlimitWxaCode = exports.createWechatQrCode = void 0;
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var assert_1 = require("oak-domain/lib/utils/assert");
var oak_external_sdk_1 = require("oak-external-sdk");
var uuid_2 = require("oak-domain/lib/utils/uuid");
/**
 * 生成二维码优先级如下：
 * 0）如果在SystemConfig中指定了qrCodeType，则按照qrCodeType去生成
 * 1）如果有服务号，优先生成关注服务号的带参二维码
 * 2）如果有小程序，优先生成小程序的二维码（如果小程序中配置了qrCodePrefix），其次生成小程序码
 * @param options
 * @param context
 * @returns
 */
function createWechatQrCode(options, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var entity, entityId, tag, _a, permanent, props, qrCodeType, applicationId, _b, system, appId, appType, url, _c, applications, sysConfig, id, self_1, self_2, self_3, self_4, selfMp, self_5, publicApp, mpApp, data, type, application, applicationType, config, _d, config2, appId_1, appSecret, config2, appId_2, appSecret, wechatInstance, result;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    entity = options.entity, entityId = options.entityId, tag = options.tag, _a = options.permanent, permanent = _a === void 0 ? false : _a, props = options.props, qrCodeType = options.type;
                    applicationId = context.getApplicationId();
                    (0, assert_1.assert)(applicationId);
                    return [4 /*yield*/, context.select('system', {
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
                        }, {
                            dontCollect: true,
                        })];
                case 1:
                    _b = tslib_1.__read.apply(void 0, [_e.sent(), 1]), system = _b[0];
                    appId = '', appType = undefined;
                    url = undefined;
                    _c = system, applications = _c.application$system, sysConfig = _c.config;
                    if (!applications || (applications === null || applications === void 0 ? void 0 : applications.length) === 0) {
                        throw new Error('无法生成二维码，找不到此system下的应用信息');
                    }
                    id = (0, uuid_1.generateNewId)();
                    if (qrCodeType) {
                        switch (qrCodeType) {
                            case 'wechatPublic':
                                {
                                    self_1 = applications.find(function (ele) { return ele.type === 'wechatPublic'; });
                                    if (!(self_1 && self_1.type === 'wechatPublic' &&
                                        self_1.config.isService)) {
                                        throw new Error('无法生成公众号二维码，服务号未正确配置');
                                    }
                                    appId = self_1.id;
                                    appType = 'wechatPublic';
                                    break;
                                }
                            case 'wechatMpDomainUrl': {
                                self_2 = applications.find(function (ele) { return ele.type === 'wechatMp'; });
                                if (!(self_2.type === 'wechatMp' &&
                                    self_2.config.qrCodePrefix)) {
                                    throw new Error('无法生成小程序地址码，未配置跳转前缀');
                                }
                                url = "".concat(self_2.config.qrCodePrefix, "/").concat(id);
                                appId = self_2.id;
                                appType = 'wechatMpDomainUrl';
                                break;
                            }
                            case 'wechatMpWxaCode': {
                                self_3 = applications.find(function (ele) { return ele.type === 'wechatMp'; });
                                if (self_3.type !== 'wechatMp') {
                                    throw new Error('无法生成小程序地址码，未配置跳转前缀');
                                }
                                appId = self_3.id;
                                appType = 'wechatMpWxaCode';
                                break;
                            }
                            case 'wechatPublicForMp': {
                                self_4 = applications.find(function (ele) { return ele.type === 'wechatPublic'; });
                                if (!(self_4 && self_4.type === 'wechatPublic' &&
                                    self_4.config.isService)) {
                                    throw new Error('无法生成公众号-小程序二维码，服务号未正确配置');
                                }
                                selfMp = applications.find(function (ele) { return ele.type = 'wechatMp'; });
                                if (!(selfMp && selfMp.config.appId &&
                                    selfMp.config.appSecret)) {
                                    throw new Error('无法生成公众号-小程序二维码，小程序未正确配置');
                                }
                                appId = self_4.id;
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
                            self_5 = applications.find(function (ele) { return ele.id === applicationId; });
                            // 如果本身是服务号，则优先用自己的
                            if (self_5.type === 'wechatPublic' &&
                                self_5.config.isService) {
                                appId = applicationId;
                                appType = 'wechatPublic';
                            }
                            else if ((self_5 === null || self_5 === void 0 ? void 0 : self_5.type) === 'wechatMp') {
                                // 如果本身是小程序，则次优先用小程序的地址码，再次优先用二维码
                                appId = self_5.id;
                                if (self_5.config.qrCodePrefix) {
                                    appType = 'wechatMpDomainUrl';
                                    url = "".concat(self_5.config.qrCodePrefix, "/").concat(id);
                                }
                                else {
                                    appType = 'wechatMpWxaCode';
                                }
                            }
                            else {
                                publicApp = applications.find(function (ele) {
                                    return ele.type === 'wechatPublic' &&
                                        ele.config.isService;
                                });
                                if (publicApp) {
                                    appId = publicApp.id;
                                    appType = 'wechatPublic';
                                }
                                else {
                                    mpApp = applications.find(function (ele) { return ele.type === 'wechatMp'; });
                                    if (mpApp) {
                                        appId = mpApp.id;
                                        if (mpApp.config.qrCodePrefix) {
                                            appType = 'wechatMpDomainUrl';
                                            url = "".concat(mpApp.config.qrCodePrefix, "/").concat(id);
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
                    data = {
                        id: id,
                        type: appType,
                        tag: tag,
                        entity: entity,
                        entityId: entityId,
                        applicationId: appId,
                        allowShare: true,
                        permanent: permanent,
                        url: url,
                        expired: false,
                        expiresAt: Date.now() + 2592000 * 1000,
                        props: props,
                    };
                    type = data.type;
                    application = applications.find(function (ele) { return ele.id === data.applicationId; });
                    (0, assert_1.assert)(application);
                    applicationType = application.type, config = application.config;
                    _d = type;
                    switch (_d) {
                        case 'wechatMpWxaCode': return [3 /*break*/, 2];
                        case 'wechatPublicForMp': return [3 /*break*/, 3];
                        case 'wechatPublic': return [3 /*break*/, 3];
                        case 'wechatMpDomainUrl': return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 8];
                case 2:
                    {
                        (0, assert_1.assert)(applicationType === 'wechatMp' && config.type === 'wechatMp');
                        config2 = config;
                        appId_1 = config2.appId, appSecret = config2.appSecret;
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
                        return [3 /*break*/, 9];
                    }
                    _e.label = 3;
                case 3:
                    (0, assert_1.assert)(applicationType === 'wechatPublic' &&
                        config.type === 'wechatPublic');
                    if (!(process.env.OAK_PLATFORM === 'web')) return [3 /*break*/, 4];
                    Object.assign(data, {
                        ticket: 'develop环境下无法真实获取二维码数据',
                        url: "http://localhost:3000/wechatQrCode/scan?scene=".concat((0, uuid_2.shrinkUuidTo32Bytes)(id)),
                    });
                    return [3 /*break*/, 6];
                case 4:
                    config2 = config;
                    appId_2 = config2.appId, appSecret = config2.appSecret;
                    wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId_2, 'wechatPublic', appSecret);
                    return [4 /*yield*/, wechatInstance.getQrCode({
                            sceneStr: (0, uuid_2.shrinkUuidTo32Bytes)(id),
                            isPermanent: false,
                            expireSeconds: 2592000,
                        })];
                case 5:
                    result = _e.sent();
                    Object.assign(data, {
                        ticket: result === null || result === void 0 ? void 0 : result.ticket,
                        url: result === null || result === void 0 ? void 0 : result.url,
                    });
                    _e.label = 6;
                case 6: return [3 /*break*/, 9];
                case 7:
                    {
                        return [3 /*break*/, 9];
                    }
                    _e.label = 8;
                case 8:
                    {
                        (0, assert_1.assert)(false, "\u672A\u5B9E\u73B0\u7684".concat(type));
                    }
                    _e.label = 9;
                case 9: return [4 /*yield*/, context.operate('wechatQrCode', {
                        id: (0, uuid_1.generateNewId)(),
                        action: 'create',
                        data: data,
                    }, {
                        dontCollect: true,
                    })];
                case 10:
                    _e.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createWechatQrCode = createWechatQrCode;
function getMpUnlimitWxaCode(wechatQrCodeId, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, wechatQrCode, application, config, config2, appId, appSecret, wechatInstance, envVersionVersionDict, buffer, str;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, context.select('wechatQrCode', {
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
                    }, {})];
                case 1:
                    _a = tslib_1.__read.apply(void 0, [_b.sent(), 1]), wechatQrCode = _a[0];
                    application = wechatQrCode.application;
                    config = application.config;
                    config2 = config;
                    appId = config2.appId, appSecret = config2.appSecret;
                    if (!(process.env.OAK_PLATFORM === 'web')) return [3 /*break*/, 2];
                    return [2 /*return*/, 'develop环境下无法真实获取二维码数据'];
                case 2:
                    wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, 'wechatMp', appSecret);
                    envVersionVersionDict = {
                        development: 'develop',
                        staging: 'trial',
                        production: 'release',
                    };
                    return [4 /*yield*/, wechatInstance.getMpUnlimitWxaCode({
                            scene: (0, uuid_2.shrinkUuidTo32Bytes)(wechatQrCodeId),
                            envVersion: envVersionVersionDict[process.env.NODE_ENV],
                            page: 'pages/wechatQrCode/scan/index', // todo，这里用其它的页面微信服务器拒绝，因为没发布。应该是 pages/wechatQrCode/scan/index
                        })];
                case 3:
                    buffer = _b.sent();
                    str = String.fromCharCode.apply(String, tslib_1.__spreadArray([], tslib_1.__read(new Uint8Array(buffer)), false));
                    return [2 /*return*/, str];
            }
        });
    });
}
exports.getMpUnlimitWxaCode = getMpUnlimitWxaCode;
