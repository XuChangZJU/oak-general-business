"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_mobile_react_1 = require("tdesign-mobile-react");
function render() {
    var t = this.t;
    var _a = this.state, nickname = _a.nickname, avatar = _a.avatar, name = _a.name, mobile = _a.mobile, userState = _a.userState, idState = _a.idState, stateColor = _a.stateColor, idStateColor = _a.idStateColor, mobileCount = _a.mobileCount;
    var getMobile = function () {
        if (mobileCount > 1) {
            return "".concat(mobileCount, "\u6761\u624B\u673A\u53F7");
        }
        else if (mobileCount === 1) {
            return mobile;
        }
        else {
            return '未设置';
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Cell, { title: "\u5934\u50CF", note: avatar ? (0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Avatar, { image: avatar }) : '未设置' }), (0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Cell, { title: "\u6635\u79F0", note: nickname || '未设置' }), (0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Cell, { title: "\u59D3\u540D", note: name || '未设置' }), (0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Cell, { title: "\u624B\u673A\u53F7", note: getMobile() }), (0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Cell, { title: "\u7528\u6237\u72B6\u6001", note: (0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Tag, tslib_1.__assign({ theme: stateColor[userState] }, { children: t("user:v.userState.".concat(userState)) })) }), (0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Cell, { title: "\u5B9E\u540D\u9A8C\u8BC1", note: (0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Tag, tslib_1.__assign({ theme: idStateColor[idState] }, { children: t("user:v.idState.".concat(idState)) })) })] }));
}
exports.default = render;
