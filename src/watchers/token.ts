import { EntityDict } from '../oak-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { Watcher, BBWatcher } from 'oak-domain/lib/types/Watcher';
const watchers: Watcher<
    EntityDict,
    'token',
    BackendRuntimeContext<EntityDict>
>[] = [
    {
        name: '使定期禁用的token被禁用',
        entity: 'token',
        filter() {
            const now = Date.now();
            return {
                disablesAt: {
                    $lt: now,
                },
                ableState: 'enabled',
            };
        },
        action: 'disable',
        actionData: {},
    },
];
export default watchers;
