"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    var _a = props.data, pagination = _a.pagination, _b = _a.list, list = _b === void 0 ? [] : _b, oakLoading = _a.oakLoading, showBack = _a.showBack, variant = _a.variant, oakFullpath = _a.oakFullpath;
    var _c = pagination || {}, pageSize = _c.pageSize, total = _c.total, currentPage = _c.currentPage;
    var _d = props.methods, t = _d.t, setPageSize = _d.setPageSize, setCurrentPage = _d.setCurrentPage;
    return ((0, jsx_runtime_1.jsx)(Container, tslib_1.__assign({ showBack: showBack, variant: variant }, { children: (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
                // {
                //     dataIndex: 'id',
                //     title: '序号',
                //     render: (value, record, index) => {
                //         return index + 1;
                //     },
                // },
                {
                    dataIndex: 'name',
                    title: '授权人',
                    render: function (value, record, index) {
                        var _a, _b;
                        return ((0, jsx_runtime_1.jsxs)(antd_1.Space, tslib_1.__assign({ direction: "vertical" }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Typography.Text, { children: ["\u59D3\u540D\uFF1A", ((_a = record.granter) === null || _a === void 0 ? void 0 : _a.name) || '-'] }), (0, jsx_runtime_1.jsxs)(antd_1.Typography.Text, { children: ["\u6635\u79F0\uFF1A", (_b = record.granter) === null || _b === void 0 ? void 0 : _b.nickname] })] })));
                    },
                },
                {
                    dataIndex: 'number',
                    title: '邀请成员数',
                    render: function (value, record, index) {
                        return "".concat(value || 0, "\u4EBA");
                    },
                },
                {
                    dataIndex: 'confirmed',
                    title: '加入成员数',
                    render: function (value, record, index) {
                        return "".concat(value || 0, "\u4EBA");
                    },
                },
                {
                    dataIndex: 'type',
                    title: '授权类型',
                    render: function (value, record, index) {
                        return t("userEntityGrant:v.type.".concat(value));
                    },
                },
                {
                    dataIndex: 'relation',
                    title: '权限',
                    render: function (value, record, index) {
                        return value.display || t("".concat(record.entity, ":r.").concat(value.name));
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
                // {
                //     dataIndex: 'op',
                //     width: 200,
                //     title: '操作',
                //     align: 'center',
                //     render: (value, record, index) => {
                //         return (
                //             <CellButton
                //                 oakId={record.id}
                //                 oakPath={`${oakFullpath}.${record.id}`}
                //             />
                //         );
                //     },
                //     fixed: 'right',
                // },
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
    var children = props.children, _a = props.variant, variant = _a === void 0 ? 'alone' : _a, showBack = props.showBack;
    if (['inline', 'dialog'].includes(variant)) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    }
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: showBack, title: "\u6388\u6743\u8BB0\u5F55" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: children })) })));
}
