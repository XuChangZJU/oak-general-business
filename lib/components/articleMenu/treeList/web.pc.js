"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var treeCell_1 = tslib_1.__importDefault(require("../treeCell"));
var web_pc_module_less_1 = tslib_1.__importDefault(require("./web.pc.module.less"));
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
function Render(props) {
    var _this = this;
    var _a = props.data, rows = _a.rows, oakFullpath = _a.oakFullpath, parentId = _a.parentId;
    var _b = props.methods, t = _b.t, createOne = _b.createOne, removeItem = _b.removeItem, updateItem = _b.updateItem, execute = _b.execute, setMessage = _b.setMessage;
    var _c = tslib_1.__read(antd_1.Modal.useModal(), 2), modal = _c[0], contextHolder = _c[1];
    var menuNameRef = (0, react_1.useRef)(null);
    if (oakFullpath) {
        if ((rows === null || rows === void 0 ? void 0 : rows.length) > 0) {
            return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.container }, { children: [rows.map(function (ele, idx) { return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(treeCell_1.default, { oakId: ele.id, oakPath: "".concat(oakFullpath, ".").concat(ele.id), onRemove: function () {
                                    modal.confirm({
                                        title: '请确认',
                                        content: '确认删除吗？',
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
                                }); } }), (0, jsx_runtime_1.jsx)(antd_1.Divider, { style: { margin: 1 } })] })); }), !parentId && (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.btnContainer }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", size: "large", icon: (0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}), onClick: function () {
                                modal.confirm({
                                    title: '输入目录标题',
                                    content: ((0, jsx_runtime_1.jsx)(antd_1.Input, { ref: menuNameRef })),
                                    onOk: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var value;
                                        return tslib_1.__generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    value = menuNameRef.current.input.value;
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
                                    }); }
                                });
                            } }, { children: t('common:action.add') })) })), contextHolder] })));
        }
        if (!parentId) {
            return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.btnContainer }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", size: "large", icon: (0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}), onClick: function () { return createOne('齐圣晨的大坑'); } }, { children: t('common:action.add') })) })) })));
        }
    }
    return null;
}
exports.default = Render;
