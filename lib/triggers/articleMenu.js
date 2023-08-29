"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = require("oak-domain/lib/utils/assert");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var types_1 = require("oak-domain/lib/types");
var triggers = [
    {
        name: '在创建文章分类时，查询文章分类是否重名',
        entity: 'articleMenu',
        action: 'create',
        when: 'before',
        fn: function (event, context) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var data, entity, entityId, _a, articleMenu;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = event.operation.data;
                        (0, assert_1.assert)(!(data instanceof Array)); // 不可能是成组创建
                        if (!data.name) return [3 /*break*/, 2];
                        entity = data.entity, entityId = data.entityId;
                        return [4 /*yield*/, context.select('articleMenu', {
                                data: {
                                    id: 1,
                                    name: 1,
                                    parentId: 1,
                                },
                                filter: {
                                    entity: entity,
                                    entityId: entityId,
                                    name: data.name,
                                    parentId: data.parentId
                                        ? data.parentId
                                        : {
                                            $exists: false,
                                        },
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
        name: '在创建文章分类时，文章分类的父节点的【isLeaf】置为【true】',
        entity: 'articleMenu',
        action: 'create',
        when: 'after',
        fn: function (event, context) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var _a, data, filter, id, _b, articleMenu, _c, _d, _e;
            var _f;
            return tslib_1.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = event.operation, data = _a.data, filter = _a.filter;
                        (0, assert_1.assert)(!(data instanceof Array));
                        id = data.id;
                        return [4 /*yield*/, context.select('articleMenu', {
                                data: {
                                    id: 1,
                                    name: 1,
                                    parentId: 1,
                                    parent: {
                                        id: 1,
                                        isLeaf: 1,
                                    },
                                },
                                filter: {
                                    id: id,
                                },
                            }, {})];
                    case 1:
                        _b = tslib_1.__read.apply(void 0, [_g.sent(), 1]), articleMenu = _b[0];
                        if (!(articleMenu &&
                            articleMenu.parent &&
                            !articleMenu.parent.isLeaf)) return [3 /*break*/, 4];
                        _d = (_c = context).operate;
                        _e = ['articleMenu'];
                        _f = {};
                        return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                    case 2: return [4 /*yield*/, _d.apply(_c, _e.concat([(_f.id = _g.sent(),
                                _f.action = 'update',
                                _f.data = {
                                    isLeaf: true,
                                },
                                _f.filter = {
                                    id: articleMenu.parentId,
                                },
                                _f), {
                                blockTrigger: true,
                            }]))];
                    case 3:
                        _g.sent();
                        _g.label = 4;
                    case 4: return [2 /*return*/, 0];
                }
            });
        }); },
    },
    {
        name: '在删除文章分类前，将文章分类的父节点的【isLeaf】置为【false】,同时删除extraFile',
        entity: 'articleMenu',
        action: 'remove',
        when: 'before',
        fn: function (event, context) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var _a, data, filter, _b, articleMenu, _c, _d, _e, articleMenus, _f, _g, _h;
            var _j, _k;
            return tslib_1.__generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        _a = event.operation, data = _a.data, filter = _a.filter;
                        return [4 /*yield*/, context.select('articleMenu', {
                                data: {
                                    id: 1,
                                    name: 1,
                                    parentId: 1,
                                    parent: {
                                        id: 1,
                                        isLeaf: 1,
                                    },
                                },
                                filter: filter,
                            }, {})];
                    case 1:
                        _b = tslib_1.__read.apply(void 0, [_l.sent(), 1]), articleMenu = _b[0];
                        _d = (_c = context).operate;
                        _e = ['extraFile'];
                        _j = {};
                        return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                    case 2: return [4 /*yield*/, _d.apply(_c, _e.concat([(_j.id = _l.sent(),
                                _j.action = 'remove',
                                _j.data = {},
                                _j.filter = {
                                    entityId: filter.id,
                                },
                                _j), {}]))];
                    case 3:
                        _l.sent();
                        if (!(articleMenu && articleMenu.parentId)) return [3 /*break*/, 7];
                        return [4 /*yield*/, context.select('articleMenu', {
                                data: {
                                    id: 1,
                                },
                                filter: {
                                    parentId: articleMenu.parentId,
                                    id: {
                                        $ne: articleMenu.id,
                                    },
                                },
                            }, {})];
                    case 4:
                        articleMenus = _l.sent();
                        if (!(articleMenus.length === 0)) return [3 /*break*/, 7];
                        _g = (_f = context).operate;
                        _h = ['articleMenu'];
                        _k = {};
                        return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                    case 5: return [4 /*yield*/, _g.apply(_f, _h.concat([(_k.id = _l.sent(),
                                _k.action = 'update',
                                _k.data = {
                                    isLeaf: false,
                                },
                                _k.filter = {
                                    id: articleMenu.parentId,
                                },
                                _k), {}]))];
                    case 6:
                        _l.sent();
                        _l.label = 7;
                    case 7: return [2 /*return*/, 0];
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
            var _a, data, filter, _b, articleMenu, _c, articleMenu2;
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
                        _b = tslib_1.__read.apply(void 0, [_d.sent(), 1]), articleMenu = _b[0];
                        if (!articleMenu) return [3 /*break*/, 3];
                        return [4 /*yield*/, context.select('articleMenu', {
                                data: {
                                    id: 1,
                                    name: 1,
                                    parentId: 1,
                                },
                                filter: {
                                    name: data.name,
                                    parentId: articleMenu.parentId
                                        ? articleMenu.parentId
                                        : {
                                            $exists: false,
                                        },
                                    id: {
                                        $ne: articleMenu.id
                                    }
                                },
                            }, {})];
                    case 2:
                        _c = tslib_1.__read.apply(void 0, [_d.sent(), 1]), articleMenu2 = _c[0];
                        if (articleMenu2) {
                            throw new types_1.OakPreConditionUnsetException("\u7236\u5206\u7C7B\u7684\u540C\u4E00\u5B50\u96C6\u4E2D\u5B58\u5728\u540C\u540D\u5206\u7C7B\u3010".concat(data.name, "\u3011\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165"));
                        }
                        _d.label = 3;
                    case 3: return [2 /*return*/, 1];
                }
            });
        }); },
    },
];
exports.default = triggers;
