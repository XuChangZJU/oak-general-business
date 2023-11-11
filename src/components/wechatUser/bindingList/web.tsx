import React from 'react';
import { Space } from 'antd';
import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
import UnbindBtn from '../unbindBtn';


export default function Render(
    props: WebComponentProps<
        EntityDict,
        'wechatUser',
        true,
        {
            wechatUsers: EntityDict['wechatUser']['Schema'][];
        },
        {}
    >
) {
    const { wechatUsers, oakFullpath } = props.data;

    return (
        <Space>
            {wechatUsers && wechatUsers.map((ele) => (
                <UnbindBtn
                    oakId={ele.id}
                    oakPath={`${oakFullpath}.${ele.id}`}
                />
            ))}
        </Space>
    );
}

