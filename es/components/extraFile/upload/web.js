import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useCallback } from 'react';
import { Space, Upload, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isPc } from "oak-frontend-base/es/utils/utils";
import Style from "./web.module.less";
function getListType(theme) {
    const themeMap = {
        file: "text",
        image: "picture-card",
        "image-flow": "picture",
        custom: "text",
    };
    return themeMap[theme];
}
const type = "DraggableUploadList";
const DraggableUploadListItem = ({ originNode, moveRow, file, fileList, }) => {
    const ref = React.useRef(null);
    const index = fileList.indexOf(file);
    const [{ isOver, dropClassName }, drop] = useDrop({
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
    const [, drag] = useDrag({
        type,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drop(drag(ref));
    return (_jsx("div", { ref: ref, className: `ant-upload-draggable-list-item ${isOver ? dropClassName : ""}`, style: { cursor: "move", height: "100%" }, children: originNode }));
};
export default function render(props) {
    const { accept = 'image/*', maxNumber = 20, multiple = maxNumber !== 1, draggable = false, theme = 'image', beforeUpload, style, className, directory = false, onPreview, onDownload, children, showUploadList = true, files = [], disableInsert = false, disableDownload = false, disableDelete = false, disablePreview = false, } = props.data;
    const { t, updateItem, onRemove, addFileByWeb, checkSort } = props.methods;
    const listType = getListType(theme);
    const getUploadButton = () => {
        if (children) {
            return children;
        }
        if (listType === 'picture-card') {
            return (_jsxs("div", { children: [_jsx(PlusOutlined, {}), _jsx("div", { style: { marginTop: 8 }, children: t('choosePicture') })] }));
        }
        return _jsx(Button, { type: "default", children: t('chooseFile') });
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
                name: file.fileName,
                uid: file.id,
                size: file.size,
                fileName: file.fileName,
            };
        });
    };
    const moveRow = useCallback((dragIndex, hoverIndex) => {
        const dragRow = files[dragIndex];
        let sort;
        // 拖拽物下标和覆盖物下标一致 
        if (hoverIndex === dragIndex) {
            return;
        }
        else if (hoverIndex > dragIndex) {
            // 放置最后覆盖物上
            if (hoverIndex === files.length - 1) {
                sort = files[hoverIndex].sort * 2;
            }
            else {
                sort =
                    (files[hoverIndex].sort +
                        files[hoverIndex + 1].sort) /
                        2;
            }
        }
        else {
            // 放置最前覆盖物上
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
    return (_jsx(Space, { direction: "vertical", className: Style['oak-upload'], style: { width: '100%' }, children: _jsx(DndProvider, { backend: isPc ? HTML5Backend : TouchBackend, children: _jsx(Upload, { className: classNames(Style['oak-upload__upload'], className), style: style, directory: directory, showUploadList: showUploadList
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
                    return (_jsx(DraggableUploadListItem, { originNode: originNode, file: currentFile, fileList: currentFileList, moveRow: moveRow }));
                }, children: !disableInsert && files.length < maxNumber
                    ? getUploadButton()
                    : null }) }) }));
}
