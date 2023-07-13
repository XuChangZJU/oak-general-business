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
import { MenuUnfoldOutlined, MenuFoldOutlined, RightOutlined, DownOutlined } from '@ant-design/icons';

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
            getOpenKeys(node.key, treeData, openKeys)
            setExecuted(true);
        }
    }, [treeData, executed]);
    const features = useFeatures();
    const [open, setOpen] = useState(false);
    const renderMenuItems = (data: any, callback?: () => void, fontSize = 16, fontWeight = 800) => {
        return data?.map((menuItem: any) => {
            if (menuItem.children) {
                return (
                    <Menu.SubMenu
                        style={{ margin: 0, borderRadius: 0 }}
                        key={menuItem.key}
                        title={
                            <div style={{ display: 'flex', marginLeft: 8, fontWeight: `${fontWeight}`, fontSize: `${fontSize}px`, flexDirection: 'row' }}>
                                {menuItem.logo ? (
                                    <Image
                                        height={26}
                                        width={26}
                                        src={menuItem.logo}
                                        preview={false}
                                    />
                                ) : null}
                                <div style={{ marginLeft: 8 }}>{menuItem.label}</div>
                            </div>
                        }
                        onTitleClick={(e) => {
                            if (menuItem.isArticle) {
                                loadArticles(e.key)
                            }
                            getOpenKeys(e.key, treeData, openKeys);
                        }}
                    >
                        {renderMenuItems(menuItem.children, callback, fontSize - 2, fontWeight - 100)}
                    </Menu.SubMenu>
                );
            } else {
                const isSelected = selectedKeys.includes(menuItem.key);
                return (
                    <Menu.Item
                        style={{ margin: 0, width: '100%', borderRadius: 0 }}
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
                        <span style={isSelected ? { color: '#1677ff' } : undefined}>
                            <div className={Style.articleItem}>
                                <div className={Style.icon}>
                                    {isSelected ? <div className={Style.dot} /> : null}
                                </div>
                                <div className={Style.label} style={{ fontSize: `${fontSize}px` }}>{menuItem.label}</div>
                            </div>
                        </span>
                    </Menu.Item>
                );
            }

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
                                {/* <Breadcrumb
                                    style={{ padding: '25px 10px 10px 10px' }}
                                    items={breadcrumbItems}
                                /> */}
                                <div style={{ padding: '25px 10px 10px 10px', display: 'flex', flexDirection: 'row', fontSize: '14px' }}>
                                    {
                                        breadcrumbItems.length > 0 &&
                                        breadcrumbItems.map((breadcrumbItem: any, index: number) => {
                                            return index !== breadcrumbItems.length - 1 ? (
                                                <div style={{ color: '#B2B2B2' }} key={index}>
                                                    {breadcrumbItem.title}
                                                    <span style={{ margin: '0 6px' }}>/</span>
                                                </div>
                                            ) : (
                                                <div className={Style.breadcrumbItem} key={index}>
                                                    {breadcrumbItem.title}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
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
                    {/* <Sider
                        theme="light"
                        width={256}
                        className={Style.siderPanel}
                    > */}
                    <Menu
                        className={Style.myMenu}
                        openKeys={openKeys}
                        selectedKeys={selectedKeys}
                        style={{ width: 256 }}
                        mode="inline"
                    >
                        {renderMenuItems(treeData, () => {
                            setOpen(false);
                        })}
                    </Menu>
                    {/* </Sider> */}
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
                        width={336}
                        className={Style.siderPanel}
                    >
                        <Menu
                            className={Style.myMenu}
                            openKeys={openKeys}
                            selectedKeys={selectedKeys}
                            style={{ width: 256, margin: '40px 30px' }}
                            mode="inline"
                        >
                            {renderMenuItems(treeData)}
                        </Menu>
                    </Sider>
                </div>
                <div
                    className={Style.editor}
                    style={{
                        marginLeft: 380,
                    }}
                >
                    {selectedArticleId?.length > 0 ? (
                        <div>
                            {/* <Breadcrumb
                                style={{ padding: '40px 10px 10px 10px' }}
                                items={breadcrumbItems}
                            /> */}
                            <div style={{ padding: '40px 10px 10px 10px', display: 'flex', flexDirection: 'row', fontSize: '14px' }}>
                                {
                                    breadcrumbItems.length > 0 &&
                                    breadcrumbItems.map((breadcrumbItem: any, index: number) => {
                                        return index !== breadcrumbItems.length - 1 ? (
                                            <div style={{ color: '#B2B2B2' }} key={index}>
                                                {breadcrumbItem.title}
                                                <span style={{ margin: '0 8px' }}>/</span>
                                            </div>
                                        ) : (
                                            <div className={Style.breadcrumbItem} key={index}>
                                                {breadcrumbItem.title}
                                            </div>
                                        )
                                    })
                                }
                            </div>
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
