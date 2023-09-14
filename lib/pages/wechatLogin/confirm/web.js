"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var icons_1 = require("@ant-design/icons");
var Text = antd_1.Typography.Text, Title = antd_1.Typography.Title;
function Render(props) {
    var _a = props.data, oakLoading = _a.oakLoading, oakExecuting = _a.oakExecuting, type = _a.type, expired = _a.expired, expiresAt = _a.expiresAt, user = _a.user, successed = _a.successed, userId = _a.userId, loginUserId = _a.loginUserId, appId = _a.appId, oakDirty = _a.oakDirty;
    var _b = props.methods, t = _b.t, getCodeAndRedirect = _b.getCodeAndRedirect;
    var V;
    // if (!isWeiXin) {
    //     return <div
    //         style={{
    //             padding: 20,
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //         }}
    //     >
    //         请使用微信浏览器打开当前页面
    //     </div>
    // }
    if (type === 'bind') {
        V = ((0, jsx_runtime_1.jsxs)(antd_1.Space, { direction: "vertical", align: 'center', size: 16, children: [(0, jsx_runtime_1.jsx)(Text, { type: "success", style: { color: 'var(--oak-color-primary)' }, children: "\u60A8\u5C1A\u672A\u7ED1\u5B9A\u5FAE\u4FE1\uFF0C\u7ED1\u5B9A\u767B\u5F55\u66F4\u4FBF\u6377" }), (0, jsx_runtime_1.jsx)(Text, { type: "secondary", children: "\u70B9\u51FB\u4E0B\u65B9\u6309\u94AE\u7ED1\u5B9A\u60A8\u7684\u5FAE\u4FE1\u8D26\u53F7" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { disabled: oakExecuting || oakLoading, type: "primary", shape: "round", icon: (0, jsx_runtime_1.jsx)(icons_1.WechatOutlined, {}), size: "large", onClick: function () { return getCodeAndRedirect(); }, children: "\u7ED1\u5B9A\u5FAE\u4FE1" })] }));
        if (successed) {
            V = ((0, jsx_runtime_1.jsx)(antd_1.Result, { status: "success", title: "绑定微信成功" }));
        }
    }
    else if (type === 'login') {
        V = ((0, jsx_runtime_1.jsx)(antd_1.Space, { direction: "vertical", align: 'center', size: 16, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { disabled: oakExecuting || oakLoading, type: "primary", shape: "round", icon: (0, jsx_runtime_1.jsx)(icons_1.WechatOutlined, {}), size: "large", onClick: function () { return getCodeAndRedirect(); }, children: "\u4E00\u952E\u767B\u5F55" }) }));
        if (successed) {
            V = ((0, jsx_runtime_1.jsx)(antd_1.Result, { status: "success", title: "登录成功" }));
        }
    }
    else if (expired) {
        V = ((0, jsx_runtime_1.jsxs)(antd_1.Space, { direction: "vertical", align: 'center', size: 12, children: [(0, jsx_runtime_1.jsx)(icons_1.MehOutlined, { style: { fontSize: 24, color: 'var(--oak-color-warning)' } }), (0, jsx_runtime_1.jsx)(Text, { type: "warning", children: "\u4E8C\u7EF4\u7801\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u626B\u7801" })] }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.content, children: V ? V : ((0, jsx_runtime_1.jsxs)(antd_1.Space, { direction: "vertical", align: 'center', size: 16, children: [(0, jsx_runtime_1.jsx)(Text, { type: "success", style: { color: 'var(--oak-color-primary)' }, children: "\u60A8\u5C1A\u672A\u7ED1\u5B9A\u5FAE\u4FE1\uFF0C\u7ED1\u5B9A\u767B\u5F55\u66F4\u4FBF\u6377" }), (0, jsx_runtime_1.jsx)(Text, { type: "secondary", children: "\u70B9\u51FB\u4E0B\u65B9\u6309\u94AE\u7ED1\u5B9A\u60A8\u7684\u5FAE\u4FE1\u8D26\u53F7" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { disabled: oakExecuting || oakLoading, type: "primary", shape: "round", icon: (0, jsx_runtime_1.jsx)(icons_1.WechatOutlined, {}), size: "large", onClick: function () { return getCodeAndRedirect(); }, children: "\u7ED1\u5B9A\u5FAE\u4FE1" })] })) }) }));
}
exports.default = Render;
