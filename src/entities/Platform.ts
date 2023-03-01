import { String, Int, Datetime, Image, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Config } from '../types/Config';
import { Style } from '../types/Style';

export interface Schema extends EntityShape {
    name: String<32>;
    description: Text;
    config: Config;
    style?: Style;
    entity?: String<32>;     // System是抽象对象，应用上级与之一对一的对象可以使用双向指针，以方便编程
    entityId?: String<64>;
};

const locale: LocaleDef<Schema, '', '', {}> = {
    zh_CN: {
        name: '平台',
        attr: {
            name: '名称',
            description: '描述',
            config: '设置',
            style: '样式',
            entity: '关联对象',
            entityId: '关联对象id',
        },
    },
 };
