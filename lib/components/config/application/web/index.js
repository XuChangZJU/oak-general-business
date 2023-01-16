"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Web(props) {
    var _a, _b, _c;
    var config = props.config, setValue = props.setValue;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Space, tslib_1.__assign({ direction: "vertical", size: "middle", style: { display: 'flex' } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Card, tslib_1.__assign({ className: web_module_less_1.default.tips }, { children: "\u6BCF\u79CD\u5747\u53EF\u914D\u7F6E\u4E00\u4E2A\uFF0C\u76F8\u5E94\u7684\u670D\u52A1\u6240\u4F7F\u7528\u7684\u5E10\u53F7\u8BF7\u51C6\u786E\u5BF9\u5E94" })) }), (0, jsx_runtime_1.jsxs)(antd_1.Col, tslib_1.__assign({ flex: "auto" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, tslib_1.__assign({ orientation: "left", className: web_module_less_1.default.title }, { children: "\u7F51\u7AD9-\u5FAE\u4FE1\u626B\u7801" })), (0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: 'top', size: 'middle', type: "card", items: [
                            {
                                key: '0',
                                label: '配置项',
                                children: ((0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "appId", name: "appId" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165appId", type: "text", value: (_a = config === null || config === void 0 ? void 0 : config.wechat) === null || _a === void 0 ? void 0 : _a.appId, onChange: function (e) {
                                                        return setValue("wechat.appId", e.target.value);
                                                    } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "appSecret", name: "appSecret" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165appSecret", type: "text", value: (_b = config === null || config === void 0 ? void 0 : config.wechat) === null || _b === void 0 ? void 0 : _b.appSecret, onChange: function (e) {
                                                        return setValue("wechat.appSecret", e.target.value);
                                                    } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u6388\u6743\u56DE\u8C03\u57DF", name: "domain", tooltip: "\u6388\u6743\u56DE\u8C03\u57DF\u53EF\u9009\u586B\uFF0C\u672A\u586B\u5199\u7684\u8BDD\uFF0C\u4F7F\u7528\u7F51\u9875\u8BBF\u95EE\u7684\u57DF\u540D\u5F53\u4F5C\u6388\u6743\u56DE\u8C03\u57DF" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u6388\u6743\u56DE\u8C03\u57DF", type: "text", value: (_c = config === null || config === void 0 ? void 0 : config.wechat) === null || _c === void 0 ? void 0 : _c.domain, onChange: function (e) {
                                                        return setValue("wechat.domain", e.target.value);
                                                    } }) }) }))] }))),
                            },
                        ] })] })), (0, jsx_runtime_1.jsxs)(antd_1.Col, tslib_1.__assign({ flex: "auto" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, tslib_1.__assign({ orientation: "left", className: web_module_less_1.default.title }, { children: "\u7F51\u7AD9-\u6388\u6743\u65B9\u5F0F" })), (0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: 'top', size: 'middle', type: "card", items: [
                            {
                                key: '0',
                                label: '配置项',
                                children: ((0, jsx_runtime_1.jsx)(antd_1.Form, tslib_1.__assign({ colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "passport", name: "passport" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Select, { mode: "multiple", allowClear: true, style: { width: '100%' }, placeholder: "\u8BF7\u9009\u62E9\u6388\u6743\u65B9\u5F0F", value: config === null || config === void 0 ? void 0 : config.passport, onChange: function (value) {
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
                                                        label: '微信二维码',
                                                        value: 'wechat',
                                                    },
                                                ] }) }) })) }))),
                            },
                        ] })] }))] })));
}
exports.default = Web;
