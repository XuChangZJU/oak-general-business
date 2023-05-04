import React, { Component } from 'react';
import { Button, Space } from 'antd';
import Style from './web.module.less';
import { UserAddOutlined, UserSwitchOutlined } from '@ant-design/icons';
 
import { isWeiXin } from 'oak-frontend-base/lib/utils/utils';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'wechatLogin',
        true,
        {
            type: EntityDict['wechatLogin']['Schema']['type'];
            expired: boolean;
            expiresAt: boolean;
            user?: {
                name: string;
                nickname: string;
            };
            successed: number;
            userId: string;
            loginUserId: string;
        },
        {
            handleConfirm: () => void;
        }
    >
) {
    const {
        oakLoading,
        oakExecuting,
        type,
        expired,
        expiresAt,
        user,
        successed,
        userId,
        loginUserId,
    } = props.data;
    const { t, handleConfirm } = props.methods;

    let V;
    if (successed) {
        V = '成功的'
    }
    else if (expired) {
        V = '过期了'
    }

    return (
        <div className={Style.container}>
            <div className={Style.content}>{V}</div>
            <Space direction="vertical">
                {!oakLoading && !expired && !successed && (
                    <Button
                        size="large"
                        block
                        type="primary"
                        onClick={() => {
                            handleConfirm();
                        }}
                        disabled={oakExecuting}
                    >
                        领取
                    </Button>
                )}

                {isWeiXin && (
                    <Button
                        size="large"
                        block
                        onClick={() => {
                            WeixinJSBridge.call('closeWindow');
                        }}
                    >
                        关闭
                    </Button>
                )}
            </Space>
        </div>
    );
}
