import { String, Int, Datetime, Image, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';

export type SystemConfig = {
    Cos: {
        qiniu: {
            appKey: string;
            appSecret: string;
        }
    },
    Map: {
        amap: {
            webApiKey: string;      // 高德访问rest服务接口的key
        }
    }
}

export interface Schema extends EntityShape {
    name: String<32>;
    description: Text;
    config: SystemConfig;
};

export type Relation = 'owner';