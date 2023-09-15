"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const validator_1 = require("oak-domain/lib/utils/validator");
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    const { mobile, captcha, counter } = props.data;
    const { t, setMobile, setCaptcha, sendCaptcha, loginByMobile } = props.methods;
    const validMobile = (0, validator_1.isMobile)(mobile);
    const validCaptcha = (0, validator_1.isCaptcha)(captcha);
    const allowSubmit = validMobile && validCaptcha;
    const LoginCaptcha = ((0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "mobile", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, value: mobile, "data-attr": "mobile", type: "tel", maxLength: 11, prefix: (0, jsx_runtime_1.jsx)(icons_1.MobileOutlined, {}), placeholder: t('placeholder.Mobile'), size: "large", onChange: (e) => {
                        setMobile(e.target.value);
                    }, className: web_module_less_1.default['loginbox-input'] }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "captcha", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, value: captcha, "data-attr": "captcha", 
                    // type="number"
                    maxLength: 4, placeholder: t('placeholder.Captcha'), size: "large", onChange: (e) => {
                        setCaptcha(e.target.value);
                    }, className: web_module_less_1.default['loginbox-input'], suffix: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", disabled: !validMobile || counter > 0, onClick: () => sendCaptcha(), children: counter > 0 ? `${counter}秒后可重发` : t('Send') }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { block: true, size: "large", type: "primary", htmlType: "submit", disabled: !allowSubmit, onClick: () => loginByMobile(), children: t('Login') }) })] }));
    return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default['loginbox-main'], children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default['loginbox-wrap'], children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default['loginbox-hd'], children: "\u4E3A\u4E86\u66F4\u597D\u7684\u4F53\u9A8C\uFF0C\u8BF7\u7ED1\u5B9A\u624B\u673A\u53F7" }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default['loginbox-bd'], children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default['loginbox-mobile'], children: LoginCaptcha }) })] }) }));
}
exports.default = render;
