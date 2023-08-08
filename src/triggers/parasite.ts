import { generateNewId, generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { Trigger, CreateTrigger, UpdateTrigger, SelectTrigger } from 'oak-domain/lib/types/Trigger';
import { CreateOperationData as CreateParasiteData } from '../general-app-domain/Parasite/Schema';
import { EntityDict } from '../general-app-domain/EntityDict';

import { OakRowInconsistencyException, OakExternalException, SelectOpResult } from 'oak-domain/lib/types';
import { assert } from 'oak-domain/lib/utils/assert';
import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';
import { RuntimeCxt } from '../types/RuntimeCxt';

const triggers: Trigger<EntityDict, 'parasite', RuntimeCxt>[] = [
    {
        name: '当parasite过期时，使其相关token也过期',
        entity: 'parasite',
        action: 'update',
        check: (operation) => {
            const { data } = operation;
            return !!data.expired;
        },
        when: 'before',
        fn: async ({ operation }, context) => {
            const { data, filter } = operation;
            await context.operate(
                'token',
                {
                    id: await generateNewIdAsync(),
                    action: 'disable',
                    data: {
                    },
                    filter: {
                        parasite: filter,
                    },
                },
                {}
            );

            return 1;
        },
    } as UpdateTrigger<EntityDict, 'parasite', RuntimeCxt>,
    {
        name: '当parasite失效时，使其相关token也过期',
        entity: 'parasite',
        action: 'cancel',
        check: (operation) => {
            const { data } = operation;
            return !!data.expired;
        },
        when: 'before',
        fn: async ({ operation }, context) => {
            const { data, filter } = operation;
            await context.operate(
                'token',
                {
                    id: await generateNewIdAsync(),
                    action: 'disable',
                    data: {
                    },
                    filter: {
                        parasite: filter,
                    },
                },
                {}
            );

            return 1;
        },
    } as UpdateTrigger<EntityDict, 'parasite', RuntimeCxt>,
];
export default triggers;