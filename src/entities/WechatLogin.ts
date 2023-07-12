import { String, Text, Datetime, Int } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Index } from 'oak-domain/lib/types/Storage';
import { Schema as User } from './User';
import { Schema as WechatQrCode } from './WechatQrCode';
import { QrCodeType } from '../types/Config';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export interface Schema extends EntityShape {
    user?: User;
    type: 'bind' | 'login';
    successed: Boolean;
    remark?: Text;
    qrCodeType: QrCodeType;
    expiresAt?: Datetime;
    expired?: Boolean;
    codes: Array<WechatQrCode>;
}

type Action = 'success';

const indexes: Index<Schema>[] = [
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
const entityDesc: EntityDesc<
    Schema,
    Action,
    '',
    {
        type: Schema['type'];
        qrCodeType: QrCodeType;
    }
> = {
    indexes: [
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
    ],
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
    }
}
