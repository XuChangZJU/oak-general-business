import React, { useState, useEffect } from 'react';
import './index.less';

interface QrCodeProps {
    id?: string;
    appId: string;
    scope: string;
    redirectUri: string;
    state: string;
    style?: string;
    href?: string;
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
    } = props;

    useEffect(() => {
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
    }, []);

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

    return <div className="oak-loginQrCode" id={id} />;
}

export default QrCode;
