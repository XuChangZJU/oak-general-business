import { String } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as WechatPublicTemplate } from './WechatPublicTemplate';
export interface Schema extends EntityShape {
    type: String<64>;
    template: WechatPublicTemplate;
}
