import { String, Int, Datetime, Image, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as System } from './System';
import { Style } from '../types/Style';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export type Passport = 'email' | 'mobile' | 'wechat';
export type AppType = 'web' | 'wechatMp' | 'wechatPublic';
export type WechatMpConfig = {
    type: 'wechatMp';
    appId: string;
    appSecret: string;
    originalId?: string; //原始id
    qrCodePrefix?: string; // 扫描二维码跳转的前缀(在小程序后台配置，必须统一跳转到weCharQrCode/scan/index)
    server?: {
        url?: string; //服务器地址(URL)
        token: string; //令牌(Token)
        encodingAESKey: string; //消息加解密密钥(EncodingAESKey)
        mode: 'clear' | 'compatible' | 'safe'; //消息加解密方式 明文模式 兼容模式 安全模式
        dataFormat: 'json' | 'xml';
    };
};

export type WebConfig = {
    type: 'web';
    wechat?: {
        appId: string;
        appSecret: string; //网站 微信扫码登录
        domain?: string;
        enable?: boolean; //启用扫码登录
    };
    passport: Passport[];
};

export type WechatPublicTemplateMsgsConfig = Record<string, string>;     // key值代表messageTypeId，value的值代表对应的templateId，data的转换改成message上的函数注入

export type WechatPublicConfig = {
    type: 'wechatPublic';
    isService: boolean; // 是否服务号
    appId: string;
    appSecret: string;
    originalId?: string; //原始id
    templateMsgs?: WechatPublicTemplateMsgsConfig;
    server?: {
        url?: string; //服务器地址(URL)
        token: string; //令牌(Token)
        encodingAESKey: string; //消息加解密密钥(EncodingAESKey)
        mode: 'clear' | 'compatible' | 'safe'; //消息加解密方式 明文模式 兼容模式 安全模式
    };
    wechatMp?: {
        appId: string;
        //公众号跳小程序配置 originalId
        originalId: string; //原始id
    };
};

export interface Schema extends EntityShape {
    name: String<32>;
    description: Text;
    type: AppType;
    system: System;
    config: WebConfig | WechatMpConfig | WechatPublicConfig;
    style?: Style;
};

const entityDesc: EntityDesc<Schema> = {
    locales: {
        zh_CN: {
            name: '应用',
            attr: {
                description: '描述',
                type: '类型',
                system: '系统',
                name: '名称',
                config: '设置',
                style: '样式',
            },
            v: {
                type: {
                    web: '网站',
                    wechatPublic: '微信公众号',
                    wechatMp: '微信小程序',
                }
            }
        },
    }
};
