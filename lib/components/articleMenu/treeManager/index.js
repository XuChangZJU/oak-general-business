"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    isList: true,
    methods: {
        gotoDoc: function () {
            window.open('/article/doc');
        },
        gotoArticleDetail: function (oakId) {
            window.open("/article/detail?oakId=".concat(oakId));
        },
        searchArticle: function (searchValue) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, entity, entityId, articles;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.props, entity = _a.entity, entityId = _a.entityId;
                            if (!searchValue) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.features.cache.refresh('article', {
                                    data: {
                                        id: 1,
                                        name: 1,
                                        content: 1,
                                        articleMenuId: 1,
                                        articleMenu: {
                                            id: 1,
                                            name: 1,
                                            entity: 1,
                                            entityId: 1,
                                        },
                                        $$deleteAt$$: 1,
                                    },
                                    filter: {
                                        $or: [
                                            {
                                                name: {
                                                    $includes: searchValue,
                                                }
                                            },
                                            {
                                                content: {
                                                    $includes: searchValue,
                                                }
                                            }
                                        ],
                                        articleMenu: {
                                            entity: entity,
                                            entityId: entityId
                                        }
                                    }
                                })];
                        case 1:
                            articles = (_b.sent()).data;
                            if (articles && articles.length > 0) {
                                this.setState({
                                    filteredArticles: articles
                                });
                                return [2 /*return*/];
                            }
                            else {
                                this.setState({
                                    filteredArticles: [],
                                });
                                return [2 /*return*/];
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            this.setState({
                                filteredArticles: [],
                            });
                            _b.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        getArticleMenuIdByArticle: function (articleId, type) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var articleMenu, getParentArticleMenu;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.features.cache.refresh('articleMenu', {
                                data: {
                                    id: 1,
                                    article$articleMenu: {
                                        $entity: 'article',
                                        data: {
                                            id: 1,
                                        }
                                    }
                                },
                                filter: {
                                    article$articleMenu: {
                                        id: articleId
                                    }
                                }
                            })];
                        case 1:
                            articleMenu = (_a.sent()).data;
                            getParentArticleMenu = function (parentId) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var articleMenu_1;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!parentId) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.features.cache.refresh('articleMenu', {
                                                    data: {
                                                        id: 1,
                                                        parentId: 1,
                                                    },
                                                    filter: {
                                                        id: parentId,
                                                    }
                                                })];
                                        case 1:
                                            articleMenu_1 = (_a.sent()).data;
                                            if (articleMenu_1 && articleMenu_1.length > 0 && articleMenu_1[0].parentId) {
                                                getParentArticleMenu(articleMenu_1[0].parentId);
                                                return [2 /*return*/];
                                            }
                                            if (articleMenu_1 && articleMenu_1.length > 0 && !articleMenu_1[0].parentId) {
                                                this.gotoSearchArticleAndArticleMenu(articleMenu_1[0].id, articleId, type);
                                                return [2 /*return*/];
                                            }
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); };
                            if (articleMenu && articleMenu.length > 0) {
                                getParentArticleMenu(articleMenu[0].id);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
        gotoSearchArticleAndArticleMenu: function (id, articleId, type) {
            var articleMenuId = this.props.articleMenuId;
            if (articleMenuId === id) {
                this.navigateTo({
                    url: '/article/doc',
                    articleMenuId: id,
                    articleId: articleId,
                });
            }
            else {
                if (!articleMenuId) {
                    if (type === 'list') {
                        this.navigateTo({
                            url: '/article/list',
                            articleId: articleId,
                        });
                    }
                    else {
                        this.navigateTo({
                            url: '/article/doc',
                            articleId: articleId,
                        });
                    }
                }
                else {
                    window.open("/investment/article/doc?articleMenuId=".concat(id, "&articleId=").concat(articleId));
                }
            }
        }
    },
    properties: {
        entity: '',
        entityId: '',
        show: '',
        articleMenuId: '',
        articleId: '',
    },
});
