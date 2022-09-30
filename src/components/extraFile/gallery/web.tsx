import React from 'react';
import { Space, Upload, UploadFile, Table, Button, Tag, Loading } from 'tdesign-react';
import { composeFileUrl, bytesToSize } from '../../../utils/extraFile';

function extraFileToUploadFile(extraFile: any, systemConfig: any) {
    return Object.assign({}, extraFile, {
        url: composeFileUrl(extraFile, systemConfig),
        name: extraFile.filename,
    });
}

interface ExtraFile extends UploadFile {
    id?: string;
}

export default function render(this: any) {
    const {
        accept = 'image/*',
        maxNumber = 20,
        multiple = true,
        useMockProgress = false,
        draggable = false,
        showUploadProgress = false,
        theme = 'image',
        tips,
        placeholder,
        beforeUpload,
        disabled,
        style,
        className,
        sizeLimit,
    } = this.props;
    const { files, systemConfig, newUploadFiles } = this.state;

    return (
        <Space direction="vertical">
            <Upload
                sizeLimit={sizeLimit}
                className={className}
                style={style}
                disabled={disabled}
                beforeUpload={beforeUpload}
                placeholder={placeholder}
                tips={tips}
                multiple={multiple}
                autoUpload={false}
                draggable={draggable}
                useMockProgress={useMockProgress}
                max={maxNumber}
                accept={accept}
                showUploadProgress={showUploadProgress}
                theme={theme}
                files={
                    theme === 'custom'
                        ? []
                        : (files || []).map((ele: any) =>
                              extraFileToUploadFile(ele, systemConfig)
                          )
                }
                onChange={(uploadFiles) => {
                    const arr =
                        uploadFiles?.filter((ele: ExtraFile) => !ele.id) || [];
                    this.setState({
                        newUploadFiles: arr,
                    });
                    if (theme !== 'custom') {
                        this.onWebPick(arr);
                    }
                }}
                onRemove={({ file, index, e }) => {
                    this.onWebDelete(file, index);
                }}
                onPreview={({ file, e }) => {}}
            >
                {theme === 'custom' && (
                    <Button variant="outline" theme="default">
                        选择文件
                    </Button>
                )}
            </Upload>
            {theme === 'custom' && (
                <>
                    <Table
                        data={newUploadFiles || []}
                        rowKey="id"
                        columns={[
                            {
                                align: 'center',
                                colKey: 'tableIndex',
                                title: '序号',
                                cell: ({ row, rowIndex }) => rowIndex + 1,
                                width: 100,
                            },
                            {
                                colKey: 'name',
                                title: '文件名',
                            },
                            {
                                colKey: 'size',
                                title: '文件大小',
                                cell: ({ row }) => {
                                    const b = row?.size / 1024;
                                    return bytesToSize(b);
                                },
                            },
                            {
                                colKey: 'status',
                                title: '状态',
                                cell: ({ row }) => {
                                    let cpn: any;
                                    switch (row.status) {
                                        case 'success':
                                            cpn = (
                                                <Tag
                                                    theme="success"
                                                    variant="light"
                                                >
                                                    success
                                                </Tag>
                                            );
                                            break;
                                        case 'uploading':
                                            cpn = (
                                                <Loading
                                                    loading={true}
                                                    text="uploading..."
                                                ></Loading>
                                            );
                                            break;
                                        default:
                                            cpn = (
                                                <Tag
                                                    theme="warning"
                                                    variant="light"
                                                >
                                                    waiting
                                                </Tag>
                                            );
                                            break;
                                    }
                                    return cpn;
                                },
                            },
                            {
                                colKey: 'op',
                                width: 300,
                                title: '操作',
                                align: 'center',
                                cell: ({ row, rowIndex }) => {
                                    return (
                                        <>
                                            {!row.id && (
                                                <Button
                                                    theme="primary"
                                                    variant="text"
                                                    onClick={() => {
                                                        this.customDelete(
                                                            rowIndex
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
                                theme="default"
                                onClick={() => {
                                    this.setState({
                                        newUploadFiles: [],
                                    });
                                }}
                            >
                                全部清空
                            </Button>
                            <Button
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
