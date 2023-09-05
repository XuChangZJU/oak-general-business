import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// @ts-nocheck
// Segmented这个对象在antd里的声明是错误的
import { useEffect, useState } from 'react';
import { isMobile, isPassword, isCaptcha, } from 'oak-domain/lib/utils/validator';
import { Form, Input, Button, Segmented } from 'antd';
import { LockOutlined, MobileOutlined, } from '@ant-design/icons';
import classNames from 'classnames';
import Style from './web.module.less';
import WeChatLoginQrCode from '../../common/weChatLoginQrCode';
import WechatLoginQrCodeForPublic from '../../wechatLogin/qrCode';
import WeChatLoginGrant from '../../common/weChatLoginGrant';
export default function Render(props) {
    const { data, methods } = props;
    const { onlyCaptcha, onlyPassword, width, counter, loading, loginMode, appId, domain, isSupportWechat, isSupportWechatPublic, isSupportGrant, disabled, redirectUri, url, } = data;
    const { sendCaptcha, loginByMobile, t, setLoginMode } = methods;
    const [mobile, setMobile] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [password, setPassword] = useState('');
    const validMobile = isMobile(mobile);
    const validCaptcha = isCaptcha(captcha);
    const validPassword = isPassword(password);
    const allowSubmit = validMobile && (validCaptcha || validPassword);
    const LoginPassword = (_jsxs(Form, { colon: true, children: [_jsx(Form.Item, { name: "mobile", children: _jsx(Input, { allowClear: true, value: mobile, type: "tel", size: "large", maxLength: 11, prefix: _jsx(MobileOutlined, {}), placeholder: t('placeholder.Mobile'), onChange: (e) => {
                        setMobile(e.target.value);
                    }, className: Style['loginbox-input'] }) }), _jsx(Form.Item, { name: "password", children: _jsx(Input, { allowClear: true, size: "large", value: password, prefix: _jsx(LockOutlined, {}), type: "password", placeholder: t('placeholder.Password'), onChange: (e) => {
                        setPassword(e.target.value);
                    }, className: Style['loginbox-input'] }) }), _jsx(Form.Item, { children: _jsx(_Fragment, { children: _jsx(Button, { block: true, size: "large", type: "primary", disabled: !!disabled || !allowSubmit || loading, loading: loading, onClick: () => loginByMobile(mobile, password, captcha), children: t('Login') }) }) })] }));
    const LoginCaptcha = (_jsxs(Form, { colon: true, children: [_jsx(Form.Item, { name: "mobile", children: _jsx(Input, { allowClear: true, value: mobile, type: "tel", size: "large", maxLength: 11, prefix: _jsx(MobileOutlined, {}), placeholder: t('placeholder.Mobile'), onChange: (e) => {
                        setMobile(e.target.value);
                    }, className: Style['loginbox-input'] }) }), _jsx(Form.Item, { name: "captcha", children: _jsx(Input, { allowClear: true, value: captcha, size: "large", maxLength: 4, placeholder: t('placeholder.Captcha'), onChange: (e) => {
                        setCaptcha(e.target.value);
                    }, className: Style['loginbox-input'], suffix: _jsx(Button, { size: "small", type: "link", disabled: !!disabled || !validMobile || counter > 0, onClick: () => sendCaptcha(mobile), children: counter > 0
                            ? counter + t('resendAfter')
                            : t('Send') }) }) }), _jsx(Form.Item, { children: _jsx(Button, { block: true, size: "large", type: "primary", disabled: disabled || !allowSubmit || loading, loading: loading, onClick: () => loginByMobile(mobile, password, captcha), children: t('Login') }) })] }));
    const [options, setOptions] = useState([]);
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
    useEffect(() => {
        getOptions();
    }, []);
    useEffect(() => {
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
    return (_jsx("div", { className: Style['loginbox-main'], children: _jsxs("div", { className: classNames(Style['loginbox-wrap'], {
                [Style['loginbox-wrap__mobile']]: width === 'xs',
            }), children: [options?.length > 1 && (_jsx("div", { className: Style['loginbox-hd'], children: _jsx(Segmented, { className: Style.segmented, value: loginMode, block: true, onChange: setLoginMode, options: options.map((ele) => ({
                            value: ele.value,
                            label: t(`${ele.label}`),
                        })) }) })), _jsx("div", { className: classNames(Style['loginbox-bd'], {
                        [Style['loginbox-bd__grant']]: isSupportGrant,
                    }), children: isSupportGrant ? (_jsx("div", { className: Style['loginbox-grant'], children: _jsx(WeChatLoginGrant, { disabled: !!disabled, disableText: disabled, appId: appId, scope: "snsapi_userinfo", redirectUri: redirectUri, state: state }) })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: Style['loginbox-password'], style: {
                                    display: loginMode === 1 ? 'block' : 'none',
                                }, children: LoginPassword }), _jsx("div", { className: Style['loginbox-mobile'], style: {
                                    display: loginMode === 2 ? 'block' : 'none',
                                }, children: LoginCaptcha }), _jsxs("div", { className: Style['loginbox-qrcode'], style: {
                                    display: loginMode === 3 ? 'block' : 'none',
                                }, children: [isSupportWechat && (_jsx(WeChatLoginQrCode, { disabled: disabled, disableText: disabled, appId: appId, scope: "snsapi_login", redirectUri: redirectUri, state: state, href: "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30KLmltcG93ZXJCb3ggLmluZm8ge3dpZHRoOiAyMDBweDt9Ci5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30gCg==" })), isSupportWechatPublic && (_jsx(WechatLoginQrCodeForPublic, { type: "login", oakPath: "$login-wechatLogin/qrCode", oakAutoUnmount: true, url: state }))] })] })) })] }) }));
}
