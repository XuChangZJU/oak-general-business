"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
require("@wangeditor/editor/dist/css/style.css"); // 引入 css
const preview_1 = tslib_1.__importDefault(require("./preview"));
const wechatMaterialLibrary_1 = tslib_1.__importDefault(require("../wechatMaterialLibrary"));
const text_1 = tslib_1.__importDefault(require("./text"));
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
function Render(props) {
    const { id, content, type, applicationId } = props.data;
    const { t, save, changeType, updateItem, setMessage, getMaterialImgAndVoice, getMaterialVideo } = props.methods;
    const [open, setOpen] = (0, react_1.useState)(false);
    const [previewOpen, setPreviewOpen] = (0, react_1.useState)(false);
    const [replyContent, setReplyContent] = (0, react_1.useState)({ text: '', image: '', video: '', voice: '' });
    const [mediaUrl, setMediaUrl] = (0, react_1.useState)('');
    const [onlyOne, setOnlyOne] = (0, react_1.useState)(false);
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
    (0, react_1.useEffect)(() => {
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
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.typeBar, children: types.map((ele) => ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.item, style: type === ele.key ? { color: '#1677FF' } : {}, onClick: () => {
                        changeType(ele.key);
                    }, children: ele.value }))) }), type !== 'text' ? ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.media, children: [type === 'image' && replyContent.image ? ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.imageMedia, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.imgCover, children: (0, jsx_runtime_1.jsx)("img", { src: replyContent.image }) }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.buttonGroup, children: [(0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: '编辑', placement: 'right', children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                setOpen(true);
                                            }, children: (0, jsx_runtime_1.jsx)(icons_1.SwapOutlined, {}) }) }), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: '删除', placement: 'right', children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                updateItem({
                                                    url: '',
                                                }, id);
                                                setReplyContent({ ...replyContent, image: '' });
                                                setMediaUrl('');
                                            }, children: (0, jsx_runtime_1.jsx)(icons_1.DeleteOutlined, {}) }) })] })] })) : type === 'video' && replyContent.video ? ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.videoMedia, children: [(0, jsx_runtime_1.jsxs)("a", { href: replyContent.video, download: true, style: { color: '#1677FF', cursor: 'pointer' }, children: [(0, jsx_runtime_1.jsx)(icons_1.DownloadOutlined, {}), "\u4E0B\u8F7D\u89C6\u9891\u7D20\u6750"] }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.buttonGroup, children: [(0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: '编辑', placement: 'right', children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                setOpen(true);
                                            }, children: (0, jsx_runtime_1.jsx)(icons_1.SwapOutlined, {}) }) }), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: '删除', placement: 'right', children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                updateItem({
                                                    url: '',
                                                }, id);
                                                setReplyContent({ ...replyContent, video: '' });
                                                setMediaUrl('');
                                            }, children: (0, jsx_runtime_1.jsx)(icons_1.DeleteOutlined, {}) }) })] })] })) : type === 'voice' && replyContent.voice ? ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.voiceMedia, children: [(0, jsx_runtime_1.jsxs)("a", { href: replyContent.voice, download: true, style: { color: '#1677FF', cursor: 'pointer' }, children: [(0, jsx_runtime_1.jsx)(icons_1.DownloadOutlined, {}), "\u4E0B\u8F7D\u97F3\u9891\u7D20\u6750"] }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.buttonGroup, children: [(0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: '编辑', placement: 'right', children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                setOpen(true);
                                            }, children: (0, jsx_runtime_1.jsx)(icons_1.SwapOutlined, {}) }) }), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: '删除', placement: 'right', children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                updateItem({
                                                    url: '',
                                                }, id);
                                                setReplyContent({ ...replyContent, voice: '' });
                                                setMediaUrl('');
                                            }, children: (0, jsx_runtime_1.jsx)(icons_1.DeleteOutlined, {}) }) })] })] })) : ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.addMedia, onClick: () => {
                            setOpen(true);
                        }, children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.replyContent, children: [(0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, { style: { fontSize: 36 } }) }), (0, jsx_runtime_1.jsx)("div", { children: "\u4ECE\u7D20\u6750\u5E93\u4E2D\u9009\u62E9" })] }) })), (0, jsx_runtime_1.jsx)(antd_1.Modal, { open: open, footer: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'primary', onClick: () => {
                                        getContent(mediaUrl);
                                        setOpen(false);
                                    }, children: "\u786E\u5B9A" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'default', onClick: () => {
                                        setOpen(false);
                                    }, children: "\u53D6\u6D88" })] }), onCancel: () => {
                            setOpen(false);
                        }, destroyOnClose: true, width: 960, children: (0, jsx_runtime_1.jsx)(wechatMaterialLibrary_1.default, { oakAutoUnmount: true, type: type, applicationId: applicationId, getMenuContent: getMedia }) })] })) : ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.editor, children: (0, jsx_runtime_1.jsx)(text_1.default, { oakAutoUnmount: true, getContent: getContent, text: replyContent.text }) })), (0, jsx_runtime_1.jsx)(antd_1.Modal, { title: '\u5173\u6CE8\u516C\u4F17\u53F7\u81EA\u52A8\u56DE\u590D\u9884\u89C8', open: previewOpen, onCancel: () => setPreviewOpen(false), footer: null, width: 424, children: (0, jsx_runtime_1.jsx)(preview_1.default, { oakAutoUnmount: true, type: type, content: replyContent }) }), (0, jsx_runtime_1.jsxs)(antd_1.Space, { style: { display: 'flex', justifyContent: 'center', margin: 20 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => {
                            setPreviewOpen(true);
                        }, children: "\u9884\u89C8" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => {
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
exports.default = Render;
