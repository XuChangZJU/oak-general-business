"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var index_1 = tslib_1.__importDefault(require("../../icon/index"));
function Render(props) {
    var _a = props.data, avatarUrl = _a.avatarUrl, shape = _a.shape, size = _a.size, iconType = _a.iconType, iconColor = _a.iconColor, iconName = _a.iconName, onClick = _a.onClick;
    return avatarUrl ? ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { className: onClick ? web_module_less_1.default.avatar : undefined, src: avatarUrl, shape: shape, size: size, onClick: onClick })) : ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { className: onClick ? web_module_less_1.default.avatar : undefined, icon: (0, jsx_runtime_1.jsx)(index_1.default, { name: iconName, color: iconColor, type: iconType }), shape: shape, size: size, onClick: onClick }));
}
exports.default = Render;
