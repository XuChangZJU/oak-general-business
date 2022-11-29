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
            const setData = (
                data: EntityDict['system']['CreateSingle']['data']
            ) => {
                if (!data.config) {
                    Object.assign(data, {
                        config: {},
                    });
                }
            };
            if (data instanceof Array) {
                data.forEach((ele) => {
                    checkAttributesNotNull('system', ele, ['name', 'platformId']);
                    setData(ele);
                });
            } else {
                checkAttributesNotNull('system', data, ['name', 'platformId']);
                setData(data as EntityDict['system']['CreateSingle']['data']);
            }
            return 0;
        },
    },
];

export default checkers;
