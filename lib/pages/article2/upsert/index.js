"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
exports.default = OakComponent({
    entity: 'article',
    projection: {
        id: 1,
        name: 1,
        content: 1,
        articleMenu: {
            id: 1,
        },
        entity: 1,
        entityId: 1,
    },
    isList: false,
    formData: function (_a) {
        var article = _a.data, features = _a.features;
        console.log(article);
        return {
            id: article === null || article === void 0 ? void 0 : article.id,
            content: article === null || article === void 0 ? void 0 : article.content,
            name: article === null || article === void 0 ? void 0 : article.name,
            entity: article === null || article === void 0 ? void 0 : article.entity,
            entityId: article === null || article === void 0 ? void 0 : article.entityId,
        };
    },
    data: {
        editor: null,
        html: '',
        origin1: 'qiniu',
        contentTip: false,
    },
    listeners: {
        'editor,content': function (prev, next) {
            if (next.editor && next.content) {
                next.editor.setHtml(next.content);
            }
        },
    },
    lifetimes: {
        ready: function () {
            var _a, _b;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _c, oakId, articleMenuId, entity, article, _d, articleMenu;
                return tslib_1.__generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _c = this.props, oakId = _c.oakId, articleMenuId = _c.articleMenuId, entity = _c.entity;
                            if (!oakId) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.features.cache.refresh('article', {
                                    data: {
                                        id: 1,
                                        name: 1,
                                        content: 1,
                                        articleMenu: {
                                            id: 1,
                                            name: 1,
                                        },
                                        entity: 1,
                                        entityId: 1,
                                    },
                                    filter: {
                                        id: oakId
                                    },
                                })];
                        case 1:
                            article = (_e.sent()).data;
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.features.cache.refresh('articleMenu', {
                                data: {
                                    id: 1,
                                    name: 1,
                                    isArticle: 1,
                                    isLeaf: 1,
                                },
                                filter: {
                                    id: articleMenuId,
                                },
                            })];
                        case 3:
                            _d = tslib_1.__read.apply(void 0, [(_e.sent()).data, 1]), articleMenu = _d[0];
                            if (articleMenuId && !articleMenu.isArticle) {
                                this.update({
                                    entity: 'platformProvider',
                                    entityId: (_b = (_a = this.features.application.getApplication()) === null || _a === void 0 ? void 0 : _a.system.platform) === null || _b === void 0 ? void 0 : _b.entityId,
                                    articleMenuId: articleMenuId,
                                });
                            }
                            _e.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        detached: function () {
            var editor = this.state.editor;
            if (editor == null)
                return;
            editor.destroy();
            this.setEditor(null);
        },
    },
    methods: {
        onRemoveArticle: function (id) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log(id);
                            this.removeItem(id);
                            return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            this.navigateBack();
                            return [2 /*return*/];
                    }
                });
            });
        },
        addExtraFile: function (extraFile) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var result;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.features.cache.operate('extraFile', {
                                action: 'create',
                                data: extraFile,
                                id: (0, uuid_1.generateNewId)(),
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        },
        uploadFile: function (extraFile) {
            return this.features.extraFile.upload(extraFile);
        },
        setEditor: function (editor) {
            this.setState({
                editor: editor,
            });
        },
        clearContentTip: function () {
            this.setState({
                contentTip: false,
            });
        },
        check: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.state.name && this.state.name.length > 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            this.navigateBack();
                            return [3 /*break*/, 3];
                        case 2:
                            this.setMessage({
                                content: '请填写文章标题!',
                                type: 'warning',
                            });
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        reset: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    // 重置
                    this.clean();
                    return [2 /*return*/];
                });
            });
        },
        setHtml: function (content) {
            this.update({ content: content });
            this.setState({ html: content });
        },
        preview: function () {
            var html = this.state.html;
            this.save('article_html', JSON.stringify({
                content: html,
                // author,
                // title,
            }));
            window.open('/article2/preview');
        },
    },
});
