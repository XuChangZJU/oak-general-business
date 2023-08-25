"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var string_1 = require("oak-domain/lib/utils/string");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
require("./index.less");
function QrCode(props) {
    var _a = props.id, id = _a === void 0 ? 'login_qr_container' : _a, appId = props.appId, scope = props.scope, redirectUri = props.redirectUri, state = props.state, _b = props.style, style = _b === void 0 ? '' : _b, _c = props.href, href = _c === void 0 ? '' : _c, _d = props.dev, dev = _d === void 0 ? process.env.NODE_ENV === 'development' : _d, // 默认本地为true 发布时为false
    _e = props.disabled, // 默认本地为true 发布时为false
    disabled = _e === void 0 ? false : _e, disableText = props.disableText, rootStyle = props.rootStyle, rootClassName = props.rootClassName;
    var _f = tslib_1.__read((0, react_1.useState)(''), 2), code = _f[0], setCode = _f[1];
    (0, react_1.useEffect)(function () {
        if (appId) {
            if (disabled) {
                return;
            }
            // 由于本地不能微信扫码测试 所以只能模拟 输入code使用weChatLogin
            if (dev) {
                setCode((0, string_1.random)(6));
                return;
            }
            loadScript("".concat(window.location.protocol, "//res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"), function () {
                // @ts-ignore
                new WxLogin({
                    id: id,
                    appid: appId,
                    scope: scope,
                    redirect_uri: redirectUri,
                    state: state,
                    style: style,
                    href: href,
                });
            });
        }
    }, [appId, disabled]);
    function loadScript(url, callback) {
        var script = document.createElement('script');
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
    var prefixCls = 'oak';
    var prefixCls2 = "".concat(prefixCls, "-loginQrCode");
    var V;
    var DisableV;
    if (disabled) {
        DisableV = ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: (0, classnames_1.default)(prefixCls2, rootClassName), style: rootStyle }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "".concat(prefixCls2, "_disable") }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "".concat(prefixCls2, "_disable_border") }, { children: disableText || '禁用微信二维码' })) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "".concat(prefixCls2, "_disable_info") }, { children: (0, jsx_runtime_1.jsx)("span", { children: "\u5FAE\u4FE1\u626B\u4E00\u626B" }) }))] })));
    }
    if (dev) {
        V = ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "".concat(prefixCls2, "_dev") }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "".concat(prefixCls2, "_dev_header") }, { children: [(0, jsx_runtime_1.jsx)("input", { maxLength: 6, value: code, className: "".concat(prefixCls2, "_dev_header_input"), onChange: function (e) {
                                setCode(e.target.value);
                            } }), (0, jsx_runtime_1.jsx)("button", tslib_1.__assign({ className: "".concat(prefixCls2, "_dev_header_btn"), onClick: function () {
                                window.location.href =
                                    decodeURIComponent(redirectUri) +
                                        "?code=".concat(code, "&state=").concat(state);
                            } }, { children: "\u767B\u5F55" }))] })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "".concat(prefixCls2, "_dev_bottom") }, { children: [(0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: "".concat(prefixCls2, "_dev_bottom_title") }, { children: "\u6A21\u62DF\u5FAE\u4FE1\u626B\u4E00\u626B" })), (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: "".concat(prefixCls2, "_dev_bottom_desc") }, { children: "1\u3001\u7531\u4E8E\u672C\u5730\u5F00\u53D1\u73AF\u5883\u9650\u5236\uFF0C\u6A21\u62DF\u5FAE\u4FE1\u626B\u7801\u540E\u52A8\u4F5C" })), (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: "".concat(prefixCls2, "_dev_bottom_desc") }, { children: "2\u3001CODE\u53EF\u4FEE\u6539" }))] }))] })));
    }
    if (!appId) {
        V = ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "".concat(prefixCls2, "_err") }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "".concat(prefixCls2, "_err_text") }, { children: "\u7F3A\u5C11\u53C2\u6570" })) })));
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [DisableV, (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: (0, classnames_1.default)(prefixCls2, rootClassName), id: id, style: disabled ? { display: 'none' } : rootStyle }, { children: V }))] }));
}
exports.default = QrCode;
