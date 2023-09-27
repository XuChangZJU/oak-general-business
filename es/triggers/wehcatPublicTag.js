import { createTag } from '../aspects/wechatPublicTag';
const triggers = [
    // {
    //     name: '当wechatPublicTag更新后，执行sync',
    //     entity: 'wechatPublicTag',
    //     action: 'update',
    //     when: 'after',
    //     fn: async ({ operation }, context) => {
    //         const { data, filter } = operation;
    //         const [wechatPublicTag] = await context.select(
    //             'wechatPublicTag',
    //             {
    //                 data: {
    //                     id: 1,
    //                 },
    //                 filter,
    //             },
    //             {}
    //         );
    //         await context.operate(
    //             'wechatPublicTag',
    //             {
    //                 id: await generateNewIdAsync(),
    //                 action: 'sync',
    //                 data: {
    //                 },
    //                 filter: {
    //                     id: wechatPublicTag.id
    //                 },
    //             },
    //             {}
    //         );
    //         return 1;
    //     },
    // },
    // {
    //     name: '当wechatPublicTag创建后，执行sync',
    //     entity: 'wechatPublicTag',
    //     action: 'create',
    //     when: 'after',
    //     fn: async ({ operation }, context, params) => {
    //         const { data, filter } = operation;
    //         const [wechatPublicTag] = await context.select(
    //             'wechatPublicTag',
    //             {
    //                 data: {
    //                     id: 1,
    //                 },
    //                 filter,
    //             },
    //             {}
    //         );
    //         await context.operate(
    //             'wechatPublicTag',
    //             {
    //                 id: await generateNewIdAsync(),
    //                 action: 'publish',
    //                 data: {
    //                 },
    //                 filter: {
    //                     id: wechatPublicTag.id
    //                 },
    //             },
    //             {}
    //         );
    //         return 1;
    //     },
    // } as CreateTrigger<EntityDict, 'wechatPublicTag', RuntimeCxt>,
    {
        name: '当标签发布前，同步',
        entity: 'wechatPublicTag',
        action: 'sync',
        when: 'before',
        fn: async ({ operation }, context) => {
            const { data, filter } = operation;
            const [wechatPublicTag] = await context.select('wechatPublicTag', {
                data: {
                    id: 1,
                    sync: 1,
                    syncAt: 1,
                    wechatId: 1,
                    applicationId: 1,
                    text: 1,
                },
                filter,
            }, {});
            if (wechatPublicTag) {
                try {
                    const result = await createTag({
                        applicationId: wechatPublicTag.applicationId,
                        name: wechatPublicTag.text,
                    }, context);
                    data.sync = true,
                        data.syncAt = Date.now();
                    data.wechatId = result.tag.id;
                }
                catch (e) {
                    data.sync = false;
                }
            }
            return 1;
        },
    },
];
export default triggers;
