"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_react_1 = require("tdesign-react");
var tdesign_icons_react_1 = require("tdesign-icons-react");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var ListItem = tdesign_react_1.List.ListItem, ListItemMeta = tdesign_react_1.List.ListItemMeta;
function render() {
    var _this = this;
    var _a = this.state, avatar = _a.avatar, nickname = _a.nickname, isLoggedIn = _a.isLoggedIn, refreshing = _a.refreshing, mobile = _a.mobile, mobileCount = _a.mobileCount, showDrawer = _a.showDrawer, oakDirty = _a.oakDirty;
    var mobileText = mobileCount > 1 ? "".concat(mobileCount, "\u6761\u624B\u673A\u53F7") : (mobile || '未设置');
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.userInfo }, { children: [avatar ? ((0, jsx_runtime_1.jsx)(tdesign_react_1.Avatar, { className: web_module_less_1.default.avatar, image: avatar })) : ((0, jsx_runtime_1.jsx)(tdesign_react_1.Avatar, { className: web_module_less_1.default.avatar, icon: (0, jsx_runtime_1.jsx)(tdesign_icons_react_1.UserCircleIcon, { className: web_module_less_1.default.userIcon }) })), (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.nickname }, { children: nickname || '未设置' })), isLoggedIn ? ((0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", size: "small", disabled: refreshing, loading: refreshing, onClick: function () {
                            return _this.setState({
                                showDrawer: true,
                            });
                        } }, { children: this.t('common:action.update') }))) : ((0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ size: "small", disabled: refreshing, loading: refreshing, onClick: function () { return _this.doLogin(); } }, { children: this.t('login') })))] })), (0, jsx_runtime_1.jsx)(tdesign_react_1.List, tslib_1.__assign({ layout: "horizontal", size: "medium", className: web_module_less_1.default.list, split: true }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ onClick: function () { return _this.goMyMobile(); } }, { children: (0, jsx_runtime_1.jsx)(ListItem, tslib_1.__assign({ action: (0, jsx_runtime_1.jsx)(tdesign_icons_react_1.Icon, { size: 18, name: "chevron-right" }) }, { children: (0, jsx_runtime_1.jsx)(ListItemMeta, { image: (0, jsx_runtime_1.jsx)(tdesign_icons_react_1.Icon, { size: 18, name: "mobile" }), title: "\u624B\u673A\u53F7", description: mobileText }) })) })) })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Drawer, tslib_1.__assign({ placement: "bottom", visible: showDrawer, header: "\u4FEE\u6539\u6635\u79F0", onConfirm: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.execute('update', undefined, '0.user')];
                            case 1:
                                _a.sent();
                                this.setState({ showDrawer: false });
                                this.resetUpdateData();
                                return [2 /*return*/];
                        }
                    });
                }); }, onCancel: function () {
                    _this.setState({ showDrawer: false });
                    _this.resetUpdateData();
                }, onClose: function () {
                    _this.setState({ showDrawer: false });
                    _this.resetUpdateData();
                } }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u6635\u79F0", value: nickname, onChange: function (value) {
                        _this.setUpdateData('0.user.nickname', value);
                    } }) }))] })));
}
exports.default = render;
