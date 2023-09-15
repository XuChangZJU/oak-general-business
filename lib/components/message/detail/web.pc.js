"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { data, methods } = props;
    const { title, content, router } = data;
    const { t, goPage } = methods;
    const pathname = router?.pathname;
    return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.warp, children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.inner, children: [(0, jsx_runtime_1.jsx)("h1", { className: web_module_less_1.default.title, children: title }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.content, children: content }), pathname && ((0, jsx_runtime_1.jsx)(antd_1.Button, { className: web_module_less_1.default.btn, block: true, type: "primary", onClick: () => {
                            goPage();
                        }, children: "\u524D\u5F80" }))] }) }) }));
}
exports.default = Render;
