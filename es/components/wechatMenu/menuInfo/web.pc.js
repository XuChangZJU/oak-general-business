import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Modal, Button, Space, Radio, Form, Input } from 'antd';
const { Search } = Input;
const { confirm } = Modal;
import Style from './web.module.less';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { EyeOutlined, CheckOutlined, DeleteOutlined, DownloadOutlined, SwapOutlined, } from '@ant-design/icons';
import ShowNews from '../showNews';
import WechatMaterialLibrary from '../../wechatMaterialLibrary';
import SelectMiniprogram from '../selectMiniprogram';
import SelectArticle from '../selectArticle';
import TextClick from '../textClick';
export default function Render(props) {
    const { data, methods } = props;
    const { config, menuIndex, selectedBtn, selectedSubBtn, currentIndex, changeIsPreview, getOpen, menuType, applicationId, menuId } = data;
    const { setConfig, confirmName, confirmSubName, editMenuName, deleteMenuContent, getMaterialImgAndVoice, getMaterialVideo, decideMenuContentLabel, getArticle, createMenu, deleteConditionalMenu, confirmUrl, } = methods;
    const [msgType, setMsgType] = useState('sendMsg');
    const [errorInfo, setErrorInfo] = useState('');
    const [errorUrlInfo, setErrorUrlInfo] = useState('');
    const [onlyOne, setOnlyOne] = useState(true);
    const [menuName, setMenuName] = useState('');
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('');
    const [menuContent, setMenuContent] = useState(null);
    const [decidedMenuContent, setDecidedMenuContent] = useState(null);
    const [url, setUrl] = useState('');
    const getUrl = (url) => {
        setUrl(url);
    };
    const getMenuContent = (menuContent) => {
        setMenuContent(menuContent);
        if (msgType === 'miniprogram') {
            if (selectedBtn > 0) {
                setConfig(selectedBtn - 1, { type: 'miniprogram', url: menuContent.url, pagepath: menuContent.pagepath, appid: menuContent.appid });
            }
            else {
                setConfig(selectedSubBtn - 1, { type: 'miniprogram', url: menuContent.url, pagepath: menuContent.pagepath, appid: menuContent.appid }, currentIndex);
            }
        }
    };
    const changeOpen = (open) => {
        setOpen(open);
        getOpen(open);
    };
    const getDecidedMenuContent = async (menuContent) => {
        setDecidedMenuContent(menuContent);
        if (selectedBtn > 0) {
            setConfig(selectedBtn - 1, { type: 'click', key: await generateNewIdAsync(), subType: 'text', content: menuContent });
        }
        else {
            setConfig(selectedSubBtn - 1, { type: 'click', key: await generateNewIdAsync(), subType: 'text', content: menuContent }, currentIndex);
        }
    };
    useEffect(() => {
        console.log(config);
        if (config && config.button && config.button[0] && onlyOne) {
            setMenuName(config.button[0].name);
            setOnlyOne(false);
        }
    }, [config]);
    useEffect(() => {
        const fetchData = async (id, type) => {
            if (type === 'news') {
                setDecidedMenuContent({ content: { news_item: await getArticle(id) } });
            }
            if (type === 'video') {
                setDecidedMenuContent(await getMaterialVideo(id));
            }
            if (type === 'image' || type === 'voice') {
                setDecidedMenuContent({ url: await getMaterialImgAndVoice(type, id), media_id: id });
            }
        };
        if (selectedBtn !== 0) {
            const menuConfig = config.button[selectedBtn - 1];
            setMenuName(menuConfig?.name);
            if (menuConfig?.type === 'media_id') {
                setUrl('');
                setMsgType('sendMsg');
                setType(menuConfig.subType);
                if (menuConfig.subType === 'video') {
                    fetchData(menuConfig.media_id, 'video');
                }
                else {
                    fetchData(menuConfig.media_id, menuConfig.subType);
                }
            }
            else if (menuConfig?.type === 'click') {
                setUrl('');
                setMsgType('sendMsg');
                setType('text');
                setDecidedMenuContent(menuConfig.content);
            }
            else if (menuConfig?.type === 'article_id') {
                setUrl('');
                setMsgType('sendMsg');
                setType('news');
                fetchData(menuConfig.article_id, 'news');
            }
            else if (menuConfig?.type === 'miniprogram') {
                setUrl('');
                setMsgType('miniprogram');
                setMenuContent({
                    appid: menuConfig.appid,
                    url: menuConfig.url,
                    pagepath: menuConfig.pagepath
                });
            }
            else if (menuConfig?.type === 'view') {
                setMsgType('view');
                setUrl(menuConfig.url);
            }
            else {
                setUrl('');
                setType('');
                setMsgType('sendMsg');
                setDecidedMenuContent(null);
                setMenuContent(null);
            }
        }
    }, [selectedBtn]);
    useEffect(() => {
        const fetchData = async (id, type) => {
            if (type === 'news') {
                setDecidedMenuContent({ content: { news_item: await getArticle(id) } });
            }
            if (type === 'video') {
                setDecidedMenuContent(await getMaterialVideo(id));
            }
            if (type === 'image' || type === 'voice') {
                setDecidedMenuContent({ url: await getMaterialImgAndVoice(type, id), media_id: id });
            }
        };
        if (selectedSubBtn !== 0) {
            const subMenuConfig = config.button[currentIndex]?.sub_button[selectedSubBtn - 1];
            setMenuName(subMenuConfig?.name);
            if (subMenuConfig?.type === 'media_id') {
                setUrl('');
                setMsgType('sendMsg');
                setType(subMenuConfig.subType);
                if (subMenuConfig.subType === 'video') {
                    fetchData(subMenuConfig.media_id, 'video');
                }
                else {
                    fetchData(subMenuConfig.media_id, subMenuConfig.subType);
                }
            }
            else if (subMenuConfig?.type === 'click') {
                setUrl('');
                setMsgType('sendMsg');
                setType('text');
                setDecidedMenuContent(subMenuConfig.content);
            }
            else if (subMenuConfig?.type === 'article_id') {
                setUrl('');
                setMsgType('sendMsg');
                setType('news');
                fetchData(subMenuConfig?.article_id, 'news');
            }
            else if (subMenuConfig?.type === 'miniprogram') {
                setUrl('');
                setMsgType('miniprogram');
                setMenuContent({
                    appid: subMenuConfig.appid,
                    url: subMenuConfig.url,
                    pagepath: subMenuConfig.pagepath
                });
            }
            else if (subMenuConfig?.type === 'view') {
                setMsgType('view');
                setUrl(subMenuConfig.url);
            }
            else {
                setType('');
                setUrl('');
                setMsgType('sendMsg');
                setDecidedMenuContent(null);
                setMenuContent(null);
            }
        }
    }, [selectedSubBtn]);
    useEffect(() => {
        if (url && url.length > 0) {
            if (selectedBtn > 0) {
                setConfig(selectedBtn - 1, { type: 'view', url });
            }
            else {
                setConfig(selectedSubBtn - 1, { type: 'view', url }, currentIndex);
            }
        }
    }, [url]);
    return (_jsx("div", { className: Style.container, children: config && config.button && config.button.length > 0 && (selectedBtn !== 0 || selectedSubBtn !== 0) ? (_jsxs("div", { className: Style.upsertMenu, children: [_jsxs("div", { className: Style.content, children: [_jsx("div", { className: Style.title, children: selectedSubBtn !== 0 ? '子菜单信息' : '菜单信息' }), _jsx("div", { style: { marginBottom: 32 }, children: _jsx(Form.Item, { label: _jsx("div", { className: Style.label, children: "\u540D\u79F0" }), colon: false, help: _jsxs("div", { children: [_jsx("div", { children: `仅支持中英文和数字，字数不超过${selectedSubBtn !== 0 ? 8 : 4}个汉字或${selectedSubBtn !== 0 ? 16 : 8}个字母。` }), errorInfo && _jsx("div", { style: { color: '#fa5151' }, children: errorInfo })] }), children: _jsx(Input, { style: { width: 340 }, onChange: (val) => {
                                        setMenuName(val.target.value);
                                        if (selectedSubBtn !== 0) {
                                            setErrorInfo(confirmSubName(val.target.value));
                                            if (!confirmSubName(val.target.value)) {
                                                editMenuName(selectedSubBtn - 1, val.target.value, currentIndex);
                                            }
                                        }
                                        else {
                                            setErrorInfo(confirmName(val.target.value));
                                            if (!confirmName(val.target.value)) {
                                                editMenuName(selectedBtn - 1, val.target.value);
                                            }
                                        }
                                    }, status: errorInfo ? 'error' : '', value: menuName }) }) }), config.button[currentIndex]?.sub_button?.length === 0 && selectedSubBtn === 0
                            || selectedSubBtn > 0 ? (_jsxs(_Fragment, { children: [_jsx(Form.Item, { colon: false, label: _jsx("div", { className: Style.label, children: "\u6D88\u606F\u7C7B\u578B" }), children: _jsxs(Radio.Group, { value: msgType, onChange: (val) => setMsgType(val.target.value), children: [_jsx(Radio, { value: 'sendMsg', children: "\u53D1\u9001\u6D88\u606F" }), _jsx(Radio, { value: 'view', children: "\u8DF3\u8F6C\u9875\u9762" }), _jsx(Radio, { value: 'miniprogram', children: "\u8DF3\u8F6C\u5C0F\u7A0B\u5E8F" })] }) }), msgType === 'sendMsg' ? (_jsxs(_Fragment, { children: [_jsxs(Form.Item, { colon: false, label: _jsx("div", { className: Style.label, children: decideMenuContentLabel(decidedMenuContent, type) }), children: [!decidedMenuContent && type !== 'text' ? _jsxs("div", { className: Style.menuContent, children: [_jsx("div", { className: Style.item, onClick: () => {
                                                                setOpen(true);
                                                                getOpen(true);
                                                                setType('news');
                                                            }, children: "\u56FE\u6587\u4FE1\u606F" }), _jsx("div", { className: Style.item, onClick: () => {
                                                                setType('text');
                                                            }, children: "\u6587\u5B57" }), _jsx("div", { className: Style.item, onClick: () => {
                                                                setOpen(true);
                                                                getOpen(true);
                                                                setType('image');
                                                            }, children: "\u56FE\u7247" }), _jsx("div", { className: Style.item, onClick: () => {
                                                                setOpen(true);
                                                                getOpen(true);
                                                                setType('voice');
                                                            }, children: "\u97F3\u9891" }), _jsx("div", { className: Style.item, onClick: () => {
                                                                setOpen(true);
                                                                getOpen(true);
                                                                setType('video');
                                                            }, children: "\u89C6\u9891" })] })
                                                    : type === 'image' ?
                                                        _jsxs("div", { className: Style.coverImage, children: [_jsx("img", { className: Style.img, src: decidedMenuContent.url }), _jsxs("div", { className: Style.buttonGroup, children: [_jsx("div", { className: Style.buttonItem, onClick: () => {
                                                                                const modal = confirm({
                                                                                    title: '确定删除该图片吗？',
                                                                                    content: '删除后不可恢复',
                                                                                    okText: '确定',
                                                                                    cancelText: '取消',
                                                                                    onOk: async (e) => {
                                                                                        modal.destroy();
                                                                                        setDecidedMenuContent(null);
                                                                                        if (selectedBtn > 0) {
                                                                                            deleteMenuContent(selectedBtn - 1);
                                                                                        }
                                                                                        else {
                                                                                            deleteMenuContent(selectedSubBtn - 1, currentIndex);
                                                                                        }
                                                                                        ;
                                                                                    },
                                                                                });
                                                                            }, children: _jsx(DeleteOutlined, {}) }), _jsx("div", { className: Style.buttonItem, onClick: () => {
                                                                                setOpen(true);
                                                                                getOpen(true);
                                                                            }, children: _jsx(SwapOutlined, {}) })] })] })
                                                        : type === 'voice' ?
                                                            _jsxs("div", { className: Style.fileCover, children: [_jsxs("a", { href: decidedMenuContent.url, download: true, style: { color: '#1677FF', cursor: 'pointer' }, children: [_jsx(DownloadOutlined, {}), decidedMenuContent.media_id] }), _jsxs("div", { className: Style.buttonGroup, children: [_jsx("div", { className: Style.buttonItem, onClick: () => {
                                                                                    const modal = confirm({
                                                                                        title: '确定删除该音频吗？',
                                                                                        content: '删除后不可恢复',
                                                                                        okText: '确定',
                                                                                        cancelText: '取消',
                                                                                        onOk: async (e) => {
                                                                                            modal.destroy();
                                                                                            setDecidedMenuContent(null);
                                                                                            if (selectedBtn > 0) {
                                                                                                deleteMenuContent(selectedBtn - 1);
                                                                                            }
                                                                                            else {
                                                                                                deleteMenuContent(selectedSubBtn - 1, currentIndex);
                                                                                            }
                                                                                            ;
                                                                                        },
                                                                                    });
                                                                                }, children: _jsx(DeleteOutlined, {}) }), _jsx("div", { className: Style.buttonItem, onClick: () => {
                                                                                    setOpen(true);
                                                                                    getOpen(true);
                                                                                }, children: _jsx(SwapOutlined, {}) })] })] })
                                                            : type === 'video' ?
                                                                _jsxs("div", { className: Style.fileCover, children: [_jsxs("a", { href: decidedMenuContent.url, download: true, style: { color: '#1677FF', cursor: 'pointer' }, children: [_jsx(DownloadOutlined, {}), decidedMenuContent.media_id] }), _jsxs("div", { className: Style.buttonGroup, children: [_jsx("div", { className: Style.buttonItem, onClick: () => {
                                                                                        const modal = confirm({
                                                                                            title: '确定删除该视频吗？',
                                                                                            content: '删除后不可恢复',
                                                                                            okText: '确定',
                                                                                            cancelText: '取消',
                                                                                            onOk: async (e) => {
                                                                                                modal.destroy();
                                                                                                setDecidedMenuContent(null);
                                                                                                if (selectedBtn > 0) {
                                                                                                    deleteMenuContent(selectedBtn - 1);
                                                                                                }
                                                                                                else {
                                                                                                    deleteMenuContent(selectedSubBtn - 1, currentIndex);
                                                                                                }
                                                                                                ;
                                                                                            },
                                                                                        });
                                                                                    }, children: _jsx(DeleteOutlined, {}) }), _jsx("div", { className: Style.buttonItem, onClick: () => {
                                                                                        setOpen(true);
                                                                                        getOpen(true);
                                                                                    }, children: _jsx(SwapOutlined, {}) })] })] })
                                                                : type === 'news' ?
                                                                    _jsxs("div", { className: Style.news, children: [_jsx(ShowNews, { news: decidedMenuContent?.content?.news_item, oakAutoUnmount: false }), _jsxs("div", { className: Style.buttonGroup, style: { height: '100%' }, children: [_jsx("div", { className: Style.buttonItem, onClick: () => {
                                                                                            const modal = confirm({
                                                                                                title: '确定删除该图文信息吗？',
                                                                                                content: '删除后不可恢复',
                                                                                                okText: '确定',
                                                                                                cancelText: '取消',
                                                                                                onOk: async (e) => {
                                                                                                    modal.destroy();
                                                                                                    setDecidedMenuContent(null);
                                                                                                    if (selectedBtn > 0) {
                                                                                                        deleteMenuContent(selectedBtn - 1);
                                                                                                    }
                                                                                                    else {
                                                                                                        deleteMenuContent(selectedSubBtn - 1, currentIndex);
                                                                                                    }
                                                                                                    ;
                                                                                                },
                                                                                            });
                                                                                        }, children: _jsx(DeleteOutlined, {}) }), _jsx("div", { className: Style.buttonItem, onClick: () => {
                                                                                            setOpen(true);
                                                                                            getOpen(true);
                                                                                        }, children: _jsx(SwapOutlined, {}) })] })] })
                                                                    : null, type === 'text' &&
                                                    _jsxs("div", { className: Style.editor, children: [_jsx(TextClick, { oakAutoUnmount: true, value: decidedMenuContent, getDecidedMenuContent: getDecidedMenuContent }), _jsx("div", { className: Style.buttonGroup, style: { height: 36, position: 'absolute', right: -50 }, children: _jsx("div", { className: Style.buttonItem, onClick: () => {
                                                                        const modal = confirm({
                                                                            title: '确定删除该文字吗？',
                                                                            content: '删除后不可恢复',
                                                                            okText: '确定',
                                                                            cancelText: '取消',
                                                                            onOk: async (e) => {
                                                                                modal.destroy();
                                                                                setType('news');
                                                                                setDecidedMenuContent(null);
                                                                                if (selectedBtn > 0) {
                                                                                    deleteMenuContent(selectedBtn - 1);
                                                                                }
                                                                                else {
                                                                                    deleteMenuContent(selectedSubBtn - 1, currentIndex);
                                                                                }
                                                                            },
                                                                        });
                                                                    }, children: _jsx(DeleteOutlined, {}) }) })] })] }), _jsx(Modal, { open: open, footer: _jsxs(Space, { children: [_jsx(Button, { type: 'primary', disabled: !menuContent, onClick: () => {
                                                            setOpen(false);
                                                            getOpen(false);
                                                            setDecidedMenuContent(menuContent);
                                                            if (selectedBtn > 0) {
                                                                if (type !== 'news') {
                                                                    if (type === 'image') {
                                                                        setConfig(selectedBtn - 1, { type: 'media_id', media_id: menuContent.media_id, subType: 'image' });
                                                                    }
                                                                    if (type === 'voice') {
                                                                        setConfig(selectedBtn - 1, { type: 'media_id', media_id: menuContent.media_id, subType: 'voice' });
                                                                    }
                                                                    if (type === 'video') {
                                                                        setConfig(selectedBtn - 1, { type: 'media_id', media_id: menuContent.media_id, subType: 'video' });
                                                                    }
                                                                }
                                                                else {
                                                                    setConfig(selectedBtn - 1, { type: 'article_id', article_id: menuContent.article_id });
                                                                }
                                                            }
                                                            else {
                                                                if (type !== 'news') {
                                                                    if (type === 'image') {
                                                                        setConfig(selectedSubBtn - 1, { type: 'media_id', media_id: menuContent.media_id, subType: 'image' }, currentIndex);
                                                                    }
                                                                    if (type === 'voice') {
                                                                        setConfig(selectedSubBtn - 1, { type: 'media_id', media_id: menuContent.media_id, subType: 'voice' }, currentIndex);
                                                                    }
                                                                    if (type === 'video') {
                                                                        setConfig(selectedSubBtn - 1, { type: 'media_id', media_id: menuContent.media_id, subType: 'video' }, currentIndex);
                                                                    }
                                                                }
                                                                else {
                                                                    setConfig(selectedSubBtn - 1, { type: 'article_id', article_id: menuContent.article_id }, currentIndex);
                                                                }
                                                            }
                                                        }, children: "\u786E\u5B9A" }), _jsx(Button, { type: 'default', onClick: () => {
                                                            setOpen(false);
                                                            getOpen(false);
                                                            setMenuContent(null);
                                                        }, children: "\u53D6\u6D88" })] }), onCancel: () => {
                                                setOpen(false);
                                                getOpen(false);
                                                setMenuContent(null);
                                            }, destroyOnClose: true, width: 960, children: _jsx(WechatMaterialLibrary, { oakAutoUnmount: true, type: type, getMenuContent: getMenuContent, applicationId: applicationId }) })] })) : msgType === 'view' ? (_jsxs(Form.Item, { colon: false, label: _jsx("div", { className: Style.label, children: "\u7F51\u9875\u94FE\u63A5" }), help: _jsx(_Fragment, { children: errorUrlInfo && _jsx("div", { style: { color: '#fa5151' }, children: errorUrlInfo }) }), children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column' }, children: [_jsx(Input, { placeholder: '\u516C\u4F17\u53F7\u94FE\u63A5:\u8BF7\u4EE5https://\u6216http://\u5F00\u5934', style: { width: 340 }, value: url, onChange: (val) => {
                                                        setUrl(val.target.value);
                                                        setErrorUrlInfo(confirmUrl(val.target.value));
                                                    }, status: errorUrlInfo ? 'error' : '' }), _jsx("a", { style: { padding: '10px 0' }, onClick: () => { setOpen(true); getOpen(true); }, children: "\u9009\u62E9\u56FE\u6587\u94FE\u63A5" })] }), _jsx(Modal, { open: open, footer: null, title: '选择图文链接', onCancel: () => { setOpen(false); getOpen(false); }, width: 600, children: _jsx(SelectArticle, { oakAutoUnmount: true, changeOpen: changeOpen, getUrl: getUrl, applicationId: applicationId }) })] })) : (_jsxs(Form.Item, { colon: false, label: _jsx("div", { className: Style.label, children: "\u5C0F\u7A0B\u5E8F" }), children: [_jsx(Button, { onClick: () => {
                                                setOpen(true);
                                                getOpen(true);
                                            }, children: "\u9009\u62E9\u5C0F\u7A0B\u5E8F" }), menuContent && menuContent.appid && _jsx("div", { children: menuContent.appid }), _jsx(Modal, { title: '添加小程序', open: open, footer: null, onCancel: () => { setOpen(false); getOpen(false); }, children: _jsx(SelectMiniprogram, { oakAutoUnmount: true, getMenuContent: getMenuContent, changeOpen: changeOpen }) })] }))] })) : (null)] }), _jsx("div", { className: Style.actionBar, children: _jsxs(Space, { children: [_jsxs(Button, { onClick: () => changeIsPreview(true), children: [_jsx(EyeOutlined, {}), "\u9884\u89C8"] }), _jsxs(Button, { type: 'primary', onClick: async () => {
                                    createMenu(errorInfo, errorUrlInfo);
                                }, children: [_jsx(CheckOutlined, {}), "\u53D1\u5E03"] }), menuType === 'conditional' && config && menuId && _jsxs(Button, { type: 'primary', danger: true, onClick: () => {
                                    const modal = confirm({
                                        title: '确定删除该个性化菜单吗？',
                                        content: '删除后不可恢复',
                                        okText: '确定',
                                        cancelText: '取消',
                                        onOk: async (e) => {
                                            await deleteConditionalMenu();
                                            modal.destroy();
                                        },
                                    });
                                }, children: [_jsx(DeleteOutlined, {}), "\u5220\u9664"] })] }) })] })) : (_jsxs("div", { className: Style.empty, children: [_jsx("div", { className: Style.content, children: "\u4F60\u672A\u6DFB\u52A0\u81EA\u5B9A\u4E49\u83DC\u5355\uFF0C\u70B9\u51FB\u5DE6\u4FA7\u6DFB\u52A0\u83DC\u5355\u4E3A\u516C\u4F17\u53F7\u521B\u5EFA\u83DC\u5355\u680F\u3002" }), _jsx("div", { className: Style.actionBar, children: _jsxs(Space, { children: [_jsxs(Button, { onClick: () => changeIsPreview(true), children: [_jsx(EyeOutlined, {}), "\u9884\u89C8"] }), _jsxs(Button, { type: 'primary', onClick: async () => {
                                    createMenu(errorInfo, errorUrlInfo);
                                }, children: [_jsx(CheckOutlined, {}), "\u53D1\u5E03"] })] }) })] })) }));
}
