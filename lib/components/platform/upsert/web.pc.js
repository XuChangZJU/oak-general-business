"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
function Render(props) {
    const { name, description, style } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, labelCol: { span: 4 }, wrapperCol: { span: 16 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u540D\u79F0", required: true, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: (e) => {
                            update({
                                name: e.target.value,
                            });
                        }, value: name }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u63CF\u8FF0", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input.TextArea, { onChange: (e) => {
                            update({
                                description: e.target.value,
                            });
                        }, value: description }) }) })] }));
}
exports.default = Render;
