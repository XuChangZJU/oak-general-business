"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_mobile_react_1 = require("tdesign-mobile-react");
var tdesign_icons_react_1 = require("tdesign-icons-react");
var CustomTag = tdesign_mobile_react_1.Tag;
function render() {
    var _this = this;
    var t = this.t;
    var event = this.props.event;
    var _a = this.state, stateColor = _a.stateColor, userArr = _a.userArr;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ style: { height: '100vh' } }, { children: [userArr === null || userArr === void 0 ? void 0 : userArr.map(function (ele, index) {
                return ((0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Cell, { onClick: function () { return _this.onCellClicked(ele.id, event); }, image: (0, jsx_runtime_1.jsx)("img", { className: "avatar", src: ele.avatar }), title: ele.name || '未设置', description: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "mobile" }, { children: ["\u624B\u673A\u53F7\uFF1A", ele.mobile || '未设置'] })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { display: 'flex' } }, { children: (0, jsx_runtime_1.jsx)(CustomTag, tslib_1.__assign({ theme: stateColor[ele.userState], className: "", style: {} }, { children: t("user:v.userState.".concat(ele.userState)) })) }))] }) }, index));
            }), (0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Fab, { style: {
                    bottom: 50,
                    right: 16,
                }, buttonProps: {
                    theme: 'primary',
                }, onClick: function (event) {
                    _this.goNewUser();
                }, icon: (0, jsx_runtime_1.jsx)(tdesign_icons_react_1.Icon, { name: "add" }) })] })));
}
exports.default = render;
