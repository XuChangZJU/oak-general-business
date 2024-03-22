export default OakComponent({
    entity: 'articleMenu',
    isList: true,
    properties: {
        entity: '',
        entityId: '',
        parentId: '',
        onGrandChildEditArticleChange: (data) => undefined,
        show: '',
        articleMenuId: '',
        articleId: '',
        getBreadcrumbItems: (breadcrumbItems) => undefined,
        breadcrumbItems: [],
        drawerOpen: false,
        changeDrawerOpen: (open) => undefined,
        addOpen: false,
        changeAddOpen: (addOpen) => undefined,
        selectedArticleId: '',
        defaultOpen: false,
        changeDefaultOpen: (defaultOpen, openArray) => undefined,
        openArray: [],
        getTopInfo: (data) => undefined,
        getSearchOpen: (searchOpenArray) => undefined,
        getSideInfo: (data) => undefined,
        currentArticle: '',
        setCurrentArticle: (id) => undefined,
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
        },
        article$articleMenu: {
            $entity: 'article',
            data: {
                id: 1,
            },
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
        async createOne(name) {
            const { entity, entityId, parentId } = this.props;
            this.addItem({
                name,
                entity,
                entityId,
                parentId,
                isArticle: false,
                isLeaf: false, // 这个属性没用了，但声明成not null了(todo)
            });
            await this.execute();
        },
        getDefaultArticle(rows) {
            if (!rows || rows.length === 0) {
                return null;
            }
            const toggleItems = [];
            toggleItems.push(rows[0].id);
            const getChildArticleMenu = async (id) => {
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
                    }
                    else if (articleMenus[0].articleMenu$parent && articleMenus[0].articleMenu$parent.length > 0) {
                        toggleItems.push(articleMenus[0].articleMenu$parent[0].id);
                        const subToggleItems = await getChildArticleMenu(articleMenus[0].id);
                        if (subToggleItems) {
                            return toggleItems;
                        }
                    }
                }
                else {
                    return;
                }
            };
            if (rows[0].article$articleMenu && rows[0].article$articleMenu.length > 0) {
                toggleItems.push(rows[0].article$articleMenu[0].id);
            }
            else {
                getChildArticleMenu(rows[0].id);
            }
            return toggleItems;
        },
        async getSearchArticle() {
            const { rows } = this.state;
            const { entity, entityId, articleId } = this.props;
            const { data: article } = await this.features.cache.refresh('article', {
                data: {
                    id: 1,
                    name: 1,
                    articleMenuId: 1,
                    articleMenu: {
                        entity: 1,
                        entityId: 1,
                    }
                },
                filter: {
                    id: articleId,
                    articleMenu: {
                        entity,
                        entityId,
                    }
                },
            });
            const toggleItems = [];
            const getArticleMenu = async (parentId) => {
                const { data: articleMenu } = await this.features.cache.refresh('articleMenu', {
                    data: {
                        id: 1,
                        name: 1,
                        entity: 1,
                        entityId: 1,
                        parentId: 1,
                    },
                    filter: {
                        id: parentId,
                        entity,
                        entityId,
                    }
                });
                if (articleMenu && articleMenu.length > 0 && !articleMenu[0]?.parentId) {
                    toggleItems.push(articleMenu[0].id);
                    return toggleItems;
                }
                if (articleMenu && articleMenu.length > 0 && articleMenu[0]?.parentId) {
                    toggleItems.push(articleMenu[0].id);
                    const parentToggleItems = await getArticleMenu(articleMenu[0].parentId);
                    if (parentToggleItems) {
                        return toggleItems;
                    }
                }
                ;
            };
            if (article && article.length > 0) {
                toggleItems.push(article[0].id);
                getArticleMenu(article[0].articleMenuId);
            }
            ;
            return toggleItems.reverse();
        }
    }
});
