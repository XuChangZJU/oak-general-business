import { String, Int, Datetime, Image, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as System } from './System';
import { LocaleDef } from 'oak-domain/lib/types/Locale';

type Passport = 'email' | 'mobile' | 'wechat';
export type AppType = 'web' | 'wechatMp' | 'wechatPublic';
export type WechatMpConfig = {
    type: 'wechatMp';
    appId: string;
    appSecret: string;
    qrCodePrefix?: string;      // 扫描二维码跳转的前缀(在小程序后台配置，必须统一跳转到weCharQrCode/scan/index)
};

export type WebConfig = {
    type: 'web';
    wechat?: {
        appId: string;
        appSecret: string; //网站 微信扫码登录
    };
    passport: Passport[];
};

type WechatPublicTemplateMsgsConfig = Record<string, {
    templateId: string;
    dataDef: [string, string][];    // 前一个代表keyword，后一个代表color
}>;     // key值代表messageTypeId

export type WechatPublicConfig = {
    type: 'wechatPublic';
    appId: string;
    appSecret: string;
    templateMsgs?: WechatPublicTemplateMsgsConfig;
};

export interface Schema extends EntityShape {
    name: String<32>;
    description: Text;
    type: AppType;
    system: System;
    config: WebConfig | WechatMpConfig | WechatPublicConfig;
};

const locale: LocaleDef<Schema, '', '', {
    type: Schema['type'];
}> = {
    zh_CN: {
        attr: {
            description: '描述',
            type: '类型',
            system: '系统',
            name: '名称',
            config: '设置',
        },
        v: {
            type: {
                web: '网站',
                wechatPublic: '微信公众号',
                wechatMp: '微信小程序',
            }
        }
    },
};
