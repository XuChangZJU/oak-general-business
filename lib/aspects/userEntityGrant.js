"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmUserEntityGrant = void 0;
const uuid_1 = require("oak-domain/lib/utils/uuid");
const types_1 = require("oak-domain/lib/types");
async function confirmUserEntityGrant(params, context) {
    const { id, env } = params;
    const { userId } = context.getToken();
    const [userEntityGrant] = await context.select('userEntityGrant', {
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
    }, {
        dontCollect: true,
    });
    const closeRootMode = context.openRootMode();
    const { number, confirmed } = userEntityGrant;
    if (confirmed >= number) {
        closeRootMode();
        throw new types_1.OakUserException(`超出分享上限人数${number}人`);
    }
    Object.assign(userEntityGrant, {
        confirmed: confirmed + 1,
    });
    if (number === 1) {
        // 单次分享 附上接收者id
        Object.assign(userEntityGrant, {
            granteeId: userId,
        });
    }
    const { entity, entityId, relationId, granterId, type } = userEntityGrant;
    const result2 = await context.select('userRelation', {
        data: {
            id: 1,
            userId: 1,
            relationId: 1,
        },
        filter: {
            userId: userId,
            relationId,
            entity,
            entityId,
        },
        indexFrom: 0,
        count: 1,
    }, {
        dontCollect: true,
    });
    if (result2.length) {
        const e = new types_1.OakRowInconsistencyException(undefined, '已领取该权限');
        e.addData('userRelation', result2);
        closeRootMode();
        throw e;
    }
    else {
        try {
            await context.operate('userRelation', {
                id: await (0, uuid_1.generateNewIdAsync)(),
                action: 'create',
                data: {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    userId,
                    relationId,
                    entity,
                    entityId,
                },
            }, {
                dontCollect: true,
            });
            // todo type是转让的话 需要回收授权者的关系
            if (type === 'transfer') {
                await context.operate('userRelation', {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    action: 'remove',
                    data: {},
                    filter: {
                        relationId,
                        userId: granterId,
                        entity,
                        entityId,
                    },
                }, {
                    dontCollect: true,
                });
            }
        }
        catch (err) {
            closeRootMode();
            throw err;
        }
        closeRootMode();
        return 1;
    }
}
exports.confirmUserEntityGrant = confirmUserEntityGrant;
