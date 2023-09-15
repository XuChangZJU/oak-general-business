"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: true,
    methods: {
        gotoDoc() {
            window.open('/article/doc');
        },
        gotoArticleDetail(oakId) {
            window.open(`/article/detail?oakId=${oakId}`);
        },
        async searchArticle(searchValue) {
            const { entity, entityId } = this.props;
            if (searchValue) {
                const { data: articles } = await this.features.cache.refresh('article', {
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
                            entity,
                            entityId
                        }
                    }
                });
                if (articles && articles.length > 0) {
                    this.setState({
                        filteredArticles: articles
                    });
                    return;
                }
                else {
                    this.setState({
                        filteredArticles: [],
                    });
                    return;
                }
            }
            else {
                this.setState({
                    filteredArticles: [],
                });
            }
        },
        async getArticleMenuIdByArticle(articleId, type) {
            const { data: articleMenu } = await this.features.cache.refresh('articleMenu', {
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
            });
            const getParentArticleMenu = async (parentId) => {
                if (parentId) {
                    const { data: articleMenu } = await this.features.cache.refresh('articleMenu', {
                        data: {
                            id: 1,
                            parentId: 1,
                        },
                        filter: {
                            id: parentId,
                        }
                    });
                    if (articleMenu && articleMenu.length > 0 && articleMenu[0].parentId) {
                        getParentArticleMenu(articleMenu[0].parentId);
                        return;
                    }
                    if (articleMenu && articleMenu.length > 0 && !articleMenu[0].parentId) {
                        this.gotoSearchArticleAndArticleMenu(articleMenu[0].id, articleId, type);
                        return;
                    }
                }
            };
            if (articleMenu && articleMenu.length > 0) {
                getParentArticleMenu(articleMenu[0].id);
            }
        },
        gotoSearchArticleAndArticleMenu(id, articleId, type) {
            const { articleMenuId } = this.props;
            if (articleMenuId === id) {
                this.navigateTo({
                    url: '/article/doc',
                    articleMenuId: id,
                    articleId,
                });
            }
            else {
                if (!articleMenuId) {
                    if (type === 'list') {
                        this.navigateTo({
                            url: '/article/list',
                            articleId,
                        });
                    }
                    else {
                        this.navigateTo({
                            url: '/article/doc',
                            articleId,
                        });
                    }
                }
                else {
                    window.open(`/investment/article/doc?articleMenuId=${id}&articleId=${articleId}`);
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
