import { String, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as System } from './System';
import { Schema as Session } from './Session';
import { Style } from '../types/Style';
export type Passport = 'email' | 'mobile' | 'wechat' | 'wechatPublic';
export type AppType = 'web' | 'wechatMp' | 'wechatPublic' | 'native';
export type WechatMpConfig = {
    type: 'wechatMp';
    appId: string;
    appSecret: string;
    originalId?: string;
    qrCodePrefix?: string;
    server?: {
        url?: string;
        token: string;
        encodingAESKey: string;
        mode: 'clear' | 'compatible' | 'safe';
        dataFormat: 'json' | 'xml';
    };
    passport?: Passport[];
};
export type WebConfig = {
    type: 'web';
    wechat?: {
        appId: string;
        appSecret: string;
        domain?: string;
        enable?: boolean;
    };
    passport?: Passport[];
};
export type WechatPublicTemplateMsgsConfig = Record<string, string>;
export type WechatPublicConfig = {
    type: 'wechatPublic';
    isService: boolean;
    appId: string;
    appSecret: string;
    originalId?: string;
    enable?: boolean;
    templateMsgs?: WechatPublicTemplateMsgsConfig;
    server?: {
        url?: string;
        token: string;
        encodingAESKey: string;
        mode: 'clear' | 'compatible' | 'safe';
    };
    wechatMp?: {
        appId: string;
        originalId: string;
    };
    passport?: Passport[];
};
export type NativeConfig = {
    type: 'native';
    passport?: Passport[];
};
export interface Schema extends EntityShape {
    name: String<32>;
    description: Text;
    type: AppType;
    system: System;
    config: WebConfig | WechatMpConfig | WechatPublicConfig | NativeConfig;
    style?: Style;
    sessions?: Session[];
}
