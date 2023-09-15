"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { avatar, isLoggedIn, refreshing, mobileText, isRoot, oakExecuting, tokenId, nickname, oakDirty, } = props.data;
    const { doLogin, t, goMyMobile, goUserManage, goMyInfo } = props.methods;
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.userInfo, children: [avatar ? ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { className: web_module_less_1.default.avatar, src: avatar })) : ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { className: web_module_less_1.default.avatar, icon: (0, jsx_runtime_1.jsx)(icons_1.UserOutlined, { className: web_module_less_1.default.userIcon }) })), (0, jsx_runtime_1.jsx)("span", { className: web_module_less_1.default.nickname, children: nickname || '未设置' }), isLoggedIn ? ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", size: "small", disabled: refreshing, loading: refreshing, onClick: () => goMyInfo(), children: t('common::action.update') })) : ((0, jsx_runtime_1.jsx)(antd_1.Button, { size: "small", disabled: refreshing, loading: refreshing, onClick: () => doLogin(), children: t('login') }))] }), (0, jsx_runtime_1.jsxs)(antd_1.List, { className: web_module_less_1.default.list, split: true, children: [(0, jsx_runtime_1.jsx)(antd_1.List.Item, { onClick: () => goMyMobile(), children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { avatar: (0, jsx_runtime_1.jsx)(icons_1.MobileOutlined, {}), title: "\u624B\u673A\u53F7", description: mobileText }) }), isRoot && ((0, jsx_runtime_1.jsx)(antd_1.List.Item, { onClick: () => goUserManage(), children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { avatar: (0, jsx_runtime_1.jsx)(icons_1.UserOutlined, {}), title: "\u7528\u6237\u7BA1\u7406" }) }))] })] }));
}
exports.default = Render;
