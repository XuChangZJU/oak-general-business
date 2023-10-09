"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
function Render(props) {
    const { name, description, type, typeArr, $$createAt$$, } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u540D\u79F0", required: true, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: (e) => {
                            update({
                                name: e.target.value,
                            });
                        }, value: name }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u63CF\u8FF0", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input.TextArea, { onChange: (e) => {
                            update({
                                description: e.target.value,
                            });
                        }, value: description }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u5E94\u7528\u7C7B\u578B", required: true, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Select, { value: type, style: { width: 120 }, disabled: $$createAt$$ > 1, options: typeArr.map((ele) => ({
                            label: t(`application:v.type.${ele.value}`),
                            value: ele.value,
                        })), onChange: (value) => {
                            update({
                                type: value,
                            });
                        } }) }) })] }));
}
exports.default = Render;
