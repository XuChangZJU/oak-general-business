"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var list_1 = tslib_1.__importDefault(require("../../../pages/userEntityGrant/list"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render() {
    var _this = this;
    var _a = this.state, pagination = _a.pagination, _b = _a.users, users = _b === void 0 ? [] : _b, oakLoading = _a.oakLoading, idRemove = _a.idRemove;
    var _c = this.props, namespace = _c.namespace, entity = _c.entity, entityId = _c.entityId;
    var _d = pagination || {}, pageSize = _d.pageSize, total = _d.total, currentPage = _d.currentPage;
    return ((0, jsx_runtime_1.jsxs)(pageHeader_1.default, tslib_1.__assign({ title: "\u6743\u9650\u5217\u8868" }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () { return _this.goUpsert(); } }, { children: "\u6DFB\u52A0" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                    return _this.setState({
                                        invite: true,
                                    });
                                } }, { children: "\u9080\u8BF7\u8BB0\u5F55" }))] }), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, ref: this.tableRef, rowKey: "id", columns: [
                            {
                                width: 100,
                                dataIndex: 'index',
                                title: '序号',
                                render: function (value, record, index) { return index + 1; },
                            },
                            {
                                dataIndex: 'avatar',
                                title: '头像',
                                render: function (value, record, index) {
                                    return value ? ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: value, shape: "circle" })) : ((0, jsx_runtime_1.jsx)("span", { children: "\u672A\u8BBE\u7F6E" }));
                                },
                            },
                            {
                                dataIndex: 'name',
                                title: '姓名',
                                //   edit: {
                                //       component: Input,
                                //       props: {
                                //           clearable: true,
                                //           autofocus: true,
                                //           autoWidth: true,
                                //       },
                                //       rules: [
                                //           { required: true, message: '不能为空' },
                                //       ],
                                //       showEditIcon: false,
                                //   },
                            },
                            {
                                dataIndex: 'nickname',
                                title: '昵称',
                                //   edit: {
                                //       component: Input,
                                //       props: {
                                //           clearable: true,
                                //           autofocus: true,
                                //           autoWidth: true,
                                //       },
                                //       rules: [
                                //           { required: true, message: '不能为空' },
                                //       ],
                                //       showEditIcon: false,
                                //   },
                            },
                            {
                                dataIndex: 'mobile',
                                title: '手机号',
                            },
                            {
                                dataIndex: 'relations',
                                title: '权限',
                                render: function (value, record, index) {
                                    var _a;
                                    return ((0, jsx_runtime_1.jsx)(antd_1.Space, { children: (_a = record.relations) === null || _a === void 0 ? void 0 : _a.map(function (ele, index) { return ((0, jsx_runtime_1.jsx)(antd_1.Tag, { children: _this.t(entity + ':r.' + ele) }, index)); }) }));
                                },
                                //   edit: {
                                //       component: Select,
                                //       // props, 透传全部属性到 Select 组件
                                //       // props 为函数时，参数有：col, row, rowIndex, colIndex, editedRow。一般用于实现编辑组件之间的联动
                                //       props: () => {
                                //           return {
                                //               multiple: true,
                                //               minCollapsedNum: 1,
                                //               autoWidth: true,
                                //               options:
                                //                   relationArr &&
                                //                   relationArr.map(
                                //                       (
                                //                           ele: any,
                                //                           index: number
                                //                       ) => ({
                                //                           value: ele,
                                //                           label: this.t(
                                //                               entity + ':r.' + ele
                                //                           ),
                                //                       })
                                //                   ),
                                //           };
                                //       },
                                //       showEditIcon: false,
                                //       rules: [
                                //           {
                                //               required: true,
                                //               message: '请至少选择一个权限',
                                //           },
                                //       ],
                                //   },
                            },
                            {
                                title: '操作',
                                dataIndex: 'operate',
                                render: function (value, record, index) {
                                    var _a;
                                    return ((0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function (e) {
                                                    return _this.goUpdate(record.id);
                                                } }, { children: "\u7F16\u8F91" })), ((_a = record.relations) === null || _a === void 0 ? void 0 : _a.length) > 0 && ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ danger: true, type: "link", onClick: function () {
                                                    return _this.onDelete(record.id);
                                                } }, { children: "\u5220\u9664" })))] }));
                                },
                            },
                        ], dataSource: users, pagination: {
                            total: total,
                            pageSize: pageSize,
                            current: currentPage,
                            onShowSizeChange: function (current, size) {
                                _this.setPageSize(current);
                            },
                            onChange: function (page, pageSize) {
                                _this.setCurrentPage(page);
                            },
                        } })] })), (0, jsx_runtime_1.jsx)(antd_1.Modal, tslib_1.__assign({ title: "\u8BF7\u786E\u8BA4", open: !!idRemove, onOk: function () { return _this.confirmDelete(); }, onCancel: function () { return _this.setState({ idRemove: '' }); }, cancelText: "\u53D6\u6D88", okText: "\u786E\u8BA4" }, { children: (0, jsx_runtime_1.jsx)("p", { children: "\u786E\u8BA4\u5220\u9664\u7528\u6237\u7684\u6240\u6709\u6743\u9650\u5417\uFF1F" }) })), (0, jsx_runtime_1.jsx)(antd_1.Modal, tslib_1.__assign({ title: "\u9080\u8BF7\u8BB0\u5F55", open: !!this.state.invite, onCancel: function () { return _this.setState({ invite: false }); }, 
                // cancelText="关闭"
                // okText=""
                width: "80%", footer: null }, { children: (0, jsx_runtime_1.jsx)(list_1.default, { entity: entity, entityId: entityId, namespace: namespace, variant: "dialog", oakPath: "$userRelation/list-userEntityGrant/list" }) }))] })));
}
exports.default = render;
