"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render() {
    var _this = this;
    var _a = this.state, _b = _a.list, list = _b === void 0 ? [] : _b, oakLoading = _a.oakLoading, pagination = _a.pagination;
    var _c = pagination || {}, pageSize = _c.pageSize, total = _c.total, currentPage = _c.currentPage;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                        _this.goNewPlatform();
                    } }, { children: "\u6DFB\u52A0\u5E73\u53F0" })) }), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
                    {
                        dataIndex: 'id',
                        title: '序号',
                        render: function (value, record, index) {
                            return index + 1;
                        },
                    },
                    {
                        dataIndex: 'name',
                        title: '名称',
                    },
                    {
                        dataIndex: 'description',
                        title: '描述',
                        width: 400,
                    },
                    {
                        dataIndex: 'config',
                        title: '配置',
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
                            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                        _this.goUpdate(record.id);
                                    } }, { children: "\u66F4\u65B0" })) }));
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
                } })] })));
}
exports.default = render;
