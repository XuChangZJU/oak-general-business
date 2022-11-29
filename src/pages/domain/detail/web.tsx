import React from 'react';
import { Tabs, Card } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import ApplicationList from '../../../pages/application/list';

import Style from './web.module.less';

import { EntityDict } from '../../../general-app-domain';
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
        },
        {
            onTabClick: (key: string) => void;
        }
    >
) {
    const { oakId, url, tabValue } = props.data;
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
                                children: <div>详情</div>,
                            },
                        ]}
                    />
                </Card>
            </div>
        </PageHeader>
    );
}