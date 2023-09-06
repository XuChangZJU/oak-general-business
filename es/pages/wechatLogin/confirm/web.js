import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Space, Typography, Result } from 'antd';
import Style from './web.module.less';
import { WechatOutlined, MehOutlined } from '@ant-design/icons';
const { Text, Title } = Typography;
export default function Render(props) {
    const { oakLoading, oakExecuting, type, expired, expiresAt, user, successed, userId, loginUserId, appId, oakDirty, } = props.data;
    const { t, getCodeAndRedirect } = props.methods;
    let V;
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
        V = (_jsxs(Space, { direction: "vertical", align: 'center', size: 16, children: [_jsx(Text, { type: "success", style: { color: 'var(--oak-color-primary)' }, children: "\u60A8\u5C1A\u672A\u7ED1\u5B9A\u5FAE\u4FE1\uFF0C\u7ED1\u5B9A\u767B\u5F55\u66F4\u4FBF\u6377" }), _jsx(Text, { type: "secondary", children: "\u70B9\u51FB\u4E0B\u65B9\u6309\u94AE\u7ED1\u5B9A\u60A8\u7684\u5FAE\u4FE1\u8D26\u53F7" }), _jsx(Button, { disabled: oakExecuting || oakLoading, type: "primary", shape: "round", icon: _jsx(WechatOutlined, {}), size: "large", onClick: () => getCodeAndRedirect(), children: "\u7ED1\u5B9A\u5FAE\u4FE1" })] }));
        if (successed) {
            V = (_jsx(Result, { status: "success", title: "绑定微信成功" }));
        }
    }
    else if (type === 'login') {
        V = (_jsx(Space, { direction: "vertical", align: 'center', size: 16, children: _jsx(Button, { disabled: oakExecuting || oakLoading, type: "primary", shape: "round", icon: _jsx(WechatOutlined, {}), size: "large", onClick: () => getCodeAndRedirect(), children: "\u4E00\u952E\u767B\u5F55" }) }));
        if (successed) {
            V = (_jsx(Result, { status: "success", title: "登录成功" }));
        }
    }
    else if (expired) {
        V = (_jsxs(Space, { direction: "vertical", align: 'center', size: 12, children: [_jsx(MehOutlined, { style: { fontSize: 24, color: 'var(--oak-color-warning)' } }), _jsx(Text, { type: "warning", children: "\u4E8C\u7EF4\u7801\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u626B\u7801" })] }));
    }
    return (_jsx("div", { className: Style.container, children: _jsx("div", { className: Style.content, children: V ? V : (_jsxs(Space, { direction: "vertical", align: 'center', size: 16, children: [_jsx(Text, { type: "success", style: { color: 'var(--oak-color-primary)' }, children: "\u60A8\u5C1A\u672A\u7ED1\u5B9A\u5FAE\u4FE1\uFF0C\u7ED1\u5B9A\u767B\u5F55\u66F4\u4FBF\u6377" }), _jsx(Text, { type: "secondary", children: "\u70B9\u51FB\u4E0B\u65B9\u6309\u94AE\u7ED1\u5B9A\u60A8\u7684\u5FAE\u4FE1\u8D26\u53F7" }), _jsx(Button, { disabled: oakExecuting || oakLoading, type: "primary", shape: "round", icon: _jsx(WechatOutlined, {}), size: "large", onClick: () => getCodeAndRedirect(), children: "\u7ED1\u5B9A\u5FAE\u4FE1" })] })) }) }));
}
