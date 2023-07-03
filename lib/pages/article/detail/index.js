"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
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
    formData: function (_a) {
        var articleMenu = _a.data;
        return {
            articleMenu: articleMenu,
        };
    },
    filters: [],
    lifetimes: {
        ready: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var articles, articleMenus, newArticleMenus, newArticles, arr, rootNodes, treeData;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.features.cache.refresh('article', {
                                data: {
                                    id: 1,
                                    name: 1,
                                    content: 1,
                                    articleMenuId: 1,
                                },
                            })];
                        case 1:
                            articles = (_a.sent()).data;
                            return [4 /*yield*/, this.features.cache.refresh('articleMenu', {
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
                                })];
                        case 2:
                            articleMenus = (_a.sent()).data;
                            newArticleMenus = articleMenus === null || articleMenus === void 0 ? void 0 : articleMenus.map(function (ele) {
                                var _a;
                                return tslib_1.__assign(tslib_1.__assign({}, ele), { logo: _this.features.extraFile.getUrl((_a = ele === null || ele === void 0 ? void 0 : ele.extraFile$entity) === null || _a === void 0 ? void 0 : _a.find(function (ele) { return ele.tag1 === 'logo'; })) });
                            });
                            newArticles = articles === null || articles === void 0 ? void 0 : articles.map(function (ele) { return ({
                                id: ele === null || ele === void 0 ? void 0 : ele.id,
                                name: ele === null || ele === void 0 ? void 0 : ele.name,
                                parent: ele === null || ele === void 0 ? void 0 : ele.articleMenuId,
                                parentId: ele === null || ele === void 0 ? void 0 : ele.articleMenuId,
                                isArticle: true,
                                content: ele === null || ele === void 0 ? void 0 : ele.content,
                                logo: null,
                            }); });
                            arr = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(newArticleMenus), false), tslib_1.__read(newArticles), false);
                            rootNodes = arr === null || arr === void 0 ? void 0 : arr.filter(function (node) { return !node.parent; });
                            treeData = rootNodes === null || rootNodes === void 0 ? void 0 : rootNodes.map(function (rootNode) {
                                var _a;
                                return {
                                    label: rootNode.name,
                                    title: rootNode.name,
                                    key: (_a = rootNode.id) === null || _a === void 0 ? void 0 : _a.toString(),
                                    isArticle: rootNode.isArticle,
                                    logo: rootNode === null || rootNode === void 0 ? void 0 : rootNode.logo,
                                    children: _this.buildTreeData(arr, rootNode.id),
                                };
                            });
                            this.setState({
                                treeData: treeData,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
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
    },
    methods: {
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
                            if (leafNode) {
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
        buildTreeData: function (nodes, parentId) {
            var e_4, _a;
            var children = [];
            try {
                for (var nodes_2 = tslib_1.__values(nodes), nodes_2_1 = nodes_2.next(); !nodes_2_1.done; nodes_2_1 = nodes_2.next()) {
                    var node = nodes_2_1.value;
                    if (node.parentId === parentId) {
                        var treeNode = {
                            label: node.name,
                            title: node.name,
                            key: node.id.toString(),
                            isArticle: node.isArticle,
                            isLeaf: node.isLeaf,
                            logo: node.logo,
                        };
                        var nestedChildren = this.buildTreeData(nodes, node.id);
                        if (nestedChildren.length > 0) {
                            treeNode.children = nestedChildren;
                        }
                        children.push(treeNode);
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (nodes_2_1 && !nodes_2_1.done && (_a = nodes_2.return)) _a.call(nodes_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return children;
        },
        gotoUpsert: function (parentId) {
            this.setState({
                parentId: parentId,
                id: '',
                articleMenuId: '',
            });
        },
        gotoUpsertById: function (id) {
            var _a, _b, _c, _d;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var articleMenu;
                return tslib_1.__generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            if (!id) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.features.cache.refresh('articleMenu', {
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
                                                id: id,
                                            },
                                            {
                                                parentId: id,
                                            },
                                        ],
                                    },
                                })];
                        case 1:
                            articleMenu = (_e.sent()).data;
                            if (articleMenu && (articleMenu === null || articleMenu === void 0 ? void 0 : articleMenu.length) > 1) {
                                this.setState({
                                    id: articleMenu[0].id,
                                    name: articleMenu[0].name,
                                    parentId: '',
                                    articleMenuId: '',
                                    isArticle: articleMenu[0].isArticle,
                                    isChildren: true,
                                    logo: this.features.extraFile.getUrl((_b = (_a = articleMenu[0]) === null || _a === void 0 ? void 0 : _a.extraFile$entity) === null || _b === void 0 ? void 0 : _b.find(function (ele) { return ele.tag1 === 'logo'; })),
                                });
                            }
                            if (articleMenu && (articleMenu === null || articleMenu === void 0 ? void 0 : articleMenu.length) === 1) {
                                this.setState({
                                    id: articleMenu[0].id,
                                    name: articleMenu[0].name,
                                    parentId: '',
                                    articleMenuId: '',
                                    isArticle: articleMenu[0].isArticle,
                                    isChildren: false,
                                    logo: this.features.extraFile.getUrl((_d = (_c = articleMenu[0]) === null || _c === void 0 ? void 0 : _c.extraFile$entity) === null || _d === void 0 ? void 0 : _d.find(function (ele) { return ele.tag1 === 'logo'; })),
                                });
                            }
                            _e.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        },
        gotoArticleUpsert: function (articleId, selectedKeys) {
            if (selectedKeys === void 0) { selectedKeys = []; }
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    if (selectedKeys.includes(articleId)) {
                    }
                    else {
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
        gotoEdit: function (id) {
            if (id) {
                this.navigateTo({
                    url: '/articleMenu/upsert',
                    oakId: id,
                });
            }
            else {
                this.navigateTo({
                    url: '/articleMenu/upsert',
                });
            }
        },
        gotoEditByParentId: function (parentId) {
            this.navigateTo({
                url: '/articleMenu/upsert',
                parentId: parentId,
            });
        },
        gotoArticleEdit: function (articleId) {
            this.navigateTo({
                url: '/article/upsert',
                oakId: articleId,
            });
        },
        gotoArticleEditByArticleMenuId: function (articleMenuId) {
            this.navigateTo({
                url: '/article/upsert',
                articleMenuId: articleMenuId,
            });
        },
        onRemoveArticleMenu: function (id) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.removeItem(id);
                            return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        onRemoveArticle: function (id) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.removeItem(id);
                            return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        check: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.state.name) {
                                this.setMessage({
                                    type: 'error',
                                    content: '请输入文章分类名称',
                                });
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
