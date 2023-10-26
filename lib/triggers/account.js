"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("oak-domain/lib/utils/assert");
const uuid_1 = require("oak-domain/lib/utils/uuid");
const triggers = [
    // 目前先这样授予关系
    {
        name: '充值的时候，将用户赋予owner关系',
        entity: 'account',
        action: 'create',
        when: 'before',
        fn: async (event, context) => {
            const { operation: { data, filter }, } = event;
            (0, assert_1.assert)(!(data instanceof Array));
            const accountId = data.id;
            const [relation] = await context.select('relation', {
                data: {
                    id: 1,
                },
                filter: {
                    name: 'owner',
                    entity: 'account',
                    entityId: {
                        $exists: false,
                    }
                }
            }, { dontCollect: true });
            (0, assert_1.assert)(relation);
            const closeRootMode = context.openRootMode();
            await context.operate('userRelation', {
                id: await (0, uuid_1.generateNewIdAsync)(),
                action: 'create',
                data: {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    relationId: relation.id,
                    userId: context.getCurrentUserId(),
                    entity: 'account',
                    entityId: accountId,
                },
            }, {});
            closeRootMode();
            return 1;
        },
    },
];
exports.default = triggers;
