"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var Header = antd_1.Layout.Header, Footer = antd_1.Layout.Footer, Sider = antd_1.Layout.Sider, Content = antd_1.Layout.Content;
var info_1 = tslib_1.__importDefault(require("../../components/my/info"));
var web_pc_module_less_1 = tslib_1.__importDefault(require("./web.pc.module.less"));
function Render() {
    return ((0, jsx_runtime_1.jsx)(antd_1.Layout, { children: (0, jsx_runtime_1.jsxs)(antd_1.Layout, { children: [(0, jsx_runtime_1.jsx)(Sider, { children: (0, jsx_runtime_1.jsx)(info_1.default, {}) }), (0, jsx_runtime_1.jsx)(Content, tslib_1.__assign({ className: web_pc_module_less_1.default.content }, { children: "\u6839\u636E\u4E1A\u52A1\u5B9A\u5236\uFF08\u8BF7\u5C06\u8FD9\u4E2A\u9875\u9762\u7684\u903B\u8F91\u590D\u5236\u5230project\u4E0B\u5904\u7406\uFF09" }))] }) }));
}
exports.default = Render;
