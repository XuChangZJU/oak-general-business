import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Space, Button, Table, } from 'antd';
import PageHeader from '../../../../components/common/pageHeader';
import Style from './web.module.less';
import dayjs from 'dayjs';
export default function Render(props) {
    const { data, methods } = props;
    const { t, setPageSize, setCurrentPage, goCreate, goDetail, goUpdate, goDelete, sync, } = methods;
    const { list, showBack = true, oakLoading, oakPagination } = data;
    const { pageSize, total, currentPage } = oakPagination || {};
    return (_jsx(PageHeader, { title: "\u5FAE\u4FE1\u516C\u4F17\u53F7\u6807\u7B7E", showBack: showBack, children: _jsxs("div", { className: Style.container, children: [_jsx(Space, { children: _jsx(Button, { type: "primary", onClick: () => {
                            goCreate();
                        }, children: "\u6DFB\u52A0TAG" }) }), _jsx(Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
                        {
                            dataIndex: '$$seq$$',
                            title: '序号',
                            width: 100,
                        },
                        {
                            dataIndex: 'text',
                            title: t('wechatPublicTag:attr.text'),
                            width: 200,
                            ellipsis: true,
                        },
                        {
                            dataIndex: 'wechatId',
                            title: t('wechatPublicTag:attr.wechatId'),
                            width: 100,
                        },
                        {
                            dataIndex: 'sync',
                            title: t('wechatPublicTag:attr.sync'),
                            width: 100,
                            render: (value, record, index) => {
                                return value ? '同步' : '未同步';
                            },
                        },
                        {
                            dataIndex: 'syncAt',
                            title: t('wechatPublicTag:attr.syncAt'),
                            width: 100,
                            render: (value, record, index) => {
                                return dayjs(value).format('YYYY-MM-DD HH:mm');
                            },
                        },
                        {
                            dataIndex: '$$createAt$$',
                            title: '创建时间',
                            width: 100,
                            render: (value, record, index) => {
                                return dayjs(value).format('YYYY-MM-DD HH:mm');
                            },
                        },
                        {
                            dataIndex: '$$updateAt$$',
                            title: '更新时间',
                            width: 100,
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
                                return (_jsxs(_Fragment, { children: [_jsx(Button, { type: "link", onClick: () => {
                                                goDetail(record.id);
                                            }, children: "\u8BE6\u60C5" }), _jsx(Button, { type: "link", onClick: () => {
                                                goUpdate(record.id);
                                            }, children: "\u66F4\u65B0" }), !record.sync && _jsx(Button, { type: "link", onClick: () => {
                                                sync(record.id);
                                            }, children: "\u540C\u6B65" })] }));
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
                    } })] }) }));
}
