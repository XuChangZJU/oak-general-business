import { Checker } from 'oak-domain/lib/types';
import { EntityDict } from '../general-app-domain';
import { RuntimeContext } from '../context/RuntimeContext';
import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';
import { RuntimeCxt } from '../types/RuntimeCxt';

const checkers: Checker<EntityDict, 'application', RuntimeCxt>[] = [
    {
        type: 'data',
        action: 'create',
        entity: 'application',
        checker: (data, context) => {
            const setData = (
                data: EntityDict['application']['CreateSingle']['data']
            ) => {
                if (!data.config) {
                    Object.assign(data, {
                        config: {},
                    });
                }
            };
            if (data instanceof Array) {
                data.forEach((ele) => {
                    checkAttributesNotNull('application', ele, [
                        'name',
                        'type',
                        'systemId',
                    ]);
                    setData(ele);
                });
              
            } else {
                checkAttributesNotNull('application', data, [
                    'name',
                    'type',
                    'systemId',
                ]);
                 setData(data as EntityDict['application']['CreateSingle']['data']);
            }
            return 0;
        },
    },
];

export default checkers;
