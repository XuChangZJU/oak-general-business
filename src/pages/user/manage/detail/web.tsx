import React from 'react';

import { List, Tag, Avatar } from 'tdesign-react';

import Style from './web.module.less';
const { ListItem, ListItemMeta } = List;


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
                <ListItem
                    action={avatar ? <Avatar image={avatar} /> : '未设置'}
                >
                    <ListItemMeta title="头像"></ListItemMeta>
                </ListItem>

                <ListItem action={nickname || '未设置'}>
                    <ListItemMeta title="昵称"></ListItemMeta>
                </ListItem>

                <ListItem action={name || '未设置'}>
                    <ListItemMeta title="真实姓名"></ListItemMeta>
                </ListItem>

                <ListItem action={getMobile()}>
                    <ListItemMeta title="手机号"></ListItemMeta>
                </ListItem>

                <ListItem
                    action={
                        <Tag theme={stateColor[userState]}>
                            {this.t(`user:v.userState.${userState}`)}
                        </Tag>
                    }
                >
                    <ListItemMeta title="用户状态"></ListItemMeta>
                </ListItem>

                <ListItem
                    action={
                        <Tag theme={idStateColor[idState]}>
                            {this.t(`user:v.idState.${idState}`)}
                        </Tag>
                    }
                >
                    <ListItemMeta title="实名验证"></ListItemMeta>
                </ListItem>
            </List>
        </div>
    );
}
