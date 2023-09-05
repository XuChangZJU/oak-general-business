import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge, Table, Typography } from 'antd';
import dayjs from 'dayjs';
import Style from './web.module.less';
import PageHeader from '../../../components/common/pageHeader';
import ActionBtnPanel from 'oak-frontend-base/es/components/actionBtnPanel';
const MessageType = {
    adminNotification: '系统通知',
    conversationMessage: '客服消息',
};
export default function Render(props) {
    const { data, methods } = props;
    const { t, setPageSize, setCurrentPage, goDetailById } = methods;
    const { messages, oakFullpath, oakLoading, oakPagination } = data;
    const { pageSize, total, currentPage } = oakPagination || {};
    return (_jsx(PageHeader, { title: "\u6D88\u606F\u901A\u77E5", children: _jsx("div", { className: Style.container, children: _jsx(Table, { loading: oakLoading, dataSource: messages || [], rowKey: "id", 
                // scroll={{ x: 1200 }}
                columns: [
                    // {
                    //     dataIndex: 'serial-number',
                    //     title: '序号',
                    //     render: (value, record, index) => {
                    //         return index + 1;
                    //     },
                    // },
                    {
                        dataIndex: 'title',
                        title: '消息内容',
                        render: (value, record, index) => {
                            if (record.visitState === 'unvisited') {
                                return (_jsxs(_Fragment, { children: [_jsx(Badge, { style: { marginRight: 5 }, status: "processing" }), _jsx(Typography.Link, { onClick: () => {
                                                goDetailById(record.id);
                                            }, children: value })] }));
                            }
                            return (_jsx(Typography.Text, { onClick: () => {
                                    goDetailById(record.id);
                                }, children: value }));
                        },
                    },
                    {
                        dataIndex: 'type',
                        title: '类型',
                        render: (value, record, index) => {
                            return MessageType[value];
                        },
                    },
                    {
                        dataIndex: 'visitState',
                        title: '是否已读',
                        render: (value, record, index) => {
                            return value === 'unvisited' ? '未读' : '已读';
                        },
                    },
                    {
                        dataIndex: '$$createAt$$',
                        title: '接收时间',
                        render: (value, record, index) => {
                            return (_jsx("div", { children: dayjs(value).format('YYYY-MM-DD HH:mm:ss') }));
                        },
                    },
                    {
                        dataIndex: 'op',
                        width: 300,
                        title: '操作',
                        align: 'center',
                        render: (value, record, index) => {
                            return (_jsx(ActionBtnPanel, { mode: "table-cell", entity: "message", items: [
                                    {
                                        label: '详情',
                                        onClick: () => {
                                            goDetailById(record.id);
                                        },
                                    },
                                    {
                                        action: 'visit',
                                        show: record['#oakLegalActions']?.includes('visit'),
                                        onClick: async () => {
                                            methods.updateItem({}, record.id, 'visit');
                                            await methods.execute();
                                        },
                                    },
                                ] }));
                        },
                        fixed: 'right',
                    },
                ], pagination: {
                    total: total,
                    pageSize: pageSize,
                    current: currentPage,
                    onShowSizeChange: (current, pageSize) => {
                        setPageSize(pageSize);
                    },
                    onChange: (page, pageSize) => {
                        setCurrentPage(page);
                    },
                } }) }) }));
}
