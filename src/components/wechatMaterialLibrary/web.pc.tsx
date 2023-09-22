import React, { useState, useEffect } from 'react';
import { EntityDict } from "../../oak-app-domain";
import { WebComponentProps } from 'oak-frontend-base';
import { Modal, Button, Table, Space, Upload, Form, Input, Popover } from 'antd';
const { TextArea } = Input;
import type { ColumnsType } from 'antd/es/table';
import { DownloadOutlined } from '@ant-design/icons'
import Style from './web.module.less';
import dayjs from 'dayjs';
import fs from 'fs';
import { RcFile, UploadChangeParam } from 'antd/lib/upload/interface';
import type { UploadFile } from 'antd/es/upload/interface';
import ShowNews from '../wechatMenu/showNews';


export default function Render(
    props: WebComponentProps<
        EntityDict,
        keyof EntityDict,
        true,
        {
            type: string;
            materials: any[];
            total: number;
            getMenuContent: (menuContent: any) => void;
        },
        {
            getMaterialList: (page: number) => void;
            getArticleList: (page: number) => void;
            upload: (media: FormData, description?: FormData) => boolean;
        }
    >
) {
    const { type, materials, total, getMenuContent } = props.data;
    const { getMaterialList, setMessage, upload, getArticleList } = props.methods
    const [currentPage, setCurrentPage] = useState(1);
    const [upsertOpen, setUpsertOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [video, setVideo] = useState<FormData>(new FormData);
    const checkFileType = (filename: string) => {
        const fileExtension = filename?.split('.')?.pop()?.toLowerCase();
        let allowedExtensions = [] as string[];
        if (type === 'image') {
            allowedExtensions = ['bmp', 'png', 'jpeg', 'jpg', 'gif'];
        } else if (type === 'voice') {
            allowedExtensions = ['mp3', 'wma', 'wav', 'amr'];
        } else {
            allowedExtensions = ['mp4'];
        }
        if (allowedExtensions.includes(fileExtension!)) {
            return true;
        } else {
            setMessage({
                content: '文件类型错误',
                type: 'error'
            });
            return false;
        }
    };
    const uploadFile = async (file: RcFile) => {
        if (checkFileType(file.name)) {
            const formData = new FormData();
            formData.append('media', file);
            console.log(file)
            upload(formData);
        } else {
            return;
        }
    };
    const fileChange = (info: any) => {
        setFileList(info.fileList);
    }
    const uploadVideo = async (file: RcFile) => {
        if (checkFileType(file.name)) {
            const formData = new FormData();
            formData.append('media', file);
            setVideo(formData);
            const updataFileList = fileList.map((ele) => {
                return {
                    ...ele,
                    status: 'done'
                }
            });
            fileChange({ fileList: updataFileList });
        } else {
            const updataFileList = fileList.map((ele) => {
                return {
                    ...ele,
                    status: 'error'
                }
            });
            fileChange({ fileList: updataFileList });
        }
    }
    useEffect(() => {
        if (!open) {
            setTitle('');
            setIntroduction('');
            setFileList([]);
        }
    }, [open]);
    const columns: ColumnsType<any> = [
        {
            dataIndex: 'serial-number',
            title: '序号',
            render: (value, record, index) => {
                return index + 1;
            },
            width: 100
        },
        {
            dataIndex: 'name',
            title: '名称',
        },
        {
            dataIndex: 'update_time',
            title: '更新时间',
            render: (value, record, index) => {
                return <>{dayjs(value).format('YYYY-MM-DD HH:mm')}</>
            }
        },
    ];
    const newsColumns: ColumnsType<any> = [
        {
            dataIndex: 'serial-number',
            title: '序号',
            render: (value, record, index) => {
                return index + 1;
            },
            width: 100
        },
        {
            dataIndex: 'coverImg',
            title: '封面图',
            render: (value, record, index) => {
                return (
                    <div>
                        {
                            record.content.news_item.map((ele: any) => (
                                <div><img style={{ width: 100 }} src={ele.coverUrl} /></div>
                            ))
                        }
                    </div>
                )
            }
        },
        {
            dataIndex: 'title',
            title: '图文消息标题',
            render: (value, record, index) => {
                return (
                    <div>
                        {
                            record.content.news_item.map((ele: any) => (
                                <div>{ele.title}</div>
                            ))
                        }
                    </div>
                );
            }
        },
        {
            // dataIndex: 'author',
            title: '作者',
            render: (value, record, index) => {
                return (
                    <div>
                        {
                            record.content.news_item.map((ele: any) => (
                                <div>{ele.author}</div>
                            ))
                        }
                    </div>
                );
            }
        },
        {
            dataIndex: 'digest',
            title: '图文信息摘要',
            render: (value, record, index) => {
                return (
                    <div>
                        {
                            record.content.news_item.map((ele: any) => (
                                <div>{ele.digest}</div>
                            ))
                        }
                    </div>
                );
            }
        },
        {
            dataIndex: 'update_time',
            title: '更新时间',
            render: (value, record, index) => {
                return <>{dayjs(value).format('YYYY-MM-DD HH:mm')}</>
            }
        },
        {
            dataIndex: 'op',
            title: '操作',
            render: (value, record, index) => {
                return <Popover
                    content={<div style={{padding: 12}}><ShowNews oakAutoUnmount={true} news={record.content.news_item}/></div>}
                >
                    <div style={{cursor: 'pointer', color: '#1677ff'}}>预览</div>
                </Popover>
            }
        }
    ];
    if (type === 'image') {
        columns.splice(1, 0, {
            dataIndex: 'url',
            title: '图片',
            render: (value, record, index) => {
                return <img style={{ width: 120, height: 70 }} src={value} />
            },
        },);
    } else if (type === 'voice') {
        columns.splice(1, 0, {
            dataIndex: 'url',
            title: '音频',
            render: (value, record, index) => {
                return <a href={value} download={true} style={{ color: '#1677FF', cursor: 'pointer' }}><DownloadOutlined />{record.media_id}</a>
            },
        },);
    } else if (type === 'video') {
        columns.splice(1, 0, {
            dataIndex: 'url',
            title: '视频',
            render: (value, record, index) => {
                return <a href={value} download={true} style={{ color: '#1677FF', cursor: 'pointer' }}><DownloadOutlined />{record.media_id}</a>
            },
        },);
    } else {

    }
    return (
        <div className={Style.container}>
            <div className={Style.title}>
                {type === 'news' ? '选择图文' : type === 'image' ? '选择图片' : type === 'voice' ? '插入音频' : '选择视频'}
            </div>
            {
                type !== 'news' && <div className={Style.upload}>
                    <div className={Style.help}>
                        {type === 'image' ? '大小不超过10M' : type === 'voice' ? '由于版本兼容的原因,你暂时只可以选择60秒内的音频发送' : null}
                    </div>
                    {
                        type === 'video' ? (
                            <Button onClick={() => {
                                setUpsertOpen(true);
                            }}>上传视频</Button>
                        ) : (
                            <Upload
                                maxCount={1}
                                showUploadList={false}
                                customRequest={
                                    ({ file }) => {
                                        uploadFile(file as RcFile);
                                    }
                                }
                            >
                                <Button>上传{type === 'image' ? '图片' : '音频'}</Button>
                            </Upload>
                        )
                    }
                    <Modal
                        open={upsertOpen}
                        onCancel={() => setUpsertOpen(false)}
                        title={'上传视频'}
                        footer={
                            <Space>
                                <Button type='primary' onClick={() => {
                                    if (title.length === 0) {
                                        setMessage({
                                            type: 'warning',
                                            content: '标题不能为空'
                                        });
                                        return;
                                    }
                                    if (introduction.length === 0) {
                                        setMessage({
                                            type: 'warning',
                                            content: '视频介绍不能为空'
                                        });
                                        return;
                                    }
                                    if (fileList.length === 0 || fileList[0].status === 'error') {
                                        setMessage({
                                            type: 'warning',
                                            content: '请上传视频文件'
                                        });
                                        return;
                                    }
                                    const formData = new FormData;
                                    const descriptionData = {
                                        title,
                                        introduction,
                                    };
                                    formData.append('description', JSON.stringify(descriptionData));
                                    if (upload(video, formData)) {
                                        setUpsertOpen(false);
                                    }
                                }}>
                                    上传
                                </Button>
                                <Button onClick={() => setUpsertOpen(false)}>
                                    取消
                                </Button>
                            </Space>
                        }
                    >
                        <div>
                            <Form.Item
                                label={<div className={Style.label}>标题</div>}
                                required
                                labelAlign={'right'}
                                labelCol={{ span: 4 }}
                            >
                                <Input showCount maxLength={20} value={title} onChange={(val) => setTitle(val.target.value)} />
                            </Form.Item>
                            <Form.Item
                                label={<div className={Style.label}>视频介绍</div>}
                                required
                            >
                                <TextArea
                                    showCount
                                    maxLength={300}
                                    value={introduction}
                                    autoSize={{ minRows: 5 }}
                                    onChange={(val) => setIntroduction(val.target.value)}
                                />
                            </Form.Item>
                            <Form.Item
                                label={<div className={Style.label}>上传视频</div>}
                                required
                            >
                                <Upload
                                    customRequest={({ file }) => uploadVideo(file as RcFile)}
                                    maxCount={1}
                                    onChange={fileChange}
                                    fileList={fileList}
                                >
                                    <Button><DownloadOutlined />{fileList.length > 0 ? '重新' : ''}上传</Button>
                                </Upload>
                            </Form.Item>
                        </div>
                    </Modal>
                </div >
            }
            <div className={Style.list}>
                <Table
                    rowKey={type === 'news' ? 'article_id' : 'media_id'}
                    dataSource={materials}
                    columns={type === 'news' ? newsColumns : columns}
                    pagination={{
                        total: total,
                        pageSize: 10,
                        current: currentPage,
                        onChange: (page: number, pageSize: number) => {
                            setCurrentPage(page);
                            if(type === 'news') {
                                getArticleList(page);
                            } else {
                                getMaterialList(page);
                            } 
                        },
                    }}
                    rowSelection={{
                        type: 'radio',
                        onSelect: (record) => {
                            if(type === 'news') {
                                getMenuContent(record);
                            } else {
                                getMenuContent(record);
                            }      
                        },
                    }}
                />
            </div>
        </div >
    );
}

