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
                                    key: (_a = (rootNode.id)) === null || _a === void 0 ? void 0 : _a.toString(),
                                    isArticle: rootNode.isArticle,
                                    logo: rootNode === null || rootNode === void 0 ? void 0 : rootNode.logo,
                                    children: _this.buildTreeData(arr, rootNode.id),
                                };
                            });
                            this.setState({
                                arr: arr,
                                treeData: treeData
                            });
                            return [2 /*return*/];
                    }
                });
            });
        }
    },
    methods: {
        buildTreeData: function (nodes, parentId) {
            var e_1, _a;
            var children = [];
            try {
                for (var nodes_1 = tslib_1.__values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                    var node = nodes_1_1.value;
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
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
                }
                finally { if (e_1) throw e_1.error; }
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
            var _a, _b;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var articleMenu;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
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
                                            }
                                        ]
                                    },
                                })];
                        case 1:
                            articleMenu = (_c.sent()).data;
                            if (articleMenu && (articleMenu === null || articleMenu === void 0 ? void 0 : articleMenu.length) > 1) {
                                this.setState({
                                    id: articleMenu[0].id,
                                    name: articleMenu[0].name,
                                    parentId: '',
                                    articleMenuId: '',
                                    isArticle: articleMenu[0].isArticle,
                                    isChildren: true,
                                    logo: this.features.extraFile.getUrl((_a = articleMenu[0].extraFile$entity) === null || _a === void 0 ? void 0 : _a.find(function (ele) { return ele.tag1 === 'logo'; }))
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
                                    logo: this.features.extraFile.getUrl((_b = articleMenu[0].extraFile$entity) === null || _b === void 0 ? void 0 : _b.find(function (ele) { return ele.tag1 === 'logo'; })),
                                    content: undefined,
                                    articleId: undefined,
                                });
                            }
                            _c.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        },
        gotoArticleUpsert: function (articleId) {
            var _a, _b;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var article;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!articleId) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.features.cache.refresh('article', {
                                    data: {
                                        id: 1,
                                        name: 1,
                                        content: 1,
                                        articleMenuId: 1,
                                    },
                                    filter: {
                                        id: articleId
                                    },
                                })];
                        case 1:
                            article = (_c.sent()).data;
                            if (article) {
                                this.setState({
                                    title: (_a = article[0]) === null || _a === void 0 ? void 0 : _a.name,
                                    content: (_b = article[0]) === null || _b === void 0 ? void 0 : _b.content,
                                    articleId: articleId,
                                    id: '',
                                    parentId: '',
                                });
                            }
                            ;
                            _c.label = 2;
                        case 2:
                            ;
                            return [2 /*return*/];
                    }
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
                parentId: parentId
            });
        },
        gotoArticleEdit: function (articleId) {
            this.navigateTo({
                url: '/article/upsert',
                oakId: articleId
            });
        },
        gotoArticleEditByArticleMenuId: function (articleMenuId) {
            this.navigateTo({
                url: '/article/upsert',
                articleMenuId: articleMenuId
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
        gotoPreview: function (content, title, articleId) {
            this.save('article_html', JSON.stringify({
                content: content,
                title: title,
                articleId: articleId,
            }));
            window.open("/article/preview?oakId=".concat(articleId));
        },
        copy: function (articleId) {
            var _this = this;
            var url = "".concat(window.location.host, "/article/preview?oakId=").concat(articleId);
            navigator.clipboard.writeText(url).then(function () {
                _this.setMessage({
                    content: '复制链接成功',
                    type: 'success',
                });
            });
        },
    }
});
