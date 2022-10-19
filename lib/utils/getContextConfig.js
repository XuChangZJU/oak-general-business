"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
var tslib_1 = require("tslib");
var assert_1 = require("oak-domain/lib/utils/assert");
var Exception_1 = require("oak-domain/lib/types/Exception");
var oak_external_sdk_1 = require("oak-external-sdk");
function getConfig(context, service, origin) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var rowStore, systemId, _a, system, _b, systemConfig, platform, originConfig, originCloudAccounts, platformConfig, aliAccount, tencentAccount, qiniuAccount, qiniuInstance, amapAccount, amapInstance;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    rowStore = context.rowStore;
                    return [4 /*yield*/, context.getSystemId()];
                case 1:
                    systemId = _c.sent();
                    (0, assert_1.assert)(systemId);
                    return [4 /*yield*/, rowStore.select('system', {
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
                        }, context, {
                            dontCollect: true,
                        })];
                case 2:
                    _a = tslib_1.__read.apply(void 0, [(_c.sent()).result, 1]), system = _a[0];
                    _b = system, systemConfig = _b.config, platform = _b.platform;
                    originConfig = systemConfig[service] && systemConfig[service][origin];
                    originCloudAccounts = originConfig && systemConfig.Account && systemConfig.Account[origin];
                    if (!originConfig) {
                        platformConfig = platform.config;
                        originConfig =
                            platformConfig[service] && platformConfig[service][origin];
                        originCloudAccounts =
                            originConfig &&
                                platformConfig.Account &&
                                platformConfig.Account[origin];
                    }
                    if (!originConfig) {
                        throw new Exception_1.OakDataException("\u8C03\u7528\u7684\u670D\u52A1".concat(service, "\u6E90").concat(origin, "\u627E\u4E0D\u5230\u76F8\u5E94\u7684\u914D\u7F6E\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458"));
                    }
                    switch (origin) {
                        case 'ali': {
                            aliAccount = originCloudAccounts.find(function (ele) { return ele.accessKeyId === originConfig.accessKeyId; });
                            (0, assert_1.assert)(aliAccount, "\u8C03\u7528\u7684\u670D\u52A1".concat(service, "\u6E90").concat(origin, "\u627E\u4E0D\u5230\u76F8\u5E94\u7684\u4E91\u5E73\u53F0\u5E10\u53F7\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458"));
                            throw new Error('阿里云的external SDK还未实现');
                        }
                        case 'tencent': {
                            tencentAccount = originCloudAccounts.find(function (ele) { return ele.secretId === originConfig.secretId; });
                            (0, assert_1.assert)(tencentAccount, "\u8C03\u7528\u7684\u670D\u52A1".concat(service, "\u6E90").concat(origin, "\u627E\u4E0D\u5230\u76F8\u5E94\u7684\u4E91\u5E73\u53F0\u5E10\u53F7\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458"));
                            throw new Error('腾讯云的external SDK还未实现');
                        }
                        case 'qiniu': {
                            qiniuAccount = originCloudAccounts.find(function (ele) { return ele.accessKey === originConfig.accessKey; });
                            (0, assert_1.assert)(qiniuAccount, "\u8C03\u7528\u7684\u670D\u52A1".concat(service, "\u6E90").concat(origin, "\u627E\u4E0D\u5230\u76F8\u5E94\u7684\u4E91\u5E73\u53F0\u5E10\u53F7\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458"));
                            qiniuInstance = oak_external_sdk_1.QiniuSDK.getInstance(qiniuAccount.accessKey, qiniuAccount.secretKey);
                            return [2 /*return*/, {
                                    instance: qiniuInstance,
                                    config: originConfig,
                                }];
                        }
                        default: {
                            (0, assert_1.assert)(origin === 'amap');
                            amapAccount = originCloudAccounts.find(function (ele) { return ele.webApiKey === originConfig.webApiKey; });
                            (0, assert_1.assert)(amapAccount, "\u8C03\u7528\u7684\u670D\u52A1".concat(service, "\u6E90").concat(origin, "\u627E\u4E0D\u5230\u76F8\u5E94\u7684\u4E91\u5E73\u53F0\u5E10\u53F7\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458"));
                            amapInstance = oak_external_sdk_1.AmapSDK.getInstance(amapAccount.webApiKey);
                            return [2 /*return*/, {
                                    instance: amapInstance,
                                    config: originConfig,
                                }];
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.getConfig = getConfig;
