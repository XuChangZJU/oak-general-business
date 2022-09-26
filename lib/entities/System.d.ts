import { String, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { QiniuConfig } from '../types/Config';
import { Schema as Platform } from './Platform';
export declare type SystemConfig = {
    Cos?: {
        qiniu?: QiniuConfig;
    };
    Map?: {
        amap?: {
            webApiKey: string;
        };
    };
    UserEntityGrant?: {
        lifetimeLength: number;
    };
};
export interface Schema extends EntityShape {
    name: String<32>;
    description: Text;
    config: SystemConfig;
    platform: Platform;
    super?: Boolean;
}
