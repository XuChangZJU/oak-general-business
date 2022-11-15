"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var qr_image_1 = tslib_1.__importDefault(require("qr-image"));
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
require("./index.less");
function QrCode(props) {
    var filename = props.filename, expiresAt = props.expiresAt, tip = props.tip, onDownload = props.onDownload, onRefresh = props.onRefresh, _a = props.width, width = _a === void 0 ? 280 : _a, _b = props.height, height = _b === void 0 ? 280 : _b, url = props.url;
    var prefixCls = 'oak';
    var _c = tslib_1.__read((0, react_1.useState)(''), 2), qrCodeImage = _c[0], setQrCodeImage = _c[1];
    var qrImage = function (url) {
        var image = qr_image_1.default.imageSync(url, { type: 'png' });
        var imageToBase64 = Buffer.from(image).toString('base64');
        setQrCodeImage("data:image/png;base64,".concat(imageToBase64));
    };
    (0, react_1.useEffect)(function () {
        if (url) {
            if (/data:image\/[\w|\W]+(;base64,)$/.test(url)) {
                setQrCodeImage(url);
            }
            else {
                qrImage(url);
            }
        }
    }, [url]);
    var V;
    if (expiresAt) {
        var diff = (0, dayjs_1.default)(expiresAt).diff((0, dayjs_1.default)(), 'days');
        if (diff > 0) {
            var expiresAtStr = (0, dayjs_1.default)(expiresAt).format('YYYY年MM月DD日');
            V = ((0, jsx_runtime_1.jsxs)("span", tslib_1.__assign({ className: "".concat(prefixCls, "-qrCodeBox-caption") }, { children: ["\u8BE5\u4E8C\u7EF4\u7801", (0, jsx_runtime_1.jsx)("span", { children: diff }), "\u5929\u5185(", (0, jsx_runtime_1.jsx)("span", { children: expiresAtStr }), "\u524D)\u6709\u6548\uFF0C\u5931\u6548\u8BF7\u5237\u65B0"] })));
        }
        else {
            var diff2 = (0, dayjs_1.default)(expiresAt).diff((0, dayjs_1.default)(), 'minutes');
            var expiresAtStr = (0, dayjs_1.default)(expiresAt).format('HH:mm');
            if (diff2 > 0) {
                V = ((0, jsx_runtime_1.jsxs)("span", tslib_1.__assign({ className: "".concat(prefixCls, "-qrCodeBox-caption") }, { children: ["\u8BE5\u4E8C\u7EF4\u78011\u5929\u5185(", (0, jsx_runtime_1.jsx)("span", { children: expiresAtStr }), "\u524D)\u6709\u6548\uFF0C\u5931\u6548\u8BF7\u5237\u65B0"] })));
            }
            else {
                V = ((0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: "".concat(prefixCls, "-qrCodeBox-caption") }, { children: "\u8BE5\u4E8C\u7EF4\u7801\u5DF2\u5931\u6548\uFF0C\u8BF7\u5237\u65B0" })));
            }
        }
    }
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "".concat(prefixCls, "-qrCodeBox") }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: {
                    width: width,
                    height: height,
                } }, { children: !!qrCodeImage && ((0, jsx_runtime_1.jsx)("img", { src: qrCodeImage, alt: "qrCode", width: width, height: height })) })), V, tip, (0, jsx_runtime_1.jsxs)(antd_1.Space, tslib_1.__assign({ className: "".concat(prefixCls, "-qrCodeBox-actions") }, { children: [onDownload && ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "text", onClick: function () {
                            onDownload(qrCodeImage, filename);
                        } }, { children: (0, jsx_runtime_1.jsx)(icons_1.DownloadOutlined, {}) }))), onRefresh && ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "text", onClick: function () {
                            onRefresh();
                        } }, { children: (0, jsx_runtime_1.jsx)(icons_1.ReloadOutlined, {}) })))] }))] })));
}
exports.default = QrCode;
