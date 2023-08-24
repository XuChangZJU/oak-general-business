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
    },
    isList: false,
    formData: function (_a) {
        var article = _a.data, features = _a.features;
        return {
            id: article === null || article === void 0 ? void 0 : article.id,
            content: article === null || article === void 0 ? void 0 : article.content,
            name: article === null || article === void 0 ? void 0 : article.name,
            articleMenuId: article === null || article === void 0 ? void 0 : article.articleMenuId,
        };
    },
    data: {
        editor: null,
        html: '',
        origin1: 'qiniu',
        contentTip: false,
    },
    properties: {
        articleMenuId: '',
        changeIsEdit: function () { return undefined; },
    },
    listeners: {
        'editor,content': function (prev, next) {
            if (next.editor && next.content) {
                next.editor.setHtml(next.content);
            }
        },
        oakId: function (prev, next) {
            if (prev.oakId !== next.oakId) {
                var editor = this.state.editor;
                if (editor == null)
                    return;
                editor.destroy();
                this.setEditor(null);
            }
        },
    },
    lifetimes: {
        ready: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, oakId, articleMenuId, editor;
                return tslib_1.__generator(this, function (_b) {
                    _a = this.props, oakId = _a.oakId, articleMenuId = _a.articleMenuId;
                    if (!oakId) {
                        if (articleMenuId) {
                            this.update({
                                articleMenuId: articleMenuId,
                            });
                            editor = this.state.editor;
                            editor === null || editor === void 0 ? void 0 : editor.setHtml('');
                            this.update({
                                content: '',
                            });
                        }
                    }
                    else {
                    }
                    return [2 /*return*/];
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
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var result;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.features.extraFile.upload(extraFile)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
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
                            if (!(this.state.name &&
                                this.state.name.length > 0 &&
                                this.state.content &&
                                this.state.content.length > 0 &&
                                this.state.html !== '<p><br></p>')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            if (this.props.changeIsEdit) {
                                this.props.changeIsEdit();
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            if (this.state.name && this.state.name.length > 0) {
                                this.setMessage({
                                    content: '请填写文章内容!',
                                    type: 'warning',
                                });
                            }
                            else if (this.state.content &&
                                this.state.content.length > 0 &&
                                this.state.html !== '<p><br></p>') {
                                this.setMessage({
                                    content: '请填写文章标题!',
                                    type: 'warning',
                                });
                            }
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
        setHtml: function (html) {
            this.setState({
                html: html,
            });
            if (html && html !== '<p><br></p>' && this.state.oakFullpath) {
                this.update({ content: html });
            }
        },
        preview: function () {
            var html = this.state.html;
            this.save('article_html', JSON.stringify({
                content: html,
            }));
            window.open('/article/preview');
        },
        gotoPreview: function (content, title) {
            this.save('article_html', JSON.stringify({
                content: content,
                title: title,
            }));
            window.open('/article/preview');
        },
    },
});
