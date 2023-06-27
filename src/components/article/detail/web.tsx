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
           articleId: string;
           content: string;
        },
        {   
            gotoArticleEdit: (articleId:string) => void;
            onRemoveArticle: (id:string) => void;
        }
    >
) {
    const { methods: method, data } = props;
    const { content, articleId } = props.data;
    const {
        t,
        onRemoveArticle,
        gotoArticleEdit,
    } = method;
    const editorConfig: Partial<IEditorConfig> = {
      readOnly: true,
      autoFocus: true,
      scroll: false,
    };

    return (
      <div className={Style.rightContainer}>
      <Row>
        <Col xs={24} sm={16}>
          <Form
            colon
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <>
              <Form.Item>
                <>
                  <Editor
                    defaultConfig={editorConfig}
                    value={content}
                    mode="default"
                    style={{
                      width: 750
                    }}
                  />
                </>
              </Form.Item>
            </>

            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    gotoArticleEdit(articleId);
                  }}
                >
                  编辑
                </Button>
                <Button
                  type="link"
                  onClick={() => {
                    const modal = confirm({
                      title: "确定删除该文章吗？",
                      content: "删除后不可恢复",
                      okText: "确定",
                      cancelText: "取消",
                      onOk: (e) => {
                        onRemoveArticle(articleId);
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
        </Col>
      </Row>
    </div>
    );
}