import { String, Int, Text, Image } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';

export interface Schema extends EntityShape {
    name: String<24>;
    template: Text;
};

const locale: LocaleDef<Schema, '', '', {}> = {
    zh_CN: {
        attr: {
            name: '名称',
            template: '模板',
        },
    },
};
