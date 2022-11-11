import { checkFilterContains } from 'oak-domain/lib/store/actionDef';
import { Checker, CreateChecker } from 'oak-domain/lib/types';
import { EntityDict } from '../general-app-domain';
import { RuntimeContext } from '../context/RuntimeContext';
import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';

const checkers: Checker<EntityDict, 'system', RuntimeContext<EntityDict>>[] = [
    {
        type: 'data',
        action: 'create',
        entity: 'system',
        checker: async ({ operation }, context) => {
            const { action, data } = operation;
            if (data instanceof Array) {
                data.forEach((ele) => {
                    checkAttributesNotNull('system', ele, ['name', 'platformId']);
                });
            } else {
                checkAttributesNotNull('system', data, ['name', 'platformId']);
            }
            return 0;
        },
    } as CreateChecker<EntityDict, 'system', RuntimeContext<EntityDict>>,
];

export default checkers;
