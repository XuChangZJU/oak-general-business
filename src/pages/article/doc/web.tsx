import {
    Menu,
    Image,
    Empty,
    Layout,
    Drawer,
    Divider,
    Breadcrumb,
} from 'antd';
import React, { useState, useEffect, useCallback } from "react";
import Style from "./web.module.less";
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
import useFeatures from "../../../hooks/useFeatures";
import ArticleUpsert from "../../../components/article/detail3";
const { Sider } = Layout;
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
            treeData: DataNode[];
            openKeys: string[];
            selectedKeys: string[];
            selectedArticleId: string;
            width: string;
            breadcrumbItems: { title: string }[],
        },
        {
            gotoArticleUpsert: (articleId: string, selectedKeys?: string[]) => void;
            getOpenKeys: (
                targetKey: string,
                treeData: DataNode[],
                openKeys: string[]
            ) => void;
            loadArticles: (articleMenuId: string) => void;
            findFirstArticle: (treeData: DataNode[]) => { 
                label: string,
                title: string,
                key: string,
                isArticle?: boolean,
                children?: DataNode[],
            };
        }
    >
) {
    const {
        treeData,
        openKeys,
        selectedKeys,
        selectedArticleId,
        width,
        breadcrumbItems,
    } = props.data;
    const {
        t,
        gotoArticleUpsert,
        getOpenKeys,
        loadArticles,
        findFirstArticle,
    } = props.methods;
    const [executed, setExecuted] = useState(false);
    useEffect(() => {
      if (!executed && treeData.length > 0 && openKeys.length === 0) {
        const node = findFirstArticle(treeData);
        getOpenKeys(node.key,treeData,openKeys)
        setExecuted(true);
      }
    }, [treeData, executed]);
    const features = useFeatures();
    const [open, setOpen] = useState(false);
    const renderMenuItems = (data: any, callback?: () => void) => {
        return data?.map((menuItem: any) => {

            if (menuItem.children) {
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
                                {menuItem.label}
                            </div>
                        }
                        onTitleClick={(e) => {
                            if (menuItem.isArticle) {
                                loadArticles(e.key)
                            }
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
                        if (menuItem.type === 'article') {
                            gotoArticleUpsert(e.key, selectedKeys);
                            if (typeof callback === 'function') {
                                callback();
                            }
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
                    <div className={Style.topBar}>
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
                    </div>
                    <div className={Style.editor}>
                        {selectedArticleId?.length > 0 ? (
                            <div>
                                <Breadcrumb
                                    style={{ padding: 10 }}
                                    items={breadcrumbItems}
                                />
                                <ArticleUpsert
                                    oakAutoUnmount={true}
                                    oakId={selectedArticleId}
                                    oakPath={`$article-detail2-${selectedArticleId}`}
                                />
                            </div>
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
                        <div>
                            <Breadcrumb
                                style={{ padding: '10px 10px' }}
                                items={breadcrumbItems}
                            />
                            <ArticleUpsert
                                oakAutoUnmount={true}
                                oakId={selectedArticleId}
                                oakPath={`$article-detail2-${selectedArticleId}`}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
