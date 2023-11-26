import { OakInputIllegalException, } from 'oak-domain/lib/types';
import { assert } from 'oak-domain/lib/utils/assert';
import { generateNewId } from 'oak-domain/lib/utils/uuid';
const checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'userEntityGrant',
        checker: (data) => {
            if (data instanceof Array) {
                data.forEach((ele) => {
                    if (!ele.relationIds || ele.relationIds.length === 0) {
                        throw new OakInputIllegalException('userEntityGrant', ['relationIds'], '至少应选择一个关系');
                    }
                });
            }
            else {
                if (!data.relationIds || data.relationIds.length === 0) {
                    throw new OakInputIllegalException('userEntityGrant', ['relationIds'], '至少应选择一个关系');
                }
            }
        },
    },
    {
        type: 'row',
        entity: 'userEntityGrant',
        action: 'claim',
        filter: {
            expired: false,
        },
    },
    {
        type: 'logical',
        entity: 'userEntityGrant',
        action: 'claim',
        checker: (operation, context, option) => {
            const { data, filter } = operation;
            assert(Object.keys(data).length === 1 && data.hasOwnProperty('userEntityClaim$ueg'));
            const { userEntityClaim$ueg } = data;
            assert(filter.id);
            assert(userEntityClaim$ueg instanceof Array);
            const result = context.select('userEntityGrant', {
                data: {
                    id: 1,
                    relationEntity: 1,
                    multiple: 1,
                },
                filter,
            }, option);
            const dealInner = (userEntityGrant) => {
                const { relationEntity, multiple } = userEntityGrant;
                if (!multiple) {
                    userEntityGrant.expired = true;
                    userEntityGrant.expiresAt = Date.now();
                }
                userEntityClaim$ueg.forEach((uec) => {
                    const { action, data } = uec;
                    assert(action === 'create');
                    const { userId, relationId, claimEntityId } = data;
                    Object.assign(data, {
                        userRelation: {
                            id: generateNewId(),
                            action: 'create',
                            data: {
                                id: generateNewId(),
                                userId,
                                relationId,
                                entityId: claimEntityId,
                                entity: relationEntity,
                            }
                        }
                    });
                });
                return userEntityClaim$ueg.length;
            };
            if (result instanceof Promise) {
                return result.then(([ueg]) => dealInner(ueg));
            }
            return dealInner(result[0]);
        }
    }
];
export default checkers;
