import React, { useEffect, useState, useRef } from 'react';
import TreeList from '../treeList';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from "../../../oak-app-domain";
import Styles from './web.pc.module.less';
import { Button, Divider, Tooltip, Space, Drawer, Empty, Input, Image, Tag, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
const { Search } = Input;
import { EyeOutlined, CopyOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined, EditOutlined, MenuOutlined, SearchOutlined } from '@ant-design/icons';
import ArticleUpsert from '../../article/upsert';
import ArticleDetail from '../../article/cell';
import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';

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
            articleId: string,
            width: string,
            filteredArticles: EntityDict['article']['Schema'][];
        },
        {
            gotoDoc: () => void;
            gotoArticleDetail: (oakId: string) => void;
            searchArticle: (searchValue: string) => void;
            getArticleMenuIdByArticle: (articleId: string,  type: string) => void;
            gotoSearchArticleAndArticleMenu: (articleMenuId: string, articleId: string) => void;
        }
    >
) {
    const { entity, entityId, oakFullpath, show, articleMenuId, width, filteredArticles, articleId } = props.data;
    const { gotoDoc, setMessage, gotoArticleDetail, searchArticle, getArticleMenuIdByArticle } = props.methods;
    const [editArticle, setEditArticle] = useState('');
    const [breadcrumbItems, setBreadcrumbItems] = useState([] as string[]);
    const [open, setOpen] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    const [selectedArticleId, setSelectedArticleId] = useState('');
    const [defaultOpen, setDefaultOpen] = useState(true);
    const [openArray, setOpenArray] = useState([] as string[]);
    const [isEdit, setIsEdit] = useState(false);
    const [topInfo, setTopInfo] = useState({ name: '', date: 0 });
    const [searchValue, setSearchValue] = useState('');
    const [items, setItems] = useState([] as MenuProps['items']);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchOpenArray, setSearchOpenArray] = useState([] as string[]);
    const [sideInfo, setSideInfo] = useState({ id: '', name: '', coverUrl: '' });
    const [currentArticle, setCurrentArticle] = useState('');
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const changeIsEdit = () => {
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
    const getTopInfo = (data: { name: string, date: number }) => {
        setTopInfo(data);
    };
    const getSearchOpen = (searchOpenArray: string[]) => {
        setSearchOpenArray(searchOpenArray);
    };
    const getSideInfo = (data: { id: string, name: string, coverUrl: string }) => {
        setSideInfo(data);
    };
    const getCurrentArticle = (id: string) => {
        setCurrentArticle(id);
    }
    useEffect(() => {
        if (editArticle) {
            setSelectedArticleId(editArticle);
            changeIsEdit();
        }
    }, [editArticle]);
    useEffect(() => {
        if (filteredArticles && filteredArticles.length > 0) {
            const pattern = new RegExp('<p>.*?' + searchValue + '.*?</p>');
            const arr = filteredArticles.map((ele) => {
                const match = pattern.exec(ele.content);
                let HTMLString = '';
                let name = `<div>${ele.name}</div>`;
                if (match) {
                    const content = match[0].replace(/<\/?[^>]+(>|$)/g, "");
                    const contentPattern = new RegExp(searchValue);
                    const highlightContent = content.replace(contentPattern, '<span style="color: #3f7644">$&</span>');
                    HTMLString = '<div>' + highlightContent + '</div>';
                } else {
                    const namePattern = new RegExp(searchValue);
                    const contentPattern = /<p>.*?<\/p>/;
                    const contentMatch = contentPattern.exec(ele.content);
                    if (contentMatch) {
                        const content = contentMatch[0].replace(/<\/?[^>]+(>|$)/g, "");
                        HTMLString = '<div>' + content + '</div>';
                    }
                    name = name.replace(namePattern, '<span style="color: #3f7644">$&</span>');
                }
                return {
                    key: ele.id,
                    label: (
                        <div className={Styles.dropdownItem}
                            onClick={() => {
                                getArticleMenuIdByArticle(ele.id, show);
                            }}>
                            <div className={Styles.topBox}>
                                <div className={Styles.title} dangerouslySetInnerHTML={{ __html: name }}></div>
                                <Tag className={Styles.tag}>{ele.articleMenu.name}</Tag>
                            </div>
                            <div className={Styles.content} dangerouslySetInnerHTML={{ __html: HTMLString }}>
                            </div>
                        </div>
                    )
                }
            });
            setItems(arr);
            setSearchOpen(true);
        } else {
            setItems([]);
            setSearchOpen(false);
        }
    }, [filteredArticles]);
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    useEffect(() => {
        if (articleId) {
            setEditArticle(articleId);
        }
    }, [articleId]);
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLElement)) {
            setSearchOpen(false);
        }
    };
    let totalOpenArray = [];
    if (searchOpenArray && searchOpenArray.length > 0) {
        totalOpenArray = [...searchOpenArray];
    } else {
        totalOpenArray = [...openArray]
    }
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
                    // <div className={Styles.test}>
                    //     <div className={Styles.leftBox}>
                    //         <div className={Styles.topBox}>
                    //             <div className={Styles.boldFont}>{sideInfo.name}</div>
                    //         </div>
                    //         <div className={Styles.bottomBox}>
                    //             <div className={Styles.infoBox}>
                    //                 <div className={Styles.top}>
                    //                     <div className={Styles.left}>
                    //                         <Image
                    //                             preview={false}
                    //                             style={{ borderRadius: '50%', width: 50, height: 50 }}
                    //                             src={sideInfo.coverUrl}
                    //                         />
                    //                     </div>
                    //                     <div className={Styles.right}>
                    //                         <div className={Styles.top}>{sideInfo.name}</div>
                    //                         <div className={Styles.bottom}>
                    //                             <div className={Styles.circle}></div>
                    //                             <div className={Styles.font}>帮助文档</div>
                    //                         </div>
                    //                     </div>
                    //                 </div>
                    //                 <Input
                    //                     placeholder='Search...'
                    //                     suffix={<SearchOutlined />}
                    //                 />
                    //                 <div className={Styles.helpFont}>帮助文档</div>
                    //             </div>
                    //             <div className={Styles.menu}>
                    //                 <TreeList
                    //                     oakPath={`${oakFullpath}.articleMenus`}
                    //                     entity={entity}
                    //                     entityId={entityId}
                    //                     onGrandChildEditArticleChange={checkEditArticle}
                    //                     show={show}
                    //                     articleMenuId={articleMenuId ? articleMenuId : undefined}
                    //                     articleId={articleId ? articleId : undefined}
                    //                     getBreadcrumbItems={getBreadcrumbItems}
                    //                     breadcrumbItems={[]}
                    //                     selectedArticleId={selectedArticleId ? selectedArticleId : undefined}
                    //                     defaultOpen={defaultOpen}
                    //                     changeDefaultOpen={changeDefaultOpen}
                    //                     openArray={totalOpenArray ? totalOpenArray : undefined}
                    //                     getSearchOpen={getSearchOpen}
                    //                     getTopInfo={getTopInfo}
                    //                     oakAutoUnmount={true}
                    //                     getSideInfo={getSideInfo}
                    //                     currentArticle={currentArticle}
                    //                     setCurrentArticle={getCurrentArticle}
                    //                 />
                    //             </div>
                    //         </div>
                    //     </div>
                    //     <div className={Styles.rightBox}>
                    //         <div className={Styles.topBox}>
                    //             <MenuOutlined />
                    //             <div ref={dropdownRef}>
                    //                 <Dropdown menu={{ items }} open={searchOpen}>
                    //                     <Search
                    //                         style={{ width: 300 }}
                    //                         placeholder='Search...'
                    //                         onChange={(val) => {
                    //                             setSearchValue(val.target.value);
                    //                             searchArticle(val.target.value);
                    //                         }}
                    //                     />
                    //                 </Dropdown>
                    //             </div>
                    //         </div>
                    //         {
                    //             editArticle && (
                    //                 <div className={Styles.bottomBox}>
                    //                     <div className={Styles.breadcrumb}>
                    //                         {
                    //                             breadcrumbItems.length > 0 &&
                    //                             breadcrumbItems.map((breadcrumbItem: string, index: number) => {
                    //                                 return index !== breadcrumbItems.length - 1 ? (
                    //                                     <div style={{ color: '#B2B2B2' }} key={index}>
                    //                                         {breadcrumbItem}
                    //                                         <span style={{ margin: '0 6px' }}>
                    //                                             {'>'}
                    //                                         </span>
                    //                                     </div>
                    //                                 ) : (
                    //                                     <div className={Styles.breadcrumbItem} key={index}>
                    //                                         {breadcrumbItem}
                    //                                     </div>
                    //                                 )
                    //                             })
                    //                         }
                    //                     </div>
                    //                     <div className={Styles.article}>
                    //                         <div className={Styles.top}>
                    //                             <div className={Styles.title}>
                    //                                 {topInfo.name}
                    //                             </div>
                    //                             <div className={Styles.date}>
                    //                                 {dayjs(topInfo.date).format('YYYY-MM-DD')}
                    //                             </div>
                    //                         </div>
                    //                         <div className={Styles.editor}>
                    //                             <ArticleDetail
                    //                                 oakId={editArticle}
                    //                                 oakAutoUnmount={true}
                    //                                 oakPath={`article-detail-${editArticle}`}
                    //                             />
                    //                         </div>
                    //                     </div>
                    //                 </div>
                    //             )
                    //         }
                    //     </div>
                    // </div>
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
                // <div className={Styles.test}>
                //     <div className={Styles.leftBox}>
                //         <div className={Styles.topBox}>
                //             <div className={Styles.boldFont}>{sideInfo.name}</div>
                //         </div>
                //         <div className={Styles.bottomBox}>
                //             <div className={Styles.infoBox}>
                //                 <div className={Styles.top}>
                //                     <div className={Styles.left}>
                //                         <Image
                //                             preview={false}
                //                             style={{ borderRadius: '50%', width: 50, height: 50 }}
                //                             src={sideInfo.coverUrl}
                //                         />
                //                     </div>
                //                     <div className={Styles.right}>
                //                         <div className={Styles.top}>{sideInfo.name}</div>
                //                         <div className={Styles.bottom}>
                //                             <div className={Styles.circle}></div>
                //                             <div className={Styles.font}>帮助文档</div>
                //                         </div>
                //                     </div>
                //                 </div>
                //                 <Input
                //                     placeholder='Search...'
                //                     suffix={<SearchOutlined />}
                //                 />
                //                 <div className={Styles.helpFont}>帮助文档</div>
                //             </div>
                //             <div className={Styles.menu}>
                //                 <TreeList
                //                     oakPath={`${oakFullpath}.articleMenus`}
                //                     entity={entity}
                //                     entityId={entityId}
                //                     onGrandChildEditArticleChange={checkEditArticle}
                //                     show={show}
                //                     articleMenuId={articleMenuId ? articleMenuId : undefined}
                //                     articleId={articleId ? articleId : undefined}
                //                     getBreadcrumbItems={getBreadcrumbItems}
                //                     breadcrumbItems={[]}
                //                     selectedArticleId={selectedArticleId ? selectedArticleId : undefined}
                //                     defaultOpen={defaultOpen}
                //                     changeDefaultOpen={changeDefaultOpen}
                //                     openArray={totalOpenArray ? totalOpenArray : undefined}
                //                     getSearchOpen={getSearchOpen}
                //                     getTopInfo={getTopInfo}
                //                     oakAutoUnmount={true}
                //                     getSideInfo={getSideInfo}
                //                     currentArticle={currentArticle}
                //                     setCurrentArticle={getCurrentArticle}
                //                 />
                //             </div>
                //         </div>
                //     </div>
                //     <div className={Styles.rightBox}>
                //         <div className={Styles.topBox}>
                //             <MenuOutlined />
                //             <div ref={dropdownRef}>
                //                 <Dropdown menu={{ items }} open={searchOpen}>
                //                     <Search
                //                         style={{ width: 300 }}
                //                         placeholder='Search...'
                //                         onChange={(val) => {
                //                             setSearchValue(val.target.value);
                //                             searchArticle(val.target.value);
                //                         }}
                //                     />
                //                 </Dropdown>
                //             </div>
                //         </div>
                //         {
                //             editArticle && (
                //                 <div className={Styles.bottomBox}>
                //                     <div className={Styles.actions}>
                //                         <Space style={{ marginBottom: 10 }}>
                //                             <Button
                //                                 onClick={() => {
                //                                     gotoArticleDetail(editArticle);
                //                                 }}
                //                             >
                //                                 <EyeOutlined />
                //                                 查看
                //                             </Button>
                //                             <Button
                //                                 onClick={() => {
                //                                     const url = `${window.location.host}/article/detail?oakId=${editArticle}`;
                //                                     copy(url);
                //                                     setMessage({
                //                                         content: '复制链接成功',
                //                                         type: 'success',
                //                                     });
                //                                 }}
                //                             >
                //                                 <CopyOutlined />
                //                                 复制链接
                //                             </Button>
                //                             <Button
                //                                 onClick={() => setIsEdit(true)}
                //                             >
                //                                 <EditOutlined />
                //                                 更新
                //                             </Button>
                //                         </Space>
                //                     </div>
                //                     <div className={Styles.breadcrumb}>
                //                         {
                //                             breadcrumbItems.length > 0 &&
                //                             breadcrumbItems.map((breadcrumbItem: string, index: number) => {
                //                                 return index !== breadcrumbItems.length - 1 ? (
                //                                     <div style={{ color: '#B2B2B2' }} key={index}>
                //                                         {breadcrumbItem}
                //                                         <span style={{ margin: '0 6px' }}>
                //                                             {'>'}
                //                                         </span>
                //                                     </div>
                //                                 ) : (
                //                                     <div className={Styles.breadcrumbItem} key={index}>
                //                                         {breadcrumbItem}
                //                                     </div>
                //                                 )
                //                             })
                //                         }
                //                     </div>
                //                     <div className={Styles.article}>
                //                         <div className={Styles.top}>
                //                             <div className={Styles.title}>
                //                                 {topInfo.name}
                //                             </div>
                //                             <div className={Styles.date}>
                //                                 {dayjs(topInfo.date).format('YYYY-MM-DD')}
                //                             </div>
                //                         </div>
                //                         <div className={Styles.editor}>
                //                             {
                //                                 isEdit ? (
                //                                     <ArticleUpsert
                //                                         oakId={editArticle}
                //                                         oakAutoUnmount={true}
                //                                         oakPath={`article-upsert-${editArticle}`}
                //                                         changeIsEdit={changeIsEdit}
                //                                     />
                //                                 ) : (
                //                                     <ArticleDetail
                //                                         oakId={editArticle}
                //                                         oakAutoUnmount={true}
                //                                         oakPath={`article-detail-${editArticle}`}
                //                                     />
                //                                 )
                //                             }

                //                         </div>
                //                     </div>
                //                 </div>
                //             )
                //         }
                //     </div>
                // </div>
            )
        }
    }
    return null;
}
