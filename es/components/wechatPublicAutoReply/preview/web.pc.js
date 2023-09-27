import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { WifiOutlined, LeftOutlined, UserOutlined } from '@ant-design/icons';
import Style from './web.module.less';
import { Editor } from '@wangeditor/editor-for-react';
export default function Render(props) {
    const { type, content } = props.data;
    const [sendMsg, setSendMsg] = useState('');
    const editorConfig = {
        readOnly: true,
        autoFocus: true,
        scroll: false,
    };
    useEffect(() => {
        if (type === 'text' && content.text) {
            setSendMsg(content.text);
        }
        ;
        if (type === 'image' && content.image) {
            setSendMsg(content.image);
        }
        ;
        if (type === 'video' && content.video) {
            setSendMsg(content.video);
        }
        ;
        if (type === 'voice' && content.voice) {
            setSendMsg(content.voice);
        }
        ;
    }, [content, type]);
    return (_jsx("div", { className: Style.container, children: _jsxs("div", { className: Style.phone, children: [_jsxs("div", { className: Style.topBar, children: [_jsx("div", { className: Style.time, children: "1:21" }), _jsx("div", { className: Style.icons, children: _jsx(WifiOutlined, { style: { fontSize: 14 } }) })] }), _jsxs("div", { className: Style.actionBar, children: [_jsx(LeftOutlined, { style: { fontSize: 20 } }), _jsx(UserOutlined, { style: { fontSize: 20 } })] }), _jsx("div", { className: Style.page, children: type === 'text' && sendMsg ? (_jsx("div", { className: Style.msg, children: _jsx(Editor, { defaultConfig: editorConfig, value: sendMsg, mode: "default", className: Style.editor }) })) : type === 'image' && sendMsg ? (_jsx("img", { src: sendMsg, className: Style.img })) : type === 'video' && sendMsg ? (_jsx("div", { className: Style.msg, children: _jsx("a", { style: { color: '#1677ff' }, href: sendMsg, download: true, children: "\u4E0B\u8F7D\u89C6\u9891\u7D20\u6750" }) })) : type === 'video' && sendMsg ? (_jsx("div", { className: Style.msg, children: _jsx("a", { style: { color: '#1677ff' }, href: sendMsg, download: true, children: "\u4E0B\u8F7D\u97F3\u9891\u7D20\u6750" }) })) : null }), _jsxs("div", { className: Style.bottomBar, children: [_jsx("div", { className: Style.keyBoard }), _jsxs("div", { className: Style.buttonList, children: [_jsx("div", { className: Style.button, children: _jsx("div", { className: Style.buttonName, children: "\u83DC\u5355\u540D\u79F0" }) }), _jsx("div", { className: Style.button, children: _jsx("div", { className: Style.buttonName, children: "\u83DC\u5355\u540D\u79F0" }) }), _jsx("div", { className: Style.button, children: _jsx("div", { className: Style.buttonName, children: "\u83DC\u5355\u540D\u79F0" }) })] })] })] }) }));
}
