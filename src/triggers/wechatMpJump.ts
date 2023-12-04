import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { Trigger, CreateTrigger, UpdateTrigger } from 'oak-domain/lib/types/Trigger';
import { CreateOperationData as CreateWechatMpJumpData } from '../oak-app-domain/WechatMpJump/Schema';
import { EntityDict } from '../oak-app-domain/EntityDict';

import { OakRowInconsistencyException, OakUserException } from 'oak-domain/lib/types';
import { assert } from 'oak-domain/lib/utils/assert';
import { RuntimeCxt } from '../types/RuntimeCxt';
import { wechatMpJump } from '../aspects/wechatMpJump';
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
const triggers: Trigger<EntityDict, 'wechatMpJump', BackendRuntimeContext<EntityDict>>[] = [
    {
        name: '当创建WechatMpJump时，生成openlink',
        entity: 'wechatMpJump',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const fn = async (
                wechatMpJumpData: CreateWechatMpJumpData
            ) => {
                const { jump_wxa, expiresAt, expireType, expireInterval } = wechatMpJumpData;
                const applicationId = context.getApplicationId();
                assert(applicationId);
                const openlink = await wechatMpJump({ applicationId, jump_wxa: jump_wxa!, expiresAt: expiresAt as number, expireType: expireType as number, expireInterval: expireInterval as number }, context);
                Object.assign(wechatMpJumpData, {
                    openlink
                });
            };
            if (data instanceof Array) {
                for (const ele of data) {
                    await fn(ele);
                }
            } else {
                await fn(data);
            }
            return 0;
        },
    } as CreateTrigger<EntityDict, 'wechatMpJump', BackendRuntimeContext<EntityDict>>,
];
export default triggers;