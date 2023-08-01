"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var qrCode_1 = tslib_1.__importDefault(require("../../../components/common/qrCode"));
var antd_1 = require("antd");
function Render(props) {
    var _a = props.data, url = _a.url, expiresAt = _a.expiresAt, oakLoading = _a.oakLoading;
    return oakLoading ? ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: {
            display: 'flex',
            justifyContent: 'center',
            padding: '48px',
        } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Spin, { size: "large" }) }))) : ((0, jsx_runtime_1.jsx)(qrCode_1.default, { url: url, expiresAt: expiresAt }));
}
exports.default = Render;
