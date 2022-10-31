"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var validator_1 = require("oak-domain/lib/utils/validator");
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render() {
    var _this = this;
    var _a = this.state, mobile = _a.mobile, captcha = _a.captcha, password = _a.password, counter = _a.counter;
    var validMobile = (0, validator_1.isMobile)(mobile);
    var validCaptcha = (0, validator_1.isCaptcha)(captcha);
    var allowSubmit = validMobile && validCaptcha;
    var LoginCaptcha = ((0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ name: "mobile" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, value: mobile, "data-attr": "mobile", type: "tel", maxLength: 11, prefix: (0, jsx_runtime_1.jsx)(icons_1.MailOutlined, {}), placeholder: this.t('placeholder.Mobile'), size: "large", onChange: function (e) {
                        _this.setState({
                            mobile: e.target.value,
                        });
                    }, className: web_module_less_1.default['loginbox-input'] }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ name: "captcha" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, value: captcha, "data-attr": "captcha", 
                    // type="number"
                    maxLength: 4, placeholder: this.t('placeholder.Captcha'), size: "large", onChange: function (e) {
                        _this.setState({
                            captcha: e.target.value,
                        });
                    }, className: web_module_less_1.default['loginbox-input'], suffix: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", disabled: !validMobile || counter > 0, onClick: function () { return _this.sendCaptcha(); } }, { children: counter > 0
                            ? "".concat(counter, "\u79D2\u540E\u53EF\u91CD\u53D1")
                            : this.t('Send') })) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ block: true, size: "large", type: "primary", htmlType: "submit", disabled: !allowSubmit, onClick: function () { return _this.loginByMobile(); } }, { children: this.t('Login') })) })] })));
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-main'] }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-wrap'] }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-hd'] }, { children: "\u4E3A\u4E86\u66F4\u597D\u7684\u4F53\u9A8C\uFF0C\u8BF7\u5B8C\u5584\u8D26\u53F7\u4FE1\u606F" })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-bd'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-mobile'] }, { children: LoginCaptcha })) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-ft'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-ft__btn'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-protocal'] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Checkbox, { children: (0, jsx_runtime_1.jsx)("div", { children: "\u9605\u8BFB\u5E76\u540C\u610F \u670D\u52A1\u6761\u6B3E \u548C \u9690\u79C1\u653F\u7B56" }) }) })) })) }))] })) })));
}
exports.default = render;
