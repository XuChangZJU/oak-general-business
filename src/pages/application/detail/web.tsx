import React, { ReactNode } from 'react';
import { Tabs, Card, Descriptions, Typography, Button } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import Style from './web.module.less';

import {
    AppType,
    WebConfig,
    WechatPublicConfig,
    WechatMpConfig,
} from '../../../general-app-domain/Application/Schema';

import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

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

    const Actions: ReactNode[] = [];
    if (type === 'wechatPublic') {
        Actions.push(
            <Button
                onClick={() => goWechatPublicTagList()}
            >
                公众号Tag管理
            </Button>
        );
    }

    return (
        <PageHeader showBack={true} title="应用概览">
            <div className={Style.container}>
                <Card title={name} bordered={false} actions={Actions}>
                    <Tabs
                        items={[
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
                        ]}
                    />
                </Card>
            </div>
        </PageHeader>
    );
}