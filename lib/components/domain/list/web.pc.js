"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const antd_1 = require("antd");
const upsertItem_1 = tslib_1.__importDefault(require("../upsertItem"));
function Render(props) {
    const { systemId, oakPagination, list = [], oakLoading, oakFullpath, oakLegalActions, oakExecutable, oakExecuting, } = props.data;
    const { pageSize, total, currentPage } = oakPagination || {};
    const { t, setPageSize, setCurrentPage, updateItem, addItem, removeItem, clean, execute } = props.methods;
    const [upsertId, setUpsertId] = React.useState('');
    const [removeId, setRemoveId] = React.useState('');
    if (oakFullpath) {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Modal, { open: !!removeId, onCancel: () => {
                        clean();
                        setRemoveId('');
                    }, onOk: async () => {
                        removeItem(removeId);
                        await execute();
                        setRemoveId('');
                    }, cancelText: t('common::action.cancel'), okText: t('common::action.confirm'), children: t('confirmRemove') }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { open: !!upsertId, onCancel: () => {
                        clean();
                        setUpsertId('');
                    }, width: 800, footer: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'primary', onClick: async () => {
                            await execute();
                            setUpsertId('');
                        }, disabled: oakExecutable !== true || oakExecuting, children: t('common::action.confirm') }), children: (0, jsx_runtime_1.jsx)(upsertItem_1.default, { data: list.find(ele => ele.id === upsertId), update: (attr, value) => updateItem({
                            [attr]: value,
                        }, upsertId) }) }), oakLegalActions?.includes('create') && ((0, jsx_runtime_1.jsx)(antd_1.Row, { style: { marginBottom: 16 }, justify: "start", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => {
                            const id = addItem({
                                systemId,
                            });
                            setUpsertId(id);
                        }, children: t('common::action.create') }) })), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
                        {
                            dataIndex: 'id',
                            title: '#',
                            render: (value, record, index) => {
                                return index + 1;
                            },
                        },
                        {
                            dataIndex: 'url',
                            title: '域名',
                        },
                        {
                            dataIndex: 'apiPath',
                            title: '请求路径',
                        },
                        {
                            dataIndex: 'port',
                            title: '端口',
                        },
                        {
                            dataIndex: 'protocol',
                            title: '协议',
                        },
                        {
                            dataIndex: 'op',
                            width: 200,
                            title: '操作',
                            align: 'center',
                            render: (value, record, index) => {
                                return ((0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [record['#oakLegalActions']?.includes('update') && (0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'link', onClick: () => setUpsertId(record.id), children: t('common::action.update') }), record['#oakLegalActions']?.includes('remove') && (0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'link', onClick: () => setRemoveId(record.id), children: t('common::action.remove') })] }));
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
    return null;
}
exports.default = Render;
