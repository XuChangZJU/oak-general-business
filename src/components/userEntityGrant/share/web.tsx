import React from 'react';
import QrCode from '../../common/qrCode';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import { DotLoading } from 'antd-mobile';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'userEntityGrant',
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
        return <DotLoading color="primary" />;
    }
    if (url) {
        return <QrCode url={url} expiresAt={expiresAt} />;
    }
    return null;
}
