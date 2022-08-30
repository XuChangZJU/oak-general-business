import React from 'react';
import {
    Button,
} from 'tdesign-react';

import Style from './web.module.less';



export default function render(this: any) {
    const { t, features } = this;
    const {
        editor,
        title,
        author,
        abstract,
        content,
    } = this.state;

    return (
        <div className={Style.container}>
            <div className={Style.content}>
                <div className={Style.editorContainer}>
                    <div className={Style.titleContainer}>
                        <span className={Style.title}>{title}</span>
                    </div>
                    <div className={Style.authorContainer}>
                        <span className={Style.author}>{author}</span>
                    </div>
                    <div id="article-content"></div>
                </div>
            </div>
        </div>
    );
}
