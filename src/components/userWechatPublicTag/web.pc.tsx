import React, { useState, useEffect } from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../oak-app-domain';
import { Row, Col, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import SubscribedList from './subscribedList';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'userWechatPublicTag',
        true,
        {
            applicationId: string;
        },
        {}
    >
) {
    const { oakFullpath, applicationId } = props.data;
    const { t } = props.methods;

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '已关注',
            children: (
                <SubscribedList
                    oakAutoUnmount={true}
                    applicationId={applicationId}
                    oakPath={`${oakFullpath}.wechatUsers`}
                />
            ),
        },
    ];

    return <Tabs items={items} />;
}
