import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { List, Button, Avatar, Input, Drawer } from 'antd';
import { UserOutlined, MobileOutlined } from '@ant-design/icons';
import Style from './web.module.less';
import { generateNewId } from 'oak-domain/lib/utils/uuid';
export default function Render(props) {
    const { avatar, isLoggedIn, refreshing, mobileText, isRoot, oakExecuting, tokenId, nickname, oakDirty } = props.data;
    const { doLogin, t, goMyMobile, goUserManage, clean, execute, updateItem, goMyInfo } = props.methods;
    const [showDrawer, setShowDrawer] = useState(false);
    return (_jsxs("div", { className: Style.container, children: [_jsxs("div", { className: Style.userInfo, children: [avatar ? (_jsx(Avatar, { className: Style.avatar, src: avatar })) : (_jsx(Avatar, { className: Style.avatar, icon: _jsx(UserOutlined, { className: Style.userIcon }) })), _jsx("span", { className: Style.nickname, children: nickname || '未设置' }), isLoggedIn ? (_jsx(Button, { type: "primary", size: "small", disabled: refreshing, loading: refreshing, onClick: () => goMyInfo(), children: t('common::action.update') })) : (_jsx(Button, { size: "small", disabled: refreshing, loading: refreshing, onClick: () => doLogin(), children: t('login') }))] }), _jsx(List, { className: Style.list, split: true, children: _jsx(List.Item, { onClick: () => goMyMobile(), children: _jsx(List.Item.Meta, { avatar: _jsx(MobileOutlined, {}), title: "\u624B\u673A\u53F7", description: mobileText }) }) }), isRoot && (_jsxs(_Fragment, { children: [_jsx("div", { style: { flex: 1 } }), _jsx(List, { className: Style.list, split: true, children: _jsx(List.Item, { onClick: () => goUserManage(), children: _jsx(List.Item.Meta, { avatar: _jsx(UserOutlined, {}), title: "\u7528\u6237\u7BA1\u7406" }) }) })] })), _jsx(Drawer, { placement: "bottom", open: showDrawer, title: "\u4FEE\u6539\u6635\u79F0", onClose: () => {
                    clean(undefined);
                    setShowDrawer(false);
                }, extra: _jsx(Button, { disabled: oakExecuting || !oakDirty, onClick: async () => {
                        await execute();
                        setShowDrawer(false);
                    }, children: t('common::action.confirm') }), children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165\u6635\u79F0", value: nickname, onChange: (e) => updateItem({
                        user: {
                            id: generateNewId(),
                            action: 'update',
                            data: {
                                nickname: e.target.value,
                            },
                        },
                    }, tokenId) }) })] }));
}
