"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const antd_1 = require("antd");
function Render(props) {
    const { methods, data } = props;
    const { addresses } = data;
    if (addresses && addresses.length > 0) {
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.List, { children: addresses.map((address) => ((0, jsx_runtime_1.jsx)(antd_1.List.Item, { onClick: () => methods.gotoUpsert(address.id), children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: address.name, description: address.areaText + address.detail }) }, address.id))) }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [methods.t('common::noData'), (0, jsx_runtime_1.jsx)(antd_1.Button, { block: false, ghost: false, loading: false, type: "primary", style: { marginTop: 10 }, onClick: () => methods.goNewAddress(), children: methods.t('common::action.create') })] }));
}
exports.default = Render;
