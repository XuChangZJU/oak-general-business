"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var style_1 = tslib_1.__importDefault(require("../../../components/config/style"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var _a = props.data, name = _a.name, description = _a.description, style = _a.style;
    var _b = props.methods, t = _b.t, update = _b.update, navigateBack = _b.navigateBack, confirm = _b.confirm;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { showBack: true, title: "\u5E73\u53F0\u7F16\u8F91", children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 12, children: (0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, labelCol: { span: 4 }, wrapperCol: { span: 16 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u540D\u79F0", required: true, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: function (e) {
                                            update({
                                                name: e.target.value,
                                            });
                                        }, value: name }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u63CF\u8FF0", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input.TextArea, { onChange: function (e) {
                                            update({
                                                description: e.target.value,
                                            });
                                        }, value: description }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u6837\u5F0F", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(style_1.default, { onChange: function (value) {
                                            update({
                                                style: value,
                                            });
                                        }, value: style }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: { offset: 4 }, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () {
                                                confirm();
                                            }, children: "\u786E\u5B9A" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: function () {
                                                navigateBack();
                                            }, children: "\u8FD4\u56DE" })] }) })] }) }) }) }) }));
}
exports.default = Render;
