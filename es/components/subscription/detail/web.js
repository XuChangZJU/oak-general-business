import React from 'react';
import { Tabs, Card, Descriptions, Typography } from 'antd';
export default function Render(props) {
    const { oakId, tabValue, config, name, description, entity, entityId } = props.data;
    const { t, navigateBack, onTabClick } = props.methods;
    return (<Card title={name} bordered={false}>
            <Tabs items={[
            {
                label: '订阅号概览',
                key: 'detail',
                children: (<Descriptions column={1} bordered>
                                <Descriptions.Item label="id">
                                    <Typography.Paragraph copyable>
                                        {oakId}
                                    </Typography.Paragraph>
                                </Descriptions.Item>
                                <Descriptions.Item label={t('subscription:attr.name')}>
                                    {name}
                                </Descriptions.Item>
                                <Descriptions.Item label={t('subscription:attr.description')}>
                                    {description}
                                </Descriptions.Item>
                            </Descriptions>),
            },
        ]}/>
        </Card>);
}
