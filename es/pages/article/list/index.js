;
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
    pagination: {
        currentPage: 1,
        pageSize: 200,
        more: true,
    },
    isList: true,
    formData({ data: rows }) {
        const articleMenus = this.getArticleMenus();
        const treeData = articleMenus?.map((articleMenu) => {
            return {
                label: articleMenu.name,
                key: articleMenu.id?.toString(),
                isArticle: articleMenu.isArticle,
                logo: this.features.extraFile.getUrl(articleMenu?.extraFile$entity?.find((ele) => ele.tag1 === 'logo')),
                parentKey: articleMenu?.parentId,
                children: this.buildTreeData(articleMenu.id, articleMenu.isArticle),
            };
        });
        return {
            treeData,
        };
    },
    properties: {
        entity: '',
        entityId: '',
    },
    filters: [
        {
            filter() {
                return {
                    entity: this.props.entity,
                    entityId: this.props.entityId,
                };
            },
            '#name': 'entityId',
        }
    ],
    lifetimes: {},
    data: {
        selectedArticleId: '',
        openKeys: [],
        selectedKeys: [],
        treeData: [],
        parentId: '',
        articleMenuId: '',
        id: '',
        name: '',
        isArticle: false,
        isChildren: false,
        logo: '',
        breadcrumbItems: [],
    },
    methods: {
        getArticleMenus(parentId) {
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
                    parentId: parentId ? parentId : {
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
            return articleMenus;
        },
        async loadArticleMenus(parentId) {
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
                    parentId: parentId ? parentId : {
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
        getArticles(articleMenuId) {
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
            return articleMenus;
        },
        async loadArticles(articleMenuId) {
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
        getOpenKeys(targetKey, treeData, openKeys = []) {
            const selectedKeys = [];
            const toggleOpenKeys = (nodes, parentOpen) => {
                for (const node of nodes) {
                    if (node.key === targetKey) {
                        const isOpen = openKeys.includes(node.key);
                        if (isOpen) {
                            // 当前子菜单已展开，收起当前子菜单及其所有子菜单
                            openKeys = openKeys.filter((key) => key !== node.key &&
                                !key.startsWith(`${node.key}-`));
                        }
                        else {
                            // 当前子菜单已收起，展开当前子菜单及其所有子菜单
                            openKeys.push(node.key);
                            openKeys.push(...getAllChildKeys(node));
                            const leafNode = findLeafNode(node);
                            if (leafNode && leafNode.type === 'article') {
                                const parentKeys = getParentKeys(leafNode);
                                selectedKeys.push(...parentKeys);
                                this.gotoArticleUpsert(leafNode.key);
                            }
                        }
                        // 存储第一个没有子节点的节点及其全部父节点到 selectedKeys
                    }
                    else if (node.children) {
                        toggleOpenKeys(node.children, openKeys.includes(node.key) || parentOpen); // 递归处理子菜单的展开和收起
                    }
                }
            };
            const getAllChildKeys = (node) => {
                const childKeys = [];
                if (node.children) {
                    for (const child of node.children) {
                        childKeys.push(child.key);
                        childKeys.push(...getAllChildKeys(child));
                    }
                }
                return childKeys;
            };
            const findLeafNode = (node) => {
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
            const getParentKeys = (node) => {
                const parentKeys = [];
                let currentNode = node;
                while (currentNode) {
                    parentKeys.unshift(currentNode.key);
                    currentNode = findParentNode(currentNode);
                }
                return parentKeys;
            };
            const findParentNode = (node) => {
                if (!node.parentKey) {
                    return undefined;
                }
                const parentNode = treeData.find((ele) => ele.key === node.parentKey);
                return parentNode;
            };
            toggleOpenKeys(treeData, false);
            this.setState({
                openKeys: [...new Set(openKeys)],
                selectedKeys: [...new Set(selectedKeys)], // 去重并更新 selectedKeys
            });
            return openKeys;
        },
        buildTreeData(parentId, isArticle) {
            let children = [];
            if (isArticle) {
                const articles = this.getArticles(parentId);
                children = articles?.map(article => {
                    return {
                        label: article.name,
                        key: article.id,
                        type: 'article',
                        parentKey: article.articleMenuId,
                    };
                });
            }
            else {
                const articleMenus = this.getArticleMenus(parentId);
                children = articleMenus?.map(articleMenu => {
                    return {
                        label: articleMenu.name,
                        key: articleMenu.id?.toString(),
                        isArticle: articleMenu.isArticle,
                        logo: this.features.extraFile.getUrl(articleMenu?.extraFile$entity?.find((ele) => ele.tag1 === 'logo')),
                        parentKey: articleMenu?.parentId,
                        children: this.buildTreeData(articleMenu.id, articleMenu.isArticle),
                    };
                });
            }
            return children;
        },
        findParentNodes(treeData, targetKey) {
            for (let i = 0; i < treeData.length; i++) {
                const node = treeData[i];
                if (node.key === targetKey) {
                    return [node];
                }
                if (node.children) {
                    const parentNodes = this.findParentNodes(node.children, targetKey);
                    if (parentNodes.length > 0) {
                        return [node, ...parentNodes];
                    }
                }
            }
            return [];
        },
        findFirstArticle(treeData) {
            for (let i = 0; i < treeData.length; i++) {
                const node = treeData[i];
                if (node.type === 'article') {
                    const parentNode = this.findParentNodes(this.state.treeData, node.key)[0];
                    return parentNode;
                }
                if (node.children && node.children.length > 0) {
                    const childNode = this.findFirstArticle(node.children);
                    if (childNode) {
                        return childNode;
                    }
                }
            }
            return {};
        },
        async gotoArticleUpsert(articleId, selectedKeys = []) {
            if (selectedKeys.includes(articleId)) {
            }
            else {
                const parentNodes = this.findParentNodes(this.state.treeData, articleId)?.map((ele) => {
                    return { title: ele.label };
                });
                this.setState({
                    breadcrumbItems: parentNodes,
                });
                this.setState({
                    selectedKeys: [articleId],
                    selectedArticleId: articleId,
                    id: '',
                    parentId: '',
                });
            }
        },
    },
});
