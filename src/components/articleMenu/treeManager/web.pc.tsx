import React, { useEffect, useState } from 'react';
import TreeList from '../treeList';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from "../../../general-app-domain";
import Styles from './web.pc.module.less';
import { Button, Divider, Tooltip, Space, Drawer, Empty } from 'antd';
import { EyeOutlined, CopyOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import ArticleUpsert from '../../article/upsert';
import ArticleDetail from '../../article/cell';
import copy from 'copy-to-clipboard';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'articleMenu',
        true,
        {
            entity: string,
            entityId: string,
            show: string,
            articleMenuId: string,
            width: string,
        },
        {
            gotoDoc: () => void;
            gotoArticleDetail: (oakId: string) => void;
        }
    >
) {
    const { entity, entityId, oakFullpath, show, articleMenuId, width } = props.data;
    const { gotoDoc, setMessage, gotoArticleDetail } = props.methods;
    const [editArticle, setEditArticle] = useState('');
    const [breadcrumbItems, setBreadcrumbItems] = useState([] as string[]);
    const [open, setOpen] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    const [selectedArticleId, setSelectedArticleId] = useState('');
    const [defaultOpen, setDefaultOpen] = useState(true);
    const [openArray, setOpenArray] = useState([] as string[]);
    const [isEdit, setIsEdit] = useState(false);
    const changeIsEdit= () => {
        setIsEdit(false);
    };
    const changeDefaultOpen = (defaultOpen: boolean, openArray: string[]) => {
        setDefaultOpen(defaultOpen);
        setOpenArray(openArray);
    };
    const changeAddOpen = (addOpen: boolean) => {
        setAddOpen(addOpen);
    };
    const checkEditArticle = (data: string) => {
        setEditArticle(data);
    };
    const getBreadcrumbItems = (breadcrumbItems: string[]) => {
        setBreadcrumbItems(breadcrumbItems);
    };
    const changeDrawerOpen = (open: boolean) => {
        setOpen(open);
    }
    useEffect(() => {
        if (editArticle) {
            setSelectedArticleId(editArticle);
            changeIsEdit();
        }
    }, [editArticle])
    if (oakFullpath) {
        if (!show) {
            return (
                <div className={Styles.container}>
                    <div className={Styles.menu}>
                        <div className={Styles.menuHeader}>
                            <div className={Styles.menuTitle}>菜单</div>
                            <div className={Styles.menuActions}>
                                <div className={Styles.viewAction}>
                                    <Tooltip title={'添加分类'}>
                                        <Button
                                            type="text"
                                            icon={<PlusOutlined />}
                                            size="small"
                                            onClick={() => setAddOpen(true)}
                                        />
                                    </Tooltip>
                                    <Tooltip title={'查看'}>
                                        <Button
                                            type="text"
                                            icon={<EyeOutlined />}
                                            size="small"
                                            onClick={() => gotoDoc()}
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                        <Divider style={{ margin: 0 }} />
                        <TreeList
                            oakPath={`${oakFullpath}.articleMenus`}
                            entity={entity}
                            entityId={entityId}
                            onGrandChildEditArticleChange={checkEditArticle}
                            changeAddOpen={changeAddOpen}
                            addOpen={addOpen}
                        />
                    </div>
                    <div className={Styles.editor}>
                        {
                            editArticle && (
                                <ArticleUpsert
                                    oakId={editArticle}
                                    oakAutoUnmount={true}
                                    oakPath={`article-upsert-${editArticle}`}
                                />
                            )
                        }
                    </div>
                </div>
            );
        } else if (show === 'doc') {
            if (width === 'xs') {
                return (
                    <div className={Styles.container2}>
                        <div className={Styles.article_v}>
                            <div className={Styles.topBar}>
                                <div
                                    className={Styles.menuHeader}
                                    onClick={() => {
                                        setOpen(true);
                                    }}
                                >
                                    <div>帮助文档</div>
                                    {
                                        open ? (
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
                                        )
                                    }
                                </div>
                                <Divider style={{ margin: 0 }} />
                            </div>
                            <div className={Styles.editor2}>
                                {
                                    editArticle && (
                                        <div>
                                            <div style={{ fontSize: 14, display: 'flex', flexDirection: 'row', marginLeft: 10, marginBottom: 5 }}>
                                                {
                                                    breadcrumbItems.length > 0 &&
                                                    breadcrumbItems.map((breadcrumbItem: string, index: number) => {
                                                        return index !== breadcrumbItems.length - 1 ? (
                                                            <div style={{ color: '#B2B2B2' }} key={index}>
                                                                {breadcrumbItem}
                                                                <span style={{ margin: '0 6px' }}>/</span>
                                                            </div>
                                                        ) : (
                                                            <div className={Styles.breadcrumbItem} key={index}>
                                                                {breadcrumbItem}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <ArticleDetail
                                                oakId={editArticle}
                                                oakAutoUnmount={true}
                                                oakPath={`article-detail-${editArticle}`}
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <Drawer
                            className={Styles.drawerPanel}
                            open={open}
                            onClose={() => {
                                setOpen(false);
                            }}
                            placement="left"
                            width={260}
                        >
                            <TreeList
                                oakPath={`${oakFullpath}.articleMenus`}
                                entity={entity}
                                entityId={entityId}
                                onGrandChildEditArticleChange={checkEditArticle}
                                show={show}
                                articleMenuId={articleMenuId ? articleMenuId : undefined}
                                getBreadcrumbItems={getBreadcrumbItems}
                                breadcrumbItems={[]}
                                drawerOpen={open}
                                changeDrawerOpen={changeDrawerOpen}
                                selectedArticleId={selectedArticleId ? selectedArticleId : undefined}
                                defaultOpen={defaultOpen}
                                changeDefaultOpen={changeDefaultOpen}
                                openArray={openArray ? openArray : undefined}
                            />
                        </Drawer>
                    </div>
                )
            } else {
                return (
                    <div className={Styles.container2}>
                        <div className={Styles.menu}>
                            <TreeList
                                oakPath={`${oakFullpath}.articleMenus`}
                                entity={entity}
                                entityId={entityId}
                                onGrandChildEditArticleChange={checkEditArticle}
                                show={show}
                                articleMenuId={articleMenuId ? articleMenuId : undefined}
                                getBreadcrumbItems={getBreadcrumbItems}
                                breadcrumbItems={[]}
                                selectedArticleId={selectedArticleId ? selectedArticleId : undefined}
                                defaultOpen={defaultOpen}
                                changeDefaultOpen={changeDefaultOpen}
                                openArray={openArray ? openArray : undefined}
                            />
                        </div>
                        <div className={Styles.editor}>
                            {
                                editArticle && (
                                    <div>
                                        <div style={{ fontSize: 14, display: 'flex', flexDirection: 'row', marginLeft: 10, marginBottom: 5 }}>
                                            {
                                                breadcrumbItems.length > 0 &&
                                                breadcrumbItems.map((breadcrumbItem: string, index: number) => {
                                                    return index !== breadcrumbItems.length - 1 ? (
                                                        <div style={{ color: '#B2B2B2' }} key={index}>
                                                            {breadcrumbItem}
                                                            <span style={{ margin: '0 6px' }}>/</span>
                                                        </div>
                                                    ) : (
                                                        <div className={Styles.breadcrumbItem} key={index}>
                                                            {breadcrumbItem}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <ArticleDetail
                                            oakId={editArticle}
                                            oakAutoUnmount={true}
                                            oakPath={`article-detail-${editArticle}`}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
        } else {
            return (
                <div className={Styles.container3}>
                    <div className={Styles.menu}>
                        <TreeList
                            oakPath={`${oakFullpath}.articleMenus`}
                            entity={entity}
                            entityId={entityId}
                            onGrandChildEditArticleChange={checkEditArticle}
                            show={show}
                            getBreadcrumbItems={getBreadcrumbItems}
                            breadcrumbItems={[]}
                            selectedArticleId={selectedArticleId ? selectedArticleId : undefined}
                            defaultOpen={defaultOpen}
                            changeDefaultOpen={changeDefaultOpen}
                            openArray={openArray ? openArray : undefined}
                        />
                    </div>
                    <div className={Styles.editor}>
                        {
                            editArticle && (
                                <div>
                                    <div className={Styles.actions}>
                                        <Space style={{ marginBottom: 10 }}>
                                            <Button
                                                onClick={() => {
                                                    gotoArticleDetail(editArticle);
                                                }}
                                            >
                                                <EyeOutlined />
                                                查看
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    const url = `${window.location.host}/article/detail?oakId=${editArticle}`;
                                                    copy(url);
                                                    setMessage({
                                                        content: '复制链接成功',
                                                        type: 'success',
                                                    });
                                                }}
                                            >
                                                <CopyOutlined />
                                                复制链接
                                            </Button>
                                            <Button
                                                onClick={() => setIsEdit(true)}
                                            >
                                                <EditOutlined />
                                                更新
                                            </Button>
                                        </Space>
                                    </div>
                                    <div style={{ fontSize: 14, display: 'flex', flexDirection: 'row', marginLeft: 10, marginBottom: 5 }}>
                                        {
                                            breadcrumbItems.length > 0 &&
                                            breadcrumbItems.map((breadcrumbItem: string, index: number) => {
                                                return index !== breadcrumbItems.length - 1 ? (
                                                    <div style={{ color: '#B2B2B2' }} key={index}>
                                                        {breadcrumbItem}
                                                        <span style={{ margin: '0 6px' }}>/</span>
                                                    </div>
                                                ) : (
                                                    <div className={Styles.breadcrumbItem} key={index}>
                                                        {breadcrumbItem}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    {
                                        isEdit ? (
                                            <ArticleUpsert
                                                oakId={editArticle}
                                                oakAutoUnmount={true}
                                                oakPath={`article-upsert-${editArticle}`}
                                                changeIsEdit={changeIsEdit}
                                            />
                                        ) : (
                                            <ArticleDetail
                                                oakId={editArticle}
                                                oakAutoUnmount={true}
                                                oakPath={`article-detail-${editArticle}`}
                                            />
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            )
        }
    }
    return null;
}
