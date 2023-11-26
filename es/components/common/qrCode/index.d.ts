import React from 'react';
import './index.less';
import { EntityDict } from '../../../oak-app-domain';
type IQrCodeProps = {
    filename?: string;
    expiresAt?: number;
    tips?: React.ReactNode;
    onDownload?: (qrCodeImage: string, filename?: string) => void;
    onRefresh?: () => void;
    size?: number;
    url: string;
    loading?: boolean;
    disableDownload?: boolean;
    successed?: boolean;
    type?: EntityDict['wechatLogin']['Schema']['type'];
};
declare function QrCode(props: IQrCodeProps): React.JSX.Element;
export default QrCode;
