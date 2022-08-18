"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_react_1 = require("tdesign-react");
var utils_1 = require("oak-frontend-base/lib/utils/utils");
function render() {
    var error = this.state.error;
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        } }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ style: {
                padding: 16,
            } }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: {
                        fontSize: 18,
                        marginBottom: 16,
                    } }, { children: error })), utils_1.isWeiXin && ((0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ onClick: function () {
                        WeixinJSBridge.call('closeWindow');
                    } }, { children: "\u5173\u95ED" })))] })) })));
}
exports.default = render;
