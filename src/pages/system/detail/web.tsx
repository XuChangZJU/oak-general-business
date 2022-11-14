import React from 'react';
import { Tabs, Card } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import ApplicationList from '../../../pages/application/list';

import Style from './web.module.less';

export default function render(this: any) {
    const { namespace, oakId } = this.props;
    const { config, name, tabValue } = this.state;
    return (
        <PageHeader showBack={true} title="系统概览">
            <div className={Style.container}>
                <Card title={name} bordered={false}>
                    <Tabs
                        activeKey={tabValue}
                        onTabClick={(key) => {
                            this.onTabClick(key);
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
                                        namespace={namespace}
                                        systemId={oakId}
                                        variant="inline"
                                        oakPath="$system/detail-application/list"
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