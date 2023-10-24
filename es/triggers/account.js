import { assert } from 'oak-domain/lib/utils/assert';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
const triggers = [
    // 目前先这样授予关系
    {
        name: '充值的时候，将用户赋予owner关系',
        entity: 'account',
        action: 'create',
        when: 'before',
        fn: async (event, context) => {
            const { operation: { data, filter }, } = event;
            assert(!(data instanceof Array));
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
            assert(relation);
            const closeRootMode = context.openRootMode();
            await context.operate('userRelation', {
                id: await generateNewIdAsync(),
                action: 'create',
                data: {
                    id: await generateNewIdAsync(),
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
export default triggers;
