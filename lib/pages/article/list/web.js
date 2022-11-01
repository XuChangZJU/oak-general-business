"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render() {
    var _this = this;
    var _a = this.state, pagination = _a.pagination, _b = _a.articles, articles = _b === void 0 ? [] : _b, oakLoading = _a.oakLoading, searchValue = _a.searchValue;
    var _c = pagination || {}, pageSize = _c.pageSize, total = _c.total, currentPage = _c.currentPage;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ flex: "auto" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                                    _this.goUpsert();
                                } }, { children: this.t('action.add') })) }) })), (0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ flex: "none" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u4E66\u540D", value: searchValue, allowClear: true, onChange: function (e) {
                                _this.searchValueChange(e.target.value);
                            }, suffix: (0, jsx_runtime_1.jsx)(icons_1.SearchOutlined, {}), onPressEnter: function (e) {
                                _this.searchConfirm();
                            } }) }))] }), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: articles, rowKey: "index", columns: [
                    {
                        align: 'center',
                        dataIndex: 'serial-number',
                        title: '序号',
                        render: function (value, record, index) {
                            return index + 1;
                        },
                    },
                    {
                        dataIndex: 'iState',
                        title: this.t('book:attr.iState'),
                        render: function (value, record, index) {
                            return ((0, jsx_runtime_1.jsx)(antd_1.Tag, tslib_1.__assign({ color: "processing" }, { children: _this.t("book:v.iState.".concat(value)) })));
                        },
                    },
                    {
                        dataIndex: 'title',
                        title: this.t('article:attr.title'),
                    },
                    {
                        dataIndex: 'author',
                        title: this.t('article:attr.author'),
                    },
                    {
                        dataIndex: 'abstract',
                        title: this.t('article:attr.abstract'),
                    },
                    {
                        dataIndex: 'op',
                        width: 300,
                        title: '操作',
                        align: 'center',
                        render: function (value, record, index) {
                            return ((0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                            _this.goDetailById(record.id);
                                        } }, { children: "\u8BE6\u60C5" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                            _this.goUpsertById(record.id);
                                        } }, { children: "\u7F16\u8F91" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                            var modal = antd_1.Modal.confirm({
                                                title: '确认删除该文章吗？',
                                                content: '删除后，文章不可恢复',
                                                okText: '确定',
                                                cancelText: '取消',
                                                onOk: function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                    return tslib_1.__generator(this, function (_a) {
                                                        this.onRemove(record.id);
                                                        modal.destroy();
                                                        return [2 /*return*/];
                                                    });
                                                }); },
                                                onCancel: function (e) {
                                                    modal.destroy();
                                                },
                                            });
                                        } }, { children: "\u5220\u9664" }))] }));
                        },
                        fixed: 'right',
                    },
                ], pagination: {
                    total: total,
                    pageSize: pageSize,
                    current: currentPage,
                    onShowSizeChange: function (current, pageSize) {
                        _this.setPageSize(pageSize);
                    },
                    onChange: function (current) {
                        _this.setCurrentPage(current);
                    },
                } })] })));
}
exports.default = render;
