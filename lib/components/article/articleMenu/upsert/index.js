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
        },
    },
    isList: false,
    formData: function (_a) {
        var _b, _c;
        var articleMenu = _a.data;
        console.log(articleMenu);
        return {
            name: articleMenu === null || articleMenu === void 0 ? void 0 : articleMenu.name,
            parentId: (_b = articleMenu === null || articleMenu === void 0 ? void 0 : articleMenu.parent) === null || _b === void 0 ? void 0 : _b.id,
            parentName: (_c = articleMenu === null || articleMenu === void 0 ? void 0 : articleMenu.parent) === null || _c === void 0 ? void 0 : _c.name,
        };
    },
    lifetimes: {
        ready: function () {
            var _a, _b, _c, _d, _e;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _f, parentId, id, articleMenu;
                return tslib_1.__generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            _f = this.props, parentId = _f.parentId, id = _f.id;
                            console.log(66666666, parentId, id);
                            if (!id) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.features.cache.refresh('articleMenu', {
                                    data: {
                                        id: 1,
                                        name: 1,
                                        isArticle: 1,
                                        isLeaf: 1,
                                        entity: 1,
                                        entityId: 1,
                                    },
                                    filter: {
                                        id: id
                                    }
                                })];
                        case 1:
                            articleMenu = (_g.sent()).data;
                            console.log(articleMenu);
                            if (articleMenu) {
                                this.update({
                                    entity: (_a = articleMenu[0]) === null || _a === void 0 ? void 0 : _a.entity,
                                    entityId: (_b = articleMenu[0]) === null || _b === void 0 ? void 0 : _b.entityId,
                                    isLeaf: (_c = articleMenu[0]) === null || _c === void 0 ? void 0 : _c.isLeaf,
                                    isArticle: (_d = articleMenu[0]) === null || _d === void 0 ? void 0 : _d.isArticle,
                                });
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            this.update({
                                entity: 'platformProvider',
                                entityId: (_e = this.features.application.getApplication()) === null || _e === void 0 ? void 0 : _e.system,
                                isArticle: false,
                                isLeaf: false,
                            });
                            _g.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
    },
    methods: {
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
        reset: function () {
            this.clean();
        },
    }
});
