"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function WechatMp(props) {
    var config = props.config, setValue = props.setValue;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Space, tslib_1.__assign({ direction: "vertical", size: "middle", style: { display: 'flex' } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Card, tslib_1.__assign({ className: web_module_less_1.default.tips }, { children: "\u6BCF\u79CD\u5747\u53EF\u914D\u7F6E\u4E00\u4E2A\uFF0C\u76F8\u5E94\u7684\u670D\u52A1\u6240\u4F7F\u7528\u7684\u5E10\u53F7\u8BF7\u51C6\u786E\u5BF9\u5E94" })) }), (0, jsx_runtime_1.jsxs)(antd_1.Col, tslib_1.__assign({ flex: "auto" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, tslib_1.__assign({ orientation: "left", className: web_module_less_1.default.title }, { children: "\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F-\u57FA\u7840" })), (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "appId", name: "appId" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165appId", type: "text", value: config === null || config === void 0 ? void 0 : config.appId, onChange: function (e) {
                                            return setValue("appId", e.target.value);
                                        } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "appSecret", name: "appSecret" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165appSecret", type: "text", value: config === null || config === void 0 ? void 0 : config.appSecret, onChange: function (e) {
                                            return setValue("appSecret", e.target.value);
                                        } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "qrCodePrefix", name: "qrCodePrefix" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165qrCodePrefix", type: "text", value: config === null || config === void 0 ? void 0 : config.qrCodePrefix, onChange: function (e) {
                                            return setValue("qrCodePrefix", e.target.value);
                                        } }) }) }))] }))] }))] })));
}
exports.default = WechatMp;
