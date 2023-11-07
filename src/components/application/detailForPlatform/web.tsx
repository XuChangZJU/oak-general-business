import React, { ReactNode, useState } from 'react';
import { Tabs, Card, TabsProps } from 'antd';

import {
    AppType,
    WebConfig,
    WechatPublicConfig,
    WechatMpConfig,
} from '../../../oak-app-domain/Application/Schema';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import WechatMenu from '../../wechatMenu';
import WechatPublicAutoReply from '../../wechatPublicAutoReply';
import UserWechatPublicTag from '../../userWechatPublicTag';

type Config = WebConfig | WechatPublicConfig | WechatMpConfig;

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'application',
        false,
        {
            name: string;
            description: string;
            oakId: string;
            config: Config;
            tabValue: 'detail';
            type: EntityDict['application']['Schema']['type'];
            style: EntityDict['application']['Schema']['style'];
            system: EntityDict['system']['Schema'];
        },
        {
            onTabClick: (key: string) => void;
            goWechatPublicTagList: () => void;
        }
    >
) {
    const { oakId, tabValue, name } = props.data;
    const { t, navigateBack, onTabClick } = props.methods;
    const [tabKey, setTabKey] = useState('menu');
    const Actions: ReactNode[] = [];
    const items: TabsProps['items'] = [
        {
            label: '公众号菜单管理',
            key: 'menu',
            children: (
                <WechatMenu
                    oakAutoUnmount={true}
                    applicationId={oakId}
                    oakPath={`$application-detail-menu-${oakId}`}
                    isPlatform={true}
                    tabKey={tabKey}
                />
            )
        },
        {
            label: '被关注回复管理',
            key: 'autoReply',
            children: (
                <WechatPublicAutoReply
                    oakAutoUnmount={true}
                    applicationId={oakId}
                    oakPath={`$application-detial-autoReply-${oakId}`}
                />
            )
        },
        {
            label: '用户管理',
            key: 'user',
            children: (
                <UserWechatPublicTag
                    oakAutoUnmount={true}
                    applicationId={oakId}
                    oakPath={`$application-detail-user-${oakId}`}
                />
            )
        }
    ]

    return (
        <Card title={name} bordered={false} extra={Actions}>
            <Tabs
                items={items}
                onChange={(key) => {
                    setTabKey(key);
                }}
            />
        </Card>
    );
}