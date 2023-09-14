"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var index_1 = tslib_1.__importDefault(require("./account/index"));
var index_2 = tslib_1.__importDefault(require("./cos/index"));
var index_3 = tslib_1.__importDefault(require("./map/index"));
var index_4 = tslib_1.__importDefault(require("./live/index"));
var index_5 = tslib_1.__importDefault(require("./sms/index"));
function Render(props) {
    var _a = props.data, entity = _a.entity, name = _a.name, currentConfig = _a.currentConfig, dirty = _a.dirty;
    var _b = props.methods, resetConfig = _b.resetConfig, updateConfig = _b.updateConfig, setValue = _b.setValue, removeItem = _b.removeItem, cleanKey = _b.cleanKey;
    var _c = currentConfig || {}, account = _c.Account, cos = _c.Cos, map = _c.Map, live = _c.Live, sms = _c.Sms;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Affix, { offsetTop: 64, children: (0, jsx_runtime_1.jsx)(antd_1.Alert, { message: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("text", { children: ["\u60A8\u6B63\u5728\u66F4\u65B0", (0, jsx_runtime_1.jsx)(antd_1.Typography.Text, { keyboard: true, className: web_module_less_1.default.weight, children: entity }), "\u5BF9\u8C61", (0, jsx_runtime_1.jsx)(antd_1.Typography.Text, { keyboard: true, className: web_module_less_1.default.weight, children: name }), "\u7684\u914D\u7F6E\uFF0C\u8BF7\u8C28\u614E\u64CD\u4F5C"] }) }), type: "info", showIcon: true, action: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { disabled: !dirty, type: "primary", danger: true, onClick: function () { return resetConfig(); }, style: {
                                    marginRight: 10,
                                }, children: "\u91CD\u7F6E" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { disabled: !dirty, type: "primary", onClick: function () { return updateConfig(); }, children: "\u786E\u5B9A" })] }) }) }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: "left", items: [
                        {
                            key: '云平台帐号',
                            label: '云平台帐号',
                            children: ((0, jsx_runtime_1.jsx)(index_1.default, { account: account || {}, setValue: function (path, value) {
                                    return setValue("Account.".concat(path), value);
                                }, removeItem: function (path, index) {
                                    return removeItem("Account.".concat(path), index);
                                } })),
                        },
                        {
                            key: '云存储设置',
                            label: '云存储设置',
                            children: ((0, jsx_runtime_1.jsx)(index_2.default, { cos: cos || {}, setValue: function (path, value) {
                                    return setValue("Cos.".concat(path), value);
                                } })),
                        },
                        {
                            key: '直播api设置',
                            label: '直播api设置',
                            children: ((0, jsx_runtime_1.jsx)(index_4.default, { live: live || {}, setValue: function (path, value) {
                                    return setValue("Map.".concat(path), value);
                                } })),
                        },
                        {
                            key: '地图api设置',
                            label: '地图api设置',
                            children: ((0, jsx_runtime_1.jsx)(index_3.default, { map: map || {}, setValue: function (path, value) {
                                    return setValue("Map.".concat(path), value);
                                } })),
                        },
                        {
                            key: '短信设置',
                            label: '短信设置',
                            children: ((0, jsx_runtime_1.jsx)(index_5.default, { sms: sms || {}, setValue: function (path, value) {
                                    return setValue("Sms.".concat(path), value);
                                }, removeItem: function (path, index) {
                                    return removeItem("Sms.".concat(path), index);
                                }, cleanKey: function (path, key) {
                                    return cleanKey("Sms.".concat(path), key);
                                } })),
                        },
                    ] }) })] }));
}
exports.default = Render;
