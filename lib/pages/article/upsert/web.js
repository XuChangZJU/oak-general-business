"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_react_1 = require("tdesign-react");
var gallery_1 = tslib_1.__importDefault(require("./../../../components/extraFile/gallery"));
require("@wangeditor/editor/dist/css/style.css"); // 引入 css
var editor_for_react_1 = require("@wangeditor/editor-for-react");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
// 工具栏配置
var toolbarConfig = {
    excludeKeys: ['fullScreen'],
}; // TS 语法
// 自定义校验图片
function customCheckImageFn(src, alt, url) {
    // TS 语法
    if (!src) {
        return;
    }
    if (src.indexOf('http') !== 0) {
        return '图片网址必须以 http/https 开头';
    }
    return true;
    // 返回值有三种选择：
    // 1. 返回 true ，说明检查通过，编辑器将正常插入图片
    // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
    // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
}
function render() {
    var _this = this;
    var _a = this, t = _a.t, features = _a.features, addExtraFile = _a.addExtraFile;
    var _b = this.state, editor = _b.editor, title = _b.title, author = _b.author, abstract = _b.abstract, content = _b.content, html = _b.html, origin = _b.origin, contentTip = _b.contentTip;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(editor_for_react_1.Toolbar, { editor: editor, defaultConfig: toolbarConfig, mode: "default" }), (0, jsx_runtime_1.jsxs)(tdesign_react_1.Row, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Col, { flex: 2 }), (0, jsx_runtime_1.jsx)(tdesign_react_1.Col, tslib_1.__assign({ flex: 8 }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.content }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.editorContainer }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.titleContainer }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Input, { onChange: function (value) {
                                                _this.setUpdateData('title', value);
                                            }, value: title, placeholder: t('placeholder.title'), size: "large", maxlength: 64, suffix: "".concat(tslib_1.__spreadArray([], tslib_1.__read((title || '')), false).length, "/64"), inputClass: [web_module_less_1.default.input, web_module_less_1.default.titleInput] }) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.authorContainer }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Input, { onChange: function (value) {
                                                _this.setUpdateData('author', value);
                                            }, value: author, placeholder: t('placeholder.author'), inputClass: [web_module_less_1.default.input] }) })), contentTip && ((0, jsx_runtime_1.jsx)(tdesign_react_1.Alert, { theme: "info", message: t('tips.content'), close: true, onClose: function () {
                                            _this.setState({
                                                contentTip: false,
                                            });
                                        } })), (0, jsx_runtime_1.jsx)(editor_for_react_1.Editor, { defaultConfig: {
                                            // TS 语法
                                            placeholder: t('placeholder.content'),
                                            MENU_CONF: {
                                                // fontSize: {
                                                //     fontSizeList: [
                                                //         '12px',
                                                //         '16px',
                                                //         '24px',
                                                //         '40px',
                                                //     ],
                                                // },
                                                checkImage: customCheckImageFn,
                                                uploadImage: {
                                                    // 自定义上传
                                                    customUpload: function (file, insertFn) {
                                                        return tslib_1.__awaiter(this, void 0, void 0, function () {
                                                            var name, size, type, extension, filename, extraFile, _a, url, bucket, err_1;
                                                            var _b;
                                                            return tslib_1.__generator(this, function (_c) {
                                                                switch (_c.label) {
                                                                    case 0:
                                                                        name = file.name, size = file.size, type = file.type;
                                                                        extension = name.substring(name.lastIndexOf('.') +
                                                                            1);
                                                                        filename = name.substring(0, name.lastIndexOf('.'));
                                                                        _b = {
                                                                            extra1: file,
                                                                            origin: origin,
                                                                            type: 'image',
                                                                            tag1: 'source'
                                                                        };
                                                                        return [4 /*yield*/, generateNewId()];
                                                                    case 1:
                                                                        _b.objectId = _c.sent(),
                                                                            _b.filename = filename,
                                                                            _b.size = size,
                                                                            _b.extension = extension,
                                                                            _b.bucket = '';
                                                                        return [4 /*yield*/, generateNewId()];
                                                                    case 2:
                                                                        extraFile = (_b.id = _c.sent(),
                                                                            _b);
                                                                        _c.label = 3;
                                                                    case 3:
                                                                        _c.trys.push([3, 6, , 7]);
                                                                        return [4 /*yield*/, features.extraFile.upload(extraFile)];
                                                                    case 4:
                                                                        _a = _c.sent(), url = _a.url, bucket = _a.bucket;
                                                                        extraFile.bucket = bucket;
                                                                        extraFile.extra1 = null;
                                                                        return [4 /*yield*/, addExtraFile(extraFile)];
                                                                    case 5:
                                                                        _c.sent();
                                                                        // 最后插入图片
                                                                        insertFn('http://' + url, extraFile.filename);
                                                                        return [3 /*break*/, 7];
                                                                    case 6:
                                                                        err_1 = _c.sent();
                                                                        return [3 /*break*/, 7];
                                                                    case 7: return [2 /*return*/];
                                                                }
                                                            });
                                                        });
                                                    },
                                                },
                                                uploadVideo: {
                                                    // 自定义上传
                                                    customUpload: function (file, insertFn) {
                                                        return tslib_1.__awaiter(this, void 0, void 0, function () {
                                                            var name, size, type, extension, filename, extraFile, _a, url, bucket, err_2;
                                                            var _b;
                                                            return tslib_1.__generator(this, function (_c) {
                                                                switch (_c.label) {
                                                                    case 0:
                                                                        name = file.name, size = file.size, type = file.type;
                                                                        extension = name.substring(name.lastIndexOf('.') +
                                                                            1);
                                                                        filename = name.substring(0, name.lastIndexOf('.'));
                                                                        _b = {
                                                                            extra1: file,
                                                                            origin: origin,
                                                                            type: 'video',
                                                                            tag1: 'source'
                                                                        };
                                                                        return [4 /*yield*/, generateNewId()];
                                                                    case 1:
                                                                        _b.objectId = _c.sent(),
                                                                            _b.filename = filename,
                                                                            _b.size = size,
                                                                            _b.extension = extension,
                                                                            _b.bucket = '';
                                                                        return [4 /*yield*/, generateNewId()];
                                                                    case 2:
                                                                        extraFile = (_b.id = _c.sent(),
                                                                            _b);
                                                                        _c.label = 3;
                                                                    case 3:
                                                                        _c.trys.push([3, 6, , 7]);
                                                                        return [4 /*yield*/, features.extraFile.upload(extraFile)];
                                                                    case 4:
                                                                        _a = _c.sent(), url = _a.url, bucket = _a.bucket;
                                                                        extraFile.bucket = bucket;
                                                                        extraFile.extra1 = null;
                                                                        return [4 /*yield*/, addExtraFile(extraFile)];
                                                                    case 5:
                                                                        _c.sent();
                                                                        // 最后插入图片
                                                                        insertFn('http://' + url, 'http://' +
                                                                            url +
                                                                            '?vframe/jpg/offset/0');
                                                                        return [3 /*break*/, 7];
                                                                    case 6:
                                                                        err_2 = _c.sent();
                                                                        return [3 /*break*/, 7];
                                                                    case 7: return [2 /*return*/];
                                                                }
                                                            });
                                                        });
                                                    },
                                                },
                                            },
                                        }, value: html, onCreated: this.setEditor, onChange: function (editor) {
                                            _this.setHtml(editor.getHtml());
                                        }, mode: "default", style: {
                                            minHeight: '520px',
                                            overflowY: 'hidden',
                                        } }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.abstract }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Card, tslib_1.__assign({ title: "\u5C01\u9762\u53CA\u6458\u8981", theme: "normal", bordered: false }, { children: (0, jsx_runtime_1.jsxs)(tdesign_react_1.Row, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Col, tslib_1.__assign({ flex: "none" }, { children: (0, jsx_runtime_1.jsx)(gallery_1.default, { maxNumber: 1, oakPath: "extraFile$entity", oakParent: this.state.oakFullpath, type: "image", origin: "qiniu", tag1: "cover", entity: "article" }) })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Col, tslib_1.__assign({ flex: "auto" }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Textarea, { autosize: {
                                                                minRows: 4,
                                                            }, maxlength: 120, placeholder: t('placeholder.abstract'), onChange: function (value) {
                                                                _this.setUpdateData('abstract', value);
                                                            }, value: abstract || '' }) }))] }) })) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.footer }, { children: (0, jsx_runtime_1.jsxs)(tdesign_react_1.Row, tslib_1.__assign({ align: "middle" }, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Col, tslib_1.__assign({ flex: "auto" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.contentNumber }, { children: (0, jsx_runtime_1.jsx)("span", { children: "\u6B63\u6587\u5B57\u6570 0" }) })) })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Col, tslib_1.__assign({ flex: "none" }, { children: (0, jsx_runtime_1.jsxs)(tdesign_react_1.Space, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "success", onClick: function () {
                                                                    _this.confirm();
                                                                } }, { children: "\u4FDD\u5B58" })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ variant: "outline", onClick: function () {
                                                                    _this.preview();
                                                                } }, { children: "\u9884\u89C8" }))] }) }))] })) }))] })) })) })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Col, { flex: 2 })] })] })));
}
exports.default = render;
