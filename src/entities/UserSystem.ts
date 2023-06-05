import { Schema as User } from './User';
import { Schema as System } from './System';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export interface Schema extends EntityShape {
    user: User;
    system: System;
};

const entityDesc: EntityDesc<Schema> = {
    locales: {
        "zh_CN": {
            name: '用户系统',
            attr: {
                user: '用户',
                system: '系统',
            },
        }
    }
};
