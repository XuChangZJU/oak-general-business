import React, { useState } from 'react';
import { List, Button, Modal } from 'antd';
import { MobileOutlined, DeleteOutlined } from '@ant-design/icons';
import Style from './web.module.less';
import { WebComponentProps } from 'oak-frontend-base';
import PageHeader from '../../components/common/pageHeader';
import { EntityDict } from '../../oak-app-domain';
import ChangePassword from '../../components/changePassword';


export default function render(
    props: WebComponentProps<
        EntityDict,
        'mobile',
        true,
        {
            showBack: boolean;
            userId: string;
            currentUserId: string
        },
        {
        }
    >
) {
    const { showBack, userId, currentUserId } = props.data;

    return (
        (userId || currentUserId) ? <PageHeader showBack={showBack} title="密码设置">
            <div className={Style.container}>
                <ChangePassword
                    oakId={userId || currentUserId}
                    oakPath="$changePassword-component"
                    oakAutoUnmount={true}
                />

            </div>

        </PageHeader> : <></>
    );
}
