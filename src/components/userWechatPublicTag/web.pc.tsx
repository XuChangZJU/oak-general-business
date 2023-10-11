import React, { useState, useEffect } from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../oak-app-domain';
import Style from './web.module.less';
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
        {
        }
    >
) {
    const { oakFullpath, applicationId } = props.data;
    const { } = props.methods;

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '已关注',
            children: <SubscribedList
                oakAutoUnmount={true}
                applicationId={applicationId}
                oakPath='$subscribedList'
            />
        },
        
    ];

    if (oakFullpath) {
        return (
            <div className={Style.container}>
                <Tabs
                    items={items}
                />
            </div>
        )
    }
    return null;
}