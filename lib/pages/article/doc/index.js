"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
;
exports.default = OakComponent({
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
    formData: function (_a) {
        var _this = this;
        var rows = _a.data, props = _a.props;
        var articleMenus = this.getArticleMenus(props.articleMenuId);
        var treeData = articleMenus === null || articleMenus === void 0 ? void 0 : articleMenus.map(function (articleMenu) {
            var _a, _b;
            return {
                label: articleMenu.name,
                key: (_a = articleMenu.id) === null || _a === void 0 ? void 0 : _a.toString(),
                isArticle: articleMenu.isArticle,
                logo: _this.features.extraFile.getUrl((_b = articleMenu === null || articleMenu === void 0 ? void 0 : articleMenu.extraFile$entity) === null || _b === void 0 ? void 0 : _b.find(function (ele) { return ele.tag1 === 'logo'; })),
                parentKey: articleMenu === null || articleMenu === void 0 ? void 0 : articleMenu.parentId,
                children: _this.buildTreeData(articleMenu.id, articleMenu.isArticle),
            };
        });
        return {
            treeData: treeData,
        };
    },
    filters: [],
    lifetimes: {},
    properties: {
        articleMenuId: '',
    },
    data: {
        selectedArticleId: '',
        openKeys: [],
        selectedKeys: [],
        treeData: [],
        parentId: '',
        breadcrumbItems: [],
    },
    methods: {
        getArticleMenus: function (parentId) {
            var articleMenus = this.features.cache.get('articleMenu', {
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
                    parentId: parentId
                        ? parentId
                        : {
                            $exists: false,
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
            });
            return articleMenus;
        },
        loadArticleMenus: function (parentId) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var articleMenus;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.features.cache.refresh('articleMenu', {
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
                                    parentId: parentId
                                        ? parentId
                                        : {
                                            $exists: false,
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
                            })];
                        case 1:
                            articleMenus = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        getArticles: function (articleMenuId) {
            var articleMenus = this.features.cache.get('article', {
                data: {
                    id: 1,
                    name: 1,
                    content: 1,
                    articleMenuId: 1,
                },
                filter: {
                    articleMenuId: articleMenuId,
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
        loadArticles: function (articleMenuId) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var articles;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.features.cache.refresh('article', {
                                data: {
                                    id: 1,
                                    name: 1,
                                    content: 1,
                                    articleMenuId: 1,
                                },
                                filter: {
                                    articleMenuId: articleMenuId,
                                },
                                sorter: [
                                    {
                                        $attr: {
                                            $$createAt$$: 1,
                                        },
                                        $direction: 'asc',
                                    },
                                ],
                            })];
                        case 1:
                            articles = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        getOpenKeys: function (targetKey, treeData, openKeys) {
            var _this = this;
            if (openKeys === void 0) { openKeys = []; }
            var selectedKeys = [];
            var toggleOpenKeys = function (nodes, parentOpen) {
                var e_1, _a;
                var _loop_1 = function (node) {
                    if (node.key === targetKey) {
                        var isOpen = openKeys.includes(node.key);
                        if (isOpen) {
                            // 当前子菜单已展开，收起当前子菜单及其所有子菜单
                            openKeys = openKeys.filter(function (key) {
                                return key !== node.key &&
                                    !key.startsWith("".concat(node.key, "-"));
                            });
                        }
                        else {
                            // 当前子菜单已收起，展开当前子菜单及其所有子菜单
                            openKeys.push(node.key);
                            openKeys.push.apply(openKeys, tslib_1.__spreadArray([], tslib_1.__read(getAllChildKeys(node)), false));
                            var leafNode = findLeafNode(node);
                            if (leafNode && leafNode.type === 'article') {
                                var parentKeys = getParentKeys(leafNode);
                                selectedKeys.push.apply(selectedKeys, tslib_1.__spreadArray([], tslib_1.__read(parentKeys), false));
                                _this.gotoArticleUpsert(leafNode.key);
                            }
                        }
                        // 存储第一个没有子节点的节点及其全部父节点到 selectedKeys
                    }
                    else if (node.children) {
                        toggleOpenKeys(node.children, openKeys.includes(node.key) || parentOpen); // 递归处理子菜单的展开和收起
                    }
                };
                try {
                    for (var nodes_1 = tslib_1.__values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                        var node = nodes_1_1.value;
                        _loop_1(node);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            };
            var getAllChildKeys = function (node) {
                var e_2, _a;
                var childKeys = [];
                if (node.children) {
                    try {
                        for (var _b = tslib_1.__values(node.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var child = _c.value;
                            childKeys.push(child.key);
                            childKeys.push.apply(childKeys, tslib_1.__spreadArray([], tslib_1.__read(getAllChildKeys(child)), false));
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                return childKeys;
            };
            var findLeafNode = function (node) {
                var e_3, _a;
                if (!node.children || node.children.length === 0) {
                    return node;
                }
                try {
                    for (var _b = tslib_1.__values(node.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var child = _c.value;
                        var leafNode = findLeafNode(child);
                        if (leafNode) {
                            return leafNode;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return undefined;
            };
            var getParentKeys = function (node) {
                var parentKeys = [];
                var currentNode = node;
                while (currentNode) {
                    parentKeys.unshift(currentNode.key);
                    currentNode = findParentNode(currentNode);
                }
                return parentKeys;
            };
            var findParentNode = function (node) {
                if (!node.parentKey) {
                    return undefined;
                }
                var parentNode = treeData.find(function (ele) { return ele.key === node.parentKey; });
                return parentNode;
            };
            toggleOpenKeys(treeData, false);
            this.setState({
                openKeys: tslib_1.__spreadArray([], tslib_1.__read(new Set(openKeys)), false),
                selectedKeys: tslib_1.__spreadArray([], tslib_1.__read(new Set(selectedKeys)), false), // 去重并更新 selectedKeys
            });
            return openKeys;
        },
        buildTreeData: function (parentId, isArticle) {
            var _this = this;
            var children = [];
            if (isArticle) {
                var articles = this.getArticles(parentId);
                children = articles === null || articles === void 0 ? void 0 : articles.map(function (article) {
                    return {
                        label: article.name,
                        key: article.id,
                        type: 'article',
                        parentKey: article.articleMenuId,
                    };
                });
            }
            else {
                var articleMenus = this.getArticleMenus(parentId);
                children = articleMenus === null || articleMenus === void 0 ? void 0 : articleMenus.map(function (articleMenu) {
                    var _a, _b;
                    return {
                        label: articleMenu.name,
                        key: (_a = articleMenu.id) === null || _a === void 0 ? void 0 : _a.toString(),
                        isArticle: articleMenu.isArticle,
                        logo: _this.features.extraFile.getUrl((_b = articleMenu === null || articleMenu === void 0 ? void 0 : articleMenu.extraFile$entity) === null || _b === void 0 ? void 0 : _b.find(function (ele) { return ele.tag1 === 'logo'; })),
                        parentKey: articleMenu === null || articleMenu === void 0 ? void 0 : articleMenu.parentId,
                        children: _this.buildTreeData(articleMenu.id, articleMenu.isArticle),
                    };
                });
            }
            return children;
        },
        findParentNodes: function (treeData, targetKey) {
            for (var i = 0; i < treeData.length; i++) {
                var node = treeData[i];
                if (node.key === targetKey) {
                    return [node];
                }
                if (node.children) {
                    var parentNodes = this.findParentNodes(node.children, targetKey);
                    if (parentNodes.length > 0) {
                        return tslib_1.__spreadArray([node], tslib_1.__read(parentNodes), false);
                    }
                }
            }
            return [];
        },
        findFirstArticle: function (treeData) {
            for (var i = 0; i < treeData.length; i++) {
                var node = treeData[i];
                if (node.type === 'article') {
                    var parentNode = this.findParentNodes(this.state.treeData, node.key)[0];
                    return parentNode;
                }
                if (node.children && node.children.length > 0) {
                    var childNode = this.findFirstArticle(node.children);
                    if (childNode) {
                        return childNode;
                    }
                }
            }
            return {};
        },
        gotoArticleUpsert: function (articleId, selectedKeys) {
            var _a;
            if (selectedKeys === void 0) { selectedKeys = []; }
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var parentNodes;
                return tslib_1.__generator(this, function (_b) {
                    if (selectedKeys.includes(articleId)) {
                    }
                    else {
                        parentNodes = (_a = this.findParentNodes(this.state.treeData, articleId)) === null || _a === void 0 ? void 0 : _a.map(function (ele) {
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
                    return [2 /*return*/];
                });
            });
        },
    },
});
