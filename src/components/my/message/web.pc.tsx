import React, { useState } from 'react';
import { Button, Badge } from 'antd';
import classNames from 'classnames';
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
            onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
            className?: string;
            style?: React.CSSProperties;
            buttonStyle?: React.CSSProperties;
            buttonClassName?: string;
        },
        {
            goMessageList: () => void;
        }
    >
) {
    const { data } = props;
    const { count, className, onClick, style, buttonStyle, buttonClassName } =
        data;
    const [open, setOpen] = useState(false);

    return (
        <>
            <Badge count={count}>
                <Button
                    className={classNames(Style.btn, buttonClassName)}
                    style={buttonStyle}
                    type="text"
                    shape="circle"
                    icon={
                        <BellOutlined
                            className={classNames(Style.icon, className)}
                            style={style}
                        />
                    }
                    onClick={(e) => {
                        if (typeof onClick === 'function') {
                            onClick(e);
                            return;
                        }
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
