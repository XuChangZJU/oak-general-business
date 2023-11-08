import React, { Component } from 'react';
import QrCode from '../../../components/common/qrCode';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import { Spin } from 'antd';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'userEntityGrant',
        true,
        {
            url: string;
            expiresAt: number;
        },
        {}
    >
) {
    const {
        url,
        expiresAt,
        oakLoading,
    } = props.data;
    return (
        <>
            {
                oakLoading? (
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
                )
            }
        </>
    );
}