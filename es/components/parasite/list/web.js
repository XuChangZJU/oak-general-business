import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Table, Typography, Modal } from 'antd';
import dayjs from 'dayjs';
import ActionBtnPanel from 'oak-frontend-base/lib/components/actionBtnPanel';
import ParasiteDetail from '../detail';
import { useState } from 'react';
export default function render(props) {
    const { oakPagination, oakFullpath, list = [], oakLoading, nameLabel, } = props.data;
    const { pageSize, total, currentPage } = oakPagination || {};
    const { t, setPageSize, setCurrentPage, updateItem, execute, getQrCode } = props.methods;
    const [qrCodeOpen, setQrCodeOpen] = useState(false);
    const [parasiteId, setParasiteId] = useState('');
    return (_jsxs(_Fragment, { children: [_jsx(Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
                    {
                        dataIndex: 'id',
                        title: '#',
                        render: (value, record, index) => {
                            return index + 1;
                        },
                    },
                    {
                        dataIndex: ['user', 'nickname'],
                        title: nameLabel || '名称',
                        render: (value, record, index) => {
                            return value !== 'shadow_user' && value || '--';
                        },
                    },
                    {
                        dataIndex: '$$createAt$$',
                        title: '创建时间',
                        render: (value, record, index) => {
                            return dayjs(value).format('YYYY-MM-DD HH:mm');
                        },
                    },
                    {
                        dataIndex: 'expired',
                        title: '状态',
                        render: (value, record, index) => {
                            return (_jsxs(Typography.Text, { type: record.expired ? 'danger' : 'success', children: [record.expired ? '失效' : '有效', !record.expired && (_jsxs(Typography.Text, { children: ["\u00A0", dayjs(record.expiresAt).format('YYYY-MM-DD HH:mm')] }))] }));
                        },
                    },
                    // {
                    //     dataIndex: 'op',
                    //     width: 200,
                    //     title: '操作',
                    //     align: 'center',
                    //     render: (value, record, index) => {
                    //         return (
                    //             <>
                    //                 <Button
                    //                     type="link"
                    //                     onClick={() => {
                    //                         updateItem(
                    //                             {
                    //                                 expired: true
                    //                             },
                    //                             record.id!,
                    //                             'cancel'
                    //                         );
                    //                         execute();
                    //                     }}
                    //                 >
                    //                     失效
                    //                 </Button>
                    //             </>
                    //         );
                    //     },
                    //     fixed: 'right',
                    // },
                    {
                        width: 200,
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        fixed: 'right',
                        render: (value, record, rowIndex) => {
                            return (_jsx(ActionBtnPanel, { mode: "table-cell", entity: "parasite", items: [
                                    {
                                        label: '失效',
                                        action: 'cancel',
                                        // alerted: true,
                                        show: record['#oakLegalActions']?.includes('cancel'),
                                        onClick: () => {
                                            updateItem({ expired: true }, record.id, 'cancel');
                                            execute();
                                        },
                                    },
                                    {
                                        label: '采集码',
                                        action: 'qrcode',
                                        show: record['#oakLegalActions']?.includes('qrcode'),
                                        // alerted: true,
                                        onClick: async () => {
                                            setParasiteId(record.id);
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
                }, footer: null, children: _jsx(ParasiteDetail, { oakId: parasiteId, oakAutoUnmount: true, oakPath: "$parasite/list-parasite/detail" }) })] }));
}
