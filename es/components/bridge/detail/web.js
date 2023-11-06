import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import QrCode from '../../../components/common/qrCode';
import { Spin, Button, Space, Input, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
export default function Render(props) {
    const { url, expiresAt, oakLoading, qrCodeType } = props.data;
    const { setMessage } = props.methods;
    return oakLoading ? (_jsx("div", { style: {
            display: 'flex',
            justifyContent: 'center',
            padding: '48px',
        }, children: _jsx(Spin, { size: "large" }) })) : (_jsx("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '48px',
        }, children: _jsxs("div", { style: {
                maxWidth: 800
            }, children: [_jsx(QrCode, { url: url, expiresAt: expiresAt }), qrCodeType && (qrCodeType !== 'wechatMpDomainUrl' && qrCodeType !== 'wechatMpWxaCode') && (_jsxs(Space.Compact, { block: true, style: { marginTop: 16 }, children: [_jsx(Input, { value: url, readOnly: true }), _jsx(Tooltip, { title: "\u590D\u5236\u94FE\u63A5", children: _jsx(Button, { icon: _jsx(CopyOutlined, {}), onClick: () => {
                                    copy(url);
                                    setMessage({
                                        content: '复制链接成功',
                                        type: 'success',
                                    });
                                }, children: "\u590D\u5236\u94FE\u63A5" }) })] }))] }) }));
}
