import React from 'react';
import Style from './web.module.less';
import { Editor } from "@wangeditor/editor-for-react";
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
    return (<div className={Style.container}>
            <div className={Style.content}>
                <div className={Style.editorContainer}>
                    <div className={Style.titleContainer}>
                        <span className={Style.title}>{name}</span>
                    </div>
                    <div id="article-content" style={{ width: "100%" }}>
                        <Editor defaultConfig={editorConfig} value={value} mode="default" style={{
            width: '100%'
        }}/>
                    </div>
                </div>
            </div>
        </div>);
}
