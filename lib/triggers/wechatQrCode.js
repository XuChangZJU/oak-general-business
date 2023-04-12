"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var assert_1 = require("oak-domain/lib/utils/assert");
var oak_external_sdk_1 = require("oak-external-sdk");
var triggers = [
    /* {
        name: '选择wechatQrCode时，动态生成需要的数据',
        entity: 'wechatQrCode',
        action: 'select',
        when: 'after',
        fn: async ({ result }, context, params) => {
            let count = 0;
            const application = await context.getApplication();
            const { type: appType, config } = application!;

            if (appType !== 'wechatMp' && config!.type !== 'wechatMp') {
                
            } else {
                assert(appType === 'wechatMp' || config!.type === 'wechatMp');
                const config2 = config as WechatMpConfig;
                const { appId, appSecret } = config2;
                for (const code of result) {
                    const { type, expired, id } = code;
                    if (
                        type === 'wechatMpWxaCode' &&
                        code.hasOwnProperty('buffer')
                    ) {
                        // 小程序码去实时获取（暂时不考虑缓存）
                        const wechatInstance = WechatSDK.getInstance(
                            appId,
                            'wechatMp',
                            appSecret
                        ) as WechatMpInstance;
                        const buffer = await wechatInstance.getMpUnlimitWxaCode(
                            {
                                scene: shrinkUuidTo32Bytes(id!),
                                page: 'pages/index/index', // todo，这里用其它的页面微信服务器拒绝，因为没发布。应该是 pages/wechatQrCode/scan/index
                            }
                        );
                        // 把arrayBuffer转成字符串返回
                        const str = String.fromCharCode(
                            ...new Uint8Array(buffer)
                        );
                        Object.assign(code, {
                            buffer: str,
                        });
                        count++;
                    } else if (expired && code.hasOwnProperty('url')) {
                        // 如果过期了，在这里生成新的临时码并修改值（公众号）
                        throw new Error('not implemented yet');
                    }
                }
            }
            return count;
        }
    } as SelectTriggerAfter<EntityDict, 'wechatQrCode', RuntimeCxt>, */
    {
        name: '当生成wechatQrCode时,调用外部接口完善数据',
        entity: 'wechatQrCode',
        action: 'create',
        when: 'before',
        fn: function (_a, context, params) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, applicationId, _b, system, applications, sysConfig, fn, data_1, data_1_1, ele, e_1_1;
                var e_1, _c;
                return tslib_1.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            data = operation.data;
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
                            _b = tslib_1.__read.apply(void 0, [_d.sent(), 1]), system = _b[0];
                            applications = system.application$system, sysConfig = system.config;
                            if (!applications || (applications === null || applications === void 0 ? void 0 : applications.length) === 0) {
                                throw new Error('无法生成二维码，找不到此system下的应用信息');
                            }
                            fn = function (wechatQrCode) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                var appId, appType, url, qrCodeType, id, permanent, self_1, self_2, self_3, self_4, selfMp, self_5, publicApp, mpApp, updateData, application, applicationType, config, _a, config2, appId_1, appSecret, wechatInstance, result;
                                return tslib_1.__generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            appId = '', appType = undefined;
                                            url = undefined;
                                            qrCodeType = wechatQrCode.type;
                                            id = wechatQrCode.id;
                                            permanent = wechatQrCode.permanent;
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
                                                        selfMp = applications.find(function (ele) { return ele.type === 'wechatMp'; });
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
                                                if (sysConfig === null || sysConfig === void 0 ? void 0 : sysConfig.App.qrCodeApplicationId) {
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
                                            updateData = {
                                                applicationId: appId,
                                                allowShare: true,
                                                url: url,
                                                expired: false,
                                                expiresAt: permanent ? null : Date.now() + 2592000 * 1000, // wecharQrCode里的过期时间都放到最大，由上层关联对象来主动过期（by Xc, 20230131)
                                            };
                                            if (!wechatQrCode.type) {
                                                Object.assign(updateData, {
                                                    type: appType,
                                                });
                                            }
                                            application = applications.find(function (ele) { return ele.id === updateData.applicationId; });
                                            (0, assert_1.assert)(application);
                                            applicationType = application.type, config = application.config;
                                            _a = appType;
                                            switch (_a) {
                                                case 'wechatMpWxaCode': return [3 /*break*/, 1];
                                                case 'wechatPublicForMp': return [3 /*break*/, 2];
                                                case 'wechatPublic': return [3 /*break*/, 2];
                                                case 'wechatMpDomainUrl': return [3 /*break*/, 6];
                                            }
                                            return [3 /*break*/, 7];
                                        case 1:
                                            {
                                                (0, assert_1.assert)(applicationType === 'wechatMp' && config.type === 'wechatMp');
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 2;
                                        case 2:
                                            (0, assert_1.assert)(applicationType === 'wechatPublic' &&
                                                config.type === 'wechatPublic');
                                            if (!(process.env.OAK_PLATFORM === 'web')) return [3 /*break*/, 3];
                                            Object.assign(updateData, {
                                                ticket: 'develop环境下无法真实获取二维码数据',
                                                url: "http://localhost:3000/wechatQrCode/scan?scene=".concat((0, uuid_1.shrinkUuidTo32Bytes)(id)),
                                            });
                                            return [3 /*break*/, 5];
                                        case 3:
                                            config2 = config;
                                            appId_1 = config2.appId, appSecret = config2.appSecret;
                                            wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId_1, 'wechatPublic', appSecret);
                                            return [4 /*yield*/, wechatInstance.getQrCode({
                                                    sceneStr: (0, uuid_1.shrinkUuidTo32Bytes)(id),
                                                    isPermanent: false,
                                                    expireSeconds: 2592000,
                                                })];
                                        case 4:
                                            result = _b.sent();
                                            Object.assign(updateData, {
                                                ticket: result === null || result === void 0 ? void 0 : result.ticket,
                                                url: result === null || result === void 0 ? void 0 : result.url,
                                            });
                                            _b.label = 5;
                                        case 5: return [3 /*break*/, 8];
                                        case 6:
                                            {
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 7;
                                        case 7:
                                            {
                                                (0, assert_1.assert)(false, "\u672A\u5B9E\u73B0\u7684".concat(appType));
                                            }
                                            _b.label = 8;
                                        case 8:
                                            Object.assign(wechatQrCode, updateData);
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            if (!(data instanceof Array)) return [3 /*break*/, 10];
                            _d.label = 2;
                        case 2:
                            _d.trys.push([2, 7, 8, 9]);
                            data_1 = tslib_1.__values(data), data_1_1 = data_1.next();
                            _d.label = 3;
                        case 3:
                            if (!!data_1_1.done) return [3 /*break*/, 6];
                            ele = data_1_1.value;
                            return [4 /*yield*/, fn(ele)];
                        case 4:
                            _d.sent();
                            _d.label = 5;
                        case 5:
                            data_1_1 = data_1.next();
                            return [3 /*break*/, 3];
                        case 6: return [3 /*break*/, 9];
                        case 7:
                            e_1_1 = _d.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 9];
                        case 8:
                            try {
                                if (data_1_1 && !data_1_1.done && (_c = data_1.return)) _c.call(data_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                            return [7 /*endfinally*/];
                        case 9: return [3 /*break*/, 12];
                        case 10: return [4 /*yield*/, fn(data)];
                        case 11:
                            _d.sent();
                            _d.label = 12;
                        case 12: return [2 /*return*/, 1];
                    }
                });
            });
        }
    }
];
exports.default = triggers;
