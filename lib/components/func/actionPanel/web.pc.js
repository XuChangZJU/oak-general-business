"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
function Render(props) {
    const { actionss, onActionClick } = props.data;
    // icon方案还未最终确定
    if (actionss) {
        return ((0, jsx_runtime_1.jsx)(antd_1.Space, { children: actionss.map((ele) => ((0, jsx_runtime_1.jsx)(antd_1.Button, { color: "primary", type: "default", onClick: () => onActionClick(ele.action), children: ele.label }))) }));
    }
    return null;
}
exports.default = Render;
