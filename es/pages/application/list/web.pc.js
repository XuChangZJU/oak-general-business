import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, Button, Space, Typography } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import ActionBtnPanel from 'oak-frontend-base/es/components/actionBtnPanel';
import Style from './web.module.less';
export default function Render(props) {
    const { oakPagination, list = [], oakLoading, showBack, variant, oakFullpath, } = props.data;
    const { pageSize, total, currentPage } = oakPagination || {};
    const { t, setPageSize, setCurrentPage, goCreate, goDetail, goSetConfig, goUpdate, removeApplication, } = props.methods;
    return (_jsxs(Container, { variant: variant, children: [_jsx(Space, { children: _jsx(Button, { type: "primary", onClick: () => {
                        goCreate();
                    }, children: "\u6DFB\u52A0\u5E94\u7528" }) }), _jsx(Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
                    // {
                    //     dataIndex: 'id',
                    //     title: '序号',
                    //     render: (value, record, index) => {
                    //         return index + 1;
                    //     },
                    // },
                    {
                        dataIndex: 'name',
                        title: '应用名称',
                        width: 300,
                        render: (value, record, index) => {
                            return (_jsx(Typography.Link, { onClick: () => {
                                    goDetail(record.id);
                                }, children: value }));
                        },
                    },
                    {
                        dataIndex: 'description',
                        title: '应用描述',
                        width: 200,
                        ellipsis: true,
                    },
                    {
                        dataIndex: 'type',
                        title: '应用类型',
                        render: (value, record, index) => {
                            return t(`application:v.type.${value}`);
                        },
                    },
                    {
                        dataIndex: 'config',
                        title: '应用配置',
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
                            return (_jsx(_Fragment, { children: _jsx(ActionBtnPanel, { mode: "table-cell", entity: "application", items: [
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
                                        {
                                            action: 'remove',
                                            alerted: true,
                                            show: record?.['#oakLegalActions']?.includes('remove'),
                                            onClick: () => {
                                                removeApplication(record.id);
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
function Container(props) {
    const { children, variant = 'alone', showBack } = props;
    if (['inline', 'dialog'].includes(variant)) {
        return _jsx(_Fragment, { children: children });
    }
    return (_jsx(PageHeader, { showBack: showBack, title: "\u5E94\u7528\u7BA1\u7406", children: _jsx("div", { className: Style.container, children: children }) }));
}
