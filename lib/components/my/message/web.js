"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_mobile_1 = require("antd-mobile");
var icons_1 = require("@ant-design/icons");
var mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
function Render(props) {
    var data = props.data, methods = props.methods;
    var count = data.count;
    var goMessageList = methods.goMessageList;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Badge, tslib_1.__assign({ content: count || '' }, { children: (0, jsx_runtime_1.jsx)(icons_1.BellOutlined, { className: mobile_module_less_1.default.icon, onClick: function () {
                    goMessageList();
                } }) })) }));
}
exports.default = Render;
