"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const string_1 = require("oak-domain/lib/utils/string");
require("./index.less");
const WeChatLoginUrl = (0, string_1.template) `https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri=${0}&appid=${1}&response_type=code&scope=${2}${3}&#wechat_redirect`;
function Grant(props) {
    const { id = 'login_grant_container', appId, scope, redirectUri, state, style = {}, className, dev = process.env.NODE_ENV === 'development', // 默认本地为true 发布时为false
    disabled = false, disableText, rootStyle, rootClassName, } = props;
    const [code, setCode] = (0, react_1.useState)('');
    const [messageApi, contextHolder] = antd_1.message.useMessage();
    (0, react_1.useEffect)(() => {
        if (appId) {
            // 由于本地不能微信扫码测试 所以只能模拟 输入code使用weChatLogin
            if (dev) {
                setCode((0, string_1.random)(6));
                return;
            }
        }
    }, [appId]);
    const prefixCls = 'oak';
    const prefixCls2 = `${prefixCls}-loginGrant`;
    let V;
    if (dev) {
        V = ((0, jsx_runtime_1.jsxs)("div", { className: `${prefixCls2}_dev`, children: [(0, jsx_runtime_1.jsxs)("div", { className: `${prefixCls2}_dev_header`, children: [(0, jsx_runtime_1.jsx)("input", { maxLength: 6, value: code, className: `${prefixCls2}_dev_header_input`, onChange: (e) => {
                                setCode(e.target.value);
                            } }), (0, jsx_runtime_1.jsx)(antd_1.Button, { className: `${prefixCls2}_dev_header_btn`, type: "primary", shape: "round", size: "large", 
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
                            }, children: "\u5FAE\u4FE1\u6388\u6743\u4E00\u952E\u767B\u5F55" })] }), (0, jsx_runtime_1.jsxs)("div", { className: `${prefixCls2}_dev_bottom`, children: [(0, jsx_runtime_1.jsx)("span", { className: `${prefixCls2}_dev_bottom_desc`, children: "1\u3001\u7531\u4E8E\u672C\u5730\u5F00\u53D1\u73AF\u5883\u9650\u5236\uFF0C\u6A21\u62DF\u5FAE\u4FE1\u6388\u6743\u540E\u52A8\u4F5C" }), (0, jsx_runtime_1.jsx)("span", { className: `${prefixCls2}_dev_bottom_desc`, children: "2\u3001CODE\u53EF\u4FEE\u6539" })] })] }));
    }
    else {
        V = ((0, jsx_runtime_1.jsx)("div", { className: `${prefixCls2}_prod`, children: (0, jsx_runtime_1.jsx)("div", { className: `${prefixCls2}_prod_header`, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { className: `${prefixCls2}_prod_header_btn`, type: "primary", shape: "round", size: "large", 
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
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [contextHolder, (0, jsx_runtime_1.jsx)("div", { className: prefixCls2, id: id, children: V })] }));
}
exports.default = Grant;
