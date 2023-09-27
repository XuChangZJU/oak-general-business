"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const editor_for_react_1 = require("@wangeditor/editor-for-react");
const showNews_1 = tslib_1.__importDefault(require("../showNews"));
function Render(props) {
    const { button } = props.data;
    const { getMaterialImgAndVoice, getArticle, getMaterialVideo, setMessage } = props.methods;
    const [sendMsg, setSendMsg] = (0, react_1.useState)([]);
    const editorConfig = {
        readOnly: true,
        autoFocus: true,
        scroll: false,
    };
    const onClick = ({ key }) => {
        const index = Math.floor(Number(key) / 10);
        const index2 = Number(key) % 10;
        menuAction(button[index].sub_button[index2]);
    };
    const isValidUrl = (url) => {
        const urlPattern = /^(https?:\/\/)([\w-]+\.)+[a-z]{2,6}(\S*)$/;
        return urlPattern.test(url);
    };
    const menuAction = async (menu) => {
        if (menu.type === 'view' && menu.url) {
            if (isValidUrl(menu.url)) {
                window.open(menu.url);
            }
            else {
                setMessage({
                    type: 'warning',
                    content: 'URL无效'
                });
            }
            return;
        }
        if (menu.type === 'miniprogram' && menu.url) {
            setSendMsg([...sendMsg, { type: 'miniprogram', content: '不支持查看小程序，请前往微信公众号平台查看' }]);
            return;
        }
        if (menu.subType === 'text' && menu.content) {
            setSendMsg([...sendMsg, { type: 'text', content: menu.content }]);
            return;
        }
        if (menu.subType === 'image' && menu.media_id) {
            setSendMsg([...sendMsg, { type: 'image', content: await getMaterialImgAndVoice('image', menu.media_id) }]);
            return;
        }
        if (menu.type === 'article_id' && menu.article_id) {
            setSendMsg([...sendMsg, { type: 'article_id', content: await getArticle(menu.article_id) }]);
            return;
        }
        if (menu.subType === 'voice' && menu.media_id) {
            setSendMsg([...sendMsg, { type: 'voice', content: { url: await getMaterialImgAndVoice('voice', menu.media_id), media_id: menu.media_id } }]);
            return;
        }
        if (menu.subType === 'video' && menu.media_id) {
            setSendMsg([...sendMsg, { type: 'video', content: { url: await getMaterialVideo(menu.media_id).url, media_id: menu.media_id } }]);
            return;
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.phone, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.topBar, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.time, children: "1:21" }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.icons, children: (0, jsx_runtime_1.jsx)(icons_1.WifiOutlined, { style: { fontSize: 14 } }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.actionBar, children: [(0, jsx_runtime_1.jsx)(icons_1.LeftOutlined, { style: { fontSize: 20 } }), (0, jsx_runtime_1.jsx)(icons_1.UserOutlined, { style: { fontSize: 20 } })] }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.page, children: (sendMsg && sendMsg.length > 0) &&
                        sendMsg.map((ele) => {
                            if (ele.type === 'text') {
                                return (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.msg, children: (0, jsx_runtime_1.jsx)(editor_for_react_1.Editor, { defaultConfig: editorConfig, value: ele.content, mode: "default", className: web_module_less_1.default.editor }) });
                            }
                            else if (ele.type === 'image') {
                                return (0, jsx_runtime_1.jsx)("img", { src: ele.content, className: web_module_less_1.default.img });
                            }
                            else if (ele.type === 'article_id') {
                                return (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.news, children: (0, jsx_runtime_1.jsx)(showNews_1.default, { news: ele.content }) });
                            }
                            else if (ele.type === 'voice') {
                                return (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.msg, children: (0, jsx_runtime_1.jsx)("a", { style: { color: '#1677ff' }, href: ele.content.url, download: true, children: ele.content.media_id }) });
                            }
                            else if (ele.type === 'video') {
                                return (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.msg, children: (0, jsx_runtime_1.jsx)("a", { style: { color: '#1677ff' }, href: ele.content.url, download: true, children: ele.content.media_id }) });
                            }
                            else if (ele.type === 'miniprogram') {
                                return (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.msg, children: ele.content });
                            }
                        }) }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.bottomBar, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.keyBoard }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonList, children: button?.map((ele, index) => {
                                if (ele.sub_button && ele.sub_button.length > 0) {
                                    const items = ele.sub_button.map((sub, index2) => {
                                        return {
                                            label: sub.name,
                                            key: `${index * 10 + index2}`,
                                        };
                                    });
                                    return (0, jsx_runtime_1.jsx)(antd_1.Dropdown, { arrow: false, menu: { items, onClick }, placement: 'top', children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.button, children: [(0, jsx_runtime_1.jsx)(icons_1.MenuOutlined, { style: { fontSize: 12, color: '#d0d0d0' } }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonName, style: { marginLeft: 5 }, children: ele.name })] }) });
                                }
                                else {
                                    return (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.button, onClick: () => {
                                            menuAction(ele);
                                        }, children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonName, children: ele.name }) });
                                }
                            }) })] })] }) }));
}
exports.default = Render;
