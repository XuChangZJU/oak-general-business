"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    var data = props.data, methods = props.methods;
    var t = methods.t, update = methods.update, goUpsert = methods.goUpsert, gotoEditByParentId = methods.gotoEditByParentId, gotoArticleEditByArticleMenuId = methods.gotoArticleEditByArticleMenuId, onRemoveArticleMenu = methods.onRemoveArticleMenu;
    var name = data.name, parentId = data.parentId, parentName = data.parentName, isArticle = data.isArticle, logo = data.logo, isLeaf = data.isLeaf, oakId = data.oakId;
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 4 }, wrapperCol: { span: 12 } }, { children: [(0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: '分类标题', name: "name" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "".concat(name) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "LOGO", name: "extraFile$entity" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: logo ? ((0, jsx_runtime_1.jsx)(antd_1.Image, { src: logo, width: 100, height: 100 })) : ('暂无图片') }) }))] }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: {
                        offset: 4,
                    } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                                    goUpsert(oakId);
                                } }, { children: "\u7F16\u8F91" })), !isArticle && ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                    gotoEditByParentId(oakId);
                                } }, { children: "\u6DFB\u52A0\u5B50\u8282\u70B9" }))), (isArticle || !isLeaf) && ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                    gotoArticleEditByArticleMenuId(oakId);
                                } }, { children: "\u6DFB\u52A0\u6587\u7AE0" }))), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                    var modal = antd_1.Modal.confirm({
                                        title: '确定删除该文章分类吗？',
                                        content: '删除后不可恢复',
                                        okText: '确定',
                                        cancelText: '取消',
                                        onOk: function (e) {
                                            onRemoveArticleMenu(oakId);
                                            modal.destroy();
                                        },
                                    });
                                } }, { children: "\u5220\u9664" }))] }) }))] })) })));
}
exports.default = render;
