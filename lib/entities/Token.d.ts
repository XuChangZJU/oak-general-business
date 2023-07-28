import { String, Datetime } from 'oak-domain/lib/types/DataType';
import { Schema as User } from './User';
import { Schema as Application } from './Application';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export declare type WechatMpEnv = {
    type: 'wechatMp';
    brand: string;
    model: string;
    pixelRatio: number;
    screenWidth: number;
    screenHeight: number;
    windowWidth: number;
    windowHeight: number;
    statusBarHeight: number;
    language: string;
    version: string;
    system: string;
    platform: string;
    fontSizeSetting: number;
    SDKVersion: string;
};
export declare type WebEnv = {
    type: 'web';
    visitorId: string;
    platform: {
        value: string;
    };
    timezone: {
        value: string;
    };
    vendor: {
        value: string;
    };
    vendorFlavors: {
        value: string[];
    };
};
export declare type ServerEnv = {
    type: 'server';
};
export declare type Environment = WechatMpEnv | WebEnv | ServerEnv;
export interface Schema extends EntityShape {
    application?: Application;
    entity: String<32>;
    entityId: String<64>;
    user?: User;
    player?: User;
    disablesAt?: Datetime;
    env: Environment;
}
