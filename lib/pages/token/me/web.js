"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render() {
    var _this = this;
    var _a = this.state, avatar = _a.avatar, nickname = _a.nickname, isLoggedIn = _a.isLoggedIn, refreshing = _a.refreshing, mobile = _a.mobile, mobileCount = _a.mobileCount, showDrawer = _a.showDrawer;
    var mobileText = mobileCount > 1 ? "".concat(mobileCount, "\u6761\u624B\u673A\u53F7") : (mobile || '未设置');
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.userInfo }, { children: [avatar ? ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { className: web_module_less_1.default.avatar, src: avatar })) : ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { className: web_module_less_1.default.avatar, icon: (0, jsx_runtime_1.jsx)(icons_1.UserOutlined, { className: web_module_less_1.default.userIcon }) })), (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.nickname }, { children: nickname || '未设置' })), isLoggedIn ? ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", size: "small", disabled: refreshing, loading: refreshing, onClick: function () {
                            return _this.setState({
                                showDrawer: true,
                            });
                        } }, { children: this.t('common:action.update') }))) : ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ size: "small", disabled: refreshing, loading: refreshing, onClick: function () { return _this.doLogin(); } }, { children: this.t('login') })))] })), (0, jsx_runtime_1.jsx)(antd_1.List, tslib_1.__assign({ className: web_module_less_1.default.list, split: true }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item, tslib_1.__assign({ onClick: function () { return _this.goMyMobile(); } }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { avatar: (0, jsx_runtime_1.jsx)(icons_1.MobileOutlined, {}), title: "\u624B\u673A\u53F7", description: mobileText }) })) })), this.state.isRoot && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)(antd_1.List, tslib_1.__assign({ className: web_module_less_1.default.list, split: true }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item, tslib_1.__assign({ onClick: function () { return _this.goUserManage(); } }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { avatar: (0, jsx_runtime_1.jsx)(icons_1.UserOutlined, {}), title: "\u7528\u6237\u7BA1\u7406" }) })) }))] })), (0, jsx_runtime_1.jsx)(antd_1.Drawer, tslib_1.__assign({ placement: "bottom", open: showDrawer, title: "\u4FEE\u6539\u6635\u79F0", onClose: function () {
                    _this.setState({ showDrawer: false });
                    _this.cleanOperation();
                }, extra: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ disabled: this.state.oakExecuting ||
                        !this.state.oakAllowExecuting, onClick: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.execute()];
                                case 1:
                                    _a.sent();
                                    this.setState({ showDrawer: false });
                                    this.cleanOperation();
                                    return [2 /*return*/];
                            }
                        });
                    }); } }, { children: this.t('common:action.confirm') })) }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u6635\u79F0", value: nickname, onChange: function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var tokenId;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    tokenId = this.state.tokenId;
                                    return [4 /*yield*/, this.addOperation({
                                            action: 'update',
                                            data: {
                                                user: {
                                                    action: 'update',
                                                    data: {
                                                        nickname: e.target.value,
                                                    },
                                                },
                                            },
                                            filter: {
                                                id: tokenId,
                                            },
                                        })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); } }) }))] })));
}
exports.default = render;
