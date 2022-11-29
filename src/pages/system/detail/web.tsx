import React from 'react';
import { Tabs, Card } from 'antd';
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
            config: Config;
            tabValue: 'detail' | 'application_list' | 'domain_list';
        },
        {
            onTabClick: (key: string) => void;
        }
    >
) {
    const { oakId, config, name, tabValue } = props.data;
    const { t, navigateBack, onTabClick } = props.methods;
    return (
        <PageHeader showBack={true} title="系统概览">
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
                                children: <div>详情</div>,
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