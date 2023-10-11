"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const index_1 = tslib_1.__importDefault(require("./web/index"));
const index_2 = tslib_1.__importDefault(require("./wechatMp/index"));
const index_3 = tslib_1.__importDefault(require("./wechatPublic/index"));
function AppView(props) {
    const { type, config, setValue, removeItem, cleanKey, isService } = props;
    if (type === 'web') {
        return ((0, jsx_runtime_1.jsx)(index_1.default, { config: config || {}, setValue: (path, value) => setValue(path, value), removeItem: (path, index) => removeItem(path, index), cleanKey: (path, key) => cleanKey(path, key) }));
    }
    if (type === 'wechatMp') {
        return ((0, jsx_runtime_1.jsx)(index_2.default, { config: config || {}, setValue: (path, value) => setValue(path, value), removeItem: (path, index) => removeItem(path, index), cleanKey: (path, key) => cleanKey(path, key) }));
    }
    if (type === 'wechatPublic') {
        return ((0, jsx_runtime_1.jsx)(index_3.default, { isService: isService, config: config || {}, setValue: (path, value) => setValue(path, value), removeItem: (path, index) => removeItem(path, index), cleanKey: (path, key) => cleanKey(path, key) }));
    }
    return null;
}
function render(props) {
    const { entity, name, type, currentConfig, dirty, isService, } = props.data;
    const { resetConfig, updateConfig, setValue, removeItem, cleanKey } = props.methods;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Affix, { offsetTop: 64, children: (0, jsx_runtime_1.jsx)(antd_1.Alert, { message: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("text", { children: ["\u60A8\u6B63\u5728\u66F4\u65B0", (0, jsx_runtime_1.jsx)(antd_1.Typography.Text, { keyboard: true, className: web_module_less_1.default.weight, children: entity }), "\u5BF9\u8C61", (0, jsx_runtime_1.jsx)(antd_1.Typography.Text, { keyboard: true, className: web_module_less_1.default.weight, children: name }), "\u7684\u914D\u7F6E\uFF0C\u8BF7\u8C28\u614E\u64CD\u4F5C"] }) }), type: "info", showIcon: true, action: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { disabled: !dirty, type: "primary", danger: true, onClick: () => resetConfig(), style: {
                                    marginRight: 10,
                                }, children: "\u91CD\u7F6E" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { disabled: !dirty, type: "primary", onClick: () => updateConfig(), children: "\u786E\u5B9A" })] }) }) }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(AppView, { isService: isService, type: type, config: currentConfig || {}, setValue: (path, value) => setValue(path, value), removeItem: (path, index) => removeItem(path, index), cleanKey: (path, key) => cleanKey(path, key) }) })] }));
}
exports.default = render;
