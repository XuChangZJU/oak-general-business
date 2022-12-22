import React, { useState } from 'react';
import { Button, Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import MessageDrawerList from '../../../pages/message/drawerList';

import Style from './web.module.less';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'user',
        false,
        {
            count?: number;
        },
        {
            goMessageList: () => void;
        }
    >
) {
    const { data } = props;
    const { count } = data;
    const [open, setOpen] = useState(false);

    return (
        <>
            <Badge count={count}>
                <Button
                    className={Style.btn}
                    type="text"
                    shape="circle"
                    icon={<BellOutlined />}
                    onClick={() => {
                        setOpen(true);
                    }}
                />
            </Badge>
            <MessageDrawerList
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
            />
        </>
    );
}
