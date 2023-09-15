"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
function render(props) {
    const { oakPagination, oakFullpath, list = [], oakLoading, } = props.data;
    const { pageSize, total, currentPage } = oakPagination || {};
    const { t, setPageSize, setCurrentPage } = props.methods;
    return ((0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
            {
                dataIndex: 'id',
                title: '#',
                render: (value, record, index) => {
                    return index + 1;
                },
            },
            {
                dataIndex: 'name',
                title: '授权人',
                render: (value, record, index) => {
                    return ((0, jsx_runtime_1.jsxs)(antd_1.Space, { direction: "vertical", children: [(0, jsx_runtime_1.jsxs)(antd_1.Typography.Text, { children: ["\u59D3\u540D\uFF1A", record.granter?.name || '-'] }), (0, jsx_runtime_1.jsxs)(antd_1.Typography.Text, { children: ["\u6635\u79F0\uFF1A", record.granter?.nickname] })] }));
                },
            },
            {
                dataIndex: 'number',
                title: '邀请成员数',
                render: (value, record, index) => {
                    return `${value || 0}人`;
                },
            },
            {
                dataIndex: 'confirmed',
                title: '加入成员数',
                render: (value, record, index) => {
                    return `${value || 0}人`;
                },
            },
            {
                dataIndex: 'type',
                title: '授权类型',
                render: (value, record, index) => {
                    return t(`userEntityGrant:v.type.${value}`);
                },
            },
            {
                dataIndex: 'relation',
                title: '权限',
                render: (value, record, index) => {
                    return (value.display ||
                        t(`${record.entity}:r.${value.name}`));
                },
            },
            {
                dataIndex: '$$createAt$$',
                title: '创建时间',
                render: (value, record, index) => {
                    return (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm');
                },
            },
            {
                dataIndex: 'expired',
                title: '状态',
                render: (value, record, index) => {
                    return ((0, jsx_runtime_1.jsxs)(antd_1.Typography.Text, { type: record.expired ? 'danger' : 'success', children: [record.expired ? '失效' : '有效', !record.expired && ((0, jsx_runtime_1.jsxs)(antd_1.Typography.Text, { children: ["\u00A0", (0, dayjs_1.default)(record.expiresAt).format('YYYY-MM-DD HH:mm')] }))] }));
                },
            },
        ], pagination: {
            total,
            pageSize,
            current: currentPage,
            onShowSizeChange: (pageSize) => {
                setPageSize(pageSize);
            },
            onChange: (current) => {
                setCurrentPage(current);
            },
        } }));
}
exports.default = render;
