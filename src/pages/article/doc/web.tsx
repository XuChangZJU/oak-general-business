import {
    Form,
    Tree,
    Row,
    Col,
    Space,
    Button,
    Menu,
    Modal,
    Image,
    Empty,
    Layout,
    Drawer,
    Divider,
} from 'antd';
const { confirm } = Modal;
import type { MenuProps  } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames";
import Style from "./web.module.less";
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
import useFeatures from "../../../hooks/useFeatures";
import PageHeader from "../../../components/common/pageHeader";
import { Editor } from "@wangeditor/editor-for-react";
import { IEditorConfig } from "@wangeditor/editor";
import ArticleUpsert from "../../../components/article/detail3";
const { SubMenu } = Menu;
const { Sider, Content } = Layout;
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

interface DataNode {
    label: string;
    title: string;
    key: string;
    isArticle?: boolean;
    children?: DataNode[];
}
export default function render(
    props: WebComponentProps<
        EntityDict,
        "articleMenu",
        true,
        {
            articleMenu: EntityDict["articleMenu"]["Schema"][];
            articles: EntityDict["article"]["Schema"][];
            treeData: DataNode[];
            content: string;
            arr: {
                id: string | undefined;
                name: string | undefined;
                parent: string | undefined;
                parentId: string | undefined;
                isArticle: boolean;
                isLeaf: boolean;
            }[];
            id: string;
            parentId: string;
            articleId: string;
            name: string;
            isArticle: boolean;
            logo: string;
            openKeys: string[];
            selectedKeys: string[];
            selectedArticleId: string;
            width: string
        },
        {
            gotoUpsert: (id?: string) => void;
            gotoUpsertById: (id: string) => void;
            gotoArticleUpsert: (articleId: string, selectedKeys?: string[]) => void;
            check: () => void;
            onRemoveArticleMenu: (id: string) => void;
            gotoEdit: (id?: string) => void;
            gotoEditByParentId: (parentId: string) => void;
            gotoArticleEdit: (articleId: string) => void;
            onRemoveArticle: (id: string) => void;
            gotoArticleEditByArticleMenuId: (articleMenuId: string) => void;
            getOpenKeys: (
                targetKey: string,
                treeData: DataNode[],
                openKeys: string[]
            ) => void;
        }
    >
) {
    const {
        arr,
        treeData,
        id,
        parentId,
        articleId,
        name,
        content,
        oakFullpath,
        isArticle,
        logo,
        openKeys,
        selectedKeys,
        selectedArticleId,
        width,
    } = props.data;
    const {
        t,
        gotoArticleUpsert,
        getOpenKeys,
    } = props.methods;
    const features = useFeatures();
    const [open, setOpen] = useState(false);

    const renderMenuItems = (data: any, callback?: () => void) => {
        return data?.map((menuItem: any) => {
            if (menuItem.children || menuItem.isLeaf) {
                return (
                    <Menu.SubMenu
                        icon={
                            menuItem.logo ? (
                                <Image
                                    height={26}
                                    width={26}
                                    src={menuItem.logo}
                                    preview={false}
                                />
                            ) : null
                        }
                        key={menuItem.key}
                        title={
                            <div style={{ marginLeft: 8 }}>
                                {menuItem.title}
                            </div>
                        }
                        onTitleClick={(e) => {
                            getOpenKeys(e.key, treeData, openKeys);
                        }}
                    >
                        {renderMenuItems(menuItem.children, callback)}
                    </Menu.SubMenu>
                );
            }
            return (
                <Menu.Item
                    key={menuItem.key}
                    onClick={(e) => {
                        gotoArticleUpsert(e.key, selectedKeys);
                        if (typeof callback === 'function') {
                            callback();
                        }
                      
                    }}
                >
                    {menuItem.label}
                </Menu.Item>
            );
        });
    };

    if (treeData?.length === 0) {
        return (
            <div className={Style.container}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
        );
    }

    if (width === 'xs') {
        return (
            <div className={Style.container}>
                <div className={Style.article_v}>
                    <div
                        className={Style.menuHeader}
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        <div>帮助文档</div>
                        {open ? (
                            <MenuFoldOutlined
                                style={{
                                    fontSize: 18,
                                }}
                            />
                        ) : (
                            <MenuUnfoldOutlined
                                style={{
                                    fontSize: 18,
                                }}
                            />
                        )}
                    </div>
                    <Divider style={{ margin: 0 }} />
                    <div className={Style.editor}>
                        {selectedArticleId?.length > 0 ? (
                            <ArticleUpsert
                                oakAutoUnmount={true}
                                oakId={selectedArticleId}
                                oakPath={`$article-detail2-${selectedArticleId}`}
                            />
                        ) : null}
                    </div>
                </div>
                <Drawer
                    className={Style.drawerPanel}
                    open={open}
                    onClose={() => {
                        setOpen(false);
                    }}
                    width={256}
                    placement="left"
                >
                    <Sider
                        theme="light"
                        width={256}
                        className={Style.siderPanel}
                    >
                        <Menu
                            openKeys={openKeys}
                            selectedKeys={selectedKeys}
                            style={{ width: 256 }}
                            mode="inline"
                        >
                            {renderMenuItems(treeData, () => {
                                setOpen(false);
                            })}
                        </Menu>
                    </Sider>
                </Drawer>
            </div>
        );
    }

    return (
        <div className={Style.container}>
            <div className={Style.article}>
                <div className={Style.menu}>
                    <Sider
                        theme="light"
                        width={275}
                        className={Style.siderPanel}
                    >
                        <Menu
                            openKeys={openKeys}
                            selectedKeys={selectedKeys}
                            style={{ width: 256 }}
                            mode="inline"
                        >
                            {renderMenuItems(treeData)}
                        </Menu>
                    </Sider>
                </div>
                <div
                    className={Style.editor}
                    style={{
                        marginLeft: 300,
                    }}
                >
                    {selectedArticleId?.length > 0 ? (
                        <ArticleUpsert
                            oakAutoUnmount={true}
                            oakId={selectedArticleId}
                            oakPath={`$article-detail2-${selectedArticleId}`}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
}
