"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_mobile_1 = require("antd-mobile");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var actionss = props.data.actionss;
    var onClick = props.methods.onClick;
    // icon方案还未最终确定
    if (actionss) {
        return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: actionss.map(function (ele) { return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "action" }, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, tslib_1.__assign({ color: 'primary', fill: 'outline', onClick: function () { return onClick(ele.action); } }, { children: ele.label })) }))); }) })));
    }
    return null;
}
exports.default = Render;
