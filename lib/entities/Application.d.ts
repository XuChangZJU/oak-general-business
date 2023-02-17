import { String, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as System } from './System';
import { Style } from '../types/Style';
export declare type Passport = 'email' | 'mobile' | 'wechat';
export declare type AppType = 'web' | 'wechatMp' | 'wechatPublic';
export declare type WechatMpConfig = {
    type: 'wechatMp';
    appId: string;
    appSecret: string;
    qrCodePrefix?: string;
    server?: {
        url?: string;
        token: string;
        encodingAESKey: string;
        mode: 'clear' | 'compatible' | 'safe';
        dataFormat: 'json' | 'xml';
    };
};
export declare type WebConfig = {
    type: 'web';
    wechat?: {
        appId: string;
        appSecret: string;
        domain?: string;
        enable?: boolean;
    };
    passport: Passport[];
};
export declare type WechatPublicTemplateMsgsConfig = Record<string, string>;
export declare type WechatPublicConfig = {
    type: 'wechatPublic';
    isService: boolean;
    appId: string;
    appSecret: string;
    templateMsgs?: WechatPublicTemplateMsgsConfig;
    server?: {
        url?: string;
        token: string;
        encodingAESKey: string;
        mode: 'clear' | 'compatible' | 'safe';
    };
};
export interface Schema extends EntityShape {
    name: String<32>;
    description: Text;
    type: AppType;
    system: System;
    config: WebConfig | WechatMpConfig | WechatPublicConfig;
    style?: Style;
}
