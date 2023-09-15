"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entityDesc = {
    locales: {
        zh_CN: {
            name: '绑定微信号',
            attr: {
                user: '用户',
                type: '类型',
                successed: '是否成功',
                remark: '备注',
                codes: '微信码',
                expired: '是否过期',
                expiresAt: '过期时间',
                qrCodeType: '二维码类型',
            },
            action: {
                success: '成功',
            },
            v: {
                type: {
                    bind: '绑定',
                    login: '登录',
                },
                qrCodeType: {
                    webForWechatPublic: '网站引流到公众号',
                    wechatMpDomainUrl: '小程序url码',
                    wechatMpWxaCode: '小程序码',
                    wechatPublic: '公众号关注码',
                    wechatPublicForMp: '公众号跳转小程序码',
                },
            },
        },
    },
    indexes: [
        {
            name: 'index_uuid',
            attributes: [
                {
                    name: 'expired',
                },
                {
                    name: 'expiresAt',
                },
            ],
        },
    ],
};
