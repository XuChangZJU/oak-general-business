"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var confirm = antd_1.Modal.confirm;
require("@wangeditor/editor/dist/css/style.css"); // 引入 css
var editor_for_react_1 = require("@wangeditor/editor-for-react");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var method = props.methods, data = props.data;
    var _a = props.data, content = _a.content, articleId = _a.articleId;
    var t = method.t, onRemoveArticle = method.onRemoveArticle, gotoArticleEdit = method.gotoArticleEdit;
    var editorConfig = {
        readOnly: true,
        autoFocus: true,
        scroll: false,
    };
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.rightContainer }, { children: (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ xs: 24, sm: 16 }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 4 }, wrapperCol: { span: 20 } }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(editor_for_react_1.Editor, { defaultConfig: editorConfig, value: content, mode: "default", style: {
                                        width: 750
                                    } }) }) }) }) })) })) }) })));
}
exports.default = Render;
