import { String, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { QiniuConfig } from '../types/Config';
export declare type PlatformConfig = {
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
    config: PlatformConfig;
}
