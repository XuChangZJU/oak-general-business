"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var utils_1 = require("oak-frontend-base/lib/utils/utils");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render() {
    var error = this.state.error;
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ style: {
                padding: 16,
            } }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: {
                        fontSize: 18,
                        marginBottom: 16,
                    } }, { children: error })), utils_1.isWeiXin && ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: 'primary', onClick: function () {
                        WeixinJSBridge.call('closeWindow');
                    } }, { children: "\u5173\u95ED" })))] })) })));
}
exports.default = render;
