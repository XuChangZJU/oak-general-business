"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var index_1 = tslib_1.__importDefault(require("./account/index"));
var TabPane = antd_1.Tabs.TabPane;
function render() {
    var _this = this;
    var _a = this.props, entity = _a.entity, name = _a.name;
    var _b = this.state, currentConfig = _b.currentConfig, dirty = _b.dirty;
    var account = currentConfig.Account;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Affix, tslib_1.__assign({ offsetTop: 0 }, { children: (0, jsx_runtime_1.jsx)(antd_1.Alert, { message: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("text", { children: ["\u60A8\u6B63\u5728\u66F4\u65B0", (0, jsx_runtime_1.jsx)(antd_1.Typography.Text, tslib_1.__assign({ keyboard: true, className: web_module_less_1.default.weight }, { children: entity })), "\u5BF9\u8C61", (0, jsx_runtime_1.jsx)(antd_1.Typography.Text, tslib_1.__assign({ keyboard: true, className: web_module_less_1.default.weight }, { children: name })), "\u7684\u914D\u7F6E\uFF0C\u8BF7\u8C28\u614E\u64CD\u4F5C"] }) }), type: "info", showIcon: true, action: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ disabled: !dirty, type: "primary", danger: true, onClick: function () { return _this.resetConfig(); }, style: {
                                    marginRight: 10,
                                } }, { children: "\u91CD\u7F6E" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ disabled: !dirty, type: "primary", onClick: function () { return _this.updateConfig(); } }, { children: "\u786E\u5B9A" }))] }) }) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, tslib_1.__assign({ tabPosition: "left" }, { children: (0, jsx_runtime_1.jsx)(TabPane, tslib_1.__assign({ tab: "\u4E91\u5E73\u53F0\u5E10\u53F7", style: {
                            marginLeft: 20,
                        } }, { children: (0, jsx_runtime_1.jsx)(index_1.default, { account: account || {}, setValue: function (path, value) {
                                return _this.setValue("Account.".concat(path), value);
                            }, removeItem: function (path, index) {
                                return _this.removeItem("Account.".concat(path), index);
                            } }) }), "\u4E91\u5E73\u53F0\u5E10\u53F7") })) }))] }));
}
exports.default = render;
