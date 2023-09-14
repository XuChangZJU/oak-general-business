"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_mobile_1 = require("antd-mobile");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var icons_1 = require("@ant-design/icons");
var mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
function Render(props) {
    var data = props.data, methods = props.methods;
    var count = data.count, className = data.className, onClick = data.onClick, style = data.style;
    var goMessageList = methods.goMessageList;
    return ((0, jsx_runtime_1.jsx)(antd_mobile_1.Badge, { content: count || '', children: (0, jsx_runtime_1.jsx)(icons_1.BellOutlined, { className: (0, classnames_1.default)(mobile_module_less_1.default.icon, className), style: style, onClick: function (e) {
                if (typeof onClick === 'function') {
                    onClick(e);
                    return;
                }
                goMessageList();
            } }) }));
}
exports.default = Render;
