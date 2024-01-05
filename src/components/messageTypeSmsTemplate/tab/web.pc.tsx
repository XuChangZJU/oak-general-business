import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import React, { useState } from 'react';
import { Tabs } from 'antd';
import MessageTypeSmsTemplateList from '../list';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'messageTypeTemplate',
        false,
        {
            systemId: string,
            originList: string[],
        },
        {
        }
    >
) {
    const {
        systemId,
        originList
    } = props.data;
    const {
    } = props.methods;
    const [tabKey, setTabKey] = useState(originList[0]);
    const items = originList.map(
        (ele) => {
            return {
                label: ele,
                key: ele,
                children: (
                    <MessageTypeSmsTemplateList
                        oakAutoUnmount={true}
                        systemId={systemId}
                        origin={ele}
                        oakPath={`$system-smsTemplate-${systemId}-${ele}`}
                    />
                )
            }
        }
    )
    return (
        <>
            <Tabs
                items={items}
                onChange={(key) => {
                    setTabKey(key);
                }}
            />
        </>
    );
}
