import React, { Component } from 'react';
import { Cell, Tag, Avatar, TagProps } from 'tdesign-mobile-react';
import Style from './web.module.less';

type CustomTagProps = {
    children?: any;
};

const CustomTag: React.MemoExoticComponent<
    React.ForwardRefExoticComponent<
        CustomTagProps & TagProps & React.RefAttributes<HTMLDivElement>
    >
> = Tag;

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
            <Cell title="手机号" note={getMobile()} />
            <Cell
                title="用户状态"
                note={
                    <CustomTag
                        theme={stateColor[userState]}
                        className=""
                        style={{}}
                    >
                        {t(`user:v.userState.${userState}`)}
                    </CustomTag>
                }
            />
            <Cell
                title="实名验证"
                note={
                    <CustomTag
                        theme={idStateColor[idState]}
                        className=""
                        style={{}}
                    >
                        {t(`user:v.idState.${idState}`)}
                    </CustomTag>
                }
            />
        </div>
    );
}
