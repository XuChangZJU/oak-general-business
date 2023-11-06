import React from 'react';
import QrCode from '../../common/qrCode';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';

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
    if (url) {
        return (
            <QrCode url={url} expiresAt={expiresAt} />
        );
    }
    return null;
}
