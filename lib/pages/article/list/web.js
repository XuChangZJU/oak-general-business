"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_react_1 = require("tdesign-react");
var tdesign_icons_react_1 = require("tdesign-icons-react");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var ListItem = tdesign_react_1.List.ListItem, ListItemMeta = tdesign_react_1.List.ListItemMeta;
function render() {
    var _this = this;
    var t = this.t;
    var width = this.props.width;
    var _a = this.state, pagination = _a.pagination, _b = _a.articles, articles = _b === void 0 ? [] : _b, oakLoading = _a.oakLoading, searchValue = _a.searchValue;
    var _c = pagination || {}, pageSize = _c.pageSize, total = _c.total, currentPage = _c.currentPage;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsxs)(tdesign_react_1.Row, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Col, tslib_1.__assign({ xs: 12, sm: 8 }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Space, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ size: "medium", theme: "primary", onClick: function () {
                                    _this.goUpsert();
                                } }, { children: t('action.add') })) }) })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Col, tslib_1.__assign({ xs: 12, sm: 4 }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u4E66\u540D", value: searchValue, clearable: true, onChange: function (value) {
                                _this.searchValueChange(value);
                            }, onClear: function () {
                                _this.searchCancel();
                                _this.searchConfirm();
                            }, suffix: (0, jsx_runtime_1.jsx)(tdesign_icons_react_1.Icon, { name: "search" }), onEnter: function (value, _a) {
                                var e = _a.e;
                                _this.searchConfirm();
                            } }) }))] }), (0, jsx_runtime_1.jsx)(tdesign_react_1.Table, { loading: oakLoading, data: articles, rowKey: "index", columns: [
                    {
                        align: 'center',
                        colKey: 'index',
                        title: '序号',
                    },
                    {
                        colKey: 'iState',
                        title: t('book:attr.iState'),
                        cell: function (_a) {
                            var row = _a.row, rowIndex = _a.rowIndex;
                            return ((0, jsx_runtime_1.jsx)(tdesign_react_1.Tag, tslib_1.__assign({ theme: "primary", size: "small" }, { children: t("book:v.iState.".concat(row.iState)) })));
                        },
                    },
                    {
                        colKey: 'title',
                        title: t('article:attr.title'),
                    },
                    {
                        colKey: 'author',
                        title: t('article:attr.author'),
                    },
                    {
                        colKey: 'abstract',
                        title: t('article:attr.abstract'),
                    },
                    {
                        colKey: 'op',
                        width: 300,
                        title: '操作',
                        align: 'center',
                        cell: function (_a) {
                            var row = _a.row, rowIndex = _a.rowIndex;
                            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", variant: "text", onClick: function () {
                                            _this.goDetailById(row.id);
                                        } }, { children: "\u8BE6\u60C5" })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", variant: "text", onClick: function () {
                                            _this.goUpsertById(row.id);
                                        } }, { children: "\u7F16\u8F91" })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", variant: "text", onClick: function () {
                                            var confirmDia = tdesign_react_1.DialogPlugin
                                                .confirm({
                                                header: '确认删除该文章吗？',
                                                body: '删除后，文章不可恢复',
                                                confirmBtn: '确定',
                                                cancelBtn: '取消',
                                                onConfirm: function (_a) {
                                                    var e = _a.e;
                                                    return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                        return tslib_1.__generator(this, function (_b) {
                                                            this.onRemove("".concat(rowIndex));
                                                            confirmDia.hide();
                                                            return [2 /*return*/];
                                                        });
                                                    });
                                                },
                                                onClose: function (_a) {
                                                    var e = _a.e, trigger = _a.trigger;
                                                    confirmDia.hide();
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
                    onPageSizeChange: function (pageSize) {
                        _this.setPageSize(pageSize);
                    },
                    onCurrentChange: function (current) {
                        _this.setCurrentPage(current);
                    },
                } })] })));
}
exports.default = render;
