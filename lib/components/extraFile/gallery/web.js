"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_react_1 = require("tdesign-react");
var extraFile_1 = require("../../../utils/extraFile");
function extraFileToUploadFile(extraFile, systemConfig) {
    return Object.assign({}, extraFile, {
        url: (0, extraFile_1.composeFileUrl)(extraFile, systemConfig),
        name: extraFile.filename,
    });
}
function render() {
    var _this = this;
    var _a = this.props, mediaType = _a.mediaType, _b = _a.maxNumber, maxNumber = _b === void 0 ? 100 : _b, _c = _a.multiple, multiple = _c === void 0 ? true : _c;
    var _d = this.state, files = _d.files, systemConfig = _d.systemConfig;
    return ((0, jsx_runtime_1.jsx)(tdesign_react_1.Upload, { multiple: multiple, autoUpload: false, max: maxNumber, accept: mediaType, showUploadProgress: false, theme: "image", files: (files || []).map(function (ele) {
            return extraFileToUploadFile(ele, systemConfig);
        }), onChange: function (uploadFiles) {
            var newUploadFiles = (uploadFiles === null || uploadFiles === void 0 ? void 0 : uploadFiles.filter(function (ele) { return !ele.id; })) || [];
            _this.onWebPick(newUploadFiles);
        }, onRemove: function (_a) {
            var file = _a.file, index = _a.index, e = _a.e;
            _this.onWebDelete(file, index);
        }, onPreview: function (_a) {
            var file = _a.file, e = _a.e;
            // this.onWebDelete(file, e);
        } }));
}
exports.default = render;
