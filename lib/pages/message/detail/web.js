"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
function Render(props) {
    var data = props.data, methods = props.methods;
    var title = data.title, content = data.content, router = data.router;
    var t = methods.t, goPage = methods.goPage;
    var pathname = router === null || router === void 0 ? void 0 : router.pathname;
    return ((0, jsx_runtime_1.jsxs)("div", { className: mobile_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)("h1", { className: mobile_module_less_1.default.title, children: title }), (0, jsx_runtime_1.jsx)("div", { className: mobile_module_less_1.default.content, children: content }), pathname && ((0, jsx_runtime_1.jsx)(antd_1.Button, { className: mobile_module_less_1.default.btn, block: true, type: "primary", onClick: function () {
                    goPage();
                }, children: "\u524D\u5F80" }))] }));
}
exports.default = Render;
