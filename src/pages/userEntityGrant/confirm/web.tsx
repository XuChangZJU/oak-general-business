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
        'userEntityGrant',
        true,
        {
            type: 'grant';
            expired: boolean;
            relation: boolean;
            expiresAt: boolean;
            granter?: {
                name: string;
                nickname: string;
            };
            entity: string;
            hasConfirmed: boolean; //当前用户关系是否存在
            granteeId: string;
            number: number;
            confirmed: number;
            userId: string;
            redirectTo: EntityDict['userEntityGrant']['Schema']['redirectTo'];
            redirectCounter: number;
        },
        {
            handleConfirm: () => void;
            redirectPage: () => void;
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
        hasConfirmed, //当前用户关系是否存在
        granteeId,
        number,
        confirmed,
        userId,
        redirectTo,
        redirectCounter,
    } = props.data;
    const { t, handleConfirm, redirectPage } = props.methods;
    const isOwner = !!(granteeId && userId === granteeId);

    const getRelationTip = () => {
        let str = `${granter?.name || granter?.nickname}`;
        const relationStr = relation ? t(`${entity}:r.${relation}`) : '';
        if (type === 'grant') {
            str = str.concat('授予您【').concat(relationStr).concat('】');
            return str;
        }
        str = str.concat('转让您【').concat(relationStr).concat('】');
        return str;
    };

    const getDescTip = () => {
        if (hasConfirmed || isOwner) {
            return '您已领取';
        }
        if (expired) {
            return '已过期，请联系相关人员重新分享';
        }

        // number设置1个的时候
        if (number === 1 && confirmed > 0 && (!isOwner || !hasConfirmed)) {
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
                {!oakLoading &&
                    !expired &&
                    !hasConfirmed &&
                    !isOwner &&
                    number > confirmed && (
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
                {/* {!oakLoading && !expired && (isOwner || hasConfirmed) && (
                    <Button
                        size="large"
                        block
                        type="primary"
                        onClick={() => {
                            redirectPage();
                        }}
                        disabled={oakExecuting}
                    >
                        领取成功{redirectTo ? '(' + redirectCounter + 's)' : ''}
                    </Button>
                )} */}

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
