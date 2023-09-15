"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
const style_1 = tslib_1.__importDefault(require("../../../components/config/style"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { name, description, type, typeArr, variant, showBack = true, systemId, oakId, style, } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;
    return ((0, jsx_runtime_1.jsx)(Container, { variant: variant, showBack: showBack, children: (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 12, children: (0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u540D\u79F0", required: true, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: (e) => {
                                        update({
                                            name: e.target.value,
                                        });
                                    }, value: name }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u63CF\u8FF0", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input.TextArea, { onChange: (e) => {
                                        update({
                                            description: e.target.value,
                                        });
                                    }, value: description }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u5E94\u7528\u7C7B\u578B", required: true, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Select, { value: type, style: { width: 120 }, disabled: !!oakId, options: typeArr.map((ele) => ({
                                        label: t(`application:v.type.${ele.value}`),
                                        value: ele.value,
                                    })), onChange: (value) => {
                                        update({
                                            type: value,
                                        });
                                    } }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u6837\u5F0F", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(style_1.default, { onChange: (value) => {
                                        update({
                                            style: value,
                                        });
                                    }, value: style }) }) }), (0, jsx_runtime_1.jsx)(Action, { variant: variant, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: { offset: 6 }, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => {
                                                confirm();
                                            }, children: "\u786E\u5B9A" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => {
                                                navigateBack();
                                            }, children: "\u8FD4\u56DE" })] }) }) })] }) }) }) }));
}
exports.default = Render;
function Action(props) {
    const { children, variant } = props;
    if (variant === 'dialog') {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }));
}
function Container(props) {
    const { children, variant, showBack } = props;
    if (variant === 'inline' || variant === 'dialog') {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    }
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { showBack: showBack, title: "\u5E94\u7528\u7F16\u8F91", children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: children }) }));
}
