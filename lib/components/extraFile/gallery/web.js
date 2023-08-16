"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = tslib_1.__importStar(require("react"));
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var utils_1 = require("antd/es/upload/utils");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var react_dnd_1 = require("react-dnd");
var react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
var react_dnd_touch_backend_1 = require("react-dnd-touch-backend");
var utils_2 = require("../../../../../oak-frontend-base/lib/utils/utils");
function getListType(theme) {
    var themeMap = {
        file: "text",
        image: "picture-card",
        "image-flow": "picture",
        custom: "text",
    };
    return themeMap[theme];
}
var type = "DragableUploadList";
var DragableUploadListItem = function (_a) {
    var originNode = _a.originNode, moveRow = _a.moveRow, file = _a.file, fileList = _a.fileList;
    var ref = react_1.default.useRef(null);
    var index = fileList.indexOf(file);
    var _b = tslib_1.__read((0, react_dnd_1.useDrop)({
        accept: type,
        collect: function (monitor) {
            var dragIndex = (monitor.getItem() || {}).index;
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: monitor.isOver(),
                dropClassName: dragIndex < index ? " drop-over-downward" : " drop-over-upward",
            };
        },
        drop: function (item) {
            moveRow(item.index, index);
        },
    }), 2), _c = _b[0], isOver = _c.isOver, dropClassName = _c.dropClassName, drop = _b[1];
    var _d = tslib_1.__read((0, react_dnd_1.useDrag)({
        type: type,
        item: { index: index },
        collect: function (monitor) { return ({
            isDragging: monitor.isDragging(),
        }); },
    }), 2), drag = _d[1];
    drop(drag(ref));
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ ref: ref, className: "ant-upload-draggable-list-item ".concat(isOver ? dropClassName : ""), style: { cursor: "move", height: "100%" } }, { children: originNode })));
};
function render(props) {
    var _this = this;
    var _a = props.data, _b = _a.accept, accept = _b === void 0 ? "image/*" : _b, _c = _a.maxNumber, maxNumber = _c === void 0 ? 20 : _c, _d = _a.multiple, multiple = _d === void 0 ? maxNumber !== 1 : _d, _e = _a.draggable, draggable = _e === void 0 ? false : _e, _f = _a.theme, theme = _f === void 0 ? "image" : _f, tips = _a.tips, beforeUpload = _a.beforeUpload, disabled = _a.disabled, style = _a.style, className = _a.className, _g = _a.directory, directory = _g === void 0 ? false : _g, onPreview = _a.onPreview, onDownload = _a.onDownload, children = _a.children, _h = _a.showUploadList, showUploadList = _h === void 0 ? true : _h, files = _a.files, _j = _a.disableInsert, disableInsert = _j === void 0 ? false : _j, _k = _a.disableAdd, disableAdd = _k === void 0 ? false : _k, _l = _a.disableDownload, disableDownload = _l === void 0 ? false : _l, _m = _a.disableDelete, disableDelete = _m === void 0 ? false : _m, _o = _a.preview, preview = _o === void 0 ? true : _o;
    var _p = props.methods, onPickByWeb = _p.onPickByWeb, onDeleteByWeb = _p.onDeleteByWeb, updateItem = _p.updateItem, t = _p.t, getFileName = _p.getFileName, getUrl = _p.getUrl, eFFormatBytes = _p.eFFormatBytes;
    var _q = tslib_1.__read((0, react_1.useState)([]), 2), newFiles = _q[0], setNewFiles = _q[1];
    var _r = tslib_1.__read((0, react_1.useState)([]), 2), newUploadFiles = _r[0], setNewUploadFiles = _r[1];
    var listType = getListType(theme);
    (0, react_1.useEffect)(function () {
        if (files && files.length > 0) {
            setNewFiles(files);
        }
        else {
            setNewFiles([]);
        }
    }, [files]);
    var extraFileToUploadFile = function (extraFile) {
        return {
            id: extraFile.id,
            url: getUrl(extraFile),
            thumbUrl: getUrl(extraFile),
            name: getFileName(extraFile),
            fileName: getFileName(extraFile),
            size: extraFile.size,
            type: extraFile.fileType,
            uid: extraFile.id, //upload 组件需要uid来维护fileList
            // status: 'done',
        };
    };
    var setNewUploadFilesByStatus = function (file, status) {
        var filename = file.filename, size = file.size, id = file.id;
        var file2 = newUploadFiles.find(function (ele) { var _a; return ((_a = ele.name) === null || _a === void 0 ? void 0 : _a.includes(filename)) && ele.size === size; });
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
        if (listType === "picture-card") {
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { marginTop: 8 } }, { children: "\u8BF7\u9009\u62E9\u56FE\u7247" }))] }));
        }
        return (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "default" }, { children: "\u9009\u62E9\u6587\u4EF6" }));
    };
    var checkLimit = function (num) {
        var pattern = /^\d+\.(?:9+)$/;
        return pattern.test(num.toString());
    };
    var moveRow = (0, react_1.useCallback)(function (dragIndex, hoverIndex) {
        var dragRow = newFiles[dragIndex];
        var sort;
        if (hoverIndex === dragIndex) {
            return;
        }
        else if (hoverIndex > dragIndex) {
            if (hoverIndex === newFiles.length - 1) {
                sort = newFiles[hoverIndex].sort + 100;
            }
            else {
                sort = (newFiles[hoverIndex].sort + newFiles[hoverIndex + 1].sort) / 2;
            }
        }
        else {
            if (hoverIndex === 0) {
                sort = newFiles[hoverIndex].sort / 2;
            }
            else {
                sort = (newFiles[hoverIndex].sort + newFiles[hoverIndex - 1].sort) / 2;
            }
        }
        if (checkLimit(sort)) {
            alert("当前的sort值为:" + sort);
            return;
        }
        updateItem({ sort: sort }, dragRow.id);
    }, [newFiles]);
    return ((0, jsx_runtime_1.jsxs)(antd_1.Space, tslib_1.__assign({ direction: "vertical", className: web_module_less_1.default["oak-upload"], style: { width: "100%" } }, { children: [(0, jsx_runtime_1.jsx)(react_dnd_1.DndProvider, tslib_1.__assign({ backend: utils_2.isPc ? react_dnd_html5_backend_1.HTML5Backend : react_dnd_touch_backend_1.TouchBackend }, { children: (0, jsx_runtime_1.jsx)(antd_1.Upload, tslib_1.__assign({ className: (0, classnames_1.default)(web_module_less_1.default["oak-upload__upload"], className), style: style, disabled: disabled, directory: directory, showUploadList: showUploadList
                        ? {
                            showPreviewIcon: preview,
                            showRemoveIcon: !disableDelete,
                            showDownloadIcon: !disableDownload,
                        }
                        : false, beforeUpload: function (file) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var result;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(typeof beforeUpload === "function")) return [3 /*break*/, 2];
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
                    }); }, multiple: multiple, maxCount: maxNumber, accept: accept, listType: listType, fileList: theme === "custom"
                        ? []
                        : newFiles === null || newFiles === void 0 ? void 0 : newFiles.map(function (ele) { return extraFileToUploadFile(ele); }), onChange: function (_a) {
                        var file = _a.file, fileList = _a.fileList, event = _a.event;
                        // id不存在就是file对象
                        if (!file.id) {
                            if (theme !== "custom") {
                                onPickByWeb([(0, utils_1.file2Obj)(file)]);
                            }
                            else {
                                setNewUploadFiles(fileList);
                            }
                        }
                    }, onRemove: function (file) {
                        onDeleteByWeb(file);
                    }, onPreview: onPreview, onDownload: onDownload, itemRender: function (originNode, currentFile, currentFileList) {
                        return ((0, jsx_runtime_1.jsx)(DragableUploadListItem, { originNode: originNode, file: currentFile, fileList: currentFileList, moveRow: moveRow }));
                    } }, { children: !disableInsert && !disableAdd ? getUploadButton() : null })) })), tips && (0, jsx_runtime_1.jsx)("small", tslib_1.__assign({ className: web_module_less_1.default["oak-upload__tips"] }, { children: tips })), theme === "custom" && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Table, { dataSource: newUploadFiles || [], rowKey: "id", columns: [
                            {
                                align: "center",
                                dataIndex: "tableIndex",
                                title: "序号",
                                render: function (value, record, index) { return index + 1; },
                                width: 100,
                            },
                            {
                                dataIndex: "name",
                                title: "文件名",
                            },
                            {
                                dataIndex: "size",
                                title: "文件大小",
                                render: function (value, record, index) {
                                    return eFFormatBytes(value);
                                },
                            },
                            {
                                dataIndex: "status",
                                title: "状态",
                                render: function (value, record, index) {
                                    var cpn;
                                    switch (value) {
                                        case "success":
                                            cpn = (0, jsx_runtime_1.jsx)(antd_1.Tag, tslib_1.__assign({ color: "success" }, { children: t("success") }));
                                            break;
                                        case "uploading":
                                            cpn = (0, jsx_runtime_1.jsx)(antd_1.Tag, tslib_1.__assign({ color: "processing" }, { children: t("uploading") }));
                                            break;
                                        default:
                                            cpn = (0, jsx_runtime_1.jsx)(antd_1.Tag, tslib_1.__assign({ color: "warning" }, { children: t("waiting") }));
                                            break;
                                    }
                                    return cpn;
                                },
                            },
                            {
                                dataIndex: "op",
                                width: 300,
                                title: "操作",
                                align: "center",
                                render: function (value, record, index) {
                                    // 只处理state的文件 这时候可以直接删除
                                    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: !record.id && ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                                customDelete(index);
                                            } }, { children: "\u5220\u9664" }))) }));
                                },
                                fixed: "right",
                            },
                        ] }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { display: "flex", justifyContent: "flex-end" } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ danger: true, type: "default", onClick: function () { return setNewUploadFiles([]); } }, { children: "\u6E05\u7A7A" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                                        onPickByWeb(newUploadFiles, function (file, status) {
                                            setNewUploadFilesByStatus(file, status);
                                        });
                                    } }, { children: "\u4E0A\u4F20" }))] }) }))] }))] })));
}
exports.default = render;
