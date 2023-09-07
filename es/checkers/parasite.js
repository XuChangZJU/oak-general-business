import { OakRowInconsistencyException } from 'oak-domain/lib/types';
import { assert } from 'oak-domain/lib/utils/assert';
import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';
const checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'parasite',
        checker: (data, context) => {
            // const { data } = operation as EntityDict['parasite']['Create'];
            assert(!(data instanceof Array));
            checkAttributesNotNull('parasite', data, ['expiresAt', 'tokenLifeLength']);
            if (data.userId) {
                const users2 = context.select('user', {
                    data: {
                        id: 1,
                        userState: 1,
                    },
                    filter: {
                        id: data.userId,
                    },
                }, { dontCollect: true });
                const checkUser = (users) => {
                    const [user] = users;
                    if (user.userState !== 'shadow') {
                        throw new OakRowInconsistencyException({
                            a: 's',
                            d: {
                                user: {
                                    [user.id]: user,
                                },
                            },
                        });
                    }
                };
                if (users2 instanceof Promise) {
                    return users2.then((u) => checkUser(u));
                }
                return checkUser(users2);
            }
            assert(data.user && data.user.action === 'create');
        },
    },
    {
        type: 'row',
        entity: 'parasite',
        action: ['cancel'],
        errMsg: '您没有设置失效的权限',
        filter: {
            expired: false,
        },
    },
    {
        type: 'row',
        entity: 'parasite',
        action: ['qrcode'],
        errMsg: '您没有查看二维码的权限',
        filter: {
            expired: false,
        },
    },
];
export default checkers;
