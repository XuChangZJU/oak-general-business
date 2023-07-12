import React, { useState, useEffect, useCallback } from "react";
import { Space, Button, Menu, Image, Empty, Pagination } from 'antd';
import Style from "./web.module.less";
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
import PageHeader from "../../../components/common/pageHeader";
import ArticleDetail from '../../../components/article/detail';
import ArticleMenuCell from '../../../components/articleMenu/cell';
import { EyeOutlined } from '@ant-design/icons';

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
            selectArticleMenuId: string;
            selectArticleId: string;
            entity: string;
            entityId: string;
        },
        {
            gotoUpsertById: (id: string) => void;
            gotoArticleUpsert: (articleId: string) => void;
            gotoEdit: (id?: string) => void;
            loadArticles: (articleMenuId: string) => void;
            gotoDoc: () => void;
        }
    >
) {
    const {
        entity,
        entityId,
        treeData,
        selectArticleMenuId,
        selectArticleId,
    } = props.data;
    const {
        t,
        gotoUpsertById,
        gotoArticleUpsert,
        gotoEdit,
        loadArticles,
        gotoDoc,
    } = props.methods;
    const renderMenuItems = (data: any, fontSize = 16, fontWeight = 800) => {
        return data?.map((menuItem: any) => {
            if (menuItem.children) {
                return (
                    <Menu.SubMenu
                        style={{ background: '#ffffff', margin: '0px', borderRadius: '0px' }}
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
                            gotoUpsertById(e.key);
                        }}
                    >
                        {renderMenuItems(menuItem.children, fontSize - 2, fontWeight - 100)}
                    </Menu.SubMenu>
                );
            } else {
                return (
                    <Menu.Item
                        key={menuItem.key}
                        onClick={(e) => {
                            if (menuItem.type === 'article') {
                                gotoArticleUpsert(e.key);
                            } else {
                                gotoUpsertById(e.key);
                            }
                        }}
                    >
                        <span style={selectArticleId === menuItem.key ? { color: '#1677ff' } : undefined}>
                            <div className={Style.articleItem}>
                                <div className={Style.icon}>
                                    {selectArticleId === menuItem.key ? <div className={Style.dot} /> : null}
                                </div>
                                <div className={Style.label} style={{ fontSize: `${fontSize}px` }}>{menuItem.label}</div>
                            </div>
                        </span>
                    </Menu.Item>
                );
            }

        });
    };
    return (
        <PageHeader title="分类管理">
            <div className={Style.container}>
                <Space style={{ marginBottom: 16 }}>
                    <Button
                        type="primary"
                        onClick={() => {
                            gotoEdit();
                        }}
                    >
                        新增
                    </Button>
                    <Button
                        onClick={() => {
                            gotoDoc();
                        }}
                    >
                        <EyeOutlined/>
                        查看
                    </Button>
                </Space>
                {treeData?.length === 0 ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : (
                    <div className={Style.rightContent}>
                        <div className={Style.article}>
                            <div className={Style.menu}>
                                <Menu
                                    className={Style.myMenu}
                                    style={{ width: 256 }}
                                    mode="inline"
                                >
                                    {renderMenuItems(treeData)}
                                </Menu>
                            </div>
                            <div className={Style.editor}>
                                {selectArticleMenuId ? (
                                    <ArticleMenuCell
                                        oakAutoUnmount={true}
                                        oakId={selectArticleMenuId}
                                        oakPath={`$articleMenu-cell-${selectArticleMenuId}`}
                                        entity={entity}
                                        entityId={entityId}
                                    />
                                ) : null}
                                {selectArticleId ? (
                                    <ArticleDetail
                                        oakAutoUnmount={true}
                                        oakId={selectArticleId}
                                        oakPath={`$article-detail-${selectArticleId}`}
                                    />
                                ) : null}
                            </div>

                        </div>
                        {/* <div className={Style.pagination}>
                            <Pagination
                                className={Style.pagination}
                                total={total}
                                current={currentPage || 1}
                                pageSize={100}
                                // pageSizeOptions={pageSize}
                                onChange={(current) => {
                                    setCurrentPage(current);
                                }}
                                onShowSizeChange={(pageSize) => {
                                    setPageSize(pageSize);
                                }}
                            />
                        </div> */}
                    </div>
                )}
            </div>
        </PageHeader>
    );
}
