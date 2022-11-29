import { Checker } from 'oak-domain/lib/types';
import { EntityDict } from '../general-app-domain';
import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';
import { RuntimeCxt } from '../types/RuntimeCxt';

const checkers: Checker<EntityDict, 'platform', RuntimeCxt>[] = [
    {
        type: 'data',
        action: 'create',
        entity: 'platform',
        checker: (data) => {
            const setData = (
                data: EntityDict['platform']['CreateSingle']['data']
            ) => {
                if (!data.config) {
                    Object.assign(data, {
                        config: {},
                    });
                }
            };
            if (data instanceof Array) {
                data.forEach((ele) => {
                    checkAttributesNotNull('platform', ele, ['name']);
                    setData(ele);
                });
            } else {
                checkAttributesNotNull('platform', data, ['name']);
                setData(data as EntityDict['platform']['CreateSingle']['data']);
            }
            return 0;
        },
    },
];

export default checkers;
