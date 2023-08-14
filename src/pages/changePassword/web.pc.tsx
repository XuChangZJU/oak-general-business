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
        },
        {
        }
    >
) {
    const { showBack, userId } = props.data;

    return (
        <PageHeader showBack={showBack} title="密码设置">
            <ChangePassword
                oakId={userId}
                oakPath="$changePassword-component"
                oakAutoUnmount={true}
            />
        </PageHeader>
    );
}
