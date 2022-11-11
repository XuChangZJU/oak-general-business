import { checkFilterContains } from 'oak-domain/lib/store/actionDef';
import { Checker, CreateChecker } from 'oak-domain/lib/types';
import { EntityDict } from '../general-app-domain';
import { RuntimeContext } from '../context/RuntimeContext';
import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';

const checkers: Checker<
    EntityDict,
    'application',
    RuntimeContext<EntityDict>
>[] = [
    {
        type: 'data',
        action: 'create',
        entity: 'application',
        checker: async ({ operation }, context) => {
            const { action, data } = operation;
            if (data instanceof Array) {
                data.forEach((ele) => {
                    checkAttributesNotNull('application', ele, [
                        'name',
                        'type',
                        'systemId',
                    ]);
                });
            } else {
                checkAttributesNotNull('application', data, [
                    'name',
                    'type',
                    'systemId',
                ]);
            }
            return 0;
        },
    } as CreateChecker<EntityDict, 'application', RuntimeContext<EntityDict>>,
];

export default checkers;
