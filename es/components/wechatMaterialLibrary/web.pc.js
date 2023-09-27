import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Modal, Button, Table, Space, Upload, Form, Input, Popover } from 'antd';
const { TextArea } = Input;
import { DownloadOutlined } from '@ant-design/icons';
import Style from './web.module.less';
import dayjs from 'dayjs';
import ShowNews from '../wechatMenu/showNews';
export default function Render(props) {
    const { type, materials, total, getMenuContent } = props.data;
    const { getMaterialList, setMessage, upload, getArticleList, getImg } = props.methods;
    const [currentPage, setCurrentPage] = useState(1);
    const [upsertOpen, setUpsertOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [fileList, setFileList] = useState([]);
    const [video, setVideo] = useState();
    const checkFileType = (filename) => {
        const fileExtension = filename?.split('.')?.pop()?.toLowerCase();
        let allowedExtensions = [];
        if (type === 'image') {
            allowedExtensions = ['bmp', 'png', 'jpeg', 'jpg', 'gif'];
        }
        else if (type === 'voice') {
            allowedExtensions = ['mp3', 'wma', 'wav', 'amr'];
        }
        else {
            allowedExtensions = ['mp4'];
        }
        if (allowedExtensions.includes(fileExtension)) {
            return true;
        }
        else {
            setMessage({
                content: '文件类型错误',
                type: 'error'
            });
            return false;
        }
    };
    const uploadFile = async (file) => {
        if (checkFileType(file.name)) {
            const newFile = { ...file };
            upload(file);
        }
        else {
            return;
        }
    };
    const fileChange = (info) => {
        setFileList(info.fileList);
    };
    const uploadVideo = async (file) => {
        if (checkFileType(file.name)) {
            setVideo(file);
            const updataFileList = fileList.map((ele) => {
                return {
                    ...ele,
                    status: 'done'
                };
            });
            fileChange({ fileList: updataFileList });
        }
        else {
            const updataFileList = fileList.map((ele) => {
                return {
                    ...ele,
                    status: 'error'
                };
            });
            fileChange({ fileList: updataFileList });
        }
    };
    useEffect(() => {
        if (!open) {
            setTitle('');
            setIntroduction('');
            setFileList([]);
        }
    }, [open]);
    const columns = [
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
                return _jsx(_Fragment, { children: dayjs(value * 1000).format('YYYY-MM-DD HH:mm') });
            }
        },
    ];
    const newsColumns = [
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
                return (_jsx("div", { children: record.content.news_item.map((ele) => (_jsx("div", { children: _jsx("img", { style: { width: 100 }, src: ele.coverUrl }) }))) }));
            }
        },
        {
            dataIndex: 'title',
            title: '图文消息标题',
            render: (value, record, index) => {
                return (_jsx("div", { children: record.content.news_item.map((ele) => (_jsx("div", { children: ele.title }))) }));
            }
        },
        {
            // dataIndex: 'author',
            title: '作者',
            render: (value, record, index) => {
                return (_jsx("div", { children: record.content.news_item.map((ele) => (_jsx("div", { children: ele.author }))) }));
            }
        },
        {
            dataIndex: 'digest',
            title: '图文信息摘要',
            render: (value, record, index) => {
                return (_jsx("div", { children: record.content.news_item.map((ele) => (_jsx("div", { children: ele.digest }))) }));
            }
        },
        {
            dataIndex: 'update_time',
            title: '更新时间',
            render: (value, record, index) => {
                return _jsx(_Fragment, { children: dayjs(value * 1000).format('YYYY-MM-DD HH:mm') });
            }
        },
        {
            dataIndex: 'op',
            title: '操作',
            render: (value, record, index) => {
                return _jsx(Popover, { content: _jsx("div", { style: { padding: 12 }, children: _jsx(ShowNews, { oakAutoUnmount: true, news: record.content.news_item }) }), children: _jsx("div", { style: { cursor: 'pointer', color: '#1677ff' }, children: "\u9884\u89C8" }) });
            }
        }
    ];
    if (type === 'image') {
        columns.splice(1, 0, {
            dataIndex: 'url',
            title: '图片',
            render: (value, record, index) => {
                return _jsx("img", { style: { width: 120, height: 70 }, src: getImg(value) });
            },
        });
    }
    else if (type === 'voice') {
        columns.splice(1, 0, {
            dataIndex: 'url',
            title: '音频',
            render: (value, record, index) => {
                return _jsxs("a", { href: getImg(value), download: true, style: { color: '#1677FF', cursor: 'pointer' }, children: [_jsx(DownloadOutlined, {}), record.media_id] });
            },
        });
    }
    else if (type === 'video') {
        columns.splice(1, 0, {
            dataIndex: 'url',
            title: '视频',
            render: (value, record, index) => {
                return _jsxs("a", { href: getImg(value), download: true, style: { color: '#1677FF', cursor: 'pointer' }, children: [_jsx(DownloadOutlined, {}), record.media_id] });
            },
        });
    }
    else {
    }
    return (_jsxs("div", { className: Style.container, children: [_jsx("div", { className: Style.title, children: type === 'news' ? '选择图文' : type === 'image' ? '选择图片' : type === 'voice' ? '插入音频' : '选择视频' }), type !== 'news' && _jsxs("div", { className: Style.upload, children: [_jsx("div", { className: Style.help, children: type === 'image' ? '大小不超过10M' : type === 'voice' ? '由于版本兼容的原因,你暂时只可以选择60秒内的音频发送' : null }), type === 'video' ? (_jsx(Button, { onClick: () => {
                            setUpsertOpen(true);
                        }, children: "\u4E0A\u4F20\u89C6\u9891" })) : (_jsx(Upload, { maxCount: 1, showUploadList: false, customRequest: ({ file }) => {
                            uploadFile(file);
                        }, children: _jsxs(Button, { children: ["\u4E0A\u4F20", type === 'image' ? '图片' : '音频'] }) })), _jsx(Modal, { open: upsertOpen, onCancel: () => setUpsertOpen(false), title: '上传视频', footer: _jsxs(Space, { children: [_jsx(Button, { type: 'primary', onClick: () => {
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
                                        if (upload(video, descriptionData)) {
                                            setUpsertOpen(false);
                                        }
                                    }, children: "\u4E0A\u4F20" }), _jsx(Button, { onClick: () => setUpsertOpen(false), children: "\u53D6\u6D88" })] }), children: _jsxs("div", { children: [_jsx(Form.Item, { label: _jsx("div", { className: Style.label, children: "\u6807\u9898" }), required: true, labelAlign: 'right', labelCol: { span: 4 }, children: _jsx(Input, { showCount: true, maxLength: 20, value: title, onChange: (val) => setTitle(val.target.value) }) }), _jsx(Form.Item, { label: _jsx("div", { className: Style.label, children: "\u89C6\u9891\u4ECB\u7ECD" }), required: true, children: _jsx(TextArea, { showCount: true, maxLength: 300, value: introduction, autoSize: { minRows: 5 }, onChange: (val) => setIntroduction(val.target.value) }) }), _jsx(Form.Item, { label: _jsx("div", { className: Style.label, children: "\u4E0A\u4F20\u89C6\u9891" }), required: true, children: _jsx(Upload, { customRequest: ({ file }) => uploadVideo(file), maxCount: 1, onChange: fileChange, fileList: fileList, children: _jsxs(Button, { children: [_jsx(DownloadOutlined, {}), fileList.length > 0 ? '重新' : '', "\u4E0A\u4F20"] }) }) })] }) })] }), _jsx("div", { className: Style.list, children: _jsx(Table, { rowKey: type === 'news' ? 'article_id' : 'media_id', dataSource: materials, columns: type === 'news' ? newsColumns : columns, pagination: {
                        total: total,
                        pageSize: 10,
                        current: currentPage,
                        onChange: (page, pageSize) => {
                            setCurrentPage(page);
                            if (type === 'news') {
                                getArticleList(page);
                            }
                            else {
                                getMaterialList(page);
                            }
                        },
                    }, rowSelection: {
                        type: 'radio',
                        onSelect: (record) => {
                            if (type === 'news') {
                                getMenuContent(record);
                            }
                            else {
                                getMenuContent(record);
                            }
                        },
                    } }) })] }));
}
