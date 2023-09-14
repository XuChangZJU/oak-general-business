"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var index_1 = tslib_1.__importDefault(require("./web/index"));
var index_2 = tslib_1.__importDefault(require("./wechatMp/index"));
var index_3 = tslib_1.__importDefault(require("./wechatPublic/index"));
function AppView(props) {
    var type = props.type, config = props.config, setValue = props.setValue, removeItem = props.removeItem, cleanKey = props.cleanKey, isService = props.isService;
    if (type === 'web') {
        return ((0, jsx_runtime_1.jsx)(index_1.default, { config: config || {}, setValue: function (path, value) { return setValue(path, value); }, removeItem: function (path, index) { return removeItem(path, index); }, cleanKey: function (path, key) { return cleanKey(path, key); } }));
    }
    if (type === 'wechatMp') {
        return ((0, jsx_runtime_1.jsx)(index_2.default, { config: config || {}, setValue: function (path, value) { return setValue(path, value); }, removeItem: function (path, index) { return removeItem(path, index); }, cleanKey: function (path, key) { return cleanKey(path, key); } }));
    }
    if (type === 'wechatPublic') {
        return ((0, jsx_runtime_1.jsx)(index_3.default, { isService: isService, config: config || {}, setValue: function (path, value) { return setValue(path, value); }, removeItem: function (path, index) { return removeItem(path, index); }, cleanKey: function (path, key) { return cleanKey(path, key); } }));
    }
    return null;
}
function render(props) {
    var _a = props.data, entity = _a.entity, name = _a.name, type = _a.type, currentConfig = _a.currentConfig, dirty = _a.dirty, isService = _a.isService;
    var _b = props.methods, resetConfig = _b.resetConfig, updateConfig = _b.updateConfig, setValue = _b.setValue, removeItem = _b.removeItem, cleanKey = _b.cleanKey;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Affix, { offsetTop: 64, children: (0, jsx_runtime_1.jsx)(antd_1.Alert, { message: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("text", { children: ["\u60A8\u6B63\u5728\u66F4\u65B0", (0, jsx_runtime_1.jsx)(antd_1.Typography.Text, { keyboard: true, className: web_module_less_1.default.weight, children: entity }), "\u5BF9\u8C61", (0, jsx_runtime_1.jsx)(antd_1.Typography.Text, { keyboard: true, className: web_module_less_1.default.weight, children: name }), "\u7684\u914D\u7F6E\uFF0C\u8BF7\u8C28\u614E\u64CD\u4F5C"] }) }), type: "info", showIcon: true, action: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { disabled: !dirty, type: "primary", danger: true, onClick: function () { return resetConfig(); }, style: {
                                    marginRight: 10,
                                }, children: "\u91CD\u7F6E" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { disabled: !dirty, type: "primary", onClick: function () { return updateConfig(); }, children: "\u786E\u5B9A" })] }) }) }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: "left", items: [
                        {
                            key: '参数设置',
                            label: '参数设置',
                            children: ((0, jsx_runtime_1.jsx)(AppView, { isService: isService, type: type, config: currentConfig || {}, setValue: function (path, value) {
                                    return setValue(path, value);
                                }, removeItem: function (path, index) {
                                    return removeItem(path, index);
                                }, cleanKey: function (path, key) {
                                    return cleanKey(path, key);
                                } })),
                        },
                    ] }) })] }));
}
exports.default = render;
