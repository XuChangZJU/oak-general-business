import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Table, Space, Typography, Modal } from 'antd';
import ActionBtnPanel from 'oak-frontend-base/es/components/actionBtnPanel';
import UserEntityGrantShare from '../share';
export default function render(props) {
    const { oakPagination, oakFullpath, list = [], oakLoading, } = props.data;
    const { pageSize, total, currentPage } = oakPagination || {};
    const { t, setPageSize, setCurrentPage, execute, updateItem } = props.methods;
    const [qrCodeOpen, setQrCodeOpen] = useState(false);
    const [userEntityGrantId, setUserEntityGrantId] = useState('');
    return (_jsxs(_Fragment, { children: [_jsx(Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
                    {
                        dataIndex: 'id',
                        title: '#',
                        render: (value, record, index) => {
                            return index + 1;
                        },
                    },
                    {
                        dataIndex: 'name',
                        title: '授权人',
                        render: (value, record, index) => {
                            return (_jsxs(Space, { direction: "vertical", children: [_jsxs(Typography.Text, { children: ["\u59D3\u540D\uFF1A", record.granter?.name || '-'] }), _jsxs(Typography.Text, { children: ["\u6635\u79F0\uFF1A", record.granter?.nickname] })] }));
                        },
                    },
                    {
                        dataIndex: 'type',
                        title: '授权类型',
                        render: (value, record, index) => {
                            return t(`userEntityGrant:v.type.${value}`);
                        },
                    },
                    // {
                    //     dataIndex: 'relation',
                    //     title: '权限',
                    //     render: (value, record, index) => {
                    //         return (
                    //             // value.display ||
                    //             t(`${record.relationEntity}:r.${value.name}`)
                    //         );
                    //     },
                    // },
                    {
                        dataIndex: 'createAt',
                        title: '创建时间',
                        render: (value, record, index) => {
                            return value;
                        },
                    },
                    {
                        dataIndex: 'expired',
                        title: '状态',
                        render: (value, record, index) => {
                            return (_jsxs(Typography.Text, { type: record.expired ? 'danger' : 'success', children: [record.expired ? '失效' : '有效', !record.expired && (_jsxs(Typography.Text, { children: ["\u00A0", record.expiresAt] }))] }));
                        },
                    },
                    {
                        width: 200,
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        fixed: 'right',
                        render: (value, record, rowIndex) => {
                            return (_jsx(ActionBtnPanel, { mode: "table-cell", entity: "userEntityGrant", items: [
                                    {
                                        label: '失效',
                                        action: 'disable',
                                        // alerted: true,
                                        show: record['#oakLegalActions']?.includes('disable'),
                                        onClick: () => {
                                            updateItem({ expired: true }, record.id, 'disable');
                                            execute();
                                        },
                                    },
                                    {
                                        label: '二维码',
                                        // action: 'qrcode',
                                        // show: record[
                                        //     '#oakLegalActions'
                                        // ]?.includes('qrcode'),
                                        // alerted: true,
                                        onClick: async () => {
                                            setUserEntityGrantId(record.id);
                                            setQrCodeOpen(true);
                                        },
                                    },
                                ] }));
                        },
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
                } }), _jsx(Modal, { width: 786, open: qrCodeOpen, destroyOnClose: true, onCancel: () => {
                    setQrCodeOpen(false);
                }, footer: null, children: _jsx(UserEntityGrantShare, { oakId: userEntityGrantId, oakAutoUnmount: true, oakPath: "$userEntityGrant/list-userEntityGrant/detail" }) })] }));
}
