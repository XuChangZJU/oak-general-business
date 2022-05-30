import { String, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as System } from './System';
import { Schema as ExtraFile } from './ExtraFile';
export declare type WechatMpConfig = {
    type: 'wechatMp';
    appId: string;
    appSecret: string;
    qrCodePrefix?: string;
};
export declare type WebConfig = {
    type: 'web';
    domain: string;
};
export declare type WechatPublicCofig = {
    type: 'wechatPublic';
    appId: string;
    appSecret: string;
};
export interface Schema extends EntityShape {
    name: String<32>;
    description: Text;
    type: 'web' | 'wechatPublic' | 'wechatMp';
    system: System;
    dd: Array<ExtraFile>;
    config: WebConfig | WechatMpConfig | WechatPublicCofig;
}
