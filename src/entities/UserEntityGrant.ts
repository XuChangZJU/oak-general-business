import { String, Text, Datetime, Int } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Index } from 'oak-domain/lib/types/Storage';
import { Schema as User } from './User';
import { Schema as WechatQrCode } from './WechatQrCode';
import { QrCodeType } from '../types/Config';

export type RedirectToProps = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
    isTabBar?: boolean; //小程序独有 小程序跳回tabBar的话 必须使用 wx.switchTab
};

export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    relation: String<32>;
    type: 'grant' | 'transfer';
    number: Int<2>;
    confirmed: Int<2>;
    remark?: Text;
    granter: User;
    grantee?: User;
    codes: Array<WechatQrCode>;
    qrCodeType: QrCodeType;
    expiresAt?: Datetime;
    expired?: Boolean;
    redirectTo?: RedirectToProps;
}

type Action = 'confirm';

const indexes: Index<Schema>[] = [
    {
        name: 'index_entity_entityId',
        attributes: [
            {
                name: 'entity',
            },
            {
                name: 'entityId',
            },
        ],
    },
    {
        name: 'index_uuid',
        attributes: [
            {
                name: 'expired',
            },
            {
                name: 'expiresAt',
            }
        ],
    },
];

const locale: LocaleDef<
    Schema,
    Action,
    '',
    {
        type: Schema['type'];
        qrCodeType: QrCodeType;
    }
> = {
    zh_CN: {
        name: '用户授权',
        attr: {
            relation: '关系',
            entity: '关联对象',
            entityId: '关联对象id',
            type: '类型',
            number: '次数',
            confirmed: '已确认人数',
            remark: '备注',
            grantee: '领取人',
            granter: '授权人',
            codes: '微信码',
            expired: '是否过期',
            expiresAt: '过期时间',
            redirectTo: '重定向页面',
            qrCodeType: '二维码类型',
        },
        action: {
            confirm: '确认',
        },
        v: {
            type: {
                grant: '授予',
                transfer: '转交',
            },
            qrCodeType: {
                webForWechatPublic: '网站引流到公众号',
                wechatMpDomainUrl: '小程序url码',
                wechatMpWxaCode: '小程序码',
                wechatPublic: '公众号关注码',
                wechatPublicForMp: '公众号回复小程序码',
            }
        },
    },
};
