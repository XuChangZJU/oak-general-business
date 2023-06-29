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
    isList: true,
    formData({ data: articleMenu }) {
        return {
            articleMenu,
        };
    },
    filters: [],
    lifetimes: {
        async ready() {
            const { data: articles } = await this.features.cache.refresh(
                'article',
                {
                    data: {
                        id: 1,
                        name: 1,
                        content: 1,
                        articleMenuId: 1,
                    },
                }
            );
            const { data: articleMenus } = await this.features.cache.refresh(
                'articleMenu',
                {
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
                                    $in: ['logo'],
                                },
                            },
                        },
                    },
                    sorter: [
                        {
                            $attr: {
                                $$createAt$$: 1,
                            },
                            $direction: 'asc',
                        },
                    ],
                }
            );

            const newArticleMenus = articleMenus?.map((ele) => {
                return {
                    ...ele,
                    logo: this.features.extraFile.getUrl(
                        ele?.extraFile$entity?.find(
                            (ele) => ele.tag1 === 'logo'
                        )
                    ),
                };
            });
            const newArticles = articles?.map((ele) => ({
                id: ele?.id,
                name: ele?.name,
                parent: ele?.articleMenuId,
                parentId: ele?.articleMenuId,
                isArticle: true,
                type: 'article',
            }));
            const arr: any[] = [...newArticleMenus, ...newArticles];
            const rootNodes = arr?.filter((node) => !node.parent);
            const treeData = rootNodes?.map((rootNode) => {
                return {
                    label: rootNode.name,
                    key: rootNode.id?.toString(),
                    isArticle: rootNode.isArticle,
                    logo: rootNode?.logo,
                    children: this.buildTreeData(arr, rootNode.id),
                };
            });
           this.setState({
              treeData,
           })
        },
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
        buildTreeData(
            nodes: EntityDict['articleMenu']['Schema'][] | any[],
            parentId: string | null
        ): DataNode[] {
            const children: DataNode[] = [];
            for (const node of nodes) {
                if (node.parentId === parentId) {
                    const treeNode: DataNode = {
                        label: node.name,
                        key: node.id.toString(),
                        isArticle: node.isArticle,
                        isLeaf: node.isLeaf,
                        logo: node.logo,
                        type: node.type,
                    };

                    const nestedChildren = this.buildTreeData(nodes, node.id);
                    if (nestedChildren.length > 0) {
                        treeNode.children = nestedChildren;
                    }

                    children.push(treeNode);
                }
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
    },
});
