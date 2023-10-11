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
                const [sessionMessage] = await context.select(
                    'sessionMessage',
                    {
                        data: {
                            id: 1,
                            sessionId: 1,
                            text: 1,
                            type: 1,
                            userId: 1,
                            wechatUserId: 1,
                            applicationId: 1,
                            createTime: 1,
                            $$createAt$$: 1,
                            aaoe: 1,
                        },
                        filter: {
                            id: sessionId,
                            aaoe: false,
                            createTime: {
                                $gt: Date.now() - (48 * 60 * 60 * 1000 - 5 * 60 * 1000)
                            }
                        },
                        sorter: [
                            {
                                $attr: {
                                    $$createAt$$: 1,
                                },
                                $direction: 'desc',
                            },
                        ],
                        count: 1,
                    },
                    {}
                );
                if (sessionMessage && sessionMessage.wechatUserId) {
                    const [session] = await context.select(
                        'session',
                        {
                            data: {
                                id: 1,
                                entity: 1,
                                entityId: 1,
                                userId: 1,
                                openId: 1,
                            },
                            filter: {
                                id: sessionId,
                            },
                        },
                        {}
                    );
                }



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