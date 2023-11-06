import { jsx as _jsx } from "react/jsx-runtime";
import QrCode from '../../common/qrCode';
export default function Render(props) {
    const { url, expiresAt, oakLoading, } = props.data;
    if (url) {
        return (_jsx(QrCode, { url: url, expiresAt: expiresAt }));
    }
    return null;
}
