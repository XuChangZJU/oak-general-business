"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var _a = props.data, oakPagination = _a.oakPagination, _b = _a.mttIds, mttIds = _b === void 0 ? [] : _b, _c = _a.dirtyIds, dirtyIds = _c === void 0 ? [] : _c, oakLoading = _a.oakLoading, messageTypes = _a.messageTypes, applicationId = _a.applicationId;
    var _d = props.methods, setCurrentPage = _d.setCurrentPage, setPageSize = _d.setPageSize, t = _d.t, addItem = _d.addItem, removeItem = _d.removeItem, updateItem = _d.updateItem, recoverItem = _d.recoverItem, resetItem = _d.resetItem, execute = _d.execute;
    var _e = oakPagination || {}, pageSize = _e.pageSize, total = _e.total, currentPage = _e.currentPage;
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "default", onClick: function () {
                            addItem({
                                applicationId: applicationId,
                            });
                        }, children: t('common::action.create') }), dirtyIds.length > 0 && ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () {
                            execute();
                        }, children: t('common::action.confirm') }))] }), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: mttIds, rowKey: "id", columns: [
                    {
                        dataIndex: 'type',
                        title: '消息类型',
                        width: 180,
                        render: function (value, record, index) {
                            if (dirtyIds.includes(record.id) && !record.$$deleteAt$$) {
                                return ((0, jsx_runtime_1.jsx)(antd_1.Select, { style: {
                                        width: '100%',
                                    }, value: value, onChange: function (e) { return updateItem({
                                        type: e,
                                    }, record.id); }, options: messageTypes.map(function (ele) { return ({
                                        value: ele,
                                        label: ele
                                    }); }) }));
                            }
                            return ((0, jsx_runtime_1.jsx)(antd_1.Typography.Text, { type: !!record.$$deleteAt$$ ? 'danger' : undefined, delete: !!record.$$deleteAt$$, children: value }));
                        },
                    },
                    {
                        dataIndex: 'templateId',
                        title: '模板消息Id',
                        width: 300,
                        render: function (value, record, index) {
                            if (dirtyIds.includes(record.id) && !record.$$deleteAt$$) {
                                return ((0, jsx_runtime_1.jsx)(antd_1.Input, { value: value, onChange: function (e) { return updateItem({
                                        templateId: e.target.value,
                                    }, record.id); } }));
                            }
                            return ((0, jsx_runtime_1.jsx)(antd_1.Typography.Text, { type: !!record.$$deleteAt$$ ? 'danger' : undefined, delete: !!record.$$deleteAt$$, children: value }));
                        },
                    },
                    {
                        dataIndex: 'op',
                        width: 200,
                        title: '操作',
                        align: 'center',
                        render: function (value, record, index) {
                            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!record.$$deleteAt$$ ? ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", danger: true, onClick: function () {
                                            removeItem(record.id);
                                        }, children: t('common::action.remove') })) : ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: function () {
                                            recoverItem(record.id);
                                        }, children: "\u6062\u590D" })), !record.$$deleteAt$$ && (!dirtyIds.includes(record.id) ? ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: function () {
                                            updateItem({}, record.id);
                                        }, children: t('common::action.update') })) : ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: function () {
                                            resetItem(record.id);
                                        }, children: "\u6062\u590D" })))] }));
                        },
                        fixed: 'right',
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
                } })] }));
}
exports.default = Render;
