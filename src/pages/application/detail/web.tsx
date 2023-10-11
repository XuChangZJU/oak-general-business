import React, { ReactNode, useState } from 'react';
import { Tabs, Card, Descriptions, Typography, Button, TabsProps } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import Style from './web.module.less';

import {
    AppType,
    WebConfig,
    WechatPublicConfig,
    WechatMpConfig,
} from '../../../oak-app-domain/Application/Schema';

import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
import MessageTypeTemplateIdList from '../../../components/messageTypeTemplateId/list';
import WechatMenu from '../../../components/wechatMenu';
import UserWechatPublicTag from '../../../components/userWechatPublicTag';
import WechatPublicTag from '../../../components/wechatPublicTag/list';
import WechatPublicAutoReply from '../../../components/wechatPublicAutoReply';

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
    const { oakId, tabValue, config, name, description, type, system } =
        props.data;
    const { t, navigateBack, onTabClick, goWechatPublicTagList } = props.methods;
    const [tabKey, setTabKey] = useState('');
    const Actions: ReactNode[] = [];
    const items: TabsProps['items'] = [
        {
            label: '应用概览',
            key: 'detail',
            children: (
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="id">
                        <Typography.Paragraph copyable>
                            {oakId}
                        </Typography.Paragraph>
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('application:attr.name')}
                    >
                        {name}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t(
                            'application:attr.description'
                        )}
                    >
                        {description}
                    </Descriptions.Item>

                    <Descriptions.Item
                        label={t('application:attr.type')}
                    >
                        {t(`application:v.type.${type}`)}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={
                            t('application:attr.system') +
                            t('system:attr.name')
                        }
                    >
                        {system?.name}
                    </Descriptions.Item>
                </Descriptions>
            ),
        },
    ];
    if (['wechatPublic', 'wechatMp'].includes(type)) {
        items.push({
            label: '模板消息管理',
            key: 'mttId',
            children: (
                <MessageTypeTemplateIdList
                    oakAutoUnmount={true}
                    applicationId={oakId}
                    oakPath={`$application-detail-mttId-${oakId}`}
                />
            ),
        });
    }
    if (['wechatPublic'].includes(type)) {
        items.push(
            {
                label: '菜单管理',
                key: 'menu',
                children: (
                    <WechatMenu
                        oakAutoUnmount={true}
                        applicationId={oakId}
                        oakPath={`$application-detail-menu-${oakId}`}
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
                label: '标签管理',
                key: 'tag',
                children: (
                    <WechatPublicTag
                        oakAutoUnmount={true}
                        applicationId={oakId}
                        oakPath={`$application-detail-tag-${oakId}`}
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
        )
    }

    return (
        <PageHeader showBack={true} title="应用概览">
            <div className={Style.container}>
                <Card title={name} bordered={false} extra={Actions}>
                    <Tabs
                        items={items}
                        onChange={(key) => {
                            setTabKey(key);
                        }}
                    />
                </Card>
            </div>
        </PageHeader>
    );
}