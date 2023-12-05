import { String, Text, Datetime, Boolean, Uint } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as System } from './System';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export interface Schema extends EntityShape {
    system: System;
    origin: String<64>;
    templateName: Text;
    templateCode: String<64>;
    templateContent: Text;
    syncAt: Datetime;
};

const entityDesc: EntityDesc<Schema> = {
    locales: {
        zh_CN: {
            name: '微信模板',
            attr: {
                system: '系统',
                origin: '源',
                templateName: '模板名称',
                templateCode: '模板Code',
                templateContent: '模板内容',
                syncAt: '同步时间'
            },
        },
    },
};

