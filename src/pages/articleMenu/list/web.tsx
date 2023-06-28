import React, { useState, useEffect, useCallback } from "react";
import { Space, Button, Menu, Image, Empty } from 'antd';
import classNames from "classnames";
import Style from "./web.module.less";
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
import PageHeader from "../../../components/common/pageHeader";
import ArticleDetail from '../../../components/article/detail';
import ArticleMenuCell from '../../../components/articleMenu/cell';


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
            articleMenu: EntityDict['articleMenu']['Schema'][];
            articles: EntityDict['article']['Schema'][];
            treeData: DataNode[];
            selectArticleMenuId: string;
            parentId: string;
            selectArticleId: string;
            name: string;
            isArticle: boolean;
            isChildren: boolean;
            logo: string;
            title: string;
        },
        {
            gotoUpsertById: (id: string) => void;
            gotoArticleUpsert: (articleId: string) => void;
            onRemoveArticleMenu: (id: string) => void;
            gotoEdit: (id?: string) => void;
        }
    >
) {
    const {
        treeData,
        selectArticleMenuId,
        selectArticleId,
        oakFullpath,
    } = props.data;
    const {
        t,
        gotoUpsertById,
        gotoArticleUpsert,
        onRemoveArticleMenu,
        gotoEdit,
    } = props.methods;

    const renderMenuItems = (data: any) => {
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
                            gotoUpsertById(e.key);
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
                        gotoArticleUpsert(e.key);
                    }}
                >
                    {menuItem.label}
                </Menu.Item>
            );
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
                </Space>
                {treeData?.length === 0 ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : (
                    <div className={Style.article}>
                        <div className={Style.menu}>
                            <Menu
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
                                    onRemoveArticleMenu={(id: string) => {
                                        onRemoveArticleMenu(id);
                                    }}
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
                )}
            </div>
        </PageHeader>
    );
}
