import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, Button, Avatar } from 'antd';
import { UserOutlined, MobileOutlined } from '@ant-design/icons';
import Style from './web.module.less';
export default function Render(props) {
    const { avatar, isLoggedIn, refreshing, mobileText, isRoot, oakExecuting, tokenId, nickname, oakDirty, } = props.data;
    const { doLogin, t, goMyMobile, goUserManage, goMyInfo } = props.methods;
    return (_jsxs("div", { className: Style.container, children: [_jsxs("div", { className: Style.userInfo, children: [avatar ? (_jsx(Avatar, { className: Style.avatar, src: avatar })) : (_jsx(Avatar, { className: Style.avatar, icon: _jsx(UserOutlined, { className: Style.userIcon }) })), _jsx("span", { className: Style.nickname, children: nickname || '未设置' }), isLoggedIn ? (_jsx(Button, { type: "primary", size: "small", disabled: refreshing, loading: refreshing, onClick: () => goMyInfo(), children: t('common::action.update') })) : (_jsx(Button, { size: "small", disabled: refreshing, loading: refreshing, onClick: () => doLogin(), children: t('login') }))] }), _jsxs(List, { className: Style.list, split: true, children: [_jsx(List.Item, { onClick: () => goMyMobile(), children: _jsx(List.Item.Meta, { avatar: _jsx(MobileOutlined, {}), title: "\u624B\u673A\u53F7", description: mobileText }) }), isRoot && (_jsx(List.Item, { onClick: () => goUserManage(), children: _jsx(List.Item.Meta, { avatar: _jsx(UserOutlined, {}), title: "\u7528\u6237\u7BA1\u7406" }) }))] })] }));
}
