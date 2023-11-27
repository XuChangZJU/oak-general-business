import React from 'react';
import Style from './web.module.less';
export default function render(props) {
    const { methods, data } = props;
    const { t } = methods;
    const { title, author, abstract, content } = data;
    return (<div className={Style.container}>
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
        </div>);
}
