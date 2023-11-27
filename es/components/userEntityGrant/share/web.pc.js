import React from 'react';
import QrCode from '../../common/qrCode';
import { Spin } from 'antd';
export default function Render(props) {
    const { url, expiresAt, oakLoading } = props.data;
    if (oakLoading) {
        return <Spin />;
    }
    if (url) {
        return <QrCode url={url} expiresAt={expiresAt}/>;
    }
    return null;
}
