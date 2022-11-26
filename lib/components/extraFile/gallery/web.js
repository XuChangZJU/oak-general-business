"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var extraFile_1 = require("../../../utils/extraFile");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function extraFileToUploadFile(extraFile, systemConfig) {
    return {
        id: extraFile.id,
        url: (0, extraFile_1.composeFileUrl)(extraFile, systemConfig),
        thumbUrl: (0, extraFile_1.composeFileUrl)(extraFile, systemConfig),
        name: extraFile.filename,
        fileName: extraFile.filename,
        size: extraFile.size,
        type: extraFile.fileType,
        uid: extraFile.id, //upload 组件需要uid来维护fileList
    };
}
function getListType(theme) {
    var themeMap = {
        file: 'text',
        image: 'picture-card',
        'file-flow': 'text',
        'image-flow': 'picture',
        custom: 'text',
    };
    return themeMap[theme];
}
function render(props) {
    var _this = this;
    var _a = props.data, _b = _a.accept, accept = _b === void 0 ? 'image/*' : _b, _c = _a.maxNumber, maxNumber = _c === void 0 ? 20 : _c, _d = _a.multiple, multiple = _d === void 0 ? true : _d, _e = _a.draggable, draggable = _e === void 0 ? false : _e, _f = _a.theme, theme = _f === void 0 ? 'image' : _f, tips = _a.tips, beforeUpload = _a.beforeUpload, disabled = _a.disabled, style = _a.style, className = _a.className, _g = _a.directory, directory = _g === void 0 ? false : _g, onPreview = _a.onPreview, onDownload = _a.onDownload, children = _a.children, _h = _a.showUploadList, showUploadList = _h === void 0 ? true : _h, files = _a.files, systemConfig = _a.systemConfig, disableInsert = _a.disableInsert;
    var _j = props.methods, onPickByWeb = _j.onPickByWeb, onDeleteByWeb = _j.onDeleteByWeb;
    var _k = tslib_1.__read((0, react_1.useState)([]), 2), newUploadFiles = _k[0], setNewUploadFiles = _k[1];
    var listType = getListType(theme);
    var setNewUploadFilesByStatus = function (file, status) {
        var filename = file.filename, size = file.size, id = file.id;
        var file2 = newUploadFiles.find(function (ele) { return (ele.fileName === filename && ele.size === size); });
        if (file2) {
            Object.assign(file2, {
                status: status,
                id: id,
            });
        }
        setNewUploadFiles(newUploadFiles);
    };
    var customDelete = function (index) {
        var arr = tslib_1.__spreadArray([], tslib_1.__read(newUploadFiles), false);
        arr.splice(index, 1);
        setNewUploadFiles(arr);
    };
    var getUploadButton = function () {
        if (children) {
            return children;
        }
        if (listType === 'picture-card') {
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { marginTop: 8 } }, { children: "\u8BF7\u9009\u62E9\u56FE\u7247" }))] }));
        }
        return (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "default" }, { children: "\u9009\u62E9\u6587\u4EF6" }));
    };
    return ((0, jsx_runtime_1.jsxs)(antd_1.Space, tslib_1.__assign({ direction: "vertical", className: web_module_less_1.default['oak-upload'] }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Upload, tslib_1.__assign({ className: (0, classnames_1.default)(web_module_less_1.default['oak-upload__upload'], className), style: style, disabled: disabled, directory: directory, showUploadList: showUploadList, beforeUpload: function (file) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var result;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(typeof beforeUpload === 'function')) return [3 /*break*/, 2];
                                return [4 /*yield*/, beforeUpload(file)];
                            case 1:
                                result = _a.sent();
                                if (result) {
                                    return [2 /*return*/, false];
                                }
                                _a.label = 2;
                            case 2: return [2 /*return*/, false];
                        }
                    });
                }); }, multiple: multiple, maxCount: maxNumber, accept: accept, listType: listType, fileList: theme === 'custom'
                    ? []
                    : (files === null || files === void 0 ? void 0 : files.length)
                        ? files.map(function (ele) {
                            return extraFileToUploadFile(ele, systemConfig);
                        })
                        : undefined, onChange: function (_a) {
                    var file = _a.file, fileList = _a.fileList, event = _a.event;
                    var arr = (fileList === null || fileList === void 0 ? void 0 : fileList.filter(function (ele) { return !ele.id; })) || [];
                    if (theme !== 'custom') {
                        onPickByWeb(arr);
                    }
                    else {
                        setNewUploadFiles(arr);
                    }
                }, onRemove: function (file) {
                    onDeleteByWeb(file);
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
                                    // 只处理state的文件 这时候可以直接删除
                                    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: !record.id && ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                                customDelete(index);
                                            } }, { children: "\u5220\u9664" }))) }));
                                },
                                fixed: 'right',
                            },
                        ] }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { display: 'flex', justifyContent: 'flex-end' } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ danger: true, type: "default", onClick: function () { return setNewUploadFiles([]); } }, { children: "\u6E05\u7A7A" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                                        onPickByWeb(newUploadFiles, function (file, status) {
                                            setNewUploadFilesByStatus(file, status);
                                        });
                                    } }, { children: "\u4E0A\u4F20" }))] }) }))] }))] })));
}
exports.default = render;
