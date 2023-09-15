"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var actionBtnPanel_1 = tslib_1.__importDefault(require("oak-frontend-base/es/components/actionBtnPanel"));
function Render(props) {
    var _a = props.data, oakPagination = _a.oakPagination, _b = _a.list, list = _b === void 0 ? [] : _b, oakLoading = _a.oakLoading, oakFullpath = _a.oakFullpath, oakLegalActions = _a.oakLegalActions;
    var _c = oakPagination || {}, pageSize = _c.pageSize, total = _c.total, currentPage = _c.currentPage;
    var _d = props.methods, t = _d.t, setPageSize = _d.setPageSize, setCurrentPage = _d.setCurrentPage, goCreate = _d.goCreate, goDetail = _d.goDetail, goSetConfig = _d.goSetConfig, goUpdate = _d.goUpdate, removeApplication = _d.removeApplication;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(oakLegalActions === null || oakLegalActions === void 0 ? void 0 : oakLegalActions.includes('create')) && ((0, jsx_runtime_1.jsx)(antd_1.Space, { style: { marginBottom: 16 }, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () {
                        goCreate();
                    }, children: "\u6DFB\u52A0\u5E94\u7528" }) })), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
                    {
                        dataIndex: 'id',
                        title: '#',
                        render: function (value, record, index) {
                            return index + 1;
                        },
                    },
                    {
                        dataIndex: 'name',
                        title: '应用名称',
                        width: 300,
                        render: function (value, record, index) {
                            var _a;
                            return ((0, jsx_runtime_1.jsx)(antd_1.Typography.Link, { disabled: !((_a = record === null || record === void 0 ? void 0 : record['#oakLegalActions']) === null || _a === void 0 ? void 0 : _a.includes('update')), onClick: function () {
                                    goDetail(record.id);
                                }, children: value }));
                        },
                    },
                    {
                        dataIndex: 'description',
                        title: '应用描述',
                        width: 200,
                        ellipsis: true,
                    },
                    {
                        dataIndex: 'type',
                        title: '应用类型',
                        render: function (value, record, index) {
                            return t("application:v.type.".concat(value));
                        },
                    },
                    {
                        dataIndex: 'config',
                        title: '应用配置',
                        align: 'center',
                        render: function (value, record, index) {
                            var _a;
                            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", disabled: !((_a = record === null || record === void 0 ? void 0 : record['#oakLegalActions']) === null || _a === void 0 ? void 0 : _a.includes('update')), onClick: function () {
                                        goSetConfig(record.id);
                                    }, children: "\u914D\u7F6E" }) }));
                        },
                    },
                    {
                        dataIndex: 'op',
                        width: 200,
                        title: '操作',
                        align: 'center',
                        render: function (value, record, index) {
                            var _a, _b;
                            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(actionBtnPanel_1.default, { mode: "table-cell", entity: "application", items: [
                                        {
                                            label: '详情',
                                            onClick: function () {
                                                goDetail(record.id);
                                            },
                                        },
                                        {
                                            action: 'update',
                                            show: (_a = record === null || record === void 0 ? void 0 : record['#oakLegalActions']) === null || _a === void 0 ? void 0 : _a.includes('update'),
                                            onClick: function () {
                                                goUpdate(record.id);
                                            },
                                        },
                                        {
                                            action: 'remove',
                                            alerted: true,
                                            show: (_b = record === null || record === void 0 ? void 0 : record['#oakLegalActions']) === null || _b === void 0 ? void 0 : _b.includes('remove'),
                                            onClick: function () {
                                                removeApplication(record.id);
                                            },
                                        },
                                    ] }) }));
                        },
                        fixed: 'right',
                    },
                ], pagination: {
                    total: total,
                    pageSize: pageSize,
                    current: currentPage,
                    onShowSizeChange: function (pageSize) {
                        setPageSize(pageSize);
                    },
                    onChange: function (current) {
                        setCurrentPage(current);
                    },
                } })] }));
}
exports.default = Render;
