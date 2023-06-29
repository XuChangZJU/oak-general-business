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
} from 'antd';
const { confirm } = Modal;
import type { MenuProps } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import Style from './web.module.less';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import useFeatures from '../../../hooks/useFeatures';
import PageHeader from '../../../components/common/pageHeader';
import { Editor } from '@wangeditor/editor-for-react';
import { IEditorConfig } from '@wangeditor/editor';
import ArticleUpsert from '../../../components/article/detail2';
const { SubMenu } = Menu;
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
            isChildren: boolean;
            logo: string;
            openKeys: string[];
            selectedKeys: string[];
            selectedArticleId: string;
        },
        {
            gotoUpsert: (id?: string) => void;
            gotoUpsertById: (id: string) => void;
            gotoArticleUpsert: (
                articleId: string,
                selectedKeys?: string[]
            ) => void;
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
        isChildren,
        logo,
        openKeys,
        selectedKeys,
        selectedArticleId
    } = props.data;
    const {
        t,
        gotoUpsert,
        gotoUpsertById,
        gotoArticleUpsert,
        onRemoveArticleMenu,
        gotoEdit,
        gotoEditByParentId,
        gotoArticleEdit,
        onRemoveArticle,
        gotoArticleEditByArticleMenuId,
        getOpenKeys,
    } = props.methods;
    const features = useFeatures();

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
                        gotoArticleUpsert(e.key, selectedKeys);
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
                                <ArticleUpsert
                                    oakAutoUnmount={true}
                                    oakId={selectedArticleId}
                                    oakPath={`$article-detail2-${selectedArticleId}`}
                                />
                            ) : null}
                        </div>
                    </div>
                )}
            </div>
        </PageHeader>
    );
}
