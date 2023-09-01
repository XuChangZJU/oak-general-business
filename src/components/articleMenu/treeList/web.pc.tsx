import React, { useRef, useState, useEffect } from 'react';
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../oak-app-domain";
import TreeCell from '../treeCell';
import Styles from './web.pc.module.less';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Modal, InputRef, Input, Form, Empty } from 'antd';



export default function Render(props: WebComponentProps<EntityDict, 'articleMenu', true, {
    rows: EntityDict['articleMenu']['OpSchema'][];
    parentId?: string;
    onGrandChildEditArticleChange: (data: string) => void;
    show: string;
    getBreadcrumbItems: (breadcrumbItems: string[]) => void;
    breadcrumbItems: string[];
    drawerOpen: boolean;
    changeDrawerOpen: (open: boolean) => void;
    addOpen: boolean;
    changeAddOpen: (addOpen: boolean) => void;
    selectedArticleId: string;
    defaultOpen: boolean;
    changeDefaultOpen: (defaultOpen: boolean, openArray: string[]) => void;
    openArray: string[];
    getTopInfo: (data: { name: string, date: number }) => void;
    articleId: string;
    articleMenuId: string;
    getSearchOpen: (searchOpenArray: string[]) => void;
    getSideInfo: (data: { id: string, name: string, coverUrl: string }) => void;
    currentArticle: string;
    setCurrentArticle: (id: string) => void;
}, {
    createOne: (name?: string) => Promise<void>;
    getDefaultArticle: (rows: EntityDict['articleMenu']['OpSchema'][]) => void;
    getSearchArticle: () => Promise<string[]>;
}>) {
    const {
        rows,
        oakFullpath,
        parentId,
        onGrandChildEditArticleChange,
        show,
        getBreadcrumbItems,
        breadcrumbItems,
        drawerOpen,
        changeDrawerOpen,
        addOpen,
        changeAddOpen,
        selectedArticleId,
        defaultOpen,
        changeDefaultOpen,
        openArray,
        getTopInfo,
        articleId,
        articleMenuId,
        getSearchOpen,
        getSideInfo,
        currentArticle,
        setCurrentArticle
    } = props.data;
    const { t, createOne, removeItem, updateItem, execute, setMessage, getDefaultArticle, getSearchArticle } = props.methods;
    useEffect(() => {
        if (rows && rows.length > 0 && defaultOpen && !articleId) {
            const arr: any = getDefaultArticle(rows);
            changeDefaultOpen(false, arr);
            return;
        }
    }, [rows]);
    useEffect(() => {
        const fetchData = async() => {
            if(articleId) {
                const arr = await getSearchArticle();
                getSearchOpen(arr);
                return;
            }
        }
        fetchData();
    },[articleId]);
    const [modal, contextHolder] = Modal.useModal();
    const menuNameRef = useRef<InputRef>(null);
    if (oakFullpath) {
        if (!show) {
            if (rows?.length > 0) {
                if (addOpen) {
                    modal.confirm({
                        title: '添加分类',
                        cancelText: '取消',
                        okText: '提交',
                        content: (
                            <div>
                                <Form.Item
                                    label={'分类名称'}
                                >
                                    <Input
                                        ref={menuNameRef}
                                    />
                                </Form.Item>
                                <div style={{
                                    color: 'rgba(0, 0, 0, 0.45)',
                                    fontSize: '14px'
                                }}>
                                    <span>若需要创建FAQ文档，则请先创建FAQ文档根目录，后续添加FAQ文章请在FAQ文档根目录下进行。</span>
                                </div>
                            </div>
                        ),
                        onOk: async () => {
                            const { value } = menuNameRef.current!.input!;
                            changeAddOpen(false);
                            if (!value) {
                                setMessage({
                                    type: 'warning',
                                    content: '请输入目录标题',
                                });
                            }
                            else {
                                await createOne(value);
                            }
                        },
                        onCancel: () => {
                            changeAddOpen(false);
                        }
                    });
                }
                return (
                    <div className={Styles.container}>
                        {
                            rows.map(
                                (ele, idx) => (
                                    <>
                                        <TreeCell
                                            onChildEditArticleChange={onGrandChildEditArticleChange}
                                            oakId={ele.id}
                                            oakPath={`${oakFullpath}.${ele.id}`}
                                            onRemove={() => {
                                                modal.confirm({
                                                    title: '请确认',
                                                    content: '确认删除吗？',
                                                    cancelText: '取消',
                                                    okText: '确定',
                                                    onOk: async () => {
                                                        removeItem(ele.id);
                                                        await execute();
                                                    }
                                                });
                                            }}
                                            onUpdateName={async (name) => {
                                                updateItem({ name }, ele.id);
                                                await execute();
                                            }}
                                        />
                                        <Divider style={{ margin: 1 }} />
                                    </>
                                )
                            )
                        }
                        {contextHolder}
                    </div>
                );
            } else {
                if (addOpen) {
                    modal.confirm({
                        title: '添加分类',
                        cancelText: '取消',
                        okText: '提交',
                        content: (
                            <div>
                                <Form.Item
                                    label={'分类名称'}
                                >
                                    <Input
                                        ref={menuNameRef}
                                    />
                                </Form.Item>
                                <div style={{
                                    color: 'rgba(0, 0, 0, 0.45)',
                                    fontSize: '14px'
                                }}>
                                    <span>若需要创建FAQ文档，则请先创建FAQ文档根目录，后续添加FAQ文章请在FAQ文档根目录下进行。</span>
                                </div>
                            </div>
                        ),
                        onOk: async () => {
                            const { value } = menuNameRef.current!.input!;
                            changeAddOpen(false);
                            if (!value) {
                                setMessage({
                                    type: 'warning',
                                    content: '请输入目录标题',
                                });
                            }
                            else {
                                await createOne(value);
                            }
                        },
                        onCancel: () => {
                            changeAddOpen(false);
                        }
                    });
                }
                return (
                    <div>{contextHolder}</div>
                )
            }
        } else {
            if (rows?.length > 0) {
                return (
                    <div className={Styles.container}>
                        {
                            rows.map(
                                (ele, idx) => (
                                    <>
                                        <TreeCell
                                            onChildEditArticleChange={onGrandChildEditArticleChange}
                                            oakId={ele.id}
                                            oakPath={`${oakFullpath}.${ele.id}`}
                                            show={show}
                                            getBreadcrumbItemsByParent={getBreadcrumbItems}
                                            breadItems={breadcrumbItems}
                                            drawerOpen={drawerOpen}
                                            changeDrawerOpen={changeDrawerOpen}
                                            selectedArticleId={selectedArticleId}
                                            openArray={openArray ? openArray : undefined}
                                            articleId={articleId}
                                            articleMenuId={articleMenuId}
                                            getTopInfo={getTopInfo}
                                            getSideInfo={getSideInfo}
                                            currentArticle={currentArticle}
                                            setCurrentArticle={setCurrentArticle}
                                        />
                                    </>
                                )
                            )
                        }
                        {contextHolder}
                    </div>
                );
            } else {
                if (!parentId) {
                    return (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)
                }
            }
        }
    }
    return null;
}