import React from 'react';
import { Tabs, Card, Descriptions } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import ApplicationList from '../../../pages/application/list';
import DomainList from '../../../pages/domain/list';

import Style from './web.module.less';

import { EntityDict } from '../../../general-app-domain';
import { Config } from '../../../types/Config';
import { WebComponentProps } from 'oak-frontend-base';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'platform',
        false,
        {
            name: string;
            description: string;
            oakId: string;
            folder: string;
            config: Config;
            tabValue: 'detail' | 'application_list' | 'domain_list';
            super: boolean;
            platform: {
                name: string;
            }
        },
        {
            onTabClick: (key: string) => void;
        }
    >
) {
    const { oakId, folder, name, tabValue, description, 'super': isSuper, platform } = props.data;
    const { t, navigateBack, onTabClick } = props.methods;
    return (
        <PageHeader showBack={true} title="系统信息">
            <div className={Style.container}>
                <Card title={name} bordered={false}>
                    <Tabs
                        activeKey={tabValue}
                        onTabClick={(key) => {
                            onTabClick(key);
                        }}
                        items={[
                            {
                                label: '系统概览',
                                key: 'detail',
                                children: <Descriptions column={1} bordered>
                                <Descriptions.Item label="id">{oakId}</Descriptions.Item>
                                <Descriptions.Item label={t('system:attr.name')}>{name}</Descriptions.Item>
                                <Descriptions.Item label={t('system:attr.description')}>{description}</Descriptions.Item>
                                <Descriptions.Item label={t('system:attr.super')}>{isSuper ? '是' : '否'}</Descriptions.Item>
                                <Descriptions.Item label={t('system:attr.folder')}>{folder}</Descriptions.Item>
                                <Descriptions.Item label={t('system:attr.platform') + t('platform:attr.name')}>{platform?.name}</Descriptions.Item>
                            </Descriptions>,
                            },
                            {
                                label: '应用管理',
                                key: 'application_list',
                                children: (
                                    <ApplicationList
                                        systemId={oakId}
                                        variant="inline"
                                        oakPath="$system/detail-application/list"
                                        oakAutoUnmount={true}
                                    />
                                ),
                            },
                            {
                                label: '域名管理',
                                key: 'domain_list',
                                children: (
                                    <DomainList
                                        systemId={oakId}
                                        variant="inline"
                                        oakPath="$system/detail-domain/list"
                                        oakAutoUnmount={true}
                                    />
                                ),
                            },
                        ]}
                    />
                </Card>
            </div>
        </PageHeader>
    );
}