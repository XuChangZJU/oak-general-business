import { Checker } from 'oak-domain/lib/types';
import { EntityDict } from '../general-app-domain';
import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';
import { RuntimeCxt } from '../types/RuntimeCxt';

const checkers: Checker<EntityDict, 'system', RuntimeCxt>[] = [
    {
        type: 'data',
        action: 'create',
        entity: 'system',
        checker: (data) => {
            if (data instanceof Array) {
                data.forEach((ele) => {
                    checkAttributesNotNull('system', ele, ['name', 'platformId']);
                });
            } else {
                checkAttributesNotNull('system', data, ['name', 'platformId']);
            }
            return 0;
        },
    },
];

export default checkers;
