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
    isList: false,
    formData: function (_a) {
        var _b, _c;
        var articleMenu = _a.data;
        return {
            name: articleMenu === null || articleMenu === void 0 ? void 0 : articleMenu.name,
            parentId: (_b = articleMenu === null || articleMenu === void 0 ? void 0 : articleMenu.parent) === null || _b === void 0 ? void 0 : _b.id,
            parentName: (_c = articleMenu === null || articleMenu === void 0 ? void 0 : articleMenu.parent) === null || _c === void 0 ? void 0 : _c.name,
        };
    },
    filters: [],
    lifetimes: {
        ready: function () {
            var _a, _b, _c, _d;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _e, parentId, oakId, _f, articleMenu;
                return tslib_1.__generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            _e = this.props, parentId = _e.parentId, oakId = _e.oakId;
                            if (!!oakId) return [3 /*break*/, 3];
                            if (!parentId) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.features.cache.refresh('articleMenu', {
                                    data: {
                                        id: 1,
                                        name: 1,
                                        isArticle: 1,
                                        isLeaf: 1,
                                    },
                                    filter: {
                                        id: parentId,
                                    },
                                })];
                        case 1:
                            _f = tslib_1.__read.apply(void 0, [(_g.sent()).data, 1]), articleMenu = _f[0];
                            if (articleMenu) {
                                this.update({
                                    parentId: parentId,
                                    entity: 'platformProvider',
                                    entityId: (_b = (_a = this.features.application.getApplication()) === null || _a === void 0 ? void 0 : _a.system.platform) === null || _b === void 0 ? void 0 : _b.entityId,
                                    isArticle: false,
                                    isLeaf: true,
                                });
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            this.update({
                                entity: 'platformProvider',
                                entityId: (_d = (_c = this.features.application.getApplication()) === null || _c === void 0 ? void 0 : _c.system.platform) === null || _d === void 0 ? void 0 : _d.entityId,
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
        confirm: function () {
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
                            this.navigateBack();
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
