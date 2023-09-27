"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const icons_1 = require("@ant-design/icons");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const editor_for_react_1 = require("@wangeditor/editor-for-react");
function Render(props) {
    const { type, content } = props.data;
    const [sendMsg, setSendMsg] = (0, react_1.useState)('');
    const editorConfig = {
        readOnly: true,
        autoFocus: true,
        scroll: false,
    };
    (0, react_1.useEffect)(() => {
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
    return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.phone, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.topBar, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.time, children: "1:21" }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.icons, children: (0, jsx_runtime_1.jsx)(icons_1.WifiOutlined, { style: { fontSize: 14 } }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.actionBar, children: [(0, jsx_runtime_1.jsx)(icons_1.LeftOutlined, { style: { fontSize: 20 } }), (0, jsx_runtime_1.jsx)(icons_1.UserOutlined, { style: { fontSize: 20 } })] }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.page, children: type === 'text' && sendMsg ? ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.msg, children: (0, jsx_runtime_1.jsx)(editor_for_react_1.Editor, { defaultConfig: editorConfig, value: sendMsg, mode: "default", className: web_module_less_1.default.editor }) })) : type === 'image' && sendMsg ? ((0, jsx_runtime_1.jsx)("img", { src: sendMsg, className: web_module_less_1.default.img })) : type === 'video' && sendMsg ? ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.msg, children: (0, jsx_runtime_1.jsx)("a", { style: { color: '#1677ff' }, href: sendMsg, download: true, children: "\u4E0B\u8F7D\u89C6\u9891\u7D20\u6750" }) })) : type === 'video' && sendMsg ? ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.msg, children: (0, jsx_runtime_1.jsx)("a", { style: { color: '#1677ff' }, href: sendMsg, download: true, children: "\u4E0B\u8F7D\u97F3\u9891\u7D20\u6750" }) })) : null }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.bottomBar, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.keyBoard }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.buttonList, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.button, children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonName, children: "\u83DC\u5355\u540D\u79F0" }) }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.button, children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonName, children: "\u83DC\u5355\u540D\u79F0" }) }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.button, children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonName, children: "\u83DC\u5355\u540D\u79F0" }) })] })] })] }) }));
}
exports.default = Render;
