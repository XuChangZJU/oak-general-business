"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
function Render(props) {
    const { text, tagName, open, changeOpen, editTag, addTag, changeText, isUpdate, } = props.data;
    const { t, update, navigateBack } = props.methods;
    return ((0, jsx_runtime_1.jsx)(antd_1.Modal, { open: open, title: '\u5FAE\u4FE1\u516C\u4F17\u53F7\u6807\u7B7E\u4FE1\u606F', onCancel: () => changeOpen(false), footer: (0, jsx_runtime_1.jsxs)(antd_1.Space, { style: { display: 'flex', justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => changeOpen(false), children: "\u53D6\u6D88" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'primary', onClick: () => {
                        if (isUpdate) {
                            editTag();
                        }
                        else {
                            addTag();
                        }
                        changeOpen(false);
                    }, disabled: text !== tagName ? false : true, children: "\u786E\u5B9A" })] }), children: (0, jsx_runtime_1.jsx)(antd_1.Form, { colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 }, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "TAG\u540D\u79F0", required: true, rules: [
                    {
                        required: true,
                    },
                ], children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { value: text, onChange: (v) => changeText(v.target.value), placeholder: '\u6807\u7B7E\u540D\u79F0', maxLength: 30 }) }) }) }) }));
}
exports.default = Render;
