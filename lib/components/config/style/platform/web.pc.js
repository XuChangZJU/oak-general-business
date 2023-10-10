"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const style_1 = tslib_1.__importDefault(require("../../style"));
function Render(props) {
    const { entity, currentStyle, dirty, name } = props.data;
    const { resetStyle, updateStyle, setValue, t } = props.methods;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Affix, { offsetTop: 64, children: (0, jsx_runtime_1.jsx)(antd_1.Alert, { message: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("text", { children: ["\u60A8\u6B63\u5728\u66F4\u65B0", (0, jsx_runtime_1.jsx)(antd_1.Typography.Text, { keyboard: true, className: web_module_less_1.default.weight, children: entity }), "\u5BF9\u8C61", (0, jsx_runtime_1.jsx)(antd_1.Typography.Text, { keyboard: true, className: web_module_less_1.default.weight, children: name }), "\u7684\u6837\u5F0F\uFF0C\u8BF7\u8C28\u614E\u64CD\u4F5C"] }) }), type: "info", showIcon: true, action: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { disabled: !dirty, type: "primary", danger: true, onClick: () => resetStyle(), style: {
                                    marginRight: 10,
                                }, children: t('common::reset') }), (0, jsx_runtime_1.jsx)(antd_1.Button, { disabled: !dirty, type: "primary", onClick: () => updateStyle(), children: t('common::action.confirm') })] }) }) }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.contains, children: (0, jsx_runtime_1.jsx)(style_1.default, { value: currentStyle, onChange: (s) => {
                        setValue(s);
                    } }) })] }));
}
exports.default = Render;
