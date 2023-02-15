import React from 'react';
import './index.less';
declare type IQrCodeProps = {
    filename?: string;
    expiresAt?: number;
    tips?: React.ReactNode;
    onDownload?: (qrCodeImage: string, filename?: string) => void;
    onRefresh?: () => void;
    size?: number;
    url: string;
};
declare function QrCode(props: IQrCodeProps): JSX.Element;
export default QrCode;
