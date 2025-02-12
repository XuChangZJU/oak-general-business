import React, { useCallback } from 'react';
import { Space, Upload, UploadFile, Tag, Button, Table } from "antd";
import { Html5Filled, PlusOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { WebComponentProps } from "oak-frontend-base";
import { UploadListType } from 'antd/es/upload/interface';
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isPc } from "oak-frontend-base/es/utils/utils";
import { EntityDict } from "../../../oak-app-domain";
import { EnhancedExtraFile, Theme } from './index';
import Style from "./web.module.less";

function getListType(theme: Theme): UploadListType {
    const themeMap: Record<Theme, UploadListType> = {
        file: "text",
        image: "picture-card",
        "image-flow": "picture",
        custom: "text",
    };
    return themeMap[theme];
}


const type = "DraggableUploadList";
const DraggableUploadListItem = ({
    originNode,
    moveRow,
    file,
    fileList,
}: any) => {
    const ref = React.useRef(null);
    const index = fileList.indexOf(file);
    const [{ isOver, dropClassName }, drop] = useDrop({
        accept: type,
        collect: (monitor: any) => {
            const { index: dragIndex } = monitor.getItem() || {};
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: monitor.isOver(),
                dropClassName:
                    dragIndex < index ? " drop-over-downward" : " drop-over-upward",
            };
        },
        drop: (item: any) => {
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
    return (
        <div
            ref={ref}
            className={`ant-upload-draggable-list-item ${isOver ? dropClassName : ""}`}
            style={{ cursor: "move", height: "100%" }}
        >
            {originNode}
        </div>
    );
};

export default function render(
    props: WebComponentProps<
        EntityDict,
        'extraFile',
        true,
        {
            files: EnhancedExtraFile[];
            accept?: string;
            maxNumber?: number;
            multiple?: boolean;
            draggable?: boolean;
            theme?: Theme;
            beforeUpload?: (file: File) => Promise<boolean> | boolean;
            style?: Record<string, string>;
            className?: string;
            directory?: boolean;
            onPreview?: (file: UploadFile<any>) => void;
            onDownload?: (file: UploadFile<any>) => void;
            showUploadList?: boolean;
            children?: JSX.Element;
            disableInsert?: boolean;
            disableDownload?: boolean;
            disableDelete?: boolean;
            disablePreview?: boolean;
        },
        {
            onRemove: (file: UploadFile) => void;
            addFileByWeb: (file: UploadFile) => void;
            checkSort: (sort: number) => boolean;
        }
    >
) {
    const {
        accept = 'image/*',
        maxNumber = 20,
        multiple = maxNumber !== 1,
        draggable = false,
        theme = 'image',
        beforeUpload,
        style,
        className,
        directory = false,
        onPreview,
        onDownload,
        children,
        showUploadList = true,
        files = [],
        disableInsert = false,
        disableDownload = false,
        disableDelete = false,
        disablePreview = false,
    } = props.data;

    const { t, updateItem, onRemove, addFileByWeb, checkSort } = props.methods;

    const listType = getListType(theme);
    const getUploadButton = () => {
        if (children) {
            return children;
        }
        if (listType === 'picture-card') {
            return (
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>{t('choosePicture')}</div>
                </div>
            );
        }
        return <Button type="default">{t('chooseFile')}</Button>;
    };

    const transformToUploadFile: () => (EnhancedExtraFile &
        UploadFile)[] = () => {
        return files.map((file) => {
            let status = undefined as UploadFile['status'];
            if (file.$$deleteAt$$) {
                status = 'removed';
            } else if (file.fileState) {
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
            } else {
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
                size: file.size!,
                fileName: file.fileName,
            };
        });
    };

    const moveRow = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const dragRow = files[dragIndex];
            let sort;
            // 拖拽物下标和覆盖物下标一致 
            if (hoverIndex === dragIndex) {
                return;
            } else if (hoverIndex > dragIndex) {
                // 放置最后覆盖物上
                if (hoverIndex === files.length - 1) {
                    sort = files[hoverIndex]!.sort! * 2;
                } else {
                    sort =
                        (files[hoverIndex]!.sort! +
                            files[hoverIndex + 1]!.sort!) /
                        2;
                }
            } else {
                // 放置最前覆盖物上
                if (hoverIndex === 0) {
                    sort = files[hoverIndex]!.sort! / 2;
                } else {
                    sort =
                        (files[hoverIndex]!.sort! +
                            files[hoverIndex - 1]!.sort!) /
                        2;
                }
            }
            if (checkSort(sort)) {
                updateItem({ sort }, dragRow.id);
            }
        },
        [files]
    );

    return (
        <Space
            direction="vertical"
            className={Style['oak-upload']}
            style={{ width: '100%' }}
        >
            <DndProvider backend={isPc ? HTML5Backend : TouchBackend}>
                <Upload
                    className={classNames(
                        Style['oak-upload__upload'],
                        className
                    )}
                    style={style}
                    directory={directory}
                    showUploadList={
                        showUploadList
                            ? {
                                  showPreviewIcon: !disablePreview,
                                  showRemoveIcon: !disableDelete,
                                  showDownloadIcon: !disableDownload,
                              }
                            : false
                    }
                    beforeUpload={async (file) => {
                        if (typeof beforeUpload === 'function') {
                            const result = await beforeUpload(file);
                            if (result) {
                                return false;
                            }
                        }
                        return false;
                    }}
                    multiple={multiple}
                    accept={accept}
                    listType={listType}
                    fileList={transformToUploadFile()}
                    onChange={({ file, fileList, event }) => {
                        if (file instanceof File) {
                            addFileByWeb(file);
                        }
                    }}
                    onRemove={onRemove}
                    onPreview={onPreview}
                    onDownload={onDownload}
                    itemRender={(originNode, currentFile, currentFileList) => {
                        return (
                            <DraggableUploadListItem
                                originNode={originNode}
                                file={currentFile}
                                fileList={currentFileList}
                                moveRow={moveRow}
                            />
                        );
                    }}
                >
                    {!disableInsert && files.length < maxNumber
                        ? getUploadButton()
                        : null}
                </Upload>
            </DndProvider>
        </Space>
    );
}