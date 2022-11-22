"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
exports.default = OakComponent({
    entity: 'article',
    projection: {
        id: 1,
        iState: 1,
        title: 1,
        author: 1,
        abstract: 1,
        content: 1,
        entity: 1,
        entityId: 1,
    },
    isList: false,
    formData: function (_a) {
        var article = _a.data, features = _a.features;
        return {
            id: article === null || article === void 0 ? void 0 : article.id,
            iState: article === null || article === void 0 ? void 0 : article.iState,
            title: article === null || article === void 0 ? void 0 : article.title,
            abstract: article === null || article === void 0 ? void 0 : article.abstract,
            author: article === null || article === void 0 ? void 0 : article.author,
            content: article === null || article === void 0 ? void 0 : article.content,
        };
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
                // this.setHtml(content);
            }
        },
    },
    lifetimes: {
        ready: function () {
            var _a = this.props, entityId = _a.entityId, entity = _a.entity, oakId = _a.oakId;
            if (!oakId) {
                this.update({
                    entityId: entityId,
                    entity: entity,
                });
            }
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
                var result, error_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.features.cache.operate('extraFile', {
                                    action: 'create',
                                    data: extraFile,
                                    id: (0, uuid_1.generateNewId)(),
                                })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                        case 2:
                            error_1 = _a.sent();
                            // if (
                            //     (<OakException>error).constructor.name ===
                            //     OakUnloggedInException.name
                            // ) {
                            //     this.navigateTo(
                            //         {
                            //             url: '/login',
                            //         },
                            //         undefined,
                            //         true
                            //     );
                            //     return;
                            // }
                            throw error_1;
                        case 3: return [2 /*return*/];
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
        confirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
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
                    this.clean();
                    return [2 /*return*/];
                });
            });
        },
        setHtml: function (content) {
            this.update({ content: content });
            this.setState({ html: content });
        },
        preview: function (data) {
            var html = data.html, title = data.title, author = data.author;
            this.save('article_html', JSON.stringify({
                content: html,
                author: author,
                title: title,
            }));
            window.open('/article/preview');
        },
    },
});
