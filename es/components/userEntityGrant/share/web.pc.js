import { jsx as _jsx } from "react/jsx-runtime";
import QrCode from '../../common/qrCode';
import { Spin } from 'antd';
export default function Render(props) {
    const { url, expiresAt, oakLoading } = props.data;
    if (oakLoading) {
        return _jsx(Spin, {});
    }
    if (url) {
        return _jsx(QrCode, { url: url, expiresAt: expiresAt });
    }
    return null;
}
