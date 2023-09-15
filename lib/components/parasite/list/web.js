"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const actionBtnPanel_1 = tslib_1.__importDefault(require("oak-frontend-base/es/components/actionBtnPanel"));
const detail_1 = tslib_1.__importDefault(require("../detail"));
const react_1 = require("react");
function render(props) {
    const { oakPagination, oakFullpath, list = [], oakLoading, nameLabel, } = props.data;
    const { pageSize, total, currentPage } = oakPagination || {};
    const { t, setPageSize, setCurrentPage, updateItem, execute, getQrCode } = props.methods;
    const [qrCodeOpen, setQrCodeOpen] = (0, react_1.useState)(false);
    const [parasiteId, setParasiteId] = (0, react_1.useState)('');
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
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
                            return (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm');
                        },
                    },
                    {
                        dataIndex: 'expired',
                        title: '状态',
                        render: (value, record, index) => {
                            return ((0, jsx_runtime_1.jsxs)(antd_1.Typography.Text, { type: record.expired ? 'danger' : 'success', children: [record.expired ? '失效' : '有效', !record.expired && ((0, jsx_runtime_1.jsxs)(antd_1.Typography.Text, { children: ["\u00A0", (0, dayjs_1.default)(record.expiresAt).format('YYYY-MM-DD HH:mm')] }))] }));
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
                            return ((0, jsx_runtime_1.jsx)(actionBtnPanel_1.default, { mode: "table-cell", entity: "parasite", items: [
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
                } }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { width: 786, open: qrCodeOpen, destroyOnClose: true, onCancel: () => {
                    setQrCodeOpen(false);
                }, footer: null, children: (0, jsx_runtime_1.jsx)(detail_1.default, { oakId: parasiteId, oakAutoUnmount: true, oakPath: "$parasite/list-parasite/detail" }) })] }));
}
exports.default = render;
