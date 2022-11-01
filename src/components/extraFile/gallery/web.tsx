import React from 'react';
import { composeFileUrl, bytesToSize } from '../../../utils/extraFile';

import { Space, Upload, UploadFile, Tag, Button, Table, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import Style from './web.module.less';


function extraFileToUploadFile(extraFile: any, systemConfig: any) {
    return Object.assign({}, extraFile, {
        url: composeFileUrl(extraFile, systemConfig),
        thumbUrl: composeFileUrl(extraFile, systemConfig),
        name: extraFile.filename,
        uid: extraFile.uid || extraFile.id, //upload 组件需要uid来维护fileList
    });
}

interface ExtraFile extends UploadFile {
    id?: string;
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

export default function render(this: any) {
    const {
        accept = 'image/*',
        maxNumber = 20,
        multiple = true,
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
    } = this.props;
    const { files, systemConfig, newUploadFiles, disableInsert } = this.state;
    const listType = getListType(theme);

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
                        : files?.length
                        ? files.map((ele: any) =>
                              extraFileToUploadFile(ele, systemConfig)
                          )
                        : null
                }
                onChange={({ file, fileList, event }) => {
                    const arr =
                        fileList?.filter((ele: ExtraFile) => !ele.id) || [];
                    this.setState({
                        newUploadFiles: arr,
                    });
                    if (theme !== 'custom') {
                        this.onPickByWeb(arr);
                    }
                }}
                onRemove={(file) => {
                    this.onDeleteByWeb(file);
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
                                    return (
                                        <>
                                            {!record.id && (
                                                <Button
                                                    type="link"
                                                    onClick={() => {
                                                        this.customDelete(
                                                            index
                                                        );
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
                                onClick={() => {
                                    this.setState({
                                        newUploadFiles: [],
                                    });
                                }}
                            >
                                清空
                            </Button>
                            <Button
                                type="primary"
                                onClick={() => {
                                    this.onWebPick(
                                        newUploadFiles,
                                        (file: any, status: string) => {
                                            this.setNewUploadFiles(
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
