import { CreateTriggerInTxn, Trigger } from '../types/Trigger';
import { EntityDict } from '../base-ed/EntityDict';

const triggers: CreateTriggerInTxn<EntityDict, 'address'>[] = [
    {
        entity: 'address',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context) => {
            const { action, data } = operation;            
            return 0;
        },
        name: '建立新area前检查数据',
    }
];