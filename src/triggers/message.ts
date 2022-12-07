import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { Trigger, CreateTrigger, UpdateTrigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../general-app-domain/EntityDict';
import { CreateOperationData as CreateMessageData } from '../general-app-domain/Message/Schema';
import { assert } from 'oak-domain/lib/utils/assert';
import { RuntimeCxt } from '../types/RuntimeCxt';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { Schema as MessageSentSchema } from '../entities/MessageSent';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';

export const MessageDisperse = {
    // [1]: {
    //     conversationMessage: {
    //         public: (message: CreateMessageData) => {
    //             return message;
    //         }
    //     },
    //     adminNotification: {
    //         public: (message: CreateMessageData) => {
    //             return message;
    //         }
    //     },
    // },
    // [10]: {
    //     conversationMessage: {
    //         public: (message: CreateMessageData) => {
    //             return message;
    //         }
    //     },
    //     adminNotification: {
    //         public: (message: CreateMessageData) => {
    //             return message;
    //         }
    //     },
    // }
}

async function tryAddMessageSent(message: CreateMessageData, channel: MessageSentSchema['channel'], context: BackendRuntimeContext<EntityDict>) {
    // const { systemId, type } = message;
    // const disperse = MessageDisperse && MessageDisperse[systemId] && MessageDisperse[systemId][type] && MessageDisperse[systemId][type][channel];
    // if (!disperse) {
    //     return 0;
    // }

    // // 有配置也未必一定能发，比如说用户没有注册手机号，则无法发gsm
    // const data = disperse(message);
    // if (!data) {
    //     return 0;
    // }

    // const messageSent = {
    //     messageId: message.id,
    //     iState: 'sending',
    //     channel,
    // };
    // await context.operate('messageSent', {
    //     id: await generateNewIdAsync(),
    //     action: 'create',
    //     data: {
    //         id: await generateNewId(),
    //         ...messageSent,
    //     } as EntityDict['messageSent']['OpSchema'],
    // }, {});
    return 1;
}

async function addMessageSent(message: CreateMessageData, context: BackendRuntimeContext<EntityDict>) {
    const { weight } = message;

    switch (weight) {
        case 'high': {
            // 高权重的，所有渠道一起推
            const result = await Promise.all([
                tryAddMessageSent(message, 'public', context),
                tryAddMessageSent(message, 'jPush', context),
                tryAddMessageSent(message, 'jim', context),
                tryAddMessageSent(message, 'mp', context),
                tryAddMessageSent(message, 'gsm', context),
            ]);
            return result.reduce((a, b) => a || b);
        }
        case 'medium': {
            // 中权重的，先推三次免费渠道，失败了再推收费渠道
            const count = await context.count(
                'messageSent',
                {
                    filter: {
                        messageId: message.id,
                    }
                },
                {},
            );
            if (count < 1) {
                const result = await Promise.all([
                    tryAddMessageSent(message, 'public', context),
                    tryAddMessageSent(message, 'jPush', context),
                    tryAddMessageSent(message, 'jim', context),
                    tryAddMessageSent(message, 'mp', context),
                ]);
                const count2 = result.reduce((a, b) => a || b);
                if (count2 === 0) {
                    return await tryAddMessageSent(message, 'gsm', context);
                }
                return count2;
            }
            return await tryAddMessageSent(message, 'gsm', context);
        }
        case 'low': {
            // 低权重的，只推免费渠道
            const result = await Promise.all([
                tryAddMessageSent(message, 'public', context),
                tryAddMessageSent(message, 'jPush', context),
                tryAddMessageSent(message, 'jim', context),
                tryAddMessageSent(message, 'mp', context),
            ]);
            return result.reduce((a, b) => a || b);
        }
        case 'data': {
            // 透传数据的，只推JPush
            const result = await Promise.all([
                tryAddMessageSent(message, 'jPush', context),
                tryAddMessageSent(message, 'jim', context),
            ]);
            return result.reduce((a, b) => a || b);
        }
        default: {
            assert(false);
        }
    }
}


const triggers: Trigger<EntityDict, 'message', RuntimeCxt>[] = [
    {
        name: '当创建message时，创建相应的messageSent',
        entity: 'message',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const fn = async (messageData: CreateMessageData) => {
                await addMessageSent(messageData, context as BackendRuntimeContext<EntityDict>);
            }
            if (data instanceof Array) {
                assert('不存在一对多的情况')
            }
            else {
                await fn(data);
            }
            return 0;
        }
    } as CreateTrigger<EntityDict, 'message', RuntimeCxt>,
];
export default triggers;