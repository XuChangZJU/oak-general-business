import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Style from './web.module.less';
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
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
export default function Render(props) {
    const { text, editor, getContent } = props.data;
    const { setEditor, setHtml } = props.methods;
    return (_jsxs("div", { className: Style.container, children: [_jsx(Toolbar, { editor: editor, defaultConfig: toolbarConfig, mode: "default", style: {
                    borderBottom: '1px solid #ccc',
                } }), _jsx(Editor, { defaultConfig: {
                    placeholder: '请输入内容...',
                }, value: text, onCreated: setEditor, onChange: (editorDom) => {
                    const html = editorDom.getHtml();
                    if (html && html !== '<p><br></p>') {
                        getContent(html);
                    }
                }, mode: "default", style: {
                    minHeight: 200,
                    maxHeight: 400,
                    overflowY: 'auto',
                } })] }));
}
