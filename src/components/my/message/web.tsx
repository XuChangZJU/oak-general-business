import React from 'react';
import { Badge } from 'antd-mobile';
import { BellOutlined } from '@ant-design/icons';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';

import Style from './mobile.module.less';

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
    const { data, methods } = props;
    const { count } = data;
    const { goMessageList } = methods;

    return (
        <>
            <Badge content={count || ''}>
                <BellOutlined
                    className={Style.icon}
                    onClick={() => {
                        goMessageList();
                    }}
                />
            </Badge>
        </>
    );
}
