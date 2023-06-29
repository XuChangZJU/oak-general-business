"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var detail_1 = tslib_1.__importDefault(require("../../../components/article/detail"));
var cell_1 = tslib_1.__importDefault(require("../../../components/articleMenu/cell"));
function render(props) {
    var _a = props.data, treeData = _a.treeData, selectArticleMenuId = _a.selectArticleMenuId, selectArticleId = _a.selectArticleId, oakFullpath = _a.oakFullpath;
    var _b = props.methods, t = _b.t, gotoUpsertById = _b.gotoUpsertById, gotoArticleUpsert = _b.gotoArticleUpsert, onRemoveArticleMenu = _b.onRemoveArticleMenu, gotoEdit = _b.gotoEdit;
    var renderMenuItems = function (data) {
        return data === null || data === void 0 ? void 0 : data.map(function (menuItem) {
            if (menuItem.children) {
                return ((0, jsx_runtime_1.jsx)(antd_1.Menu.SubMenu, tslib_1.__assign({ icon: menuItem.logo ? ((0, jsx_runtime_1.jsx)(antd_1.Image, { height: 26, width: 26, src: menuItem.logo, preview: false })) : null, title: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { marginLeft: 8 } }, { children: menuItem.label })), onTitleClick: function (e) {
                        gotoUpsertById(e.key);
                    } }, { children: renderMenuItems(menuItem.children) }), menuItem.key));
            }
            return ((0, jsx_runtime_1.jsx)(antd_1.Menu.Item, tslib_1.__assign({ onClick: function (e) {
                    if (menuItem.type === 'article') {
                        gotoArticleUpsert(e.key);
                    }
                    else {
                        gotoUpsertById(e.key);
                    }
                } }, { children: menuItem.label }), menuItem.key));
        });
    };
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ title: "\u5206\u7C7B\u7BA1\u7406" }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Space, tslib_1.__assign({ style: { marginBottom: 16 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                            gotoEdit();
                        } }, { children: "\u65B0\u589E" })) })), (treeData === null || treeData === void 0 ? void 0 : treeData.length) === 0 ? ((0, jsx_runtime_1.jsx)(antd_1.Empty, { image: antd_1.Empty.PRESENTED_IMAGE_SIMPLE })) : ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.article }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.menu }, { children: (0, jsx_runtime_1.jsx)(antd_1.Menu, tslib_1.__assign({ style: { width: 256 }, mode: "inline" }, { children: renderMenuItems(treeData) })) })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.editor }, { children: [selectArticleMenuId ? ((0, jsx_runtime_1.jsx)(cell_1.default, { oakAutoUnmount: true, oakId: selectArticleMenuId, oakPath: "$articleMenu-cell-".concat(selectArticleMenuId), onRemoveArticleMenu: function (id) {
                                        onRemoveArticleMenu(id);
                                    } })) : null, selectArticleId ? ((0, jsx_runtime_1.jsx)(detail_1.default, { oakAutoUnmount: true, oakId: selectArticleId, oakPath: "$article-detail-".concat(selectArticleId) })) : null] }))] })))] })) })));
}
exports.default = render;
