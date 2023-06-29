"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    entity: 'article',
    isList: false,
    projection: {
        id: 1,
        name: 1,
        content: 1,
        articleMenu: {
            id: 1,
            name: 1,
            isArticle: 1,
            isLeaf: 1,
        },
    },
    formData: function (_a) {
        var article = _a.data;
        return {
            content: article === null || article === void 0 ? void 0 : article.content,
            name: article === null || article === void 0 ? void 0 : article.name,
        };
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
                url: '/article/upsert',
                oakId: articleId,
            });
        },
        gotoPreview: function (content, title, articleId) {
            this.save('article_html', JSON.stringify({
                content: content,
                title: title,
                articleId: articleId,
            }));
            window.open("/article/preview?oakId=".concat(articleId));
        },
        copy: function (articleId) {
            var _this = this;
            var url = "".concat(window.location.host, "/article/preview?oakId=").concat(articleId);
            navigator.clipboard.writeText(url).then(function () {
                _this.setMessage({
                    content: '复制链接成功',
                    type: 'success',
                });
            });
        },
    },
});
