import React from 'react';
import {
    Button,
} from 'antd';

import Style from './web.module.less';

import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

export default function render(
    props: WebComponentProps<
        EntityDict,
        'article',
        false,
        {
            title?: string;
            author?: string;
            abstract?: string;
            content?: string;
            html?: string;
        },
        {}
    >
) {
    const { methods, data } = props;
    const { t } = methods;
    const { title, author, abstract, content } = data;

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
