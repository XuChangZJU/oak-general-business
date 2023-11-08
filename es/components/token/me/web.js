import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, Button, Avatar } from 'antd-mobile';
import { UserOutlined, MobileOutlined } from '@ant-design/icons';
import Style from './mobile.module.less';
export default function Render(props) {
    const { avatar, isLoggedIn, refreshing, mobileText, isRoot, oakExecuting, tokenId, nickname, oakDirty, } = props.data;
    const { doLogin, t, goMyMobile, goUserManage, goMyInfo } = props.methods;
    return (_jsxs("div", { className: Style.container, children: [_jsxs("div", { className: Style.userInfo, children: [_jsx(Avatar, { className: Style.avatar, src: avatar }), _jsx("span", { className: Style.nickname, children: nickname || '未设置' }), isLoggedIn ? (_jsx(Button, { color: "primary", size: "small", disabled: refreshing, loading: refreshing, onClick: () => goMyInfo(), children: t('common::action.update') })) : (_jsx(Button, { size: "small", disabled: refreshing, loading: refreshing, onClick: () => doLogin(), children: t('login') }))] }), _jsxs(List, { className: Style.list, children: [_jsx(List.Item, { onClick: () => goMyMobile(), prefix: _jsx(MobileOutlined, {}), title: "\u624B\u673A\u53F7", extra: mobileText }), isRoot && (_jsx(List.Item, { onClick: () => goUserManage(), prefix: _jsx(UserOutlined, {}), title: "\u7528\u6237\u7BA1\u7406" }))] })] }));
}
