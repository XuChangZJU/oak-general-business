import {
    Checker, OakInputIllegalException,
} from 'oak-domain/lib/types';
import { EntityDict } from 'oak-app-domain';
import { GeneralRuntimeContext } from '../RuntimeContext';
import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';
import { assign } from 'lodash';

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
                        checkAttributesNotNull(ele, ['action', 'entity', 'entityId', 'relation']);
                        if (!ele.hasOwnProperty('number')) {
                            assign(ele, {
                                number: 1,
                            });
                        }
                        else {
                            if (ele.number <= 0 ) {
                                throw new OakInputIllegalException(['number', '分享的权限数量必须大于0']);
                            }
                        }
                        assign(ele, {
                            confirmed: 0,
                        });
                    }
                );
            }
            else {
                checkAttributesNotNull(data, ['action', 'entity', 'entityId', 'relation']);
                if (!data.hasOwnProperty('number')) {
                    assign(data, {
                        number: 1,
                    });
                }
                else {
                    if (data.number <= 0 ) {
                        throw new OakInputIllegalException(['number', '分享的权限数量必须大于0']);
                    }
                }
                assign(data, {
                    confirmed: 0,
                });
            }
            return 0;
        },
    },
];

export default checkers;
