import React from 'react';
import Style from './web.module.less';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';



export default function Render(
    props: WebComponentProps<
        EntityDict,
        'article',
        false,
        {
            editor: any;
            title?: string;
            author?: string;
            abstract?: string;
            content?: string;
            html?: string;
            origin?: string;
        },
        {}
    >
) {
    const { editor, title, author, abstract, content } = props.data;

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
