"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var validator_1 = require("oak-domain/lib/utils/validator");
var tdesign_icons_react_1 = require("tdesign-icons-react");
var tdesign_react_1 = require("tdesign-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var TabPanel = tdesign_react_1.Tabs.TabPanel;
var FormItem = tdesign_react_1.Form.FormItem;
function render() {
    var _this = this;
    var t = this.t;
    var _a = this.props, onlyCaptcha = _a.onlyCaptcha, onlyPassword = _a.onlyPassword, width = _a.width;
    var _b = this.state, mobile = _b.mobile, captcha = _b.captcha, password = _b.password, counter = _b.counter, _c = _b.tabValue, tabValue = _c === void 0 ? 1 : _c;
    var validMobile = (0, validator_1.isMobile)(mobile);
    var validCaptcha = (0, validator_1.isCaptcha)(captcha);
    var validPassword = (0, validator_1.isPassword)(password);
    var allowSubmit = validMobile && (validCaptcha || validPassword);
    var LoginPassword = ((0, jsx_runtime_1.jsxs)(tdesign_react_1.Form, tslib_1.__assign({ colon: true, labelWidth: 0 }, { children: [(0, jsx_runtime_1.jsx)(FormItem, tslib_1.__assign({ name: "mobile" }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Input, { clearable: true, value: mobile, type: "tel", "data-attr": "mobile", maxlength: 11, prefixIcon: (0, jsx_runtime_1.jsx)(tdesign_icons_react_1.MobileIcon, {}), placeholder: t('placeholder.Mobile'), size: "large", onChange: function (value, context) {
                        _this.setState({
                            mobile: value,
                        });
                    }, className: web_module_less_1.default['loginbox-input'] }) })), (0, jsx_runtime_1.jsx)(FormItem, tslib_1.__assign({ name: "password" }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Input, { clearable: true, value: password, "data-attr": "password", prefixIcon: (0, jsx_runtime_1.jsx)(tdesign_icons_react_1.LockOnIcon, {}), type: "password", placeholder: t('placeholder.Password'), size: "large", onChange: function (value, context) {
                        _this.setState({
                            password: value,
                        });
                    }, className: web_module_less_1.default['loginbox-input'] }) })), (0, jsx_runtime_1.jsx)(FormItem, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ block: true, size: "large", theme: "primary", type: "submit", disabled: !allowSubmit, onClick: function () { return _this.loginByMobile(); } }, { children: t('Log in') })) })] })));
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
    if (onlyCaptcha) {
        return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-main'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-wrap'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-bd'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: (0, classnames_1.default)(web_module_less_1.default['loginbox-mobile'], web_module_less_1.default['loginbox-only']) }, { children: LoginCaptcha })) })) })) })));
    }
    else if (onlyPassword) {
        return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-main'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-wrap'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-bd'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: (0, classnames_1.default)(web_module_less_1.default['loginbox-password'], web_module_less_1.default['loginbox-only']) }, { children: LoginPassword })) })) })) })));
    }
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-main'] }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-wrap'] }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-hd'] }, { children: (0, jsx_runtime_1.jsxs)(tdesign_react_1.Radio.Group, tslib_1.__assign({ variant: "default-filled", defaultValue: tabValue, onChange: function (value) {
                            _this.setState({
                                tabValue: value,
                            });
                        }, className: web_module_less_1.default['loginbox-hd__tab'] }, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Radio.Button, tslib_1.__assign({ value: 1, className: (0, classnames_1.default)(web_module_less_1.default['loginbox-hd__tabcon'], {
                                    current: tabValue === 1,
                                }) }, { children: t('in Password') })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Radio.Button, tslib_1.__assign({ value: 2, className: (0, classnames_1.default)(web_module_less_1.default['loginbox-hd__tabcon'], {
                                    current: tabValue === 2,
                                }) }, { children: t('in Captcha') })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Radio.Button, tslib_1.__assign({ value: 3, className: (0, classnames_1.default)(web_module_less_1.default['loginbox-hd__tabcon'], {
                                    current: tabValue === 3,
                                }) }, { children: t('in QrCode') }))] })) })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-bd'] }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-password'], style: tabValue === 1 ? {} : { display: 'none' } }, { children: LoginPassword })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-mobile'], style: tabValue === 2 ? {} : { display: 'none' } }, { children: LoginCaptcha })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-qrcode'], style: tabValue === 3 ? {} : { display: 'none' } }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-qrcode__sociallogin'] }, { children: ["\u8BF7\u4F7F\u7528\u5FAE\u4FE1\u626B\u4E00\u626B\u767B\u5F55", (0, jsx_runtime_1.jsxs)("span", tslib_1.__assign({ className: web_module_less_1.default['loginbox-qrcode__refresh'], onClick: function () {
                                                _this.setMessage({
                                                    type: 'success',
                                                    content: '刷新二维码',
                                                });
                                            } }, { children: ["\u5237\u65B0", (0, jsx_runtime_1.jsx)(tdesign_icons_react_1.Icon, { name: "refresh", className: web_module_less_1.default['loginbox-qrcode__refresh-icon'] })] }))] })), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default['loginbox-qrcode__iframe'] })] }))] })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-ft'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-ft__btn'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-protocal'] }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Checkbox, { label: (0, jsx_runtime_1.jsx)("div", { children: "\u9605\u8BFB\u5E76\u540C\u610F \u670D\u52A1\u6761\u6B3E \u548C \u9690\u79C1\u653F\u7B56" }) }) })) })) }))] })) })));
}
exports.default = render;
