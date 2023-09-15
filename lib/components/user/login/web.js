"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
// @ts-nocheck
// Segmented这个对象在antd里的声明是错误的
const react_1 = require("react");
const validator_1 = require("oak-domain/lib/utils/validator");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const weChatLoginQrCode_1 = tslib_1.__importDefault(require("../../common/weChatLoginQrCode"));
const qrCode_1 = tslib_1.__importDefault(require("../../wechatLogin/qrCode"));
const weChatLoginGrant_1 = tslib_1.__importDefault(require("../../common/weChatLoginGrant"));
function Render(props) {
    const { data, methods } = props;
    const { onlyCaptcha, onlyPassword, width, counter, loading, loginMode, appId, domain, isSupportWechat, isSupportWechatPublic, isSupportGrant, disabled, redirectUri, url, } = data;
    const { sendCaptcha, loginByMobile, t, setLoginMode } = methods;
    const [mobile, setMobile] = (0, react_1.useState)('');
    const [captcha, setCaptcha] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const validMobile = (0, validator_1.isMobile)(mobile);
    const validCaptcha = (0, validator_1.isCaptcha)(captcha);
    const validPassword = (0, validator_1.isPassword)(password);
    const allowSubmit = validMobile && (validCaptcha || validPassword);
    const LoginPassword = ((0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "mobile", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, value: mobile, type: "tel", size: "large", maxLength: 11, prefix: (0, jsx_runtime_1.jsx)(icons_1.MobileOutlined, {}), placeholder: t('placeholder.Mobile'), onChange: (e) => {
                        setMobile(e.target.value);
                    }, className: web_module_less_1.default['loginbox-input'] }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "password", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, size: "large", value: password, prefix: (0, jsx_runtime_1.jsx)(icons_1.LockOutlined, {}), type: "password", placeholder: t('placeholder.Password'), onChange: (e) => {
                        setPassword(e.target.value);
                    }, className: web_module_less_1.default['loginbox-input'] }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { block: true, size: "large", type: "primary", disabled: !!disabled || !allowSubmit || loading, loading: loading, onClick: () => loginByMobile(mobile, password, captcha), children: t('Login') }) }) })] }));
    const LoginCaptcha = ((0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "mobile", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, value: mobile, type: "tel", size: "large", maxLength: 11, prefix: (0, jsx_runtime_1.jsx)(icons_1.MobileOutlined, {}), placeholder: t('placeholder.Mobile'), onChange: (e) => {
                        setMobile(e.target.value);
                    }, className: web_module_less_1.default['loginbox-input'] }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "captcha", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, value: captcha, size: "large", maxLength: 4, placeholder: t('placeholder.Captcha'), onChange: (e) => {
                        setCaptcha(e.target.value);
                    }, className: web_module_less_1.default['loginbox-input'], suffix: (0, jsx_runtime_1.jsx)(antd_1.Button, { size: "small", type: "link", disabled: !!disabled || !validMobile || counter > 0, onClick: () => sendCaptcha(mobile), children: counter > 0
                            ? counter + t('resendAfter')
                            : t('Send') }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { block: true, size: "large", type: "primary", disabled: disabled || !allowSubmit || loading, loading: loading, onClick: () => loginByMobile(mobile, password, captcha), children: t('Login') }) })] }));
    const [options, setOptions] = (0, react_1.useState)([]);
    const getOptions = () => {
        const newOptions = [];
        if (isSupportGrant) {
            newOptions.push({
                label: 'WeChatLoginByGrant',
                value: 1,
            });
        }
        else if (onlyPassword) {
            newOptions.push({
                label: 'inPassword',
                value: 1,
            });
        }
        else if (onlyCaptcha) {
            newOptions.push({
                label: 'inCaptcha',
                value: 2,
            });
        }
        else {
            newOptions.push({
                label: 'inPassword',
                value: 1,
            });
            newOptions.push({
                label: 'inCaptcha',
                value: 2,
            });
            if (isSupportWechat || isSupportWechatPublic) {
                newOptions.push({
                    label: 'inQrCode',
                    value: 3,
                });
            }
        }
        setOptions(newOptions);
    };
    (0, react_1.useEffect)(() => {
        getOptions();
    }, []);
    (0, react_1.useEffect)(() => {
        getOptions();
    }, [
        isSupportGrant,
        onlyPassword,
        onlyCaptcha,
        isSupportWechat,
        isSupportWechatPublic,
    ]);
    // 构建微信扫码所需state参数，url存在，扫码后重定向url，否则返回上一页
    let state = '';
    if (url) {
        state = encodeURIComponent(decodeURIComponent(url));
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default['loginbox-main'], children: (0, jsx_runtime_1.jsxs)("div", { className: (0, classnames_1.default)(web_module_less_1.default['loginbox-wrap'], {
                [web_module_less_1.default['loginbox-wrap__mobile']]: width === 'xs',
            }), children: [options?.length > 1 && ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default['loginbox-hd'], children: (0, jsx_runtime_1.jsx)(antd_1.Segmented, { className: web_module_less_1.default.segmented, value: loginMode, block: true, onChange: setLoginMode, options: options.map((ele) => ({
                            value: ele.value,
                            label: t(`${ele.label}`),
                        })) }) })), (0, jsx_runtime_1.jsx)("div", { className: (0, classnames_1.default)(web_module_less_1.default['loginbox-bd'], {
                        [web_module_less_1.default['loginbox-bd__grant']]: isSupportGrant,
                    }), children: isSupportGrant ? ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default['loginbox-grant'], children: (0, jsx_runtime_1.jsx)(weChatLoginGrant_1.default, { disabled: !!disabled, disableText: disabled, appId: appId, scope: "snsapi_userinfo", redirectUri: redirectUri, state: state }) })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default['loginbox-password'], style: {
                                    display: loginMode === 1 ? 'block' : 'none',
                                }, children: LoginPassword }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default['loginbox-mobile'], style: {
                                    display: loginMode === 2 ? 'block' : 'none',
                                }, children: LoginCaptcha }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default['loginbox-qrcode'], style: {
                                    display: loginMode === 3 ? 'block' : 'none',
                                }, children: [isSupportWechat && ((0, jsx_runtime_1.jsx)(weChatLoginQrCode_1.default, { disabled: disabled, disableText: disabled, appId: appId, scope: "snsapi_login", redirectUri: redirectUri, state: state, href: "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30KLmltcG93ZXJCb3ggLmluZm8ge3dpZHRoOiAyMDBweDt9Ci5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30gCg==" })), isSupportWechatPublic && ((0, jsx_runtime_1.jsx)(qrCode_1.default, { type: "login", oakPath: "$login-wechatLogin/qrCode", oakAutoUnmount: true, url: state }))] })] })) })] }) }));
}
exports.default = Render;
