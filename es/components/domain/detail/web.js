import React from 'react';
import { Tabs, Card, Descriptions, Typography } from 'antd';
export default function Render(props) {
    const { oakId, url, tabValue, system, apiPath, protocol, port } = props.data;
    const { t, navigateBack, onTabClick } = props.methods;
    return (<Card title={url} bordered={false}>
            <Tabs activeKey={tabValue} onTabClick={(key) => {
            onTabClick(key);
        }} items={[
            {
                label: '域名概览',
                key: 'detail',
                children: (<Descriptions column={1} bordered>
                                <Descriptions.Item label="id">
                                    <Typography.Paragraph copyable>
                                        {oakId}
                                    </Typography.Paragraph>
                                </Descriptions.Item>
                                <Descriptions.Item label={t('domain:attr.url')}>
                                    {url}
                                </Descriptions.Item>
                                <Descriptions.Item label={t('domain:attr.apiPath')}>
                                    {apiPath}
                                </Descriptions.Item>
                                <Descriptions.Item label={t('domain:attr.port')}>
                                    {port}
                                </Descriptions.Item>
                                <Descriptions.Item label={t('domain:attr.protocol')}>
                                    {protocol}
                                </Descriptions.Item>
                                <Descriptions.Item label={t('domain:attr.system') +
                        t('system:attr.name')}>
                                    {system?.name}
                                </Descriptions.Item>
                            </Descriptions>),
            },
        ]}/>
        </Card>);
}
