"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var validator_1 = require("oak-domain/lib/utils/validator");
var tdesign_icons_react_1 = require("tdesign-icons-react");
var tdesign_react_1 = require("tdesign-react");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var FormItem = tdesign_react_1.Form.FormItem;
function render() {
    var _this = this;
    var t = this.t;
    var _a = this.state, mobile = _a.mobile, captcha = _a.captcha, password = _a.password, counter = _a.counter;
    var validMobile = (0, validator_1.isMobile)(mobile);
    var validCaptcha = (0, validator_1.isCaptcha)(captcha);
    var allowSubmit = validMobile && validCaptcha;
    var LoginCaptcha = ((0, jsx_runtime_1.jsxs)(tdesign_react_1.Form, tslib_1.__assign({ colon: true, labelWidth: 0 }, { children: [(0, jsx_runtime_1.jsx)(FormItem, tslib_1.__assign({ name: "mobile" }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Input, { clearable: true, value: mobile, "data-attr": "mobile", type: "tel", maxlength: 11, prefixIcon: (0, jsx_runtime_1.jsx)(tdesign_icons_react_1.MobileIcon, {}), placeholder: t('placeholder.Mobile'), size: "large", onChange: function (value, context) {
                        _this.setState({
                            mobile: value,
                        });
                    }, className: web_module_less_1.default['loginbox-input'] }) })), (0, jsx_runtime_1.jsx)(FormItem, tslib_1.__assign({ name: "captcha" }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Input, { clearable: true, value: captcha, "data-attr": "captcha", 
                    // type="number"
                    maxlength: 4, placeholder: t('placeholder.Captcha'), size: "large", onChange: function (value, context) {
                        _this.setState({
                            captcha: value,
                        });
                    }, className: web_module_less_1.default['loginbox-input'], suffix: (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ variant: "text", size: "small", theme: "primary", disabled: !validMobile || counter > 0, onClick: function () { return _this.sendCaptcha(); } }, { children: counter > 0 ? "".concat(counter, "\u79D2\u540E\u53EF\u91CD\u53D1") : t('Send') })) }) })), (0, jsx_runtime_1.jsx)(FormItem, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ block: true, size: "large", theme: "primary", type: "submit", disabled: !allowSubmit, onClick: function () { return _this.loginByMobile(); } }, { children: t('Log in') })) })] })));
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-main'] }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-wrap'] }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-hd'] }, { children: "\u4E3A\u4E86\u66F4\u597D\u7684\u4F53\u9A8C\uFF0C\u8BF7\u5B8C\u5584\u8D26\u53F7\u4FE1\u606F" })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-bd'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-mobile'] }, { children: LoginCaptcha })) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-ft'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-ft__btn'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-protocal'] }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Checkbox, { label: (0, jsx_runtime_1.jsx)("div", { children: "\u9605\u8BFB\u5E76\u540C\u610F \u670D\u52A1\u6761\u6B3E \u548C \u9690\u79C1\u653F\u7B56" }) }) })) })) }))] })) })));
}
exports.default = render;
