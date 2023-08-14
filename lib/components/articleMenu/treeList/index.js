"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    entity: 'articleMenu',
    isList: true,
    properties: {
        entity: '',
        entityId: '',
        parentId: '',
        onGrandChildEditArticleChange: function (data) { return undefined; },
        show: '',
        articleMenuId: '',
        getBreadcrumbItems: function (breadcrumbItems) { return undefined; },
        breadcrumbItems: [],
        drawerOpen: false,
        changeDrawerOpen: function (open) { return undefined; },
        addOpen: false,
        changeAddOpen: function (addOpen) { return undefined; },
        selectedArticleId: '',
        defaultOpen: false,
        changeDefaultOpen: function (defaultOpen, openArray) { return undefined; },
        openArray: [],
    },
    projection: {
        id: 1,
        name: 1,
        entity: 1,
        entityId: 1,
        parentId: 1,
        isArticle: 1,
        articleMenu$parent: {
            $entity: 'articleMenu',
            data: {
                id: 1,
            },
            // indexFrom: 0,
            // count: 1,
        },
        article$articleMenu: {
            $entity: 'article',
            data: {
                id: 1,
            },
            // indexFrom: 0,
            // count: 1,
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
            },
            filter: {
                tag1: {
                    $in: ['logo'],
                },
            },
        },
    },
    sorters: [
        {
            sorter: function () { return ({
                $attr: {
                    $$createAt$$: 1,
                },
                $direction: 'asc',
            }); },
        },
    ],
    filters: [
        {
            filter: function () {
                var _a = this.props, entity = _a.entity, entityId = _a.entityId, parentId = _a.parentId, articleMenuId = _a.articleMenuId;
                if (articleMenuId) {
                    return {
                        entity: entity,
                        entityId: entityId,
                        id: articleMenuId,
                    };
                }
                if (parentId) {
                    return {
                        entity: entity,
                        entityId: entityId,
                        parentId: parentId,
                    };
                }
                return {
                    entity: entity,
                    entityId: entityId,
                    parentId: {
                        $exists: false,
                    },
                };
            }
        }
    ],
    formData: function (_a) {
        var rows = _a.data;
        return {
            rows: rows,
        };
    },
    methods: {
        createOne: function (name) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, entity, entityId, parentId;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.props, entity = _a.entity, entityId = _a.entityId, parentId = _a.parentId;
                            this.addItem({
                                name: name,
                                entity: entity,
                                entityId: entityId,
                                parentId: parentId,
                                isArticle: false,
                                isLeaf: false, // 这个属性没用了，但声明成not null了(todo)
                            });
                            return [4 /*yield*/, this.execute()];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        getDefaultArticle: function (rows) {
            var _this = this;
            if (!rows || rows.length === 0) {
                return null;
            }
            var toggleItems = [];
            toggleItems.push(rows[0].id);
            var getChildArticleMenu = function (id) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var articleMenus, subToggleItems;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.features.cache.refresh('articleMenu', {
                                data: {
                                    id: 1,
                                    name: 1,
                                    entity: 1,
                                    entityId: 1,
                                    parentId: 1,
                                    isArticle: 1,
                                    articleMenu$parent: {
                                        $entity: 'articleMenu',
                                        data: {
                                            id: 1,
                                        },
                                        indexFrom: 0,
                                        count: 1,
                                        sorter: [
                                            {
                                                $attr: {
                                                    $$createAt$$: 1,
                                                },
                                                $direction: 'asc',
                                            }
                                        ]
                                    },
                                    article$articleMenu: {
                                        $entity: 'article',
                                        data: {
                                            id: 1,
                                        },
                                        indexFrom: 0,
                                        count: 1,
                                        sorter: [
                                            {
                                                $attr: {
                                                    $$createAt$$: 1,
                                                },
                                                $direction: 'asc',
                                            }
                                        ]
                                    },
                                },
                                filter: {
                                    entity: this.props.entity,
                                    entityId: this.props.entityId,
                                    parentId: id,
                                },
                                sorter: [
                                    {
                                        $attr: {
                                            $$createAt$$: 1,
                                        },
                                        $direction: 'asc',
                                    }
                                ]
                            })];
                        case 1:
                            articleMenus = (_a.sent()).data;
                            if (!(articleMenus && articleMenus.length > 0)) return [3 /*break*/, 5];
                            toggleItems.push(articleMenus[0].id);
                            if (!(articleMenus[0].article$articleMenu && articleMenus[0].article$articleMenu.length > 0)) return [3 /*break*/, 2];
                            toggleItems.push(articleMenus[0].article$articleMenu[0].id);
                            return [2 /*return*/, toggleItems];
                        case 2:
                            if (!(articleMenus[0].articleMenu$parent && articleMenus[0].articleMenu$parent.length > 0)) return [3 /*break*/, 4];
                            toggleItems.push(articleMenus[0].articleMenu$parent[0].id);
                            return [4 /*yield*/, getChildArticleMenu(articleMenus[0].id)];
                        case 3:
                            subToggleItems = _a.sent();
                            if (subToggleItems) {
                                return [2 /*return*/, toggleItems];
                            }
                            _a.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5: return [2 /*return*/];
                        case 6: return [2 /*return*/];
                    }
                });
            }); };
            if (rows[0].article$articleMenu && rows[0].article$articleMenu.length > 0) {
                toggleItems.push(rows[0].article$articleMenu[0].id);
            }
            else {
                getChildArticleMenu(rows[0].id);
            }
            return toggleItems;
        }
    }
});
