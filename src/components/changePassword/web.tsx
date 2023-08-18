import React, { useState } from 'react';
import { Tag, Badge, Form, Input, Tabs, Space, Button, Alert } from 'antd';
import dayjs from 'dayjs';
import Style from './web.module.less';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../oak-app-domain';
import { EyeInvisibleOutlined, EyeTwoTone, MobileOutlined } from '@ant-design/icons';
import ByMobile from './byMobile';
import ByPassword from './byPassword';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'message',
        false,
        {
            user: EntityDict['user']['Schema'],
            channels: string[],
            oakId: string,
        },
        {
            goToMobile: () => void,
        }
    >
) {
    const { data, methods } = props;
    const {
        channels,
        user,
        oakFullpath,
        oakId
    } = data;
    const { goToMobile } = methods;
    const items = [
        {
            key: 'password',
            label: '原密码验证',
            children: <ByPassword
                oakId={oakId}
                oakPath={oakFullpath}
            />
        },
        {
            key: 'mobile',
            label: '手机号验证',
            children: <ByMobile
                oakId={oakId}
                oakPath={oakFullpath}
            />
        }
    ]
    if (channels.length === 0) {
        return <Alert message={<>请您先<div
            style={
                {
                    color: 'blue',
                    display: 'inline',
                    textDecoration: 'underline'
                }
            }
            onClick={() => goToMobile()}
        >
            点此绑定手机号
        </div>再进行密码修改</>} type="info" />
    }
    return (
        <Tabs items={items.filter((ele) => channels.includes(ele.key))} />
    );
}
