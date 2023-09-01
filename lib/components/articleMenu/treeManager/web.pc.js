"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var treeList_1 = tslib_1.__importDefault(require("../treeList"));
var web_pc_module_less_1 = tslib_1.__importDefault(require("./web.pc.module.less"));
var antd_1 = require("antd");
var Search = antd_1.Input.Search;
var icons_1 = require("@ant-design/icons");
var upsert_1 = tslib_1.__importDefault(require("../../article/upsert"));
var cell_1 = tslib_1.__importDefault(require("../../article/cell"));
var copy_to_clipboard_1 = tslib_1.__importDefault(require("copy-to-clipboard"));
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
function Render(props) {
    var _a = props.data, entity = _a.entity, entityId = _a.entityId, oakFullpath = _a.oakFullpath, show = _a.show, articleMenuId = _a.articleMenuId, width = _a.width, filteredArticles = _a.filteredArticles, articleId = _a.articleId;
    var _b = props.methods, gotoDoc = _b.gotoDoc, setMessage = _b.setMessage, gotoArticleDetail = _b.gotoArticleDetail, searchArticle = _b.searchArticle, getArticleMenuIdByArticle = _b.getArticleMenuIdByArticle;
    var _c = tslib_1.__read((0, react_1.useState)(''), 2), editArticle = _c[0], setEditArticle = _c[1];
    var _d = tslib_1.__read((0, react_1.useState)([]), 2), breadcrumbItems = _d[0], setBreadcrumbItems = _d[1];
    var _e = tslib_1.__read((0, react_1.useState)(true), 2), open = _e[0], setOpen = _e[1];
    var _f = tslib_1.__read((0, react_1.useState)(false), 2), addOpen = _f[0], setAddOpen = _f[1];
    var _g = tslib_1.__read((0, react_1.useState)(''), 2), selectedArticleId = _g[0], setSelectedArticleId = _g[1];
    var _h = tslib_1.__read((0, react_1.useState)(true), 2), defaultOpen = _h[0], setDefaultOpen = _h[1];
    var _j = tslib_1.__read((0, react_1.useState)([]), 2), openArray = _j[0], setOpenArray = _j[1];
    var _k = tslib_1.__read((0, react_1.useState)(false), 2), isEdit = _k[0], setIsEdit = _k[1];
    var _l = tslib_1.__read((0, react_1.useState)({ name: '', date: 0 }), 2), topInfo = _l[0], setTopInfo = _l[1];
    var _m = tslib_1.__read((0, react_1.useState)(''), 2), searchValue = _m[0], setSearchValue = _m[1];
    var _o = tslib_1.__read((0, react_1.useState)([]), 2), items = _o[0], setItems = _o[1];
    var _p = tslib_1.__read((0, react_1.useState)(false), 2), searchOpen = _p[0], setSearchOpen = _p[1];
    var _q = tslib_1.__read((0, react_1.useState)([]), 2), searchOpenArray = _q[0], setSearchOpenArray = _q[1];
    var _r = tslib_1.__read((0, react_1.useState)({ id: '', name: '', coverUrl: '' }), 2), sideInfo = _r[0], setSideInfo = _r[1];
    var _s = tslib_1.__read((0, react_1.useState)(''), 2), currentArticle = _s[0], setCurrentArticle = _s[1];
    var dropdownRef = (0, react_1.useRef)(null);
    var changeIsEdit = function () {
        setIsEdit(false);
    };
    var changeDefaultOpen = function (defaultOpen, openArray) {
        setDefaultOpen(defaultOpen);
        setOpenArray(openArray);
    };
    var changeAddOpen = function (addOpen) {
        setAddOpen(addOpen);
    };
    var checkEditArticle = function (data) {
        setEditArticle(data);
    };
    var getBreadcrumbItems = function (breadcrumbItems) {
        setBreadcrumbItems(breadcrumbItems);
    };
    var changeDrawerOpen = function (open) {
        setOpen(open);
    };
    var getTopInfo = function (data) {
        setTopInfo(data);
    };
    var getSearchOpen = function (searchOpenArray) {
        setSearchOpenArray(searchOpenArray);
    };
    var getSideInfo = function (data) {
        setSideInfo(data);
    };
    var getCurrentArticle = function (id) {
        setCurrentArticle(id);
    };
    (0, react_1.useEffect)(function () {
        if (editArticle) {
            setSelectedArticleId(editArticle);
            changeIsEdit();
        }
    }, [editArticle]);
    (0, react_1.useEffect)(function () {
        if (filteredArticles && filteredArticles.length > 0) {
            var pattern_1 = new RegExp('<p>.*?' + searchValue + '.*?</p>');
            var arr = filteredArticles.map(function (ele) {
                var match = pattern_1.exec(ele.content);
                var HTMLString = '';
                var name = "<div>".concat(ele.name, "</div>");
                if (match) {
                    var content = match[0].replace(/<\/?[^>]+(>|$)/g, "");
                    var contentPattern = new RegExp(searchValue);
                    var highlightContent = content.replace(contentPattern, '<span style="color: #3f7644">$&</span>');
                    HTMLString = '<div>' + highlightContent + '</div>';
                }
                else {
                    var namePattern = new RegExp(searchValue);
                    var contentPattern = /<p>.*?<\/p>/;
                    var contentMatch = contentPattern.exec(ele.content);
                    if (contentMatch) {
                        var content = contentMatch[0].replace(/<\/?[^>]+(>|$)/g, "");
                        HTMLString = '<div>' + content + '</div>';
                    }
                    name = name.replace(namePattern, '<span style="color: #3f7644">$&</span>');
                }
                return {
                    key: ele.id,
                    label: ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.dropdownItem, onClick: function () {
                            getArticleMenuIdByArticle(ele.id, show);
                        } }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.topBox }, { children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.title, dangerouslySetInnerHTML: { __html: name } }), (0, jsx_runtime_1.jsx)(antd_1.Tag, tslib_1.__assign({ className: web_pc_module_less_1.default.tag }, { children: ele.articleMenu.name }))] })), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.content, dangerouslySetInnerHTML: { __html: HTMLString } })] })))
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
    (0, react_1.useEffect)(function () {
        document.addEventListener('click', handleClickOutside);
        return function () {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    (0, react_1.useEffect)(function () {
        if (articleId) {
            setEditArticle(articleId);
        }
    }, [articleId]);
    var handleClickOutside = function (event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setSearchOpen(false);
        }
    };
    var totalOpenArray = [];
    if (searchOpenArray && searchOpenArray.length > 0) {
        totalOpenArray = tslib_1.__spreadArray([], tslib_1.__read(searchOpenArray), false);
    }
    else {
        totalOpenArray = tslib_1.__spreadArray([], tslib_1.__read(openArray), false);
    }
    if (oakFullpath) {
        if (!show) {
            return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.menu }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.menuHeader }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.menuTitle }, { children: "\u83DC\u5355" })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.menuActions }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.viewAction }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Tooltip, tslib_1.__assign({ title: '添加分类' }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}), size: "small", onClick: function () { return setAddOpen(true); } }) })), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, tslib_1.__assign({ title: '查看' }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.EyeOutlined, {}), size: "small", onClick: function () { return gotoDoc(); } }) }))] })) }))] })), (0, jsx_runtime_1.jsx)(antd_1.Divider, { style: { margin: 0 } }), (0, jsx_runtime_1.jsx)(treeList_1.default, { oakPath: "".concat(oakFullpath, ".articleMenus"), entity: entity, entityId: entityId, onGrandChildEditArticleChange: checkEditArticle, changeAddOpen: changeAddOpen, addOpen: addOpen })] })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.editor }, { children: editArticle && ((0, jsx_runtime_1.jsx)(upsert_1.default, { oakId: editArticle, oakAutoUnmount: true, oakPath: "article-upsert-".concat(editArticle) })) }))] })));
        }
        else if (show === 'doc') {
            if (width === 'xs') {
                return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.container2 }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.article_v }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.topBar }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.menuHeader, onClick: function () {
                                                setOpen(true);
                                            } }, { children: [(0, jsx_runtime_1.jsx)("div", { children: "\u5E2E\u52A9\u6587\u6863" }), open ? ((0, jsx_runtime_1.jsx)(icons_1.MenuFoldOutlined, { style: {
                                                        fontSize: 18,
                                                    } })) : ((0, jsx_runtime_1.jsx)(icons_1.MenuUnfoldOutlined, { style: {
                                                        fontSize: 18,
                                                    } }))] })), (0, jsx_runtime_1.jsx)(antd_1.Divider, { style: { margin: 0 } })] })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.editor2 }, { children: editArticle && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { fontSize: 14, display: 'flex', flexDirection: 'row', marginLeft: 10, marginBottom: 5 } }, { children: breadcrumbItems.length > 0 &&
                                                    breadcrumbItems.map(function (breadcrumbItem, index) {
                                                        return index !== breadcrumbItems.length - 1 ? ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ style: { color: '#B2B2B2' } }, { children: [breadcrumbItem, (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ style: { margin: '0 6px' } }, { children: "/" }))] }), index)) : ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.breadcrumbItem }, { children: breadcrumbItem }), index));
                                                    }) })), (0, jsx_runtime_1.jsx)(cell_1.default, { oakId: editArticle, oakAutoUnmount: true, oakPath: "article-detail-".concat(editArticle) })] })) }))] })), (0, jsx_runtime_1.jsx)(antd_1.Drawer, tslib_1.__assign({ className: web_pc_module_less_1.default.drawerPanel, open: open, onClose: function () {
                                setOpen(false);
                            }, placement: "left", width: 260 }, { children: (0, jsx_runtime_1.jsx)(treeList_1.default, { oakPath: "".concat(oakFullpath, ".articleMenus"), entity: entity, entityId: entityId, onGrandChildEditArticleChange: checkEditArticle, show: show, articleMenuId: articleMenuId ? articleMenuId : undefined, getBreadcrumbItems: getBreadcrumbItems, breadcrumbItems: [], drawerOpen: open, changeDrawerOpen: changeDrawerOpen, selectedArticleId: selectedArticleId ? selectedArticleId : undefined, defaultOpen: defaultOpen, changeDefaultOpen: changeDefaultOpen, openArray: openArray ? openArray : undefined }) }))] })));
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
                (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.test }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.leftBox }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.topBox }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.boldFont }, { children: sideInfo.name })) })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.bottomBox }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.infoBox }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.top }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.left }, { children: (0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, style: { borderRadius: '50%', width: 50, height: 50 }, src: sideInfo.coverUrl }) })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.right }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.top }, { children: sideInfo.name })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.bottom }, { children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.circle }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.font }, { children: "\u5E2E\u52A9\u6587\u6863" }))] }))] }))] })), (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: 'Search...', suffix: (0, jsx_runtime_1.jsx)(icons_1.SearchOutlined, {}) }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.helpFont }, { children: "\u5E2E\u52A9\u6587\u6863" }))] })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.menu }, { children: (0, jsx_runtime_1.jsx)(treeList_1.default, { oakPath: "".concat(oakFullpath, ".articleMenus"), entity: entity, entityId: entityId, onGrandChildEditArticleChange: checkEditArticle, show: show, articleMenuId: articleMenuId ? articleMenuId : undefined, articleId: articleId ? articleId : undefined, getBreadcrumbItems: getBreadcrumbItems, breadcrumbItems: [], selectedArticleId: selectedArticleId ? selectedArticleId : undefined, defaultOpen: defaultOpen, changeDefaultOpen: changeDefaultOpen, openArray: totalOpenArray ? totalOpenArray : undefined, getSearchOpen: getSearchOpen, getTopInfo: getTopInfo, oakAutoUnmount: true, getSideInfo: getSideInfo, currentArticle: currentArticle, setCurrentArticle: getCurrentArticle }) }))] }))] })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.rightBox }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.topBox }, { children: [(0, jsx_runtime_1.jsx)(icons_1.MenuOutlined, {}), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ ref: dropdownRef }, { children: (0, jsx_runtime_1.jsx)(antd_1.Dropdown, tslib_1.__assign({ menu: { items: items }, open: searchOpen }, { children: (0, jsx_runtime_1.jsx)(Search, { style: { width: 300 }, placeholder: 'Search...', onChange: function (val) {
                                                        setSearchValue(val.target.value);
                                                        searchArticle(val.target.value);
                                                    } }) })) }))] })), editArticle && ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.bottomBox }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.breadcrumb }, { children: breadcrumbItems.length > 0 &&
                                                breadcrumbItems.map(function (breadcrumbItem, index) {
                                                    return index !== breadcrumbItems.length - 1 ? ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ style: { color: '#B2B2B2' } }, { children: [breadcrumbItem, (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ style: { margin: '0 6px' } }, { children: '>' }))] }), index)) : ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.breadcrumbItem }, { children: breadcrumbItem }), index));
                                                }) })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.article }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.top }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.title }, { children: topInfo.name })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.date }, { children: (0, dayjs_1.default)(topInfo.date).format('YYYY-MM-DD') }))] })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.editor }, { children: (0, jsx_runtime_1.jsx)(cell_1.default, { oakId: editArticle, oakAutoUnmount: true, oakPath: "article-detail-".concat(editArticle) }) }))] }))] })))] }))] })));
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
            (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.test }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.leftBox }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.topBox }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.boldFont }, { children: sideInfo.name })) })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.bottomBox }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.infoBox }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.top }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.left }, { children: (0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, style: { borderRadius: '50%', width: 50, height: 50 }, src: sideInfo.coverUrl }) })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.right }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.top }, { children: sideInfo.name })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.bottom }, { children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.circle }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.font }, { children: "\u5E2E\u52A9\u6587\u6863" }))] }))] }))] })), (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: 'Search...', suffix: (0, jsx_runtime_1.jsx)(icons_1.SearchOutlined, {}) }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.helpFont }, { children: "\u5E2E\u52A9\u6587\u6863" }))] })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.menu }, { children: (0, jsx_runtime_1.jsx)(treeList_1.default, { oakPath: "".concat(oakFullpath, ".articleMenus"), entity: entity, entityId: entityId, onGrandChildEditArticleChange: checkEditArticle, show: show, articleMenuId: articleMenuId ? articleMenuId : undefined, articleId: articleId ? articleId : undefined, getBreadcrumbItems: getBreadcrumbItems, breadcrumbItems: [], selectedArticleId: selectedArticleId ? selectedArticleId : undefined, defaultOpen: defaultOpen, changeDefaultOpen: changeDefaultOpen, openArray: totalOpenArray ? totalOpenArray : undefined, getSearchOpen: getSearchOpen, getTopInfo: getTopInfo, oakAutoUnmount: true, getSideInfo: getSideInfo, currentArticle: currentArticle, setCurrentArticle: getCurrentArticle }) }))] }))] })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.rightBox }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.topBox }, { children: [(0, jsx_runtime_1.jsx)(icons_1.MenuOutlined, {}), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ ref: dropdownRef }, { children: (0, jsx_runtime_1.jsx)(antd_1.Dropdown, tslib_1.__assign({ menu: { items: items }, open: searchOpen }, { children: (0, jsx_runtime_1.jsx)(Search, { style: { width: 300 }, placeholder: 'Search...', onChange: function (val) {
                                                    setSearchValue(val.target.value);
                                                    searchArticle(val.target.value);
                                                } }) })) }))] })), editArticle && ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.bottomBox }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.actions }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, tslib_1.__assign({ style: { marginBottom: 10 } }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                                        gotoArticleDetail(editArticle);
                                                    } }, { children: [(0, jsx_runtime_1.jsx)(icons_1.EyeOutlined, {}), "\u67E5\u770B"] })), (0, jsx_runtime_1.jsxs)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                                        var url = "".concat(window.location.host, "/article/detail?oakId=").concat(editArticle);
                                                        (0, copy_to_clipboard_1.default)(url);
                                                        setMessage({
                                                            content: '复制链接成功',
                                                            type: 'success',
                                                        });
                                                    } }, { children: [(0, jsx_runtime_1.jsx)(icons_1.CopyOutlined, {}), "\u590D\u5236\u94FE\u63A5"] })), (0, jsx_runtime_1.jsxs)(antd_1.Button, tslib_1.__assign({ onClick: function () { return setIsEdit(true); } }, { children: [(0, jsx_runtime_1.jsx)(icons_1.EditOutlined, {}), "\u66F4\u65B0"] }))] })) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.breadcrumb }, { children: breadcrumbItems.length > 0 &&
                                            breadcrumbItems.map(function (breadcrumbItem, index) {
                                                return index !== breadcrumbItems.length - 1 ? ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ style: { color: '#B2B2B2' } }, { children: [breadcrumbItem, (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ style: { margin: '0 6px' } }, { children: '>' }))] }), index)) : ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.breadcrumbItem }, { children: breadcrumbItem }), index));
                                            }) })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.article }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.top }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.title }, { children: topInfo.name })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.date }, { children: (0, dayjs_1.default)(topInfo.date).format('YYYY-MM-DD') }))] })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.editor }, { children: isEdit ? ((0, jsx_runtime_1.jsx)(upsert_1.default, { oakId: editArticle, oakAutoUnmount: true, oakPath: "article-upsert-".concat(editArticle), changeIsEdit: changeIsEdit })) : ((0, jsx_runtime_1.jsx)(cell_1.default, { oakId: editArticle, oakAutoUnmount: true, oakPath: "article-detail-".concat(editArticle) })) }))] }))] })))] }))] })));
        }
    }
    return null;
}
exports.default = Render;
