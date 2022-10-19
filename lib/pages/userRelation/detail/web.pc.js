"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_react_1 = require("tdesign-react");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var randomUser_1 = require("../../../utils/randomUser");
var ListItem = tdesign_react_1.List.ListItem, ListItemMeta = tdesign_react_1.List.ListItemMeta;
function render() {
    var _this = this;
    var t = this.t;
    var entity = this.props.entity;
    var _a = this.state, avatar = _a.avatar, nickname = _a.nickname, name = _a.name, mobile = _a.mobile, relationArr = _a.relationArr;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: true, title: "\u4EBA\u5458\u8BE6\u60C5" }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.List, { children: (0, jsx_runtime_1.jsx)(ListItem, { children: (0, jsx_runtime_1.jsx)(ListItemMeta, { image: avatar ? ((0, jsx_runtime_1.jsx)(tdesign_react_1.Avatar, { className: web_module_less_1.default.avatar, image: avatar })) : ((0, jsx_runtime_1.jsx)(tdesign_react_1.Avatar, tslib_1.__assign({ className: web_module_less_1.default.avatar }, { children: (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.text }, { children: (0, randomUser_1.getName)(name) })) }))), title: (0, jsx_runtime_1.jsx)("div", { children: name || '--' }), description: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.description }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.row }, { children: [(0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.label }, { children: "\u6635\u79F0:\u00A0" })), (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.value }, { children: nickname || '--' }))] })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.row }, { children: [(0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.label }, { children: "\u624B\u673A\u53F7:\u00A0" })), (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.value }, { children: mobile || '--' }))] }))] })) }) }) }), (0, jsx_runtime_1.jsx)(tdesign_react_1.Divider, {}), (0, jsx_runtime_1.jsx)(tdesign_react_1.List, tslib_1.__assign({ className: web_module_less_1.default.relationList }, { children: relationArr === null || relationArr === void 0 ? void 0 : relationArr.map(function (item, index) { return ((0, jsx_runtime_1.jsx)(ListItem, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Checkbox, { checked: item.checked, label: t(entity + ':r.' + item.value), onChange: function (checked) {
                                _this.onChangeValue(item.value, checked);
                            } }) }, index)); }) })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Divider, {}), (0, jsx_runtime_1.jsxs)(tdesign_react_1.Space, tslib_1.__assign({ style: { marginLeft: 20 } }, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", onClick: function () { return _this.onConfirm(); } }, { children: "\u4FDD\u5B58" })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ variant: "outline", theme: "primary", onClick: function () { return _this.navigateBack(); } }, { children: "\u8FD4\u56DE" }))] }))] })) })));
}
exports.default = render;
