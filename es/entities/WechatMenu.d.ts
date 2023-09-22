import { Int } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as Application } from './Application';
import { Schema as WechatPublicTag } from './WechatPublicTag';
type Config = {
    button: any[];
    matchrule?: {
        tag_id?: string;
    };
};
export interface Schema extends EntityShape {
    menuId?: Int<4>;
    menuConfig: Config;
    application: Application;
    publishState: 'wait' | 'success' | 'fail';
    wechatPublicTag?: WechatPublicTag;
}
export {};
