"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWechatQrCode = void 0;
var tslib_1 = require("tslib");
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
        var entity, entityId, tag, _a, lifetimeLength, _b, permanent, props, applicationId, _c, system, appId, appType, url, _d, applications, sysConfig, id, self_1, publicApp, mpApp, data, _e, _f, _g;
        var _h;
        return tslib_1.__generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    entity = options.entity, entityId = options.entityId, tag = options.tag, _a = options.lifetimeLength, lifetimeLength = _a === void 0 ? 300 * 10000 : _a, _b = options.permanent, permanent = _b === void 0 ? false : _b, props = options.props;
                    return [4 /*yield*/, context.getApplicationId()];
                case 1:
                    applicationId = _j.sent();
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
                                    },
                                },
                            },
                            filter: {
                                id: applicationId,
                            },
                        }, context, {
                            dontCollect: true,
                        })];
                case 2:
                    _c = tslib_1.__read.apply(void 0, [(_j.sent()).result, 1]), system = _c[0];
                    appId = '', appType = undefined;
                    url = undefined;
                    _d = system, applications = _d.application$system, sysConfig = _d.config;
                    return [4 /*yield*/, generateNewId()];
                case 3:
                    id = _j.sent();
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
                    _f = (_e = context.rowStore).operate;
                    _g = ['wechatQrCode'];
                    _h = {};
                    return [4 /*yield*/, generateNewId()];
                case 4: return [4 /*yield*/, _f.apply(_e, _g.concat([(_h.id = _j.sent(),
                            _h.action = 'create',
                            _h.data = data,
                            _h), context,
                        {
                            dontCollect: true,
                        }]))];
                case 5:
                    _j.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createWechatQrCode = createWechatQrCode;
