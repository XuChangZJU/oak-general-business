"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var actionBtnPanel_1 = tslib_1.__importDefault(require("oak-frontend-base/lib/components/actionBtnPanel"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
function Render(props) {
    var _a = props.data, oakPagination = _a.oakPagination, _b = _a.list, list = _b === void 0 ? [] : _b, oakLoading = _a.oakLoading, showBack = _a.showBack, variant = _a.variant, oakFullpath = _a.oakFullpath;
    var _c = oakPagination || {}, pageSize = _c.pageSize, total = _c.total, currentPage = _c.currentPage;
    var _d = props.methods, t = _d.t, setPageSize = _d.setPageSize, setCurrentPage = _d.setCurrentPage, goCreate = _d.goCreate, goDetail = _d.goDetail, goSetConfig = _d.goSetConfig, goUpdate = _d.goUpdate;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ title: "\u5E73\u53F0\u7BA1\u7406" }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                            goCreate();
                        } }, { children: "\u6DFB\u52A0\u5E73\u53F0" })) }), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
                        // {
                        //     dataIndex: 'id',
                        //     title: '序号',
                        //     render: (value, record, index) => {
                        //         return index + 1;
                        //     },
                        // },
                        {
                            dataIndex: 'name',
                            title: '平台名称',
                            width: 300,
                            render: function (value, record, index) {
                                return ((0, jsx_runtime_1.jsx)(antd_1.Typography.Link, tslib_1.__assign({ onClick: function () {
                                        goDetail(record.id);
                                    } }, { children: value })));
                            },
                        },
                        {
                            dataIndex: 'description',
                            title: '描述',
                            width: 200,
                            ellipsis: true,
                        },
                        {
                            dataIndex: '$$createAt$$',
                            title: '创建时间',
                            width: 200,
                            render: function (value, record, index) {
                                return (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm');
                            },
                        },
                        {
                            dataIndex: 'config',
                            title: '配置',
                            align: 'center',
                            render: function (value, record, index) {
                                return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                            goSetConfig(record.id);
                                        } }, { children: "\u914D\u7F6E" })) }));
                            },
                        },
                        {
                            dataIndex: 'op',
                            width: 200,
                            title: '操作',
                            align: 'center',
                            render: function (value, record, index) {
                                var _a;
                                return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(actionBtnPanel_1.default, { mode: "table-cell", entity: "platform", items: [
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
                    } })] })) })));
}
exports.default = Render;
