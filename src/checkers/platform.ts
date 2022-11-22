import { Checker } from 'oak-domain/lib/types';
import { EntityDict } from '../general-app-domain';
import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';
import { RuntimeCxt } from '../types/RuntimeCxt';

const checkers: Checker<EntityDict, 'platform', RuntimeCxt>[] =
    [
        {
            type: 'data',
            action: 'create',
            entity: 'platform',
            checker: (data) => {
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
        },
    ];

export default checkers;
