import { EntityDict } from '../../../general-app-domain';
interface DataNode {
    label: string;
    key: string;
    isArticle?: boolean;
    isLeaf?: boolean;
    logo?: string;
    children?: DataNode[];
    type?: string;
}
export default OakComponent({
    entity: 'articleMenu',
    projection: {
        id: 1,
        name: 1,
        isArticle: 1,
        isLeaf: 1,
        parent: {
            id: 1,
            name: 1,
            isArticle: 1,
            isLeaf: 1,
        },
        entity: 1,
        entityId: 1,
        article$articleMenu: {
            $entity: 'article',
            data: {
                id: 1,
                name: 1,
                content: 1,
                articleMenuId: 1,
            }
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
                entityId: 1,
            },
            filter: {
                tag1: {
                    $in: ['logo', 'introduce'],
                },
            },
        },
    },
    sorters: [
        {
            sorter: {
                $attr: {
                    $$createAt$$: 1,
                },
                $direction: 'asc',
            },
        },
    ],
    isList: true,
    pagination: {
        currentPage: 1,
        pageSize: 200,
        more: true,
    },
    formData({ data: rows }) {
        const articleMenus: Partial<EntityDict['articleMenu']['Schema']>[]= this.getArticleMenus();
        const treeData = articleMenus?.map((articleMenu) => {
            return {
                label: articleMenu.name,
                key: articleMenu.id?.toString(),
                isArticle: articleMenu.isArticle,
                logo: this.features.extraFile.getUrl(
                    articleMenu?.extraFile$entity?.find(
                        (ele) => ele.tag1 === 'logo'
                    )
                ),
                parentKey: articleMenu?.parentId,
                children: this.buildTreeData(articleMenu.id, articleMenu.isArticle),
            };
        });
        return {
            treeData,
        };
    },
    filters: [],
    lifetimes: {
    },
    data: {
        selectArticleMenuId: '',
        selectArticleId: '',
        treeData: [] as DataNode[],
    },
    properties: {
        entity: '',
        entityId: '',
    },
    actions: ['create', 'update', 'remove'],
    methods: {
        getArticleMenus(parentId?: string) {
            const articleMenus = this.features.cache.get('articleMenu', {
                data: {
                    id: 1,
                    name: 1,
                    isArticle: 1,
                    isLeaf: 1,
                    parent: {
                        id: 1,
                        name: 1,
                        isArticle: 1,
                        isLeaf: 1,
                    },
                    article$articleMenu: {
                        $entity: 'article',
                        data: {
                            id: 1,
                            name: 1,
                            content: 1,
                            articleMenuId: 1,
                        }
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
                            entityId: 1,
                        },
                        filter: {
                            tag1: {
                                $in: ['logo', 'introduce'],
                            },
                        },
                    },
                },
                filter: {
                    parentId: parentId ?  parentId : {
                        $exists: false
                    }
                },
                sorter: [
                    {
                        $attr: {
                            $$createAt$$: 1,
                        },
                        $direction: 'asc',
                    },
                ],
            });

            return articleMenus
        },
        async loadArticleMenus(parentId?: string) {
            const articleMenus = await this.features.cache.refresh('articleMenu', {
                data: {
                    id: 1,
                    name: 1,
                    isArticle: 1,
                    isLeaf: 1,
                    parent: {
                        id: 1,
                        name: 1,
                        isArticle: 1,
                        isLeaf: 1,
                    },
                    article$articleMenu: {
                        $entity: 'article',
                        data: {
                            id: 1,
                            name: 1,
                            content: 1,
                            articleMenuId: 1,
                        }
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
                            entityId: 1,
                        },
                        filter: {
                            tag1: {
                                $in: ['logo', 'introduce'],
                            },
                        },
                    },
                },
                filter: {
                    parentId: parentId ?  parentId : {
                        $exists: false
                    }
                },
                sorter: [
                    {
                        $attr: {
                            $$createAt$$: 1,
                        },
                        $direction: 'asc',
                    },
                ],
            });
        },
        getArticles(articleMenuId: string) {
            const articleMenus = this.features.cache.get('article', {
                data: {
                    id: 1,
                    name: 1,
                    content: 1,
                    articleMenuId: 1,
                },
                filter: {
                    articleMenuId
                },
                sorter: [
                    {
                        $attr: {
                            $$createAt$$: 1,
                        },
                        $direction: 'asc',
                    },
                ],
            });

            return articleMenus
        },

        async loadArticles(articleMenuId?: string) {
            const articles = await this.features.cache.refresh('article', {
                data: {
                    id: 1,
                    name: 1,
                    content: 1,
                    articleMenuId: 1,
                },
                filter: {
                    articleMenuId
                },
                sorter: [
                    {
                        $attr: {
                            $$createAt$$: 1,
                        },
                        $direction: 'asc',
                    },
                ],
            });
        },
        buildTreeData(
            parentId: string,
            isArticle: boolean
        ): DataNode[] {
            let children: DataNode[] = [];
            if (isArticle) {
                const articles: Partial<EntityDict['article']['Schema']>[] = this.getArticles(parentId!);
                children = articles?.map(
                    article => {
                        return {
                            label: article.name!,
                            key: article.id!,
                            type: 'article'!
                        }
                    }
                )
            }
            else {
                const articleMenus:Partial<EntityDict['articleMenu']['Schema']>[] = this.getArticleMenus(parentId!);

                children = articleMenus?.map(
                    articleMenu => {
                        return {
                            label: articleMenu.name!,
                            key: articleMenu.id?.toString()!,
                            isArticle: articleMenu.isArticle!,
                            logo: this.features.extraFile.getUrl(
                                articleMenu?.extraFile$entity?.find(
                                    (ele) => ele.tag1 === 'logo'
                                )
                            ),
                            parentKey: articleMenu?.parentId!,
                            children: this.buildTreeData(articleMenu.id, articleMenu.isArticle),
                        }
                    }
                )
            }
            return children;
        },
        async gotoUpsertById(id: string) {
            this.setState({
                selectArticleMenuId: id,
                selectArticleId: '',
            });
        },
        async gotoArticleUpsert(articleId: string) {
            this.setState({
                selectArticleId: articleId,
                selectArticleMenuId: '',
            });
        },
        gotoEdit(id?: string) {
            if (id) {
                this.navigateTo({
                    url: '/articleMenu/upsert',
                    oakId: id,
                });
            } else {
                const { entity, entityId } = this.props;
                this.navigateTo({
                    url: '/articleMenu/upsert',
                    entity,
                    entityId,
                });
            }
        },
        async onRemoveArticleMenu(id: string) {
            this.removeItem(id);
            await this.execute();
        },
        gotoDoc() {
            window.open('/article/doc')
        },
    },
});
