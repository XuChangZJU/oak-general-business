import { assert } from 'oak-domain/lib/utils/assert';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { OakPreConditionUnsetException } from 'oak-domain/lib/types';
const triggers = [
    {
        name: '在创建文章分类时，查询文章分类是否重名',
        entity: 'articleMenu',
        action: 'create',
        when: 'before',
        fn: async (event, context) => {
            const { operation: { data }, } = event;
            assert(!(data instanceof Array)); // 不可能是成组创建
            if (data.name) {
                const { entity, entityId } = data;
                const [articleMenu] = await context.select('articleMenu', {
                    data: {
                        id: 1,
                        name: 1,
                        parentId: 1,
                    },
                    filter: {
                        entity,
                        entityId,
                        name: data.name,
                        parentId: data.parentId
                            ? data.parentId
                            : {
                                $exists: false,
                            },
                    },
                }, {});
                if (articleMenu) {
                    throw new OakPreConditionUnsetException(`父分类的同一子集中存在同名分类【${data.name}】，请重新输入`);
                }
            }
            return 0;
        },
    },
    {
        name: '在创建文章分类时，文章分类的父节点的【isLeaf】置为【true】',
        entity: 'articleMenu',
        action: 'create',
        when: 'after',
        fn: async (event, context) => {
            const { operation: { data, filter }, } = event;
            assert(!(data instanceof Array));
            const { id } = data;
            const [articleMenu] = await context.select('articleMenu', {
                data: {
                    id: 1,
                    name: 1,
                    parentId: 1,
                    parent: {
                        id: 1,
                        isLeaf: 1,
                    },
                },
                filter: {
                    id,
                },
            }, {});
            if (articleMenu &&
                articleMenu.parent &&
                !articleMenu.parent.isLeaf) {
                await context.operate('articleMenu', {
                    id: await generateNewIdAsync(),
                    action: 'update',
                    data: {
                        isLeaf: true,
                    },
                    filter: {
                        id: articleMenu.parentId,
                    },
                }, {
                    blockTrigger: true,
                });
            }
            return 0;
        },
    },
    {
        name: '在删除文章分类前，将文章分类的父节点的【isLeaf】置为【false】,同时删除extraFile',
        entity: 'articleMenu',
        action: 'remove',
        when: 'before',
        fn: async (event, context) => {
            const { operation: { data, filter }, } = event;
            const [articleMenu] = await context.select('articleMenu', {
                data: {
                    id: 1,
                    name: 1,
                    parentId: 1,
                    parent: {
                        id: 1,
                        isLeaf: 1,
                    },
                },
                filter,
            }, {});
            await context.operate('extraFile', {
                id: await generateNewIdAsync(),
                action: 'remove',
                data: {},
                filter: {
                    entityId: filter.id,
                },
            }, {});
            if (articleMenu && articleMenu.parentId) {
                const articleMenus = await context.select('articleMenu', {
                    data: {
                        id: 1,
                    },
                    filter: {
                        parentId: articleMenu.parentId,
                        id: {
                            $ne: articleMenu.id,
                        },
                    },
                }, {});
                if (articleMenus.length === 0) {
                    await context.operate('articleMenu', {
                        id: await generateNewIdAsync(),
                        action: 'update',
                        data: {
                            isLeaf: false,
                        },
                        filter: {
                            id: articleMenu.parentId,
                        },
                    }, {});
                }
            }
            return 0;
        },
    },
    {
        name: '在更新文章分类时，查询文章分类是否重名',
        entity: 'articleMenu',
        action: 'update',
        when: 'before',
        fn: async (event, context) => {
            const { operation: { data, filter }, } = event;
            assert(!(data instanceof Array)); // 不可能是成组创建
            if (data.name) {
                const [articleMenu] = await context.select('articleMenu', {
                    data: {
                        id: 1,
                        name: 1,
                        parentId: 1,
                    },
                    filter,
                }, {});
                if (articleMenu) {
                    const [articleMenu2] = await context.select('articleMenu', {
                        data: {
                            id: 1,
                            name: 1,
                            parentId: 1,
                        },
                        filter: {
                            name: data.name,
                            parentId: articleMenu.parentId
                                ? articleMenu.parentId
                                : {
                                    $exists: false,
                                },
                            id: {
                                $ne: articleMenu.id
                            }
                        },
                    }, {});
                    if (articleMenu2) {
                        throw new OakPreConditionUnsetException(`父分类的同一子集中存在同名分类【${data.name}】，请重新输入`);
                    }
                }
            }
            return 1;
        },
    },
];
export default triggers;
