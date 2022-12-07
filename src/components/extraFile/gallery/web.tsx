import React, { useState, useEffect } from 'react';
import { composeFileUrl, bytesToSize } from '../../../utils/extraFile';

import {
    Space,
    Upload,
    UploadFile,
    Tag,
    Button,
    Table,
    UploadProps,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import Style from './web.module.less';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import { file2Obj } from 'antd/es/upload/utils'
import { RcFile } from 'antd/es/upload/interface';

interface NewUploadFile extends UploadFile {
    id?: string;
}

function extraFileToUploadFile(
    extraFile: EntityDict['extraFile']['Schema'],
    systemConfig: EntityDict['system']['OpSchema']['config']
): NewUploadFile {
    return {
        id: extraFile.id,
        url: composeFileUrl(extraFile, systemConfig),
        thumbUrl: composeFileUrl(extraFile, systemConfig),
        name: extraFile.filename,
        fileName: extraFile.filename,
        size: extraFile.size!,
        type: extraFile.fileType,
        uid: extraFile.id, //upload 组件需要uid来维护fileList
        // status: 'done',
    };
}



type Theme = 'file' | 'image' | 'file-flow' | 'image-flow' | 'custom';
type ListType = 'text' | 'picture' | 'picture-card';

function getListType(theme: Theme): ListType {
    const themeMap: Record<Theme, ListType> = {
        file: 'text',
        image: 'picture-card',
        'file-flow': 'text',
        'image-flow': 'picture',
        custom: 'text',
    };
    return themeMap[theme];
}

export default function render(
    props: WebComponentProps<
        EntityDict,
        'extraFile',
        true,
        {
            accept?: string;
            maxNumber?: number;
            multiple?: boolean;
            draggable?: boolean;
            theme?: Theme;
            tips?: string;
            beforeUpload?: (file: File) => Promise<boolean>;
            disabled?: boolean;
            style?: Record<string, string>;
            className?: string;
            directory?: boolean;
            onPreview?: (file: UploadFile<any>) => void;
            onDownload?: (file: UploadFile<any>) => void;
            showUploadList?: boolean;
            children?: JSX.Element;
            files?: EntityDict['extraFile']['OpSchema'][];
            systemConfig: EntityDict['system']['OpSchema']['config'];
            disableInsert?: boolean;
        },
        {
            onPickByWeb: (
                files: UploadFile[],
                callback?: (file: any, status: string) => void
            ) => void;
            onDeleteByWeb: (file: UploadFile) => void;
        }
    >
) {
    const {
        accept = 'image/*',
        maxNumber = 20,
        multiple = maxNumber !== 1,
        draggable = false,
        theme = 'image',
        tips,
        beforeUpload,
        disabled,
        style,
        className,
        directory = false,
        onPreview,
        onDownload,
        children,
        showUploadList = true,
        files,
        systemConfig,
        disableInsert,
    } = props.data;
    const { onPickByWeb, onDeleteByWeb } = props.methods;

    const [newFiles, setNewFiles] = useState<
        EntityDict['extraFile']['OpSchema'][]
    >([]);

    const [newUploadFiles, setNewUploadFiles] = useState([] as NewUploadFile[]);

    const listType = getListType(theme);


    useEffect(() => {
        if (files && files.length > 0) {
            setNewFiles(files);
        } else {
            setNewFiles([]);
        }
    }, [files]);

    const setNewUploadFilesByStatus = (
        file: EntityDict['extraFile']['Schema'],
        status: string
    ) => {
        const { filename, size, id } = file;
        const file2 = newUploadFiles.find(
            (ele: NewUploadFile) => (ele.fileName === filename && ele.size === size)
        );
        if (file2) {
            Object.assign(file2, {
                status,
                id,
            });
        }

        setNewUploadFiles(newUploadFiles);
    };
    const customDelete = (index: number) => {
        const arr = [...newUploadFiles];
        arr.splice(index, 1);
        setNewUploadFiles(arr);
    };

    const getUploadButton = () => {
        if (children) {
            return children;
        }
        if (listType === 'picture-card') {
            return (
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>请选择图片</div>
                </div>
            );
        }
        return <Button type="default">选择文件</Button>;
    };
    return (
        <Space direction="vertical" className={Style['oak-upload']}>
            <Upload
                className={classNames(Style['oak-upload__upload'], className)}
                style={style}
                disabled={disabled}
                directory={directory}
                showUploadList={showUploadList}
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
                maxCount={maxNumber}
                accept={accept}
                listType={listType}
                fileList={
                    theme === 'custom'
                        ? []
                        : newFiles?.map((ele) =>
                              extraFileToUploadFile(ele, systemConfig)
                          )
                }
                onChange={({ file, fileList, event }) => {
                    // const arr =
                    //     fileList?.filter((ele: NewUploadFile) => !ele.id) || [];
                    // if (theme !== 'custom') {
                    //     onPickByWeb(arr);
                    // } else {
                    //     setNewUploadFiles(arr);
                    // }
                    // id不存在就是file对象
                    if (!(file as NewUploadFile).id) {
                        if (theme !== 'custom') {
                            onPickByWeb([file2Obj(file as RcFile)]);
                        } else {
                            setNewUploadFiles([file2Obj(file as RcFile)]);
                        }
                    }
                }}
                onRemove={(file) => {
                    onDeleteByWeb(file);
                }}
                onPreview={onPreview}
                onDownload={onDownload}
            >
                {disableInsert ? null : getUploadButton()}
            </Upload>
            {tips && (
                <small className={Style['oak-upload__tips']}>{tips}</small>
            )}
            {theme === 'custom' && (
                <>
                    <Table
                        dataSource={newUploadFiles || []}
                        rowKey="id"
                        columns={[
                            {
                                align: 'center',
                                dataIndex: 'tableIndex',
                                title: '序号',
                                render: (value, record, index) => index + 1,
                                width: 100,
                            },
                            {
                                dataIndex: 'name',
                                title: '文件名',
                            },
                            {
                                dataIndex: 'size',
                                title: '文件大小',
                                render: (value, record, index) => {
                                    const b = value / 1024;
                                    return bytesToSize(b);
                                },
                            },
                            {
                                dataIndex: 'status',
                                title: '状态',
                                render: (value, record, index) => {
                                    let cpn: any;
                                    switch (value) {
                                        case 'success':
                                            cpn = (
                                                <Tag color="success">
                                                    success
                                                </Tag>
                                            );
                                            break;
                                        case 'uploading':
                                            cpn = (
                                                <Tag color="processing">
                                                    uploading
                                                </Tag>
                                            );
                                            break;
                                        default:
                                            cpn = (
                                                <Tag color="warning">
                                                    waiting
                                                </Tag>
                                            );
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
                                render: (value, record, index) => {
                                    // 只处理state的文件 这时候可以直接删除
                                    return (
                                        <>
                                            {!record.id && (
                                                <Button
                                                    type="link"
                                                    onClick={() => {
                                                        customDelete(index);
                                                    }}
                                                >
                                                    删除
                                                </Button>
                                            )}
                                        </>
                                    );
                                },
                                fixed: 'right',
                            },
                        ]}
                    />
                    <div
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                        <Space>
                            <Button
                                danger
                                type="default"
                                onClick={() => setNewUploadFiles([])}
                            >
                                清空
                            </Button>
                            <Button
                                type="primary"
                                onClick={() => {
                                    onPickByWeb(
                                        newUploadFiles,
                                        (file: any, status: string) => {
                                            setNewUploadFilesByStatus(
                                                file,
                                                status
                                            );
                                        }
                                    );
                                }}
                            >
                                上传
                            </Button>
                        </Space>
                    </div>
                </>
            )}
        </Space>
    );
}
