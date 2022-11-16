/// <reference types="react" />
import './index.less';
interface QrCodeProps {
    id?: string;
    appId: string;
    scope: string;
    redirectUri: string;
    state: string;
    style?: string;
    href?: string;
    dev?: boolean;
}
declare function QrCode(props: QrCodeProps): JSX.Element;
export default QrCode;
