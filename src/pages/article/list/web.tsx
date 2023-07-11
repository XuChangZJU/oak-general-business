import React, { useState, useEffect } from 'react';

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
    Breadcrumb,
} from 'antd';
import Style from './web.module.less';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import useFeatures from '../../../hooks/useFeatures';
import PageHeader from '../../../components/common/pageHeader';
import ArticleUpsert from '../../../components/article/detail2';
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
        'articleMenu',
        true,
        {
            treeData: DataNode[];
            openKeys: string[];
            selectedKeys: string[];
            selectedArticleId: string;
            breadcrumbItems: { title: string }[];
        },
        {
            gotoArticleUpsert: (
                articleId: string,
                selectedKeys?: string[]
            ) => void;
            getOpenKeys: (
                targetKey: string,
                treeData: DataNode[],
                openKeys: string[]
            ) => void;
            loadArticles: (articleMenuId: string) => void;
            findFirstArticle: (treeData: DataNode[]) => {
                label: string;
                title: string;
                key: string;
                isArticle?: boolean;
                children?: DataNode[];
            };
        }
    >
) {
    const {
        treeData,
        openKeys,
        selectedKeys,
        selectedArticleId,
        breadcrumbItems,
    } = props.data;
    const {
        t,
        gotoArticleUpsert,
        getOpenKeys,
        loadArticles,
        setMessage,
        findFirstArticle,
    } = props.methods;
    const features = useFeatures();
    const [executed, setExecuted] = useState(false);
    useEffect(() => {
        if (!executed && treeData.length > 0 && openKeys.length === 0) {
            const node = findFirstArticle(treeData);
            getOpenKeys(node.key, treeData, openKeys);
            setExecuted(true);
        }
    }, [treeData, executed]);

    const renderMenuItems = (data: any) => {
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
                        onTitleClick={async (e) => {
                            if (menuItem.isArticle) {
                                loadArticles(e.key);
                            }
                            getOpenKeys(e.key, treeData, openKeys);
                        }}
                    >
                        {renderMenuItems(menuItem.children)}
                    </Menu.SubMenu>
                );
            }
            return (
                <Menu.Item
                    key={menuItem.key}
                    onClick={(e) => {
                        if (menuItem.type === 'article') {
                            gotoArticleUpsert(e.key, selectedKeys);
                        }
                    }}
                >
                    {menuItem.label}
                </Menu.Item>
            );
        });
    };
    return (
        <PageHeader title="帮助文档">
            <div className={Style.container}>
                {treeData?.length === 0 ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : (
                    <div className={Style.article}>
                        <div className={Style.menu}>
                            <Menu
                                openKeys={openKeys}
                                selectedKeys={selectedKeys}
                                style={{ width: 256 }}
                                mode="inline"
                            >
                                {renderMenuItems(treeData)}
                            </Menu>
                        </div>
                        <div className={Style.editor}>
                            {selectedArticleId?.length > 0 ? (
                                <div className={Style.editorInner}>
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
                )}
            </div>
        </PageHeader>
    );
}
