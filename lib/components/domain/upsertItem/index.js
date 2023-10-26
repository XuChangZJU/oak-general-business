"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
function Render(props) {
    const { update, data } = props;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u8BBF\u95EE\u57DF\u540D", required: true, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8F93\u5165\u57DF\u540D\uFF0C\u4F8B\u5982\uFF1Awww.abc.com", onChange: (e) => {
                            update('url', e.target.value);
                        }, value: data.url }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u8BF7\u6C42\u8DEF\u5F84", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: (e) => {
                            update('apiPath', e.target.value);
                        }, value: data.apiPath || undefined }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u7AEF\u53E3", required: true, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: (e) => {
                            const v = e.target.value;
                            update('port', v ? Number(v) : undefined);
                        }, value: data.port }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item
            //name="protocol"
            , { 
                //name="protocol"
                required: true, label: "\u534F\u8BAE", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Select
                    // mode="multiple"
                    , { 
                        // mode="multiple"
                        allowClear: true, style: { width: '100%' }, placeholder: "\u8BF7\u9009\u62E9\u534F\u8BAE", value: data.protocol, onChange: (value) => {
                            update('protocol', value);
                        }, options: [
                            {
                                label: 'http',
                                value: 'http',
                            },
                            {
                                label: 'https',
                                value: 'https',
                            },
                        ] }) }) })] }));
}
exports.default = Render;
