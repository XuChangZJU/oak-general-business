"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    var methods = props.methods, data = props.data;
    var t = methods.t;
    var title = data.title, author = data.author, abstract = data.abstract, content = data.content;
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.content }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.editorContainer }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.titleContainer }, { children: (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.title }, { children: title })) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.authorContainer }, { children: (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.author }, { children: author })) })), (0, jsx_runtime_1.jsx)("div", { id: "article-content" })] })) })) })));
}
exports.default = render;
