import { String, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export declare type SystemConfig = {
    Cos?: {
        qiniu?: {
            accessKey: string;
            secretKey: string;
            uploadHost: string;
            bucket: string;
            domain: string;
            protocol: string | string[];
        };
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
}
export declare type Relation = 'owner';
