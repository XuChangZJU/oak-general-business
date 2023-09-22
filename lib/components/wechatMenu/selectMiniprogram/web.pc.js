"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { getMenuContent, changeOpen } = props.data;
    const { setMessage } = props.methods;
    const [appid, setAppid] = (0, react_1.useState)('');
    const [url, setUrl] = (0, react_1.useState)('');
    const [pagepath, setPagepath] = (0, react_1.useState)('');
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { required: true, label: 'appid', labelAlign: 'right', labelCol: { span: 6 }, children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: '\u5C0F\u7A0B\u5E8F\u7684appid', onChange: (val) => {
                        setAppid(val.target.value);
                    }, value: appid }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { required: true, label: 'url', labelAlign: 'right', labelCol: { span: 6 }, children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: '\u5C0F\u7A0B\u5E8F\u7684\u7F51\u9875\u94FE\u63A5', onChange: (val) => {
                        setUrl(val.target.value);
                    }, value: url }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { required: true, label: 'pagepath', labelAlign: 'right', labelCol: { span: 6 }, children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: '\u5C0F\u7A0B\u5E8F\u7684\u9875\u9762\u8DEF\u5F84', onChange: (val) => {
                        setPagepath(val.target.value);
                    }, value: pagepath }) }), (0, jsx_runtime_1.jsxs)(antd_1.Space, { style: { display: 'flex', justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'primary', onClick: () => {
                            if (!appid) {
                                setMessage({
                                    type: 'warning',
                                    content: '请输入小程序appid'
                                });
                                return;
                            }
                            if (!url) {
                                setMessage({
                                    type: 'warning',
                                    content: '请输入小程序网页链接'
                                });
                                return;
                            }
                            if (!pagepath) {
                                setMessage({
                                    type: 'warning',
                                    content: '请输入小程序页面路径'
                                });
                                return;
                            }
                            getMenuContent({ appid, url, pagepath });
                            setAppid('');
                            setPagepath('');
                            setUrl('');
                            changeOpen(false);
                        }, children: "\u786E\u5B9A" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => {
                            changeOpen(false);
                        }, children: "\u53D6\u6D88" })] })] }));
}
exports.default = Render;
