import { checkFilterContains } from 'oak-domain/lib/store/actionDef';
import { Checker, CreateChecker } from 'oak-domain/lib/types';
import { EntityDict } from '../general-app-domain';
import { RuntimeContext } from '../context/RuntimeContext';
import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';

const checkers: Checker<EntityDict, 'platform', RuntimeContext<EntityDict>>[] =
    [
        {
            type: 'data',
            action: 'create',
            entity: 'platform',
            checker: async ({ operation }, context) => {
                const { action, data } = operation;
                if (data instanceof Array) {
                    data.forEach((ele) => {
                        checkAttributesNotNull('platform', ele, [
                            'name',
                        ]);
                    });
                } else {
                    checkAttributesNotNull('platform', data, [
                        'name',
                    ]);
                }
                return 0;
            },
        } as CreateChecker<EntityDict, 'platform', RuntimeContext<EntityDict>>,
    ];

export default checkers;
