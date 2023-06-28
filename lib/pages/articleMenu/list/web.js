"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var confirm = antd_1.Modal.confirm;
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var useFeatures_1 = tslib_1.__importDefault(require("../../../hooks/useFeatures"));
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var detail_1 = tslib_1.__importDefault(require("../../../components/article/detail"));
var icons_1 = require("@ant-design/icons");
var SubMenu = antd_1.Menu.SubMenu;
function render(props) {
    var _a = props.data, arr = _a.arr, treeData = _a.treeData, id = _a.id, parentId = _a.parentId, articleId = _a.articleId, name = _a.name, content = _a.content, oakFullpath = _a.oakFullpath, isArticle = _a.isArticle, isChildren = _a.isChildren, logo = _a.logo, title = _a.title;
    var _b = props.methods, t = _b.t, gotoUpsert = _b.gotoUpsert, gotoUpsertById = _b.gotoUpsertById, gotoArticleUpsert = _b.gotoArticleUpsert, onRemoveArticleMenu = _b.onRemoveArticleMenu, gotoEdit = _b.gotoEdit, gotoEditByParentId = _b.gotoEditByParentId, gotoArticleEdit = _b.gotoArticleEdit, onRemoveArticle = _b.onRemoveArticle, gotoArticleEditByArticleMenuId = _b.gotoArticleEditByArticleMenuId, gotoPreview = _b.gotoPreview, copy = _b.copy;
    var features = (0, useFeatures_1.default)();
    var editorConfig = {
        readOnly: true,
        autoFocus: true,
        scroll: false,
    };
    var renderMenuItems = function (data) {
        return data === null || data === void 0 ? void 0 : data.map(function (menuItem) {
            if (menuItem.children || menuItem.isLeaf) {
                return ((0, jsx_runtime_1.jsx)(antd_1.Menu.SubMenu, tslib_1.__assign({ icon: menuItem.logo ? ((0, jsx_runtime_1.jsx)(antd_1.Image, { height: 26, width: 26, src: menuItem.logo, preview: false })) : null, title: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { marginLeft: 8 } }, { children: menuItem.title })), onTitleClick: function (e) {
                        gotoUpsertById(e.key);
                    } }, { children: renderMenuItems(menuItem.children) }), menuItem.key));
            }
            return ((0, jsx_runtime_1.jsx)(antd_1.Menu.Item, tslib_1.__assign({ onClick: function (e) {
                    gotoArticleUpsert(e.key);
                } }, { children: menuItem.label }), menuItem.key));
        });
    };
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ title: "\u5206\u7C7B\u7BA1\u7406" }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.space }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                                gotoEdit();
                            } }, { children: "\u65B0\u589E" })), articleId && ((0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                        copy(articleId);
                                    } }, { children: "\u590D\u5236\u94FE\u63A5" })), (0, jsx_runtime_1.jsxs)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                        gotoPreview(content, title, articleId);
                                    } }, { children: [(0, jsx_runtime_1.jsx)(icons_1.EyeOutlined, {}), "\u67E5\u770B"] }))] }))] })), (treeData === null || treeData === void 0 ? void 0 : treeData.length) === 0 ? ((0, jsx_runtime_1.jsx)(antd_1.Empty, { image: antd_1.Empty.PRESENTED_IMAGE_SIMPLE })) : ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.article }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.menu }, { children: (0, jsx_runtime_1.jsx)(antd_1.Menu
                            // onClick={(e) => gotoArticleUpsert(e.keyPath[1])}
                            , tslib_1.__assign({ 
                                // onClick={(e) => gotoArticleUpsert(e.keyPath[1])}
                                style: { width: 256 }, mode: "inline" }, { children: renderMenuItems(treeData) })) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.editor }, { children: (id === null || id === void 0 ? void 0 : id.length) > 0 ? ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.rightContainer }, { children: (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ xs: 24, sm: 16 }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 4 }, wrapperCol: { span: 20 } }, { children: [(0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: '分类标题', name: "name" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "".concat(name) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u5206\u7C7BLOGO", name: "extraFile$entity" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: logo ? ((0, jsx_runtime_1.jsx)(antd_1.Image, { src: logo, width: 100, height: 100 })) : ("暂无图片") }) }))] }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 4 } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                                                                    gotoEdit(id);
                                                                } }, { children: "\u7F16\u8F91" })), !isArticle && ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                                                    gotoEditByParentId(id);
                                                                } }, { children: "\u6DFB\u52A0\u5B50\u8282\u70B9" }))), !isArticle && !isChildren && ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                                                    gotoArticleEditByArticleMenuId(id);
                                                                } }, { children: "\u6DFB\u52A0\u6587\u7AE0" }))), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                                                    var modal = confirm({
                                                                        title: "确定删除该文章分类吗？",
                                                                        content: "删除后不可恢复",
                                                                        okText: "确定",
                                                                        cancelText: "取消",
                                                                        onOk: function (e) {
                                                                            onRemoveArticleMenu(id);
                                                                            modal.destroy();
                                                                        },
                                                                    });
                                                                } }, { children: "\u5220\u9664" }))] }) }))] })) })) }) }))) : (articleId === null || articleId === void 0 ? void 0 : articleId.length) > 0 ? ((0, jsx_runtime_1.jsx)(detail_1.default, { oakAutoUnmount: true, content: content, articleId: articleId, oakPath: "$article-detail-".concat(articleId) })) : ("") }))] })))] })) })));
}
exports.default = render;
