"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("oak-domain/lib/types");
exports.default = OakComponent({
    entity: 'article',
    projection: {
        id: 1,
        iState: 1,
        title: 1,
        author: 1,
        abstract: 1,
        content: 1,
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
                    }];
            });
        });
    },
    data: {
        editor: null,
        html: '',
        origin: 'qiniu',
        contentTip: false,
    },
    observers: {
        'editor,content': function (editor, content) {
            if (editor && content) {
                editor.setHtml(content);
                this.setHtml(content);
            }
        },
    },
    lifetimes: {
        detached: function () {
            var editor = this.state.editor;
            if (editor == null)
                return;
            editor.destroy();
            this.setEditor(null);
        }
    },
    methods: {
        addExtraFile: function (extraFile) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var result, _a, _b, _c, error_1;
                var _d;
                return tslib_1.__generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _e.trys.push([0, 3, , 4]);
                            _b = (_a = this.features.cache).operate;
                            _c = ['extraFile'];
                            _d = {
                                action: 'create',
                                data: extraFile
                            };
                            return [4 /*yield*/, generateNewId()];
                        case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([(_d.id = _e.sent(),
                                    _d)]))];
                        case 2:
                            result = _e.sent();
                            return [2 /*return*/, result];
                        case 3:
                            error_1 = _e.sent();
                            if (error_1.constructor.name ===
                                types_1.OakUnloggedInException.name) {
                                this.navigateTo({
                                    url: '/login',
                                }, undefined, true);
                                return [2 /*return*/];
                            }
                            throw error_1;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        setEditor: function (editor) {
            this.setState({
                editor: editor,
            });
        },
        setHtml: function (html) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.setState({
                                html: html,
                            });
                            if (!(html && html !== '<p><br></p>')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.setUpdateData('content', html)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        },
        confirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var content;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            content = this.state.content;
                            if (!content || content === '<p><br></p>') {
                                this.setState({
                                    contentTip: true,
                                });
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            if (this.props.oakFrom === 'article:list') {
                                this.navigateBack();
                                return [2 /*return*/];
                            }
                            this.navigateBack();
                            return [2 /*return*/];
                    }
                });
            });
        },
        reset: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    // 重置
                    this.cleanOperation();
                    return [2 /*return*/];
                });
            });
        },
        preview: function () {
            var _a = this.state, html = _a.html, title = _a.title, author = _a.author;
            this.save('article_html', JSON.stringify({
                content: html,
                author: author,
                title: title,
            }));
            window.open('/article/preview');
        },
    },
});
