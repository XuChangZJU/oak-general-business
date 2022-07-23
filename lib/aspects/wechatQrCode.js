"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWechatQrCode = void 0;
const assert_1 = require("oak-domain/lib/utils/assert");
async function createWechatQrCode(options, context) {
    const { entity, entityId, applicationId, tag, lifetimeLength, permanent, props } = options;
    const { type: appType, config } = (await context.getApplication());
    if (appType === 'wechatMp') {
        const { qrCodePrefix } = config;
        const id = await generateNewId();
        if (qrCodePrefix) {
            // 设置了域名跳转，优先使用域名 + id来生成对应的ur
            const data = {
                id,
                type: 'wechatMpDomainUrl',
                tag,
                entity,
                entityId,
                applicationId,
                allowShare: true,
                permanent: true,
                url: `${qrCodePrefix}/id`,
                expired: false,
                props,
            };
            await context.rowStore.operate('wechatQrCode', {
                action: 'create',
                data,
            }, context);
            return data;
        }
        else {
            // 没有域名跳转，使用小程序码
            // todo这里如果有同组的公众号，应该优先使用公众号的关注链接
            const data = {
                id,
                type: 'wechatMpWxaCode',
                tag,
                entity,
                entityId,
                applicationId,
                allowShare: true,
                permanent: false,
                expired: false,
                props,
            };
            await context.rowStore.operate('wechatQrCode', {
                action: 'create',
                data,
            }, context);
            return data;
        }
    }
    else {
        (0, assert_1.assert)(appType === 'wechatPublic');
        // 还未实现，记得
        throw new Error('method not implemented yet');
    }
}
exports.createWechatQrCode = createWechatQrCode;
