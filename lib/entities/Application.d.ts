import { String, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as System } from './System';
import { Schema as ExtraFile } from './ExtraFile';
export interface Schema extends EntityShape {
    name: String<32>;
    description: Text;
    type: 'web' | 'wechatPublic' | 'weChatMp';
    system: System;
    dd: Array<ExtraFile>;
}
