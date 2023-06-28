import React from "react";
import { Button, Space, Form, Tooltip, Row, Col, Modal, Image } from 'antd';
import Style from "./web.module.less";
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
import classNames from "classnames";

export default function render(
    props: WebComponentProps<
        EntityDict,
        'articleMenu',
        false,
        {
            oakId: string;
            name: string;
            parentId: string;
            parentName: string;
            isArticle: boolean;
            isChildren: boolean;
            logo: string;
            onRemoveArticleMenu: (id: string) => void;
        },
        {
            goUpsert: (id?: string) => void;
            gotoEditByParentId: (parentId: string) => void;
            gotoArticleEditByArticleMenuId: (articleMenuId: string) => void;
        }
    >
) {
    const { data, methods } = props;
    const {
        t,
        update,
        goUpsert,
        gotoEditByParentId,
        gotoArticleEditByArticleMenuId,
    } = methods;
    const {
        name,
        parentId,
        parentName,
        isArticle,
        logo,
        isChildren,
        oakId,
        onRemoveArticleMenu,
    } = data;

    return (
        <Form colon labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
            <>
                <Form.Item
                    label={'分类标题'}
                    name="name"
                    //  rules={[
                    //      {
                    //          required: true,
                    //          message: '文章分类名称必填',
                    //      },
                    //  ]}
                >
                    <>{`${name}`}</>
                </Form.Item>
                <Form.Item label="LOGO" name="extraFile$entity">
                    <>
                        {logo ? (
                            <Image src={logo} width={100} height={100} />
                        ) : (
                            '暂无图片'
                        )}
                    </>
                </Form.Item>
            </>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                }}
            >
                <Space>
                    <Button
                        type="primary"
                        onClick={() => {
                            goUpsert(oakId);
                        }}
                    >
                        编辑
                    </Button>
                    {!isArticle && (
                        <Button
                            onClick={() => {
                                gotoEditByParentId(oakId);
                            }}
                        >
                            添加子节点
                        </Button>
                    )}
                    {isArticle && (
                        <Button
                            onClick={() => {
                                gotoArticleEditByArticleMenuId(oakId);
                            }}
                        >
                            添加文章
                        </Button>
                    )}
                    <Button
                        type="link"
                        onClick={() => {
                            const modal = Modal.confirm({
                                title: '确定删除该文章分类吗？',
                                content: '删除后不可恢复',
                                okText: '确定',
                                cancelText: '取消',
                                onOk: (e) => {
                                    onRemoveArticleMenu(oakId);
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
    );
}
