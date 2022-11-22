"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var upsert_1 = tslib_1.__importDefault(require("../../../pages/system/upsert"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render() {
    var _this = this;
    var _a = this.props, variant = _a.variant, namespace = _a.namespace, platformId = _a.platformId, showBack = _a.showBack;
    var _b = this.state, _c = _b.list, list = _c === void 0 ? [] : _c, oakLoading = _b.oakLoading, pagination = _b.pagination;
    var _d = pagination || {}, pageSize = _d.pageSize, total = _d.total, currentPage = _d.currentPage;
    return ((0, jsx_runtime_1.jsxs)(Container, tslib_1.__assign({ showBack: showBack, variant: variant }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                        _this.goCreate();
                    } }, { children: "\u6DFB\u52A0\u7CFB\u7EDF" })) }), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
                    // {
                    //     dataIndex: 'id',
                    //     title: '序号',
                    //     render: (value, record, index) => {
                    //         return index + 1;
                    //     },
                    // },
                    {
                        dataIndex: 'name',
                        title: '系统名称',
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
                        dataIndex: 'super',
                        title: '是否为超级系统',
                        render: function (value, record, index) {
                            return value ? '是' : '否';
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
                } }), (0, jsx_runtime_1.jsx)(antd_1.Modal, tslib_1.__assign({ title: "\u521B\u5EFA\u7CFB\u7EDF", destroyOnClose: true, open: this.state.open, onCancel: function () {
                    _this.setState({
                        open: false,
                    });
                }, width: "60%", onOk: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var _a;
                    var _b, _c;
                    return tslib_1.__generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _a = this.execute;
                                _b = {
                                    action: 'create'
                                };
                                _c = {};
                                return [4 /*yield*/, generateNewId()];
                            case 1: 
                            // todo
                            return [4 /*yield*/, _a.apply(this, [(_b.data = (_c.id = _d.sent(),
                                        _c),
                                        _b)])];
                            case 2:
                                // todo
                                _d.sent();
                                this.setState({
                                    open: false,
                                });
                                return [2 /*return*/];
                        }
                    });
                }); }, okText: "\u786E\u5B9A", cancelText: "\u53D6\u6D88" }, { children: (0, jsx_runtime_1.jsx)(upsert_1.default, { platformId: platformId, namespace: namespace, variant: "dialog", oakPath: this.state.oakFullpath }) }))] })));
}
exports.default = render;
function Container(props) {
    var children = props.children, _a = props.variant, variant = _a === void 0 ? 'alone' : _a, showBack = props.showBack;
    if (['inline', 'dialog'].includes(variant)) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    }
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: showBack, title: "\u7CFB\u7EDF\u7BA1\u7406" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: children })) })));
}
