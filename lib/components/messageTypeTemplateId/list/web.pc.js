"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { oakPagination, mtt = [], dirtyIds = [], oakLoading, messageTypes, applicationId, } = props.data;
    const { setCurrentPage, setPageSize, t, addItem, removeItem, updateItem, recoverItem, resetItem, execute } = props.methods;
    const { pageSize, total, currentPage } = oakPagination || {};
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "default", onClick: () => {
                            /* addItem({
                                applicationId,
                            }); */
                        }, children: t('common::action.create') }), dirtyIds.length > 0 && ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => {
                            execute();
                        }, children: t('common::action.confirm') }))] }), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: mtt, rowKey: "id", columns: [
                    {
                        dataIndex: 'type',
                        title: '消息类型',
                        width: 180,
                        render: (value, record, index) => {
                            if (dirtyIds.includes(record.id) && !record.$$deleteAt$$) {
                                return ((0, jsx_runtime_1.jsx)(antd_1.Select, { style: {
                                        width: '100%',
                                    }, value: value, onChange: (e) => updateItem({
                                        type: e,
                                    }, record.id), options: messageTypes.map(ele => ({
                                        value: ele,
                                        label: ele
                                    })) }));
                            }
                            return ((0, jsx_runtime_1.jsx)(antd_1.Typography.Text, { type: !!record.$$deleteAt$$ ? 'danger' : undefined, delete: !!record.$$deleteAt$$, children: value }));
                        },
                    },
                    {
                        dataIndex: 'templateId',
                        title: '模板消息Id',
                        width: 300,
                        render: (value, record, index) => {
                            if (dirtyIds.includes(record.id) && !record.$$deleteAt$$) {
                                return ((0, jsx_runtime_1.jsx)(antd_1.Input, { value: value, onChange: (e) => updateItem({
                                        templateId: e.target.value,
                                    }, record.id) }));
                            }
                            return ((0, jsx_runtime_1.jsx)(antd_1.Typography.Text, { type: !!record.$$deleteAt$$ ? 'danger' : undefined, delete: !!record.$$deleteAt$$, children: value }));
                        },
                    },
                    {
                        dataIndex: 'op',
                        width: 200,
                        title: '操作',
                        align: 'center',
                        render: (value, record, index) => {
                            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!record.$$deleteAt$$ ? ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", danger: true, onClick: () => {
                                            removeItem(record.id);
                                        }, children: t('common::action.remove') })) : ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: () => {
                                            recoverItem(record.id);
                                        }, children: "\u6062\u590D" })), !record.$$deleteAt$$ && (!dirtyIds.includes(record.id) ? ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: () => {
                                            updateItem({}, record.id);
                                        }, children: t('common::action.update') })) : ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: () => {
                                            resetItem(record.id);
                                        }, children: "\u6062\u590D" })))] }));
                        },
                        fixed: 'right',
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
                } })] }));
}
exports.default = Render;
