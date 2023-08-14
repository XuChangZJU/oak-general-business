
import { useState, useEffect } from 'react';
import { Row, Col, Modal } from 'antd';
const { confirm } = Modal;
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor } from "@wangeditor/editor-for-react";
import { IEditorConfig } from "@wangeditor/editor";
import { EntityDict } from '../../../oak-app-domain';
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
            editor: any;
        },
        {
        }
    >
) {
    const { methods: method, data } = props;
    const { content, oakId, width } = props.data;
    const { t } = method;
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
                    {
                        content && (
                            <Editor
                                defaultConfig={editorConfig}
                                value={content ? content : value}
                                mode="default"
                                style={{
                                    width: width === 'xs' ? '100vw' : '100%',
                                }}
                            />
                        )
                    }

                </Col>
            </Row>
        </div>
    );
}