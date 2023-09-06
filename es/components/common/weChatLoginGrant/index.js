import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { message, Button } from 'antd';
import { random, template } from 'oak-domain/lib/utils/string';
import './index.less';
const WeChatLoginUrl = template `https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri=${0}&appid=${1}&response_type=code&scope=${2}${3}&#wechat_redirect`;
function Grant(props) {
    const { id = 'login_grant_container', appId, scope, redirectUri, state, style = {}, className, dev = process.env.NODE_ENV === 'development', // 默认本地为true 发布时为false
    disabled = false, disableText, rootStyle, rootClassName, } = props;
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
        V = (_jsxs("div", { className: `${prefixCls2}_dev`, children: [_jsxs("div", { className: `${prefixCls2}_dev_header`, children: [_jsx("input", { maxLength: 6, value: code, className: `${prefixCls2}_dev_header_input`, onChange: (e) => {
                                setCode(e.target.value);
                            } }), _jsx(Button, { className: `${prefixCls2}_dev_header_btn`, type: "primary", shape: "round", size: "large", 
                            // block
                            onClick: () => {
                                if (disabled) {
                                    messageApi.info(disableText || 'disabled');
                                    return;
                                }
                                const url = new URL(decodeURIComponent(redirectUri));
                                url.searchParams.set('code', code);
                                if (state) {
                                    url.searchParams.set('state', state);
                                }
                                window.location.href = url.toString();
                            }, children: "\u5FAE\u4FE1\u6388\u6743\u4E00\u952E\u767B\u5F55" })] }), _jsxs("div", { className: `${prefixCls2}_dev_bottom`, children: [_jsx("span", { className: `${prefixCls2}_dev_bottom_desc`, children: "1\u3001\u7531\u4E8E\u672C\u5730\u5F00\u53D1\u73AF\u5883\u9650\u5236\uFF0C\u6A21\u62DF\u5FAE\u4FE1\u6388\u6743\u540E\u52A8\u4F5C" }), _jsx("span", { className: `${prefixCls2}_dev_bottom_desc`, children: "2\u3001CODE\u53EF\u4FEE\u6539" })] })] }));
    }
    else {
        V = (_jsx("div", { className: `${prefixCls2}_prod`, children: _jsx("div", { className: `${prefixCls2}_prod_header`, children: _jsx(Button, { className: `${prefixCls2}_prod_header_btn`, type: "primary", shape: "round", size: "large", 
                    //  block
                    onClick: () => {
                        if (disabled) {
                            messageApi.info(disableText || 'disabled');
                            return;
                        }
                        const url = WeChatLoginUrl(redirectUri, appId, scope, state ? `&state=${state}` : '');
                        window.location.href = url;
                    }, children: "\u5FAE\u4FE1\u6388\u6743\u4E00\u952E\u767B\u5F55" }) }) }));
    }
    return (_jsxs(_Fragment, { children: [contextHolder, _jsx("div", { className: prefixCls2, id: id, children: V })] }));
}
export default Grant;
