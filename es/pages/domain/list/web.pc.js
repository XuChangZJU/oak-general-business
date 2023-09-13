import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, Button, Space, Typography } from 'antd';
import ActionBtnPanel from 'oak-frontend-base/es/components/actionBtnPanel';
export default function Render(props) {
    const { oakPagination, list = [], oakLoading, oakFullpath, oakLegalActions, } = props.data;
    const { pageSize, total, currentPage } = oakPagination || {};
    const { t, setPageSize, setCurrentPage, goCreate, goDetail, goUpdate, } = props.methods;
    return (_jsxs(_Fragment, { children: [oakLegalActions?.includes('create') && (_jsx(Space, { style: { marginBottom: 16 }, children: _jsx(Button, { type: "primary", onClick: () => {
                        goCreate();
                    }, children: "\u6DFB\u52A0\u57DF\u540D" }) })), _jsx(Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
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
                            return (_jsx(Typography.Link, { disabled: !record?.['#oakLegalActions']?.includes('update'), onClick: () => {
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
                            return (_jsx(_Fragment, { children: _jsx(ActionBtnPanel, { mode: "table-cell", entity: "domain", items: [
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
