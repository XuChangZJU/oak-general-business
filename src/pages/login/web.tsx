import React from 'react';
import {
    isMobile,
    isPassword,
    isCaptcha,
} from 'oak-domain/lib/utils/validator';
import { Form, Input, Button, Checkbox, Typography, Segmented } from 'antd';
import {
    LockOutlined,
    MobileOutlined,
    ReloadOutlined,
} from '@ant-design/icons';
import { isWeiXin } from 'oak-frontend-base/lib/utils/utils';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../general-app-domain';

import classNames from 'classnames';
import Style from './web.module.less';
import WeChatLoginQrCode from '../../components/common/weChatLoginQrCode';

export default function render(this: any) {
    const { onlyCaptcha, onlyPassword } = this.props;
    const {
        mobile,
        captcha,
        password,
        counter,
        loginMode,
        loading,
        loginAgreed,
        appId,
    } = this.state;
    const validMobile = isMobile(mobile);
    const validCaptcha = isCaptcha(captcha);
    const validPassword = isPassword(password);
    const allowSubmit = validMobile && (validCaptcha || validPassword);

    const LoginPassword = (
        <Form colon={true}>
            <Form.Item name="mobile">
                <Input
                    allowClear
                    value={mobile}
                    type="tel"
                    size="large"
                    maxLength={11}
                    prefix={<MobileOutlined />}
                    placeholder={this.t('placeholder.Mobile')}
                    onChange={(e) => {
                        this.setState({
                            mobile: e.target.value,
                        });
                    }}
                    className={Style['loginbox-input']}
                />
            </Form.Item>
            <Form.Item name="password">
                <Input
                    allowClear
                    size="large"
                    value={password}
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder={this.t('placeholder.Password')}
                    onChange={(e) => {
                        this.setState({
                            password: e.target.value,
                        });
                    }}
                    className={Style['loginbox-input']}
                />
            </Form.Item>

            <Form.Item>
                <>
                    <Button
                        block
                        size="large"
                        type="primary"
                        disabled={!allowSubmit || loading}
                        loading={loading}
                        onClick={() => this.loginByMobile()}
                    >
                        {this.t('Login')}
                    </Button>
                </>
            </Form.Item>
        </Form>
    );
    const LoginCaptcha = (
        <Form colon={true}>
            <Form.Item name="mobile">
                <Input
                    allowClear
                    value={mobile}
                    type="tel"
                    size="large"
                    maxLength={11}
                    prefix={<MobileOutlined />}
                    placeholder={this.t('placeholder.Mobile')}
                    onChange={(e) => {
                        this.setState({
                            mobile: e.target.value,
                        });
                    }}
                    className={Style['loginbox-input']}
                />
            </Form.Item>
            <Form.Item name="captcha">
                <Input
                    allowClear
                    value={captcha}
                    size="large"
                    maxLength={4}
                    placeholder={this.t('placeholder.Captcha')}
                    onChange={(e) => {
                        this.setState({
                            captcha: e.target.value,
                        });
                    }}
                    className={Style['loginbox-input']}
                    suffix={
                        <Button
                            size="small"
                            type="link"
                            disabled={!validMobile || counter > 0}
                            onClick={() => this.sendCaptcha()}
                        >
                            {counter > 0
                                ? `${counter}秒后可重发`
                                : this.t('Send')}
                        </Button>
                    }
                />
            </Form.Item>

            <Form.Item>
                <Button
                    block
                    size="large"
                    type="primary"
                    disabled={!allowSubmit || loading}
                    loading={loading}
                    onClick={() => this.loginByMobile()}
                >
                    {this.t('Login')}
                </Button>
            </Form.Item>
        </Form>
    );

    if (onlyCaptcha) {
        return (
            <div className={Style['loginbox-main']}>
                <div className={Style['loginbox-wrap']}>
                    <div className={Style['loginbox-bd']}>
                        <div
                            className={classNames(
                                Style['loginbox-mobile'],
                                Style['loginbox-only']
                            )}
                        >
                            {LoginCaptcha}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (onlyPassword) {
        return (
            <div className={Style['loginbox-main']}>
                <div className={Style['loginbox-wrap']}>
                    <div className={Style['loginbox-bd']}>
                        <div
                            className={classNames(
                                Style['loginbox-password'],
                                Style['loginbox-only']
                            )}
                        >
                            {LoginPassword}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    const scope = isWeiXin ? 'snsapi_userinfo' : 'snsapi_login';
    const redirectUri = encodeURIComponent(
        `${window.location.protocol}//${window.location.hostname}${
            window.location.port || ''
        }/weChatLogin`
    );

    return (
        <div className={Style['loginbox-main']}>
            <img
                src={process.env.PUBLIC_URL + '/images/logo_main_h.png'}
                className={Style['loginbox-logo']}
            />
            <div className={Style['loginbox-wrap']}>
                <div className={Style['loginbox-hd']}>
                    <Segmented
                        value={loginMode}
                        block
                        onChange={(value) => {
                            this.setMode(value);
                        }}
                        options={[
                            {
                                label: this.t('inPassword'),
                                value: 1,
                            },
                            {
                                label: this.t('inCaptcha'),
                                value: 2,
                            },
                            {
                                label: this.t('inQrCode'),
                                value: 3,
                            },
                        ]}
                    ></Segmented>
                </div>
                <div className={Style['loginbox-bd']}>
                    <div
                        className={Style['loginbox-password']}
                        style={loginMode === 1 ? {} : { display: 'none' }}
                    >
                        {LoginPassword}
                    </div>
                    <div
                        className={Style['loginbox-mobile']}
                        style={loginMode === 2 ? {} : { display: 'none' }}
                    >
                        {LoginCaptcha}
                    </div>
                    <div
                        className={Style['loginbox-qrcode']}
                        style={loginMode === 3 ? {} : { display: 'none' }}
                    >
                        {/* <div className={Style['loginbox-qrcode__sociallogin']}>
                            请使用微信扫一扫登录
                            <span
                                className={Style['loginbox-qrcode__refresh']}
                                onClick={() => {
                                    this.setMessage({
                                        type: 'success',
                                        content: '刷新二维码',
                                    });
                                }}
                            >
                                刷新
                                <ReloadOutlined
                                    className={
                                        Style['loginbox-qrcode__refresh-icon']
                                    }
                                />
                            </span>
                        </div> */}
                        <div className={Style['loginbox-qrcode__iframe']}>
                            {appId && (
                                <WeChatLoginQrCode
                                    appId={appId}
                                    scope={scope}
                                    redirectUri={redirectUri}
                                    state={''}
                                    href="data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30KLmltcG93ZXJCb3ggLmluZm8ge3dpZHRoOiAyMDBweDt9Ci5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30gCg=="
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className={Style['loginbox-ft']}>
                    <div className={Style['loginbox-ft__btn']}>
                        <div className={Style['loginbox-protocal']}>
                            <Checkbox
                                checked={loginAgreed}
                                onChange={(e) => {
                                    this.setLoginAgreed(e.target.checked);
                                }}
                            >
                                <div>
                                    阅读并同意
                                    <Typography.Link
                                        onClick={() => {
                                            this.goPage('service');
                                        }}
                                    >
                                        {'《服务条款》'}
                                    </Typography.Link>
                                    和
                                    <Typography.Link
                                        onClick={() => {
                                            this.goPage('privacy');
                                        }}
                                    >
                                        {'《隐私政策》'}
                                    </Typography.Link>
                                </div>
                            </Checkbox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
