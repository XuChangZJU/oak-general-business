import React from 'react';
import { Tag, Badge } from 'antd';
import dayjs from 'dayjs';
import Style from './web.module.less';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../general-app-domain';


export default function Render(
    props: WebComponentProps<
        EntityDict,
        'message',
        false,
        {
            user: EntityDict['user']['Schema'],
        },
        {}
    >
) {
    const { data, methods } = props;
    const {

    } = data;
    const { navigateTo, execute } = methods;

    return (
        <></>
    );
}
