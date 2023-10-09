import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { Table, Button, Modal, Row } from 'antd';
import DomainUpsertItem from '../upsertItem';
export default function Render(props) {
    const { systemId, oakPagination, list = [], oakLoading, oakFullpath, oakLegalActions, oakExecutable, oakExecuting, } = props.data;
    const { pageSize, total, currentPage } = oakPagination || {};
    const { t, setPageSize, setCurrentPage, updateItem, addItem, removeItem, clean, execute } = props.methods;
    const [upsertId, setUpsertId] = React.useState('');
    const [removeId, setRemoveId] = React.useState('');
    if (oakFullpath) {
        return (_jsxs(_Fragment, { children: [_jsx(Modal, { open: !!removeId, onCancel: () => {
                        clean();
                        setRemoveId('');
                    }, onOk: async () => {
                        removeItem(removeId);
                        await execute();
                        setRemoveId('');
                    }, cancelText: t('common::action.cancel'), okText: t('common::action.confirm'), children: t('confirmRemove') }), _jsx(Modal, { open: !!upsertId, onCancel: () => {
                        clean();
                        setUpsertId('');
                    }, width: 800, footer: _jsx(Button, { type: 'primary', onClick: async () => {
                            await execute();
                            setUpsertId('');
                        }, disabled: oakExecutable !== true || oakExecuting, children: t('common::action.confirm') }), children: _jsx(DomainUpsertItem, { data: list.find(ele => ele.id === upsertId), update: (attr, value) => updateItem({
                            [attr]: value,
                        }, upsertId) }) }), oakLegalActions?.includes('create') && (_jsx(Row, { style: { marginBottom: 16 }, justify: "start", children: _jsx(Button, { type: "primary", onClick: () => {
                            const id = addItem({
                                systemId,
                            });
                            setUpsertId(id);
                        }, children: t('common::action.create') }) })), _jsx(Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
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
                                return (_jsxs(Row, { children: [record['#oakLegalActions']?.includes('update') && _jsx(Button, { type: 'link', onClick: () => setUpsertId(record.id), children: t('common::action.update') }), record['#oakLegalActions']?.includes('remove') && _jsx(Button, { type: 'link', onClick: () => setRemoveId(record.id), children: t('common::action.remove') })] }));
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
