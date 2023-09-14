"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var _a = props.data, systemId = _a.systemId, url = _a.url, apiPath = _a.apiPath, port = _a.port, protocol = _a.protocol, variant = _a.variant, _b = _a.showBack, showBack = _b === void 0 ? true : _b;
    var _c = props.methods, t = _c.t, update = _c.update, navigateBack = _c.navigateBack, confirm = _c.confirm;
    return ((0, jsx_runtime_1.jsx)(Container, { variant: variant, showBack: showBack, children: (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 12, children: (0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u8BBF\u95EE\u57DF\u540D", required: true, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8F93\u5165\u57DF\u540D\uFF0C\u4F8B\u5982\uFF1Awww.abc.com", onChange: function (e) {
                                        update({
                                            url: e.target.value,
                                        });
                                    }, value: url }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u8BF7\u6C42\u8DEF\u5F84", required: true, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: function (e) {
                                        update({
                                            apiPath: e.target.value,
                                        });
                                    }, value: apiPath }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u7AEF\u53E3", required: true, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: function (e) {
                                        var v = e.target.value;
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
                                    allowClear: true, style: { width: '100%' }, placeholder: "\u8BF7\u9009\u62E9\u534F\u8BAE", value: protocol, onChange: function (value) {
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
                                    ] }) }) }), (0, jsx_runtime_1.jsx)(Action, { variant: variant, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: { offset: 6 }, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () {
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
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { showBack: showBack, title: "\u7CFB\u7EDF\u7F16\u8F91", children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: children }) }));
}
