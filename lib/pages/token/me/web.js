"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var uuid_1 = require("oak-domain/lib/utils/uuid");
function Render(props) {
    var _this = this;
    var _a = props.data, avatar = _a.avatar, isLoggedIn = _a.isLoggedIn, refreshing = _a.refreshing, mobileText = _a.mobileText, isRoot = _a.isRoot, oakExecuting = _a.oakExecuting, tokenId = _a.tokenId, nickname = _a.nickname, oakDirty = _a.oakDirty;
    var _b = props.methods, doLogin = _b.doLogin, t = _b.t, goMyMobile = _b.goMyMobile, goUserManage = _b.goUserManage, clean = _b.clean, execute = _b.execute, updateItem = _b.updateItem;
    var _c = tslib_1.__read((0, react_1.useState)(false), 2), showDrawer = _c[0], setShowDrawer = _c[1];
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.userInfo }, { children: [avatar ? ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { className: web_module_less_1.default.avatar, src: avatar })) : ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { className: web_module_less_1.default.avatar, icon: (0, jsx_runtime_1.jsx)(icons_1.UserOutlined, { className: web_module_less_1.default.userIcon }) })), (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.nickname }, { children: nickname || '未设置' })), isLoggedIn ? ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", size: "small", disabled: refreshing, loading: refreshing, onClick: function () { return setShowDrawer(true); } }, { children: t('common:action.update') }))) : ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ size: "small", disabled: refreshing, loading: refreshing, onClick: function () { return doLogin(); } }, { children: t('login') })))] })), (0, jsx_runtime_1.jsx)(antd_1.List, tslib_1.__assign({ className: web_module_less_1.default.list, split: true }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item, tslib_1.__assign({ onClick: function () { return goMyMobile(); } }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { avatar: (0, jsx_runtime_1.jsx)(icons_1.MobileOutlined, {}), title: "\u624B\u673A\u53F7", description: mobileText }) })) })), isRoot && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)(antd_1.List, tslib_1.__assign({ className: web_module_less_1.default.list, split: true }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item, tslib_1.__assign({ onClick: function () { return goUserManage(); } }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { avatar: (0, jsx_runtime_1.jsx)(icons_1.UserOutlined, {}), title: "\u7528\u6237\u7BA1\u7406" }) })) }))] })), (0, jsx_runtime_1.jsx)(antd_1.Drawer, tslib_1.__assign({ placement: "bottom", open: showDrawer, title: "\u4FEE\u6539\u6635\u79F0", onClose: function () {
                    clean(undefined);
                    setShowDrawer(false);
                }, extra: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ disabled: oakExecuting || !oakDirty, onClick: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, execute()];
                                case 1:
                                    _a.sent();
                                    setShowDrawer(false);
                                    return [2 /*return*/];
                            }
                        });
                    }); } }, { children: t('common:action.confirm') })) }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u6635\u79F0", value: nickname, onChange: function (e) { return updateItem({ user: {
                            id: (0, uuid_1.generateNewId)(),
                            action: 'update',
                            data: {
                                nickname: e.target.value
                            }
                        } }, tokenId); } }) }))] })));
}
exports.default = Render;
