import React from 'react';
import { List, Button } from 'antd-mobile';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../oak-app-domain';

import Style from './mobile.module.less';

type btnProps = {
    id: number;
    label: string;
};

const LIST_BTN: btnProps[] = [
    {
        id: 1,
        label: '个人信息保护政策',
    },
    {
        id: 2,
        label: '隐私摘要政策',
    },
    {
        id: 3,
        label: '个人信息手机清单',
    },
    {
        id: 4,
        label: '应用权限说明',
    },
    {
        id: 5,
        label: '个人信息共享清单',
    },
    // {
    //     id: 6,
    //     label: '注销账号',
    // },
];

export default function render(
    props: WebComponentProps<
        EntityDict,
        'user',
        false,
        {
            name: string;
            mobile: string;
            nickname: string;
            avatarUrl: string;
            userId: string;
        },
        {
            logout: () => void;
            setVisible: () => void;
        }
    >
) {
    const { data, methods } = props;
    const { userId } = data;
    const { logout, setVisible } = methods;

    return (
        <div className={Style.container}>
            <List className={Style.list}>
                {LIST_BTN.map((ele) => {
                    return (
                        <List.Item
                            arrow
                            onClick={() => {
                                setVisible();
                            }}
                        >
                            {ele.label}
                        </List.Item>
                    );
                })}
            </List>
            <div style={{ flex: 1 }} />
            {userId && (
                <div className={Style.logoutBox}>
                    <Button
                        block
                        // color="danger"
                        style={{
                            '--background-color': 'var(--oak-color-primary)',
                            '--text-color': 'var(--oak-bg-color-container)',
                        }}
                        onClick={() => {
                            logout();
                        }}
                    >
                        退出登录
                    </Button>
                </div>
            )}
        </div>
    );
}
