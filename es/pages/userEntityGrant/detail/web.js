import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import QrCode from '../../../components/common/qrCode';
import { Spin } from 'antd';
export default function Render(props) {
    const { url, expiresAt, oakLoading, } = props.data;
    return (_jsx(_Fragment, { children: oakLoading ? (_jsx("div", { style: {
                display: 'flex',
                justifyContent: 'center',
                padding: '48px',
            }, children: _jsx(Spin, { size: "large" }) })) : (_jsx(QrCode, { url: url, expiresAt: expiresAt })) }));
}
