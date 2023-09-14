"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var style_1 = tslib_1.__importDefault(require("../../../components/config/style"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var _a = props.data, name = _a.name, description = _a.description, type = _a.type, typeArr = _a.typeArr, variant = _a.variant, _b = _a.showBack, showBack = _b === void 0 ? true : _b, systemId = _a.systemId, oakId = _a.oakId, style = _a.style;
    var _c = props.methods, t = _c.t, update = _c.update, navigateBack = _c.navigateBack, confirm = _c.confirm;
    return ((0, jsx_runtime_1.jsx)(Container, { variant: variant, showBack: showBack, children: (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 12, children: (0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u540D\u79F0", required: true, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: function (e) {
                                        update({
                                            name: e.target.value,
                                        });
                                    }, value: name }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u63CF\u8FF0", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input.TextArea, { onChange: function (e) {
                                        update({
                                            description: e.target.value,
                                        });
                                    }, value: description }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u5E94\u7528\u7C7B\u578B", required: true, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Select, { value: type, style: { width: 120 }, disabled: !!oakId, options: typeArr.map(function (ele) { return ({
                                        label: t("application:v.type.".concat(ele.value)),
                                        value: ele.value,
                                    }); }), onChange: function (value) {
                                        update({
                                            type: value,
                                        });
                                    } }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u6837\u5F0F", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(style_1.default, { onChange: function (value) {
                                        update({
                                            style: value,
                                        });
                                    }, value: style }) }) }), (0, jsx_runtime_1.jsx)(Action, { variant: variant, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: { offset: 6 }, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () {
                                                confirm();
                                            }, children: "\u786E\u5B9A" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: function () {
                                                navigateBack();
                                            }, children: "\u8FD4\u56DE" })] }) }) })] }) }) }) }));
}
exports.default = Render;
function Action(props) {
    var children = props.children, variant = props.variant;
    if (variant === 'dialog') {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }));
}
function Container(props) {
    var children = props.children, variant = props.variant, showBack = props.showBack;
    if (variant === 'inline' || variant === 'dialog') {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    }
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { showBack: showBack, title: "\u5E94\u7528\u7F16\u8F91", children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: children }) }));
}
