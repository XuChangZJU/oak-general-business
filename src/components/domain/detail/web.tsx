import React from 'react';
import { Tabs, Card, Descriptions, Typography } from 'antd';
import PageHeader from '../../../components/common/pageHeader';

import Style from './web.module.less';

import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'domain',
        false,
        {
            oakId: string;
            systemId: string;
            url: string;
            apiPath: string;
            port: string;
            protocol: EntityDict['domain']['Schema']['protocol'];
            tabValue: 'detail';
            system: EntityDict['system']['Schema'];
        },
        {
            onTabClick: (key: string) => void;
        }
    >
) {
    const { oakId, url, tabValue, system, apiPath, protocol, port } =
        props.data;
    const { t, navigateBack, onTabClick } = props.methods;
    return (
        <PageHeader showBack={true} title="域名概览">
            <div className={Style.container}>
                <Card title={url} bordered={false}>
                    <Tabs
                        activeKey={tabValue}
                        onTabClick={(key) => {
                            onTabClick(key);
                        }}
                        items={[
                            {
                                label: '域名概览',
                                key: 'detail',
                                children: (
                                    <Descriptions column={1} bordered>
                                        <Descriptions.Item label="id">
                                            <Typography.Paragraph copyable>
                                                {oakId}
                                            </Typography.Paragraph>
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                            label={t('domain:attr.url')}
                                        >
                                            {url}
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                            label={t('domain:attr.apiPath')}
                                        >
                                            {apiPath}
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                            label={t('domain:attr.port')}
                                        >
                                            {port}
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                            label={t('domain:attr.protocol')}
                                        >
                                            {protocol}
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                            label={
                                                t('domain:attr.system') +
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