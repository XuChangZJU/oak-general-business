import { String, Text, Datetime, Boolean, Uint } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as Application } from './Application';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';


export interface Schema extends EntityShape {
    text: String<32>;
    application: Application;
    wechatId: Uint<4>;
    sync: Boolean;
    syncAt: Datetime;
};

const entityDesc: EntityDesc<Schema> = {
    locales: {
        zh_CN: {
            name: '公众号标签',
            attr: {
                text: 'tag名',
                application: '关联应用',
                wechatId: '微信端id',
                sync: '同步状态',
                syncAt: '同步时间',
            },
        },
     },
     indexes: [
        {
            name: 'index_text_application',
            attributes: [
                {
                    name: 'text',
                },
                {
                    name: 'application',
                },
            ],
            config: {
                unique: true,
            },
        },
    ],
};

