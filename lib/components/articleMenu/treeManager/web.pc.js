"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var treeList_1 = tslib_1.__importDefault(require("../treeList"));
var web_pc_module_less_1 = tslib_1.__importDefault(require("./web.pc.module.less"));
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var upsert_1 = tslib_1.__importDefault(require("../../article/upsert"));
var cell_1 = tslib_1.__importDefault(require("../../article/cell"));
var copy_to_clipboard_1 = tslib_1.__importDefault(require("copy-to-clipboard"));
function Render(props) {
    var _a = props.data, entity = _a.entity, entityId = _a.entityId, oakFullpath = _a.oakFullpath, show = _a.show, articleMenuId = _a.articleMenuId, width = _a.width;
    var _b = props.methods, gotoDoc = _b.gotoDoc, setMessage = _b.setMessage, gotoArticleDetail = _b.gotoArticleDetail;
    var _c = tslib_1.__read((0, react_1.useState)(''), 2), editArticle = _c[0], setEditArticle = _c[1];
    var _d = tslib_1.__read((0, react_1.useState)([]), 2), breadcrumbItems = _d[0], setBreadcrumbItems = _d[1];
    var _e = tslib_1.__read((0, react_1.useState)(true), 2), open = _e[0], setOpen = _e[1];
    var _f = tslib_1.__read((0, react_1.useState)(false), 2), addOpen = _f[0], setAddOpen = _f[1];
    var _g = tslib_1.__read((0, react_1.useState)(''), 2), selectedArticleId = _g[0], setSelectedArticleId = _g[1];
    var _h = tslib_1.__read((0, react_1.useState)(true), 2), defaultOpen = _h[0], setDefaultOpen = _h[1];
    var _j = tslib_1.__read((0, react_1.useState)([]), 2), openArray = _j[0], setOpenArray = _j[1];
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
    (0, react_1.useEffect)(function () {
        if (editArticle) {
            setSelectedArticleId(editArticle);
        }
    }, [editArticle]);
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
                return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.container2 }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.menu }, { children: (0, jsx_runtime_1.jsx)(treeList_1.default, { oakPath: "".concat(oakFullpath, ".articleMenus"), entity: entity, entityId: entityId, onGrandChildEditArticleChange: checkEditArticle, show: show, articleMenuId: articleMenuId ? articleMenuId : undefined, getBreadcrumbItems: getBreadcrumbItems, breadcrumbItems: [], selectedArticleId: selectedArticleId ? selectedArticleId : undefined, defaultOpen: defaultOpen, changeDefaultOpen: changeDefaultOpen, openArray: openArray ? openArray : undefined }) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.editor }, { children: editArticle && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { fontSize: 14, display: 'flex', flexDirection: 'row', marginLeft: 10, marginBottom: 5 } }, { children: breadcrumbItems.length > 0 &&
                                            breadcrumbItems.map(function (breadcrumbItem, index) {
                                                return index !== breadcrumbItems.length - 1 ? ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ style: { color: '#B2B2B2' } }, { children: [breadcrumbItem, (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ style: { margin: '0 6px' } }, { children: "/" }))] }), index)) : ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.breadcrumbItem }, { children: breadcrumbItem }), index));
                                            }) })), (0, jsx_runtime_1.jsx)(cell_1.default, { oakId: editArticle, oakAutoUnmount: true, oakPath: "article-detail-".concat(editArticle) })] })) }))] })));
            }
        }
        else {
            return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.container3 }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.menu }, { children: (0, jsx_runtime_1.jsx)(treeList_1.default, { oakPath: "".concat(oakFullpath, ".articleMenus"), entity: entity, entityId: entityId, onGrandChildEditArticleChange: checkEditArticle, show: show, getBreadcrumbItems: getBreadcrumbItems, breadcrumbItems: [], selectedArticleId: selectedArticleId ? selectedArticleId : undefined, defaultOpen: defaultOpen, changeDefaultOpen: changeDefaultOpen, openArray: openArray ? openArray : undefined }) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.editor }, { children: editArticle && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.actions }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, tslib_1.__assign({ style: { marginBottom: 10 } }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                                    gotoArticleDetail(editArticle);
                                                } }, { children: [(0, jsx_runtime_1.jsx)(icons_1.EyeOutlined, {}), "\u67E5\u770B"] })), (0, jsx_runtime_1.jsxs)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                                    var url = "".concat(window.location.host, "/article/detail?oakId=").concat(editArticle);
                                                    (0, copy_to_clipboard_1.default)(url);
                                                    setMessage({
                                                        content: '复制链接成功',
                                                        type: 'success',
                                                    });
                                                } }, { children: [(0, jsx_runtime_1.jsx)(icons_1.CopyOutlined, {}), "\u590D\u5236\u94FE\u63A5"] }))] })) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { fontSize: 14, display: 'flex', flexDirection: 'row', marginLeft: 10, marginBottom: 5 } }, { children: breadcrumbItems.length > 0 &&
                                        breadcrumbItems.map(function (breadcrumbItem, index) {
                                            return index !== breadcrumbItems.length - 1 ? ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ style: { color: '#B2B2B2' } }, { children: [breadcrumbItem, (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ style: { margin: '0 6px' } }, { children: "/" }))] }), index)) : ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.breadcrumbItem }, { children: breadcrumbItem }), index));
                                        }) })), (0, jsx_runtime_1.jsx)(cell_1.default, { oakId: editArticle, oakAutoUnmount: true, oakPath: "article-detail-".concat(editArticle) })] })) }))] })));
        }
    }
    return null;
}
exports.default = Render;
