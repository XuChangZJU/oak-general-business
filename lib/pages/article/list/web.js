"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var confirm = antd_1.Modal.confirm;
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var useFeatures_1 = tslib_1.__importDefault(require("../../../hooks/useFeatures"));
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var detail2_1 = tslib_1.__importDefault(require("../../../components/article/detail2"));
var SubMenu = antd_1.Menu.SubMenu;
function render(props) {
    var _a = props.data, arr = _a.arr, treeData = _a.treeData, id = _a.id, parentId = _a.parentId, articleId = _a.articleId, name = _a.name, content = _a.content, oakFullpath = _a.oakFullpath, isArticle = _a.isArticle, isChildren = _a.isChildren, logo = _a.logo, openKeys = _a.openKeys, selectedKeys = _a.selectedKeys;
    var _b = props.methods, t = _b.t, gotoUpsert = _b.gotoUpsert, gotoUpsertById = _b.gotoUpsertById, gotoArticleUpsert = _b.gotoArticleUpsert, onRemoveArticleMenu = _b.onRemoveArticleMenu, gotoEdit = _b.gotoEdit, gotoEditByParentId = _b.gotoEditByParentId, gotoArticleEdit = _b.gotoArticleEdit, onRemoveArticle = _b.onRemoveArticle, gotoArticleEditByArticleMenuId = _b.gotoArticleEditByArticleMenuId, getOpenKeys = _b.getOpenKeys;
    var features = (0, useFeatures_1.default)();
    var renderMenuItems = function (data) {
        return data === null || data === void 0 ? void 0 : data.map(function (menuItem) {
            if (menuItem.children || menuItem.isLeaf) {
                return ((0, jsx_runtime_1.jsx)(antd_1.Menu.SubMenu, tslib_1.__assign({ icon: menuItem.logo ? ((0, jsx_runtime_1.jsx)(antd_1.Image, { height: 26, width: 26, src: menuItem.logo, preview: false })) : null, title: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { marginLeft: 8 } }, { children: menuItem.title })), onTitleClick: function (e) {
                        getOpenKeys(e.key, treeData, openKeys);
                    } }, { children: renderMenuItems(menuItem.children) }), menuItem.key));
            }
            return ((0, jsx_runtime_1.jsx)(antd_1.Menu.Item, tslib_1.__assign({ onClick: function (e) {
                    gotoArticleUpsert(e.key, selectedKeys);
                } }, { children: menuItem.label }), menuItem.key));
        });
    };
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ title: "\u5E2E\u52A9\u6587\u6863" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (treeData === null || treeData === void 0 ? void 0 : treeData.length) === 0 ? ((0, jsx_runtime_1.jsx)(antd_1.Empty, { image: antd_1.Empty.PRESENTED_IMAGE_SIMPLE })) : ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.article }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.menu }, { children: (0, jsx_runtime_1.jsx)(antd_1.Menu, tslib_1.__assign({ openKeys: openKeys, selectedKeys: selectedKeys, style: { width: 256 }, mode: "inline" }, { children: renderMenuItems(treeData) })) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.editor }, { children: (articleId === null || articleId === void 0 ? void 0 : articleId.length) > 0 ? ((0, jsx_runtime_1.jsx)(detail2_1.default, { oakAutoUnmount: true, content: content, articleId: articleId, oakPath: "$article-detail-".concat(articleId) })) : null }))] }))) })) })));
}
exports.default = render;
