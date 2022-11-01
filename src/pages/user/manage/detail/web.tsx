import React from 'react';

import { List, Tag, Avatar } from 'antd';

import Style from './web.module.less';


export default function render(this: any) {
    const {
        nickname,
        avatar,
        name,
        mobile,
        userState,
        idState,
        stateColor,
        idStateColor,
        mobileCount,
    } = this.state;


    const getMobile = () => {
        if (mobileCount > 1) {
            return `${mobileCount}条手机号`;
        }
        else if (mobileCount === 1) {
            return mobile;
        }
        else {
            return '未设置';
        }
    }

    return (
        <div>
            <List split={true} className={Style.list}>
                <List.Item extra={avatar ? <Avatar src={avatar} /> : '未设置'}>
                    <List.Item.Meta title="头像"></List.Item.Meta>
                </List.Item>

                <List.Item extra={nickname || '未设置'}>
                    <List.Item.Meta title="昵称"></List.Item.Meta>
                </List.Item>

                <List.Item extra={name || '未设置'}>
                    <List.Item.Meta title="真实姓名"></List.Item.Meta>
                </List.Item>

                <List.Item extra={getMobile()}>
                    <List.Item.Meta title="手机号"></List.Item.Meta>
                </List.Item>

                <List.Item
                    extra={
                        <Tag color={stateColor[userState]}>
                            {this.t(`user:v.userState.${userState}`)}
                        </Tag>
                    }
                >
                    <List.Item.Meta title="用户状态"></List.Item.Meta>
                </List.Item>

                <List.Item
                    extra={
                        <Tag color={idStateColor[idState]}>
                            {this.t(`user:v.idState.${idState}`)}
                        </Tag>
                    }
                >
                    <List.Item.Meta title="实名验证"></List.Item.Meta>
                </List.Item>
            </List>
        </div>
    );
}
