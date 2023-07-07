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
import { EyeOutlined, CopyOutlined } from '@ant-design/icons';
import Style from './web.module.less';
import copy from 'copy-to-clipboard';


export default function Render(
    props: WebComponentProps<
        EntityDict,
        'article',
        false,
        {
            oakId: string;
            content: string;
            name: string;
        },
        {}
    >
) {
    const { methods, data } = props;
    const { content, name, oakId } = props.data;
    const { t } = methods;
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
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Space>
                    <Button
                        onClick={() => {
                            const url = `${window.location.host}/article/detail?oakId=${oakId}`;
                            copy(url);
                            methods.setMessage({
                                content: '复制链接成功',
                                type: 'success',
                            });
                        }}
                    >
                        <CopyOutlined />
                        复制链接
                    </Button>
                </Space>
            </div>
            <Form colon labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                <Form.Item>
                    <>
                        <Editor
                            defaultConfig={editorConfig}
                            value={value}
                            mode="default"
                            style={{
                                width: 750,
                            }}
                        />
                    </>
                </Form.Item>
            </Form>
        </div>
    );
}