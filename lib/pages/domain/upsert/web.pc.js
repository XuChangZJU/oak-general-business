"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { systemId, url, apiPath, port, protocol, variant, showBack = true, } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;
    return ((0, jsx_runtime_1.jsx)(Container, { variant: variant, showBack: showBack, children: (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 12, children: (0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u8BBF\u95EE\u57DF\u540D", required: true, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8F93\u5165\u57DF\u540D\uFF0C\u4F8B\u5982\uFF1Awww.abc.com", onChange: (e) => {
                                        update({
                                            url: e.target.value,
                                        });
                                    }, value: url }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u8BF7\u6C42\u8DEF\u5F84", required: true, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: (e) => {
                                        update({
                                            apiPath: e.target.value,
                                        });
                                    }, value: apiPath }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u7AEF\u53E3", required: true, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: (e) => {
                                        const v = e.target.value;
                                        update({
                                            port: v ? Number(v) : undefined,
                                        });
                                    }, value: port }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item
                        //name="protocol"
                        , { 
                            //name="protocol"
                            required: true, label: "\u534F\u8BAE", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Select
                                // mode="multiple"
                                , { 
                                    // mode="multiple"
                                    allowClear: true, style: { width: '100%' }, placeholder: "\u8BF7\u9009\u62E9\u534F\u8BAE", value: protocol, onChange: (value) => {
                                        update({
                                            protocol: value,
                                        });
                                    }, options: [
                                        {
                                            label: 'http',
                                            value: 'http',
                                        },
                                        {
                                            label: 'https',
                                            value: 'https',
                                        },
                                    ] }) }) }), (0, jsx_runtime_1.jsx)(Action, { variant: variant, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: { offset: 6 }, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => {
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
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { showBack: showBack, title: "\u7CFB\u7EDF\u7F16\u8F91", children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: children }) }));
}
