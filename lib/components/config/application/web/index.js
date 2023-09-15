"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Web(props) {
    const { config, setValue } = props;
    const [messageApi] = antd_1.message.useMessage();
    return ((0, jsx_runtime_1.jsxs)(antd_1.Space, { direction: "vertical", size: "middle", style: { display: 'flex' }, children: [(0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Card, { className: web_module_less_1.default.tips, children: "\u6BCF\u79CD\u5747\u53EF\u914D\u7F6E\u4E00\u4E2A\uFF0C\u76F8\u5E94\u7684\u670D\u52A1\u6240\u4F7F\u7528\u7684\u5E10\u53F7\u8BF7\u51C6\u786E\u5BF9\u5E94" }) }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { flex: "auto", children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, { orientation: "left", className: web_module_less_1.default.title, children: "\u7F51\u7AD9-\u5FAE\u4FE1\u626B\u7801" }), (0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "appId", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165appId", type: "text", value: config?.wechat?.appId, onChange: (e) => setValue(`wechat.appId`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "appSecret", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165appSecret", type: "text", value: config?.wechat?.appSecret, onChange: (e) => setValue(`wechat.appSecret`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u6388\u6743\u56DE\u8C03\u57DF", 
                                //name="domain"
                                tooltip: "\u6388\u6743\u56DE\u8C03\u57DF\u53EF\u9009\u586B\uFF0C\u672A\u586B\u5199\u7684\u8BDD\uFF0C\u4F7F\u7528\u7F51\u9875\u8BBF\u95EE\u7684\u57DF\u540D\u5F53\u4F5C\u6388\u6743\u56DE\u8C03\u57DF", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u6388\u6743\u56DE\u8C03\u57DF", type: "text", value: config?.wechat?.domain, onChange: (e) => setValue(`wechat.domain`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u5FAE\u4FE1\u7F51\u7AD9\u5E94\u7528\u6388\u6743\u767B\u5F55", 
                                // name="enable"
                                tooltip: "\u5F00\u542F\u540E\uFF0C\u767B\u5F55\u9875\u663E\u793A\u5FAE\u4FE1\u626B\u7801\u5165\u53E3\uFF0C\u5FAE\u4FE1\u626B\u7801\u540E\u4F7F\u7528\u5FAE\u4FE1\u7F51\u7AD9\u5E94\u7528\u6388\u6743\u767B\u5F55", help: "\u5F00\u542F\u5F53\u524D\u767B\u5F55\u65B9\u5F0F\u65F6\uFF0C\u5C06\u540C\u65F6\u5173\u95ED\u5FAE\u4FE1\u516C\u4F17\u53F7\u626B\u7801\u767B\u5F55", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: "\u662F", unCheckedChildren: "\u5426", checked: config?.wechat?.enable, onChange: (checked) => setValue(`wechat.enable`, checked) }) }) })] })] }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { flex: "auto", children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, { orientation: "left", className: web_module_less_1.default.title, children: "\u7F51\u7AD9-\u6388\u6743\u65B9\u5F0F" }), (0, jsx_runtime_1.jsx)(antd_1.Form, { colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "passport", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Select, { mode: "multiple", allowClear: true, style: { width: '100%' }, placeholder: "\u8BF7\u9009\u62E9\u6388\u6743\u65B9\u5F0F", value: config?.passport, onChange: (value) => {
                                        if (value.includes('wechat') && value.includes('wechatPublic')) {
                                            antd_1.message.warning('微信网站和微信公众号中，只能选择一个');
                                            return;
                                        }
                                        setValue(`passport`, value);
                                    }, options: [
                                        {
                                            label: '邮箱',
                                            value: 'email',
                                        },
                                        {
                                            label: '手机号',
                                            value: 'mobile',
                                        },
                                        {
                                            label: '微信网站',
                                            value: 'wechat',
                                        },
                                        {
                                            label: '微信公众号',
                                            value: 'wechatPublic',
                                        },
                                    ] }) }) }) })] })] }));
}
exports.default = Web;
