import React, { useState } from 'react';
import { List, Button, Avatar } from 'antd';
import { UserOutlined, MobileOutlined } from '@ant-design/icons';
import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

import Style from './web.module.less';


export default function Render(
    props: WebComponentProps<
        EntityDict,
        'token',
        true,
        {
            avatar?: string;
            nickname?: string;
            isLoggedIn?: boolean;
            mobile?: string;
            mobileCount?: number;
            refreshing?: boolean;
            isRoot: boolean;
            tokenId?: string;
            mobileText: string;
        },
        {
            goMyInfo: () => Promise<void>;
            doLogin: () => Promise<void>;
            goMyMobile: () => Promise<void>;
            goUserManage: () => Promise<void>;
        }
    >
) {
    const {
        avatar,
        isLoggedIn,
        refreshing,
        mobileText,
        isRoot,
        oakExecuting,
        tokenId,
        nickname,
        oakDirty,
    } = props.data;
    const { doLogin, t, goMyMobile, goUserManage, goMyInfo } = props.methods;
    return (
        <div className={Style.container}>
            <div className={Style.userInfo}>
                {avatar ? (
                    <Avatar className={Style.avatar} src={avatar} />
                ) : (
                    <Avatar
                        className={Style.avatar}
                        icon={<UserOutlined className={Style.userIcon} />}
                    />
                )}
                <span className={Style.nickname}>{nickname || '未设置'}</span>
                {isLoggedIn ? (
                    <Button
                        type="primary"
                        size="small"
                        disabled={refreshing}
                        loading={refreshing}
                        onClick={() => goMyInfo()}
                    >
                        {t('common::action.update')}
                    </Button>
                ) : (
                    <Button
                        size="small"
                        disabled={refreshing}
                        loading={refreshing}
                        onClick={() => doLogin()}
                    >
                        {t('login')}
                    </Button>
                )}
            </div>
            <List className={Style.list} split={true}>
                <List.Item onClick={() => goMyMobile()}>
                    <List.Item.Meta
                        avatar={<MobileOutlined />}
                        title="手机号"
                        description={mobileText}
                    />
                </List.Item>

                {isRoot && (
                    <List.Item onClick={() => goUserManage()}>
                        <List.Item.Meta
                            avatar={<UserOutlined />}
                            title="用户管理"
                        />
                    </List.Item>
                )}
            </List>
        </div>
    );
}
