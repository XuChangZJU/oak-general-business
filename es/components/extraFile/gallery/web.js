import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect, useCallback } from "react";
import { Space, Upload, Tag, Button, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { file2Obj } from "antd/es/upload/utils";
import classNames from "classnames";
import Style from "./web.module.less";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isPc } from "oak-frontend-base/es/utils/utils";
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
                dropClassName: dragIndex < index
                    ? ' drop-over-downward'
                    : ' drop-over-upward',
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
    return (_jsx("div", { ref: ref, className: `ant-upload-draggable-list-item ${isOver ? dropClassName : ''}`, style: { cursor: 'move', height: '100%' }, children: originNode }));
};
export default function render(props) {
    const { accept = 'image/*', maxNumber = 20, multiple = maxNumber !== 1, draggable = false, theme = 'image', tips, beforeUpload, disabled, style, className, directory = false, onPreview, onDownload, children, showUploadList = true, files, disableInsert = false, disableAdd = false, disableDownload = false, disableDelete = false, disablePreview = false, } = props.data;
    const { onPickByWeb, onDeleteByWeb, updateItem, t, getFileName, getUrl, formatBytes, } = props.methods;
    const [newFiles, setNewFiles] = useState([]);
    const [newUploadFiles, setNewUploadFiles] = useState([]);
    const listType = getListType(theme);
    useEffect(() => {
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
            return (_jsxs("div", { children: [_jsx(PlusOutlined, {}), _jsx("div", { style: { marginTop: 8 }, children: "\u8BF7\u9009\u62E9\u56FE\u7247" })] }));
        }
        return _jsx(Button, { type: "default", children: "\u9009\u62E9\u6587\u4EF6" });
    };
    const checkLimit = (num) => {
        const pattern = /^\d+\.(?:9+)$/;
        return pattern.test(num.toString());
    };
    const moveRow = useCallback((dragIndex, hoverIndex) => {
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
    return (_jsxs(Space, { direction: "vertical", className: Style['oak-upload'], style: { width: '100%' }, children: [_jsx(DndProvider, { backend: isPc ? HTML5Backend : TouchBackend, children: _jsx(Upload, { className: classNames(Style['oak-upload__upload'], className), style: style, disabled: disabled, directory: directory, showUploadList: showUploadList
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
                                onPickByWeb([file2Obj(file)]);
                            }
                            else {
                                setNewUploadFiles(fileList);
                            }
                        }
                    }, onRemove: onDeleteByWeb, onPreview: onPreview, onDownload: onDownload, itemRender: (originNode, currentFile, currentFileList) => {
                        return (_jsx(DraggableUploadListItem, { originNode: originNode, file: currentFile, fileList: currentFileList, moveRow: moveRow }));
                    }, children: !disableInsert && !disableAdd ? getUploadButton() : null }) }), tips && (_jsx("small", { className: Style['oak-upload__tips'], children: tips })), theme === 'custom' && (_jsxs(_Fragment, { children: [_jsx(Table, { dataSource: newUploadFiles || [], rowKey: "id", columns: [
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
                                            return (_jsx(Tag, { color: "success", children: t('success') }));
                                        case 'uploading':
                                            return (_jsx(Tag, { color: "processing", children: t('uploading') }));
                                        default:
                                            return (_jsx(Tag, { color: "warning", children: t('waiting') }));
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
                                    return (_jsx(_Fragment, { children: !record.id && (_jsx(Button, { type: "link", onClick: () => {
                                                customDelete(index);
                                            }, children: "\u5220\u9664" })) }));
                                },
                                fixed: 'right',
                            },
                        ] }), _jsx("div", { style: { display: 'flex', justifyContent: 'flex-end' }, children: _jsxs(Space, { children: [_jsx(Button, { danger: true, type: "default", onClick: () => setNewUploadFiles([]), children: "\u6E05\u7A7A" }), _jsx(Button, { type: "primary", onClick: () => {
                                        onPickByWeb(newUploadFiles, (file, status) => {
                                            setNewUploadFilesByStatus(file, status);
                                        });
                                    }, children: "\u4E0A\u4F20" })] }) })] }))] }));
}
