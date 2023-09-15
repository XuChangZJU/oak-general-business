"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_mobile_1 = require("antd-mobile");
const mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
function Render(props) {
    const { actionss, onActionClick } = props.data;
    // icon方案还未最终确定
    if (actionss) {
        return ((0, jsx_runtime_1.jsx)(antd_mobile_1.Space, { wrap: true, className: mobile_module_less_1.default.container, children: actionss.map((ele) => ((0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { color: "primary", fill: "outline", onClick: () => onActionClick(ele.action), children: ele.label }))) }));
    }
    return null;
}
exports.default = Render;
