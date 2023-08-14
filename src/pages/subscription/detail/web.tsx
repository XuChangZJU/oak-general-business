import React from 'react';
import { Tabs, Card, Descriptions, Typography } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import Style from './web.module.less';

import {
    WechatPublicConfig,
} from '../../../oak-app-domain/Application/Schema';

import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

type Config = WechatPublicConfig;

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'subscription',
        false,
        {
            name: string;
            description: string;
            oakId: string;
            config: Config;
            entity: string;
            entityId: string;
            tabValue: 'detail';
        },
        {
            onTabClick: (key: string) => void;
        }
    >
) {
    const { oakId, tabValue, config, name, description, entity, entityId } =
        props.data;
    const { t, navigateBack, onTabClick } = props.methods;

    return (
        <PageHeader showBack={true} title="订阅号概览">
            <div className={Style.container}>
                <Card title={name} bordered={false}>
                    <Tabs
                        items={[
                            {
                                label: '订阅号概览',
                                key: 'detail',
                                children: (
                                    <Descriptions column={1} bordered>
                                        <Descriptions.Item label="id">
                                            <Typography.Paragraph copyable>
                                                {oakId}
                                            </Typography.Paragraph>
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                            label={t('subscription:attr.name')}
                                        >
                                            {name}
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                            label={t(
                                                'subscription:attr.description'
                                            )}
                                        >
                                            {description}
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