"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var data = props.data, methods = props.methods;
    var title = data.title, content = data.content, params = data.params;
    var t = methods.t, goPage = methods.goPage;
    var pathname = params === null || params === void 0 ? void 0 : params.pathname;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ title: "\u6D88\u606F\u8BE6\u60C5", showBack: true }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.warp }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.inner }, { children: [(0, jsx_runtime_1.jsx)("h1", tslib_1.__assign({ className: web_module_less_1.default.title }, { children: title })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.content }, { children: content })), pathname && ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ className: web_module_less_1.default.btn, block: true, type: "primary", onClick: function () {
                                goPage();
                            } }, { children: "\u524D\u5F80" })))] })) })) })) })));
}
exports.default = Render;
