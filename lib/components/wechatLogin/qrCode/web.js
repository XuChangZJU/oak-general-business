"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var qrCode_1 = tslib_1.__importDefault(require("../../../components/common/qrCode"));
function Render(props) {
    var _a = props.data, oakFullpath = _a.oakFullpath, qrCodeUrl = _a.qrCodeUrl, loading = _a.loading;
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(qrCode_1.default, { loading: loading, url: qrCodeUrl, disableDownload: true, tips: (0, jsx_runtime_1.jsx)("div", { children: "\u5FAE\u4FE1\u626B\u4E00\u626B" }) }) }));
}
exports.default = Render;
