import React from 'react';
import { Badge } from 'antd-mobile';
import classNames from 'classnames';
import { BellOutlined } from '@ant-design/icons';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';

import Style from './mobile.module.less';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'user',
        false,
        {
            count?: number;
            onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
            className?: string;
            style?: React.CSSProperties;
        },
        {
            goMessageList: () => void;
        }
    >
) {
    const { data, methods } = props;
    const { count, className, onClick, style } = data;
    const { goMessageList } = methods;

    return (
        <Badge content={count || ''}>
            <BellOutlined
                className={classNames(Style.icon, className)}
                style={style}
                onClick={(e) => {
                    if (typeof onClick === 'function') {
                        onClick(e);
                        return;
                    }
                    goMessageList();
                }}
            />
        </Badge>
    );
}
