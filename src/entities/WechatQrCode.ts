import { String, Text, Datetime, Boolean } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { QrCodeType } from '../types/Config';
import { Schema as Application } from './Application';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export type WechatQrCodeProps = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
    isTabBar?: boolean; //小程序独有 小程序跳回tabBar的话 必须使用 wx.switchTab
};

export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    type: QrCodeType;
    allowShare: Boolean; // 是否允许通过分享授权
    tag?: String<32>; // 调用者加的tag
    tag2?: String<64>; // tag2
    expiresAt?: Datetime; // 过期时间
    expired?: Boolean; //是否过期
    ticket?: Text;
    url?: String<256>;
    permanent?: Boolean; //是否永久码
    buffer?: Text; // 若没有url，使用buffer存储生成的小程序码数据（base64)
    application: Application;
    props: WechatQrCodeProps;
}

const entityDesc: EntityDesc<
    Schema,
    '',
    '',
    {
        type: QrCodeType;
    }
> = {
    locales: {
        zh_CN: {
            name: '微信识别码',
            attr: {
                entity: '关联对象',
                entityId: '关联对象id',
                type: '类型',
                allowShare: '允许分享',
                tag: 'tag',
                tag2: 'tag2',
                ticket: 'ticket',
                url: 'url',
                permanent: '是否永久码',
                buffer: '小程序码数据（动态）',
                expired: '是否过期',
                expiresAt: '过期时间',
                application: '应用',
                props: '属性',
            },
            v: {
                type: {
                    webForWechatPublic: '网站引流到公众号',
                    wechatMpDomainUrl: '小程序普通链接二维码',
                    wechatMpWxaCode: '小程序码',
                    wechatPublic: '公众号关注码',
                    wechatPublicForMp: '公众号回复小程序码',
                },
            },
        },
    },
    indexes: [
        {
            name: 'index_entity_entityId_tag',
            attributes: [
                {
                    name: 'entity',
                },
                {
                    name: 'entityId',
                },
                {
                    name: 'tag',
                },
            ],
        },
        {
            name: 'index_expired_expiresAt',
            attributes: [
                {
                    name: 'expired',
                },
                {
                    name: 'expiresAt',
                },
            ],
        },
        {
            name: 'index_url',
            attributes: [
                {
                    name: 'url',
                },
            ],
        },
    ],
};
