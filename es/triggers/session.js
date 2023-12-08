import { DATA_SUBSCRIBER_KEYS } from '../config/constants';
import { assert } from 'oak-domain/lib/utils/assert';
const triggers = [
    {
        name: '当创建session时，通知订阅了sessionList变化的事件',
        entity: 'session',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context) => {
            const { data, id } = operation;
            assert(!(data instanceof Array));
            const { userId } = data;
            assert(userId);
            context.saveOperationToEvent(id, `${DATA_SUBSCRIBER_KEYS.sessionList}-u-${userId}`);
            return 1;
        }
    }
];
