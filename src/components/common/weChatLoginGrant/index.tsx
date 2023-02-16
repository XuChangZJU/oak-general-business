import React, { useState, useEffect } from 'react';
import { message, Button } from 'antd';
import { random, template } from 'oak-domain/lib/utils/string';
import classNames from 'classnames';
import './index.less';

interface GrantProps {
    id?: string;
    appId: string;
    scope: 'snsapi_userinfo' | 'snsapi_login';
    redirectUri: string;
    state: string;
    style?: React.CSSProperties;
    className?: string;
    dev?: boolean;
    disabled?: boolean;
    disableText?: string;
    rootStyle?: React.CSSProperties;
    rootClassName?: string;
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
        disabled = false,
        disableText,
        rootStyle,
        rootClassName,
    } = props;
    const [code, setCode] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

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
                    <Button
                        className={`${prefixCls2}_dev_header_btn`}
                        type="primary"
                        shape="round"
                        size="large"
                        // block
                        onClick={() => {
                            if (disabled) {
                                messageApi.info(disableText || 'disabled');
                                return;
                            }
                            window.location.href =
                                decodeURIComponent(redirectUri) +
                                `?code=${code}&state=${state}`;
                        }}
                    >
                        微信授权一键登录
                    </Button>
                </div>
                <div className={`${prefixCls2}_dev_bottom`}>
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
                     <Button
                         className={`${prefixCls2}_prod_header_btn`}
                         type="primary"
                         shape="round"
                         size="large"
                         //  block
                         onClick={() => {
                             if (disabled) {
                                 messageApi.info(disableText || 'disabled');
                                 return;
                             }
                             const url = WeChatLoginUrl(
                                 redirectUri,
                                 appId,
                                 scope,
                                 state
                             );

                             window.location.href = url;
                         }}
                     >
                         微信授权一键登录
                     </Button>
                 </div>
             </div>
         );
    }

    return (
        <>
            {contextHolder}
            <div className={prefixCls2} id={id}>
                {V}
            </div>
        </>
    );
}

export default Grant;
