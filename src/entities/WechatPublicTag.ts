import { String, Text, Datetime, Boolean, Uint } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Schema as Application } from './Application';

export interface Schema extends EntityShape {
    text: String<32>;
    application: Application;
    wechatId: Uint<4>;
    sync: Boolean;
    syncAt: Datetime;
};


const locale: LocaleDef<Schema, '', '', {}> = {
    zh_CN: {
        attr: {
            text: 'tag名',
            application: '关联应用',
            wechatId: '微信端id',
            sync: '同步状态',
            syncAt: '同步时间',
        },
    },
 };
