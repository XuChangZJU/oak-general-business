"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    entity: 'article',
    isList: true,
    projection: {
        id: 1,
        name: 1,
        content: 1,
        articleMenu: {
            id: 1,
            name: 1,
            isArticle: 1,
            isLeaf: 1,
        }
    },
    methods: {
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
        gotoArticleEdit: function (articleId) {
            this.navigateTo({
                url: '/article2/upsert',
                oakId: articleId
            });
        },
    },
});
