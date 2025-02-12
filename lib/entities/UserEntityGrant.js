"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entityDesc = {
    locales: {
        zh_CN: {
            name: '用户授权',
            attr: {
                entity: '关联对象',
                entityId: '关联对象id',
                relationIds: '权限',
                relationEntity: '关联对象',
                relationEntityFilter: '对象限定条件',
                type: '类型',
                rule: '领权规则',
                ruleOnRow: '选择对象规则',
                multiple: '允许多人选择',
                remark: '备注',
                granter: '授权人',
                codes: '微信码',
                expired: '是否失效',
                expiresAt: '过期时间',
                redirectTo: '重定向页面',
                qrCodeType: '二维码类型',
                claimUrl: '认领路由',
            },
            action: {
                claim: '领取',
                disable: '失效',
            },
            v: {
                type: {
                    grant: '授予',
                    transfer: '转交',
                },
                qrCodeType: {
                    webForWechatPublic: '网站引流到公众号',
                    wechatMpDomainUrl: '小程序普通链接二维码',
                    wechatMpWxaCode: '小程序码',
                    wechatPublic: '公众号关注码',
                    wechatPublicForMp: '公众号回复小程序码',
                },
                rule: {
                    single: '单选',
                    all: '全选',
                    free: '自由选择',
                },
                ruleOnRow: {
                    single: '单选',
                    all: '全选',
                    free: '自由选择',
                },
            },
        },
    },
    indexes: [
        {
            name: 'index_expired_expiredAt',
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
