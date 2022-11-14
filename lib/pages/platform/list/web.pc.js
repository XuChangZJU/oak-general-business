"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
function render() {
    var _this = this;
    var _a = this.state, _b = _a.list, list = _b === void 0 ? [] : _b, oakLoading = _a.oakLoading, pagination = _a.pagination;
    var _c = pagination || {}, pageSize = _c.pageSize, total = _c.total, currentPage = _c.currentPage;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ title: "\u5E73\u53F0\u7BA1\u7406" }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                            _this.goNewPlatform();
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
                                        _this.goDetail(record.id);
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
                                            _this.goSetConfig(record.id);
                                        } }, { children: "\u914D\u7F6E" })) }));
                            },
                        },
                        {
                            dataIndex: 'op',
                            width: 200,
                            title: '操作',
                            align: 'center',
                            render: function (value, record, index) {
                                return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                                _this.goDetail(record.id);
                                            } }, { children: "\u6982\u89C8" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                                _this.goUpdate(record.id);
                                            } }, { children: "\u66F4\u65B0" }))] }));
                            },
                            fixed: 'right',
                        },
                    ], pagination: {
                        total: total,
                        pageSize: pageSize,
                        current: currentPage,
                        onShowSizeChange: function (pageSize) {
                            _this.setPageSize(pageSize);
                        },
                        onChange: function (current) {
                            _this.setCurrentPage(current);
                        },
                    } })] })) })));
}
exports.default = render;
