"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var actionBtnPanel_1 = tslib_1.__importDefault(require("oak-frontend-base/es/components/actionBtnPanel"));
var detail_1 = tslib_1.__importDefault(require("../detail"));
var react_1 = require("react");
function render(props) {
    var _this = this;
    var _a = props.data, oakPagination = _a.oakPagination, oakFullpath = _a.oakFullpath, _b = _a.list, list = _b === void 0 ? [] : _b, oakLoading = _a.oakLoading, nameLabel = _a.nameLabel;
    var _c = oakPagination || {}, pageSize = _c.pageSize, total = _c.total, currentPage = _c.currentPage;
    var _d = props.methods, t = _d.t, setPageSize = _d.setPageSize, setCurrentPage = _d.setCurrentPage, updateItem = _d.updateItem, execute = _d.execute, getQrCode = _d.getQrCode;
    var _e = tslib_1.__read((0, react_1.useState)(false), 2), qrCodeOpen = _e[0], setQrCodeOpen = _e[1];
    var _f = tslib_1.__read((0, react_1.useState)(''), 2), parasiteId = _f[0], setParasiteId = _f[1];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
                    {
                        dataIndex: 'id',
                        title: '#',
                        render: function (value, record, index) {
                            return index + 1;
                        },
                    },
                    {
                        dataIndex: ['user', 'nickname'],
                        title: nameLabel || '名称',
                        render: function (value, record, index) {
                            return value !== 'shadow_user' && value || '--';
                        },
                    },
                    {
                        dataIndex: '$$createAt$$',
                        title: '创建时间',
                        render: function (value, record, index) {
                            return (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm');
                        },
                    },
                    {
                        dataIndex: 'expired',
                        title: '状态',
                        render: function (value, record, index) {
                            return ((0, jsx_runtime_1.jsxs)(antd_1.Typography.Text, tslib_1.__assign({ type: record.expired ? 'danger' : 'success' }, { children: [record.expired ? '失效' : '有效', !record.expired && ((0, jsx_runtime_1.jsxs)(antd_1.Typography.Text, { children: ["\u00A0", (0, dayjs_1.default)(record.expiresAt).format('YYYY-MM-DD HH:mm')] }))] })));
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
                        render: function (value, record, rowIndex) {
                            var _a, _b;
                            return ((0, jsx_runtime_1.jsx)(actionBtnPanel_1.default, { mode: "table-cell", entity: "parasite", items: [
                                    {
                                        label: '失效',
                                        action: 'cancel',
                                        // alerted: true,
                                        show: (_a = record['#oakLegalActions']) === null || _a === void 0 ? void 0 : _a.includes('cancel'),
                                        onClick: function () {
                                            updateItem({ expired: true }, record.id, 'cancel');
                                            execute();
                                        },
                                    },
                                    {
                                        label: '采集码',
                                        action: 'qrcode',
                                        show: (_b = record['#oakLegalActions']) === null || _b === void 0 ? void 0 : _b.includes('qrcode'),
                                        // alerted: true,
                                        onClick: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                            return tslib_1.__generator(this, function (_a) {
                                                setParasiteId(record.id);
                                                setQrCodeOpen(true);
                                                return [2 /*return*/];
                                            });
                                        }); },
                                    },
                                ] }));
                        },
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
                } }), (0, jsx_runtime_1.jsx)(antd_1.Modal, tslib_1.__assign({ width: 786, open: qrCodeOpen, destroyOnClose: true, onCancel: function () {
                    setQrCodeOpen(false);
                }, footer: null }, { children: (0, jsx_runtime_1.jsx)(detail_1.default, { oakId: parasiteId, oakAutoUnmount: true, oakPath: "$parasite/list-parasite/detail" }) }))] }));
}
exports.default = render;
