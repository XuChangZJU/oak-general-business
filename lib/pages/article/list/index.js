"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    entity: 'article',
    projection: {
        id: 1,
        iState: 1,
        title: 1,
        author: 1,
        abstract: 1,
        content: 1,
        entity: 1,
        entityId: 1,
    },
    isList: true,
    formData: function (_a) {
        var _b;
        var articles = _a.data, features = _a.features;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var application, filter, pagination;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, features.application.getApplication()];
                    case 1:
                        application = _c.sent();
                        return [4 /*yield*/, this.getFilterByName('title')];
                    case 2:
                        filter = _c.sent();
                        pagination = this.getPagination();
                        return [2 /*return*/, {
                                articles: articles === null || articles === void 0 ? void 0 : articles.map(function (article, index) {
                                    return {
                                        id: article === null || article === void 0 ? void 0 : article.id,
                                        iState: article === null || article === void 0 ? void 0 : article.iState,
                                        title: article === null || article === void 0 ? void 0 : article.title,
                                        abstract: article === null || article === void 0 ? void 0 : article.abstract,
                                        author: article === null || article === void 0 ? void 0 : article.author,
                                        content: article === null || article === void 0 ? void 0 : article.content,
                                        entity: article === null || article === void 0 ? void 0 : article.entity,
                                        entityId: article === null || article === void 0 ? void 0 : article.entityId,
                                    };
                                }),
                                pagination: pagination,
                                searchValue: (_b = filter === null || filter === void 0 ? void 0 : filter.title) === null || _b === void 0 ? void 0 : _b.$includes,
                            }];
                }
            });
        });
    },
    filters: [
        // 由调用者注入oakFilter
        {
            filter: function (_a) {
                var features = _a.features, props = _a.props;
                return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                    var entityId, entity;
                    return tslib_1.__generator(this, function (_b) {
                        entityId = props.entityId, entity = props.entity;
                        return [2 /*return*/, {
                                entityId: entityId,
                                entity: entity,
                            }];
                    });
                });
            },
        },
    ],
    // sorters: [],
    methods: {
        goUpsert: function () {
            var _a = this.props, entityId = _a.entityId, entity = _a.entity;
            this.navigateTo({
                url: '/article/upsert',
                entityId: entityId,
                entity: entity,
            });
        },
        goUpsertById: function (id) {
            this.navigateTo({
                url: '/article/upsert',
                oakId: id,
            });
        },
        goDetailById: function (id) {
            this.navigateTo({
                url: '/article/detail',
                oakId: id,
            });
        },
        onRemove: function (id) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.addOperation({
                                action: 'remove',
                                data: {},
                                filter: {
                                    id: id,
                                },
                            })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.execute()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        searchChange: function (event) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var value;
                return tslib_1.__generator(this, function (_a) {
                    value = this.resolveInput(event).value;
                    this.searchValueChange(value);
                    return [2 /*return*/];
                });
            });
        },
        searchValueChange: function (value) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    this.addNamedFilter({
                        filter: {
                            title: {
                                $includes: value,
                            },
                        },
                        '#name': 'title',
                    });
                    return [2 /*return*/];
                });
            });
        },
        searchCancel: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    this.removeNamedFilterByName('title');
                    return [2 /*return*/];
                });
            });
        },
        searchConfirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    this.refresh();
                    return [2 /*return*/];
                });
            });
        },
    },
});
