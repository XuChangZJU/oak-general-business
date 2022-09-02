"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakPage({
    path: 'article:detail',
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
    isList: false,
    formData: function (_a) {
        var article = _a.data, features = _a.features;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                return [2 /*return*/, {
                        id: article === null || article === void 0 ? void 0 : article.id,
                        iState: article === null || article === void 0 ? void 0 : article.iState,
                        title: article === null || article === void 0 ? void 0 : article.title,
                        abstract: article === null || article === void 0 ? void 0 : article.abstract,
                        author: article === null || article === void 0 ? void 0 : article.author,
                        content: article === null || article === void 0 ? void 0 : article.content,
                        extraFile$entity: article === null || article === void 0 ? void 0 : article.extraFile$entity,
                    }];
            });
        });
    },
    observers: {
        'content': function (val) {
            var ac = window.document.getElementById('article-content');
            if (ac) {
                ac.innerHTML = val;
            }
        }
    },
    data: {},
    methods: {},
});
