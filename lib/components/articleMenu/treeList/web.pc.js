"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var treeCell_1 = tslib_1.__importDefault(require("../treeCell"));
var web_pc_module_less_1 = tslib_1.__importDefault(require("./web.pc.module.less"));
var antd_1 = require("antd");
function Render(props) {
    var _this = this;
    var _a = props.data, rows = _a.rows, oakFullpath = _a.oakFullpath, parentId = _a.parentId, onGrandChildEditArticleChange = _a.onGrandChildEditArticleChange, show = _a.show, getBreadcrumbItems = _a.getBreadcrumbItems, breadcrumbItems = _a.breadcrumbItems, drawerOpen = _a.drawerOpen, changeDrawerOpen = _a.changeDrawerOpen, addOpen = _a.addOpen, changeAddOpen = _a.changeAddOpen, selectedArticleId = _a.selectedArticleId, defaultOpen = _a.defaultOpen, changeDefaultOpen = _a.changeDefaultOpen, openArray = _a.openArray;
    var _b = props.methods, t = _b.t, createOne = _b.createOne, removeItem = _b.removeItem, updateItem = _b.updateItem, execute = _b.execute, setMessage = _b.setMessage, getDefaultArticle = _b.getDefaultArticle;
    (0, react_1.useEffect)(function () {
        if (rows && rows.length > 0 && defaultOpen) {
            var arr = getDefaultArticle(rows);
            changeDefaultOpen(false, arr);
        }
    }, [rows]);
    var _c = tslib_1.__read(antd_1.Modal.useModal(), 2), modal = _c[0], contextHolder = _c[1];
    var menuNameRef = (0, react_1.useRef)(null);
    if (oakFullpath) {
        if (!show) {
            if ((rows === null || rows === void 0 ? void 0 : rows.length) > 0) {
                if (addOpen) {
                    modal.confirm({
                        title: '添加分类',
                        cancelText: '取消',
                        okText: '提交',
                        content: ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: '分类名称' }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { ref: menuNameRef }) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: {
                                        color: 'rgba(0, 0, 0, 0.45)',
                                        fontSize: '14px'
                                    } }, { children: (0, jsx_runtime_1.jsx)("span", { children: "\u82E5\u9700\u8981\u521B\u5EFAFAQ\u6587\u6863\uFF0C\u5219\u8BF7\u5148\u521B\u5EFAFAQ\u6587\u6863\u6839\u76EE\u5F55\uFF0C\u540E\u7EED\u6DFB\u52A0FAQ\u6587\u7AE0\u8BF7\u5728FAQ\u6587\u6863\u6839\u76EE\u5F55\u4E0B\u8FDB\u884C\u3002" }) }))] })),
                        onOk: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var value;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        value = menuNameRef.current.input.value;
                                        changeAddOpen(false);
                                        if (!!value) return [3 /*break*/, 1];
                                        setMessage({
                                            type: 'warning',
                                            content: '请输入目录标题',
                                        });
                                        return [3 /*break*/, 3];
                                    case 1: return [4 /*yield*/, createOne(value)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); },
                        onCancel: function () {
                            changeAddOpen(false);
                        }
                    });
                }
                return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.container }, { children: [rows.map(function (ele, idx) { return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(treeCell_1.default, { onChildEditArticleChange: onGrandChildEditArticleChange, oakId: ele.id, oakPath: "".concat(oakFullpath, ".").concat(ele.id), onRemove: function () {
                                        modal.confirm({
                                            title: '请确认',
                                            content: '确认删除吗？',
                                            cancelText: '取消',
                                            okText: '确定',
                                            onOk: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                return tslib_1.__generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            removeItem(ele.id);
                                                            return [4 /*yield*/, execute()];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); }
                                        });
                                    }, onUpdateName: function (name) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        return tslib_1.__generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    updateItem({ name: name }, ele.id);
                                                    return [4 /*yield*/, execute()];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); } }), (0, jsx_runtime_1.jsx)(antd_1.Divider, { style: { margin: 1 } })] })); }), contextHolder] })));
            }
            else {
                if (addOpen) {
                    modal.confirm({
                        title: '添加分类',
                        cancelText: '取消',
                        okText: '提交',
                        content: ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: '分类名称' }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { ref: menuNameRef }) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: {
                                        color: 'rgba(0, 0, 0, 0.45)',
                                        fontSize: '14px'
                                    } }, { children: (0, jsx_runtime_1.jsx)("span", { children: "\u82E5\u9700\u8981\u521B\u5EFAFAQ\u6587\u6863\uFF0C\u5219\u8BF7\u5148\u521B\u5EFAFAQ\u6587\u6863\u6839\u76EE\u5F55\uFF0C\u540E\u7EED\u6DFB\u52A0FAQ\u6587\u7AE0\u8BF7\u5728FAQ\u6587\u6863\u6839\u76EE\u5F55\u4E0B\u8FDB\u884C\u3002" }) }))] })),
                        onOk: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var value;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        value = menuNameRef.current.input.value;
                                        changeAddOpen(false);
                                        if (!!value) return [3 /*break*/, 1];
                                        setMessage({
                                            type: 'warning',
                                            content: '请输入目录标题',
                                        });
                                        return [3 /*break*/, 3];
                                    case 1: return [4 /*yield*/, createOne(value)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); },
                        onCancel: function () {
                            changeAddOpen(false);
                        }
                    });
                }
                return ((0, jsx_runtime_1.jsx)("div", { children: contextHolder }));
            }
        }
        else {
            if ((rows === null || rows === void 0 ? void 0 : rows.length) > 0) {
                return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.container }, { children: [rows.map(function (ele, idx) { return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(treeCell_1.default, { onChildEditArticleChange: onGrandChildEditArticleChange, oakId: ele.id, oakPath: "".concat(oakFullpath, ".").concat(ele.id), show: show, getBreadcrumbItemsByParent: getBreadcrumbItems, breadItems: breadcrumbItems, drawerOpen: drawerOpen, changeDrawerOpen: changeDrawerOpen, selectedArticleId: selectedArticleId, openArray: openArray ? openArray : undefined }) })); }), contextHolder] })));
            }
            else {
                if (!parentId) {
                    return ((0, jsx_runtime_1.jsx)(antd_1.Empty, { image: antd_1.Empty.PRESENTED_IMAGE_SIMPLE }));
                }
            }
        }
    }
    return null;
}
exports.default = Render;
