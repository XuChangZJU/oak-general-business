import { String, Int, Datetime, Image, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as System } from './System';
import { Schema as ExtraFile } from './ExtraFile';

type WechatMpConfig = {
    type: 'wechatMp';
    appId: string;
    appSecret: string;
};

type WebConfig = {
    type: 'web';
    domain: string;
};

type WechatPublicCofig = {
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
    config: WebConfig | WechatMpConfig| WechatPublicCofig;
};
