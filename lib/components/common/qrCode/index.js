"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const qrcode_react_1 = require("qrcode.react");
require("./index.less");
const useFeatures_1 = tslib_1.__importDefault(require("../../../hooks/useFeatures"));
function isBase64(url) {
    return /data:image\/[\w|\W]+(;base64,)[\w|\W]*/.test(url);
}
function QrCode(props) {
    const { filename = 'qrCode.png', expiresAt, tips, onDownload, onRefresh, size = 280, url, loading = false, disableDownload = false, successed, type, } = props;
    const prefixCls = 'oak';
    const features = (0, useFeatures_1.default)();
    let V;
    if (expiresAt) {
        const diff = (0, dayjs_1.default)(expiresAt).diff((0, dayjs_1.default)(), 'days');
        if (diff > 0) {
            const expiresAtStr = (0, dayjs_1.default)(expiresAt).format('YYYY年MM月DD日 HH:mm');
            V = ((0, jsx_runtime_1.jsxs)("span", { className: `${prefixCls}-qrCodeBox-caption`, children: ["\u8BE5\u4E8C\u7EF4\u7801", (0, jsx_runtime_1.jsx)("span", { children: diff }), "\u5929\u5185(", (0, jsx_runtime_1.jsx)("span", { children: expiresAtStr }), "\u524D)\u6709\u6548\uFF0C\u5931\u6548\u8BF7\u91CD\u65B0\u751F\u6210"] }));
        }
        else {
            const diff2 = (0, dayjs_1.default)(expiresAt).diff((0, dayjs_1.default)(), 'minutes');
            const expiresAtStr = (0, dayjs_1.default)(expiresAt).format('HH:mm');
            if (diff2 > 0) {
                V = ((0, jsx_runtime_1.jsxs)("span", { className: `${prefixCls}-qrCodeBox_caption`, children: ["\u8BE5\u4E8C\u7EF4\u78011\u5929\u5185(", (0, jsx_runtime_1.jsx)("span", { children: expiresAtStr }), "\u524D)\u6709\u6548\uFF0C\u5931\u6548\u8BF7\u91CD\u65B0\u751F\u6210"] }));
            }
            else {
                V = ((0, jsx_runtime_1.jsx)("span", { className: `${prefixCls}-qrCodeBox_caption`, children: "\u8BE5\u4E8C\u7EF4\u7801\u5DF2\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u751F\u6210" }));
            }
        }
    }
    if (successed) {
        return ((0, jsx_runtime_1.jsx)("div", { className: `${prefixCls}-qrCodeBox`, children: (0, jsx_runtime_1.jsx)(antd_1.Result, { status: "success", title: type === 'bind' ? features.locales.t('weChat-account-successfully-bound') : features.locales.t('weChat-authorization-login-successful') }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { id: "oakQrCode", className: `${prefixCls}-qrCodeBox`, children: [(0, jsx_runtime_1.jsx)("div", { className: `${prefixCls}-qrCodeBox_imgBox`, style: {
                    width: size,
                    height: size,
                    marginBottom: 16,
                    marginTop: 16,
                }, children: (0, jsx_runtime_1.jsx)(antd_1.Spin, { spinning: loading, children: isBase64(url) ? ((0, jsx_runtime_1.jsx)("img", { src: url, alt: "qrCode", width: size, height: size })) : url ? ((0, jsx_runtime_1.jsx)(qrcode_react_1.QRCodeCanvas, { value: url, size: size })) : null }) }), V, tips, (0, jsx_runtime_1.jsxs)(antd_1.Space, { className: `${prefixCls}-qrCodeBox_actions`, children: [!!url && !disableDownload && ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", onClick: () => {
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
                        }, children: (0, jsx_runtime_1.jsx)(icons_1.DownloadOutlined, { className: `${prefixCls}-qrCodeBox_actions_downloadIcon` }) })), onRefresh && ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", onClick: () => {
                            onRefresh();
                        }, children: (0, jsx_runtime_1.jsx)(icons_1.ReloadOutlined, { className: `${prefixCls}-qrCodeBox_actions_refreshIcon` }) }))] })] }));
}
exports.default = QrCode;
