import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Dropdown } from 'antd';
import { WifiOutlined, LeftOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import Style from './web.module.less';
import { Editor } from '@wangeditor/editor-for-react';
import ShowNews from '../showNews';
export default function Render(props) {
    const { button } = props.data;
    const { getMaterialImgAndVoice, getArticle, getMaterialVideo } = props.methods;
    const [sendMsg, setSendMsg] = useState([]);
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
    const menuAction = async (menu) => {
        if (menu.type === 'view' && menu.url) {
            window.open(menu.url);
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
    return (_jsx("div", { className: Style.container, children: _jsxs("div", { className: Style.phone, children: [_jsxs("div", { className: Style.topBar, children: [_jsx("div", { className: Style.time, children: "1:21" }), _jsx("div", { className: Style.icons, children: _jsx(WifiOutlined, { style: { fontSize: 14 } }) })] }), _jsxs("div", { className: Style.actionBar, children: [_jsx(LeftOutlined, { style: { fontSize: 20 } }), _jsx(UserOutlined, { style: { fontSize: 20 } })] }), _jsx("div", { className: Style.page, children: (sendMsg && sendMsg.length > 0) &&
                        sendMsg.map((ele) => {
                            if (ele.type === 'text') {
                                return _jsx("div", { className: Style.msg, children: _jsx(Editor, { defaultConfig: editorConfig, value: ele.content, mode: "default", className: Style.editor }) });
                            }
                            else if (ele.type === 'image') {
                                return _jsx("img", { src: ele.content, className: Style.img });
                            }
                            else if (ele.type === 'article_id') {
                                return _jsx("div", { className: Style.news, children: _jsx(ShowNews, { news: ele.content }) });
                            }
                            else if (ele.type === 'voice') {
                                return _jsx("div", { className: Style.msg, children: _jsx("a", { style: { color: '#1677ff' }, href: ele.content.url, download: true, children: ele.content.media_id }) });
                            }
                            else if (ele.type === 'video') {
                                return _jsx("div", { className: Style.msg, children: _jsx("a", { style: { color: '#1677ff' }, href: ele.content.url, download: true, children: ele.content.media_id }) });
                            }
                            else if (ele.type === 'miniprogram') {
                                return _jsx("div", { className: Style.msg, children: ele.content });
                            }
                        }) }), _jsxs("div", { className: Style.bottomBar, children: [_jsx("div", { className: Style.keyBoard }), _jsx("div", { className: Style.buttonList, children: button?.map((ele, index) => {
                                if (ele.sub_button && ele.sub_button.length > 0) {
                                    const items = ele.sub_button.map((sub, index2) => {
                                        return {
                                            label: sub.name,
                                            key: `${index * 10 + index2}`,
                                        };
                                    });
                                    return _jsx(Dropdown, { arrow: false, menu: { items, onClick }, placement: 'top', children: _jsxs("div", { className: Style.button, children: [_jsx(MenuOutlined, { style: { fontSize: 12, color: '#d0d0d0' } }), _jsx("div", { className: Style.buttonName, style: { marginLeft: 5 }, children: ele.name })] }) });
                                }
                                else {
                                    return _jsx("div", { className: Style.button, onClick: () => {
                                            menuAction(ele);
                                        }, children: _jsx("div", { className: Style.buttonName, children: ele.name }) });
                                }
                            }) })] })] }) }));
}
