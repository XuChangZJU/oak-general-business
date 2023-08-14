import React from 'react';
import QrCode from '../../../components/common/qrCode';
import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
import { Space } from 'antd';
import UnbindBtn from '../unbindBtn';

import Style from './web.module.less';

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
                    oakPath={oakFullpath ? `${oakFullpath}.${ele.id}` : undefined}
                />
            ))}
        </Space>
    );
}

