"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = require("oak-domain/lib/utils/assert");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var triggers = [
    {
        name: '在创建文章后，将文章所属分类的【isArticle】置为【true】',
        entity: 'article',
        action: 'create',
        when: 'after',
        fn: function (event, context) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var _a, data, filter, _b, article, _c, _d, _e;
            var _f;
            return tslib_1.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = event.operation, data = _a.data, filter = _a.filter;
                        (0, assert_1.assert)(!(data instanceof Array)); // 不可能是成组创建
                        if (!data) return [3 /*break*/, 4];
                        return [4 /*yield*/, context.select('article', {
                                data: {
                                    id: 1,
                                    name: 1,
                                    content: 1,
                                    articleMenuId: 1,
                                },
                                filter: {
                                    id: data.id
                                }
                            }, {})];
                    case 1:
                        _b = tslib_1.__read.apply(void 0, [_g.sent(), 1]), article = _b[0];
                        if (!article) return [3 /*break*/, 4];
                        _d = (_c = context).operate;
                        _e = ['articleMenu'];
                        _f = {};
                        return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                    case 2: return [4 /*yield*/, _d.apply(_c, _e.concat([(_f.id = _g.sent(),
                                _f.action = 'update',
                                _f.data = {
                                    isArticle: true,
                                },
                                _f.filter = {
                                    id: article.articleMenuId,
                                },
                                _f), {}]))];
                    case 3:
                        _g.sent();
                        _g.label = 4;
                    case 4: return [2 /*return*/, 0];
                }
            });
        }); },
    },
    {
        name: '在删除文章前，将文章所属分类的【isArticle】置为【false】',
        entity: 'article',
        action: 'remove',
        when: 'before',
        fn: function (event, context) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var _a, data, filter, _b, article, _c, _d, _e;
            var _f;
            return tslib_1.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = event.operation, data = _a.data, filter = _a.filter;
                        return [4 /*yield*/, context.select('article', {
                                data: {
                                    id: 1,
                                    name: 1,
                                    content: 1,
                                    articleMenuId: 1,
                                },
                                filter: filter
                            }, {})];
                    case 1:
                        _b = tslib_1.__read.apply(void 0, [_g.sent(), 1]), article = _b[0];
                        if (!article) return [3 /*break*/, 4];
                        _d = (_c = context).operate;
                        _e = ['articleMenu'];
                        _f = {};
                        return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                    case 2: return [4 /*yield*/, _d.apply(_c, _e.concat([(_f.id = _g.sent(),
                                _f.action = 'update',
                                _f.data = {
                                    isArticle: false,
                                },
                                _f.filter = {
                                    id: article.articleMenuId,
                                },
                                _f), {}]))];
                    case 3:
                        _g.sent();
                        _g.label = 4;
                    case 4: return [2 /*return*/, 0];
                }
            });
        }); },
    },
];
exports.default = triggers;
