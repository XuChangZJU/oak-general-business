"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        var _b, _c, _d;
        var articleMenu = _a.data, features = _a.features;
        return {
            isArticle: articleMenu === null || articleMenu === void 0 ? void 0 : articleMenu.isArticle,
            isLeaf: articleMenu === null || articleMenu === void 0 ? void 0 : articleMenu.isLeaf,
            name: articleMenu === null || articleMenu === void 0 ? void 0 : articleMenu.name,
            parentId: (_b = articleMenu === null || articleMenu === void 0 ? void 0 : articleMenu.parent) === null || _b === void 0 ? void 0 : _b.id,
            parentName: (_c = articleMenu === null || articleMenu === void 0 ? void 0 : articleMenu.parent) === null || _c === void 0 ? void 0 : _c.name,
            logo: features.extraFile.getUrl((_d = articleMenu === null || articleMenu === void 0 ? void 0 : articleMenu.extraFile$entity) === null || _d === void 0 ? void 0 : _d.find(function (ele) { return ele.tag1 === 'logo'; })),
        };
    },
    filters: [],
    lifetimes: {},
    methods: {
        goUpsert: function (id) {
            this.navigateTo({
                url: '/articleMenu/upsert',
                oakId: id,
            });
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
    },
});
