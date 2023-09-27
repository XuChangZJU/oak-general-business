import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { createTag, getTags, editTag } from '../aspects/wechatPublicTag';
const triggers = [
    {
        name: '当wechatPublicTag更新后，执行sync',
        entity: 'wechatPublicTag',
        action: 'update',
        when: 'after',
        fn: async ({ operation }, context) => {
            const { data, filter } = operation;
            const [wechatPublicTag] = await context.select('wechatPublicTag', {
                data: {
                    id: 1,
                    sync: 1,
                },
                filter,
            }, {});
            await context.operate('wechatPublicTag', {
                id: await generateNewIdAsync(),
                action: 'sync',
                data: {},
                filter: {
                    id: wechatPublicTag.id
                },
            }, {});
            return 1;
        },
    },
    {
        name: '当wechatPublicTag创建后，执行sync',
        entity: 'wechatPublicTag',
        action: 'create',
        when: 'after',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const [wechatPublicTag] = await context.select('wechatPublicTag', {
                data: {
                    id: 1,
                },
                filter,
            }, {});
            await context.operate('wechatPublicTag', {
                id: await generateNewIdAsync(),
                action: 'sync',
                data: {},
                filter: {
                    id: wechatPublicTag.id
                },
            }, {});
            return 1;
        },
    },
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
                    const tags = await getTags({
                        applicationId: wechatPublicTag.applicationId
                    }, context);
                    if (!wechatPublicTag.wechatId) {
                        try {
                            const result = await createTag({
                                applicationId: wechatPublicTag.applicationId,
                                name: wechatPublicTag.text,
                            }, context);
                            data.sync = true;
                            data.syncAt = Date.now();
                            data.wechatId = result.tag.id;
                        }
                        catch (e) {
                            data.sync = false;
                        }
                    }
                    else if (tags.tags.find((ele) => ele.id === wechatPublicTag.wechatId)) {
                        if (tags.tags.find((ele) => ele.id === wechatPublicTag.wechatId && ele.name === wechatPublicTag.text)) {
                            data.sync = true;
                            data.syncAt = Date.now();
                        }
                        else {
                            try {
                                const result = await editTag({
                                    applicationId: wechatPublicTag.applicationId,
                                    id: wechatPublicTag.wechatId,
                                    name: wechatPublicTag.text,
                                }, context);
                                data.sync = true;
                                data.syncAt = Date.now();
                            }
                            catch (e) {
                                data.sync = false;
                            }
                        }
                    }
                    else {
                        throw new Error('该标签已被删除');
                    }
                }
                catch (e) {
                    throw new Error('调用微信接口出错');
                }
            }
            return 1;
        },
    },
];
export default triggers;
