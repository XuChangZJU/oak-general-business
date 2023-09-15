"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { editor, title, author, abstract, content } = props.data;
    return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.content, children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.editorContainer, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.titleContainer, children: (0, jsx_runtime_1.jsx)("span", { className: web_module_less_1.default.title, children: title }) }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.authorContainer, children: (0, jsx_runtime_1.jsx)("span", { className: web_module_less_1.default.author, children: author }) }), (0, jsx_runtime_1.jsx)("div", { id: "article-content" })] }) }) }));
}
exports.default = Render;
