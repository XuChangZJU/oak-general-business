"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = require("oak-domain/lib/utils/assert");
var types_1 = require("oak-domain/lib/types");
var triggers = [
    {
        name: '在创建文章分类时，查询文章分类是否重名',
        entity: 'articleMenu',
        action: 'create',
        when: 'before',
        fn: function (event, context) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var data, _a, articleMenu;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = event.operation.data;
                        (0, assert_1.assert)(!(data instanceof Array)); // 不可能是成组创建
                        if (!(data.name && data.parentId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, context.select('articleMenu', {
                                data: {
                                    id: 1,
                                    name: 1,
                                    parentId: 1,
                                },
                                filter: {
                                    name: data.name,
                                    parentId: data.parentId,
                                },
                            }, {})];
                    case 1:
                        _a = tslib_1.__read.apply(void 0, [_b.sent(), 1]), articleMenu = _a[0];
                        if (articleMenu) {
                            throw new types_1.OakPreConditionUnsetException("\u7236\u5206\u7C7B\u7684\u540C\u4E00\u5B50\u96C6\u4E2D\u5B58\u5728\u540C\u540D\u5206\u7C7B\u3010".concat(data.name, "\u3011\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165"));
                        }
                        _b.label = 2;
                    case 2: return [2 /*return*/, 0];
                }
            });
        }); },
    },
    {
        name: '在更新文章分类时，查询文章分类是否重名',
        entity: 'articleMenu',
        action: 'update',
        when: 'before',
        fn: function (event, context) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var _a, data, filter, _b, articleMenus, _c, articleMenus2;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = event.operation, data = _a.data, filter = _a.filter;
                        (0, assert_1.assert)(!(data instanceof Array)); // 不可能是成组创建
                        if (!data.name) return [3 /*break*/, 3];
                        return [4 /*yield*/, context.select('articleMenu', {
                                data: {
                                    id: 1,
                                    name: 1,
                                    parentId: 1,
                                },
                                filter: filter,
                            }, {})];
                    case 1:
                        _b = tslib_1.__read.apply(void 0, [_d.sent(), 1]), articleMenus = _b[0];
                        if (!(articleMenus && articleMenus.parentId)) return [3 /*break*/, 3];
                        return [4 /*yield*/, context.select('articleMenu', {
                                data: {
                                    id: 1,
                                    name: 1,
                                    parentId: 1,
                                },
                                filter: {
                                    name: data.name,
                                    parentId: articleMenus.parentId,
                                },
                            }, {})];
                    case 2:
                        _c = tslib_1.__read.apply(void 0, [_d.sent(), 1]), articleMenus2 = _c[0];
                        if (articleMenus2) {
                            throw new types_1.OakPreConditionUnsetException("\u7236\u5206\u7C7B\u7684\u540C\u4E00\u5B50\u96C6\u4E2D\u5B58\u5728\u540C\u540D\u5206\u7C7B\u3010".concat(data.name, "\u3011\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165"));
                        }
                        _d.label = 3;
                    case 3: return [2 /*return*/, 1];
                }
            });
        }); },
    }
];
exports.default = triggers;
