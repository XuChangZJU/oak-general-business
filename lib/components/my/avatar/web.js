"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const index_1 = tslib_1.__importDefault(require("../../icon/index"));
function Render(props) {
    const { data: { avatarUrl, shape, size, iconColor, iconName, onClick } } = props;
    return avatarUrl ? ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { className: onClick ? web_module_less_1.default.avatar : undefined, src: avatarUrl, shape: shape, size: size, onClick: onClick })) : ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { className: onClick ? web_module_less_1.default.avatar : undefined, icon: (0, jsx_runtime_1.jsx)(index_1.default, { name: iconName, color: iconColor }), shape: shape, size: size, onClick: onClick }));
}
exports.default = Render;
