import { String, Int, Datetime, Image, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Config } from '../types/Config';

export interface Schema extends EntityShape {
    name: String<32>;
    description: Text;
    config: Config;
};

const locale: LocaleDef<Schema, '', '', {}> = {
    zh_CN: {
        attr: {
            name: '名称',
            description: '描述',
            config: '设置',
        },
    },
 };
