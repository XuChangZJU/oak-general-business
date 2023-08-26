"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
// @ts-nocheck
// Segmented这个对象在antd里的声明是错误的
var react_1 = require("react");
var validator_1 = require("oak-domain/lib/utils/validator");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var weChatLoginQrCode_1 = tslib_1.__importDefault(require("../../common/weChatLoginQrCode"));
var qrCode_1 = tslib_1.__importDefault(require("../../wechatLogin/qrCode"));
var weChatLoginGrant_1 = tslib_1.__importDefault(require("../../common/weChatLoginGrant"));
function Render(props) {
    var _a, _b;
    var data = props.data, methods = props.methods;
    var onlyCaptcha = data.onlyCaptcha, onlyPassword = data.onlyPassword, width = data.width, counter = data.counter, loading = data.loading, loginMode = data.loginMode, appId = data.appId, domain = data.domain, isSupportWechat = data.isSupportWechat, isSupportWechatPublic = data.isSupportWechatPublic, isSupportGrant = data.isSupportGrant, disabled = data.disabled, redirectUri = data.redirectUri, url = data.url;
    var sendCaptcha = methods.sendCaptcha, loginByMobile = methods.loginByMobile, t = methods.t, setLoginMode = methods.setLoginMode;
    var _c = tslib_1.__read((0, react_1.useState)(''), 2), mobile = _c[0], setMobile = _c[1];
    var _d = tslib_1.__read((0, react_1.useState)(''), 2), captcha = _d[0], setCaptcha = _d[1];
    var _e = tslib_1.__read((0, react_1.useState)(''), 2), password = _e[0], setPassword = _e[1];
    var validMobile = (0, validator_1.isMobile)(mobile);
    var validCaptcha = (0, validator_1.isCaptcha)(captcha);
    var validPassword = (0, validator_1.isPassword)(password);
    var allowSubmit = validMobile && (validCaptcha || validPassword);
    var LoginPassword = ((0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ name: "mobile" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, value: mobile, type: "tel", size: "large", maxLength: 11, prefix: (0, jsx_runtime_1.jsx)(icons_1.MobileOutlined, {}), placeholder: t('placeholder.Mobile'), onChange: function (e) {
                        setMobile(e.target.value);
                    }, className: web_module_less_1.default['loginbox-input'] }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ name: "password" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, size: "large", value: password, prefix: (0, jsx_runtime_1.jsx)(icons_1.LockOutlined, {}), type: "password", placeholder: t('placeholder.Password'), onChange: function (e) {
                        setPassword(e.target.value);
                    }, className: web_module_less_1.default['loginbox-input'] }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ block: true, size: "large", type: "primary", disabled: !!disabled || !allowSubmit || loading, loading: loading, onClick: function () { return loginByMobile(mobile, password, captcha); } }, { children: t('Login') })) }) })] })));
    var LoginCaptcha = ((0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ name: "mobile" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, value: mobile, type: "tel", size: "large", maxLength: 11, prefix: (0, jsx_runtime_1.jsx)(icons_1.MobileOutlined, {}), placeholder: t('placeholder.Mobile'), onChange: function (e) {
                        setMobile(e.target.value);
                    }, className: web_module_less_1.default['loginbox-input'] }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ name: "captcha" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, value: captcha, size: "large", maxLength: 4, placeholder: t('placeholder.Captcha'), onChange: function (e) {
                        setCaptcha(e.target.value);
                    }, className: web_module_less_1.default['loginbox-input'], suffix: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ size: "small", type: "link", disabled: !!disabled || !validMobile || counter > 0, onClick: function () { return sendCaptcha(mobile); } }, { children: counter > 0
                            ? counter + t('resendAfter')
                            : t('Send') })) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ block: true, size: "large", type: "primary", disabled: disabled || !allowSubmit || loading, loading: loading, onClick: function () { return loginByMobile(mobile, password, captcha); } }, { children: t('Login') })) })] })));
    var _f = tslib_1.__read((0, react_1.useState)([]), 2), options = _f[0], setOptions = _f[1];
    var getOptions = function () {
        var newOptions = [];
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
    (0, react_1.useEffect)(function () {
        getOptions();
    }, []);
    (0, react_1.useEffect)(function () {
        getOptions();
    }, [isSupportGrant, onlyPassword, onlyCaptcha, isSupportWechat, isSupportWechatPublic]);
    // 构建state 默认网站首页
    var state = '/';
    if (url) {
        state = encodeURIComponent("?backUrl=".concat(decodeURIComponent(url)));
    }
    else {
        // isGoBack 登录过期抛出异常 返回上一页
        state = encodeURIComponent('?isGoBack=true');
    }
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-main'] }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: (0, classnames_1.default)(web_module_less_1.default['loginbox-wrap'], (_a = {},
                _a[web_module_less_1.default['loginbox-wrap__mobile']] = width === 'xs',
                _a)) }, { children: [(options === null || options === void 0 ? void 0 : options.length) > 1 && ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-hd'] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Segmented, { className: web_module_less_1.default.segmented, value: loginMode, block: true, onChange: setLoginMode, options: options.map(function (ele) { return ({
                            value: ele.value,
                            label: t("".concat(ele.label)),
                        }); }) }) }))), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: (0, classnames_1.default)(web_module_less_1.default['loginbox-bd'], (_b = {},
                        _b[web_module_less_1.default['loginbox-bd__grant']] = isSupportGrant,
                        _b)) }, { children: isSupportGrant ? ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-grant'] }, { children: (0, jsx_runtime_1.jsx)(weChatLoginGrant_1.default, { disabled: !!disabled, disableText: disabled, appId: appId, scope: "snsapi_userinfo", redirectUri: redirectUri, state: state }) }))) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-password'], style: {
                                    display: loginMode === 1 ? 'block' : 'none',
                                } }, { children: LoginPassword })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-mobile'], style: {
                                    display: loginMode === 2 ? 'block' : 'none',
                                } }, { children: LoginCaptcha })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default['loginbox-qrcode'], style: {
                                    display: loginMode === 3 ? 'block' : 'none',
                                } }, { children: [isSupportWechat && ((0, jsx_runtime_1.jsx)(weChatLoginQrCode_1.default, { disabled: disabled, disableText: disabled, appId: appId, scope: "snsapi_login", redirectUri: redirectUri, state: state, href: "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30KLmltcG93ZXJCb3ggLmluZm8ge3dpZHRoOiAyMDBweDt9Ci5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30gCg==" })), isSupportWechatPublic && ((0, jsx_runtime_1.jsx)(qrCode_1.default, { type: "login", oakPath: "$login-wechatLogin/qrCode", oakAutoUnmount: true, isGoBack: true }))] }))] })) }))] })) })));
}
exports.default = Render;
