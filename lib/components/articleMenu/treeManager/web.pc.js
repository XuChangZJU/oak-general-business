"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const treeList_1 = tslib_1.__importDefault(require("../treeList"));
const web_pc_module_less_1 = tslib_1.__importDefault(require("./web.pc.module.less"));
const antd_1 = require("antd");
const { Search } = antd_1.Input;
const icons_1 = require("@ant-design/icons");
const upsert_1 = tslib_1.__importDefault(require("../../article/upsert"));
const cell_1 = tslib_1.__importDefault(require("../../article/cell"));
const copy_to_clipboard_1 = tslib_1.__importDefault(require("copy-to-clipboard"));
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
function Render(props) {
    const { entity, entityId, oakFullpath, show, articleMenuId, width, filteredArticles, articleId } = props.data;
    const { gotoDoc, setMessage, gotoArticleDetail, searchArticle, getArticleMenuIdByArticle } = props.methods;
    const [editArticle, setEditArticle] = (0, react_1.useState)('');
    const [breadcrumbItems, setBreadcrumbItems] = (0, react_1.useState)([]);
    const [open, setOpen] = (0, react_1.useState)(true);
    const [addOpen, setAddOpen] = (0, react_1.useState)(false);
    const [selectedArticleId, setSelectedArticleId] = (0, react_1.useState)('');
    const [defaultOpen, setDefaultOpen] = (0, react_1.useState)(true);
    const [openArray, setOpenArray] = (0, react_1.useState)([]);
    const [isEdit, setIsEdit] = (0, react_1.useState)(false);
    const [topInfo, setTopInfo] = (0, react_1.useState)({ name: '', date: 0 });
    const [searchValue, setSearchValue] = (0, react_1.useState)('');
    const [items, setItems] = (0, react_1.useState)([]);
    const [searchOpen, setSearchOpen] = (0, react_1.useState)(false);
    const [searchOpenArray, setSearchOpenArray] = (0, react_1.useState)([]);
    const [sideInfo, setSideInfo] = (0, react_1.useState)({ id: '', name: '', coverUrl: '' });
    const [currentArticle, setCurrentArticle] = (0, react_1.useState)('');
    const dropdownRef = (0, react_1.useRef)(null);
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
    (0, react_1.useEffect)(() => {
        if (editArticle) {
            setSelectedArticleId(editArticle);
            changeIsEdit();
        }
    }, [editArticle]);
    (0, react_1.useEffect)(() => {
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
                    label: ((0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.dropdownItem, onClick: () => {
                            getArticleMenuIdByArticle(ele.id, show);
                        }, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.topBox, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.title, dangerouslySetInnerHTML: { __html: name } }), (0, jsx_runtime_1.jsx)(antd_1.Tag, { className: web_pc_module_less_1.default.tag, children: ele.articleMenu.name })] }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.content, dangerouslySetInnerHTML: { __html: HTMLString } })] }))
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
    (0, react_1.useEffect)(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    (0, react_1.useEffect)(() => {
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
            return ((0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.container, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.menu, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.menuHeader, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.menuTitle, children: "\u83DC\u5355" }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.menuActions, children: (0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.viewAction, children: [(0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: '添加分类', children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}), size: "small", onClick: () => setAddOpen(true) }) }), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: '查看', children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.EyeOutlined, {}), size: "small", onClick: () => gotoDoc() }) })] }) })] }), (0, jsx_runtime_1.jsx)(antd_1.Divider, { style: { margin: 0 } }), (0, jsx_runtime_1.jsx)(treeList_1.default, { oakPath: `${oakFullpath}.articleMenus`, entity: entity, entityId: entityId, onGrandChildEditArticleChange: checkEditArticle, changeAddOpen: changeAddOpen, addOpen: addOpen })] }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.editor, children: editArticle && ((0, jsx_runtime_1.jsx)(upsert_1.default, { oakId: editArticle, oakAutoUnmount: true, oakPath: `article-upsert-${editArticle}` })) })] }));
        }
        else if (show === 'doc') {
            if (width === 'xs') {
                return ((0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.container2, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.article_v, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.topBar, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.menuHeader, onClick: () => {
                                                setOpen(true);
                                            }, children: [(0, jsx_runtime_1.jsx)("div", { children: "\u5E2E\u52A9\u6587\u6863" }), open ? ((0, jsx_runtime_1.jsx)(icons_1.MenuFoldOutlined, { style: {
                                                        fontSize: 18,
                                                    } })) : ((0, jsx_runtime_1.jsx)(icons_1.MenuUnfoldOutlined, { style: {
                                                        fontSize: 18,
                                                    } }))] }), (0, jsx_runtime_1.jsx)(antd_1.Divider, { style: { margin: 0 } })] }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.editor2, children: editArticle && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: 14, display: 'flex', flexDirection: 'row', marginLeft: 10, marginBottom: 5 }, children: breadcrumbItems.length > 0 &&
                                                    breadcrumbItems.map((breadcrumbItem, index) => {
                                                        return index !== breadcrumbItems.length - 1 ? ((0, jsx_runtime_1.jsxs)("div", { style: { color: '#B2B2B2' }, children: [breadcrumbItem, (0, jsx_runtime_1.jsx)("span", { style: { margin: '0 6px' }, children: "/" })] }, index)) : ((0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.breadcrumbItem, children: breadcrumbItem }, index));
                                                    }) }), (0, jsx_runtime_1.jsx)(cell_1.default, { oakId: editArticle, oakAutoUnmount: true, oakPath: `article-detail-${editArticle}` })] })) })] }), (0, jsx_runtime_1.jsx)(antd_1.Drawer, { className: web_pc_module_less_1.default.drawerPanel, open: open, onClose: () => {
                                setOpen(false);
                            }, placement: "left", width: 260, children: (0, jsx_runtime_1.jsx)(treeList_1.default, { oakPath: `${oakFullpath}.articleMenus`, entity: entity, entityId: entityId, onGrandChildEditArticleChange: checkEditArticle, show: show, articleMenuId: articleMenuId ? articleMenuId : undefined, getBreadcrumbItems: getBreadcrumbItems, breadcrumbItems: [], drawerOpen: open, changeDrawerOpen: changeDrawerOpen, selectedArticleId: selectedArticleId ? selectedArticleId : undefined, defaultOpen: defaultOpen, changeDefaultOpen: changeDefaultOpen, openArray: openArray ? openArray : undefined }) })] }));
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
                (0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.test, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.leftBox, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.topBox, children: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.boldFont, children: sideInfo.name }) }), (0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.bottomBox, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.infoBox, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.top, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.left, children: (0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, style: { borderRadius: '50%', width: 50, height: 50 }, src: sideInfo.coverUrl }) }), (0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.right, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.top, children: sideInfo.name }), (0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.bottom, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.circle }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.font, children: "\u5E2E\u52A9\u6587\u6863" })] })] })] }), (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: 'Search...', suffix: (0, jsx_runtime_1.jsx)(icons_1.SearchOutlined, {}) }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.helpFont, children: "\u5E2E\u52A9\u6587\u6863" })] }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.menu, children: (0, jsx_runtime_1.jsx)(treeList_1.default, { oakPath: `${oakFullpath}.articleMenus`, entity: entity, entityId: entityId, onGrandChildEditArticleChange: checkEditArticle, show: show, articleMenuId: articleMenuId ? articleMenuId : undefined, articleId: articleId ? articleId : undefined, getBreadcrumbItems: getBreadcrumbItems, breadcrumbItems: [], selectedArticleId: selectedArticleId ? selectedArticleId : undefined, defaultOpen: defaultOpen, changeDefaultOpen: changeDefaultOpen, openArray: totalOpenArray ? totalOpenArray : undefined, getSearchOpen: getSearchOpen, getTopInfo: getTopInfo, oakAutoUnmount: true, getSideInfo: getSideInfo, currentArticle: currentArticle, setCurrentArticle: getCurrentArticle }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.rightBox, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.topBox, children: [(0, jsx_runtime_1.jsx)(icons_1.MenuOutlined, {}), (0, jsx_runtime_1.jsx)("div", { ref: dropdownRef, children: (0, jsx_runtime_1.jsx)(antd_1.Dropdown, { menu: { items }, open: searchOpen, children: (0, jsx_runtime_1.jsx)(Search, { style: { width: 300 }, placeholder: 'Search...', onChange: (val) => {
                                                        setSearchValue(val.target.value);
                                                        searchArticle(val.target.value);
                                                    } }) }) })] }), editArticle && ((0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.bottomBox, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.breadcrumb, children: breadcrumbItems.length > 0 &&
                                                breadcrumbItems.map((breadcrumbItem, index) => {
                                                    return index !== breadcrumbItems.length - 1 ? ((0, jsx_runtime_1.jsxs)("div", { style: { color: '#B2B2B2' }, children: [breadcrumbItem, (0, jsx_runtime_1.jsx)("span", { style: { margin: '0 6px' }, children: '>' })] }, index)) : ((0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.breadcrumbItem, children: breadcrumbItem }, index));
                                                }) }), (0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.article, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.top, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.title, children: topInfo.name }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.date, children: (0, dayjs_1.default)(topInfo.date).format('YYYY-MM-DD') })] }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.editor, children: (0, jsx_runtime_1.jsx)(cell_1.default, { oakId: editArticle, oakAutoUnmount: true, oakPath: `article-detail-${editArticle}` }) })] })] }))] })] }));
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
            (0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.test, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.leftBox, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.topBox, children: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.boldFont, children: sideInfo.name }) }), (0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.bottomBox, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.infoBox, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.top, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.left, children: (0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, style: { borderRadius: '50%', width: 50, height: 50 }, src: sideInfo.coverUrl }) }), (0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.right, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.top, children: sideInfo.name }), (0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.bottom, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.circle }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.font, children: "\u5E2E\u52A9\u6587\u6863" })] })] })] }), (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: 'Search...', suffix: (0, jsx_runtime_1.jsx)(icons_1.SearchOutlined, {}) }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.helpFont, children: "\u5E2E\u52A9\u6587\u6863" })] }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.menu, children: (0, jsx_runtime_1.jsx)(treeList_1.default, { oakPath: `${oakFullpath}.articleMenus`, entity: entity, entityId: entityId, onGrandChildEditArticleChange: checkEditArticle, show: show, articleMenuId: articleMenuId ? articleMenuId : undefined, articleId: articleId ? articleId : undefined, getBreadcrumbItems: getBreadcrumbItems, breadcrumbItems: [], selectedArticleId: selectedArticleId ? selectedArticleId : undefined, defaultOpen: defaultOpen, changeDefaultOpen: changeDefaultOpen, openArray: totalOpenArray ? totalOpenArray : undefined, getSearchOpen: getSearchOpen, getTopInfo: getTopInfo, oakAutoUnmount: true, getSideInfo: getSideInfo, currentArticle: currentArticle, setCurrentArticle: getCurrentArticle }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.rightBox, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.topBox, children: [(0, jsx_runtime_1.jsx)(icons_1.MenuOutlined, {}), (0, jsx_runtime_1.jsx)("div", { ref: dropdownRef, children: (0, jsx_runtime_1.jsx)(antd_1.Dropdown, { menu: { items }, open: searchOpen, children: (0, jsx_runtime_1.jsx)(Search, { style: { width: 300 }, placeholder: 'Search...', onChange: (val) => {
                                                    setSearchValue(val.target.value);
                                                    searchArticle(val.target.value);
                                                } }) }) })] }), editArticle && ((0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.bottomBox, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.actions, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { style: { marginBottom: 10 }, children: [(0, jsx_runtime_1.jsxs)(antd_1.Button, { onClick: () => {
                                                        gotoArticleDetail(editArticle);
                                                    }, children: [(0, jsx_runtime_1.jsx)(icons_1.EyeOutlined, {}), "\u67E5\u770B"] }), (0, jsx_runtime_1.jsxs)(antd_1.Button, { onClick: () => {
                                                        const url = `${window.location.host}/article/detail?oakId=${editArticle}`;
                                                        (0, copy_to_clipboard_1.default)(url);
                                                        setMessage({
                                                            content: '复制链接成功',
                                                            type: 'success',
                                                        });
                                                    }, children: [(0, jsx_runtime_1.jsx)(icons_1.CopyOutlined, {}), "\u590D\u5236\u94FE\u63A5"] }), (0, jsx_runtime_1.jsxs)(antd_1.Button, { onClick: () => setIsEdit(true), children: [(0, jsx_runtime_1.jsx)(icons_1.EditOutlined, {}), "\u66F4\u65B0"] })] }) }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.breadcrumb, children: breadcrumbItems.length > 0 &&
                                            breadcrumbItems.map((breadcrumbItem, index) => {
                                                return index !== breadcrumbItems.length - 1 ? ((0, jsx_runtime_1.jsxs)("div", { style: { color: '#B2B2B2' }, children: [breadcrumbItem, (0, jsx_runtime_1.jsx)("span", { style: { margin: '0 6px' }, children: '>' })] }, index)) : ((0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.breadcrumbItem, children: breadcrumbItem }, index));
                                            }) }), (0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.article, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.top, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.title, children: topInfo.name }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.date, children: (0, dayjs_1.default)(topInfo.date).format('YYYY-MM-DD') })] }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.editor, children: isEdit ? ((0, jsx_runtime_1.jsx)(upsert_1.default, { oakId: editArticle, oakAutoUnmount: true, oakPath: `article-upsert-${editArticle}`, changeIsEdit: changeIsEdit })) : ((0, jsx_runtime_1.jsx)(cell_1.default, { oakId: editArticle, oakAutoUnmount: true, oakPath: `article-detail-${editArticle}` })) })] })] }))] })] }));
        }
    }
    return null;
}
exports.default = Render;
