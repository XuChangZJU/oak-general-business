import { EntityDict } from '../oak-app-domain/EntityDict';
import { Trigger } from 'oak-domain/lib/types';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { assert } from 'oak-domain/lib/utils/assert';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { OakPreConditionUnsetException } from 'oak-domain/lib/types';
import { RuntimeCxt } from '../types/RuntimeCxt';

const triggers: Trigger<
    EntityDict,
    'article',
    BackendRuntimeContext<EntityDict>
>[] = [
    {
        name: '在创建文章后，将文章所属分类的【isArticle】置为【true】',
        entity: 'article',
        action: 'create',
        when: 'after',
        fn: async (event: any, context: any) => {
            const {
                operation: { data, filter },
            } = event;
            assert(!(data instanceof Array)); // 不可能是成组创建
            if (data) {
                const [article] = await context.select(
                    'article',
                    {
                        data: {
                            id: 1,
                            name: 1,
                            content: 1,
                            articleMenuId: 1,
                        },
                        filter: {
                            id: data.id,
                        },
                    },
                    {}
                );
                if (article) {
                    await context.operate(
                        'articleMenu',
                        {
                            id: await generateNewIdAsync(),
                            action: 'update',
                            data: {
                                isArticle: true,
                            },
                            filter: {
                                id: article.articleMenuId,
                            },
                        },
                        {}
                    );
                }
            }
            return 0;
        },
    },
    {
        name: '在删除文章前，将文章所属分类的【isArticle】置为【false】',
        entity: 'article',
        action: 'remove',
        when: 'before',
        fn: async (event: any, context: any) => {
            const {
                operation: { data, filter },
            } = event;

            const [article] = await context.select(
                'article',
                {
                    data: {
                        id: 1,
                        name: 1,
                        content: 1,
                        articleMenuId: 1,
                    },
                    filter,
                },
                {}
            );
            if (article) {
                const articles = await context.select(
                    'article',
                    {
                        data: {
                            id: 1,
                        },
                        filter: {
                            articleMenuId: article.articleMenuId,
                            id: {
                                $ne: article.id,
                            },
                        },
                    },
                    {}
                );
                if (articles.length === 0) {
                    await context.operate(
                        'articleMenu',
                        {
                            id: await generateNewIdAsync(),
                            action: 'update',
                            data: {
                                isArticle: false,
                            },
                            filter: {
                                id: article.articleMenuId,
                            },
                        },
                        {}
                    );
                }
            }
            return 0;
        },
    },
];
export default triggers;
