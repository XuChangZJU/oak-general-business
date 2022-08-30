"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("oak-domain/lib/types");
exports.default = OakPage({
    path: 'article:upsert',
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
    methods: {
        onUnload: function () {
            var editor = this.state.editor;
            if (editor == null)
                return;
            editor.destroy();
            this.setEditor(null);
        },
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
                                });
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
            this.setState({
                html: html,
            });
            if (html && html !== '<p><br></p>') {
                this.state.oakFullpath && this.setUpdateData('content', html);
            }
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
                            return [4 /*yield*/, this.execute(this.props.oakId ? 'update' : 'create')];
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
                    this.resetUpdateData();
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
