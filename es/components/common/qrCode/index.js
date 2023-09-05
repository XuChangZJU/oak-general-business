import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Space, Spin, Result } from 'antd';
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { QRCodeCanvas } from 'qrcode.react';
import './index.less';
import useFeatures from '../../../hooks/useFeatures';
function isBase64(url) {
    return /data:image\/[\w|\W]+(;base64,)[\w|\W]*/.test(url);
}
function QrCode(props) {
    const { filename = 'qrCode.png', expiresAt, tips, onDownload, onRefresh, size = 280, url, loading = false, disableDownload = false, successed, type, } = props;
    const prefixCls = 'oak';
    const features = useFeatures();
    let V;
    if (expiresAt) {
        const diff = dayjs(expiresAt).diff(dayjs(), 'days');
        if (diff > 0) {
            const expiresAtStr = dayjs(expiresAt).format('YYYY年MM月DD日 HH:mm');
            V = (_jsxs("span", { className: `${prefixCls}-qrCodeBox-caption`, children: ["\u8BE5\u4E8C\u7EF4\u7801", _jsx("span", { children: diff }), "\u5929\u5185(", _jsx("span", { children: expiresAtStr }), "\u524D)\u6709\u6548\uFF0C\u5931\u6548\u8BF7\u91CD\u65B0\u751F\u6210"] }));
        }
        else {
            const diff2 = dayjs(expiresAt).diff(dayjs(), 'minutes');
            const expiresAtStr = dayjs(expiresAt).format('HH:mm');
            if (diff2 > 0) {
                V = (_jsxs("span", { className: `${prefixCls}-qrCodeBox_caption`, children: ["\u8BE5\u4E8C\u7EF4\u78011\u5929\u5185(", _jsx("span", { children: expiresAtStr }), "\u524D)\u6709\u6548\uFF0C\u5931\u6548\u8BF7\u91CD\u65B0\u751F\u6210"] }));
            }
            else {
                V = (_jsx("span", { className: `${prefixCls}-qrCodeBox_caption`, children: "\u8BE5\u4E8C\u7EF4\u7801\u5DF2\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u751F\u6210" }));
            }
        }
    }
    if (successed) {
        return (_jsx("div", { className: `${prefixCls}-qrCodeBox`, children: _jsx(Result, { status: "success", title: type === 'bind' ? features.locales.t('weChat-account-successfully-bound') : features.locales.t('weChat-authorization-login-successful') }) }));
    }
    return (_jsxs("div", { id: "oakQrCode", className: `${prefixCls}-qrCodeBox`, children: [_jsx("div", { className: `${prefixCls}-qrCodeBox_imgBox`, style: {
                    width: size,
                    height: size,
                    marginBottom: 16,
                    marginTop: 16,
                }, children: _jsx(Spin, { spinning: loading, children: isBase64(url) ? (_jsx("img", { src: url, alt: "qrCode", width: size, height: size })) : url ? (_jsx(QRCodeCanvas, { value: url, size: size })) : null }) }), V, tips, _jsxs(Space, { className: `${prefixCls}-qrCodeBox_actions`, children: [!!url && !disableDownload && (_jsx(Button, { type: "text", onClick: () => {
                            if (typeof onDownload === 'function') {
                                onDownload(url, filename);
                                return;
                            }
                            const canvas = document
                                .getElementById('oakQrCode')
                                ?.querySelector('canvas');
                            if (canvas) {
                                const url = canvas.toDataURL();
                                const a = document.createElement('a');
                                a.download = filename;
                                a.href = url;
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                            }
                        }, children: _jsx(DownloadOutlined, { className: `${prefixCls}-qrCodeBox_actions_downloadIcon` }) })), onRefresh && (_jsx(Button, { type: "text", onClick: () => {
                            onRefresh();
                        }, children: _jsx(ReloadOutlined, { className: `${prefixCls}-qrCodeBox_actions_refreshIcon` }) }))] })] }));
}
export default QrCode;
