"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_icons_react_1 = require("tdesign-icons-react");
function render() {
    var _a = this.state, oakLoading = _a.oakLoading, isExist = _a.isExist, expired = _a.expired;
    var V;
    if (oakLoading) {
        V = ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "circle-view" }, { children: [(0, jsx_runtime_1.jsx)(tdesign_icons_react_1.Icon, { name: "loading", size: "40", className: "icon" }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "text" }, { children: "\u52A0\u8F7D\u4E2D" }))] })));
    }
    else if (!isExist) {
        V = ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "circle-view" }, { children: [(0, jsx_runtime_1.jsx)(tdesign_icons_react_1.Icon, { name: "error", size: "40", className: "icon" }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "text" }, { children: "\u4E8C\u7EF4\u7801\u975E\u6CD5" }))] })));
    }
    else if (expired) {
        V = ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "circle-view" }, { children: [(0, jsx_runtime_1.jsx)(tdesign_icons_react_1.Icon, { name: "warning", size: "40", className: "icon" }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "text" }, { children: "\u4E8C\u7EF4\u7801\u5DF2\u8FC7\u671F" }))] })));
    }
    else {
        V = ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "circle-view" }, { children: [(0, jsx_runtime_1.jsx)(tdesign_icons_react_1.Icon, { name: "loading", size: "40", className: "icon" }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "text" }, { children: "\u8DF3\u8F6C\u4E2D" }))] })));
    }
    return (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "page-body" }, { children: V }));
}
exports.default = render;
