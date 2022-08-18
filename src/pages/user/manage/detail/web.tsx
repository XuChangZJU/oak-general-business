import React, { Component } from 'react';
import { Cell, Tag, Avatar } from 'tdesign-mobile-react';

export default function render(this: any) {
    const { t } = this;
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
            <Cell
                title="头像"
                note={avatar ? <Avatar image={avatar} /> : '未设置'}
            />
            <Cell title="昵称" note={nickname || '未设置'} />
            <Cell title="姓名" note={name || '未设置'} />
            <Cell
                title="手机号"
                note={getMobile()}
            />
            <Cell
                title="用户状态"
                note={
                    <Tag theme={stateColor[userState]}>
                        {t(`user:v.userState.${userState}`)}
                    </Tag>
                }
            />
            <Cell
                title="实名验证"
                note={
                    <Tag theme={idStateColor[idState]}>
                        {t(`user:v.idState.${idState}`)}
                    </Tag>
                }
            />
        </div>
    );
}
