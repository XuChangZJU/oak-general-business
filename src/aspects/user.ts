import { OakUserUnpermittedException } from "oak-domain/lib/types";
import { generateNewIdAsync } from "oak-domain/lib/utils/uuid";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { EntityDict } from "../oak-app-domain";
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { uniq } from 'oak-domain/lib/utils/lodash';
import assert from 'assert';

export async function mergeUser<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>>(params: { from: string, to: string }, context: Cxt, innerLogic?: boolean) {
    if (!innerLogic && !context.isRoot()) {
        throw new OakUserUnpermittedException('不允许执行mergeUser操作');
    }
    const { from, to } = params;
    assert(from);
    assert(to);
    assert(from !== to, '不能merge到相同user');
    const schema = context.getSchema();
    /* for (const entity in schema) {
        if (['oper', 'modi', 'operEntity', 'modiEntity', 'userEntityGrant', 'wechatQrCode'].includes(entity)) {
            continue;
        }

        const entityDesc = schema[entity];
        if (entityDesc.view) {
            continue;
        }
        const { attributes } = entityDesc;
        for (const attr in attributes) {
            const attrDef = attributes[attr as keyof typeof attributes];
            if (attrDef.type === 'ref' && attrDef.ref === 'user') {
                await context.operate(entity, {
                    action: 'update',
                    data: {
                        [attr]: to,
                    },
                    filter: {
                        [attr]: from,
                    }
                } as any, { dontCollect: true, dontCreateOper: true, dontCreateModi: true });
            }
            if (attr === 'entity' && attributes.hasOwnProperty('entityId')) {
                await context.operate(entity, {
                    action: 'update',
                    data: {
                        entityId: to,
                    },
                    filter: {
                        entity: 'user',
                        entityId: from,
                    }
                } as any, { dontCollect: true, dontCreateOper: true, dontCreateModi: true });
            }
        }
    } */

    await context.operate('token', {
        id: await generateNewIdAsync(),
        action: 'disable',
        data: {},
        filter: {
            ableState: 'enabled',
            playerId: from,         // todo 这里是playerId, root如果正在扮演该用户待处理
        },
    }, { dontCollect: true });

    await context.operate('user', {
        id: await generateNewIdAsync(),
        action: 'merge',
        data: {
            refId: to,
            userState: 'merged',
        },
        filter: {
            $or: [
                {
                    id: from,
                },
                {
                    userState: 'merged',
                    refId: from,
                }
            ],
        },
    }, {});
}

export async function getChangePasswordChannels<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>>(params: { userId: string }, context: Cxt, innerLogic?: boolean) {
    const { userId } = params;
    const mobileList = await context.select(
        'mobile',
        {
            data: {
                id: 1,
                mobile: 1,
                userId: 1,
            },
            filter: {
                userId,
                ableState: 'enabled',
            },
        },
        {}
    )
    return [];
}
