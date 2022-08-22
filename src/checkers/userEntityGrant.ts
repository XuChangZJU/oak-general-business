import {
    Checker, CreateChecker, OakInputIllegalException,
} from 'oak-domain/lib/types';
import { EntityDict } from '../general-app-domain';
import { GeneralRuntimeContext } from '../RuntimeContext';
import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';

const checkers: Checker<
    EntityDict,
    'userEntityGrant',
    GeneralRuntimeContext<EntityDict>
>[] = [
    {
        type: 'data',
        action: 'create',
        entity: 'userEntityGrant',
        checker: async ({ operation }, context) => {            
            const { data } = operation;
            if (data instanceof Array) {
                data.forEach(
                    ele => {
                        checkAttributesNotNull(ele, ['type', 'entity', 'entityId', 'relation']);
                        if (!ele.hasOwnProperty('number') || ele.type === 'transfer') {
                            Object.assign(ele, {
                                number: 1,
                            });
                        }
                        else {
                            if (ele.number <= 0 ) {
                                throw new OakInputIllegalException(['number', '分享的权限数量必须大于0']);
                            }
                        }
                        Object.assign(ele, {
                            confirmed: 0,
                        });
                    }
                );
            }
            else {
                checkAttributesNotNull(data, ['type', 'entity', 'entityId', 'relation']);
                if (!data.hasOwnProperty('number') || data.type === 'transfer') {
                    Object.assign(data, {
                        number: 1,
                    });
                }
                else {
                    if (data.number <= 0 ) {
                        throw new OakInputIllegalException(['number', '分享的权限数量必须大于0']);
                    }
                }
                Object.assign(data, {
                    confirmed: 0,
                });
            }
            return 0;
        },
    } as CreateChecker<EntityDict, 'userEntityGrant', GeneralRuntimeContext<EntityDict>
>,
];

export default checkers;
