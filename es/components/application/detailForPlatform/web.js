import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Tabs, Card } from 'antd';
import WechatMenu from '../../wechatMenu';
import WechatPublicAutoReply from '../../wechatPublicAutoReply';
import UserWechatPublicTag from '../../userWechatPublicTag';
export default function Render(props) {
    const { oakId, tabValue, name } = props.data;
    const { t, navigateBack, onTabClick } = props.methods;
    const [tabKey, setTabKey] = useState('menu');
    const Actions = [];
    const items = [
        {
            label: '公众号菜单管理',
            key: 'menu',
            children: (_jsx(WechatMenu, { oakAutoUnmount: true, applicationId: oakId, oakPath: `$application-detail-menu-${oakId}`, isPlatform: true, tabKey: tabKey }))
        },
        {
            label: '被关注回复管理',
            key: 'autoReply',
            children: (_jsx(WechatPublicAutoReply, { oakAutoUnmount: true, applicationId: oakId, oakPath: `$application-detial-autoReply-${oakId}` }))
        },
        {
            label: '用户管理',
            key: 'user',
            children: (_jsx(UserWechatPublicTag, { oakAutoUnmount: true, applicationId: oakId, oakPath: `$application-detail-user-${oakId}` }))
        }
    ];
    return (_jsx(Card, { title: name, bordered: false, extra: Actions, children: _jsx(Tabs, { items: items, onChange: (key) => {
                setTabKey(key);
            } }) }));
}
