"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var qrcode_react_1 = require("qrcode.react");
require("./index.less");
function isBase64(url) {
    return /data:image\/[\w|\W]+(;base64,)$/.test(url);
}
function QrCode(props) {
    var _a = props.filename, filename = _a === void 0 ? 'qrCode.png' : _a, expiresAt = props.expiresAt, tips = props.tips, onDownload = props.onDownload, onRefresh = props.onRefresh, _b = props.size, size = _b === void 0 ? 280 : _b, url = props.url;
    var prefixCls = 'oak';
    var V;
    if (expiresAt) {
        var diff = (0, dayjs_1.default)(expiresAt).diff((0, dayjs_1.default)(), 'days');
        if (diff > 0) {
            var expiresAtStr = (0, dayjs_1.default)(expiresAt).format('YYYY年MM月DD日');
            V = ((0, jsx_runtime_1.jsxs)("span", tslib_1.__assign({ className: "".concat(prefixCls, "-qrCodeBox-caption") }, { children: ["\u8BE5\u4E8C\u7EF4\u7801", (0, jsx_runtime_1.jsx)("span", { children: diff }), "\u5929\u5185(", (0, jsx_runtime_1.jsx)("span", { children: expiresAtStr }), "\u524D)\u6709\u6548\uFF0C\u5931\u6548\u8BF7\u91CD\u65B0\u66F4\u65B0"] })));
        }
        else {
            var diff2 = (0, dayjs_1.default)(expiresAt).diff((0, dayjs_1.default)(), 'minutes');
            var expiresAtStr = (0, dayjs_1.default)(expiresAt).format('HH:mm');
            if (diff2 > 0) {
                V = ((0, jsx_runtime_1.jsxs)("span", tslib_1.__assign({ className: "".concat(prefixCls, "-qrCodeBox_caption") }, { children: ["\u8BE5\u4E8C\u7EF4\u78011\u5929\u5185(", (0, jsx_runtime_1.jsx)("span", { children: expiresAtStr }), "\u524D)\u6709\u6548\uFF0C\u5931\u6548\u8BF7\u91CD\u65B0\u66F4\u65B0"] })));
            }
            else {
                V = ((0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: "".concat(prefixCls, "-qrCodeBox_caption") }, { children: "\u8BE5\u4E8C\u7EF4\u7801\u5DF2\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u66F4\u65B0" })));
            }
        }
    }
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ id: "oakQrCode", className: "".concat(prefixCls, "-qrCodeBox") }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "".concat(prefixCls, "-qrCodeBox_imgBox"), style: {
                    width: size,
                    height: size,
                    marginBottom: 10
                } }, { children: isBase64(url) ? ((0, jsx_runtime_1.jsx)("img", { src: url, alt: "qrCode", width: size, height: size })) : url ? ((0, jsx_runtime_1.jsx)(qrcode_react_1.QRCodeCanvas, { value: url, size: size })) : null })), V, tips, (0, jsx_runtime_1.jsxs)(antd_1.Space, tslib_1.__assign({ className: "".concat(prefixCls, "-qrCodeBox_actions") }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "text", onClick: function () {
                            var _a;
                            if (typeof onDownload === 'function') {
                                onDownload(url, filename);
                                return;
                            }
                            var canvas = (_a = document
                                .getElementById('oakQrCode')) === null || _a === void 0 ? void 0 : _a.querySelector('canvas');
                            if (canvas) {
                                var url_1 = canvas.toDataURL();
                                var a = document.createElement('a');
                                a.download = filename;
                                a.href = url_1;
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                            }
                        } }, { children: (0, jsx_runtime_1.jsx)(icons_1.DownloadOutlined, { className: "".concat(prefixCls, "-qrCodeBox_actions_downloadIcon") }) })), onRefresh && ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "text", onClick: function () {
                            onRefresh();
                        } }, { children: (0, jsx_runtime_1.jsx)(icons_1.ReloadOutlined, { className: "".concat(prefixCls, "-qrCodeBox_actions_refreshIcon") }) })))] }))] })));
}
exports.default = QrCode;
