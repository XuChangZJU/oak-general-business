"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var cellButton_1 = tslib_1.__importDefault(require("../../../components/userEntityGrant/cellButton"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render() {
    var _this = this;
    var _a = this.props, variant = _a.variant, namespace = _a.namespace, platformId = _a.platformId, showBack = _a.showBack;
    var _b = this.state, _c = _b.list, list = _c === void 0 ? [] : _c, oakLoading = _b.oakLoading, pagination = _b.pagination;
    var _d = pagination || {}, pageSize = _d.pageSize, total = _d.total, currentPage = _d.currentPage;
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
                        return _this.t("userEntityGrant:v.type.".concat(value));
                    },
                },
                {
                    dataIndex: 'relation',
                    title: '权限',
                    render: function (value, record, index) {
                        return _this.t("".concat(record.entity, ":r.").concat(value));
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
                        return ((0, jsx_runtime_1.jsxs)(antd_1.Typography.Text, tslib_1.__assign({ type: record.expired ? 'danger' : 'success' }, { children: [record.expired ? '失效' : '有效', !record.expired && ((0, jsx_runtime_1.jsxs)(antd_1.Typography.Text, { children: ["\u00A0", (0, dayjs_1.default)(record.expireAt).format('YYYY-MM-DD HH:mm')] }))] })));
                    },
                },
                {
                    dataIndex: 'op',
                    width: 200,
                    title: '操作',
                    align: 'center',
                    render: function (value, record, index) {
                        return ((0, jsx_runtime_1.jsx)(cellButton_1.default, { oakId: record.id, oakPath: "".concat(_this.state.oakFullpath, ".").concat(record.id) }));
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
