import { String, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export declare type SystemConfig = {
    Cos: {
        qiniu: {
            appKey: string;
            appSecret: string;
        };
    };
    Map: {
        amap: {
            webApiKey: string;
        };
    };
};
export interface Schema extends EntityShape {
    name: String<32>;
    description: Text;
    config: SystemConfig;
}
export declare type Relation = 'owner';
