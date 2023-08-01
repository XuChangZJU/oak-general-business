import React, { Component } from 'react';
import Style from './web.module.less';
import PageHeader from '../../../components/common/pageHeader';
import QrCode from '../../../components/common/qrCode';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import { Spin } from 'antd';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'userEntityGrant',
        true,
        {
            showBack: boolean;
            variant: 'alone' | 'inline' | 'dialog';
            url: string;
            expiresAt: number;
            title?: string
        },
        {}
    >
) {
    const {
        url,
        expiresAt,
        oakLoading,
    } = props.data;
    return oakLoading ? (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '48px',
            }}
        >
            <Spin size="large" />
        </div>
    ) : (
        <QrCode url={url} expiresAt={expiresAt} />
    );
}
