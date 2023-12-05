import React, { useState } from 'react';
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
            children: (<WechatMenu oakAutoUnmount={true} applicationId={oakId} oakPath={`$application-detail-menu-${oakId}`} isPlatform={true} tabKey={tabKey}/>)
        },
        {
            label: '被关注回复管理',
            key: 'autoReply',
            children: (<WechatPublicAutoReply oakAutoUnmount={true} applicationId={oakId} oakPath={`$application-detial-autoReply-${oakId}`}/>)
        },
        {
            label: '用户管理',
            key: 'user',
            children: (<UserWechatPublicTag oakAutoUnmount={true} applicationId={oakId} oakPath={`$application-detail-user-${oakId}`}/>)
        }
    ];
    return (<Card title={name} bordered={false} extra={Actions}>
            <Tabs items={items} onChange={(key) => {
            setTabKey(key);
        }}/>
        </Card>);
}
