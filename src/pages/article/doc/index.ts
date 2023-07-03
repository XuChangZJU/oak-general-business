import { EntityDict } from '../../../general-app-domain';
interface DataNode {
    label: string;
    title: string;
    key: string;
    isArticle?: boolean;
    isLeaf?: boolean;
    logo?: string;
    children?: DataNode[];
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
        // const articleMenus = this.features.cache.get('articleMenu', {
        //     data: {
        //         id: 1,
        //         name: 1,
        //         content: 1,
        //         articleMenuId: 1,
        //     },
        //     filter: {
        //         parentId: {
        //             $exists: false
        //         },
        //     },
        // });
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
                content: ele?.content,
                logo: null,
            }));
            const arr: any[] = [...newArticleMenus, ...newArticles];
            const rootNodes = arr?.filter((node) => !node.parent);
            const treeData = rootNodes?.map((rootNode) => {
                return {
                    label: rootNode.name,
                    title: rootNode.name,
                    key: rootNode.id?.toString(),
                    isArticle: rootNode.isArticle,
                    logo: rootNode?.logo,
                    children: this.buildTreeData(arr, rootNode.id),
                };
            });
            this.setState({
                treeData,
            });
        },
    },
    data: {
        selectedArticleId: '',
        openKeys: [] as string[],
        selectedKeys: [] as string[],
        treeData: [] as DataNode[],
        parentId: '',
        articleMenuId: '',
        id: '',
        name: '',
        isArticle: false,
        isChildren: false,
        logo: '',
    },
    methods: {
        getOpenKeys(
            targetKey: string,
            treeData: DataNode[],
            openKeys: string[] = []
        ): string[] {
            const selectedKeys: string[] = [];

            const toggleOpenKeys = (nodes: DataNode[], parentOpen: boolean) => {
                for (const node of nodes) {
                    if (node.key === targetKey) {
                        const isOpen = openKeys.includes(node.key);

                        if (isOpen) {
                            // 当前子菜单已展开，收起当前子菜单及其所有子菜单
                            openKeys = openKeys.filter(
                                (key) =>
                                    key !== node.key &&
                                    !key.startsWith(`${node.key}-`)
                            );
                        } else {
                            // 当前子菜单已收起，展开当前子菜单及其所有子菜单
                            openKeys.push(node.key);
                            openKeys.push(...getAllChildKeys(node));
                            const leafNode = findLeafNode(node);
                            if (leafNode) {
                                const parentKeys = getParentKeys(leafNode);
                                selectedKeys.push(...parentKeys);
                                this.gotoArticleUpsert(leafNode.key);
                            }
                        }

                        // 存储第一个没有子节点的节点及其全部父节点到 selectedKeys
                    } else if (node.children) {
                        toggleOpenKeys(
                            node.children,
                            openKeys.includes(node.key) || parentOpen
                        ); // 递归处理子菜单的展开和收起
                    }
                }
            };

            const getAllChildKeys = (node: DataNode): string[] => {
                const childKeys: string[] = [];

                if (node.children) {
                    for (const child of node.children) {
                        childKeys.push(child.key);
                        childKeys.push(...getAllChildKeys(child));
                    }
                }

                return childKeys;
            };

            const findLeafNode = (node: DataNode): DataNode | undefined => {
                if (!node.children || node.children.length === 0) {
                    return node;
                }

                for (const child of node.children) {
                    const leafNode = findLeafNode(child);
                    if (leafNode) {
                        return leafNode;
                    }
                }

                return undefined;
            };

            const getParentKeys = (node: DataNode): string[] => {
                const parentKeys: string[] = [];
                let currentNode: DataNode | undefined = node;

                while (currentNode) {
                    parentKeys.unshift(currentNode.key);
                    currentNode = findParentNode(currentNode);
                }

                return parentKeys;
            };

            const findParentNode = (
                node: DataNode | any
            ): DataNode | undefined => {
                if (!node.parentKey) {
                    return undefined;
                }

                const parentNode = treeData.find(
                    (ele) => ele.key === node.parentKey
                );
                return parentNode;
            };

            toggleOpenKeys(treeData, false);

            this.setState({
                openKeys: [...new Set(openKeys)], // 去重并更新 openKeys
                selectedKeys: [...new Set(selectedKeys)], // 去重并更新 selectedKeys
            });

            return openKeys;
        },

        buildTreeData(
            nodes: EntityDict['articleMenu']['Schema'][] | any[],
            parentId: string | null
        ): DataNode[] {
            const children: DataNode[] = [];
            for (const node of nodes) {
                if (node.parentId === parentId) {
                    const treeNode: DataNode = {
                        label: node.name,
                        title: node.name,
                        key: node.id.toString(),
                        isArticle: node.isArticle,
                        isLeaf: node.isLeaf,
                        logo: node.logo,
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
        gotoUpsert(parentId?: string) {
            this.setState({
                parentId,
                id: '',
                articleMenuId: '',
            });
        },
        async gotoUpsertById(id: string) {
            if (id) {
                const { data: articleMenu } = await this.features.cache.refresh(
                    'articleMenu',
                    {
                        data: {
                            id: 1,
                            name: 1,
                            isArticle: 1,
                            parentId: 1,
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
                        filter: {
                            $or: [
                                {
                                    id,
                                },
                                {
                                    parentId: id,
                                },
                            ],
                        },
                    }
                );
                if (articleMenu && articleMenu?.length > 1) {
                    this.setState({
                        id: articleMenu[0].id,
                        name: articleMenu[0].name,
                        parentId: '',
                        articleMenuId: '',
                        isArticle: articleMenu[0].isArticle,
                        isChildren: true,
                        logo: this.features.extraFile.getUrl(
                            articleMenu[0]?.extraFile$entity?.find(
                                (ele) => ele.tag1 === 'logo'
                            )
                        ),
                    });
                }
                if (articleMenu && articleMenu?.length === 1) {
                    this.setState({
                        id: articleMenu[0].id,
                        name: articleMenu[0].name,
                        parentId: '',
                        articleMenuId: '',
                        isArticle: articleMenu[0].isArticle,
                        isChildren: false,
                        logo: this.features.extraFile.getUrl(
                            articleMenu[0]?.extraFile$entity?.find(
                                (ele) => ele.tag1 === 'logo'
                            )
                        ),
                    });
                }
            }
        },
        async gotoArticleUpsert(
            articleId: string,
            selectedKeys: string[] = []
        ) {
            if (selectedKeys.includes(articleId)) {
            } else {
                this.setState({
                    selectedKeys: [articleId],
                    selectedArticleId: articleId,
                    id: '',
                    parentId: '',
                });
            }
        },
        gotoEdit(id?: string) {
            if (id) {
                this.navigateTo({
                    url: '/articleMenu/upsert',
                    oakId: id,
                });
            } else {
                this.navigateTo({
                    url: '/articleMenu/upsert',
                });
            }
        },
        gotoEditByParentId(parentId?: string) {
            this.navigateTo({
                url: '/articleMenu/upsert',
                parentId,
            });
        },
        gotoArticleEdit(articleId: string) {
            this.navigateTo({
                url: '/article/upsert',
                oakId: articleId,
            });
        },
        gotoArticleEditByArticleMenuId(articleMenuId: string) {
            this.navigateTo({
                url: '/article/upsert',
                articleMenuId,
            });
        },
        async onRemoveArticleMenu(id: string) {
            this.removeItem(id);
            await this.execute();
        },
        async onRemoveArticle(id: string) {
            this.removeItem(id);
            await this.execute();
        },
        async check() {
            if (!this.state.name) {
                this.setMessage({
                    type: 'error',
                    content: '请输入文章分类名称',
                });
                return;
            }
            await this.execute();
        },
    },
});
