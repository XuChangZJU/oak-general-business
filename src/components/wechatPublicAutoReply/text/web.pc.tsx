import React, { useState, useEffect } from 'react';
import { EntityDict } from "../../../oak-app-domain";
import { WebComponentProps } from 'oak-frontend-base';
import { Modal, Button, Table, Space, Upload, Form, Input } from 'antd';
import Style from './web.module.less';
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import {
    IDomEditor,
    IEditorConfig,
    IToolbarConfig,
    DomEditor,
    Boot,
} from '@wangeditor/editor';

const toolbarConfig: Partial<IToolbarConfig> = {
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

export default function Render(
    props: WebComponentProps<
        EntityDict,
        keyof EntityDict,
        false,
        {
            text: string;
            editor: IDomEditor;
            getContent: (content: string) => void;
        },
        {
            setEditor: (editor: IDomEditor | null) => void;
            setHtml: (html: string) => void;
        }
    >
) {
    const { text, editor, getContent } = props.data;
    const { setEditor, setHtml } = props.methods;
    return (
        <div className={Style.container}>
            <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode="default"
                style={{
                    borderBottom: '1px solid #ccc',
                }}
            />
            <Editor
                defaultConfig={{
                    placeholder: '请输入内容...',
                }}
                value={text}
                onCreated={setEditor}
                onChange={(editorDom: any) => {
                    const html = editorDom.getHtml();
                    if(html && html !== '<p><br></p>') {
                        getContent(html);
                    }
                }}
                mode="default"
                style={{
                    minHeight: 200,
                    maxHeight: 400,
                    overflowY: 'auto',
                }}
            />
        </div >
    );
}

