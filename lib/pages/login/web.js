"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var validator_1 = require("oak-domain/lib/utils/validator");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var utils_1 = require("oak-frontend-base/lib/utils/utils");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var weChatLoginQrCode_1 = tslib_1.__importDefault(require("../../components/common/weChatLoginQrCode"));
function render(props) {
    var _a = props.data, onlyCaptcha = _a.onlyCaptcha, onlyPassword = _a.onlyPassword, counter = _a.counter, loading = _a.loading, appId = _a.appId;
    var _b = props.methods, sendCaptcha = _b.sendCaptcha, loginByMobileWeb = _b.loginByMobileWeb, t = _b.t, goPage = _b.goPage;
    var _c = tslib_1.__read((0, react_1.useState)(false), 2), loginAgreed = _c[0], setLoginAgreed = _c[1];
    var _d = tslib_1.__read((0, react_1.useState)(undefined), 2), mobile = _d[0], setMobile = _d[1];
    var _e = tslib_1.__read((0, react_1.useState)(undefined), 2), captcha = _e[0], setCaptcha = _e[1];
    var _f = tslib_1.__read((0, react_1.useState)(undefined), 2), password = _f[0], setPassword = _f[1];
    var _g = tslib_1.__read((0, react_1.useState)(1), 2), loginMode = _g[0], setLoginMode = _g[1];
    (0, react_1.useEffect)(function () {
        if (props.data.loginMode && props.data.loginMode !== loginMode) {
            setLoginMode(props.data.loginMode);
        }
        if (props.data.loginAgreed && props.data.loginAgreed !== loginAgreed) {
            setLoginAgreed(props.data.loginAgreed);
        }
    }, [props.data.loginMode, props.data.loginAgreed]);
    var validMobile = mobile && (0, validator_1.isMobile)(mobile);
    var validCaptcha = captcha && (0, validator_1.isCaptcha)(captcha);
    var validPassword = password && (0, validator_1.isPassword)(password);
    var allowSubmit = validMobile && (validCaptcha || validPassword);
    var LoginPassword = ((0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ name: "mobile" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, value: mobile, type: "tel", size: "large", maxLength: 11, prefix: (0, jsx_runtime_1.jsx)(icons_1.MobileOutlined, {}), placeholder: t('placeholder.Mobile'), onChange: function (e) { return setMobile(e.target.value); }, className: web_module_less_1.default['loginbox-input'] }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ name: "password" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, size: "large", value: password, prefix: (0, jsx_runtime_1.jsx)(icons_1.LockOutlined, {}), type: "password", placeholder: t('placeholder.Password'), onChange: function (e) { return setPassword(e.target.value); }, className: web_module_less_1.default['loginbox-input'] }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ block: true, size: "large", type: "primary", disabled: !allowSubmit || loading, loading: loading, onClick: function () { return loginByMobileWeb(mobile, loginAgreed, password, captcha, loginMode); } }, { children: t('Login') })) }) })] })));
    var LoginCaptcha = ((0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ name: "mobile" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, value: mobile, type: "tel", size: "large", maxLength: 11, prefix: (0, jsx_runtime_1.jsx)(icons_1.MobileOutlined, {}), placeholder: t('placeholder.Mobile'), onChange: function (e) { return setMobile(e.target.value); }, className: web_module_less_1.default['loginbox-input'] }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ name: "captcha" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, value: captcha, size: "large", maxLength: 4, placeholder: t('placeholder.Captcha'), onChange: function (e) { return setCaptcha(e.target.value); }, className: web_module_less_1.default['loginbox-input'], suffix: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ size: "small", type: "link", disabled: !validMobile || counter > 0, onClick: function () { return sendCaptcha(mobile); } }, { children: counter > 0
                            ? "".concat(counter, "\u79D2\u540E\u53EF\u91CD\u53D1")
                            : t('Send') })) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ block: true, size: "large", type: "primary", disabled: !allowSubmit || loading, loading: loading, onClick: function () { return loginByMobileWeb(mobile, loginAgreed, password, captcha, loginMode); } }, { children: t('Login') })) })] })));
    if (onlyCaptcha) {
        return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-main'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-wrap'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-bd'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: (0, classnames_1.default)(web_module_less_1.default['loginbox-mobile'], web_module_less_1.default['loginbox-only']) }, { children: LoginCaptcha })) })) })) })));
    }
    else if (onlyPassword) {
        return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-main'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-wrap'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-bd'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: (0, classnames_1.default)(web_module_less_1.default['loginbox-password'], web_module_less_1.default['loginbox-only']) }, { children: LoginPassword })) })) })) })));
    }
    var scope = utils_1.isWeiXin ? 'snsapi_userinfo' : 'snsapi_login';
    var redirectUri = encodeURIComponent("".concat(window.location.protocol, "//").concat(window.location.hostname).concat(window.location.port || '', "/weChatLogin"));
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-main'] }, { children: [(0, jsx_runtime_1.jsx)("img", { src: process.env.PUBLIC_URL + '/images/logo_main_h.png', className: web_module_less_1.default['loginbox-logo'] }), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-wrap'] }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-hd'] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Segmented, { value: loginMode, block: true, onChange: function (value) { return setLoginMode(value); }, options: [
                                {
                                    label: t('inPassword'),
                                    value: 1,
                                },
                                {
                                    label: t('inCaptcha'),
                                    value: 2,
                                },
                                {
                                    label: t('inQrCode'),
                                    value: 3,
                                },
                            ] }) })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-bd'] }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-password'], style: loginMode === 1 ? {} : { display: 'none' } }, { children: LoginPassword })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-mobile'], style: loginMode === 2 ? {} : { display: 'none' } }, { children: LoginCaptcha })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-qrcode'], style: loginMode === 3 ? {} : { display: 'none' } }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-qrcode__iframe'] }, { children: appId && ((0, jsx_runtime_1.jsx)(weChatLoginQrCode_1.default, { appId: appId, scope: scope, redirectUri: redirectUri, state: '', href: "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30KLmltcG93ZXJCb3ggLmluZm8ge3dpZHRoOiAyMDBweDt9Ci5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30gCg==" })) })) }))] })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-ft'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-ft__btn'] }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-protocal'] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Checkbox, tslib_1.__assign({ checked: loginAgreed, onChange: function (e) { return setLoginAgreed(e.target.checked); } }, { children: (0, jsx_runtime_1.jsxs)("div", { children: ["\u9605\u8BFB\u5E76\u540C\u610F", (0, jsx_runtime_1.jsx)(antd_1.Typography.Link, tslib_1.__assign({ onClick: function () {
                                                    goPage('service');
                                                } }, { children: '《服务条款》' })), "\u548C", (0, jsx_runtime_1.jsx)(antd_1.Typography.Link, tslib_1.__assign({ onClick: function () {
                                                    goPage('privacy');
                                                } }, { children: '《隐私政策》' }))] }) })) })) })) }))] }))] })));
}
exports.default = render;
