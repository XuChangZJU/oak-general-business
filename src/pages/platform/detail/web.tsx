import React from 'react';
import { Tabs, Card } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import SystemList from '../../../pages/system/list';

import Style from './web.module.less';

export default function render(this: any) {
    const { namespace, oakId } = this.props;
    const { config, name, tabValue } = this.state;
    return (
        <PageHeader showBack={true} title="平台概览">
            <div className={Style.container}>
                <Card title={name} bordered={false}>
                    <Tabs
                        activeKey={tabValue}
                        onTabClick={(key) => {
                            this.onTabClick(key);
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
                                        namespace={namespace}
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