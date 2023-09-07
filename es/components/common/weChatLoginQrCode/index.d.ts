import React from 'react';
import './index.less';
interface QrCodeProps {
    id?: string;
    appId: string;
    scope: 'snsapi_userinfo' | 'snsapi_login';
    redirectUri: string;
    state?: string;
    style?: string;
    href?: string;
    dev?: boolean;
    disabled?: boolean;
    disableText?: React.ReactNode;
    rootStyle?: React.CSSProperties;
    rootClassName?: string;
}
declare function QrCode(props: QrCodeProps): import("react/jsx-runtime").JSX.Element;
export default QrCode;
