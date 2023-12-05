import { String } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as WechatTemplate } from './WechatTemplate';
export interface Schema extends EntityShape {
    type: String<64>;
    template: WechatTemplate;
}
