import { String, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as System } from './System';
import { Schema as ExtraFile } from './ExtraFile';
declare type WechatMpConfig = {
    type: 'wechatMp';
    appId: string;
    appSecret: string;
};
declare type WebConfig = {
    type: 'web';
    domain: string;
};
declare type WechatPublicCofig = {
    type: 'wechatPublic';
    appId: string;
    appSecret: string;
};
export interface Schema extends EntityShape {
    name: String<32>;
    description: Text;
    type: 'web' | 'wechatPublic' | 'weChatMp';
    system: System;
    dd: Array<ExtraFile>;
    config: WebConfig | WechatMpConfig | WechatPublicCofig;
}
export {};
