import { String, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Schema as Platform } from './Platform';
import { Config } from '../types/Config';
import { Style } from '../types/Style';

export interface Schema extends EntityShape {
    name: String<32>;
    description: Text;
    config: Config;
    platform: Platform;
    folder: String<16>;
    super?: Boolean; // super表示是这个platform本身的系统，可以操作application/system这些数据，也可以访问超出本system的其它数据。
    style?: Style;
};


const locale: LocaleDef<Schema, '', '', {}> = {
    zh_CN: {
        attr: {
            name: '名称',
            description: '描述',
            config: '设置',
            platform: '平台',
            super: '超级系统',
            folder: '代码目录名',
            style: '样式',
        },
    },
};