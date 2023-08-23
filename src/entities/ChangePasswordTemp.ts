import { ActionType, EntityShape } from 'oak-domain/lib/types/Entity';
import { String, Text, Boolean, Datetime } from 'oak-domain/lib/types/DataType';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { ActionDef, Index } from 'oak-domain/lib/types';
import { Schema as User } from './User';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export interface Schema extends EntityShape {
    user: User;
    prevPassword?: String<32>;
    newPassword?: String<32>;
    result: 'success' | 'fail';
};


const entityDesc: EntityDesc<Schema,
    '',
    '',
    {
        result: Schema['result'];
    }> = {
    locales: {
        zh_CN: {
            name: '密码修改记录',
            attr: {
                user: '用户',
                prevPassword: '原密码',
                newPassword: '新密码',
                result: "修改结果",
            },
            v: {
                result: {
                    success: '成功',
                    fail: '失败'
                }
            },
        },
    }
};
