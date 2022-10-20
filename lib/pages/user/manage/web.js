"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_react_1 = require("tdesign-react");
var tdesign_icons_react_1 = require("tdesign-icons-react");
var mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
var randomUser_1 = require("../../../utils/randomUser");
var ListItem = tdesign_react_1.List.ListItem, ListItemMeta = tdesign_react_1.List.ListItemMeta;
function render() {
    var _this = this;
    var event = this.props.event;
    var _a = this.state, stateColor = _a.stateColor, userArr = _a.userArr;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: mobile_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.List, tslib_1.__assign({ split: true }, { children: userArr === null || userArr === void 0 ? void 0 : userArr.map(function (ele, index) {
                    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ onClick: function () { return _this.onCellClicked(ele.id, event); } }, { children: (0, jsx_runtime_1.jsx)(ListItem, tslib_1.__assign({ action: (0, jsx_runtime_1.jsx)(tdesign_icons_react_1.Icon, { size: 18, name: "chevron-right" }) }, { children: (0, jsx_runtime_1.jsx)(ListItemMeta, { image: ele.avatar ? ((0, jsx_runtime_1.jsx)(tdesign_react_1.Avatar, { className: mobile_module_less_1.default.avatar, image: ele.avatar })) : ((0, jsx_runtime_1.jsx)(tdesign_react_1.Avatar, tslib_1.__assign({ className: mobile_module_less_1.default.avatar }, { children: (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: mobile_module_less_1.default.text }, { children: (0, randomUser_1.getName)(ele.name) })) }))), title: (0, jsx_runtime_1.jsx)("div", { children: ele.name || '--' }), description: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: mobile_module_less_1.default.description }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: mobile_module_less_1.default.row }, { children: [(0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: mobile_module_less_1.default.label }, { children: "\u6635\u79F0:\u00A0" })), (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: mobile_module_less_1.default.value }, { children: ele.nickname || '--' }))] })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: mobile_module_less_1.default.row }, { children: [(0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: mobile_module_less_1.default.label }, { children: "\u624B\u673A\u53F7:\u00A0" })), (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: mobile_module_less_1.default.value }, { children: ele.mobile || '--' }))] })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Tag, tslib_1.__assign({ theme: stateColor[ele.userState] }, { children: ele.userState
                                                ? _this.t("user:v.userState.".concat(ele.userState))
                                                : '未知' }))] })) }) })) })));
                }) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: mobile_module_less_1.default.fab }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, { size: "large", shape: "circle", onClick: function (event) {
                        _this.goNewUser();
                    }, icon: (0, jsx_runtime_1.jsx)(tdesign_icons_react_1.Icon, { name: "add" }) }) }))] })));
}
exports.default = render;
