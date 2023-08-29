
import { EntityDict } from "../../../oak-app-domain";
export default OakComponent({
    entity: 'articleMenu',
    isList: true,
    properties: {
        entity: '',
        entityId: '',
        parentId: '' as string | undefined,
        onGrandChildEditArticleChange: (data: string) => undefined as void,
        show: '',
        articleMenuId: '',
        getBreadcrumbItems: (breadcrumbItems: string[]) => undefined as void,
        breadcrumbItems: [] as string[],
        drawerOpen: false,
        changeDrawerOpen: (open: boolean) => undefined as void,
        addOpen: false,
        changeAddOpen: (addOpen: boolean) => undefined as void,
        selectedArticleId: '',
        defaultOpen: false,
        changeDefaultOpen: (defaultOpen: boolean, openArray: string[]) => undefined as void,
        openArray: [] as string[],
        getTopInfo: (data: {name: string, date: number}) => undefined as void,
    },
    projection: {
        id: 1,
        name: 1,
        entity: 1,
        entityId: 1,
        parentId: 1,
        isArticle: 1,
        articleMenu$parent: {
            $entity: 'articleMenu',
            data: {
                id: 1,
            },
            // indexFrom: 0,
            // count: 1,
        },
        article$articleMenu: {
            $entity: 'article',
            data: {
                id: 1,
            },
            // indexFrom: 0,
            // count: 1,
        },
        extraFile$entity: {
            $entity: 'extraFile',
            data: {
                id: 1,
                tag1: 1,
                origin: 1,
                bucket: 1,
                objectId: 1,
                filename: 1,
                extra1: 1,
                extension: 1,
                type: 1,
                entity: 1,
            },
            filter: {
                tag1: {
                    $in: ['logo'],
                },
            },
        },
    },
    sorters: [
        {
            sorter: () => ({
                $attr: {
                    $$createAt$$: 1,
                },
                $direction: 'asc',
            }),
        },
    ],
    filters: [
        {
            filter() {
                const { entity, entityId, parentId, articleMenuId } = this.props;
                if (articleMenuId) {
                    return {
                        entity,
                        entityId,
                        id: articleMenuId,
                    };
                }
                if (parentId) {
                    return {
                        entity,
                        entityId,
                        parentId,
                    };
                }
                return {
                    entity,
                    entityId,
                    parentId: {
                        $exists: false,
                    },
                };
            }
        }
    ],
    formData({ data: rows }) {
        return {
            rows,
        };
    },
    methods: {
        async createOne(name: string) {
            const { entity, entityId, parentId } = this.props;
            this.addItem({
                name,
                entity,
                entityId,
                parentId,
                isArticle: false,
                isLeaf: false,      // 这个属性没用了，但声明成not null了(todo)
            });
            await this.execute();
        },

        getDefaultArticle(rows: any) {
            if (!rows || rows.length === 0) {
                return null;
            }
            const toggleItems: (string | undefined)[] = [];
            toggleItems.push(rows[0].id);
            const getChildArticleMenu = async (id: string) => {
                const { data: articleMenus } = await this.features.cache.refresh('articleMenu', {
                    data: {
                        id: 1,
                        name: 1,
                        entity: 1,
                        entityId: 1,
                        parentId: 1,
                        isArticle: 1,
                        articleMenu$parent: {
                            $entity: 'articleMenu',
                            data: {
                                id: 1,
                            },
                            indexFrom: 0,
                            count: 1,
                            sorter: [
                                {
                                    $attr: {
                                        $$createAt$$: 1,
                                    },
                                    $direction: 'asc',
                                }
                            ]
                        },
                        article$articleMenu: {
                            $entity: 'article',
                            data: {
                                id: 1,
                            },
                            indexFrom: 0,
                            count: 1,
                            sorter: [
                                {
                                    $attr: {
                                        $$createAt$$: 1,
                                    },
                                    $direction: 'asc',
                                }
                            ]
                        },
                    },
                    filter: {
                        entity: this.props.entity,
                        entityId: this.props.entityId,
                        parentId: id,
                    },
                    sorter: [
                        {
                            $attr: {
                                $$createAt$$: 1,
                            },
                            $direction: 'asc',
                        }
                    ]
                });
                if (articleMenus && articleMenus.length > 0) {
                    toggleItems.push(articleMenus[0].id);
                    if (articleMenus[0].article$articleMenu && articleMenus[0].article$articleMenu.length > 0) {
                        toggleItems.push(articleMenus[0].article$articleMenu[0].id);
                        return toggleItems;
                    } else if (articleMenus[0].articleMenu$parent && articleMenus[0].articleMenu$parent.length > 0) {
                        toggleItems.push(articleMenus[0].articleMenu$parent[0].id)
                        const subToggleItems = await getChildArticleMenu(articleMenus[0].id!);
                        if (subToggleItems) {
                            return toggleItems;
                        }
                    }
                } else {
                    return;
                }
            }
            if (rows[0].article$articleMenu && rows[0].article$articleMenu.length > 0) {
                toggleItems.push(rows[0].article$articleMenu[0].id);
            } else {
                getChildArticleMenu(rows[0].id);
            }
            return toggleItems;
        }
    }
})