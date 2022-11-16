import React, { Component } from 'react';
import { Button, Space } from 'antd';
import Style from './web.module.less';
import { UserAddOutlined, UserSwitchOutlined } from '@ant-design/icons';
 
import { isWeiXin } from 'oak-frontend-base/lib/utils/utils';


export default function render(this: any) {
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
    } = this.state;
    const isOwner = !!(granteeId && userId === granteeId);

    const getRelationTip = () => {
        let str = `${granter?.name || granter?.nickname}`;
        const relationStr = relation ? this.t(`${entity}:r.${relation}`) : '';
        if (type === 'grant') {
            str = str.concat('授予您【').concat(relationStr).concat('】身份');
            return str;
        }
        str = str.concat('转让您【').concat(relationStr).concat('】身份');
        return str;
    };

    const getDescTip = () => {
        if (isExists || isOwner) {
            return '您已接受';
        }
        if (expired) {
            return '已过期，请联系相关人员重新分享';
        }
        
        // number设置1个的时候 
        if (number === 1 && confirmed > 0 && (!isOwner || !isExists)) {
            return '被其他人已接受';
        }
        return '请您接受';
    }


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
                {(!oakLoading && !expired && !isExists && !isOwner) && (
                    <Button
                        block
                        type="primary"
                        onClick={() => {
                            this.handleConfirm();
                        }}
                        disabled={oakExecuting}
                    >
                        接受
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
