// @ts-nocheck
// Segmented这个对象在antd里的声明是错误的
import React, { useEffect, useState } from 'react';
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
    const LoginPassword = (<Form colon={true}>
            <Form.Item name="mobile">
                <Input allowClear value={mobile} type="tel" size="large" maxLength={11} prefix={<MobileOutlined />} placeholder={t('placeholder.Mobile')} onChange={(e) => {
            setMobile(e.target.value);
        }} className={Style['loginbox-input']}/>
            </Form.Item>
            <Form.Item name="password">
                <Input allowClear size="large" value={password} prefix={<LockOutlined />} type="password" placeholder={t('placeholder.Password')} onChange={(e) => {
            setPassword(e.target.value);
        }} className={Style['loginbox-input']}/>
            </Form.Item>

            <Form.Item>
                <>
                    <Button block size="large" type="primary" disabled={!!disabled || !allowSubmit || loading} loading={loading} onClick={() => loginByMobile(mobile, password, captcha)}>
                        {t('Login')}
                    </Button>
                </>
            </Form.Item>
        </Form>);
    const LoginCaptcha = (<Form colon={true}>
            <Form.Item name="mobile">
                <Input allowClear value={mobile} type="tel" size="large" maxLength={11} prefix={<MobileOutlined />} placeholder={t('placeholder.Mobile')} onChange={(e) => {
            setMobile(e.target.value);
        }} className={Style['loginbox-input']}/>
            </Form.Item>
            <Form.Item name="captcha">
                <Input allowClear value={captcha} size="large" maxLength={4} placeholder={t('placeholder.Captcha')} onChange={(e) => {
            setCaptcha(e.target.value);
        }} className={Style['loginbox-input']} suffix={<Button size="small" type="link" disabled={!!disabled || !validMobile || counter > 0} onClick={() => sendCaptcha(mobile)}>
                            {counter > 0
                ? counter + t('resendAfter')
                : t('Send')}
                        </Button>}/>
            </Form.Item>

            <Form.Item>
                <Button block size="large" type="primary" disabled={disabled || !allowSubmit || loading} loading={loading} onClick={() => loginByMobile(mobile, password, captcha)}>
                    {t('Login')}
                </Button>
            </Form.Item>
        </Form>);
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
    return (<div className={classNames(Style['loginbox-wrap'], {
            [Style['loginbox-wrap__mobile']]: width === 'xs',
        })}>
            {options?.length > 1 && (<div className={Style['loginbox-hd']}>
                    <Segmented className={Style.segmented} value={loginMode} block onChange={setLoginMode} options={options.map((ele) => ({
                value: ele.value,
                label: t(`${ele.label}`),
            }))}></Segmented>
                </div>)}

            <div className={classNames(Style['loginbox-bd'], {
            [Style['loginbox-bd__grant']]: isSupportGrant,
        })}>
                {isSupportGrant ? (<div className={Style['loginbox-grant']}>
                        <WeChatLoginGrant disabled={!!disabled} disableText={disabled} appId={appId} scope="snsapi_userinfo" redirectUri={redirectUri} state={state}/>
                    </div>) : (<>
                        <div className={Style['loginbox-password']} style={{
                display: loginMode === 1 ? 'block' : 'none',
            }}>
                            {LoginPassword}
                        </div>
                        <div className={Style['loginbox-mobile']} style={{
                display: loginMode === 2 ? 'block' : 'none',
            }}>
                            {LoginCaptcha}
                        </div>
                        <div className={Style['loginbox-qrcode']} style={{
                display: loginMode === 3 ? 'block' : 'none',
            }}>
                            {/* 因为在选择授权方式时，微信网站和微信公众号授权登录二者只存其一，
                    所以这里可以按这个判断分开显示   */}
                            {isSupportWechat && (<WeChatLoginQrCode disabled={disabled} disableText={disabled} appId={appId} scope="snsapi_login" redirectUri={redirectUri} state={state} href="data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30KLmltcG93ZXJCb3ggLmluZm8ge3dpZHRoOiAyMDBweDt9Ci5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30gCg=="/>)}
                            {isSupportWechatPublic && (<WechatLoginQrCodeForPublic type="login" oakPath="$login-wechatLogin/qrCode" oakAutoUnmount={true} url={state}/>)}
                        </div>
                    </>)}
            </div>
        </div>);
}
