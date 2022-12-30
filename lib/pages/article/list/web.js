"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
function render(props) {
    var _this = this;
    var _a = props.data, pagination = _a.pagination, _b = _a.articles, articles = _b === void 0 ? [] : _b, oakLoading = _a.oakLoading, searchValue = _a.searchValue, title = _a.title, _c = _a.showBack, showBack = _c === void 0 ? false : _c;
    var _d = pagination || {}, pageSize = _d.pageSize, total = _d.total, currentPage = _d.currentPage;
    var _e = props.methods, t = _e.t, goUpsert = _e.goUpsert, goDetailById = _e.goDetailById, goUpsertById = _e.goUpsertById, searchConfirm = _e.searchConfirm, searchValueChange = _e.searchValueChange, setCurrentPage = _e.setCurrentPage, setPageSize = _e.setPageSize, onRemove = _e.onRemove;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ title: title || '文章管理', showBack: showBack }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ flex: "auto" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                                        goUpsert();
                                    } }, { children: t('action.add') })) }) })), (0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ flex: "none" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u6807\u9898", value: searchValue, allowClear: true, onChange: function (e) {
                                    searchValueChange(e.target.value);
                                }, suffix: (0, jsx_runtime_1.jsx)(icons_1.SearchOutlined, {}), onPressEnter: function (e) {
                                    searchConfirm();
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
                            title: t('book:attr.iState'),
                            render: function (value, record, index) {
                                return ((0, jsx_runtime_1.jsx)(antd_1.Tag, tslib_1.__assign({ color: "processing" }, { children: t("book:v.iState.".concat(value)) })));
                            },
                        },
                        {
                            dataIndex: 'title',
                            title: t('article:attr.title'),
                        },
                        {
                            dataIndex: 'author',
                            title: t('article:attr.author'),
                        },
                        {
                            dataIndex: 'abstract',
                            title: t('article:attr.abstract'),
                        },
                        {
                            dataIndex: 'op',
                            width: 300,
                            title: '操作',
                            align: 'center',
                            render: function (value, record, index) {
                                return ((0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                                goDetailById(record.id);
                                            } }, { children: "\u8BE6\u60C5" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                                goUpsertById(record.id);
                                            } }, { children: "\u7F16\u8F91" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                                var modal = antd_1.Modal.confirm({
                                                    title: '确认删除该文章吗？',
                                                    content: '删除后，文章不可恢复',
                                                    okText: '确定',
                                                    cancelText: '取消',
                                                    onOk: function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                        return tslib_1.__generator(this, function (_a) {
                                                            onRemove(record.id);
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
                            setPageSize(pageSize);
                        },
                        onChange: function (current) {
                            setCurrentPage(current);
                        },
                    } })] })) })));
}
exports.default = render;
