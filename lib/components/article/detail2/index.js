"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        copy: function (articleId) {
            var _this = this;
            var url = "".concat(window.location.host, "/article/detail?oakId=").concat(articleId);
            navigator.clipboard.writeText(url).then(function () {
                _this.setMessage({
                    content: '复制链接成功',
                    type: 'success',
                });
            });
        },
    }
});
