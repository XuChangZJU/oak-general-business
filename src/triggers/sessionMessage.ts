import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { CreateTrigger, Trigger } from 'oak-domain/lib/types/Trigger';
import { RuntimeCxt } from '../types/RuntimeCxt';
import { EntityDict } from '../oak-app-domain/EntityDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { CreateOperationData as CreateSessionMessageData } from '../oak-app-domain/SessionMessage/Schema';
import { assert } from 'oak-domain/lib/utils/assert';
import { WechatMpConfig, WechatPublicConfig } from '../entities/Application';
import {
    WechatSDK,
    WechatMpInstance,
    WechatPublicInstance,
} from 'oak-external-sdk';
import { extraFileProjection } from '../types/Projection'
import { DATA_SUBSCRIBER_KEYS } from '../config/constants';

const triggers: Trigger<
    EntityDict,
    'sessionMessage',
    BackendRuntimeContext<EntityDict>
>[] = [
    {
        name: '当sessionMessage创建时，发送消息到相应事件上',
        entity: 'sessionMessage',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context) => {
            const { data, id } = operation;
            assert(!(data instanceof Array));
            const { sessionId } = data;
            assert(sessionId);
            context.saveOperationToEvent(id, `${DATA_SUBSCRIBER_KEYS.sessionMessageList}-${sessionId}`);
            return 1;
        },
    } as CreateTrigger<
        EntityDict,
        'sessionMessage',
        BackendRuntimeContext<EntityDict>
    >,
    {
        name: '当sessionMessage创建时，使其相关session更新lmts',
        entity: 'sessionMessage',
        action: 'create',
        when: 'after',
        fn: async (event, context) => {
            const {
                operation: { data },
            } = event;
            const { sessionId } =
                data as CreateSessionMessageData;
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
    } as CreateTrigger<
        EntityDict,
        'sessionMessage',
        BackendRuntimeContext<EntityDict>
    >,
    {
        name: '当创建sessionMessage后，业务提交后再进行推送',
        entity: 'sessionMessage',
        action: 'create',
        when: 'commit',
        strict: 'takeEasy',
        fn: async ({ rows }, context) => {
            const closeRootMode = context.openRootMode();
            try {
                for (const row of rows) {
                    const { id } = row;

                    const [currentSessionMessage] = await context.select(
                        'sessionMessage',
                        {
                            data: {
                                id: 1,
                                sessionId: 1,
                                text: 1,
                                type: 1,
                                userId: 1,
                                wechatUserId: 1,
                                wechatUser: {
                                    id: 1,
                                    openId: 1,
                                },
                                applicationId: 1,
                                createTime: 1,
                                $$createAt$$: 1,
                                aaoe: 1,
                                extraFile$entity: {
                                    $entity: 'extraFile',
                                    data: extraFileProjection,
                                },
                            },
                            filter: {
                                id,
                            },
                            count: 1,
                            indexFrom: 0,
                        },
                        {}
                    );

                    const { sessionId, aaoe, type, text, extraFile$entity } = currentSessionMessage;
                    if (aaoe) {
                        const msgType = type;

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
                                    wechatUser: {
                                        id: 1,
                                        openId: 1,
                                    },
                                    applicationId: 1,
                                    createTime: 1,
                                    $$createAt$$: 1,
                                    aaoe: 1,
                                },
                                filter: {
                                    sessionId,
                                    aaoe: false,
                                    createTime: {
                                        $gt:
                                            Date.now() -
                                            (48 * 60 * 60 * 1000 -
                                                5 * 60 * 1000),
                                    },
                                },
                                sorter: [
                                    {
                                        $attr: {
                                            createTime: 1,
                                        },
                                        $direction: 'desc',
                                    },
                                ],
                                count: 1,
                                indexFrom: 0,
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
                            const [application] = await context.select(
                                'application',
                                {
                                    data: {
                                        id: 1,
                                        type: 1,
                                        config: 1,
                                        systemId: 1,
                                    },
                                    filter: {
                                        id: session.entityId,
                                    },
                                },
                                {}
                            );
                            const { type, config } = application!;
                            assert(
                                type === 'wechatPublic' || type === 'wechatMp'
                            );

                            let wechatInstance:
                                | WechatPublicInstance
                                | WechatMpInstance;
                            if (type === 'wechatMp') {
                                const { appId, appSecret } =
                                    config as WechatMpConfig;
                                wechatInstance = WechatSDK.getInstance(
                                    appId,
                                    type,
                                    appSecret
                                ) as WechatMpInstance;
                            } else {
                                const { appId, appSecret } =
                                    config as WechatPublicConfig;
                                wechatInstance = WechatSDK.getInstance(
                                    appId,
                                    type,
                                    appSecret
                                ) as WechatPublicInstance;
                            }
                            const openId = sessionMessage.wechatUser!.openId!;

                            //微信发送客服消息
                            switch (msgType) {
                                case 'text': {
                                    await wechatInstance.sendServeMessage({
                                        openId,
                                        type: msgType,
                                        content: text!,
                                    });
                                    break;
                                }
                                case 'image': {
                                    const extraFile =
                                        extraFile$entity && extraFile$entity[0];
                                    if (extraFile) {
                                        const mediaId = extraFile.extra1!;
                                        wechatInstance.sendServeMessage({
                                            openId,
                                            type: msgType,
                                            mediaId,
                                        });
                                    }
                                    break;
                                }
                                default: {
                                    assert(
                                        false,
                                        `消息类型「${msgType}」尚未支持`
                                    );
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                closeRootMode();
                throw err;
            }
            closeRootMode();
            return 0;
        },
    } as CreateTrigger<
        EntityDict,
        'sessionMessage',
        BackendRuntimeContext<EntityDict>
    >,
];
export default triggers;