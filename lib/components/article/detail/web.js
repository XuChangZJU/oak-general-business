"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
require("@wangeditor/editor/dist/css/style.css"); // 引入 css
var editor_for_react_1 = require("@wangeditor/editor-for-react");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var icons_1 = require("@ant-design/icons");
var editorConfig = {
    readOnly: true,
    autoFocus: true,
    scroll: false,
};
function Render(props) {
    var methods = props.methods, data = props.data;
    var content = data.content, oakId = data.oakId, name = data.name;
    var t = methods.t, onRemoveArticle = methods.onRemoveArticle, gotoArticleEdit = methods.gotoArticleEdit, gotoPreview = methods.gotoPreview, copy = methods.copy;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { display: 'flex', justifyContent: 'flex-end' } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                copy(oakId);
                            } }, { children: "\u590D\u5236\u94FE\u63A5" })), (0, jsx_runtime_1.jsxs)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                gotoPreview(content, name, oakId);
                            } }, { children: [(0, jsx_runtime_1.jsx)(icons_1.EyeOutlined, {}), "\u67E5\u770B"] }))] }) })), (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 4 }, wrapperCol: { span: 20 } }, { children: [(0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: content ? ((0, jsx_runtime_1.jsx)(editor_for_react_1.Editor, { defaultConfig: editorConfig, value: content, mode: "default", style: {
                                        width: 750,
                                    } })) : null }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 4 } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                                        gotoArticleEdit(oakId);
                                    } }, { children: "\u7F16\u8F91" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                        var modal = antd_1.Modal.confirm({
                                            title: '确定删除该文章吗？',
                                            content: '删除后不可恢复',
                                            okText: '确定',
                                            cancelText: '取消',
                                            onOk: function (e) {
                                                onRemoveArticle();
                                                modal.destroy();
                                            },
                                        });
                                    } }, { children: "\u5220\u9664" }))] }) }))] }))] })));
}
exports.default = Render;
