import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Style from './web.module.less';
import { Editor } from '@wangeditor/editor-for-react';
import { useState, useEffect } from 'react';
export default function Render(props) {
    const { id, name, editor, title, content } = props.data;
    const editorConfig = {
        readOnly: true,
        autoFocus: true,
        scroll: false,
    };
    const [value, setValue] = useState('');
    useEffect(() => {
        if (content) {
            setValue(content);
        }
    }, [content]);
    return (_jsx("div", { className: Style.container, children: _jsx("div", { className: Style.content, children: _jsxs("div", { className: Style.editorContainer, children: [_jsx("div", { className: Style.titleContainer, children: _jsx("span", { className: Style.title, children: title }) }), _jsx("div", { id: "article-content", style: { width: '100%' }, children: _jsx(Editor, { defaultConfig: editorConfig, value: value, mode: "default", style: {
                                width: '100%',
                            } }) })] }) }) }));
}
