import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Table, Modal, } from 'antd';
import dayjs from 'dayjs';
const { confirm } = Modal;
export default function Render(props) {
    const { data, methods } = props;
    const { t, setPageSize, setCurrentPage, sync, } = methods;
    const { userWechatPublicTags, showBack = true, oakLoading, oakPagination, applicationId, oakFullpath } = data;
    const { pageSize, total, currentPage } = oakPagination || {};
    return (_jsx(_Fragment, { children: _jsx(Table, { loading: oakLoading, dataSource: userWechatPublicTags, rowKey: "id", columns: [
                {
                    dataIndex: 'text',
                    title: '标签名称',
                    width: 150,
                    ellipsis: true,
                },
                {
                    dataIndex: 'iState',
                    title: '状态',
                    width: 100,
                    render: (value, record, index) => {
                        return value === 'wait' ? '待同步' : value === 'success' ? '同步成功' : '同步失败';
                    },
                },
                {
                    dataIndex: 'syncAt',
                    title: '同步时间',
                    width: 150,
                    render: (value, record, index) => {
                        return value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '--';
                    },
                },
                {
                    dataIndex: '$$createAt$$',
                    title: '创建时间',
                    width: 150,
                    render: (value, record, index) => {
                        return dayjs(value).format('YYYY-MM-DD HH:mm');
                    },
                },
                {
                    dataIndex: 'op',
                    width: 200,
                    title: '操作',
                    align: 'center',
                    render: (value, record, index) => {
                        return (_jsx(_Fragment, { children: _jsx(Button, { type: "link", onClick: () => {
                                    sync(record.id, record.openId);
                                }, children: "\u540C\u6B65" }) }));
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
            } }) }));
}
