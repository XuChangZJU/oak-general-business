"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const { TextArea } = antd_1.Input;
const icons_1 = require("@ant-design/icons");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const showNews_1 = tslib_1.__importDefault(require("../wechatMenu/showNews"));
function Render(props) {
    const { type, materials, total, getMenuContent } = props.data;
    const { getMaterialList, setMessage, upload, getArticleList } = props.methods;
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const [upsertOpen, setUpsertOpen] = (0, react_1.useState)(false);
    const [title, setTitle] = (0, react_1.useState)('');
    const [introduction, setIntroduction] = (0, react_1.useState)('');
    const [fileList, setFileList] = (0, react_1.useState)([]);
    const [video, setVideo] = (0, react_1.useState)(new FormData);
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
            const formData = new FormData();
            formData.append('media', file);
            console.log(file);
            upload(formData);
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
            const formData = new FormData();
            formData.append('media', file);
            setVideo(formData);
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
    (0, react_1.useEffect)(() => {
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
                return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm') });
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
                return ((0, jsx_runtime_1.jsx)("div", { children: record.content.news_item.map((ele) => ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("img", { style: { width: 100 }, src: ele.coverUrl }) }))) }));
            }
        },
        {
            dataIndex: 'title',
            title: '图文消息标题',
            render: (value, record, index) => {
                return ((0, jsx_runtime_1.jsx)("div", { children: record.content.news_item.map((ele) => ((0, jsx_runtime_1.jsx)("div", { children: ele.title }))) }));
            }
        },
        {
            // dataIndex: 'author',
            title: '作者',
            render: (value, record, index) => {
                return ((0, jsx_runtime_1.jsx)("div", { children: record.content.news_item.map((ele) => ((0, jsx_runtime_1.jsx)("div", { children: ele.author }))) }));
            }
        },
        {
            dataIndex: 'digest',
            title: '图文信息摘要',
            render: (value, record, index) => {
                return ((0, jsx_runtime_1.jsx)("div", { children: record.content.news_item.map((ele) => ((0, jsx_runtime_1.jsx)("div", { children: ele.digest }))) }));
            }
        },
        {
            dataIndex: 'update_time',
            title: '更新时间',
            render: (value, record, index) => {
                return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm') });
            }
        },
        {
            dataIndex: 'op',
            title: '操作',
            render: (value, record, index) => {
                return (0, jsx_runtime_1.jsx)(antd_1.Popover, { content: (0, jsx_runtime_1.jsx)("div", { style: { padding: 12 }, children: (0, jsx_runtime_1.jsx)(showNews_1.default, { oakAutoUnmount: true, news: record.content.news_item }) }), children: (0, jsx_runtime_1.jsx)("div", { style: { cursor: 'pointer', color: '#1677ff' }, children: "\u9884\u89C8" }) });
            }
        }
    ];
    if (type === 'image') {
        columns.splice(1, 0, {
            dataIndex: 'url',
            title: '图片',
            render: (value, record, index) => {
                return (0, jsx_runtime_1.jsx)("img", { style: { width: 120, height: 70 }, src: value });
            },
        });
    }
    else if (type === 'voice') {
        columns.splice(1, 0, {
            dataIndex: 'url',
            title: '音频',
            render: (value, record, index) => {
                return (0, jsx_runtime_1.jsxs)("a", { href: value, download: true, style: { color: '#1677FF', cursor: 'pointer' }, children: [(0, jsx_runtime_1.jsx)(icons_1.DownloadOutlined, {}), record.media_id] });
            },
        });
    }
    else if (type === 'video') {
        columns.splice(1, 0, {
            dataIndex: 'url',
            title: '视频',
            render: (value, record, index) => {
                return (0, jsx_runtime_1.jsxs)("a", { href: value, download: true, style: { color: '#1677FF', cursor: 'pointer' }, children: [(0, jsx_runtime_1.jsx)(icons_1.DownloadOutlined, {}), record.media_id] });
            },
        });
    }
    else {
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.title, children: type === 'news' ? '选择图文' : type === 'image' ? '选择图片' : type === 'voice' ? '插入音频' : '选择视频' }), type !== 'news' && (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.upload, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.help, children: type === 'image' ? '大小不超过10M' : type === 'voice' ? '由于版本兼容的原因,你暂时只可以选择60秒内的音频发送' : null }), type === 'video' ? ((0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => {
                            setUpsertOpen(true);
                        }, children: "\u4E0A\u4F20\u89C6\u9891" })) : ((0, jsx_runtime_1.jsx)(antd_1.Upload, { maxCount: 1, showUploadList: false, customRequest: ({ file }) => {
                            uploadFile(file);
                        }, children: (0, jsx_runtime_1.jsxs)(antd_1.Button, { children: ["\u4E0A\u4F20", type === 'image' ? '图片' : '音频'] }) })), (0, jsx_runtime_1.jsx)(antd_1.Modal, { open: upsertOpen, onCancel: () => setUpsertOpen(false), title: '上传视频', footer: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'primary', onClick: () => {
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
                                    }, children: "\u4E0A\u4F20" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => setUpsertOpen(false), children: "\u53D6\u6D88" })] }), children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.label, children: "\u6807\u9898" }), required: true, labelAlign: 'right', labelCol: { span: 4 }, children: (0, jsx_runtime_1.jsx)(antd_1.Input, { showCount: true, maxLength: 20, value: title, onChange: (val) => setTitle(val.target.value) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.label, children: "\u89C6\u9891\u4ECB\u7ECD" }), required: true, children: (0, jsx_runtime_1.jsx)(TextArea, { showCount: true, maxLength: 300, value: introduction, autoSize: { minRows: 5 }, onChange: (val) => setIntroduction(val.target.value) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.label, children: "\u4E0A\u4F20\u89C6\u9891" }), required: true, children: (0, jsx_runtime_1.jsx)(antd_1.Upload, { customRequest: ({ file }) => uploadVideo(file), maxCount: 1, onChange: fileChange, fileList: fileList, children: (0, jsx_runtime_1.jsxs)(antd_1.Button, { children: [(0, jsx_runtime_1.jsx)(icons_1.DownloadOutlined, {}), fileList.length > 0 ? '重新' : '', "\u4E0A\u4F20"] }) }) })] }) })] }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.list, children: (0, jsx_runtime_1.jsx)(antd_1.Table, { rowKey: type === 'news' ? 'article_id' : 'media_id', dataSource: materials, columns: type === 'news' ? newsColumns : columns, pagination: {
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
exports.default = Render;
