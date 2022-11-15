"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
// import ApplicationUpsert from '../../../pages/application/upsert';
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render() {
    var _this = this;
    var _a = this.props, variant = _a.variant, namespace = _a.namespace, systemId = _a.systemId;
    var _b = this.state, _c = _b.list, list = _c === void 0 ? [] : _c, oakLoading = _b.oakLoading, pagination = _b.pagination;
    var _d = pagination || {}, pageSize = _d.pageSize, total = _d.total, currentPage = _d.currentPage;
    return ((0, jsx_runtime_1.jsxs)(Container, tslib_1.__assign({ variant: variant }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                        _this.goCreate();
                    } }, { children: "\u6DFB\u52A0\u5E94\u7528" })) }), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
                    // {
                    //     dataIndex: 'id',
                    //     title: '序号',
                    //     render: (value, record, index) => {
                    //         return index + 1;
                    //     },
                    // },
                    {
                        dataIndex: 'name',
                        title: '应用名称',
                        width: 300,
                        render: function (value, record, index) {
                            return ((0, jsx_runtime_1.jsx)(antd_1.Typography.Link, tslib_1.__assign({ onClick: function () {
                                    _this.goDetail(record.id);
                                } }, { children: value })));
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
                            return _this.t("application:v.type.".concat(value));
                        },
                    },
                    {
                        dataIndex: 'config',
                        title: '应用配置',
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
                                        } }, { children: "\u8BE6\u60C5" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                            _this.goUpdate(record.id);
                                        } }, { children: "\u66F4\u65B0" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                            _this.removeApplication(record.id);
                                        } }, { children: "\u5220\u9664" }))] }));
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
function Container(props) {
    var children = props.children, variant = props.variant, showBack = props.showBack;
    if (variant === 'inline') {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    }
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: showBack, title: "\u5E94\u7528\u7BA1\u7406" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: children })) })));
}
