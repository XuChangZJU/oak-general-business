import React, { Component } from 'react';
import Style from './web.module.less';
import PageHeader from '../../../components/common/pageHeader';
import QrCode from '../../../components/common/qrCode';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import { Spin, Button } from 'antd';
import {
    CopyOutlined,
} from '@ant-design/icons';
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
        {
            copy: (text: string) => void;
        }
    >
) {
    const {
        url,
        expiresAt,
        oakLoading,
    } = props.data;
    const {
        copy,
    } = props.methods;
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
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '48px',
            }}>
            <QrCode url={url} expiresAt={expiresAt} />
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {url}
                <Button type="text" icon={<CopyOutlined />} onClick={() => copy(url)}>
                    复制链接
                </Button>
            </div>
        </div>

    );
}
