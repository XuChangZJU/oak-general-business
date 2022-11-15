"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var React = tslib_1.__importStar(require("react"));
var onDownload = function (arrayBuffer, filename) {
    var blob = new Blob(arrayBuffer ? [arrayBuffer] : []);
    var blobUrl = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(blobUrl);
};
var base64ToBlob = function (base64String) {
    var parts = base64String.split(';base64,');
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);
    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {
        type: contentType,
    });
};
var arrayBufferToBase64 = function (buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};
var base64ToArrayBuffer = function (base64String) {
    var parts = base64String.split(';base64,');
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var bytes = new Uint8Array(rawLength);
    for (var i = 0; i < rawLength; ++i) {
        bytes[i] = raw.charCodeAt(i);
    }
    return bytes.buffer;
};
function Download(props) {
    var _this = this;
    var children = props.children, beforeDownload = props.beforeDownload, _a = props.filename, filename = _a === void 0 ? 'download.xlsx' : _a, className = props.className, style = props.style;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: React.createElement('div', {
            onClick: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var arrayBuffer;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(typeof beforeDownload === 'function')) return [3 /*break*/, 2];
                            return [4 /*yield*/, beforeDownload()];
                        case 1:
                            arrayBuffer = _a.sent();
                            _a.label = 2;
                        case 2:
                            onDownload(arrayBuffer, filename);
                            return [2 /*return*/];
                    }
                });
            }); },
            className: className,
            style: style,
        }, children) }));
}
Download.onDownload = onDownload;
Download.base64ToBlob = base64ToBlob;
Download.arrayBufferToBase64 = arrayBufferToBase64;
Download.base64ToArrayBuffer = base64ToArrayBuffer;
exports.default = Download;
