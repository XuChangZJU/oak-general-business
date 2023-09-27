import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { CreateTrigger, Trigger } from 'oak-domain/lib/types/Trigger';
import { RuntimeCxt } from '../types/RuntimeCxt';
import { EntityDict } from '../oak-app-domain/EntityDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { CreateOperationData as CreateSessionMessageData } from '../oak-app-domain/SessionMessage/Schema';
const triggers: Trigger<EntityDict, 'sessionMessage', BackendRuntimeContext<EntityDict>>[] = [
    {
        name: '当sessionMessage创建时时，使其相关session更新lmts',
        entity: 'sessionMessage',
        action: 'create',
        when: 'after',
        fn: async (event, context) => {
            const {
                operation: { data },
            } = event;
            const { sessionId } = data as CreateSessionMessageData;
            const closeRootMode = context.openRootMode();

            try {
                await context.operate(
                    'session',
                    {
                        id: await generateNewIdAsync(),
                        action: 'update',
                        data: {
                            lmts: Date.now(),
                        },
                        filter: {
                            id: sessionId,
                        },
                    },
                    {}
                );
            } catch (err) {
                closeRootMode();
                throw err;
            }
            closeRootMode();

            return 1;

        },
    } as CreateTrigger<EntityDict, 'sessionMessage', BackendRuntimeContext<EntityDict>>,
];
export default triggers;