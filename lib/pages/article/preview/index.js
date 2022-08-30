"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakPage({
    path: 'article:preview',
    isList: false,
    formData: function (_a) {
        var features = _a.features;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                return [2 /*return*/, {}];
            });
        });
    },
    observers: {
        content: function (val) {
            var ac = window.document.getElementById('article-content');
            if (ac) {
                ac.innerHTML = val;
            }
        },
    },
    data: {
        content: '',
        title: '',
        author: '',
    },
    methods: {
        onLoad: function () {
            var data = this.load('article_html') || '{}';
            var data2 = typeof data === 'string' ? JSON.parse(data) : data;
            this.setState({
                content: data2 === null || data2 === void 0 ? void 0 : data2.content,
                title: data2 === null || data2 === void 0 ? void 0 : data2.title,
                author: data2 === null || data2 === void 0 ? void 0 : data2.author,
            });
        },
        onUnload: function () {
            this.save('article_html', '{}');
        },
    },
});
