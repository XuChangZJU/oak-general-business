"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_mobile_1 = require("antd-mobile");
var mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
function Render(props) {
    var _a = props.data, actionss = _a.actionss, onActionClick = _a.onActionClick;
    // icon方案还未最终确定
    if (actionss) {
        return ((0, jsx_runtime_1.jsx)(antd_mobile_1.Space, { wrap: true, className: mobile_module_less_1.default.container, children: actionss.map(function (ele) { return ((0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { color: "primary", fill: "outline", onClick: function () { return onActionClick(ele.action); }, children: ele.label })); }) }));
    }
    return null;
}
exports.default = Render;
