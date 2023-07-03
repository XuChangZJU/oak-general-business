"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    entity: 'article',
    projection: {
        id: 1,
        name: 1,
        content: 1,
        articleMenu: {
            id: 1,
        }
    },
    formData: function (_a) {
        var article = _a.data, features = _a.features;
        return {
            id: article === null || article === void 0 ? void 0 : article.id,
            content: article === null || article === void 0 ? void 0 : article.content,
            name: article === null || article === void 0 ? void 0 : article.name,
            // entity: article?.entity,
            // entityId: article?.entityId,
        };
    },
    // listeners: {
    //     content(prev, next) {
    //       if(this.props.oakId) {
    //       } else {
    //         if (prev.content !== next.content) {
    //           const ac = window.document.getElementById('article-content');
    //           if (ac) {
    //               ac.innerHTML = next.content;
    //           }
    //       }
    //       }
    //     },
    // },
    data: {
        content: '',
        title: '',
        author: '',
    },
    lifetimes: {
        attached: function () {
            var data = this.load('article_html') || '{}';
            var data2 = typeof data === 'string' ? JSON.parse(data) : data;
            this.setState({
                content: data2 === null || data2 === void 0 ? void 0 : data2.content,
                title: data2 === null || data2 === void 0 ? void 0 : data2.title,
                author: data2 === null || data2 === void 0 ? void 0 : data2.author,
            });
        },
        detached: function () {
            this.save('article_html', '{}');
        },
    },
    methods: {},
});
