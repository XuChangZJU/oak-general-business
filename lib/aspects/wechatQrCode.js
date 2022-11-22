"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWechatQrCode = void 0;
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var assert_1 = require("oak-domain/lib/utils/assert");
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
        var entity, entityId, tag, _a, lifetimeLength, _b, permanent, props, applicationId, _c, system, appId, appType, url, _d, applications, sysConfig, id, self_1, publicApp, mpApp, data;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    entity = options.entity, entityId = options.entityId, tag = options.tag, _a = options.lifetimeLength, lifetimeLength = _a === void 0 ? 300 * 10000 : _a, _b = options.permanent, permanent = _b === void 0 ? false : _b, props = options.props;
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
                                    },
                                },
                            },
                            filter: {
                                id: applicationId,
                            },
                        }, {
                            dontCollect: true,
                        })];
                case 1:
                    _c = tslib_1.__read.apply(void 0, [_e.sent(), 1]), system = _c[0];
                    appId = '', appType = undefined;
                    url = undefined;
                    _d = system, applications = _d.application$system, sysConfig = _d.config;
                    id = (0, uuid_1.generateNewId)();
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
                    return [4 /*yield*/, context.operate('wechatQrCode', {
                            id: (0, uuid_1.generateNewId)(),
                            action: 'create',
                            data: data,
                        }, {
                            dontCollect: true,
                        })];
                case 2:
                    _e.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createWechatQrCode = createWechatQrCode;
