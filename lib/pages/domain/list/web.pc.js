"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var actionBtnPanel_1 = tslib_1.__importDefault(require("@oak-frontend-base/components/actionBtnPanel"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var _a = props.data, pagination = _a.pagination, _b = _a.list, list = _b === void 0 ? [] : _b, oakLoading = _a.oakLoading, showBack = _a.showBack, variant = _a.variant, oakFullpath = _a.oakFullpath;
    var _c = pagination || {}, pageSize = _c.pageSize, total = _c.total, currentPage = _c.currentPage;
    var _d = props.methods, t = _d.t, setPageSize = _d.setPageSize, setCurrentPage = _d.setCurrentPage, goCreate = _d.goCreate, goDetail = _d.goDetail, goUpdate = _d.goUpdate;
    return ((0, jsx_runtime_1.jsxs)(Container, tslib_1.__assign({ showBack: showBack, variant: variant }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                        goCreate();
                    } }, { children: "\u6DFB\u52A0\u57DF\u540D" })) }), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
                    // {
                    //     dataIndex: 'id',
                    //     title: '序号',
                    //     render: (value, record, index) => {
                    //         return index + 1;
                    //     },
                    // },
                    {
                        dataIndex: 'url',
                        title: '域名',
                        render: function (value, record, index) {
                            return ((0, jsx_runtime_1.jsx)(antd_1.Typography.Link, tslib_1.__assign({ onClick: function () {
                                    goDetail(record.id);
                                } }, { children: value })));
                        },
                    },
                    {
                        dataIndex: 'apiPath',
                        title: '请求路径',
                    },
                    {
                        dataIndex: 'port',
                        title: '端口',
                    },
                    {
                        dataIndex: 'protocol',
                        title: '协议',
                    },
                    {
                        dataIndex: 'op',
                        width: 200,
                        title: '操作',
                        align: 'center',
                        render: function (value, record, index) {
                            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(actionBtnPanel_1.default, { mode: "table-cell", entity: "domain", oakAutoUnmount: true, oakId: record.id, oakPath: "".concat(oakFullpath, ".").concat(record.id), items: [
                                        {
                                            label: '详情',
                                            onClick: function () {
                                                goDetail(record.id);
                                            },
                                        },
                                        {
                                            action: 'update',
                                            onClick: function () {
                                                goUpdate(record.id);
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
                } })] })));
}
exports.default = Render;
function Container(props) {
    var children = props.children, _a = props.variant, variant = _a === void 0 ? 'alone' : _a, showBack = props.showBack;
    if (['inline', 'dialog'].includes(variant)) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    }
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: showBack, title: "\u7CFB\u7EDF\u7BA1\u7406" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: children })) })));
}
