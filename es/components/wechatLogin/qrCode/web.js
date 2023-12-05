import React from 'react';
import QrCode from '../../../components/common/qrCode';
export default function Render(props) {
    const { oakFullpath, qrCodeUrl, loading, successed, type } = props.data;
    return (<div>
            <QrCode loading={loading} url={qrCodeUrl} disableDownload={true} tips={<div>微信扫一扫</div>} successed={successed} type={type}/>
        </div>);
}
