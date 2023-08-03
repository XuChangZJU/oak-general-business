import React, { Component } from 'react';
import Style from './web.module.less';
import QrCode from '../../../components/common/qrCode';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import { Spin, Button, Space, Input, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';

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
            title?: string;
        },
        {}
    >
) {
    const { url, expiresAt, oakLoading } = props.data;
    const { setMessage } = props.methods;
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
            }}
        >
            <div style={{
                maxWidth: 800
            }}
            >
                <QrCode url={url} expiresAt={expiresAt} />

                <Space.Compact block style={{ marginTop: 16 }}>
                    <Input
                        value={url}
                        readOnly
                    />
                    <Tooltip title="复制链接">
                        <Button icon={<CopyOutlined />} onClick={() => {
                            copy(url);
                            setMessage({
                                content: '复制链接成功',
                                type: 'success',
                            });
                        }}>
                            复制链接
                        </Button>
                    </Tooltip>
                </Space.Compact>
            </div>
        </div>

    );
}
