import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, Button, Space, Typography } from 'antd';
export default function Render(props) {
    const { oakPagination, list = [], oakLoading, oakFullpath, } = props.data;
    const { pageSize, total, currentPage } = oakPagination || {};
    const { t, setPageSize, setCurrentPage, goCreate, goDetail, goSetConfig, goUpdate, remove, } = props.methods;
    return (_jsxs(_Fragment, { children: [_jsx(Space, { style: { marginBottom: 16 }, children: _jsx(Button, { type: "primary", onClick: () => {
                        goCreate();
                    }, children: "\u6DFB\u52A0\u8BA2\u9605\u53F7" }) }), _jsx(Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
                    // {
                    //     dataIndex: 'id',
                    //     title: '序号',
                    //     render: (value, record, index) => {
                    //         return index + 1;
                    //     },
                    // },
                    {
                        dataIndex: 'name',
                        title: '订阅号名称',
                        width: 300,
                        render: (value, record, index) => {
                            return (_jsx(Typography.Link, { onClick: () => {
                                    goDetail(record.id);
                                }, children: value }));
                        },
                    },
                    {
                        dataIndex: 'description',
                        title: '描述',
                        width: 200,
                        ellipsis: true,
                    },
                    {
                        dataIndex: 'config',
                        title: '配置',
                        align: 'center',
                        render: (value, record, index) => {
                            return (_jsx(_Fragment, { children: _jsx(Button, { type: "link", onClick: () => {
                                        goSetConfig(record.id);
                                    }, children: "\u914D\u7F6E" }) }));
                        },
                    },
                    {
                        dataIndex: 'op',
                        width: 200,
                        title: '操作',
                        align: 'center',
                        render: (value, record, index) => {
                            return (_jsxs(_Fragment, { children: [_jsx(Button, { type: "link", onClick: () => {
                                            goDetail(record.id);
                                        }, children: "\u8BE6\u60C5" }), _jsx(Button, { type: "link", onClick: () => {
                                            goUpdate(record.id);
                                        }, children: "\u66F4\u65B0" }), _jsx(Button, { type: "link", onClick: () => {
                                            remove(record.id);
                                        }, children: "\u5220\u9664" })] }));
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
