"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const { Header, Footer, Sider, Content } = antd_1.Layout;
const info_1 = tslib_1.__importDefault(require("../../components/my/info"));
const web_pc_module_less_1 = tslib_1.__importDefault(require("./web.pc.module.less"));
function Render() {
    return ((0, jsx_runtime_1.jsx)(antd_1.Layout, { children: (0, jsx_runtime_1.jsxs)(antd_1.Layout, { children: [(0, jsx_runtime_1.jsx)(Sider, { children: (0, jsx_runtime_1.jsx)(info_1.default, {}) }), (0, jsx_runtime_1.jsx)(Content, { className: web_pc_module_less_1.default.content, children: "\u6839\u636E\u4E1A\u52A1\u5B9A\u5236\uFF08\u8BF7\u5C06\u8FD9\u4E2A\u9875\u9762\u7684\u903B\u8F91\u590D\u5236\u5230project\u4E0B\u5904\u7406\uFF09" })] }) }));
}
exports.default = Render;
