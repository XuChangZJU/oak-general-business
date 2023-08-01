import { Checker, OakRowInconsistencyException } from 'oak-domain/lib/types';
import assert from 'assert';
import { EntityDict } from '../general-app-domain';
import { RuntimeCxt } from '../types/RuntimeCxt';

const checkers: Checker<EntityDict, 'parasite', RuntimeCxt>[] = [
    {
        type: 'logical',
        action: 'create',
        entity: 'parasite',
        checker: (operation, context, option) => {
            const { data } = operation as EntityDict['parasite']['Create'];
            assert(!(data instanceof Array));
            if (!data.expiresAt) {
                data.expiresAt = Date.now() + 3600 * 1000;
            }
            data.expired = false;
            if (!data.tokenLifeLength) {
                data.tokenLifeLength = 3600 * 1000;
            }

            if (data.userId) {
                const users2 = context.select(
                    'user',
                    {
                        data: {
                            id: 1,
                            userState: 1,
                        },
                        filter: {
                            id: data.userId,
                        },
                    },
                    { dontCollect: true }
                );

                const checkUser = (
                    users: Partial<EntityDict['user']['OpSchema']>[]
                ) => {
                    const [user] = users;
                    if (user.userState !== 'shadow') {
                        throw new OakRowInconsistencyException({
                            a: 's',
                            d: {
                                user: {
                                    [user.id!]: user,
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
            assert(
                (data as any).user && (data as any).user.action === 'create'
            );
        },
    },
];

export default checkers;
