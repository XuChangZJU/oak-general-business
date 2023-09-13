import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../oak-app-domain/EntityDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';

const triggers: Trigger<EntityDict, 'parasite', BackendRuntimeContext<EntityDict>>[] = [
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
    },
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
    },
];
export default triggers;