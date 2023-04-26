"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var qrCode_1 = tslib_1.__importDefault(require("../../../components/common/qrCode"));
function Render(props) {
    var _a = props.data, oakFullpath = _a.oakFullpath, wechatLoginId = _a.wechatLoginId, qrCodeUrl = _a.qrCodeUrl;
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(qrCode_1.default, { url: qrCodeUrl }) }));
}
exports.default = Render;
