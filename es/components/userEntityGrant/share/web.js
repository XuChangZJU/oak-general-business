import { jsx as _jsx } from "react/jsx-runtime";
import QrCode from '../../common/qrCode';
import { DotLoading } from 'antd-mobile';
export default function Render(props) {
    const { url, expiresAt, oakLoading } = props.data;
    if (oakLoading) {
        return _jsx(DotLoading, { color: "primary" });
    }
    if (url) {
        return _jsx(QrCode, { url: url, expiresAt: expiresAt });
    }
    return null;
}
