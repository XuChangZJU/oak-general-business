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
};

const locale: LocaleDef<Schema, '', '', {}> = {
    zh_CN: {
        attr: {
            name: '名称',
            description: '描述',
            config: '设置',
            style: '样式',
        },
    },
 };
