"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var useFeatures_1 = tslib_1.__importDefault(require("../../../hooks/useFeatures"));
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var detail2_1 = tslib_1.__importDefault(require("../../../components/article/detail2"));
var copy_to_clipboard_1 = tslib_1.__importDefault(require("copy-to-clipboard"));
var react_1 = require("react");
var SubMenu = antd_1.Menu.SubMenu;
function render(props) {
    var _this = this;
    var _a = props.data, treeData = _a.treeData, openKeys = _a.openKeys, selectedKeys = _a.selectedKeys, selectedArticleId = _a.selectedArticleId, breadcrumbItems = _a.breadcrumbItems;
    var _b = props.methods, t = _b.t, gotoArticleUpsert = _b.gotoArticleUpsert, getOpenKeys = _b.getOpenKeys, loadArticles = _b.loadArticles, setMessage = _b.setMessage, findFirstArticle = _b.findFirstArticle;
    var features = (0, useFeatures_1.default)();
    var _c = tslib_1.__read((0, react_1.useState)(false), 2), executed = _c[0], setExecuted = _c[1];
    (0, react_1.useEffect)(function () {
        if (!executed && treeData.length > 0) {
            var node = findFirstArticle(treeData);
            getOpenKeys(node.key, treeData, openKeys);
            setExecuted(true);
        }
    }, [treeData, executed]);
    var renderMenuItems = function (data) {
        return data === null || data === void 0 ? void 0 : data.map(function (menuItem) {
            if (menuItem.children) {
                return ((0, jsx_runtime_1.jsx)(antd_1.Menu.SubMenu, tslib_1.__assign({ icon: menuItem.logo ? ((0, jsx_runtime_1.jsx)(antd_1.Image, { height: 26, width: 26, src: menuItem.logo, preview: false })) : null, title: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { marginLeft: 8 } }, { children: menuItem.label })), onTitleClick: function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            if (menuItem.isArticle) {
                                loadArticles(e.key);
                            }
                            getOpenKeys(e.key, treeData, openKeys);
                            return [2 /*return*/];
                        });
                    }); } }, { children: renderMenuItems(menuItem.children) }), menuItem.key));
            }
            return ((0, jsx_runtime_1.jsx)(antd_1.Menu.Item, tslib_1.__assign({ onClick: function (e) {
                    if (menuItem.type === 'article') {
                        gotoArticleUpsert(e.key, selectedKeys);
                    }
                } }, { children: menuItem.label }), menuItem.key));
        });
    };
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ title: "\u5E2E\u52A9\u6587\u6863" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (treeData === null || treeData === void 0 ? void 0 : treeData.length) === 0 ? ((0, jsx_runtime_1.jsx)(antd_1.Empty, { image: antd_1.Empty.PRESENTED_IMAGE_SIMPLE })) : ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.article }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.menu }, { children: (0, jsx_runtime_1.jsx)(antd_1.Menu, tslib_1.__assign({ openKeys: openKeys, selectedKeys: selectedKeys, style: { width: 256 }, mode: "inline" }, { children: renderMenuItems(treeData) })) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.editor }, { children: (selectedArticleId === null || selectedArticleId === void 0 ? void 0 : selectedArticleId.length) > 0 ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { display: 'flex', justifyContent: 'flex-end' } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsxs)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                                var url = "".concat(window.location.host, "/article/detail?oakId=").concat(selectedArticleId);
                                                (0, copy_to_clipboard_1.default)(url);
                                                setMessage({
                                                    content: '复制链接成功',
                                                    type: 'success',
                                                });
                                            } }, { children: [(0, jsx_runtime_1.jsx)(icons_1.CopyOutlined, {}), "\u590D\u5236\u94FE\u63A5"] })) }) })), (0, jsx_runtime_1.jsx)(antd_1.Breadcrumb, { style: { padding: '10px 10px' }, items: breadcrumbItems }), (0, jsx_runtime_1.jsx)(detail2_1.default, { oakAutoUnmount: true, oakId: selectedArticleId, oakPath: "$article-detail2-".concat(selectedArticleId) })] })) : null }))] }))) })) })));
}
exports.default = render;
