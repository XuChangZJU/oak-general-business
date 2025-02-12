export async function confirmUserEntityGrant(params, context) {
    /* const { id, env } = params;
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
        throw new OakUserException(`超出分享上限人数${number}人`);
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
                    id: await generateNewIdAsync(),
                    action: 'create',
                    data: {
                        id: await generateNewIdAsync(),
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
    } */
}
