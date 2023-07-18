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
function Render(props) {
    var _this = this;
    var _a = props.data, row = _a.row, allowCreateSubArticle = _a.allowCreateSubArticle, allowCreateSubMenu = _a.allowCreateSubMenu, allowRemove = _a.allowRemove, onRemove = _a.onRemove, onUpdateName = _a.onUpdateName, oakFullpath = _a.oakFullpath;
    var _b = props.methods, update = _b.update, execute = _b.execute, createSubArticle = _b.createSubArticle, createSubArticleMenu = _b.createSubArticleMenu, setMessage = _b.setMessage;
    var _c = tslib_1.__read((0, react_1.useState)(false), 2), nameEditing = _c[0], setNameEditing = _c[1];
    var _d = tslib_1.__read(antd_1.Modal.useModal(), 2), modal = _d[0], contextHolder = _d[1];
    var _e = tslib_1.__read((0, react_1.useState)(''), 2), name = _e[0], setName = _e[1];
    var _f = tslib_1.__read((0, react_1.useState)(false), 2), showSub = _f[0], setShowSub = _f[1];
    var subMenuNameRef = (0, react_1.useRef)(null);
    var subArticleNameRef = (0, react_1.useRef)(null);
    var hasSubArticles = !allowCreateSubMenu;
    var hasSubMenus = !allowCreateSubArticle;
    if (oakFullpath && row) {
        var Sub = showSub && hasSubArticles ? ((0, jsx_runtime_1.jsx)(treeList_2.default, { articleMenuId: row.id, oakPath: "".concat(oakFullpath, ".article$articleMenu") })) : ((0, jsx_runtime_1.jsx)(treeList_1.default, { parentId: row.id, oakPath: "".concat(oakFullpath, ".articleMenu$parent"), entity: row.entity, entityId: row.entityId }));
        var items = [];
        if (allowCreateSubArticle) {
            items.push({
                key: 'allowCreateSubArticle',
                label: ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "text", onClick: function () {
                        modal.confirm({
                            title: '输入文章标题',
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
                label: ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "text", onClick: function () {
                        modal.confirm({
                            title: '输入目录标题',
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
                                                content: '请输入目录标题',
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
                    } }, { children: "\u6DFB\u52A0\u5B50\u76EE\u5F55" })))
            });
        }
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.ne }, { children: nameEditing ? (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.name }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { value: name || (row === null || row === void 0 ? void 0 : row.name), onChange: function (evt) { return setName(evt.target.value); }, onPressEnter: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        return tslib_1.__generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!(name && name !== (row === null || row === void 0 ? void 0 : row.name))) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, onUpdateName(name)];
                                                case 1:
                                                    _a.sent();
                                                    _a.label = 2;
                                                case 2:
                                                    setNameEditing(false);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }, onBlur: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        return tslib_1.__generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!(name !== (row === null || row === void 0 ? void 0 : row.name))) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, onUpdateName(name)];
                                                case 1:
                                                    _a.sent();
                                                    _a.label = 2;
                                                case 2:
                                                    setNameEditing(false);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); } }) })) : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.EditOutlined, {}), size: "small", onClick: function () { return setNameEditing(true); } }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.name }, { children: row === null || row === void 0 ? void 0 : row.name }))] }) })), (0, jsx_runtime_1.jsx)(antd_1.Divider, { type: "vertical", style: { height: '100%', marginTop: 4, marginBottom: 4 } }), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.control }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Dropdown, tslib_1.__assign({ menu: { items: items }, placement: "bottomRight", arrow: true }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}), size: "small" }) })), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.MinusOutlined, {}), size: "small", onClick: function () {
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
    return null;
}
exports.default = Render;
