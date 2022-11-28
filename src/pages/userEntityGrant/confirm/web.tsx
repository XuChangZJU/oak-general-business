import React, { Component } from 'react';
import { Button, Space } from 'antd';
import Style from './web.module.less';
import { UserAddOutlined, UserSwitchOutlined } from '@ant-design/icons';
 
import { isWeiXin } from 'oak-frontend-base/lib/utils/utils';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';

export default function render(
    props: WebComponentProps<
        EntityDict,
        'userEntityGrant',
        true,
        {
            oakLoading: boolean;
            oakExecuting: boolean;
            type: 'grant';
            expired: boolean;
            relation: boolean;
            expiresAt: boolean;
            granter?: {
                name: string;
                nickname: string;
            };
            entity: string;
            isExists: boolean; //当前用户关系是否存在
            granteeId: string;
            number: number;
            confirmed: number;
            userId: string;
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
        relation,
        expiresAt,
        granter,
        entity,
        isExists, //当前用户关系是否存在
        granteeId,
        number,
        confirmed,
        userId,
    } = props.data;
    const { t, handleConfirm } = props.methods;
    const isOwner = !!(granteeId && userId === granteeId);

    const getRelationTip = () => {
        let str = `${granter?.name || granter?.nickname}`;
        const relationStr = relation ? t(`${entity}:r.${relation}`) : '';
        if (type === 'grant') {
            str = str.concat('授予您【').concat(relationStr).concat('】权限');
            return str;
        }
        str = str.concat('转让您【').concat(relationStr).concat('】权限');
        return str;
    };

    const getDescTip = () => {
        if (isExists || isOwner) {
            return '您已领取';
        }
        if (expired) {
            return '已过期，请联系相关人员重新分享';
        }

        // number设置1个的时候
        if (number === 1 && confirmed > 0 && (!isOwner || !isExists)) {
            return '被他人已领取';
        }
        return '请您领取';
    };

    return (
        <div className={Style.container}>
            <div className={Style.content}>
                {type === 'grant' ? (
                    <UserAddOutlined className={Style.icon} />
                ) : (
                    <UserSwitchOutlined className={Style.icon} />
                )}
                <div className={Style.title}>{getRelationTip()}</div>

                <div className={Style.description}>{getDescTip()}</div>
            </div>
            <Space direction="vertical">
                {!oakLoading && !expired && !isExists && !isOwner && (
                    <Button
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
