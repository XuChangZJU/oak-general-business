"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var qrCode_1 = tslib_1.__importDefault(require("../../../components/common/qrCode"));
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
function Render(props) {
    var _a = props.data, url = _a.url, expiresAt = _a.expiresAt, oakLoading = _a.oakLoading;
    var copy = props.methods.copy;
    return oakLoading ? ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: {
            display: 'flex',
            justifyContent: 'center',
            padding: '48px',
        } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Spin, { size: "large" }) }))) : ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '48px',
        } }, { children: [(0, jsx_runtime_1.jsx)(qrCode_1.default, { url: url, expiresAt: expiresAt }), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ style: {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                } }, { children: [url, (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.CopyOutlined, {}), onClick: function () { return copy(url); } }, { children: "\u590D\u5236\u94FE\u63A5" }))] }))] })));
}
exports.default = Render;
