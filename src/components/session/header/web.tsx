import React from "react";
import { Avatar } from 'antd';
// import { UserOutlined } from '@ant-design/icons';

import Style from './web.module.less';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';

export default function render(props: WebComponentProps<
    EntityDict,
    'session',
    false,
    {
        avatarUrl: string,
        nickname: string,
        name: string,
    },
    {

    }
>) {
    const { methods, data } = props;
    const { nickname, avatarUrl, name } = data;
    const defaultUrl = 'http://qiniu.gecomebox.com/static/defaultAvatar.png'

    return (
        <div className={Style.header}>
            {/* {avatarUrl ? (
                <Avatar
                    shape="square"
                    className={Style.avatar}
                    src={avatarUrl || defaultUrl}
                />
            ) : (
                <Avatar
                    shape="square"
                    className={Style.avatar}
                    icon={<UserOutlined className={Style.icon} />}
                />
            )} */}
            <Avatar
                shape="square"
                className={Style.avatar}
                src={avatarUrl || defaultUrl}
            />

            <div className={Style.nickname}>{nickname || name}</div>
        </div>
    );
}