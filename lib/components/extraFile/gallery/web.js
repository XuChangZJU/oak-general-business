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
    var _a = this.props, mediaType = _a.mediaType, _b = _a.maxNumber, maxNumber = _b === void 0 ? 100 : _b, _c = _a.multiple, multiple = _c === void 0 ? true : _c, _d = _a.useMockProgress, useMockProgress = _d === void 0 ? false : _d, _e = _a.draggable, draggable = _e === void 0 ? false : _e, _f = _a.showUploadProgress, showUploadProgress = _f === void 0 ? false : _f, _g = _a.theme, theme = _g === void 0 ? 'image' : _g;
    var _h = this.state, files = _h.files, systemConfig = _h.systemConfig;
    return ((0, jsx_runtime_1.jsx)(tdesign_react_1.Upload, { multiple: multiple, autoUpload: false, draggable: draggable, useMockProgress: useMockProgress, max: maxNumber, accept: mediaType, showUploadProgress: showUploadProgress, theme: theme, files: (files || []).map(function (ele) {
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
