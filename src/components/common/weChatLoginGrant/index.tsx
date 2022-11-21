import React, { useState, useEffect } from 'react';
import './index.less';
import { random, template } from 'oak-domain/lib/utils/string';

interface GrantProps {
    id?: string;
    appId: string;
    scope: 'snsapi_userinfo' | 'snsapi_login';
    redirectUri: string;
    state: string;
    style?: React.CSSProperties;
    className?: string;
    dev?: boolean;
}

const WeChatLoginUrl = template`https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri=${0}&appid=${1}&response_type=code&scope=${2}&state=${3}&#wechat_redirect`;

function Grant(props: GrantProps) {
    const {
        id = 'login_grant_container',
        appId,
        scope,
        redirectUri,
        state,
        style = {},
        className,
        dev = process.env.NODE_ENV === 'development', // 默认本地为true 发布时为false
    } = props;
    const [code, setCode] = useState('');

    useEffect(() => {
        if (appId) {
            // 由于本地不能微信扫码测试 所以只能模拟 输入code使用weChatLogin
            if (dev) {
                setCode(random(6));
                return;
            }
        }
    }, [appId]);

    const prefixCls = 'oak';
    const prefixCls2 = `${prefixCls}-loginGrant`;

    let V;
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
                        模拟微信授权登录
                    </span>
                    <span className={`${prefixCls2}_dev_bottom_desc`}>
                        1、由于本地开发环境限制，模拟微信授权后动作
                    </span>
                    <span className={`${prefixCls2}_dev_bottom_desc`}>
                        2、CODE可修改
                    </span>
                </div>
            </div>
        );
    }
    else {
         V = (
             <div className={`${prefixCls2}_prod`}>
                 <div className={`${prefixCls2}_prod_header`}>
                     <input
                         maxLength={6}
                         value={code}
                         className={`${prefixCls2}_prod_header_input`}
                         onChange={(e) => {
                             setCode(e.target.value);
                         }}
                     ></input>
                     <button
                         className={`${prefixCls2}_prod_header_btn`}
                         onClick={() => {
                             const url = WeChatLoginUrl(
                                 redirectUri,
                                 appId,
                                 scope,
                                 state
                             );

                             window.location.href = url;
                         }}
                     >
                         登录
                     </button>
                 </div>
                 <div className={`${prefixCls2}_prod_bottom`}>
                     <span className={`${prefixCls2}_prod_bottom_title`}>
                         微信授权登录
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

export default Grant;
