"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_mobile_1 = require("antd-mobile");
const mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
const index_1 = tslib_1.__importDefault(require("../onUser/index"));
function Render(props) {
    const { relations, entity, entityId, oakId, oakDirty, oakFullpath, oakExecutable } = props.data;
    const { onConfirm, onReset, t } = props.methods;
    return ((0, jsx_runtime_1.jsx)(antd_mobile_1.Form, { footer: (0, jsx_runtime_1.jsxs)("div", { className: mobile_module_less_1.default['btn-container'], children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { color: "primary", style: { flex: 2 }, onClick: () => {
                        onConfirm();
                    }, disabled: oakExecutable !== true, children: t('common::action.confirm') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { style: { flex: 1 }, onClick: () => onReset(), children: t('common::reset') })] }), children: (0, jsx_runtime_1.jsx)(index_1.default, { oakAutoUnmount: true, oakPath: oakFullpath && `${oakFullpath}.user`, entity: entity, entityId: entityId, relations: relations, oakId: oakId }) }));
}
exports.default = Render;
