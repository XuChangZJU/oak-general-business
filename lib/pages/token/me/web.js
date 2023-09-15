"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_mobile_1 = require("antd-mobile");
const icons_1 = require("@ant-design/icons");
const mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
function Render(props) {
    const { avatar, isLoggedIn, refreshing, mobileText, isRoot, oakExecuting, tokenId, nickname, oakDirty, } = props.data;
    const { doLogin, t, goMyMobile, goUserManage, goMyInfo } = props.methods;
    return ((0, jsx_runtime_1.jsxs)("div", { className: mobile_module_less_1.default.container, children: [(0, jsx_runtime_1.jsxs)("div", { className: mobile_module_less_1.default.userInfo, children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Avatar, { className: mobile_module_less_1.default.avatar, src: avatar }), (0, jsx_runtime_1.jsx)("span", { className: mobile_module_less_1.default.nickname, children: nickname || '未设置' }), isLoggedIn ? ((0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { color: "primary", size: "small", disabled: refreshing, loading: refreshing, onClick: () => goMyInfo(), children: t('common::action.update') })) : ((0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { size: "small", disabled: refreshing, loading: refreshing, onClick: () => doLogin(), children: t('login') }))] }), (0, jsx_runtime_1.jsxs)(antd_mobile_1.List, { className: mobile_module_less_1.default.list, children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { onClick: () => goMyMobile(), prefix: (0, jsx_runtime_1.jsx)(icons_1.MobileOutlined, {}), title: "\u624B\u673A\u53F7", extra: mobileText }), isRoot && ((0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { onClick: () => goUserManage(), prefix: (0, jsx_runtime_1.jsx)(icons_1.UserOutlined, {}), title: "\u7528\u6237\u7BA1\u7406" }))] })] }));
}
exports.default = Render;
