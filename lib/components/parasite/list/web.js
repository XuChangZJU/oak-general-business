"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    var _a = props.data, oakPagination = _a.oakPagination, oakFullpath = _a.oakFullpath, _b = _a.list, list = _b === void 0 ? [] : _b, oakLoading = _a.oakLoading, variant = _a.variant;
    var _c = oakPagination || {}, pageSize = _c.pageSize, total = _c.total, currentPage = _c.currentPage;
    var _d = props.methods, t = _d.t, setPageSize = _d.setPageSize, setCurrentPage = _d.setCurrentPage;
    return ((0, jsx_runtime_1.jsx)(Container, tslib_1.__assign({ variant: variant }, { children: (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
                {
                    dataIndex: 'id',
                    title: '#',
                    render: function (value, record, index) {
                        return index + 1;
                    },
                },
                {
                    dataIndex: ['user', 'nickname'],
                    title: '姓名',
                    render: function (value, record, index) {
                        return value || '--';
                    },
                },
                {
                    dataIndex: '$$createAt$$',
                    title: '创建时间',
                    render: function (value, record, index) {
                        return (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm');
                    },
                },
                {
                    dataIndex: 'expired',
                    title: '状态',
                    render: function (value, record, index) {
                        return ((0, jsx_runtime_1.jsxs)(antd_1.Typography.Text, tslib_1.__assign({ type: record.expired ? 'danger' : 'success' }, { children: [record.expired ? '失效' : '有效', !record.expired && ((0, jsx_runtime_1.jsxs)(antd_1.Typography.Text, { children: ["\u00A0", (0, dayjs_1.default)(record.expiresAt).format('YYYY-MM-DD HH:mm')] }))] })));
                    },
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
            } }) })));
}
exports.default = render;
function Container(props) {
    var children = props.children, _a = props.variant, variant = _a === void 0 ? 'alone' : _a;
    if (['inline', 'dialog'].includes(variant)) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    }
    return (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: children }));
}
