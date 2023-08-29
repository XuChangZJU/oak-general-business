"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var treeList_1 = tslib_1.__importDefault(require("../treeList"));
var treeList_2 = tslib_1.__importDefault(require("../../article/treeList"));
var web_pc_module_less_1 = tslib_1.__importDefault(require("./web.pc.module.less"));
var gallery_1 = tslib_1.__importDefault(require("../../../components/extraFile/gallery"));
function Render(props) {
    var _this = this;
    var _a = props.data, row = _a.row, allowCreateSubArticle = _a.allowCreateSubArticle, allowCreateSubMenu = _a.allowCreateSubMenu, allowRemove = _a.allowRemove, onRemove = _a.onRemove, onUpdateName = _a.onUpdateName, oakFullpath = _a.oakFullpath, logo = _a.logo, onChildEditArticleChange = _a.onChildEditArticleChange, editArticle = _a.editArticle, show = _a.show, getBreadcrumbItemsByParent = _a.getBreadcrumbItemsByParent, breadItems = _a.breadItems, drawerOpen = _a.drawerOpen, changeDrawerOpen = _a.changeDrawerOpen, selectedArticleId = _a.selectedArticleId, openArray = _a.openArray, getTopInfo = _a.getTopInfo;
    var _b = props.methods, update = _b.update, execute = _b.execute, createSubArticle = _b.createSubArticle, createSubArticleMenu = _b.createSubArticleMenu, setMessage = _b.setMessage, gotoDoc = _b.gotoDoc;
    var _c = tslib_1.__read((0, react_1.useState)(false), 2), nameEditing = _c[0], setNameEditing = _c[1];
    (0, react_1.useEffect)(function () {
        if (editArticle.length > 0) {
            onChildEditArticleChange(editArticle);
        }
    }, [editArticle]);
    var _d = tslib_1.__read(antd_1.Modal.useModal(), 2), modal = _d[0], contextHolder = _d[1];
    var _e = tslib_1.__read((0, react_1.useState)(''), 2), name = _e[0], setName = _e[1];
    var _f = tslib_1.__read((0, react_1.useState)(false), 2), showSub = _f[0], setShowSub = _f[1];
    var _g = tslib_1.__read((0, react_1.useState)([]), 2), newBreadcrumbItems = _g[0], setNewBreadcrumbItems = _g[1];
    var menuNameRef = (0, react_1.useRef)(null);
    var subMenuNameRef = (0, react_1.useRef)(null);
    var subArticleNameRef = (0, react_1.useRef)(null);
    var hasSubArticles = !allowCreateSubMenu;
    var hasSubMenus = !allowCreateSubArticle;
    var _h = tslib_1.__read((0, react_1.useState)(false), 2), onlyOne = _h[0], setOnlyOne = _h[1];
    (0, react_1.useEffect)(function () {
        if (openArray && openArray.length > 0 && row && !onlyOne) {
            if (openArray.includes(row.id)) {
                setShowSub(true);
                setNewBreadcrumbItems(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(breadItems), false), [row === null || row === void 0 ? void 0 : row.name], false));
                setOnlyOne(true);
            }
        }
    }, [openArray, row]);
    if (oakFullpath && row) {
        if (!show) {
            var Sub = showSub && hasSubArticles ? ((0, jsx_runtime_1.jsx)(treeList_2.default, { onChildEditArticleChange: onChildEditArticleChange, articleMenuId: row.id, oakPath: "".concat(oakFullpath, ".article$articleMenu") })) : ((0, jsx_runtime_1.jsx)(treeList_1.default, { parentId: row.id, oakPath: "".concat(oakFullpath, ".articleMenu$parent"), entity: row.entity, entityId: row.entityId, onGrandChildEditArticleChange: onChildEditArticleChange }));
            var items = [];
            if (allowCreateSubArticle) {
                items.push({
                    key: 'allowCreateSubArticle',
                    label: ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.addAction, onClick: function () {
                            modal.confirm({
                                title: '输入文章标题',
                                cancelText: '取消',
                                okText: '提交',
                                content: ((0, jsx_runtime_1.jsx)(antd_1.Input, { ref: subArticleNameRef })),
                                onOk: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var value;
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                value = subArticleNameRef.current.input.value;
                                                if (!!value) return [3 /*break*/, 1];
                                                setMessage({
                                                    type: 'warning',
                                                    content: '请输入文章标题',
                                                });
                                                return [3 /*break*/, 3];
                                            case 1: return [4 /*yield*/, createSubArticle(value)];
                                            case 2:
                                                _a.sent();
                                                setShowSub(true);
                                                _a.label = 3;
                                            case 3: return [2 /*return*/];
                                        }
                                    });
                                }); }
                            });
                        } }, { children: "\u6DFB\u52A0\u6587\u7AE0" })))
                });
            }
            if (allowCreateSubMenu) {
                items.push({
                    key: 'allowCreateSubMenu',
                    label: ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.addAction, onClick: function () {
                            modal.confirm({
                                title: '输入子分类标题',
                                cancelText: '取消',
                                okText: '提交',
                                content: ((0, jsx_runtime_1.jsx)(antd_1.Input, { ref: subMenuNameRef })),
                                onOk: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var value;
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                value = subMenuNameRef.current.input.value;
                                                if (!!value) return [3 /*break*/, 1];
                                                setMessage({
                                                    type: 'warning',
                                                    content: '请输入分类标题',
                                                });
                                                return [3 /*break*/, 3];
                                            case 1: return [4 /*yield*/, createSubArticleMenu(value)];
                                            case 2:
                                                _a.sent();
                                                setShowSub(true);
                                                _a.label = 3;
                                            case 3: return [2 /*return*/];
                                        }
                                    });
                                }); }
                            });
                        } }, { children: "\u6DFB\u52A0\u5B50\u5206\u7C7B" })))
                });
            }
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.ne }, { children: 
                                // nameEditing ? <div className={Styles.name}>
                                //     <Input
                                //         autoFocus
                                //         value={ name || row?.name}
                                //         onChange={(evt) => setName(evt.target.value)}
                                //         onPressEnter={async () => {
                                //             if (name && name !== row?.name) {
                                //                 await onUpdateName(name);
                                //             }
                                //             setNameEditing(false);
                                //         }}
                                //         onBlur={async () => {
                                //             if (name && name !== row?.name) {
                                //                 await onUpdateName(name);
                                //             }
                                //             setNameEditing(false);
                                //         }}
                                //     />
                                // </div> : 
                                (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.EditOutlined, {}), size: "small", onClick: function () {
                                                setNameEditing(true);
                                                modal.confirm({
                                                    title: '编辑分类',
                                                    cancelText: '取消',
                                                    okText: '提交',
                                                    content: ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u5206\u7C7B\u540D\u79F0" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { ref: menuNameRef, defaultValue: row.name }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "LOGO", help: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { children: "\u8BF7\u4E0A\u4F20LOGO\u9AD8\u6E05\u56FE\u7247\uFF0C" }), (0, jsx_runtime_1.jsx)("span", { children: "108*108\u50CF\u7D20\uFF0C\u4EC5\u652F\u6301PNG\u3001JPG\u683C\u5F0F\uFF0C\u5927\u5C0F\u4E0D\u8D85\u8FC7300KB\u3002" })] }) }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(gallery_1.default, { oakPath: oakFullpath
                                                                            ? "".concat(oakFullpath, ".extraFile$entity$1")
                                                                            : undefined, type: "image", origin: "qiniu", tag1: "logo", entity: "articleMenu", accept: ".PNG, .JPG", maxNumber: 1 }) }) }))] })),
                                                    onOk: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                        return tslib_1.__generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0:
                                                                    if (!menuNameRef.current.input.value) return [3 /*break*/, 2];
                                                                    return [4 /*yield*/, onUpdateName(menuNameRef.current.input.value)];
                                                                case 1:
                                                                    _a.sent();
                                                                    return [3 /*break*/, 3];
                                                                case 2:
                                                                    setMessage({
                                                                        type: 'warning',
                                                                        content: '请输入分类标题',
                                                                    });
                                                                    _a.label = 3;
                                                                case 3: return [2 /*return*/];
                                                            }
                                                        });
                                                    }); }
                                                });
                                            }, style: { marginRight: 4 } }), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.name }, { children: [logo ? ((0, jsx_runtime_1.jsx)(antd_1.Image, { height: 26, width: 26, src: logo, preview: false })) : null, (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { marginLeft: 4, overflow: 'hidden', width: '100px', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, { children: row === null || row === void 0 ? void 0 : row.name }))] }))] }) })), (0, jsx_runtime_1.jsx)(antd_1.Divider, { type: "vertical", style: { height: '100%', marginTop: 4, marginBottom: 4 } }), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.control }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", onClick: function () {
                                            gotoDoc(row === null || row === void 0 ? void 0 : row.id);
                                        }, icon: (0, jsx_runtime_1.jsx)(icons_1.EyeOutlined, {}) }), (0, jsx_runtime_1.jsx)(antd_1.Dropdown, tslib_1.__assign({ menu: { items: items }, placement: "bottomRight", arrow: true }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}), size: "small" }) })), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.MinusOutlined, {}), size: "small", onClick: function () {
                                            if (!allowRemove) {
                                                modal.error({
                                                    title: '无法删除',
                                                    content: hasSubArticles ? '请先删除目录下的文章' : '请先删除目录下的子目录',
                                                    okText: '确认'
                                                });
                                            }
                                            else {
                                                onRemove();
                                            }
                                        } }), (hasSubArticles || hasSubMenus) ? (showSub ?
                                        (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.UpOutlined, {}), size: "small", onClick: function () { return setShowSub(false); } }) :
                                        (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.DownOutlined, {}), size: "small", onClick: function () { return setShowSub(true); } })) : (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.ph })] }))] })), showSub && ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.sub }, { children: Sub }))), contextHolder] }));
        }
        else {
            var Sub = showSub && hasSubArticles ? ((0, jsx_runtime_1.jsx)(treeList_2.default, { onChildEditArticleChange: onChildEditArticleChange, articleMenuId: row.id, oakPath: "".concat(oakFullpath, ".article$articleMenu"), show: show, getBreadcrumbItemsByParent: getBreadcrumbItemsByParent, breadcrumbItems: newBreadcrumbItems, drawerOpen: drawerOpen, changeDrawerOpen: changeDrawerOpen, selectedArticleId: selectedArticleId, openArray: openArray ? openArray : undefined, getTopInfo: getTopInfo })) : ((0, jsx_runtime_1.jsx)(treeList_1.default, { parentId: row.id, oakPath: "".concat(oakFullpath, ".articleMenu$parent"), onGrandChildEditArticleChange: onChildEditArticleChange, show: show, getBreadcrumbItems: getBreadcrumbItemsByParent, breadcrumbItems: newBreadcrumbItems, drawerOpen: drawerOpen, changeDrawerOpen: changeDrawerOpen, selectedArticleId: selectedArticleId, openArray: openArray ? openArray : undefined, getTopInfo: getTopInfo }));
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.container2, onClick: function () {
                            setShowSub(!showSub);
                            setNewBreadcrumbItems(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(breadItems), false), [row === null || row === void 0 ? void 0 : row.name], false));
                        } }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.control }, { children: (hasSubArticles || hasSubMenus) ? (showSub ?
                                    (0, jsx_runtime_1.jsx)(icons_1.DownOutlined, {}) :
                                    (0, jsx_runtime_1.jsx)(icons_1.RightOutlined, {})) : (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.ph }) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.ne }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.name }, { children: [logo ? ((0, jsx_runtime_1.jsx)(antd_1.Image, { height: 26, width: 26, src: logo, preview: false, style: { marginRight: 4 } })) : null, (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { width: 204 } }, { children: row === null || row === void 0 ? void 0 : row.name }))] })) }))] })), showSub && ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.sub2 }, { children: Sub }))), contextHolder] }));
        }
    }
    return null;
}
exports.default = Render;
