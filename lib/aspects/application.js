"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signatureJsSDK = exports.getApplication = void 0;
var tslib_1 = require("tslib");
var assert_1 = require("oak-domain/lib/utils/assert");
var Projection_1 = require("../types/Projection");
var oak_external_sdk_1 = require("oak-external-sdk");
function getApplication(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var type, domain, url, _a, application, _b, application2;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    type = params.type, domain = params.domain;
                    url = context.getHeader('host');
                    console.log('url is', url);
                    return [4 /*yield*/, context.select('application', {
                            data: Projection_1.applicationProjection,
                            filter: {
                                type: type,
                                system: {
                                    domain$system: {
                                        url: domain,
                                    }
                                },
                            },
                        }, {})];
                case 1:
                    _a = tslib_1.__read.apply(void 0, [_c.sent(), 1]), application = _a[0];
                    if (!(type === 'wechatMp')) return [3 /*break*/, 2];
                    (0, assert_1.assert)(application, '微信小程序环境下 application必须存在小程序相关配置');
                    return [3 /*break*/, 6];
                case 2:
                    if (!(type === 'wechatPublic')) return [3 /*break*/, 5];
                    if (!!application) return [3 /*break*/, 4];
                    return [4 /*yield*/, context.select('application', {
                            data: Projection_1.applicationProjection,
                            filter: {
                                type: 'web',
                                system: {
                                    domain$system: {
                                        url: domain,
                                    }
                                },
                            },
                        }, {})];
                case 3:
                    _b = tslib_1.__read.apply(void 0, [_c.sent(), 1]), application2 = _b[0];
                    (0, assert_1.assert)(application2, '微信公众号环境下 application不存在公众号配置，但必须存在web相关配置');
                    return [2 /*return*/, application2.id];
                case 4: return [3 /*break*/, 6];
                case 5:
                    (0, assert_1.assert)(application, 'web环境下 application必须存在web相关配置');
                    _c.label = 6;
                case 6: return [2 /*return*/, application.id];
            }
        });
    });
}
exports.getApplication = getApplication;
function signatureJsSDK(_a, context) {
    var url = _a.url, env = _a.env;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var application, _b, type, config, systemId, config2, appId, appSecret, wechatInstance, result;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    application = context.getApplication();
                    _b = application, type = _b.type, config = _b.config, systemId = _b.systemId;
                    (0, assert_1.assert)(type === 'wechatPublic' && config.type === 'wechatPublic');
                    config2 = config;
                    appId = config2.appId, appSecret = config2.appSecret;
                    wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, 'wechatPublic', appSecret);
                    return [4 /*yield*/, wechatInstance.signatureJsSDK({ url: url })];
                case 1:
                    result = _c.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.signatureJsSDK = signatureJsSDK;
