"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWechatQrCode = void 0;
var tslib_1 = require("tslib");
var assert_1 = require("oak-domain/lib/utils/assert");
var oak_external_sdk_1 = require("oak-external-sdk");
var uuid_1 = require("oak-domain/lib/utils/uuid");
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
        var entity, entityId, tag, _a, lifetimeLength, _b, permanent, props, applicationId, _c, system, appId, appType, url, _d, applications, sysConfig, id, self_1, publicApp, mpApp, data, type, application, applicationType, config, _e, config2, appId_1, appSecret, wechatInstance, buffer, str, config2, appId_2, appSecret, wechatInstance, result, _f, _g, _h;
        var _j;
        return tslib_1.__generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    entity = options.entity, entityId = options.entityId, tag = options.tag, _a = options.lifetimeLength, lifetimeLength = _a === void 0 ? 300 * 10000 : _a, _b = options.permanent, permanent = _b === void 0 ? false : _b, props = options.props;
                    return [4 /*yield*/, context.getApplicationId()];
                case 1:
                    applicationId = _k.sent();
                    (0, assert_1.assert)(applicationId);
                    return [4 /*yield*/, context.rowStore.select('system', {
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
                        }, context, {
                            dontCollect: true,
                        })];
                case 2:
                    _c = tslib_1.__read.apply(void 0, [(_k.sent()).result, 1]), system = _c[0];
                    appId = '', appType = undefined;
                    url = undefined;
                    _d = system, applications = _d.application$system, sysConfig = _d.config;
                    if (!applications || (applications === null || applications === void 0 ? void 0 : applications.length) === 0) {
                        throw new Error('无法生成二维码，找不到此system下的应用信息');
                    }
                    return [4 /*yield*/, generateNewId()];
                case 3:
                    id = _k.sent();
                    if (sysConfig.App.qrCodeApplicationId) {
                        appId = sysConfig.App.qrCodeApplicationId;
                        appType = sysConfig.App.qrCodeType;
                    }
                    else {
                        self_1 = applications.find(function (ele) { return ele.id === applicationId; });
                        // 如果本身是服务号，则优先用自己的
                        if (self_1.type === 'wechatPublic' && self_1.config.isService) {
                            appId = applicationId;
                            appType = 'wechatPublic';
                        }
                        publicApp = applications.find(function (ele) { return ele.type === 'wechatPublic' && ele.config.isService; });
                        if (publicApp) {
                            appId = publicApp.id;
                            appType = 'wechatPublic';
                        }
                        // 如果本身是小程序，则优先用自己的
                        if ((self_1 === null || self_1 === void 0 ? void 0 : self_1.type) === 'wechatMp') {
                            appId = self_1.id;
                            if (self_1.config.qrCodePrefix) {
                                appType = 'wechatMpDomainUrl';
                                url = "".concat(self_1.config.qrCodePrefix, "/").concat(id);
                            }
                            else {
                                appType = 'wechatMpWxaCode';
                            }
                        }
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
                        expiresAt: Date.now() + lifetimeLength,
                        props: props,
                    };
                    type = data.type;
                    application = applications.find(function (ele) { return ele.id === data.applicationId; });
                    (0, assert_1.assert)(application);
                    applicationType = application.type, config = application.config;
                    _e = type;
                    switch (_e) {
                        case 'wechatMpWxaCode': return [3 /*break*/, 4];
                        case 'wechatPublic': return [3 /*break*/, 6];
                        case 'wechatMpDomainUrl': return [3 /*break*/, 8];
                    }
                    return [3 /*break*/, 9];
                case 4:
                    (0, assert_1.assert)(applicationType === 'wechatMp' && config.type === 'wechatMp');
                    config2 = config;
                    appId_1 = config2.appId, appSecret = config2.appSecret;
                    wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId_1, appSecret, 'wechatMp');
                    return [4 /*yield*/, wechatInstance.getMpUnlimitWxaCode({
                            scene: (0, uuid_1.shrinkUuidTo32Bytes)(id),
                            page: 'pages/index/index', // todo，这里用其它的页面微信服务器拒绝，因为没发布。应该是 pages/wechatQrCode/scan/index
                        })];
                case 5:
                    buffer = _k.sent();
                    str = String.fromCharCode.apply(String, tslib_1.__spreadArray([], tslib_1.__read(new Uint8Array(buffer)), false));
                    Object.assign(data, {
                        buffer: str,
                    });
                    return [3 /*break*/, 10];
                case 6:
                    (0, assert_1.assert)(applicationType === 'wechatPublic' &&
                        config.type === 'wechatPublic');
                    config2 = config;
                    appId_2 = config2.appId, appSecret = config2.appSecret;
                    wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId_2, appSecret, 'wechatPublic');
                    return [4 /*yield*/, wechatInstance.getQrCode({
                            sceneStr: (0, uuid_1.shrinkUuidTo32Bytes)(id),
                            isPermanent: false,
                            expireSeconds: 2592000,
                        })];
                case 7:
                    result = _k.sent();
                    Object.assign(data, {
                        ticket: result === null || result === void 0 ? void 0 : result.ticket,
                        url: result === null || result === void 0 ? void 0 : result.url,
                    });
                    return [3 /*break*/, 10];
                case 8:
                    {
                        return [3 /*break*/, 10];
                    }
                    _k.label = 9;
                case 9:
                    {
                        (0, assert_1.assert)(false, "\u672A\u5B9E\u73B0\u7684".concat(type));
                    }
                    _k.label = 10;
                case 10:
                    _g = (_f = context.rowStore).operate;
                    _h = ['wechatQrCode'];
                    _j = {};
                    return [4 /*yield*/, generateNewId()];
                case 11: return [4 /*yield*/, _g.apply(_f, _h.concat([(_j.id = _k.sent(),
                            _j.action = 'create',
                            _j.data = data,
                            _j), context,
                        {
                            dontCollect: true,
                        }]))];
                case 12:
                    _k.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createWechatQrCode = createWechatQrCode;
