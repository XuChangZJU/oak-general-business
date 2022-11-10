import React from 'react';
import { Tabs, Card } from 'antd';
import PageHeader from '../../../components/common/pageHeader';

import Style from './web.module.less';

export default function render(this: any) {
    const { namespace, oakId } = this.props;
    const { config, name } = this.state;
    return (
        <PageHeader>
            <div className={Style.container}>
                <Card title={name} bordered={false}>
                    <Tabs
                        items={[
                            {
                                label: '平台概览',
                                key: '平台概览',
                                children: <div>详情</div>,
                            },
                            {
                                label: '系统管理',
                                key: '系统管理',
                                children: <div>系统列表</div>,
                            },
                        ]}
                    />
                </Card>
            </div>
        </PageHeader>
    );
}