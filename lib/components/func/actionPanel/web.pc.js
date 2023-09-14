"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
function Render(props) {
    var _a = props.data, actionss = _a.actionss, onActionClick = _a.onActionClick;
    // icon方案还未最终确定
    if (actionss) {
        return ((0, jsx_runtime_1.jsx)(antd_1.Space, { children: actionss.map(function (ele) { return ((0, jsx_runtime_1.jsx)(antd_1.Button, { color: "primary", type: "default", onClick: function () { return onActionClick(ele.action); }, children: ele.label })); }) }));
    }
    return null;
}
exports.default = Render;
