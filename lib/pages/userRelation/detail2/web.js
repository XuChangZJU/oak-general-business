"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_mobile_react_1 = require("tdesign-mobile-react");
var tdesign_react_1 = require("tdesign-react");
function render() {
    var _this = this;
    var t = this.t;
    var entity = this.props.entity;
    var _a = this.state, avatar = _a.avatar, nickname = _a.nickname, name = _a.name, mobile = _a.mobile, relationArr = _a.relationArr;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Cell, { title: nickname || '未设置', image: (0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Image, { src: avatar, alt: "\u5934\u50CF", style: { width: 80, height: 80 } }), description: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "description" }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "name" }, { children: ["\u59D3\u540D: ", name || '未设置'] })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "mobile" }, { children: ["\u624B\u673A: ", mobile || '未设置'] }))] })) }), relationArr === null || relationArr === void 0 ? void 0 : relationArr.map(function (item) { return ((0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Checkbox, { checked: item.checked, label: t(entity + ':r.' + item.value), onChange: function (checked) {
                    _this.onChangeValue(item.value, checked);
                } })); }), (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", block: true, onClick: function () { return _this.onConfirm(); } }, { children: "\u4FDD\u5B58" }))] }));
}
exports.default = render;
