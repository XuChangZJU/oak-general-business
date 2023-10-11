"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const { Search } = antd_1.Input;
const { confirm } = antd_1.Modal;
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const uuid_1 = require("oak-domain/lib/utils/uuid");
const icons_1 = require("@ant-design/icons");
const showNews_1 = tslib_1.__importDefault(require("../showNews"));
const wechatMaterialLibrary_1 = tslib_1.__importDefault(require("../../wechatMaterialLibrary"));
const selectMiniprogram_1 = tslib_1.__importDefault(require("../selectMiniprogram"));
const selectArticle_1 = tslib_1.__importDefault(require("../selectArticle"));
const textClick_1 = tslib_1.__importDefault(require("../textClick"));
function Render(props) {
    const { data, methods } = props;
    const { config, menuIndex, selectedBtn, selectedSubBtn, currentIndex, changeIsPreview, getOpen, menuType, applicationId, menuId, actions, wechatId, iState, } = data;
    const { setConfig, confirmName, confirmSubName, editMenuName, deleteMenuContent, getMaterialImgAndVoice, getMaterialVideo, decideMenuContentLabel, getArticle, createMenu, deleteConditionalMenu, confirmUrl, } = methods;
    const [msgType, setMsgType] = (0, react_1.useState)('sendMsg');
    const [errorInfo, setErrorInfo] = (0, react_1.useState)('');
    const [errorUrlInfo, setErrorUrlInfo] = (0, react_1.useState)('');
    const [onlyOne, setOnlyOne] = (0, react_1.useState)(true);
    const [menuName, setMenuName] = (0, react_1.useState)('');
    const [open, setOpen] = (0, react_1.useState)(false);
    const [type, setType] = (0, react_1.useState)('');
    const [menuContent, setMenuContent] = (0, react_1.useState)(null);
    const [decidedMenuContent, setDecidedMenuContent] = (0, react_1.useState)(null);
    const [url, setUrl] = (0, react_1.useState)('');
    const getUrl = (url) => {
        setUrl(url);
    };
    const getMenuContent = (menuContent) => {
        setMenuContent(menuContent);
        if (msgType === 'miniprogram') {
            if (selectedBtn > 0) {
                setConfig(selectedBtn - 1, {
                    type: 'miniprogram',
                    url: menuContent.url,
                    pagepath: menuContent.pagepath,
                    appid: menuContent.appid,
                });
            }
            else {
                setConfig(selectedSubBtn - 1, {
                    type: 'miniprogram',
                    url: menuContent.url,
                    pagepath: menuContent.pagepath,
                    appid: menuContent.appid,
                }, currentIndex);
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
            setConfig(selectedBtn - 1, {
                type: 'click',
                key: menuType === 'conditional' ? `${wechatId}$${await (0, uuid_1.generateNewIdAsync)()}` : await (0, uuid_1.generateNewIdAsync)(),
                subType: 'text',
                content: menuContent,
            });
        }
        else {
            setConfig(selectedSubBtn - 1, {
                type: 'click',
                key: menuType === 'conditional' ? `${wechatId}$${await (0, uuid_1.generateNewIdAsync)()}` : await (0, uuid_1.generateNewIdAsync)(),
                subType: 'text',
                content: menuContent,
            }, currentIndex);
        }
    };
    (0, react_1.useEffect)(() => {
        if (config && config.button && config.button[0] && onlyOne) {
            setMenuName(config.button[0].name);
            setOnlyOne(false);
        }
    }, [config]);
    (0, react_1.useEffect)(() => {
        const fetchData = async (id, type) => {
            if (type === 'news') {
                setDecidedMenuContent({
                    content: { news_item: await getArticle(id) },
                });
            }
            if (type === 'video') {
                setDecidedMenuContent(await getMaterialVideo(id));
            }
            if (type === 'image' || type === 'voice') {
                setDecidedMenuContent({
                    url: await getMaterialImgAndVoice(type, id),
                    media_id: id,
                });
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
                    pagepath: menuConfig.pagepath,
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
    (0, react_1.useEffect)(() => {
        const fetchData = async (id, type) => {
            if (type === 'news') {
                setDecidedMenuContent({
                    content: { news_item: await getArticle(id) },
                });
            }
            if (type === 'video') {
                setDecidedMenuContent(await getMaterialVideo(id));
            }
            if (type === 'image' || type === 'voice') {
                setDecidedMenuContent({
                    url: await getMaterialImgAndVoice(type, id),
                    media_id: id,
                });
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
                    pagepath: subMenuConfig.pagepath,
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
    (0, react_1.useEffect)(() => {
        if (url && url.length > 0) {
            if (selectedBtn > 0) {
                setConfig(selectedBtn - 1, { type: 'view', url });
            }
            else {
                setConfig(selectedSubBtn - 1, { type: 'view', url }, currentIndex);
            }
        }
    }, [url]);
    return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, style: iState === 'fail' ? { border: '1px solid #FF5557' } : {}, children: config &&
            config.button &&
            config.button.length > 0 &&
            (selectedBtn !== 0 || selectedSubBtn !== 0) ? ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.upsertMenu, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.content, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.title, children: selectedSubBtn !== 0 ? '子菜单信息' : '菜单信息' }), (0, jsx_runtime_1.jsx)("div", { style: { marginBottom: 32 }, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.label, children: "\u540D\u79F0" }), colon: false, help: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { children: `仅支持中英文和数字，字数不超过${selectedSubBtn !== 0 ? 8 : 4}个汉字或${selectedSubBtn !== 0 ? 16 : 8}个字母。` }), errorInfo && ((0, jsx_runtime_1.jsx)("div", { style: { color: '#fa5151' }, children: errorInfo }))] }), children: (0, jsx_runtime_1.jsx)(antd_1.Input, { style: { width: 340 }, onChange: (val) => {
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
                                    }, status: errorInfo ? 'error' : '', value: menuName }) }) }), (config.button[currentIndex]?.sub_button?.length ===
                            0 &&
                            selectedSubBtn === 0) ||
                            selectedSubBtn > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { colon: false, label: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.label, children: "\u6D88\u606F\u7C7B\u578B" }), children: (0, jsx_runtime_1.jsxs)(antd_1.Radio.Group, { value: msgType, onChange: (val) => setMsgType(val.target.value), children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 'sendMsg', children: "\u53D1\u9001\u6D88\u606F" }), (0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 'view', children: "\u8DF3\u8F6C\u9875\u9762" }), (0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 'miniprogram', children: "\u8DF3\u8F6C\u5C0F\u7A0B\u5E8F" })] }) }), msgType === 'sendMsg' ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Form.Item, { colon: false, label: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.label, children: decideMenuContentLabel(decidedMenuContent, type) }), children: [!decidedMenuContent &&
                                                    type !== 'text' ? ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.menuContent, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.item, onClick: () => {
                                                                setOpen(true);
                                                                getOpen(true);
                                                                setType('news');
                                                            }, children: "\u56FE\u6587\u4FE1\u606F" }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.item, onClick: () => {
                                                                setType('text');
                                                            }, children: "\u6587\u5B57" }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.item, onClick: () => {
                                                                setOpen(true);
                                                                getOpen(true);
                                                                setType('image');
                                                            }, children: "\u56FE\u7247" }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.item, onClick: () => {
                                                                setOpen(true);
                                                                getOpen(true);
                                                                setType('voice');
                                                            }, children: "\u97F3\u9891" }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.item, onClick: () => {
                                                                setOpen(true);
                                                                getOpen(true);
                                                                setType('video');
                                                            }, children: "\u89C6\u9891" })] })) : type === 'image' ? ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.coverImage, children: [(0, jsx_runtime_1.jsx)("img", { className: web_module_less_1.default.img, src: decidedMenuContent.url }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.buttonGroup, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                                        const modal = confirm({
                                                                            title: '确定删除该图片吗？',
                                                                            content: '删除后不可恢复',
                                                                            okText: '确定',
                                                                            cancelText: '取消',
                                                                            onOk: async (e) => {
                                                                                modal.destroy();
                                                                                setDecidedMenuContent(null);
                                                                                if (selectedBtn >
                                                                                    0) {
                                                                                    deleteMenuContent(selectedBtn -
                                                                                        1);
                                                                                }
                                                                                else {
                                                                                    deleteMenuContent(selectedSubBtn -
                                                                                        1, currentIndex);
                                                                                }
                                                                            },
                                                                        });
                                                                    }, children: (0, jsx_runtime_1.jsx)(icons_1.DeleteOutlined, {}) }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                                        setOpen(true);
                                                                        getOpen(true);
                                                                    }, children: (0, jsx_runtime_1.jsx)(icons_1.SwapOutlined, {}) })] })] })) : type === 'voice' ? ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.fileCover, children: [(0, jsx_runtime_1.jsxs)("a", { href: decidedMenuContent.url, download: true, style: {
                                                                color: '#1677FF',
                                                                cursor: 'pointer',
                                                            }, children: [(0, jsx_runtime_1.jsx)(icons_1.DownloadOutlined, {}), decidedMenuContent.media_id] }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.buttonGroup, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                                        const modal = confirm({
                                                                            title: '确定删除该音频吗？',
                                                                            content: '删除后不可恢复',
                                                                            okText: '确定',
                                                                            cancelText: '取消',
                                                                            onOk: async (e) => {
                                                                                modal.destroy();
                                                                                setDecidedMenuContent(null);
                                                                                if (selectedBtn >
                                                                                    0) {
                                                                                    deleteMenuContent(selectedBtn -
                                                                                        1);
                                                                                }
                                                                                else {
                                                                                    deleteMenuContent(selectedSubBtn -
                                                                                        1, currentIndex);
                                                                                }
                                                                            },
                                                                        });
                                                                    }, children: (0, jsx_runtime_1.jsx)(icons_1.DeleteOutlined, {}) }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                                        setOpen(true);
                                                                        getOpen(true);
                                                                    }, children: (0, jsx_runtime_1.jsx)(icons_1.SwapOutlined, {}) })] })] })) : type === 'video' ? ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.fileCover, children: [(0, jsx_runtime_1.jsxs)("a", { href: decidedMenuContent.url, download: true, style: {
                                                                color: '#1677FF',
                                                                cursor: 'pointer',
                                                            }, children: [(0, jsx_runtime_1.jsx)(icons_1.DownloadOutlined, {}), decidedMenuContent.media_id] }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.buttonGroup, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                                        const modal = confirm({
                                                                            title: '确定删除该视频吗？',
                                                                            content: '删除后不可恢复',
                                                                            okText: '确定',
                                                                            cancelText: '取消',
                                                                            onOk: async (e) => {
                                                                                modal.destroy();
                                                                                setDecidedMenuContent(null);
                                                                                if (selectedBtn >
                                                                                    0) {
                                                                                    deleteMenuContent(selectedBtn -
                                                                                        1);
                                                                                }
                                                                                else {
                                                                                    deleteMenuContent(selectedSubBtn -
                                                                                        1, currentIndex);
                                                                                }
                                                                            },
                                                                        });
                                                                    }, children: (0, jsx_runtime_1.jsx)(icons_1.DeleteOutlined, {}) }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                                        setOpen(true);
                                                                        getOpen(true);
                                                                    }, children: (0, jsx_runtime_1.jsx)(icons_1.SwapOutlined, {}) })] })] })) : type === 'news' ? ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.news, children: [(0, jsx_runtime_1.jsx)(showNews_1.default, { news: decidedMenuContent
                                                                ?.content
                                                                ?.news_item, oakAutoUnmount: false }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.buttonGroup, style: {
                                                                height: '100%',
                                                            }, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                                        const modal = confirm({
                                                                            title: '确定删除该图文信息吗？',
                                                                            content: '删除后不可恢复',
                                                                            okText: '确定',
                                                                            cancelText: '取消',
                                                                            onOk: async (e) => {
                                                                                modal.destroy();
                                                                                setDecidedMenuContent(null);
                                                                                if (selectedBtn >
                                                                                    0) {
                                                                                    deleteMenuContent(selectedBtn -
                                                                                        1);
                                                                                }
                                                                                else {
                                                                                    deleteMenuContent(selectedSubBtn -
                                                                                        1, currentIndex);
                                                                                }
                                                                            },
                                                                        });
                                                                    }, children: (0, jsx_runtime_1.jsx)(icons_1.DeleteOutlined, {}) }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                                        setOpen(true);
                                                                        getOpen(true);
                                                                    }, children: (0, jsx_runtime_1.jsx)(icons_1.SwapOutlined, {}) })] })] })) : null, type === 'text' && ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.editor, children: [(0, jsx_runtime_1.jsx)(textClick_1.default, { oakAutoUnmount: true, value: decidedMenuContent, getDecidedMenuContent: getDecidedMenuContent }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonGroup, style: {
                                                                height: 36,
                                                                position: 'absolute',
                                                                right: -50,
                                                            }, children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                                    const modal = confirm({
                                                                        title: '确定删除该文字吗？',
                                                                        content: '删除后不可恢复',
                                                                        okText: '确定',
                                                                        cancelText: '取消',
                                                                        onOk: async (e) => {
                                                                            modal.destroy();
                                                                            setType('news');
                                                                            setDecidedMenuContent(null);
                                                                            if (selectedBtn >
                                                                                0) {
                                                                                deleteMenuContent(selectedBtn -
                                                                                    1);
                                                                            }
                                                                            else {
                                                                                deleteMenuContent(selectedSubBtn -
                                                                                    1, currentIndex);
                                                                            }
                                                                        },
                                                                    });
                                                                }, children: (0, jsx_runtime_1.jsx)(icons_1.DeleteOutlined, {}) }) })] }))] }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { open: open, footer: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'primary', disabled: !menuContent, onClick: () => {
                                                            setOpen(false);
                                                            getOpen(false);
                                                            setDecidedMenuContent(menuContent);
                                                            if (selectedBtn > 0) {
                                                                if (type !==
                                                                    'news') {
                                                                    if (type ===
                                                                        'image') {
                                                                        setConfig(selectedBtn -
                                                                            1, {
                                                                            type: 'media_id',
                                                                            media_id: menuContent.media_id,
                                                                            subType: 'image',
                                                                        });
                                                                    }
                                                                    if (type ===
                                                                        'voice') {
                                                                        setConfig(selectedBtn -
                                                                            1, {
                                                                            type: 'media_id',
                                                                            media_id: menuContent.media_id,
                                                                            subType: 'voice',
                                                                        });
                                                                    }
                                                                    if (type ===
                                                                        'video') {
                                                                        setConfig(selectedBtn -
                                                                            1, {
                                                                            type: 'media_id',
                                                                            media_id: menuContent.media_id,
                                                                            subType: 'video',
                                                                        });
                                                                    }
                                                                }
                                                                else {
                                                                    setConfig(selectedBtn -
                                                                        1, {
                                                                        type: 'article_id',
                                                                        article_id: menuContent.article_id,
                                                                    });
                                                                }
                                                            }
                                                            else {
                                                                if (type !==
                                                                    'news') {
                                                                    if (type ===
                                                                        'image') {
                                                                        setConfig(selectedSubBtn -
                                                                            1, {
                                                                            type: 'media_id',
                                                                            media_id: menuContent.media_id,
                                                                            subType: 'image',
                                                                        }, currentIndex);
                                                                    }
                                                                    if (type ===
                                                                        'voice') {
                                                                        setConfig(selectedSubBtn -
                                                                            1, {
                                                                            type: 'media_id',
                                                                            media_id: menuContent.media_id,
                                                                            subType: 'voice',
                                                                        }, currentIndex);
                                                                    }
                                                                    if (type ===
                                                                        'video') {
                                                                        setConfig(selectedSubBtn -
                                                                            1, {
                                                                            type: 'media_id',
                                                                            media_id: menuContent.media_id,
                                                                            subType: 'video',
                                                                        }, currentIndex);
                                                                    }
                                                                }
                                                                else {
                                                                    setConfig(selectedSubBtn -
                                                                        1, {
                                                                        type: 'article_id',
                                                                        article_id: menuContent.article_id,
                                                                    }, currentIndex);
                                                                }
                                                            }
                                                        }, children: "\u786E\u5B9A" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'default', onClick: () => {
                                                            setOpen(false);
                                                            getOpen(false);
                                                            setMenuContent(null);
                                                        }, children: "\u53D6\u6D88" })] }), onCancel: () => {
                                                setOpen(false);
                                                getOpen(false);
                                                setMenuContent(null);
                                            }, destroyOnClose: true, width: 960, children: (0, jsx_runtime_1.jsx)(wechatMaterialLibrary_1.default, { oakAutoUnmount: true, type: type, getMenuContent: getMenuContent, applicationId: applicationId }) })] })) : msgType === 'view' ? ((0, jsx_runtime_1.jsxs)(antd_1.Form.Item, { colon: false, label: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.label, children: "\u7F51\u9875\u94FE\u63A5" }), help: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: errorUrlInfo && ((0, jsx_runtime_1.jsx)("div", { style: {
                                                color: '#fa5151',
                                            }, children: errorUrlInfo })) }), children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }, children: [(0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u516C\u4F17\u53F7\u94FE\u63A5:\u8BF7\u4EE5https://\u6216http://\u5F00\u5934", style: { width: 340 }, value: url, onChange: (val) => {
                                                        setUrl(val.target.value);
                                                        setErrorUrlInfo(confirmUrl(val.target.value));
                                                    }, status: errorUrlInfo ? 'error' : '' }), (0, jsx_runtime_1.jsx)("a", { style: { padding: '10px 0' }, onClick: () => {
                                                        setOpen(true);
                                                        getOpen(true);
                                                    }, children: "\u9009\u62E9\u56FE\u6587\u94FE\u63A5" })] }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { open: open, footer: null, title: '选择图文链接', onCancel: () => {
                                                setOpen(false);
                                                getOpen(false);
                                            }, width: 600, children: (0, jsx_runtime_1.jsx)(selectArticle_1.default, { oakAutoUnmount: true, changeOpen: changeOpen, getUrl: getUrl, applicationId: applicationId }) })] })) : ((0, jsx_runtime_1.jsxs)(antd_1.Form.Item, { colon: false, label: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.label, children: "\u5C0F\u7A0B\u5E8F" }), children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => {
                                                setOpen(true);
                                                getOpen(true);
                                            }, children: "\u9009\u62E9\u5C0F\u7A0B\u5E8F" }), menuContent && menuContent.appid && ((0, jsx_runtime_1.jsx)("div", { children: menuContent.appid })), (0, jsx_runtime_1.jsx)(antd_1.Modal, { title: '添加小程序', open: open, footer: null, onCancel: () => {
                                                setOpen(false);
                                                getOpen(false);
                                            }, children: (0, jsx_runtime_1.jsx)(selectMiniprogram_1.default, { oakAutoUnmount: true, getMenuContent: getMenuContent, changeOpen: changeOpen }) })] }))] })) : null] }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.actionBar, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Button, { onClick: () => changeIsPreview(true), children: [(0, jsx_runtime_1.jsx)(icons_1.EyeOutlined, {}), "\u9884\u89C8"] }), (0, jsx_runtime_1.jsxs)(antd_1.Button, { type: "primary", onClick: async () => {
                                    createMenu(errorInfo, errorUrlInfo);
                                }, children: [(0, jsx_runtime_1.jsx)(icons_1.CheckOutlined, {}), iState !== 'fail' ? '保存并发布' : '同步'] }), menuType === 'conditional' && config && menuId && ((0, jsx_runtime_1.jsxs)(antd_1.Button, { type: "primary", danger: true, onClick: () => {
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
                                }, children: [(0, jsx_runtime_1.jsx)(icons_1.DeleteOutlined, {}), "\u5220\u9664"] }))] }) })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.empty, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.content, children: "\u4F60\u672A\u6DFB\u52A0\u81EA\u5B9A\u4E49\u83DC\u5355\uFF0C\u70B9\u51FB\u5DE6\u4FA7\u6DFB\u52A0\u83DC\u5355\u4E3A\u516C\u4F17\u53F7\u521B\u5EFA\u83DC\u5355\u680F\u3002" }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.actionBar, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Button, { onClick: () => changeIsPreview(true), children: [(0, jsx_runtime_1.jsx)(icons_1.EyeOutlined, {}), "\u9884\u89C8"] }), (0, jsx_runtime_1.jsxs)(antd_1.Button, { type: "primary", onClick: async () => {
                                    createMenu(errorInfo, errorUrlInfo);
                                }, children: [(0, jsx_runtime_1.jsx)(icons_1.CheckOutlined, {}), "\u4FDD\u5B58\u5E76\u53D1\u5E03"] })] }) })] })) }));
}
exports.default = Render;
