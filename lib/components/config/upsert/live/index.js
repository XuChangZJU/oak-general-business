"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Qiniu(props) {
    var live = props.live, setValue = props.setValue;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Col, tslib_1.__assign({ flex: "auto" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, tslib_1.__assign({ orientation: "left", className: web_module_less_1.default.title }, { children: "\u4E03\u725B\u4E91\u914D\u7F6E" })), (0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: 'top', size: 'middle', type: "card", items: [
                    {
                        key: '0',
                        label: '配置项',
                        children: ((0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "accessKey", name: "accessKey" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165accessKey", type: "text", value: live === null || live === void 0 ? void 0 : live.accessKey, onChange: function (e) {
                                                return setValue("accessKey", e.target.value);
                                            } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "hub", name: "hub" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165hub", type: "text", value: live === null || live === void 0 ? void 0 : live.hub, onChange: function (e) {
                                                return setValue("hub", e.target.value);
                                            } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "liveHost", name: "liveHost" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165liveHost", type: "text", value: live === null || live === void 0 ? void 0 : live.liveHost, onChange: function (e) {
                                                return setValue("liveHost", e.target.value);
                                            } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "playDomain", name: "playDomain" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165playDomain", type: "text", value: live === null || live === void 0 ? void 0 : live.playDomain, onChange: function (e) {
                                                return setValue("playDomain", e.target.value);
                                            } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "playBackDomain", name: "playBackDomain" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165playBackDomain", type: "text", value: live === null || live === void 0 ? void 0 : live.playBackDomain, onChange: function (e) {
                                                return setValue("playBackDomain", e.target.value);
                                            } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "playKey", name: "playKey" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165playKey", type: "text", value: live === null || live === void 0 ? void 0 : live.playKey, onChange: function (e) {
                                                return setValue("playKey", e.target.value);
                                            } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "publishDomain", name: "publishDomain" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165publishDomain", type: "text", value: live === null || live === void 0 ? void 0 : live.publishDomain, onChange: function (e) {
                                                return setValue("publishDomain", e.target.value);
                                            } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "publishKey", name: "publishKey" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165publishKey", type: "text", value: live === null || live === void 0 ? void 0 : live.publishKey, onChange: function (e) {
                                                return setValue("publishKey", e.target.value);
                                            } }) }) }))] }))),
                    },
                ] })] })));
}
function Cos(props) {
    var live = props.live, setValue = props.setValue;
    var qiniu = live.qiniu;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Space, tslib_1.__assign({ direction: "vertical", size: "middle", style: { display: 'flex' } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Card, tslib_1.__assign({ className: web_module_less_1.default.tips }, { children: "\u6BCF\u79CD\u5747\u53EF\u914D\u7F6E\u4E00\u4E2A\uFF0C\u76F8\u5E94\u7684\u670D\u52A1\u6240\u4F7F\u7528\u7684\u5E10\u53F7\u8BF7\u51C6\u786E\u5BF9\u5E94" })) }), (0, jsx_runtime_1.jsx)(Qiniu, { live: qiniu, setValue: function (path, value) { return setValue("qiniu.".concat(path), value); } })] })));
}
exports.default = Cos;
