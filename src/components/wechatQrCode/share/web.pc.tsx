import React from 'react';
import QrCode from '../../common/qrCode';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import { Spin } from 'antd';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'wechatQrCode',
        false,
        {
            url: string;
            expiresAt: number;
        },
        {}
    >
) {
    const { url, expiresAt, oakLoading } = props.data;
    if (oakLoading) {
        return <Spin />;
    }
    if (url) {
        return <QrCode url={url} expiresAt={expiresAt} />;
    }
    return null;
}