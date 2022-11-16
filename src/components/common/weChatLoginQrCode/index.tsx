import React, { useState, useEffect } from 'react';
import './index.less';
import { randomName } from '../../../utils/randomUser'

interface QrCodeProps {
    id?: string;
    appId: string;
    scope: string;
    redirectUri: string;
    state: string;
    style?: string;
    href?: string;
    dev?: boolean;
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
    } = props;
    const [code, setCode] = useState('');

    useEffect(() => {
        if (appId) {
            // 由于本地不能微信扫码测试 所以只能模拟 输入code使用weChatLogin
            if (dev) {
                setCode(randomName('', 6));
                return;
            }
            loadScript(
                `${window.location.protocol}//res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js`,
                () => {
                    // @ts-ignore
                    new WxLogin({
                        id,
                        appid: appId,
                        scope,
                        redirect_uri: redirectUri,
                        state,
                        style,
                        href,
                    });
                }
            );
        }
    }, [appId]);

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
    if (dev) {
        console.log(redirectUri);
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
                            window.location.href =
                                decodeURIComponent(redirectUri) +
                                `?code=${code}&state=${state}`;
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

    return (
        <div className={prefixCls2} id={id}>
            {V}
        </div>
    );
}

export default QrCode;
