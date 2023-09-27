import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
const triggers = [
    {
        name: '当sessionMessage创建时时，使其相关session更新lmts',
        entity: 'sessionMessage',
        action: 'create',
        when: 'after',
        fn: async (event, context) => {
            const { operation: { data }, } = event;
            const { sessionId } = data;
            const closeRootMode = context.openRootMode();
            try {
                await context.operate('session', {
                    id: await generateNewIdAsync(),
                    action: 'update',
                    data: {
                        lmts: Date.now(),
                    },
                    filter: {
                        id: sessionId,
                    },
                }, {});
            }
            catch (err) {
                closeRootMode();
                throw err;
            }
            closeRootMode();
            return 1;
        },
    },
];
export default triggers;
