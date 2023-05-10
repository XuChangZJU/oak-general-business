"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var utils_1 = require("oak-frontend-base/lib/utils/utils");
function Render(props) {
    var _a = props.data, oakLoading = _a.oakLoading, oakExecuting = _a.oakExecuting, type = _a.type, expired = _a.expired, expiresAt = _a.expiresAt, user = _a.user, successed = _a.successed, userId = _a.userId, loginUserId = _a.loginUserId;
    var _b = props.methods, t = _b.t, handleConfirm = _b.handleConfirm;
    var V;
    if (successed) {
        V = '成功的';
    }
    else if (expired) {
        V = '过期了';
    }
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.content }, { children: V })), (0, jsx_runtime_1.jsxs)(antd_1.Space, tslib_1.__assign({ direction: "vertical" }, { children: [!oakLoading && !expired && !successed && ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ size: "large", block: true, type: "primary", onClick: function () {
                            handleConfirm();
                        }, disabled: oakExecuting }, { children: "\u9886\u53D6" }))), utils_1.isWeiXin && ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ size: "large", block: true, onClick: function () {
                            WeixinJSBridge.call('closeWindow');
                        } }, { children: "\u5173\u95ED" })))] }))] })));
}
exports.default = Render;
