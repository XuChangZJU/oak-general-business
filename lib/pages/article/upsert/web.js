"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var react_1 = require("react");
var antd_1 = require("antd");
require("@wangeditor/editor/dist/css/style.css"); // 引入 css
var editor_for_react_1 = require("@wangeditor/editor-for-react");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var useFeatures_1 = tslib_1.__importDefault(require("../../../hooks/useFeatures"));
var icons_1 = require("@ant-design/icons");
// 工具栏配置
var toolbarConfig = {
    excludeKeys: ["fullScreen"],
}; // TS 语法
// 自定义校验图片
function customCheckImageFn(src, alt, url) {
    // TS 语法
    if (!src) {
        return;
    }
    if (src.indexOf("http") !== 0) {
        return "图片网址必须以 http/https 开头";
    }
    return true;
    // 返回值有三种选择：
    // 1. 返回 true ，说明检查通过，编辑器将正常插入图片
    // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
    // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
}
function Render(props) {
    var method = props.methods, data = props.data;
    var t = method.t, setEditor = method.setEditor, check = method.check, preview = method.preview, addExtraFile = method.addExtraFile, uploadFile = method.uploadFile, update = method.update, setHtml = method.setHtml, onRemoveArticle = method.onRemoveArticle, gotoPreview = method.gotoPreview;
    var id = data.id, content = data.content, editor = data.editor, origin1 = data.origin1, oakFullpath = data.oakFullpath, html = data.html;
    var features = (0, useFeatures_1.default)();
    var _a = tslib_1.__read((0, react_1.useState)(""), 2), articleId = _a[0], setArticleId = _a[1];
    (0, react_1.useEffect)(function () {
        if (id) {
            setArticleId(id);
        }
    }, [id]);
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: true, title: "\u6DFB\u52A0\u6587\u7AE0" }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Affix, tslib_1.__assign({ offsetTop: 64 }, { children: (0, jsx_runtime_1.jsx)(editor_for_react_1.Toolbar, { editor: editor, defaultConfig: toolbarConfig, mode: "default" }) })), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { flex: 4 }), (0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ flex: 16 }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.content }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.editorContainer }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.titleContainer }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: function (e) { return update({ name: e.target.value }); }, value: data.name, placeholder: "请输入文章标题", size: "large", maxLength: 64, suffix: "".concat(tslib_1.__spreadArray([], tslib_1.__read((data.name || "")), false).length, "/64"), className: web_module_less_1.default.titleInput }) })), data.contentTip && ((0, jsx_runtime_1.jsx)(antd_1.Alert, { type: "info", message: t("tips.content"), closable: true, onClose: function () { return method.clearContentTip(); } })), (0, jsx_runtime_1.jsx)(editor_for_react_1.Editor, { defaultConfig: {
                                                placeholder: "请输入文章内容...",
                                                MENU_CONF: {
                                                    checkImage: customCheckImageFn,
                                                    uploadImage: {
                                                        // 自定义上传
                                                        customUpload: function (file, insertFn) {
                                                            return tslib_1.__awaiter(this, void 0, void 0, function () {
                                                                var name, size, type, extension, filename, extraFile, _a, url, bucket, err_1;
                                                                return tslib_1.__generator(this, function (_b) {
                                                                    switch (_b.label) {
                                                                        case 0:
                                                                            name = file.name, size = file.size, type = file.type;
                                                                            extension = name.substring(name.lastIndexOf(".") + 1);
                                                                            filename = name.substring(0, name.lastIndexOf("."));
                                                                            extraFile = {
                                                                                entity: "article",
                                                                                entityId: articleId,
                                                                                extra1: file,
                                                                                origin: origin1,
                                                                                type: "image",
                                                                                tag1: "source",
                                                                                objectId: (0, uuid_1.generateNewId)(),
                                                                                filename: filename,
                                                                                size: size,
                                                                                extension: extension,
                                                                                bucket: "",
                                                                                id: (0, uuid_1.generateNewId)(),
                                                                            };
                                                                            _b.label = 1;
                                                                        case 1:
                                                                            _b.trys.push([1, 4, , 5]);
                                                                            return [4 /*yield*/, features.extraFile.upload(extraFile)];
                                                                        case 2:
                                                                            _a = _b.sent(), url = _a.url, bucket = _a.bucket;
                                                                            extraFile.bucket = bucket;
                                                                            extraFile.extra1 = null;
                                                                            return [4 /*yield*/, addExtraFile(extraFile)];
                                                                        case 3:
                                                                            _b.sent();
                                                                            // 最后插入图片
                                                                            insertFn("http://" + url, extraFile.filename);
                                                                            return [3 /*break*/, 5];
                                                                        case 4:
                                                                            err_1 = _b.sent();
                                                                            console.log(err_1);
                                                                            return [3 /*break*/, 5];
                                                                        case 5: return [2 /*return*/];
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
                                                                return tslib_1.__generator(this, function (_b) {
                                                                    switch (_b.label) {
                                                                        case 0:
                                                                            name = file.name, size = file.size, type = file.type;
                                                                            extension = name.substring(name.lastIndexOf(".") + 1);
                                                                            filename = name.substring(0, name.lastIndexOf("."));
                                                                            extraFile = {
                                                                                entity: "article",
                                                                                entityId: articleId,
                                                                                extra1: file,
                                                                                origin: origin1,
                                                                                type: "video",
                                                                                tag1: "source",
                                                                                objectId: (0, uuid_1.generateNewId)(),
                                                                                filename: filename,
                                                                                size: size,
                                                                                extension: extension,
                                                                                bucket: "",
                                                                                id: (0, uuid_1.generateNewId)(),
                                                                            };
                                                                            _b.label = 1;
                                                                        case 1:
                                                                            _b.trys.push([1, 4, , 5]);
                                                                            return [4 /*yield*/, features.extraFile.upload(extraFile)];
                                                                        case 2:
                                                                            _a = _b.sent(), url = _a.url, bucket = _a.bucket;
                                                                            extraFile.bucket = bucket;
                                                                            extraFile.extra1 = null;
                                                                            return [4 /*yield*/, addExtraFile(extraFile)];
                                                                        case 3:
                                                                            _b.sent();
                                                                            // 最后插入图片
                                                                            insertFn("http://" + url, "http://" + url + "?vframe/jpg/offset/0");
                                                                            return [3 /*break*/, 5];
                                                                        case 4:
                                                                            err_2 = _b.sent();
                                                                            return [3 /*break*/, 5];
                                                                        case 5: return [2 /*return*/];
                                                                    }
                                                                });
                                                            });
                                                        },
                                                    },
                                                },
                                            }, value: html, onCreated: setEditor, onChange: function (editorDom) {
                                                setHtml(editorDom.getHtml());
                                            }, style: {
                                                minHeight: 440,
                                            }, mode: "default" }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.footer }, { children: (0, jsx_runtime_1.jsx)(antd_1.Row, tslib_1.__assign({ align: "middle" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ flex: "none" }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                                                                    check();
                                                                } }, { children: "\u4FDD\u5B58" })), (0, jsx_runtime_1.jsxs)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                                                    gotoPreview(content, data.name);
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(icons_1.EyeOutlined, {}), "\u9884\u89C8"] }))] }) })) })) }))] })) })) })), (0, jsx_runtime_1.jsx)(antd_1.Col, { flex: 4 })] })] })) })));
}
exports.default = Render;
