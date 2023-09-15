"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const string_1 = require("oak-domain/lib/utils/string");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
require("./index.less");
function QrCode(props) {
    const { id = 'login_qr_container', appId, scope, redirectUri, state, style = '', href = '', dev = process.env.NODE_ENV === 'development', // 默认本地为true 发布时为false
    disabled = false, disableText, rootStyle, rootClassName, } = props;
    const [code, setCode] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        if (appId) {
            if (disabled) {
                return;
            }
            // 由于本地不能微信扫码测试 所以只能模拟 输入code使用weChatLogin
            if (dev) {
                setCode((0, string_1.random)(6));
                return;
            }
            loadScript(`${window.location.protocol}//res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js`, () => {
                const params = {
                    id,
                    appid: appId,
                    scope,
                    redirect_uri: redirectUri,
                    style,
                    href,
                    state: state || ''
                };
                // @ts-ignore
                new WxLogin(params);
            });
        }
    }, [appId, disabled]);
    function loadScript(url, callback) {
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
                    script.readyState === 'complete') {
                    // @ts-ignore
                    script.onreadystatechange = null;
                    callback();
                }
            };
        }
        else {
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
        DisableV = ((0, jsx_runtime_1.jsxs)("div", { className: (0, classnames_1.default)(prefixCls2, rootClassName), style: rootStyle, children: [(0, jsx_runtime_1.jsx)("div", { className: `${prefixCls2}_disable`, children: (0, jsx_runtime_1.jsx)("div", { className: `${prefixCls2}_disable_border`, children: disableText || '禁用微信二维码' }) }), (0, jsx_runtime_1.jsx)("div", { className: `${prefixCls2}_disable_info`, children: (0, jsx_runtime_1.jsx)("span", { children: "\u5FAE\u4FE1\u626B\u4E00\u626B" }) })] }));
    }
    if (dev) {
        V = ((0, jsx_runtime_1.jsxs)("div", { className: `${prefixCls2}_dev`, children: [(0, jsx_runtime_1.jsxs)("div", { className: `${prefixCls2}_dev_header`, children: [(0, jsx_runtime_1.jsx)("input", { maxLength: 6, value: code, className: `${prefixCls2}_dev_header_input`, onChange: (e) => {
                                setCode(e.target.value);
                            } }), (0, jsx_runtime_1.jsx)("button", { className: `${prefixCls2}_dev_header_btn`, onClick: () => {
                                const url = new URL(decodeURIComponent(redirectUri));
                                url.searchParams.set('code', code);
                                if (state) {
                                    url.searchParams.set('state', state);
                                }
                                window.location.href = url.toString();
                            }, children: "\u767B\u5F55" })] }), (0, jsx_runtime_1.jsxs)("div", { className: `${prefixCls2}_dev_bottom`, children: [(0, jsx_runtime_1.jsx)("span", { className: `${prefixCls2}_dev_bottom_title`, children: "\u6A21\u62DF\u5FAE\u4FE1\u626B\u4E00\u626B" }), (0, jsx_runtime_1.jsx)("span", { className: `${prefixCls2}_dev_bottom_desc`, children: "1\u3001\u7531\u4E8E\u672C\u5730\u5F00\u53D1\u73AF\u5883\u9650\u5236\uFF0C\u6A21\u62DF\u5FAE\u4FE1\u626B\u7801\u540E\u52A8\u4F5C" }), (0, jsx_runtime_1.jsx)("span", { className: `${prefixCls2}_dev_bottom_desc`, children: "2\u3001CODE\u53EF\u4FEE\u6539" })] })] }));
    }
    if (!appId) {
        V = ((0, jsx_runtime_1.jsx)("div", { className: `${prefixCls2}_err`, children: (0, jsx_runtime_1.jsx)("div", { className: `${prefixCls2}_err_text`, children: "\u7F3A\u5C11\u53C2\u6570" }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [DisableV, (0, jsx_runtime_1.jsx)("div", { className: (0, classnames_1.default)(prefixCls2, rootClassName), id: id, style: disabled ? { display: 'none' } : rootStyle, children: V })] }));
}
exports.default = QrCode;
