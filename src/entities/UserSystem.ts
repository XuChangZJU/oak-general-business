import { String, Int, Text, Image, Datetime } from 'oak-domain/lib/types/DataType';
import { ActionDef } from 'oak-domain/lib/types/Action';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Schema as User } from './User';
import { Schema as System } from './System';
import { EntityShape } from 'oak-domain/lib/types/Entity';

export interface Schema extends EntityShape {
    user: User;
    system: System;
};

const locale: LocaleDef<Schema, '', '', {}> = {
    "zh_CN": {
        name: '用户系统',
        attr: {
            user: '用户',
            system: '系统',
        },
    }
};
