import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { CreateTrigger, Trigger } from 'oak-domain/lib/types/Trigger';
import { RuntimeCxt } from '../types/RuntimeCxt';
import { EntityDict } from '../oak-app-domain/EntityDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { DATA_SUBSCRIBER_KEYS } from '../config/constants';
import { CreateOperationData as CreateSessionMessageData } from '../oak-app-domain/SessionMessage/Schema';
import { assert } from 'oak-domain/lib/utils/assert';
import { WechatMpConfig, WechatPublicConfig } from '../entities/Application';
import {
    WechatSDK,
    WechatMpInstance,
    WechatPublicInstance,
} from 'oak-external-sdk';
import { extraFileProjection } from '../types/Projection'

const triggers: Trigger<
    EntityDict,
    'session',
    BackendRuntimeContext<EntityDict>
>[] = [
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
    } as CreateTrigger<EntityDict, 'session', BackendRuntimeContext<EntityDict>>
]