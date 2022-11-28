import React from 'react';
import { Tabs, Card } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import SystemList from '../../../pages/system/list';

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
            tabValue: 'detail' | 'system_list';
        },
        {
            onTabClick: (key: string) => void;
        }
    >
) {
    const { oakId, config, name, tabValue } = props.data;
    const { t, navigateBack, onTabClick } = props.methods;

    return (
        <PageHeader showBack={true} title="平台概览">
            <div className={Style.container}>
                <Card title={name} bordered={false}>
                    <Tabs
                        activeKey={tabValue}
                        onTabClick={(key) => {
                            onTabClick(key);
                        }}
                        items={[
                            {
                                label: '平台概览',
                                key: 'detail',
                                children: <div>详情</div>,
                            },
                            {
                                label: '系统管理',
                                key: 'system_list',
                                children: (
                                    <SystemList
                                        platformId={oakId}
                                        variant="inline"
                                        oakPath="$platform/detail/-system/list"
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