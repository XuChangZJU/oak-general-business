import { String, Text, Int } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export type WechatPublicConfig = {
    type: 'wechatPublic';
    appId: string;
    appSecret: string;
};
export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    name: String<32>;
    description?: Text;
    config?: WechatPublicConfig;
    offset?: Int<4>;
}
