"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const oak_wechat_sdk_1 = require("oak-wechat-sdk");
const uuid_1 = require("oak-domain/lib/utils/uuid");
const lodash_1 = require("lodash");
const triggers = [
    {
        name: '选择userEntityGrant时，动态生成需要的数据',
        entity: 'wechatQrCode',
        action: 'select',
        when: 'after',
        fn: async ({ result }, context, params) => {
            let count = 0;
            const application = await context.getApplication();
            const { type, config } = application;
            (0, assert_1.default)(type === 'wechatMp' || config.type === 'wechatMp');
            const config2 = config;
            const { appId, appSecret } = config2;
            for (const code of result) {
                const { type, expired, url, id } = code;
                console.log('code', code);
                if (type === 'wechatMpWxaCode') {
                    // 小程序码去实时获取（暂时不考虑缓存）
                    const wechatInstance = oak_wechat_sdk_1.WechatSDK.getInstance(appId, appSecret, 'wechatMp');
                    const buffer = await wechatInstance.getMpUnlimitWxaCode({
                        scene: (0, uuid_1.shrinkUuidTo32Bytes)(id),
                        page: 'pages/index/index', // todo，这里用其它的页面微信服务器拒绝，因为没发布。应该是 pages/wechatQrCode/scan/index
                    });
                    // 把arrayBuffer转成字符串返回
                    const str = String.fromCharCode(...new Uint8Array(buffer));
                    (0, lodash_1.assign)(code, {
                        buffer: str,
                    });
                }
                else if (expired) {
                    // 如果过期了，在这里生成新的临时码并修改值（公众号）
                    throw new Error('not implemented yet');
                }
            }
            return count;
        }
    },
];
exports.default = triggers;
