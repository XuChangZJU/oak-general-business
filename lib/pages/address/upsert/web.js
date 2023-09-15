"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_mobile_1 = require("antd-mobile");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const types_1 = require("oak-domain/lib/types");
const assert_1 = require("oak-domain/lib/utils/assert");
function Render(props) {
    const { callAreaPicker, t, confirm, update } = props.methods;
    const { data } = props;
    const inputName = (0, react_1.useRef)(null);
    const inputPhone = (0, react_1.useRef)(null);
    const inputDetail = (0, react_1.useRef)(null);
    const [help, setHelp] = (0, react_1.useState)({});
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsxs)(antd_mobile_1.Form, { layout: "horizontal", children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('address:attr.name'), name: "name", help: help.name, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { placeholder: "\u59D3\u540D", onChange: (v) => update({ name: v }), value: data.name, "data-attr": "name", ref: inputName }) }) }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('address:attr.phone'), name: "phone", help: help.phone, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { placeholder: "\u624B\u673A\u53F7", onChange: (v) => update({ phone: v }), value: data.phone, "data-attr": "phone", ref: inputPhone }) }) }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('address:attr.area'), name: "areaText", arrow: true, onClick: () => callAreaPicker(), children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { placeholder: "\u6240\u5728\u5730\u533A", value: data.areaText, "data-attr": "areaText", readOnly: true }) }) }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('address:attr.detail'), name: "detail", help: help.detail, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.TextArea, { maxLength: 100, onChange: (v) => update({ detail: v }), value: data.detail || undefined, "data-attr": "detail", placeholder: "\u8BE6\u7EC6\u5730\u5740", ref: inputDetail, showCount: true }) }) })] }), (0, jsx_runtime_1.jsx)("div", { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { block: true, disabled: !data.oakDirty || data.oakExecuting, loading: data.oakExecuting, color: "primary", onClick: async () => {
                    try {
                        await confirm();
                    }
                    catch (err) {
                        if (err instanceof types_1.OakInputIllegalException) {
                            const [attr] = err.getAttributes();
                            switch (attr) {
                                case 'name': {
                                    inputName.current?.focus();
                                    break;
                                }
                                case 'phone': {
                                    inputPhone.current?.focus();
                                    break;
                                }
                                case 'detail': {
                                    inputDetail.current?.focus();
                                    break;
                                }
                                default: {
                                    (0, assert_1.assert)(false);
                                }
                            }
                            setHelp({
                                [attr]: err.message,
                            });
                        }
                        throw err;
                    }
                }, children: t('common::action.confirm') })] }));
}
exports.default = Render;
