import { String, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as System } from './System';
export declare type AppType = 'web' | 'wechatMp' | 'wechatPublic';
export declare type WechatMpConfig = {
    type: 'wechatMp';
    appId: string;
    appSecret: string;
    qrCodePrefix?: string;
};
export declare type WebConfig = {
    type: 'web';
    appId?: string;
    appSecret?: string;
};
declare type WechatPublicTemplateMsgsConfig = Record<string, {
    templateId: string;
    dataDef: [string, string][];
}>;
export declare type WechatPublicConfig = {
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
}
export {};
