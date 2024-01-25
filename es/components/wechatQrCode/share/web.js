import React from 'react';
import QrCode from '../../common/qrCode';
import { DotLoading } from 'antd-mobile';
export default function Render(props) {
    const { url, expiresAt, oakLoading } = props.data;
    if (oakLoading) {
        return <DotLoading color="primary"/>;
    }
    if (url) {
        return <QrCode url={url} expiresAt={expiresAt}/>;
    }
    return null;
}
