"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var assert_1 = require("oak-domain/lib/utils/assert");
var oak_external_sdk_1 = require("oak-external-sdk");
var triggers = [
    {
        name: '选择wechatQrCode时，动态生成需要的数据',
        entity: 'wechatQrCode',
        action: 'select',
        when: 'after',
        fn: function (_a, context, params) {
            var result = _a.result;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var count, application, _b, appType, config, config2, appId, appSecret, result_1, result_1_1, code, type, expired, id, wechatInstance, buffer, str, e_1_1;
                var e_1, _c;
                return tslib_1.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            count = 0;
                            return [4 /*yield*/, context.getApplication()];
                        case 1:
                            application = _d.sent();
                            _b = application, appType = _b.type, config = _b.config;
                            if (!(appType !== 'wechatMp' && config.type !== 'wechatMp')) return [3 /*break*/, 2];
                            return [3 /*break*/, 11];
                        case 2:
                            (0, assert_1.assert)(appType === 'wechatMp' || config.type === 'wechatMp');
                            config2 = config;
                            appId = config2.appId, appSecret = config2.appSecret;
                            _d.label = 3;
                        case 3:
                            _d.trys.push([3, 9, 10, 11]);
                            result_1 = tslib_1.__values(result), result_1_1 = result_1.next();
                            _d.label = 4;
                        case 4:
                            if (!!result_1_1.done) return [3 /*break*/, 8];
                            code = result_1_1.value;
                            type = code.type, expired = code.expired, id = code.id;
                            if (!(type === 'wechatMpWxaCode' &&
                                code.hasOwnProperty('buffer'))) return [3 /*break*/, 6];
                            wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, appSecret, 'wechatMp');
                            return [4 /*yield*/, wechatInstance.getMpUnlimitWxaCode({
                                    scene: (0, uuid_1.shrinkUuidTo32Bytes)(id),
                                    page: 'pages/index/index', // todo，这里用其它的页面微信服务器拒绝，因为没发布。应该是 pages/wechatQrCode/scan/index
                                })];
                        case 5:
                            buffer = _d.sent();
                            str = String.fromCharCode.apply(String, tslib_1.__spreadArray([], tslib_1.__read(new Uint8Array(buffer)), false));
                            Object.assign(code, {
                                buffer: str,
                            });
                            count++;
                            return [3 /*break*/, 7];
                        case 6:
                            if (expired && code.hasOwnProperty('url')) {
                                // 如果过期了，在这里生成新的临时码并修改值（公众号）
                                throw new Error('not implemented yet');
                            }
                            _d.label = 7;
                        case 7:
                            result_1_1 = result_1.next();
                            return [3 /*break*/, 4];
                        case 8: return [3 /*break*/, 11];
                        case 9:
                            e_1_1 = _d.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 11];
                        case 10:
                            try {
                                if (result_1_1 && !result_1_1.done && (_c = result_1.return)) _c.call(result_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                            return [7 /*endfinally*/];
                        case 11: return [2 /*return*/, count];
                    }
                });
            });
        }
    },
];
exports.default = triggers;
