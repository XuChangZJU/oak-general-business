"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = tslib_1.__importStar(require("react"));
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const utils_1 = require("antd/es/upload/utils");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const react_dnd_1 = require("react-dnd");
const react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
const react_dnd_touch_backend_1 = require("react-dnd-touch-backend");
const utils_2 = require("oak-frontend-base/es/utils/utils");
function getListType(theme) {
    const themeMap = {
        file: "text",
        image: "picture-card",
        "image-flow": "picture",
        custom: "text",
    };
    return themeMap[theme];
}
const type = 'DraggableUploadList';
const DraggableUploadListItem = ({ originNode, moveRow, file, fileList, }) => {
    const ref = react_1.default.useRef(null);
    const index = fileList.indexOf(file);
    const [{ isOver, dropClassName }, drop] = (0, react_dnd_1.useDrop)({
        accept: type,
        collect: (monitor) => {
            const { index: dragIndex } = monitor.getItem() || {};
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: monitor.isOver(),
                dropClassName: dragIndex < index
                    ? ' drop-over-downward'
                    : ' drop-over-upward',
            };
        },
        drop: (item) => {
            moveRow(item.index, index);
        },
    });
    const [, drag] = (0, react_dnd_1.useDrag)({
        type,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drop(drag(ref));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: `ant-upload-draggable-list-item ${isOver ? dropClassName : ''}`, style: { cursor: 'move', height: '100%' }, children: originNode }));
};
function render(props) {
    const { accept = 'image/*', maxNumber = 20, multiple = maxNumber !== 1, draggable = false, theme = 'image', tips, beforeUpload, disabled, style, className, directory = false, onPreview, onDownload, children, showUploadList = true, files, disableInsert = false, disableAdd = false, disableDownload = false, disableDelete = false, disablePreview = false, } = props.data;
    const { onPickByWeb, onDeleteByWeb, updateItem, t, getFileName, getUrl, formatBytes, } = props.methods;
    const [newFiles, setNewFiles] = (0, react_1.useState)([]);
    const [newUploadFiles, setNewUploadFiles] = (0, react_1.useState)([]);
    const listType = getListType(theme);
    (0, react_1.useEffect)(() => {
        if (files && files.length > 0) {
            setNewFiles(files);
        }
        else {
            setNewFiles([]);
        }
    }, [files]);
    const extraFileToUploadFile = (extraFile) => {
        let status = undefined;
        switch (extraFile.uploadState) {
            case 'uploading': {
                status = 'uploading';
                break;
            }
            case 'failed': {
                status = 'error';
                break;
            }
            case 'success': {
                status = 'done';
                break;
            }
        }
        return Object.assign({}, extraFile, {
            id: extraFile.id,
            url: getUrl(extraFile),
            thumbUrl: getUrl(extraFile),
            name: getFileName(extraFile),
            fileName: getFileName(extraFile),
            size: extraFile.size,
            type: extraFile.fileType,
            uid: extraFile.id,
            status,
            percent: status === 'uploading' ? 50 : undefined,
        });
    };
    const setNewUploadFilesByStatus = (file, status) => {
        const { fileName, size, id } = file;
        const file2 = newUploadFiles.find((ele) => ele.name?.includes(fileName) && ele.size === size);
        if (file2) {
            Object.assign(file2, {
                status,
                id,
            });
        }
        setNewUploadFiles(newUploadFiles);
    };
    const customDelete = (index) => {
        const arr = [...newUploadFiles];
        arr.splice(index, 1);
        setNewUploadFiles(arr);
    };
    const getUploadButton = () => {
        if (children) {
            return children;
        }
        if (listType === 'picture-card') {
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 8 }, children: "\u8BF7\u9009\u62E9\u56FE\u7247" })] }));
        }
        return (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "default", children: "\u9009\u62E9\u6587\u4EF6" });
    };
    const checkLimit = (num) => {
        const pattern = /^\d+\.(?:9+)$/;
        return pattern.test(num.toString());
    };
    const moveRow = (0, react_1.useCallback)((dragIndex, hoverIndex) => {
        let dragRow = newFiles[dragIndex];
        let sort;
        if (hoverIndex === dragIndex) {
            return;
        }
        else if (hoverIndex > dragIndex) {
            if (hoverIndex === newFiles.length - 1) {
                sort = newFiles[hoverIndex].sort + 100;
            }
            else {
                sort =
                    (newFiles[hoverIndex].sort +
                        newFiles[hoverIndex + 1].sort) /
                        2;
            }
        }
        else {
            if (hoverIndex === 0) {
                sort = newFiles[hoverIndex].sort / 2;
            }
            else {
                sort =
                    (newFiles[hoverIndex].sort +
                        newFiles[hoverIndex - 1].sort) /
                        2;
            }
        }
        if (checkLimit(sort)) {
            alert('当前的sort值为:' + sort);
            return;
        }
        updateItem({ sort }, dragRow.id);
    }, [newFiles]);
    return ((0, jsx_runtime_1.jsxs)(antd_1.Space, { direction: "vertical", className: web_module_less_1.default['oak-upload'], style: { width: '100%' }, children: [(0, jsx_runtime_1.jsx)(react_dnd_1.DndProvider, { backend: utils_2.isPc ? react_dnd_html5_backend_1.HTML5Backend : react_dnd_touch_backend_1.TouchBackend, children: (0, jsx_runtime_1.jsx)(antd_1.Upload, { className: (0, classnames_1.default)(web_module_less_1.default['oak-upload__upload'], className), style: style, disabled: disabled, directory: directory, showUploadList: showUploadList
                        ? {
                            showPreviewIcon: !disablePreview,
                            showRemoveIcon: !disableDelete,
                            showDownloadIcon: !disableDownload,
                        }
                        : false, beforeUpload: async (file) => {
                        if (typeof beforeUpload === 'function') {
                            const result = await beforeUpload(file);
                            if (result) {
                                return false;
                            }
                        }
                        return false;
                    }, multiple: multiple, maxCount: maxNumber, accept: accept, listType: listType, fileList: theme === 'custom'
                        ? []
                        : newFiles?.map((ele) => extraFileToUploadFile(ele)), onChange: ({ file, fileList, event }) => {
                        // id不存在就是file对象
                        if (!file.id) {
                            if (theme !== 'custom') {
                                onPickByWeb([(0, utils_1.file2Obj)(file)]);
                            }
                            else {
                                setNewUploadFiles(fileList);
                            }
                        }
                    }, onRemove: onDeleteByWeb, onPreview: onPreview, onDownload: onDownload, itemRender: (originNode, currentFile, currentFileList) => {
                        return ((0, jsx_runtime_1.jsx)(DraggableUploadListItem, { originNode: originNode, file: currentFile, fileList: currentFileList, moveRow: moveRow }));
                    }, children: !disableInsert && !disableAdd ? getUploadButton() : null }) }), tips && ((0, jsx_runtime_1.jsx)("small", { className: web_module_less_1.default['oak-upload__tips'], children: tips })), theme === 'custom' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Table, { dataSource: newUploadFiles || [], rowKey: "id", columns: [
                            {
                                align: 'center',
                                dataIndex: 'tableIndex',
                                title: '#',
                                render: (value, record, index) => index + 1,
                                width: 50,
                            },
                            {
                                dataIndex: 'name',
                                title: '文件名',
                            },
                            {
                                dataIndex: 'size',
                                title: '文件大小',
                                render: (value, record, index) => {
                                    return formatBytes(value);
                                },
                            },
                            {
                                dataIndex: 'status',
                                title: '状态',
                                render: (value, record, index) => {
                                    switch (value) {
                                        case 'success':
                                            return ((0, jsx_runtime_1.jsx)(antd_1.Tag, { color: "success", children: t('success') }));
                                        case 'uploading':
                                            return ((0, jsx_runtime_1.jsx)(antd_1.Tag, { color: "processing", children: t('uploading') }));
                                        default:
                                            return ((0, jsx_runtime_1.jsx)(antd_1.Tag, { color: "warning", children: t('waiting') }));
                                    }
                                },
                            },
                            {
                                dataIndex: 'op',
                                width: 300,
                                title: '操作',
                                align: 'center',
                                render: (value, record, index) => {
                                    // 只处理state的文件 这时候可以直接删除
                                    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: !record.id && ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: () => {
                                                customDelete(index);
                                            }, children: "\u5220\u9664" })) }));
                                },
                                fixed: 'right',
                            },
                        ] }), (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', justifyContent: 'flex-end' }, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { danger: true, type: "default", onClick: () => setNewUploadFiles([]), children: "\u6E05\u7A7A" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => {
                                        onPickByWeb(newUploadFiles, (file, status) => {
                                            setNewUploadFilesByStatus(file, status);
                                        });
                                    }, children: "\u4E0A\u4F20" })] }) })] }))] }));
}
exports.default = render;
