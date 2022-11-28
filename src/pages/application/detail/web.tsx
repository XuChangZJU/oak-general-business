import React from 'react';
import { Tabs, Card } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import Style from './web.module.less';

import {
    AppType,
    WebConfig,
    WechatPublicConfig,
    WechatMpConfig,
} from '../../../general-app-domain/Application/Schema';

import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

type Config = WebConfig | WechatPublicConfig | WechatMpConfig;

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
            tabValue: 'detail';
        },
        {
            onTabClick: (key: string) => void;
        }
    >
) {
    const { oakId, config, name, tabValue } = props.data;
    const { t, navigateBack, onTabClick } = props.methods;
    
    return (
        <PageHeader showBack={true} title="应用概览">
            <div className={Style.container}>
                <Card title={name} bordered={false}>
                    <Tabs
                        items={[
                            {
                                label: '应用概览',
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