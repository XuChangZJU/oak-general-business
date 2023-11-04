"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const qrCode_1 = tslib_1.__importDefault(require("../../common/qrCode"));
function Render(props) {
    const { url, expiresAt, oakLoading, } = props.data;
    if (url) {
        return ((0, jsx_runtime_1.jsx)(qrCode_1.default, { url: url, expiresAt: expiresAt }));
    }
    return null;
}
exports.default = Render;
