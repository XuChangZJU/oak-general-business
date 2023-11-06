"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const qrCode_1 = tslib_1.__importDefault(require("../../../components/common/qrCode"));
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const copy_to_clipboard_1 = tslib_1.__importDefault(require("copy-to-clipboard"));
function Render(props) {
    const { url, expiresAt, oakLoading, qrCodeType } = props.data;
    const { setMessage } = props.methods;
    return oakLoading ? ((0, jsx_runtime_1.jsx)("div", { style: {
            display: 'flex',
            justifyContent: 'center',
            padding: '48px',
        }, children: (0, jsx_runtime_1.jsx)(antd_1.Spin, { size: "large" }) })) : ((0, jsx_runtime_1.jsx)("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '48px',
        }, children: (0, jsx_runtime_1.jsxs)("div", { style: {
                maxWidth: 800
            }, children: [(0, jsx_runtime_1.jsx)(qrCode_1.default, { url: url, expiresAt: expiresAt }), qrCodeType && (qrCodeType !== 'wechatMpDomainUrl' && qrCodeType !== 'wechatMpWxaCode') && ((0, jsx_runtime_1.jsxs)(antd_1.Space.Compact, { block: true, style: { marginTop: 16 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Input, { value: url, readOnly: true }), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: "\u590D\u5236\u94FE\u63A5", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { icon: (0, jsx_runtime_1.jsx)(icons_1.CopyOutlined, {}), onClick: () => {
                                    (0, copy_to_clipboard_1.default)(url);
                                    setMessage({
                                        content: '复制链接成功',
                                        type: 'success',
                                    });
                                }, children: "\u590D\u5236\u94FE\u63A5" }) })] }))] }) }));
}
exports.default = Render;
