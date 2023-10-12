import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Tooltip, Button, Space, Modal } from 'antd';
import { PlusOutlined, SwapOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import Style from './web.module.less';
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import Preview from './preview';
import WechatMaterialLibrary from '../wechatMaterialLibrary';
import Text from './text';
const toolbarConfig = {
    excludeKeys: [
        "blockquote",
        "fullScreen",
        "headerSelect",
        "|",
        "bold",
        "group-more-style",
        "bgColor",
        "bulletedList",
        "numberedList",
        "todo",
        "group-image",
        "group-video",
        "insertTable",
        "codeBlock",
    ],
}; // TS 语法
const types = [
    {
        key: 'text',
        value: '文本',
    },
    {
        key: 'image',
        value: '图片',
    },
    {
        key: 'video',
        value: '视频',
    },
    {
        key: 'voice',
        value: '音频',
    },
];
export default function Render(props) {
    const { id, content, type, applicationId } = props.data;
    const { t, save, changeType, updateItem, setMessage, getMaterialImgAndVoice, getMaterialVideo } = props.methods;
    const [open, setOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [replyContent, setReplyContent] = useState({ text: '', image: '', video: '', voice: '' });
    const [mediaUrl, setMediaUrl] = useState('');
    const [onlyOne, setOnlyOne] = useState(false);
    const getContent = async (value) => {
        let updateData = {};
        let contentKey = '';
        switch (type) {
            case 'text':
                updateData = { content: { text: value } };
                contentKey = 'text';
                setReplyContent({ ...replyContent, [contentKey]: value });
                break;
            case 'image':
            case 'voice':
                updateData = { content: { mediaId: value } };
                contentKey = type;
                setReplyContent({ ...replyContent, [contentKey]: await getMaterialImgAndVoice(type, value) });
                break;
            case 'video':
                const video = await getMaterialVideo(value);
                updateData = { content: { title: video.title, description: video.description, mediaId: value } };
                contentKey = 'video';
                setReplyContent({ ...replyContent, [contentKey]: video.url });
                break;
            default:
                break;
        }
        updateItem(updateData, id);
    };
    const getMedia = (media) => {
        setMediaUrl(media.media_id);
    };
    useEffect(() => {
        const fetchData = async (id, type) => {
            if (type === 'video') {
                const video = await getMaterialVideo(id);
                return video.url;
            }
            if (type === 'image' || type === 'voice') {
                const url = await getMaterialImgAndVoice(type, id);
                return url;
            }
        };
        if (onlyOne) {
            return;
        }
        else {
            let contentKey = '';
            if (type && type === 'text' && content && content.text) {
                contentKey = 'text';
                setReplyContent({ ...replyContent, [contentKey]: content.text });
                setOnlyOne(true);
            }
            ;
            if (type && type !== 'text' && type !== 'video' && content && content.mediaId) {
                switch (type) {
                    case 'image':
                    case 'voice':
                        contentKey = type;
                        break;
                    default:
                        break;
                }
                setReplyContent({ ...replyContent, [contentKey]: fetchData(content.mediaId, type) });
                setOnlyOne(true);
            }
            ;
            if (type && type === 'video' && content && content.mediaId) {
                contentKey = type;
                setReplyContent({ ...replyContent, [contentKey]: fetchData(content.mediaId, type) });
            }
        }
    }, [type, content]);
    return (_jsxs("div", { className: Style.container, children: [_jsx("div", { className: Style.typeBar, children: types.map((ele) => (_jsx("div", { className: Style.item, style: type === ele.key ? { color: '#1677FF' } : {}, onClick: () => {
                        changeType(ele.key);
                    }, children: ele.value }))) }), type !== 'text' ? (_jsxs("div", { className: Style.media, children: [type === 'image' && replyContent.image ? (_jsxs("div", { className: Style.imageMedia, children: [_jsx("div", { className: Style.imgCover, children: _jsx("img", { src: replyContent.image }) }), _jsxs("div", { className: Style.buttonGroup, children: [_jsx(Tooltip, { title: '编辑', placement: 'right', children: _jsx("div", { className: Style.buttonItem, onClick: () => {
                                                setOpen(true);
                                            }, children: _jsx(SwapOutlined, {}) }) }), _jsx(Tooltip, { title: '删除', placement: 'right', children: _jsx("div", { className: Style.buttonItem, onClick: () => {
                                                updateItem({
                                                    url: '',
                                                }, id);
                                                setReplyContent({ ...replyContent, image: '' });
                                                setMediaUrl('');
                                            }, children: _jsx(DeleteOutlined, {}) }) })] })] })) : type === 'video' && replyContent.video ? (_jsxs("div", { className: Style.videoMedia, children: [_jsxs("a", { href: replyContent.video, download: true, style: { color: '#1677FF', cursor: 'pointer' }, children: [_jsx(DownloadOutlined, {}), "\u4E0B\u8F7D\u89C6\u9891\u7D20\u6750"] }), _jsxs("div", { className: Style.buttonGroup, children: [_jsx(Tooltip, { title: '编辑', placement: 'right', children: _jsx("div", { className: Style.buttonItem, onClick: () => {
                                                setOpen(true);
                                            }, children: _jsx(SwapOutlined, {}) }) }), _jsx(Tooltip, { title: '删除', placement: 'right', children: _jsx("div", { className: Style.buttonItem, onClick: () => {
                                                updateItem({
                                                    url: '',
                                                }, id);
                                                setReplyContent({ ...replyContent, video: '' });
                                                setMediaUrl('');
                                            }, children: _jsx(DeleteOutlined, {}) }) })] })] })) : type === 'voice' && replyContent.voice ? (_jsxs("div", { className: Style.voiceMedia, children: [_jsxs("a", { href: replyContent.voice, download: true, style: { color: '#1677FF', cursor: 'pointer' }, children: [_jsx(DownloadOutlined, {}), "\u4E0B\u8F7D\u97F3\u9891\u7D20\u6750"] }), _jsxs("div", { className: Style.buttonGroup, children: [_jsx(Tooltip, { title: '编辑', placement: 'right', children: _jsx("div", { className: Style.buttonItem, onClick: () => {
                                                setOpen(true);
                                            }, children: _jsx(SwapOutlined, {}) }) }), _jsx(Tooltip, { title: '删除', placement: 'right', children: _jsx("div", { className: Style.buttonItem, onClick: () => {
                                                updateItem({
                                                    url: '',
                                                }, id);
                                                setReplyContent({ ...replyContent, voice: '' });
                                                setMediaUrl('');
                                            }, children: _jsx(DeleteOutlined, {}) }) })] })] })) : (_jsx("div", { className: Style.addMedia, onClick: () => {
                            setOpen(true);
                        }, children: _jsxs("div", { className: Style.replyContent, children: [_jsx("div", { style: { display: 'flex', justifyContent: 'center' }, children: _jsx(PlusOutlined, { style: { fontSize: 36 } }) }), _jsx("div", { children: "\u4ECE\u7D20\u6750\u5E93\u4E2D\u9009\u62E9" })] }) })), _jsx(Modal, { open: open, footer: _jsxs(Space, { children: [_jsx(Button, { type: 'primary', onClick: () => {
                                        getContent(mediaUrl);
                                        setOpen(false);
                                    }, disabled: mediaUrl ? false : true, children: "\u786E\u5B9A" }), _jsx(Button, { type: 'default', onClick: () => {
                                        setOpen(false);
                                    }, children: "\u53D6\u6D88" })] }), onCancel: () => {
                            setOpen(false);
                        }, destroyOnClose: true, width: 960, children: _jsx(WechatMaterialLibrary, { oakAutoUnmount: true, type: type, applicationId: applicationId, getMenuContent: getMedia }) })] })) : (_jsx("div", { className: Style.editor, children: _jsx(Text, { oakAutoUnmount: true, getContent: getContent, text: replyContent.text }) })), _jsx(Modal, { title: '\u5173\u6CE8\u516C\u4F17\u53F7\u81EA\u52A8\u56DE\u590D\u9884\u89C8', open: previewOpen, onCancel: () => setPreviewOpen(false), footer: null, width: 424, children: _jsx(Preview, { oakAutoUnmount: true, type: type, content: replyContent }) }), _jsxs(Space, { style: { display: 'flex', justifyContent: 'center', margin: 20 }, children: [_jsx(Button, { onClick: () => {
                            setPreviewOpen(true);
                        }, children: "\u9884\u89C8" }), _jsx(Button, { type: "primary", onClick: () => {
                            let updateData = {};
                            if ((replyContent.text && type === 'text') || (replyContent.image && type === 'image') || (replyContent.video && type === 'video') || (replyContent.voice && type === 'voice')) {
                                updateItem(updateData, id);
                                save();
                            }
                            else {
                                setMessage({
                                    type: 'warning',
                                    content: '回复内容不能为空'
                                });
                            }
                        }, children: "\u4FDD\u5B58" })] })] }));
}
