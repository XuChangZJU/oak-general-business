"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = tslib_1.__importStar(require("react"));
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const react_dnd_1 = require("react-dnd");
const react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
const react_dnd_touch_backend_1 = require("react-dnd-touch-backend");
const utils_1 = require("oak-frontend-base/es/utils/utils");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function getListType(theme) {
    const themeMap = {
        file: "text",
        image: "picture-card",
        "image-flow": "picture",
        custom: "text",
    };
    return themeMap[theme];
}
const type = "DragableUploadList";
const DragableUploadListItem = ({ originNode, moveRow, file, fileList, }) => {
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
                dropClassName: dragIndex < index ? " drop-over-downward" : " drop-over-upward",
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
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: `ant-upload-draggable-list-item ${isOver ? dropClassName : ""}`, style: { cursor: "move", height: "100%" }, children: originNode }));
};
function render(props) {
    const { accept = 'image/*', maxNumber = 20, multiple = maxNumber !== 1, draggable = false, theme = 'image', tips, beforeUpload, style, className, directory = false, onPreview, onDownload, children, showUploadList = true, files = [], disableInsert = false, disableDownload = false, disableDelete = false, disablePreview = false, } = props.data;
    const { t, updateItem, onRemove, addFileByWeb, checkSort } = props.methods;
    const listType = getListType(theme);
    const getUploadButton = () => {
        if (children) {
            return children;
        }
        if (listType === 'picture-card') {
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 8 }, children: t('choosePicture') })] }));
        }
        return (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "default", children: t('chooseFile') });
    };
    const transformToUploadFile = () => {
        return files.map((file) => {
            let status = undefined;
            if (file.$$deleteAt$$) {
                status = 'removed';
            }
            else if (file.fileState) {
                switch (file.fileState) {
                    case 'failed': {
                        status = 'error';
                        break;
                    }
                    case 'local': {
                        break;
                    }
                    case 'uploaded': {
                        status = 'done';
                        break;
                    }
                    case 'uploading': {
                        status = 'uploading';
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
            else {
                switch (file.uploadState) {
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
            }
            return {
                ...file,
                status,
                name: file.filename,
                uid: file.id,
                size: file.size,
            };
        });
    };
    const moveRow = (0, react_1.useCallback)((dragIndex, hoverIndex) => {
        const dragRow = files[dragIndex];
        let sort;
        if (hoverIndex === dragIndex) {
            return;
        }
        else if (hoverIndex > dragIndex) {
            if (hoverIndex === files.length - 1) {
                sort = files[hoverIndex].sort + 100;
            }
            else {
                sort =
                    (files[hoverIndex].sort +
                        files[hoverIndex + 1].sort) /
                        2;
            }
        }
        else {
            if (hoverIndex === 0) {
                sort = files[hoverIndex].sort / 2;
            }
            else {
                sort =
                    (files[hoverIndex].sort +
                        files[hoverIndex - 1].sort) /
                        2;
            }
        }
        if (checkSort(sort)) {
            updateItem({ sort }, dragRow.id);
        }
    }, [files]);
    return ((0, jsx_runtime_1.jsxs)(antd_1.Space, { direction: "vertical", className: web_module_less_1.default['oak-upload'], style: { width: '100%' }, children: [(0, jsx_runtime_1.jsx)(react_dnd_1.DndProvider, { backend: utils_1.isPc ? react_dnd_html5_backend_1.HTML5Backend : react_dnd_touch_backend_1.TouchBackend, children: (0, jsx_runtime_1.jsx)(antd_1.Upload, { className: (0, classnames_1.default)(web_module_less_1.default['oak-upload__upload'], className), style: style, directory: directory, showUploadList: showUploadList
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
                    }, multiple: multiple, accept: accept, listType: listType, fileList: transformToUploadFile(), onChange: ({ file, fileList, event }) => {
                        if (file instanceof File) {
                            addFileByWeb(file);
                        }
                    }, onRemove: onRemove, onPreview: onPreview, onDownload: onDownload, itemRender: (originNode, currentFile, currentFileList) => {
                        return ((0, jsx_runtime_1.jsx)(DragableUploadListItem, { originNode: originNode, file: currentFile, fileList: currentFileList, moveRow: moveRow }));
                    }, children: !disableInsert && files.length < maxNumber
                        ? getUploadButton()
                        : null }) }), tips && ((0, jsx_runtime_1.jsx)("small", { className: web_module_less_1.default['oak-upload__tips'], children: tips }))] }));
}
exports.default = render;
