import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { useState, useRef, useEffect } from 'react';
import { Alert, Card, Button, Row, Col, Space, Affix, Input, Form, Modal } from 'antd';
const { confirm } = Modal;
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor } from "@wangeditor/editor-for-react";
import { IEditorConfig } from "@wangeditor/editor";
import OakGallery from '../../extraFile/gallery';
import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
import Style from './web.module.less';


export default function Render(
    props: WebComponentProps<
        EntityDict,
        'article',
        false,
        {
            oakId: string;
            content: string;
            name: string;
            width: string;
        },
        {
            gotoArticleEdit: (articleId: string) => void;
            onRemoveArticle: (id: string) => void;
            copy: (id: string) => void;
        }
    >
) {
    const { methods: method, data } = props;
    const { content, name, oakId, width } = props.data;
    const { t, onRemoveArticle, gotoArticleEdit, copy } = method;
    const editorConfig: Partial<IEditorConfig> = {
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
    return (
        <div className={Style.container}>
            <Row>
                <Col xs={24} sm={16}>
                    <Editor
                        defaultConfig={editorConfig}
                        value={value}
                        mode="default"
                        style={{
                            width: width === 'xs' ? '100vw' : 750,
                        }}
                    />
                </Col>
            </Row>
        </div>
    );
}