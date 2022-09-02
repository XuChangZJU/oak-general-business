"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_react_1 = require("tdesign-react");
function render() {
    var _this = this;
    var t = this.t;
    var _a = this.state, _b = _a.users, users = _b === void 0 ? [] : _b, oakLoading = _a.oakLoading, _c = _a.editableRowKeys, editableRowKeys = _c === void 0 ? [] : _c;
    var _d = this.props, relations = _d.relations, entity = _d.entity, entityId = _d.entityId;
    var relationArr = typeof relations === 'object'
        ? relations
        : relations && JSON.parse(relations);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)(tdesign_react_1.Space, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ shape: "rectangle", size: "medium", type: "button", variant: "base", onClick: function () { return _this.goUpsert(); } }, { children: "\u6DFB\u52A0" })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ shape: "rectangle", size: "medium", type: "button", variant: "base", onClick: function () { return _this.goUserEntityGrantWithGrant(); } }, { children: "\u4E8C\u7EF4\u7801\u5206\u4EAB" }))] }), (0, jsx_runtime_1.jsx)(tdesign_react_1.Table, { loading: oakLoading, resizable: true, bordered: false, ref: this.tableRef, rowKey: "id", editableRowKeys: editableRowKeys, onRowEdit: function (params) { return _this.onRowEdit(params); }, onRowValidate: function (params) { return _this.onRowValidate(params); }, columns: [
                    {
                        colKey: 'avatar',
                        title: '头像',
                        cell: function (_a) {
                            var row = _a.row, rowIndex = _a.rowIndex, col = _a.col, colIndex = _a.colIndex;
                            var avatar = row.avatar;
                            return avatar ? ((0, jsx_runtime_1.jsx)(tdesign_react_1.Avatar, { hideOnLoadFailed: false, image: avatar, shape: "circle" })) : ((0, jsx_runtime_1.jsx)("span", { children: "\u672A\u8BBE\u7F6E" }));
                        },
                    },
                    {
                        colKey: 'name',
                        title: '姓名',
                        edit: {
                            component: tdesign_react_1.Input,
                            props: {
                                clearable: true,
                                autofocus: true,
                                autoWidth: true,
                            },
                            rules: [{ required: true, message: '不能为空' }],
                            showEditIcon: false,
                        },
                    },
                    {
                        colKey: 'nickname',
                        title: '昵称',
                        edit: {
                            component: tdesign_react_1.Input,
                            props: {
                                clearable: true,
                                autofocus: true,
                                autoWidth: true,
                            },
                            rules: [{ required: true, message: '不能为空' }],
                            showEditIcon: false,
                        },
                    },
                    {
                        colKey: 'mobile',
                        title: '手机号',
                    },
                    {
                        colKey: 'relations',
                        title: '权限',
                        cell: function (_a) {
                            var _b;
                            var row = _a.row, rowIndex = _a.rowIndex, col = _a.col, colIndex = _a.colIndex;
                            return ((0, jsx_runtime_1.jsx)(tdesign_react_1.Space, { children: (_b = row.relations) === null || _b === void 0 ? void 0 : _b.map(function (ele, index) { return ((0, jsx_runtime_1.jsx)(tdesign_react_1.Tag, { children: t(entity + ':r.' + ele) }, index)); }) }));
                        },
                        edit: {
                            component: tdesign_react_1.Select,
                            // props, 透传全部属性到 Select 组件
                            // props 为函数时，参数有：col, row, rowIndex, colIndex, editedRow。一般用于实现编辑组件之间的联动
                            props: function () {
                                return {
                                    multiple: true,
                                    minCollapsedNum: 1,
                                    autoWidth: true,
                                    options: relationArr &&
                                        relationArr.map(function (ele, index) { return ({
                                            value: ele,
                                            label: t(entity + ':r.' + ele),
                                        }); }),
                                };
                            },
                            showEditIcon: false,
                            rules: [
                                { required: true, message: '请至少选择一个权限' },
                            ],
                        },
                    },
                    {
                        title: '操作',
                        colKey: 'operate',
                        cell: function (_a) {
                            var row = _a.row;
                            var editable = editableRowKeys.includes(row.id);
                            return ((0, jsx_runtime_1.jsxs)(tdesign_react_1.Space, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", variant: "text", onClick: function (e) { return _this.goDetail(row.id); } }, { children: "\u8BE6\u60C5" })), !editable && ((0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", variant: "text", "data-id": row.id, onClick: function (e) { return _this.onEdit(e); } }, { children: "\u7F16\u8F91" }))), editable && ((0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", variant: "text", "data-id": row.id, onClick: function (e) { return _this.onSave(e); } }, { children: "\u4FDD\u5B58" }))), editable && ((0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", variant: "text", "data-id": row.id, onClick: function (e) { return _this.onCancel(e); } }, { children: "\u53D6\u6D88" })))] }));
                        },
                    },
                ], data: users })] }));
}
exports.default = render;
