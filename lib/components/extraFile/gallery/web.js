"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
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
    var _a = this.props, mediaType = _a.mediaType, _b = _a.maxNumber, maxNumber = _b === void 0 ? 100 : _b, _c = _a.multiple, multiple = _c === void 0 ? true : _c, _d = _a.useMockProgress, useMockProgress = _d === void 0 ? false : _d, _e = _a.draggable, draggable = _e === void 0 ? false : _e, _f = _a.showUploadProgress, showUploadProgress = _f === void 0 ? false : _f, _g = _a.theme, theme = _g === void 0 ? 'image' : _g, tips = _a.tips, placeholder = _a.placeholder, beforeUpload = _a.beforeUpload, disabled = _a.disabled, style = _a.style, className = _a.className, sizeLimit = _a.sizeLimit;
    var _h = this.state, files = _h.files, systemConfig = _h.systemConfig, newUploadFiles = _h.newUploadFiles;
    return ((0, jsx_runtime_1.jsxs)(tdesign_react_1.Space, tslib_1.__assign({ direction: "vertical" }, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Upload, tslib_1.__assign({ sizeLimit: sizeLimit, className: className, style: style, disabled: disabled, beforeUpload: beforeUpload, placeholder: placeholder, tips: tips, multiple: multiple, autoUpload: false, draggable: draggable, useMockProgress: useMockProgress, max: maxNumber, accept: mediaType, showUploadProgress: showUploadProgress, theme: theme, files: theme === 'custom' ? [] : (files || []).map(function (ele) {
                    return extraFileToUploadFile(ele, systemConfig);
                }), onChange: function (uploadFiles) {
                    var arr = (uploadFiles === null || uploadFiles === void 0 ? void 0 : uploadFiles.filter(function (ele) { return !ele.id; })) || [];
                    _this.setState({
                        newUploadFiles: arr,
                    });
                    if (theme !== 'custom') {
                        _this.onWebPick(arr);
                    }
                }, onRemove: function (_a) {
                    var file = _a.file, index = _a.index, e = _a.e;
                    _this.onWebDelete(file, index);
                }, onPreview: function (_a) {
                    var file = _a.file, e = _a.e;
                } }, { children: theme === 'custom' && ((0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ variant: "outline", theme: "default" }, { children: "\u9009\u62E9\u6587\u4EF6" }))) })), theme === 'custom' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Table, { data: newUploadFiles || [], rowKey: "id", columns: [
                            {
                                align: 'center',
                                colKey: 'tableIndex',
                                title: '序号',
                                cell: function (_a) {
                                    var row = _a.row, rowIndex = _a.rowIndex;
                                    return rowIndex + 1;
                                },
                                width: 100,
                            },
                            {
                                colKey: 'name',
                                title: '文件名',
                            },
                            {
                                colKey: 'size',
                                title: '文件大小',
                                cell: function (_a) {
                                    var row = _a.row;
                                    var b = (row === null || row === void 0 ? void 0 : row.size) / 1024;
                                    return (0, extraFile_1.bytesToSize)(b);
                                },
                                width: 120,
                            },
                            {
                                colKey: 'status',
                                title: '状态',
                                width: 100,
                            },
                            {
                                colKey: 'op',
                                width: 300,
                                title: '操作',
                                align: 'center',
                                cell: function (_a) {
                                    var row = _a.row, rowIndex = _a.rowIndex;
                                    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: !row.id && ((0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", variant: "text", onClick: function () {
                                                _this.customDelete(rowIndex);
                                            } }, { children: "\u5220\u9664" }))) }));
                                },
                                fixed: 'right',
                            },
                        ] }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { display: 'flex', justifyContent: 'flex-end' } }, { children: (0, jsx_runtime_1.jsxs)(tdesign_react_1.Space, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "default", onClick: function () {
                                        _this.setState({
                                            newUploadFiles: [],
                                        });
                                    } }, { children: "\u5168\u90E8\u6E05\u7A7A" })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ onClick: function () {
                                        _this.onWebPick(newUploadFiles, function (file) {
                                            _this.setNewUploadFiles(file);
                                        });
                                    } }, { children: "\u4E0A\u4F20" }))] }) }))] }))] })));
}
exports.default = render;
