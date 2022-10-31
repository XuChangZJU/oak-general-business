"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var extraFile_1 = require("../../../utils/extraFile");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function extraFileToUploadFile(extraFile, systemConfig) {
    return Object.assign({}, extraFile, {
        url: (0, extraFile_1.composeFileUrl)(extraFile, systemConfig),
        name: extraFile.filename,
    });
}
function render() {
    var _this = this;
    var _a = this.props, _b = _a.accept, accept = _b === void 0 ? 'image/*' : _b, _c = _a.maxNumber, maxNumber = _c === void 0 ? 20 : _c, _d = _a.multiple, multiple = _d === void 0 ? true : _d, _e = _a.draggable, draggable = _e === void 0 ? false : _e, _f = _a.theme, theme = _f === void 0 ? 'picture-card' : _f, tips = _a.tips, beforeUpload = _a.beforeUpload, disabled = _a.disabled, style = _a.style, className = _a.className, _g = _a.directory, directory = _g === void 0 ? false : _g, onPreview = _a.onPreview, onDownload = _a.onDownload, children = _a.children;
    var _h = this.state, files = _h.files, systemConfig = _h.systemConfig, newUploadFiles = _h.newUploadFiles, disableInsert = _h.disableInsert;
    var getUploadButton = function () {
        if (children) {
            return children;
        }
        if (theme === 'custom') {
            return (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "default" }, { children: "\u9009\u62E9\u6587\u4EF6" }));
        }
        if (theme === 'picture-card') {
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { marginTop: 8 } }, { children: "\u8BF7\u9009\u62E9\u56FE\u7247" }))] }));
        }
        return (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "default" }, { children: "\u9009\u62E9\u6587\u4EF6" }));
    };
    return ((0, jsx_runtime_1.jsxs)(antd_1.Space, tslib_1.__assign({ direction: "vertical" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Upload, tslib_1.__assign({ className: className, style: style, disabled: disabled, directory: directory, beforeUpload: function (file, fileList) {
                    return false;
                }, multiple: multiple, maxCount: maxNumber, accept: accept, listType: theme, fileList: theme === 'custom'
                    ? []
                    : (files || []).map(function (ele) {
                        return extraFileToUploadFile(ele, systemConfig);
                    }), onChange: function (_a) {
                    var file = _a.file, fileList = _a.fileList, event = _a.event;
                    var arr = (fileList === null || fileList === void 0 ? void 0 : fileList.filter(function (ele) { return !ele.id; })) || [];
                    _this.setState({
                        newUploadFiles: arr,
                    });
                    if (theme !== 'custom') {
                        _this.onPickByWeb(arr);
                    }
                }, onRemove: function (file) {
                    _this.onDeleteByWeb(file);
                }, onPreview: onPreview, onDownload: onDownload }, { children: disableInsert ? null : getUploadButton() })), tips && ((0, jsx_runtime_1.jsx)("small", tslib_1.__assign({ className: web_module_less_1.default['oak-upload__tips'] }, { children: tips }))), theme === 'custom' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Table, { dataSource: newUploadFiles || [], rowKey: "id", columns: [
                            {
                                align: 'center',
                                dataIndex: 'tableIndex',
                                title: '序号',
                                render: function (value, record, index) { return index + 1; },
                                width: 100,
                            },
                            {
                                dataIndex: 'name',
                                title: '文件名',
                            },
                            {
                                dataIndex: 'size',
                                title: '文件大小',
                                render: function (value, record, index) {
                                    var b = value / 1024;
                                    return (0, extraFile_1.bytesToSize)(b);
                                },
                            },
                            {
                                dataIndex: 'status',
                                title: '状态',
                                render: function (value, record, index) {
                                    var cpn;
                                    switch (value) {
                                        case 'success':
                                            cpn = ((0, jsx_runtime_1.jsx)(antd_1.Tag, tslib_1.__assign({ color: "success" }, { children: "success" })));
                                            break;
                                        case 'uploading':
                                            cpn = ((0, jsx_runtime_1.jsx)(antd_1.Tag, tslib_1.__assign({ color: "processing" }, { children: "uploading" })));
                                            break;
                                        default:
                                            cpn = ((0, jsx_runtime_1.jsx)(antd_1.Tag, tslib_1.__assign({ color: "warning" }, { children: "waiting" })));
                                            break;
                                    }
                                    return cpn;
                                },
                            },
                            {
                                dataIndex: 'op',
                                width: 300,
                                title: '操作',
                                align: 'center',
                                render: function (value, record, index) {
                                    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: !record.id && ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                                _this.customDelete(index);
                                            } }, { children: "\u5220\u9664" }))) }));
                                },
                                fixed: 'right',
                            },
                        ] }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { display: 'flex', justifyContent: 'flex-end' } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ danger: true, type: "default", onClick: function () {
                                        _this.setState({
                                            newUploadFiles: [],
                                        });
                                    } }, { children: "\u6E05\u7A7A" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                                        _this.onWebPick(newUploadFiles, function (file, status) {
                                            _this.setNewUploadFiles(file, status);
                                        });
                                    } }, { children: "\u4E0A\u4F20" }))] }) }))] }))] })));
}
exports.default = render;
