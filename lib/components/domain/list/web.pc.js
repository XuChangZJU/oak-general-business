"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const actionBtnPanel_1 = tslib_1.__importDefault(require("oak-frontend-base/es/components/actionBtnPanel"));
function Render(props) {
    const { oakPagination, list = [], oakLoading, oakFullpath, oakLegalActions, } = props.data;
    const { pageSize, total, currentPage } = oakPagination || {};
    const { t, setPageSize, setCurrentPage, goCreate, goDetail, goUpdate, } = props.methods;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [oakLegalActions?.includes('create') && ((0, jsx_runtime_1.jsx)(antd_1.Space, { style: { marginBottom: 16 }, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => {
                        goCreate();
                    }, children: "\u6DFB\u52A0\u57DF\u540D" }) })), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
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
                        render: (value, record, index) => {
                            return ((0, jsx_runtime_1.jsx)(antd_1.Typography.Link, { disabled: !record?.['#oakLegalActions']?.includes('update'), onClick: () => {
                                    goDetail(record.id);
                                }, children: value }));
                        },
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
                            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(actionBtnPanel_1.default, { mode: "table-cell", entity: "domain", items: [
                                        {
                                            label: '详情',
                                            onClick: () => {
                                                goDetail(record.id);
                                            },
                                        },
                                        {
                                            action: 'update',
                                            show: record?.['#oakLegalActions']?.includes('update'),
                                            onClick: () => {
                                                goUpdate(record.id);
                                            },
                                        },
                                    ] }) }));
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
