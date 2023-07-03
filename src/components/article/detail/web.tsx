import { useState, useRef, useEffect } from 'react';
import { Button, Space, Form, Modal } from 'antd';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor } from "@wangeditor/editor-for-react";
import { IEditorConfig } from "@wangeditor/editor";
import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
import Style from './web.module.less';
import { EyeOutlined, CopyOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';

const editorConfig: Partial<IEditorConfig> = {
    readOnly: true,
    autoFocus: true,
    scroll: false,
};

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
        {
            gotoArticleEdit: (articleId: string) => void;
            onRemoveArticle: () => void;
            gotoPreview: (
                content: string,
                name: string,
                articleId: string
            ) => void;
        }
    >
) {
    const { methods, data } = props;
    const { content, oakId, name } = data;
    const { t, onRemoveArticle, gotoArticleEdit, gotoPreview } = methods;


    return (
        <div className={Style.container}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                        <CopyOutlined/>复制链接
                    </Button>
                    <Button
                        onClick={() => {
                            gotoPreview(content, name, oakId);
                        }}
                    >
                        <EyeOutlined />
                        查看
                    </Button>
                </Space>
            </div>
            <Form colon labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                <>
                    <Form.Item>
                        <>
                            {content ? (
                                <Editor
                                    defaultConfig={editorConfig}
                                    value={content}
                                    mode="default"
                                    style={{
                                        width: 750,
                                    }}
                                />
                            ) : null}
                        </>
                    </Form.Item>
                </>

                <Form.Item wrapperCol={{ offset: 4 }}>
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => {
                                gotoArticleEdit(oakId);
                            }}
                        >
                            编辑
                        </Button>
                        <Button
                            type="link"
                            onClick={() => {
                                const modal = Modal.confirm({
                                    title: '确定删除该文章吗？',
                                    content: '删除后不可恢复',
                                    okText: '确定',
                                    cancelText: '取消',
                                    onOk: (e) => {
                                        onRemoveArticle();
                                        modal!.destroy();
                                    },
                                });
                            }}
                        >
                            删除
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}