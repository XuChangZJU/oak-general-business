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
                    $in: ['logo'],
                },
            },
        },
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
                name: 1,
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
        onChildEditArticleChange: function (data) { return undefined; },
        show: '',
        getBreadcrumbItemsByParent: function (breadcrumbItems) { return undefined; },
        breadItems: [],
        drawerOpen: false,
        changeDrawerOpen: function (open) { return undefined; },
        selectedArticleId: '',
        openArray: [],
        getTopInfo: function (data) { return undefined; },
    },
    formData: function (_a) {
        var _b;
        var row = _a.data;
        var _c = row || {}, articleMenu$parent = _c.articleMenu$parent, article$articleMenu = _c.article$articleMenu;
        var allowCreateSubMenu = article$articleMenu && article$articleMenu.length === 0;
        var allowCreateSubArticle = articleMenu$parent && articleMenu$parent.length === 0;
        var allowRemove = allowCreateSubMenu && allowCreateSubArticle;
        var logo = this.features.extraFile.getUrl((_b = row === null || row === void 0 ? void 0 : row.extraFile$entity) === null || _b === void 0 ? void 0 : _b.find(function (ele) { return ele.tag1 === 'logo'; }));
        return {
            row: row,
            allowCreateSubMenu: allowCreateSubMenu,
            allowCreateSubArticle: allowCreateSubArticle,
            allowRemove: allowRemove,
            logo: logo,
            article$articleMenu: article$articleMenu,
        };
    },
    data: {
        editArticle: '',
    },
    methods: {
        createSubArticle: function (name) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var id;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 1:
                            id = _a.sent();
                            this.setState({
                                editArticle: '',
                            });
                            this.update({
                                article$articleMenu: [{
                                        id: id,
                                        action: 'create',
                                        data: {
                                            id: id,
                                            name: name,
                                            content: '',
                                        }
                                    }]
                            });
                            return [4 /*yield*/, this.execute()];
                        case 2:
                            _a.sent();
                            this.setState({
                                editArticle: id
                            });
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
        },
        gotoDoc: function (articleMenuId) {
            window.open("/article/doc?articleMenuId=".concat(articleMenuId));
        }
    }
});
