"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var web_pc_module_less_1 = tslib_1.__importDefault(require("./web.pc.module.less"));
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var copy_to_clipboard_1 = tslib_1.__importDefault(require("copy-to-clipboard"));
function Render(props) {
    var _this = this;
    var _a = props.data, rows = _a.rows, oakFullpath = _a.oakFullpath, onChildEditArticleChange = _a.onChildEditArticleChange, show = _a.show, getBreadcrumbItemsByParent = _a.getBreadcrumbItemsByParent, breadcrumbItems = _a.breadcrumbItems, drawerOpen = _a.drawerOpen, changeDrawerOpen = _a.changeDrawerOpen, selectedArticleId = _a.selectedArticleId, openArray = _a.openArray;
    var _b = props.methods, t = _b.t, setMessage = _b.setMessage, addItem = _b.addItem, removeItem = _b.removeItem, updateItem = _b.updateItem, execute = _b.execute;
    var _c = tslib_1.__read(antd_1.Modal.useModal(), 2), modal = _c[0], contextHolder = _c[1];
    var _d = tslib_1.__read((0, react_1.useState)(''), 2), nameEditing = _d[0], setNameEditing = _d[1];
    var _e = tslib_1.__read((0, react_1.useState)(undefined), 2), name = _e[0], setName = _e[1];
    var _f = tslib_1.__read((0, react_1.useState)(false), 2), onlyOne = _f[0], setOnlyOne = _f[1];
    (0, react_1.useEffect)(function () {
        if (openArray && openArray.length > 0 && rows && rows.length > 0 && !onlyOne) {
            rows.map(function (row) {
                if (openArray.includes(row.id)) {
                    onChildEditArticleChange(row.id);
                    getBreadcrumbItemsByParent(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(breadcrumbItems), false), [row.name], false));
                    setOnlyOne(true);
                }
            });
        }
    }, [openArray, rows]);
    if (oakFullpath) {
        if (!show) {
            if ((rows === null || rows === void 0 ? void 0 : rows.length) > 0) {
                return ((0, jsx_runtime_1.jsxs)("div", { children: [rows.map(function (ele, idx) { return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.container, onClick: function () {
                                        onChildEditArticleChange(ele.id);
                                    } }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.ne }, { children: nameEditing === ele.id ? (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.name }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { autoFocus: true, value: name !== undefined ? name : ele === null || ele === void 0 ? void 0 : ele.name, onChange: function (evt) { return setName(evt.target.value); }, onPressEnter: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                        return tslib_1.__generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0:
                                                                    if (!(name && name !== (ele === null || ele === void 0 ? void 0 : ele.name))) return [3 /*break*/, 2];
                                                                    updateItem({ name: name }, ele.id);
                                                                    return [4 /*yield*/, execute()];
                                                                case 1:
                                                                    _a.sent();
                                                                    _a.label = 2;
                                                                case 2:
                                                                    setNameEditing('');
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    }); }, onBlur: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                        return tslib_1.__generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0:
                                                                    if (!(name !== (ele === null || ele === void 0 ? void 0 : ele.name))) return [3 /*break*/, 2];
                                                                    updateItem({ name: name }, ele.id);
                                                                    return [4 /*yield*/, execute()];
                                                                case 1:
                                                                    _a.sent();
                                                                    _a.label = 2;
                                                                case 2:
                                                                    setNameEditing('');
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    }); } }) })) : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.EditOutlined, {}), size: "small", onClick: function (e) {
                                                            e.stopPropagation();
                                                            setNameEditing(ele.id);
                                                        }, style: { marginRight: 4 } }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.name }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { marginLeft: 4, overflow: 'hidden', width: '150px', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, { children: ele === null || ele === void 0 ? void 0 : ele.name })) }))] }) })), (0, jsx_runtime_1.jsx)(antd_1.Divider, { type: "vertical", style: { height: '100%', marginTop: 4, marginBottom: 4 } }), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.control }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.CopyOutlined, {}), size: "small", onClick: function (e) {
                                                        e.stopPropagation();
                                                        var url = "".concat(window.location.host, "/article/detail?oakId=").concat(ele.id);
                                                        (0, copy_to_clipboard_1.default)(url);
                                                        setMessage({
                                                            content: '复制链接成功',
                                                            type: 'success',
                                                        });
                                                    } }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.MinusOutlined, {}), size: "small", onClick: function (e) {
                                                        e.stopPropagation();
                                                        modal.confirm({
                                                            title: '请确认',
                                                            content: '确认删除吗？',
                                                            okText: '确定',
                                                            cancelText: '取消',
                                                            onOk: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                                return tslib_1.__generator(this, function (_a) {
                                                                    switch (_a.label) {
                                                                        case 0:
                                                                            onChildEditArticleChange('');
                                                                            removeItem(ele.id);
                                                                            return [4 /*yield*/, execute()];
                                                                        case 1:
                                                                            _a.sent();
                                                                            return [2 /*return*/];
                                                                    }
                                                                });
                                                            }); }
                                                        });
                                                    } })] }))] })), (0, jsx_runtime_1.jsx)(antd_1.Divider, { style: { margin: 1 } })] })); }), contextHolder] }));
            }
        }
        else {
            if ((rows === null || rows === void 0 ? void 0 : rows.length) > 0) {
                return ((0, jsx_runtime_1.jsxs)("div", { children: [rows.map(function (ele, idx) { return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.container2, onClick: function () {
                                    onChildEditArticleChange(ele.id);
                                    getBreadcrumbItemsByParent(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(breadcrumbItems), false), [ele.name], false));
                                    changeDrawerOpen(!drawerOpen);
                                } }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.ne }, { children: selectedArticleId === ele.id ? ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.name }, { children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.dot }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.title, style: { width: 231 } }, { children: ele === null || ele === void 0 ? void 0 : ele.name }))] }))) : ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.name }, { children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.placeholder }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { width: 231 } }, { children: ele === null || ele === void 0 ? void 0 : ele.name }))] }))) })) })) })); }), contextHolder] }));
            }
        }
    }
    return null;
}
exports.default = Render;
