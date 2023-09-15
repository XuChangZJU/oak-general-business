"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function WechatPublic(props) {
    var _a, _b, _c, _d, _e, _f;
    var _g = tslib_1.__read((0, react_1.useState)(false), 2), open = _g[0], setModal = _g[1];
    var _h = tslib_1.__read((0, react_1.useState)(''), 2), messageType = _h[0], setMessageType = _h[1];
    var config = props.config, setValue = props.setValue, cleanKey = props.cleanKey, removeItem = props.removeItem, _j = props.isService, isService = _j === void 0 ? true : _j;
    var templateMsgs = (config === null || config === void 0 ? void 0 : config.templateMsgs) || {};
    return ((0, jsx_runtime_1.jsxs)(antd_1.Space, { direction: "vertical", size: "middle", style: { display: 'flex' }, children: [(0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Card, { className: web_module_less_1.default.tips, children: "\u6BCF\u79CD\u5747\u53EF\u914D\u7F6E\u4E00\u4E2A\uFF0C\u76F8\u5E94\u7684\u670D\u52A1\u6240\u4F7F\u7528\u7684\u5E10\u53F7\u8BF7\u51C6\u786E\u5BF9\u5E94" }) }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { flex: "auto", children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, { orientation: "left", className: web_module_less_1.default.title, children: "\u5FAE\u4FE1\u516C\u4F17\u53F7-\u57FA\u7840" }), (0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "appId", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165appId", type: "text", value: config === null || config === void 0 ? void 0 : config.appId, onChange: function (e) {
                                            return setValue("appId", e.target.value);
                                        } }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "appSecret", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165appSecret", type: "text", value: config === null || config === void 0 ? void 0 : config.appSecret, onChange: function (e) {
                                            return setValue("appSecret", e.target.value);
                                        } }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u539F\u59CBID", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u539F\u59CBID", type: "text", value: config === null || config === void 0 ? void 0 : config.originalId, onChange: function (e) {
                                            return setValue("originalId", e.target.value);
                                        } }) }) }), isService && ((0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u662F\u5426\u4E3A\u670D\u52A1\u53F7", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: "\u662F", unCheckedChildren: "\u5426", checked: config === null || config === void 0 ? void 0 : config.isService, onChange: function (checked) {
                                            return setValue("isService", checked);
                                        } }) }) }))] })] }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { flex: "auto", children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, { orientation: "left", className: web_module_less_1.default.title, children: "\u7F51\u7AD9-\u6388\u6743\u65B9\u5F0F" }), (0, jsx_runtime_1.jsx)(antd_1.Form, { colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "passport", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Select, { mode: "multiple", allowClear: true, style: { width: '100%' }, placeholder: "\u8BF7\u9009\u62E9\u6388\u6743\u65B9\u5F0F", value: config === null || config === void 0 ? void 0 : config.passport, onChange: function (value) {
                                        if (value.includes('wechat') && value.includes('wechatPublic')) {
                                            // messageApi.warning('微信网站和微信公众号中，只能选择一个');
                                            antd_1.message.warning('微信网站和微信公众号中，只能选择一个');
                                            return;
                                        }
                                        setValue("passport", value);
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
                                    ] }) }) }) })] }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { flex: "auto", children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, { orientation: "left", className: web_module_less_1.default.title, children: "\u5FAE\u4FE1\u516C\u4F17\u53F7-\u8DF3\u8F6C\u5C0F\u7A0B\u5E8F-\u5C0F\u7A0B\u5E8F\u914D\u7F6E" }), (0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "appId", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165appId", type: "text", value: (_a = config === null || config === void 0 ? void 0 : config.wechatMp) === null || _a === void 0 ? void 0 : _a.appId, onChange: function (e) {
                                            return setValue("wechatMp.appId", e.target.value);
                                        } }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u539F\u59CBID", 
                                //name="originalId"
                                tooltip: "\u539F\u59CBID", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u539F\u59CBID", type: "text", value: (_b = config === null || config === void 0 ? void 0 : config.wechatMp) === null || _b === void 0 ? void 0 : _b.originalId, onChange: function (e) {
                                            return setValue("wechatMp.originalId", e.target.value);
                                        } }) }) })] })] }), isService && ((0, jsx_runtime_1.jsxs)(antd_1.Col, { flex: "auto", children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, { orientation: "left", className: web_module_less_1.default.title, children: "\u5FAE\u4FE1\u516C\u4F17\u53F7-\u670D\u52A1\u5668\u914D\u7F6E" }), (0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u670D\u52A1\u5668\u5730\u5740(URL)", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u670D\u52A1\u5668\u5730\u5740(URL)\uFF0C\u9009\u586B", type: "text", value: (_c = config === null || config === void 0 ? void 0 : config.server) === null || _c === void 0 ? void 0 : _c.url, onChange: function (e) {
                                            return setValue("server.url", e.target.value);
                                        } }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u4EE4\u724C(Token)", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u4EE4\u724C(Token)", type: "text", value: (_d = config === null || config === void 0 ? void 0 : config.server) === null || _d === void 0 ? void 0 : _d.token, onChange: function (e) {
                                            return setValue("server.token", e.target.value);
                                        } }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u6D88\u606F\u52A0\u89E3\u5BC6\u5BC6\u94A5(EncodingAESKey)", 
                                // name="encodingAESKey"
                                tooltip: "\u6D88\u606F\u52A0\u89E3\u5BC6\u5BC6\u94A5\u5C06\u7528\u4E8E\u6D88\u606F\u4F53\u52A0\u89E3\u5BC6\u8FC7\u7A0B\u3002\u5177\u4F53\u529F\u80FD\u8BF7\u53C2\u89C1\u5FAE\u4FE1\u6587\u6863", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u6D88\u606F\u52A0\u89E3\u5BC6\u5BC6\u94A5(EncodingAESKey)", type: "text", value: (_e = config === null || config === void 0 ? void 0 : config.server) === null || _e === void 0 ? void 0 : _e.encodingAESKey, onChange: function (e) {
                                            return setValue("server.encodingAESKey", e.target.value);
                                        } }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u6D88\u606F\u52A0\u89E3\u5BC6\u65B9\u5F0F", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Select, { placeholder: "\u8BF7\u9009\u62E9\u6D88\u606F\u52A0\u89E3\u5BC6\u65B9\u5F0F", value: (_f = config === null || config === void 0 ? void 0 : config.server) === null || _f === void 0 ? void 0 : _f.mode, onChange: function (value) {
                                            return setValue("server.mode", value);
                                        }, options: [
                                            {
                                                value: 'clear',
                                                label: '明文模式',
                                            },
                                            {
                                                value: 'compatible',
                                                label: '兼容模式',
                                            },
                                            {
                                                value: 'safe',
                                                label: '安全模式',
                                            },
                                        ] }) }) })] })] }))] }));
}
exports.default = WechatPublic;
