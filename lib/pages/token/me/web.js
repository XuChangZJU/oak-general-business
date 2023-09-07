"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_mobile_1 = require("antd-mobile");
var icons_1 = require("@ant-design/icons");
var mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
function Render(props) {
    var _a = props.data, avatar = _a.avatar, isLoggedIn = _a.isLoggedIn, refreshing = _a.refreshing, mobileText = _a.mobileText, isRoot = _a.isRoot, oakExecuting = _a.oakExecuting, tokenId = _a.tokenId, nickname = _a.nickname, oakDirty = _a.oakDirty;
    var _b = props.methods, doLogin = _b.doLogin, t = _b.t, goMyMobile = _b.goMyMobile, goUserManage = _b.goUserManage, goMyInfo = _b.goMyInfo;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: mobile_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: mobile_module_less_1.default.userInfo }, { children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Avatar, { className: mobile_module_less_1.default.avatar, src: avatar }), (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: mobile_module_less_1.default.nickname }, { children: nickname || '未设置' })), isLoggedIn ? ((0, jsx_runtime_1.jsx)(antd_mobile_1.Button, tslib_1.__assign({ color: "primary", size: "small", disabled: refreshing, loading: refreshing, onClick: function () { return goMyInfo(); } }, { children: t('common::action.update') }))) : ((0, jsx_runtime_1.jsx)(antd_mobile_1.Button, tslib_1.__assign({ size: "small", disabled: refreshing, loading: refreshing, onClick: function () { return doLogin(); } }, { children: t('login') })))] })), (0, jsx_runtime_1.jsxs)(antd_mobile_1.List, tslib_1.__assign({ className: mobile_module_less_1.default.list }, { children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { onClick: function () { return goMyMobile(); }, prefix: (0, jsx_runtime_1.jsx)(icons_1.MobileOutlined, {}), title: "\u624B\u673A\u53F7", extra: mobileText }), isRoot && ((0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { onClick: function () { return goUserManage(); }, prefix: (0, jsx_runtime_1.jsx)(icons_1.UserOutlined, {}), title: "\u7528\u6237\u7BA1\u7406" }))] }))] })));
}
exports.default = Render;
