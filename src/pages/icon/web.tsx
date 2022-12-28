import React, { useState } from 'react';
import { List, Button, Avatar, Input, Drawer } from 'antd';
import { EntityDict } from '../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

import Style from './web.module.less';


export default function Render(
    props: WebComponentProps<EntityDict, 'token', true, {}, {}>
) {
    return <div className={Style.container}>
        1122
    </div>;
}
