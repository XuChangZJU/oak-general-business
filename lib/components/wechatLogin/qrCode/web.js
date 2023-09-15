"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const qrCode_1 = tslib_1.__importDefault(require("../../../components/common/qrCode"));
function Render(props) {
    const { oakFullpath, qrCodeUrl, loading, successed, type } = props.data;
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(qrCode_1.default, { loading: loading, url: qrCodeUrl, disableDownload: true, tips: (0, jsx_runtime_1.jsx)("div", { children: "\u5FAE\u4FE1\u626B\u4E00\u626B" }), successed: successed, type: type }) }));
}
exports.default = Render;
