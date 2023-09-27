import { EntityDict } from '../oak-app-domain/EntityDict';
import { CreateTrigger, Trigger } from 'oak-domain/lib/types';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { assert } from 'oak-domain/lib/utils/assert';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { OakPreConditionUnsetException } from 'oak-domain/lib/types';
import { RuntimeCxt } from '../types/RuntimeCxt';
import { CreateOperationData as CreateArticleMenuData } from '../oak-app-domain/ArticleMenu/Schema';
import { createTag, getTags, editTag, deleteTag } from '../aspects/wechatPublicTag';

const triggers: Trigger<
    EntityDict,
    'wechatPublicTag',
    BackendRuntimeContext<EntityDict>
>[] = [
        {
            name: '当wechatPublicTag更新后，执行sync',
            entity: 'wechatPublicTag',
            action: 'update',
            when: 'after',
            fn: async ({ operation }, context) => {
                const { data, filter } = operation;
                const [wechatPublicTag] = await context.select(
                    'wechatPublicTag',
                    {
                        data: {
                            id: 1,
                            sync: 1,
                        },
                        filter,
                    },
                    {}
                );
                await context.operate(
                    'wechatPublicTag',
                    {
                        id: await generateNewIdAsync(),
                        action: 'sync',
                        data: {
                        },
                        filter: {
                            id: wechatPublicTag.id
                        },
                    },
                    {}
                );

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
                const [wechatPublicTag] = await context.select(
                    'wechatPublicTag',
                    {
                        data: {
                            id: 1,
                        },
                        filter,
                    },
                    {}
                );

                await context.operate(
                    'wechatPublicTag',
                    {
                        id: await generateNewIdAsync(),
                        action: 'sync',
                        data: {
                        },
                        filter: {
                            id: wechatPublicTag.id
                        },
                    },
                    {}
                );
                return 1;
            },
        } as CreateTrigger<EntityDict, 'wechatPublicTag', RuntimeCxt>,
        {
            name: '当标签发布前，同步',
            entity: 'wechatPublicTag',
            action: 'sync',
            when: 'before',
            fn: async ({ operation }, context) => {
                const { data, filter } = operation;
                const [wechatPublicTag] = await context.select(
                    'wechatPublicTag',
                    {
                        data: {
                            id: 1,
                            sync: 1,
                            syncAt: 1,
                            wechatId: 1,
                            applicationId: 1,
                            text: 1,
                        },
                        filter,
                    },
                    {}
                );
                if (wechatPublicTag) {
                    try {
                        const tags = await getTags({
                            applicationId: wechatPublicTag.applicationId!
                        }, context);
                        if (!wechatPublicTag.wechatId) {
                            try {
                                const result = await createTag({
                                    applicationId: wechatPublicTag.applicationId!,
                                    name: wechatPublicTag.text!,
                                }, context);
                                data.sync = true;
                                data.syncAt = Date.now();
                                data.wechatId = result.tag.id
                            } catch (e) {
                                data.sync = false;
                            }
                        } else if (tags.tags.find((ele: { id: number, name: string }) => ele.id === wechatPublicTag.wechatId)) {
                            if (tags.tags.find((ele: { id: number, name: string }) => ele.id === wechatPublicTag.wechatId && ele.name === wechatPublicTag.text)) {
                                data.sync = true;
                                data.syncAt = Date.now();
                            } else {
                                try {
                                    const result = await editTag({
                                        applicationId: wechatPublicTag.applicationId!,
                                        id: wechatPublicTag.wechatId!,
                                        name: wechatPublicTag.text!,
                                    }, context);
                                    data.sync = true;
                                    data.syncAt = Date.now();
                                } catch (e) {
                                    data.sync = false;
                                }
                            }
                        } else {
                            throw new Error('该标签已被删除');
                        }
                    } catch (e: any) {
                        throw new Error('调用微信接口出错');
                    }
                }
                return 1;
            },
        },
    ];
export default triggers;