"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var validator_1 = require("oak-domain/lib/utils/validator");
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
function render(props) {
    var _a = props.data, mobile = _a.mobile, captcha = _a.captcha, password = _a.password, counter = _a.counter;
    var _b = props.methods, t = _b.t, setMobile = _b.setMobile, setCaptcha = _b.setCaptcha, sendCaptcha = _b.sendCaptcha, loginByMobile = _b.loginByMobile;
    var validMobile = (0, validator_1.isMobile)(mobile);
    var validCaptcha = (0, validator_1.isCaptcha)(captcha);
    var allowSubmit = validMobile && validCaptcha;
    var LoginCaptcha = ((0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "mobile", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, value: mobile, "data-attr": "mobile", type: "tel", maxLength: 11, prefix: (0, jsx_runtime_1.jsx)(icons_1.MobileOutlined, {}), placeholder: t('placeholder.Mobile'), size: "large", onChange: function (e) {
                        setMobile(e.target.value);
                    }, className: mobile_module_less_1.default['loginbox-input'] }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "captcha", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, value: captcha, "data-attr": "captcha", 
                    // type="number"
                    maxLength: 4, placeholder: t('placeholder.Captcha'), size: "large", onChange: function (e) {
                        setCaptcha(e.target.value);
                    }, className: mobile_module_less_1.default['loginbox-input'], suffix: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", disabled: !validMobile || counter > 0, onClick: function () { return sendCaptcha(); }, children: counter > 0 ? "".concat(counter, "\u79D2\u540E\u53EF\u91CD\u53D1") : t('Send') }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { block: true, size: "large", type: "primary", htmlType: "submit", disabled: !allowSubmit, onClick: function () { return loginByMobile(); }, children: t('Login') }) })] }));
    return ((0, jsx_runtime_1.jsx)("div", { className: mobile_module_less_1.default['loginbox-main'], children: (0, jsx_runtime_1.jsxs)("div", { className: mobile_module_less_1.default['loginbox-wrap'], children: [(0, jsx_runtime_1.jsx)("div", { className: mobile_module_less_1.default['loginbox-hd'], children: "\u4E3A\u4E86\u66F4\u597D\u7684\u4F53\u9A8C\uFF0C\u8BF7\u7ED1\u5B9A\u624B\u673A\u53F7" }), (0, jsx_runtime_1.jsx)("div", { className: mobile_module_less_1.default['loginbox-bd'], children: (0, jsx_runtime_1.jsx)("div", { className: mobile_module_less_1.default['loginbox-mobile'], children: LoginCaptcha }) })] }) }));
}
exports.default = render;
