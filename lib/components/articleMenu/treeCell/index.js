"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
exports.default = OakComponent({
    entity: 'articleMenu',
    isList: false,
    projection: {
        id: 1,
        name: 1,
        entity: 1,
        entityId: 1,
        parentId: 1,
        isArticle: 1,
        articleMenu$parent: {
            $entity: 'articleMenu',
            data: {
                id: 1,
            },
            indexFrom: 0,
            count: 1,
        },
        article$articleMenu: {
            $entity: 'article',
            data: {
                id: 1,
            },
            indexFrom: 0,
            count: 1,
        },
    },
    properties: {
        onRemove: function () { return undefined; },
        onUpdateName: function (name) { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, undefined];
        }); }); },
    },
    formData: function (_a) {
        var row = _a.data;
        var _b = row || {}, articleMenu$parent = _b.articleMenu$parent, article$articleMenu = _b.article$articleMenu;
        var allowCreateSubMenu = article$articleMenu && article$articleMenu.length === 0;
        var allowCreateSubArticle = articleMenu$parent && articleMenu$parent.length === 0;
        var allowRemove = allowCreateSubMenu && allowCreateSubArticle;
        return {
            row: row,
            allowCreateSubMenu: allowCreateSubMenu,
            allowCreateSubArticle: allowCreateSubArticle,
            allowRemove: allowRemove,
        };
    },
    methods: {
        createSubArticle: function (name) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a;
                var _b, _c, _d;
                return tslib_1.__generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _a = this.update;
                            _b = {};
                            _c = {};
                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 1:
                            _c.id = _e.sent(),
                                _c.action = 'create';
                            _d = {};
                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 2:
                            _a.apply(this, [(_b.article$articleMenu = [(_c.data = (_d.id = _e.sent(),
                                        _d.name = name,
                                        _d.content = '',
                                        _d),
                                        _c)],
                                    _b)]);
                            return [4 /*yield*/, this.execute()];
                        case 3:
                            _e.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        createSubArticleMenu: function (name) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var row, _a;
                var _b, _c, _d;
                return tslib_1.__generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            row = this.state.row;
                            _a = this.update;
                            _b = {};
                            _c = {};
                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 1:
                            _c.id = _e.sent(),
                                _c.action = 'create';
                            _d = {};
                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 2:
                            _a.apply(this, [(_b.articleMenu$parent = [
                                    (_c.data = (_d.id = _e.sent(),
                                        _d.name = name,
                                        _d.entity = row.entity,
                                        _d.entityId = row.entityId,
                                        _d.isArticle = false,
                                        _d.isLeaf = false,
                                        _d),
                                        _c)
                                ],
                                    _b)]);
                            return [4 /*yield*/, this.execute()];
                        case 3:
                            _e.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
    }
});
