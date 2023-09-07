import { makeAbleActionDef } from 'oak-domain/lib/actions/action';
;
const AbleActionDef = makeAbleActionDef('enabled');
const entityDesc = {
    locales: {
        zh_CN: {
            name: '邮箱',
            attr: {
                ableState: '是否可用',
                email: '邮箱',
                user: '关联用户',
                tokens: '相关令牌',
            },
            action: {
                enable: '启用',
                disable: '禁用',
            },
            v: {
                ableState: {
                    enabled: '可用的',
                    disabled: '禁用的',
                }
            }
        },
    },
    indexes: [
        {
            name: 'index_email_ableState',
            attributes: [
                {
                    name: 'email',
                    direction: 'ASC',
                },
                {
                    name: 'ableState',
                    direction: 'ASC',
                }
            ],
        },
    ],
};
