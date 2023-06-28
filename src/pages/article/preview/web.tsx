import React from 'react';
import Style from './web.module.less';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import { Editor } from "@wangeditor/editor-for-react";
import { IEditorConfig } from "@wangeditor/editor";
import { useState, useEffect } from 'react';


export default function Render(
    props: WebComponentProps<
        EntityDict,
        'article',
        false,
        {
            id: string;
            name: string;
            editor: any;
            title?: string;
            // author?: string;
            // abstract?: string;
            content?: string;
            html?: string;
            origin?: string;
        },
        {}
    >
) {
    const { id, name, editor, title, content } = props.data;
    const editorConfig: Partial<IEditorConfig> = {
      readOnly: true,
      autoFocus: true,
      scroll: false,
    };
    const [value, setValue] = useState('');
    useEffect(() => {
      if(content) {
        setValue(content)
      }
    },[content]);
    return (
        <div className={Style.container}>
            <div className={Style.content}>
                <div className={Style.editorContainer}>
                    <div className={Style.titleContainer}>
                        <span className={Style.title}>{title}</span>
                    </div>
                    {/* <div className={Style.authorContainer}>
                        <span className={Style.author}>{author}</span>
                    </div> */}
                    <div id="article-content" style={{width:"100%"}}>
                    <Editor
                    defaultConfig={editorConfig}
                    value={value}
                    mode="default"
                    style={{
                      width: '100%'
                    }}
                  />
                    </div>
                </div>
            </div>
        </div>
    );
}
