"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var useFeatures_1 = tslib_1.__importDefault(require("../../../hooks/useFeatures"));
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var detail2_1 = tslib_1.__importDefault(require("../../../components/article/detail2"));
var Sider = antd_1.Layout.Sider;
function render(props) {
    var _this = this;
    var _a = props.data, treeData = _a.treeData, openKeys = _a.openKeys, selectedKeys = _a.selectedKeys, selectedArticleId = _a.selectedArticleId, breadcrumbItems = _a.breadcrumbItems;
    var _b = props.methods, t = _b.t, gotoArticleUpsert = _b.gotoArticleUpsert, getOpenKeys = _b.getOpenKeys, loadArticles = _b.loadArticles, setMessage = _b.setMessage, findFirstArticle = _b.findFirstArticle;
    var features = (0, useFeatures_1.default)();
    var _c = tslib_1.__read((0, react_1.useState)(false), 2), executed = _c[0], setExecuted = _c[1];
    (0, react_1.useEffect)(function () {
        if (!executed && treeData.length > 0 && openKeys.length === 0) {
            var node = findFirstArticle(treeData);
            getOpenKeys(node.key, treeData, openKeys);
            setExecuted(true);
        }
    }, [treeData, executed]);
    var renderMenuItems = function (data, fontSize, fontWeight) {
        if (fontSize === void 0) { fontSize = 16; }
        if (fontWeight === void 0) { fontWeight = 800; }
        return data === null || data === void 0 ? void 0 : data.map(function (menuItem) {
            if (menuItem.children) {
                return ((0, jsx_runtime_1.jsx)(antd_1.Menu.SubMenu, tslib_1.__assign({ style: { background: '#ffffff', margin: '0px', borderRadius: '0px' }, title: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ style: { display: 'flex', marginLeft: 8, fontWeight: "".concat(fontWeight), fontSize: "".concat(fontSize, "px"), flexDirection: 'row' } }, { children: [menuItem.logo ? ((0, jsx_runtime_1.jsx)(antd_1.Image, { height: 26, width: 26, src: menuItem.logo, preview: false })) : null, (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { marginLeft: 8 } }, { children: menuItem.label }))] })), onTitleClick: function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            if (menuItem.isArticle) {
                                loadArticles(e.key);
                            }
                            getOpenKeys(e.key, treeData, openKeys);
                            return [2 /*return*/];
                        });
                    }); } }, { children: renderMenuItems(menuItem.children, fontSize - 2, fontWeight - 100) }), menuItem.key));
            }
            else {
                var isSelected = selectedKeys.includes(menuItem.key);
                return ((0, jsx_runtime_1.jsx)(antd_1.Menu.Item, tslib_1.__assign({ style: { background: '#ffffff', margin: '0', width: '100%', borderRadius: '0px' }, onClick: function (e) {
                        if (menuItem.type === 'article') {
                            gotoArticleUpsert(e.key, selectedKeys);
                        }
                    } }, { children: (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ style: isSelected ? { color: '#1677ff' } : undefined }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.articleItem }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.icon }, { children: isSelected ? (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.dot }) : null })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.label, style: { fontSize: "".concat(fontSize, "px") } }, { children: menuItem.label }))] })) })) }), menuItem.key));
            }
        });
    };
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ title: "\u5E2E\u52A9\u6587\u6863" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (treeData === null || treeData === void 0 ? void 0 : treeData.length) === 0 ? ((0, jsx_runtime_1.jsx)(antd_1.Empty, { image: antd_1.Empty.PRESENTED_IMAGE_SIMPLE })) : ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.article }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.menu }, { children: (0, jsx_runtime_1.jsx)(antd_1.Menu, tslib_1.__assign({ className: web_module_less_1.default.myMenu, openKeys: openKeys, selectedKeys: selectedKeys, style: { width: 256 }, mode: "inline" }, { children: renderMenuItems(treeData) })) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.editor }, { children: (selectedArticleId === null || selectedArticleId === void 0 ? void 0 : selectedArticleId.length) > 0 ? ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.editorInner }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { padding: '40px 10px 10px 10px', display: 'flex', flexDirection: 'row', fontSize: '14px' } }, { children: breadcrumbItems.length > 0 &&
                                        breadcrumbItems.map(function (breadcrumbItem, index) {
                                            return index !== breadcrumbItems.length - 1 ? ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ style: { color: '#B2B2B2' } }, { children: [breadcrumbItem.title, (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ style: { margin: '0 8px' } }, { children: "/" }))] }), index)) : ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.breadcrumbItem }, { children: breadcrumbItem.title }), index));
                                        }) })), (0, jsx_runtime_1.jsx)(detail2_1.default, { oakAutoUnmount: true, oakId: selectedArticleId, oakPath: "$article-detail2-".concat(selectedArticleId) })] }))) : null }))] }))) })) })));
}
exports.default = render;
