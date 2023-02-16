"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var string_1 = require("oak-domain/lib/utils/string");
require("./index.less");
var WeChatLoginUrl = (0, string_1.template)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri=", "&appid=", "&response_type=code&scope=", "&state=", "&#wechat_redirect"], ["https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri=", "&appid=", "&response_type=code&scope=", "&state=", "&#wechat_redirect"])), 0, 1, 2, 3);
function Grant(props) {
    var _a = props.id, id = _a === void 0 ? 'login_grant_container' : _a, appId = props.appId, scope = props.scope, redirectUri = props.redirectUri, state = props.state, _b = props.style, style = _b === void 0 ? {} : _b, className = props.className, _c = props.dev, dev = _c === void 0 ? process.env.NODE_ENV === 'development' : _c, // 默认本地为true 发布时为false
    _d = props.disabled, // 默认本地为true 发布时为false
    disabled = _d === void 0 ? false : _d, disableText = props.disableText, rootStyle = props.rootStyle, rootClassName = props.rootClassName;
    var _e = tslib_1.__read((0, react_1.useState)(''), 2), code = _e[0], setCode = _e[1];
    var _f = tslib_1.__read(antd_1.message.useMessage(), 2), messageApi = _f[0], contextHolder = _f[1];
    (0, react_1.useEffect)(function () {
        if (appId) {
            // 由于本地不能微信扫码测试 所以只能模拟 输入code使用weChatLogin
            if (dev) {
                setCode((0, string_1.random)(6));
                return;
            }
        }
    }, [appId]);
    var prefixCls = 'oak';
    var prefixCls2 = "".concat(prefixCls, "-loginGrant");
    var V;
    if (dev) {
        V = ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "".concat(prefixCls2, "_dev") }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "".concat(prefixCls2, "_dev_header") }, { children: [(0, jsx_runtime_1.jsx)("input", { maxLength: 6, value: code, className: "".concat(prefixCls2, "_dev_header_input"), onChange: function (e) {
                                setCode(e.target.value);
                            } }), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ className: "".concat(prefixCls2, "_dev_header_btn"), type: "primary", shape: "round", size: "large", 
                            // block
                            onClick: function () {
                                if (disabled) {
                                    messageApi.info(disableText || 'disabled');
                                    return;
                                }
                                window.location.href =
                                    decodeURIComponent(redirectUri) +
                                        "?code=".concat(code, "&state=").concat(state);
                            } }, { children: "\u5FAE\u4FE1\u6388\u6743\u4E00\u952E\u767B\u5F55" }))] })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "".concat(prefixCls2, "_dev_bottom") }, { children: [(0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: "".concat(prefixCls2, "_dev_bottom_desc") }, { children: "1\u3001\u7531\u4E8E\u672C\u5730\u5F00\u53D1\u73AF\u5883\u9650\u5236\uFF0C\u6A21\u62DF\u5FAE\u4FE1\u6388\u6743\u540E\u52A8\u4F5C" })), (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: "".concat(prefixCls2, "_dev_bottom_desc") }, { children: "2\u3001CODE\u53EF\u4FEE\u6539" }))] }))] })));
    }
    else {
        V = ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "".concat(prefixCls2, "_prod") }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "".concat(prefixCls2, "_prod_header") }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ className: "".concat(prefixCls2, "_prod_header_btn"), type: "primary", shape: "round", size: "large", 
                    //  block
                    onClick: function () {
                        if (disabled) {
                            messageApi.info(disableText || 'disabled');
                            return;
                        }
                        var url = WeChatLoginUrl(redirectUri, appId, scope, state);
                        window.location.href = url;
                    } }, { children: "\u5FAE\u4FE1\u6388\u6743\u4E00\u952E\u767B\u5F55" })) })) })));
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [contextHolder, (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: prefixCls2, id: id }, { children: V }))] }));
}
exports.default = Grant;
var templateObject_1;
