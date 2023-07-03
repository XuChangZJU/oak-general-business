"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var confirm = antd_1.Modal.confirm;
var react_1 = require("react");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var useFeatures_1 = tslib_1.__importDefault(require("../../../hooks/useFeatures"));
var detail3_1 = tslib_1.__importDefault(require("../../../components/article/detail3"));
var SubMenu = antd_1.Menu.SubMenu;
var Sider = antd_1.Layout.Sider, Content = antd_1.Layout.Content;
var icons_1 = require("@ant-design/icons");
function render(props) {
    var _a = props.data, arr = _a.arr, treeData = _a.treeData, id = _a.id, parentId = _a.parentId, articleId = _a.articleId, name = _a.name, content = _a.content, oakFullpath = _a.oakFullpath, isArticle = _a.isArticle, logo = _a.logo, openKeys = _a.openKeys, selectedKeys = _a.selectedKeys, selectedArticleId = _a.selectedArticleId, width = _a.width;
    var _b = props.methods, t = _b.t, gotoArticleUpsert = _b.gotoArticleUpsert, getOpenKeys = _b.getOpenKeys;
    var features = (0, useFeatures_1.default)();
    var _c = tslib_1.__read((0, react_1.useState)(false), 2), open = _c[0], setOpen = _c[1];
    var renderMenuItems = function (data, callback) {
        return data === null || data === void 0 ? void 0 : data.map(function (menuItem) {
            if (menuItem.children || menuItem.isLeaf) {
                return ((0, jsx_runtime_1.jsx)(antd_1.Menu.SubMenu, tslib_1.__assign({ icon: menuItem.logo ? ((0, jsx_runtime_1.jsx)(antd_1.Image, { height: 26, width: 26, src: menuItem.logo, preview: false })) : null, title: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { marginLeft: 8 } }, { children: menuItem.title })), onTitleClick: function (e) {
                        getOpenKeys(e.key, treeData, openKeys);
                    } }, { children: renderMenuItems(menuItem.children, callback) }), menuItem.key));
            }
            return ((0, jsx_runtime_1.jsx)(antd_1.Menu.Item, tslib_1.__assign({ onClick: function (e) {
                    gotoArticleUpsert(e.key, selectedKeys);
                    if (typeof callback === 'function') {
                        callback();
                    }
                } }, { children: menuItem.label }), menuItem.key));
        });
    };
    if ((treeData === null || treeData === void 0 ? void 0 : treeData.length) === 0) {
        return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsx)(antd_1.Empty, { image: antd_1.Empty.PRESENTED_IMAGE_SIMPLE }) })));
    }
    if (width === 'xs') {
        return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.article_v }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.menuHeader, onClick: function () {
                                setOpen(true);
                            } }, { children: [(0, jsx_runtime_1.jsx)("div", { children: "\u5E2E\u52A9\u6587\u6863" }), open ? ((0, jsx_runtime_1.jsx)(icons_1.MenuFoldOutlined, { style: {
                                        fontSize: 18,
                                    } })) : ((0, jsx_runtime_1.jsx)(icons_1.MenuUnfoldOutlined, { style: {
                                        fontSize: 18,
                                    } }))] })), (0, jsx_runtime_1.jsx)(antd_1.Divider, { style: { margin: 0 } }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.editor }, { children: (selectedArticleId === null || selectedArticleId === void 0 ? void 0 : selectedArticleId.length) > 0 ? ((0, jsx_runtime_1.jsx)(detail3_1.default, { oakAutoUnmount: true, oakId: selectedArticleId, oakPath: "$article-detail2-".concat(selectedArticleId) })) : null }))] })), (0, jsx_runtime_1.jsx)(antd_1.Drawer, tslib_1.__assign({ className: web_module_less_1.default.drawerPanel, open: open, onClose: function () {
                        setOpen(false);
                    }, width: 256, placement: "left" }, { children: (0, jsx_runtime_1.jsx)(Sider, tslib_1.__assign({ theme: "light", width: 256, className: web_module_less_1.default.siderPanel }, { children: (0, jsx_runtime_1.jsx)(antd_1.Menu, tslib_1.__assign({ openKeys: openKeys, selectedKeys: selectedKeys, style: { width: 256 }, mode: "inline" }, { children: renderMenuItems(treeData, function () {
                                setOpen(false);
                            }) })) })) }))] })));
    }
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.article }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.menu }, { children: (0, jsx_runtime_1.jsx)(Sider, tslib_1.__assign({ theme: "light", width: 275, className: web_module_less_1.default.siderPanel }, { children: (0, jsx_runtime_1.jsx)(antd_1.Menu, tslib_1.__assign({ openKeys: openKeys, selectedKeys: selectedKeys, style: { width: 256 }, mode: "inline" }, { children: renderMenuItems(treeData) })) })) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.editor, style: {
                        marginLeft: 300,
                    } }, { children: (selectedArticleId === null || selectedArticleId === void 0 ? void 0 : selectedArticleId.length) > 0 ? ((0, jsx_runtime_1.jsx)(detail3_1.default, { oakAutoUnmount: true, oakId: selectedArticleId, oakPath: "$article-detail2-".concat(selectedArticleId) })) : null }))] })) })));
}
exports.default = render;
