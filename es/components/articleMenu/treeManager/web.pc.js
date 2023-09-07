import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
import TreeList from '../treeList';
import Styles from './web.pc.module.less';
import { Button, Divider, Tooltip, Space, Drawer, Input, Image, Tag, Dropdown } from 'antd';
const { Search } = Input;
import { EyeOutlined, CopyOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined, EditOutlined, MenuOutlined, SearchOutlined } from '@ant-design/icons';
import ArticleUpsert from '../../article/upsert';
import ArticleDetail from '../../article/cell';
import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';
export default function Render(props) {
    const { entity, entityId, oakFullpath, show, articleMenuId, width, filteredArticles, articleId } = props.data;
    const { gotoDoc, setMessage, gotoArticleDetail, searchArticle, getArticleMenuIdByArticle } = props.methods;
    const [editArticle, setEditArticle] = useState('');
    const [breadcrumbItems, setBreadcrumbItems] = useState([]);
    const [open, setOpen] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    const [selectedArticleId, setSelectedArticleId] = useState('');
    const [defaultOpen, setDefaultOpen] = useState(true);
    const [openArray, setOpenArray] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [topInfo, setTopInfo] = useState({ name: '', date: 0 });
    const [searchValue, setSearchValue] = useState('');
    const [items, setItems] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchOpenArray, setSearchOpenArray] = useState([]);
    const [sideInfo, setSideInfo] = useState({ id: '', name: '', coverUrl: '' });
    const [currentArticle, setCurrentArticle] = useState('');
    const dropdownRef = useRef(null);
    const changeIsEdit = () => {
        setIsEdit(false);
    };
    const changeDefaultOpen = (defaultOpen, openArray) => {
        setDefaultOpen(defaultOpen);
        setOpenArray(openArray);
    };
    const changeAddOpen = (addOpen) => {
        setAddOpen(addOpen);
    };
    const checkEditArticle = (data) => {
        setEditArticle(data);
    };
    const getBreadcrumbItems = (breadcrumbItems) => {
        setBreadcrumbItems(breadcrumbItems);
    };
    const changeDrawerOpen = (open) => {
        setOpen(open);
    };
    const getTopInfo = (data) => {
        setTopInfo(data);
    };
    const getSearchOpen = (searchOpenArray) => {
        setSearchOpenArray(searchOpenArray);
    };
    const getSideInfo = (data) => {
        setSideInfo(data);
    };
    const getCurrentArticle = (id) => {
        setCurrentArticle(id);
    };
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
                }
                else {
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
                    label: (_jsxs("div", { className: Styles.dropdownItem, onClick: () => {
                            getArticleMenuIdByArticle(ele.id, show);
                        }, children: [_jsxs("div", { className: Styles.topBox, children: [_jsx("div", { className: Styles.title, dangerouslySetInnerHTML: { __html: name } }), _jsx(Tag, { className: Styles.tag, children: ele.articleMenu.name })] }), _jsx("div", { className: Styles.content, dangerouslySetInnerHTML: { __html: HTMLString } })] }))
                };
            });
            setItems(arr);
            setSearchOpen(true);
        }
        else {
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
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setSearchOpen(false);
        }
    };
    let totalOpenArray = [];
    if (searchOpenArray && searchOpenArray.length > 0) {
        totalOpenArray = [...searchOpenArray];
    }
    else {
        totalOpenArray = [...openArray];
    }
    if (oakFullpath) {
        if (!show) {
            return (_jsxs("div", { className: Styles.container, children: [_jsxs("div", { className: Styles.menu, children: [_jsxs("div", { className: Styles.menuHeader, children: [_jsx("div", { className: Styles.menuTitle, children: "\u83DC\u5355" }), _jsx("div", { className: Styles.menuActions, children: _jsxs("div", { className: Styles.viewAction, children: [_jsx(Tooltip, { title: '添加分类', children: _jsx(Button, { type: "text", icon: _jsx(PlusOutlined, {}), size: "small", onClick: () => setAddOpen(true) }) }), _jsx(Tooltip, { title: '查看', children: _jsx(Button, { type: "text", icon: _jsx(EyeOutlined, {}), size: "small", onClick: () => gotoDoc() }) })] }) })] }), _jsx(Divider, { style: { margin: 0 } }), _jsx(TreeList, { oakPath: `${oakFullpath}.articleMenus`, entity: entity, entityId: entityId, onGrandChildEditArticleChange: checkEditArticle, changeAddOpen: changeAddOpen, addOpen: addOpen })] }), _jsx("div", { className: Styles.editor, children: editArticle && (_jsx(ArticleUpsert, { oakId: editArticle, oakAutoUnmount: true, oakPath: `article-upsert-${editArticle}` })) })] }));
        }
        else if (show === 'doc') {
            if (width === 'xs') {
                return (_jsxs("div", { className: Styles.container2, children: [_jsxs("div", { className: Styles.article_v, children: [_jsxs("div", { className: Styles.topBar, children: [_jsxs("div", { className: Styles.menuHeader, onClick: () => {
                                                setOpen(true);
                                            }, children: [_jsx("div", { children: "\u5E2E\u52A9\u6587\u6863" }), open ? (_jsx(MenuFoldOutlined, { style: {
                                                        fontSize: 18,
                                                    } })) : (_jsx(MenuUnfoldOutlined, { style: {
                                                        fontSize: 18,
                                                    } }))] }), _jsx(Divider, { style: { margin: 0 } })] }), _jsx("div", { className: Styles.editor2, children: editArticle && (_jsxs("div", { children: [_jsx("div", { style: { fontSize: 14, display: 'flex', flexDirection: 'row', marginLeft: 10, marginBottom: 5 }, children: breadcrumbItems.length > 0 &&
                                                    breadcrumbItems.map((breadcrumbItem, index) => {
                                                        return index !== breadcrumbItems.length - 1 ? (_jsxs("div", { style: { color: '#B2B2B2' }, children: [breadcrumbItem, _jsx("span", { style: { margin: '0 6px' }, children: "/" })] }, index)) : (_jsx("div", { className: Styles.breadcrumbItem, children: breadcrumbItem }, index));
                                                    }) }), _jsx(ArticleDetail, { oakId: editArticle, oakAutoUnmount: true, oakPath: `article-detail-${editArticle}` })] })) })] }), _jsx(Drawer, { className: Styles.drawerPanel, open: open, onClose: () => {
                                setOpen(false);
                            }, placement: "left", width: 260, children: _jsx(TreeList, { oakPath: `${oakFullpath}.articleMenus`, entity: entity, entityId: entityId, onGrandChildEditArticleChange: checkEditArticle, show: show, articleMenuId: articleMenuId ? articleMenuId : undefined, getBreadcrumbItems: getBreadcrumbItems, breadcrumbItems: [], drawerOpen: open, changeDrawerOpen: changeDrawerOpen, selectedArticleId: selectedArticleId ? selectedArticleId : undefined, defaultOpen: defaultOpen, changeDefaultOpen: changeDefaultOpen, openArray: openArray ? openArray : undefined }) })] }));
            }
            else {
                return (
                // <div className={Styles.container2}>
                //     <div className={Styles.menu}>
                //         <TreeList
                //             oakPath={`${oakFullpath}.articleMenus`}
                //             entity={entity}
                //             entityId={entityId}
                //             onGrandChildEditArticleChange={checkEditArticle}
                //             show={show}
                //             articleMenuId={articleMenuId ? articleMenuId : undefined}
                //             getBreadcrumbItems={getBreadcrumbItems}
                //             breadcrumbItems={[]}
                //             selectedArticleId={selectedArticleId ? selectedArticleId : undefined}
                //             defaultOpen={defaultOpen}
                //             changeDefaultOpen={changeDefaultOpen}
                //             openArray={openArray ? openArray : undefined}
                //         />
                //     </div>
                //     <div className={Styles.editor}>
                //         {
                //             editArticle && (
                //                 <div>
                //                     <div style={{ fontSize: 14, display: 'flex', flexDirection: 'row', marginLeft: 10, marginBottom: 5 }}>
                //                         {
                //                             breadcrumbItems.length > 0 &&
                //                             breadcrumbItems.map((breadcrumbItem: string, index: number) => {
                //                                 return index !== breadcrumbItems.length - 1 ? (
                //                                     <div style={{ color: '#B2B2B2' }} key={index}>
                //                                         {breadcrumbItem}
                //                                         <span style={{ margin: '0 6px' }}>/</span>
                //                                     </div>
                //                                 ) : (
                //                                     <div className={Styles.breadcrumbItem} key={index}>
                //                                         {breadcrumbItem}
                //                                     </div>
                //                                 )
                //                             })
                //                         }
                //                     </div>
                //                     <ArticleDetail
                //                         oakId={editArticle}
                //                         oakAutoUnmount={true}
                //                         oakPath={`article-detail-${editArticle}`}
                //                     />
                //                 </div>
                //             )
                //         }
                //     </div>
                // </div>
                _jsxs("div", { className: Styles.test, children: [_jsxs("div", { className: Styles.leftBox, children: [_jsx("div", { className: Styles.topBox, children: _jsx("div", { className: Styles.boldFont, children: sideInfo.name }) }), _jsxs("div", { className: Styles.bottomBox, children: [_jsxs("div", { className: Styles.infoBox, children: [_jsxs("div", { className: Styles.top, children: [_jsx("div", { className: Styles.left, children: _jsx(Image, { preview: false, style: { borderRadius: '50%', width: 50, height: 50 }, src: sideInfo.coverUrl }) }), _jsxs("div", { className: Styles.right, children: [_jsx("div", { className: Styles.top, children: sideInfo.name }), _jsxs("div", { className: Styles.bottom, children: [_jsx("div", { className: Styles.circle }), _jsx("div", { className: Styles.font, children: "\u5E2E\u52A9\u6587\u6863" })] })] })] }), _jsx(Input, { placeholder: 'Search...', suffix: _jsx(SearchOutlined, {}) }), _jsx("div", { className: Styles.helpFont, children: "\u5E2E\u52A9\u6587\u6863" })] }), _jsx("div", { className: Styles.menu, children: _jsx(TreeList, { oakPath: `${oakFullpath}.articleMenus`, entity: entity, entityId: entityId, onGrandChildEditArticleChange: checkEditArticle, show: show, articleMenuId: articleMenuId ? articleMenuId : undefined, articleId: articleId ? articleId : undefined, getBreadcrumbItems: getBreadcrumbItems, breadcrumbItems: [], selectedArticleId: selectedArticleId ? selectedArticleId : undefined, defaultOpen: defaultOpen, changeDefaultOpen: changeDefaultOpen, openArray: totalOpenArray ? totalOpenArray : undefined, getSearchOpen: getSearchOpen, getTopInfo: getTopInfo, oakAutoUnmount: true, getSideInfo: getSideInfo, currentArticle: currentArticle, setCurrentArticle: getCurrentArticle }) })] })] }), _jsxs("div", { className: Styles.rightBox, children: [_jsxs("div", { className: Styles.topBox, children: [_jsx(MenuOutlined, {}), _jsx("div", { ref: dropdownRef, children: _jsx(Dropdown, { menu: { items }, open: searchOpen, children: _jsx(Search, { style: { width: 300 }, placeholder: 'Search...', onChange: (val) => {
                                                        setSearchValue(val.target.value);
                                                        searchArticle(val.target.value);
                                                    } }) }) })] }), editArticle && (_jsxs("div", { className: Styles.bottomBox, children: [_jsx("div", { className: Styles.breadcrumb, children: breadcrumbItems.length > 0 &&
                                                breadcrumbItems.map((breadcrumbItem, index) => {
                                                    return index !== breadcrumbItems.length - 1 ? (_jsxs("div", { style: { color: '#B2B2B2' }, children: [breadcrumbItem, _jsx("span", { style: { margin: '0 6px' }, children: '>' })] }, index)) : (_jsx("div", { className: Styles.breadcrumbItem, children: breadcrumbItem }, index));
                                                }) }), _jsxs("div", { className: Styles.article, children: [_jsxs("div", { className: Styles.top, children: [_jsx("div", { className: Styles.title, children: topInfo.name }), _jsx("div", { className: Styles.date, children: dayjs(topInfo.date).format('YYYY-MM-DD') })] }), _jsx("div", { className: Styles.editor, children: _jsx(ArticleDetail, { oakId: editArticle, oakAutoUnmount: true, oakPath: `article-detail-${editArticle}` }) })] })] }))] })] }));
            }
        }
        else {
            return (
            // <div className={Styles.container3}>
            //     <div className={Styles.menu}>
            //         <TreeList
            //             oakPath={`${oakFullpath}.articleMenus`}
            //             entity={entity}
            //             entityId={entityId}
            //             onGrandChildEditArticleChange={checkEditArticle}
            //             show={show}
            //             getBreadcrumbItems={getBreadcrumbItems}
            //             breadcrumbItems={[]}
            //             selectedArticleId={selectedArticleId ? selectedArticleId : undefined}
            //             defaultOpen={defaultOpen}
            //             changeDefaultOpen={changeDefaultOpen}
            //             openArray={openArray ? openArray : undefined}
            //         />
            //     </div>
            //     <div className={Styles.editor}>
            //         {
            //             editArticle && (
            //                 <div>
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
            //                     <div style={{ fontSize: 14, display: 'flex', flexDirection: 'row', marginLeft: 10, marginBottom: 5 }}>
            //                         {
            //                             breadcrumbItems.length > 0 &&
            //                             breadcrumbItems.map((breadcrumbItem: string, index: number) => {
            //                                 return index !== breadcrumbItems.length - 1 ? (
            //                                     <div style={{ color: '#B2B2B2' }} key={index}>
            //                                         {breadcrumbItem}
            //                                         <span style={{ margin: '0 6px' }}>/</span>
            //                                     </div>
            //                                 ) : (
            //                                     <div className={Styles.breadcrumbItem} key={index}>
            //                                         {breadcrumbItem}
            //                                     </div>
            //                                 )
            //                             })
            //                         }
            //                     </div>
            //                     {
            //                         isEdit ? (
            //                             <ArticleUpsert
            //                                 oakId={editArticle}
            //                                 oakAutoUnmount={true}
            //                                 oakPath={`article-upsert-${editArticle}`}
            //                                 changeIsEdit={changeIsEdit}
            //                             />
            //                         ) : (
            //                             <ArticleDetail
            //                                 oakId={editArticle}
            //                                 oakAutoUnmount={true}
            //                                 oakPath={`article-detail-${editArticle}`}
            //                             />
            //                         )
            //                     }
            //                 </div>
            //             )
            //         }
            //     </div>
            // </div>
            _jsxs("div", { className: Styles.test, children: [_jsxs("div", { className: Styles.leftBox, children: [_jsx("div", { className: Styles.topBox, children: _jsx("div", { className: Styles.boldFont, children: sideInfo.name }) }), _jsxs("div", { className: Styles.bottomBox, children: [_jsxs("div", { className: Styles.infoBox, children: [_jsxs("div", { className: Styles.top, children: [_jsx("div", { className: Styles.left, children: _jsx(Image, { preview: false, style: { borderRadius: '50%', width: 50, height: 50 }, src: sideInfo.coverUrl }) }), _jsxs("div", { className: Styles.right, children: [_jsx("div", { className: Styles.top, children: sideInfo.name }), _jsxs("div", { className: Styles.bottom, children: [_jsx("div", { className: Styles.circle }), _jsx("div", { className: Styles.font, children: "\u5E2E\u52A9\u6587\u6863" })] })] })] }), _jsx(Input, { placeholder: 'Search...', suffix: _jsx(SearchOutlined, {}) }), _jsx("div", { className: Styles.helpFont, children: "\u5E2E\u52A9\u6587\u6863" })] }), _jsx("div", { className: Styles.menu, children: _jsx(TreeList, { oakPath: `${oakFullpath}.articleMenus`, entity: entity, entityId: entityId, onGrandChildEditArticleChange: checkEditArticle, show: show, articleMenuId: articleMenuId ? articleMenuId : undefined, articleId: articleId ? articleId : undefined, getBreadcrumbItems: getBreadcrumbItems, breadcrumbItems: [], selectedArticleId: selectedArticleId ? selectedArticleId : undefined, defaultOpen: defaultOpen, changeDefaultOpen: changeDefaultOpen, openArray: totalOpenArray ? totalOpenArray : undefined, getSearchOpen: getSearchOpen, getTopInfo: getTopInfo, oakAutoUnmount: true, getSideInfo: getSideInfo, currentArticle: currentArticle, setCurrentArticle: getCurrentArticle }) })] })] }), _jsxs("div", { className: Styles.rightBox, children: [_jsxs("div", { className: Styles.topBox, children: [_jsx(MenuOutlined, {}), _jsx("div", { ref: dropdownRef, children: _jsx(Dropdown, { menu: { items }, open: searchOpen, children: _jsx(Search, { style: { width: 300 }, placeholder: 'Search...', onChange: (val) => {
                                                    setSearchValue(val.target.value);
                                                    searchArticle(val.target.value);
                                                } }) }) })] }), editArticle && (_jsxs("div", { className: Styles.bottomBox, children: [_jsx("div", { className: Styles.actions, children: _jsxs(Space, { style: { marginBottom: 10 }, children: [_jsxs(Button, { onClick: () => {
                                                        gotoArticleDetail(editArticle);
                                                    }, children: [_jsx(EyeOutlined, {}), "\u67E5\u770B"] }), _jsxs(Button, { onClick: () => {
                                                        const url = `${window.location.host}/article/detail?oakId=${editArticle}`;
                                                        copy(url);
                                                        setMessage({
                                                            content: '复制链接成功',
                                                            type: 'success',
                                                        });
                                                    }, children: [_jsx(CopyOutlined, {}), "\u590D\u5236\u94FE\u63A5"] }), _jsxs(Button, { onClick: () => setIsEdit(true), children: [_jsx(EditOutlined, {}), "\u66F4\u65B0"] })] }) }), _jsx("div", { className: Styles.breadcrumb, children: breadcrumbItems.length > 0 &&
                                            breadcrumbItems.map((breadcrumbItem, index) => {
                                                return index !== breadcrumbItems.length - 1 ? (_jsxs("div", { style: { color: '#B2B2B2' }, children: [breadcrumbItem, _jsx("span", { style: { margin: '0 6px' }, children: '>' })] }, index)) : (_jsx("div", { className: Styles.breadcrumbItem, children: breadcrumbItem }, index));
                                            }) }), _jsxs("div", { className: Styles.article, children: [_jsxs("div", { className: Styles.top, children: [_jsx("div", { className: Styles.title, children: topInfo.name }), _jsx("div", { className: Styles.date, children: dayjs(topInfo.date).format('YYYY-MM-DD') })] }), _jsx("div", { className: Styles.editor, children: isEdit ? (_jsx(ArticleUpsert, { oakId: editArticle, oakAutoUnmount: true, oakPath: `article-upsert-${editArticle}`, changeIsEdit: changeIsEdit })) : (_jsx(ArticleDetail, { oakId: editArticle, oakAutoUnmount: true, oakPath: `article-detail-${editArticle}` })) })] })] }))] })] }));
        }
    }
    return null;
}
