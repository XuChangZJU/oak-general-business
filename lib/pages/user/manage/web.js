"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_mobile_1 = require("antd-mobile");
var icons_1 = require("@ant-design/icons");
var mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
function render(props) {
    var _a = props.data, stateColor = _a.stateColor, userArr = _a.userArr, isRoot = _a.isRoot;
    var _b = props.methods, onCellClicked = _b.onCellClicked, t = _b.t, goNewUser = _b.goNewUser;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: mobile_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.List, { children: userArr === null || userArr === void 0 ? void 0 : userArr.map(function (ele, index) {
                    return ((0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { onClick: function () { return onCellClicked(ele.id); }, prefix: (0, jsx_runtime_1.jsx)(antd_mobile_1.Avatar, { className: mobile_module_less_1.default.avatar, src: ele.avatar }), title: (0, jsx_runtime_1.jsx)("div", { children: ele.name || '--' }), description: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: mobile_module_less_1.default.description }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: mobile_module_less_1.default.row }, { children: [(0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: mobile_module_less_1.default.label }, { children: "\u6635\u79F0:\u00A0" })), (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: mobile_module_less_1.default.value }, { children: ele.nickname || '--' }))] })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: mobile_module_less_1.default.row }, { children: [(0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: mobile_module_less_1.default.label }, { children: "\u624B\u673A\u53F7:\u00A0" })), (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: mobile_module_less_1.default.value }, { children: ele.mobile || '--' }))] })), (0, jsx_runtime_1.jsx)(antd_mobile_1.Tag, tslib_1.__assign({ color: stateColor[ele.userState] }, { children: ele.userState
                                        ? t("user:v.userState.".concat(ele.userState))
                                        : '未知' }))] })) }, index));
                }) }), isRoot && ((0, jsx_runtime_1.jsx)(antd_mobile_1.FloatingBubble, tslib_1.__assign({ axis: "x", magnetic: "x", style: {
                    '--initial-position-bottom': '24px',
                    '--initial-position-right': '24px',
                    '--edge-distance': '24px',
                }, onClick: function () {
                    goNewUser();
                } }, { children: (0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}) })))] })));
}
exports.default = render;
