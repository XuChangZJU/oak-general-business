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
    formData: function (_a) {
        var _this = this;
        var rows = _a.data;
        var articleMenus = this.getArticleMenus();
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
    data: {
        selectArticleMenuId: '',
        selectArticleId: '',
        treeData: [],
    },
    properties: {
        entity: '',
        entityId: '',
    },
    actions: ['create', 'update', 'remove'],
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
                    articleMenuId: articleMenuId
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
                                    articleMenuId: articleMenuId
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
        buildTreeData: function (parentId, isArticle) {
            var _this = this;
            var children = [];
            if (isArticle) {
                var articles = this.getArticles(parentId);
                children = articles === null || articles === void 0 ? void 0 : articles.map(function (article) {
                    return {
                        label: article.name,
                        key: article.id,
                        type: 'article'
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
        gotoUpsertById: function (id) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    this.setState({
                        selectArticleMenuId: id,
                        selectArticleId: '',
                    });
                    return [2 /*return*/];
                });
            });
        },
        gotoArticleUpsert: function (articleId) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    this.setState({
                        selectArticleId: articleId,
                        selectArticleMenuId: '',
                    });
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
                var _a = this.props, entity = _a.entity, entityId = _a.entityId;
                this.navigateTo({
                    url: '/articleMenu/upsert',
                    entity: entity,
                    entityId: entityId,
                });
            }
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
        gotoDoc: function () {
            window.open('/article/doc');
        },
    },
});
