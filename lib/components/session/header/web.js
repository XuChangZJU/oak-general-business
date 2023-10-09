"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
// import { UserOutlined } from '@ant-design/icons';
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    const { methods, data } = props;
    const { nickname, avatarUrl, name } = data;
    const defaultUrl = 'http://qiniu.gecomebox.com/static/defaultAvatar.png';
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.header, children: [(0, jsx_runtime_1.jsx)(antd_1.Avatar, { shape: "square", className: web_module_less_1.default.avatar, src: avatarUrl || defaultUrl }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.nickname, children: nickname || name })] }));
}
exports.default = render;
