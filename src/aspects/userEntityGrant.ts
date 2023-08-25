import { OakUserUnpermittedException } from "oak-domain/lib/types";
import { generateNewId, generateNewIdAsync } from "oak-domain/lib/utils/uuid";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { EntityDict } from "../oak-app-domain";
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { uniq } from 'oak-domain/lib/utils/lodash';
import assert from 'assert';
import dayjs from 'dayjs';
import {
    WebEnv,
    WechatMpEnv,
} from 'oak-domain/lib/types/Environment';
import { OakRowInconsistencyException, OakExternalException, SelectOpResult } from 'oak-domain/lib/types';
export async function confirmUserEntityGrant<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        id: string;
        env: WebEnv | WechatMpEnv;
    },
    context: Cxt
) {
    const { id, env } = params;
    const { userId } = context.getToken()!;
    const [userEntityGrant] = await context.select(
        'userEntityGrant',
        {
            data: {
                id: 1,
                entity: 1,
                entityId: 1,
                relationId: 1,
                number: 1,
                confirmed: 1,
            },
            filter: {
                id,
            },
            indexFrom: 0,
            count: 1,
        },
        {
            dontCollect: true,
        }
    );
    const closeRootMode = context.openRootMode();
    const { number, confirmed } = userEntityGrant;
    if (confirmed! >= number!) {
        closeRootMode()
        throw new OakExternalException(`超出分享上限人数${number}人`);
    }
    Object.assign(userEntityGrant, {
        confirmed: confirmed! + 1,
    });
    if (number === 1) {
        // 单次分享 附上接收者id
        Object.assign(userEntityGrant, {
            granteeId: userId,
        });
    }

    const { entity, entityId, relationId, granterId, type } =
        userEntityGrant;

    const result2 = await context.select(
        'userRelation',
        {
            data: {
                id: 1,
                userId: 1,
                relationId: 1,
            },
            filter: {
                userId: userId!,
                relationId,
                entity,
                entityId,
            },
            indexFrom: 0,
            count: 1,
        },
        {
            dontCollect: true,
        }
    );
    if (result2.length) {
        const e = new OakRowInconsistencyException<EntityDict>(undefined, '已领取该权限');
        e.addData('userRelation', result2);
        closeRootMode();
        throw e;
    } else {
        try {
            await context.operate(
                'userRelation',
                {
                    id: generateNewId(),
                    action: 'create',
                    data: {
                        id: generateNewId(),
                        userId,
                        relationId,
                        entity,
                        entityId,
                    },
                },
                {
                    dontCollect: true,
                }
            );
            // todo type是转让的话 需要回收授权者的关系
            if (type === 'transfer') {
                await context.operate(
                    'userRelation',
                    {
                        id: await generateNewIdAsync(),
                        action: 'remove',
                        data: {},
                        filter: {
                            relationId,
                            userId: granterId,
                            entity,
                            entityId,
                        },
                    },
                    {
                        dontCollect: true,
                    }
                );
            }
        } catch (err) {
            closeRootMode();
            throw err;
        }

        closeRootMode();
        return 1;
    }
}
