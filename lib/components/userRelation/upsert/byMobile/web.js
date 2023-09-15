"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_mobile_1 = require("antd-mobile");
const mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
const index_1 = tslib_1.__importDefault(require("../onUser/index"));
function Render(props) {
    const { mobileValue, mobileValueReady, relations, entity, entityId, userId, oakFullpath, oakExecutable, oakDirty } = props.data;
    const { onConfirm, onMobileChange, onReset, t } = props.methods;
    return ((0, jsx_runtime_1.jsxs)(antd_mobile_1.Form, { footer: (0, jsx_runtime_1.jsxs)("div", { className: mobile_module_less_1.default['btn-container'], children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { color: "primary", style: { flex: 2 }, onClick: () => {
                        onConfirm();
                    }, disabled: !oakExecutable, children: t('common::action.confirm') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { style: { flex: 1 }, onClick: () => onReset(), children: t('common::reset') })] }), children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: "\u624B\u673A\u53F7\u7801", name: "mobile", rules: [
                    {
                        required: true,
                        message: '手机号不能为空',
                    },
                    {
                        min: 11,
                        message: '请输入11位手机号',
                    },
                    {
                        max: 11,
                        message: '请输入11位手机号',
                    },
                ], children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { maxLength: 11, value: mobileValue, onChange: (value) => {
                            onMobileChange(value);
                        }, placeholder: t('inputMobile'), type: "tel", clearable: true }) }) }), mobileValueReady && userId && ((0, jsx_runtime_1.jsx)(index_1.default, { oakAutoUnmount: true, oakPath: oakFullpath ? `${oakFullpath}.user`
                    : undefined, entity: entity, entityId: entityId, relations: relations, oakId: userId }))] }));
}
exports.default = Render;
