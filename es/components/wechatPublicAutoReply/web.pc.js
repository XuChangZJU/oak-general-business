import React, { useEffect, useState } from 'react';
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
    return (<div className={Style.container}>
            <div className={Style.typeBar}>
                {types.map((ele) => (<div className={Style.item} style={type === ele.key ? { color: '#1677FF' } : {}} onClick={() => {
                changeType(ele.key);
            }}>
                            {ele.value}
                        </div>))}
            </div>
            {type !== 'text' ? (<div className={Style.media}>
                        {type === 'image' && replyContent.image ? (<div className={Style.imageMedia}>
                                    <div className={Style.imgCover}>
                                        <img src={replyContent.image}/>
                                    </div>
                                    <div className={Style.buttonGroup}>
                                        <Tooltip title={'编辑'} placement='right'>
                                            <div className={Style.buttonItem} onClick={() => {
                    setOpen(true);
                }}>
                                                <SwapOutlined />
                                            </div>
                                        </Tooltip>
                                        <Tooltip title={'删除'} placement='right'>
                                            <div className={Style.buttonItem} onClick={() => {
                    updateItem({
                        url: '',
                    }, id);
                    setReplyContent({ ...replyContent, image: '' });
                    setMediaUrl('');
                }}>
                                                <DeleteOutlined />
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div>) : type === 'video' && replyContent.video ? (<div className={Style.videoMedia}>
                                    <a href={replyContent.video} download={true} style={{ color: '#1677FF', cursor: 'pointer' }}><DownloadOutlined />下载视频素材</a>
                                    <div className={Style.buttonGroup}>
                                        <Tooltip title={'编辑'} placement='right'>
                                            <div className={Style.buttonItem} onClick={() => {
                    setOpen(true);
                }}>
                                                <SwapOutlined />
                                            </div>
                                        </Tooltip>
                                        <Tooltip title={'删除'} placement='right'>
                                            <div className={Style.buttonItem} onClick={() => {
                    updateItem({
                        url: '',
                    }, id);
                    setReplyContent({ ...replyContent, video: '' });
                    setMediaUrl('');
                }}>
                                                <DeleteOutlined />
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div>) : type === 'voice' && replyContent.voice ? (<div className={Style.voiceMedia}>
                                    <a href={replyContent.voice} download={true} style={{ color: '#1677FF', cursor: 'pointer' }}><DownloadOutlined />下载音频素材</a>
                                    <div className={Style.buttonGroup}>
                                        <Tooltip title={'编辑'} placement='right'>
                                            <div className={Style.buttonItem} onClick={() => {
                    setOpen(true);
                }}>
                                                <SwapOutlined />
                                            </div>
                                        </Tooltip>
                                        <Tooltip title={'删除'} placement='right'>
                                            <div className={Style.buttonItem} onClick={() => {
                    updateItem({
                        url: '',
                    }, id);
                    setReplyContent({ ...replyContent, voice: '' });
                    setMediaUrl('');
                }}>
                                                <DeleteOutlined />
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div>) : (<div className={Style.addMedia} onClick={() => {
                    setOpen(true);
                }}>
                                    <div className={Style.replyContent}>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <PlusOutlined style={{ fontSize: 36 }}/>
                                        </div>
                                        <div>从素材库中选择</div>
                                    </div>
                                </div>)}
                        <Modal open={open} footer={<Space>
                                    <Button type={'primary'} onClick={() => {
                    getContent(mediaUrl);
                    setOpen(false);
                }} disabled={mediaUrl ? false : true}>
                                        确定
                                    </Button>
                                    <Button type={'default'} onClick={() => {
                    setOpen(false);
                }}>
                                        取消
                                    </Button>
                                </Space>} onCancel={() => {
                setOpen(false);
            }} destroyOnClose={true} width={960}>
                            <WechatMaterialLibrary oakAutoUnmount={true} type={type} applicationId={applicationId} getMenuContent={getMedia}/>
                        </Modal>
                    </div>) : (<div className={Style.editor}>
                        <Text oakAutoUnmount={true} getContent={getContent} text={replyContent.text}/>
                    </div>)}
            <Modal title='关注公众号自动回复预览' open={previewOpen} onCancel={() => setPreviewOpen(false)} footer={null} width={424}>
                <Preview oakAutoUnmount={true} type={type} content={replyContent}/>
            </Modal>
            <Space style={{ display: 'flex', justifyContent: 'center', margin: 20 }}>
                <Button onClick={() => {
            setPreviewOpen(true);
        }}>
                    预览
                </Button>
                <Button type="primary" onClick={() => {
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
        }}>
                    保存
                </Button>
            </Space>
        </div>);
}
