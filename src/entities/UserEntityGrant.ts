import { String, Text, Datetime, Int, Boolean} from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as User } from './User';
import { Schema as WechatQrCode } from './WechatQrCode';
import { QrCodeType } from '../types/Config';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

type RelationIds = string[];

export type RedirectToProps = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
    isTabBar?: boolean; //小程序独有 小程序跳回tabBar的话 必须使用 wx.switchTab
};
type Rule = 'single' | 'all' | 'free';

export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    relationEntity: String<32>;
    relationEntityFilter: Object;
    relationIds: RelationIds;
    type: 'grant' | 'transfer';
    rule: Rule;                                   // 对多个relation是单选/全选/自由选择
    ruleOnRow: Rule;                             // 对多个(entity)row是单选/全选/自由选择
    multiple?: Boolean;                         // 如果置false，则第一个claim会使之失效
    remark?: Text;
    granter: User;
    codes: Array<WechatQrCode>;
    qrCodeType: QrCodeType;
    expiresAt?: Datetime;
    expired?: Boolean;
    redirectTo?: RedirectToProps;
    claimUrl: String<128>;
}

type Action = 'claim';

const entityDesc: EntityDesc<Schema, Action, '', {
    type: Schema['type'];
    qrCodeType: QrCodeType;
    rule: Schema['rule'];
    ruleOnRow: Schema['ruleOnRow'];
}> = {
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
                },
                rule: {
                    single: '单选',
                    all: '全选',
                    free: '自由选择'
                },
                ruleOnRow: {
                    single: '单选',
                    all: '全选',
                    free: '自由选择'
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
                }
            ],
        },
    ],
};
