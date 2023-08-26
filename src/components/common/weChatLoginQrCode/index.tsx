import React, { useState, useEffect } from 'react';
import { random } from 'oak-domain/lib/utils/string';
import classNames from 'classnames';
import './index.less';

interface QrCodeProps {
    id?: string;
    appId: string;
    scope: 'snsapi_userinfo' | 'snsapi_login';
    redirectUri: string;
    state?: string;
    style?: string;
    href?: string;
    dev?: boolean;
    disabled?: boolean;
    disableText?: React.ReactNode;
    rootStyle?: React.CSSProperties;
    rootClassName?: string;
}

function QrCode(props: QrCodeProps) {
    const {
        id = 'login_qr_container',
        appId,
        scope,
        redirectUri,
        state,
        style = '',
        href = '',
        dev = process.env.NODE_ENV === 'development', // 默认本地为true 发布时为false
        disabled = false,
        disableText,
        rootStyle,
        rootClassName,
    } = props;
    const [code, setCode] = useState('');

    useEffect(() => {
        if (appId) {
            if (disabled) {
                return;
            }
            // 由于本地不能微信扫码测试 所以只能模拟 输入code使用weChatLogin
            if (dev) {
                setCode(random(6));
                return;
            }
            loadScript(
                `${window.location.protocol}//res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js`,
                () => {
                    const params: {
                        id: string;
                        appid: string;
                        scope: string;
                        redirect_uri: string;
                        style?: string;
                        href?: string;
                        state?: string;
                    } = {
                        id,
                        appid: appId,
                        scope,
                        redirect_uri: redirectUri,
                        style,
                        href,
                    };
                    if (state) {
                        params.state = state;
                    }
                    // @ts-ignore
                    new WxLogin(params);
                }
            );
        }
    }, [appId, disabled]);

    function loadScript(url: string, callback: () => void) {
        const script = document.createElement('script');
        // @ts-ignore
        if (script.readyState) {
            // IE
            // @ts-ignore
            script.onreadystatechange = function () {
                if (
                    // @ts-ignore
                    script.readyState === 'loaded' ||
                    // @ts-ignore
                    script.readyState === 'complete'
                ) {
                    // @ts-ignore
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            // 其他浏览器
            script.onload = function () {
                callback();
            };
        }
        script.type = 'text/javascript';
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    const prefixCls = 'oak';
    const prefixCls2 = `${prefixCls}-loginQrCode`;

    let V;
    let DisableV;
    if (disabled) {
        DisableV = (
            <div
                className={classNames(prefixCls2, rootClassName)}
                style={rootStyle}
            >
                <div className={`${prefixCls2}_disable`}>
                    <div className={`${prefixCls2}_disable_border`}>
                        {disableText || '禁用微信二维码'}
                    </div>
                </div>
                <div className={`${prefixCls2}_disable_info`}>
                    <span>微信扫一扫</span>
                </div>
            </div>
        );
    }

    if (dev) {
        V = (
            <div className={`${prefixCls2}_dev`}>
                <div className={`${prefixCls2}_dev_header`}>
                    <input
                        maxLength={6}
                        value={code}
                        className={`${prefixCls2}_dev_header_input`}
                        onChange={(e) => {
                            setCode(e.target.value);
                        }}
                    ></input>
                    <button
                        className={`${prefixCls2}_dev_header_btn`}
                        onClick={() => {
                            const url = new URL(
                                decodeURIComponent(redirectUri)
                            );
                            url.searchParams.set('code', code);
                            if (state) {
                                url.searchParams.set('state', state);
                            }
                            window.location.href = url.toString();
                        }}
                    >
                        登录
                    </button>
                </div>
                <div className={`${prefixCls2}_dev_bottom`}>
                    <span className={`${prefixCls2}_dev_bottom_title`}>
                        模拟微信扫一扫
                    </span>
                    <span className={`${prefixCls2}_dev_bottom_desc`}>
                        1、由于本地开发环境限制，模拟微信扫码后动作
                    </span>
                    <span className={`${prefixCls2}_dev_bottom_desc`}>
                        2、CODE可修改
                    </span>
                </div>
            </div>
        );
    }

    if (!appId) {
        V = (
            <div className={`${prefixCls2}_err`}>
                <div className={`${prefixCls2}_err_text`}>缺少参数</div>
            </div>
        );
    }

    return (
        <>
            {DisableV}
            <div
                className={classNames(prefixCls2, rootClassName)}
                id={id}
                style={disabled ? { display: 'none' } : rootStyle}
            >
                {V}
            </div>
        </>
    );
}

export default QrCode;
