import { OakUserUnpermittedException } from "oak-domain/lib/types";
import { generateNewIdAsync } from "oak-domain/lib/utils/uuid";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { EntityDict } from "../general-app-domain";
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

/**
 * 获取有对entity进行actions操作权限的用户Id（不包含root）
 * @param params 
 * @param context 
 */
export async function getUserIdsByActionAuth<ED extends EntityDict & BaseEntityDict, T extends keyof ED, Cxt extends BackendRuntimeContext<ED>>(params: {
    entity: T;
    entityId: string;
    actions: ED[T]['Action'][];
    overlap?: boolean;
}, context: Cxt) {
    const { entity, entityId, actions, overlap } = params;
    const filter = {
        destEntity: entity as string,
        relation: {
            entity: entity as string,
            entityId,
        },
    };
    if (overlap) {
        Object.assign(filter, {
            deActions: {
                $overlaps: actions,
            },
        });
    }
    else {
        Object.assign(filter, {
            deActions: {
                $contains: actions,
            },
        });
    }
    const actionAuths = await context.select('actionAuth', {
        data: {
            id: 1,
            relation: {
                id: 1,
                userRelation$relation: {
                    $entity: 'userRelation',
                    data: {
                        id: 1,
                        userId: 1,
                    },
                },
            },
        },
        filter,
    }, { dontCollect: true });

    const userRelations = actionAuths.map(ele => ele.relation!.userRelation$relation!);
    return uniq(Array.prototype.concat.apply([], userRelations).map(ele => ele.userId)) as string[];
}