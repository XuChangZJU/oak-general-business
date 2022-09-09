"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var extraFile_1 = require("../../../utils/extraFile");
exports.default = OakPage({
    entity: 'article',
    projection: {
        id: 1,
        iState: 1,
        title: 1,
        author: 1,
        abstract: 1,
        content: 1,
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
                    $in: ['cover'],
                },
            },
        },
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
                                    var extraFile$entity = article === null || article === void 0 ? void 0 : article.extraFile$entity;
                                    var coverPictures = extraFile$entity === null || extraFile$entity === void 0 ? void 0 : extraFile$entity.filter(function (ele) { return ['cover'].includes(ele.tag1); }).map(function (ele) {
                                        var _a;
                                        return (0, extraFile_1.composeFileUrl)(ele, (_a = application === null || application === void 0 ? void 0 : application.system) === null || _a === void 0 ? void 0 : _a.config);
                                    });
                                    return {
                                        index: index,
                                        id: article === null || article === void 0 ? void 0 : article.id,
                                        iState: article === null || article === void 0 ? void 0 : article.iState,
                                        title: article === null || article === void 0 ? void 0 : article.title,
                                        abstract: article === null || article === void 0 ? void 0 : article.abstract,
                                        author: article === null || article === void 0 ? void 0 : article.author,
                                        content: article === null || article === void 0 ? void 0 : article.content,
                                        coverPicture: coverPictures === null || coverPictures === void 0 ? void 0 : coverPictures[0],
                                    };
                                }),
                                pagination: pagination,
                                searchValue: (_b = filter === null || filter === void 0 ? void 0 : filter.title) === null || _b === void 0 ? void 0 : _b.$includes,
                            }];
                }
            });
        });
    },
    // filters: [],
    // sorters: [],
    methods: {
        goUpsert: function () {
            this.navigateTo({
                url: '/article/upsert',
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
        onRemove: function (path) {
            this.execute('remove', [], path);
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
