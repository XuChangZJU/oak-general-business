import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, Tag, Button, Modal, Space, Row, Col, Input, } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Style from './web.module.less';
import PageHeader from '../../../components/common/pageHeader';
export default function render(props) {
    const { pagination, articles = [], oakLoading, searchValue, title, showBack = false, } = props.data;
    const { pageSize, total, currentPage } = pagination || {};
    const { t, goUpsert, goDetailById, goUpsertById, searchConfirm, searchValueChange, setCurrentPage, setPageSize, onRemove, } = props.methods;
    return (_jsx(PageHeader, { title: title || '文章管理', showBack: showBack, children: _jsxs("div", { className: Style.container, children: [_jsxs(Row, { children: [_jsx(Col, { flex: "auto", children: _jsx(Space, { children: _jsx(Button, { type: "primary", onClick: () => {
                                        goUpsert();
                                    }, children: t('action.add') }) }) }), _jsx(Col, { flex: "none", children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165\u6807\u9898", value: searchValue, allowClear: true, onChange: (e) => {
                                    searchValueChange(e.target.value);
                                }, suffix: _jsx(SearchOutlined, {}), onPressEnter: (e) => {
                                    searchConfirm();
                                } }) })] }), _jsx(Table, { loading: oakLoading, dataSource: articles, rowKey: "index", columns: [
                        {
                            align: 'center',
                            dataIndex: 'serial-number',
                            title: '序号',
                            render(value, record, index) {
                                return index + 1;
                            },
                        },
                        {
                            dataIndex: 'iState',
                            title: t('book:attr.iState'),
                            render: (value, record, index) => {
                                return (_jsx(Tag, { color: "processing", children: t(`book:v.iState.${value}`) }));
                            },
                        },
                        {
                            dataIndex: 'title',
                            title: t('article:attr.title'),
                        },
                        {
                            dataIndex: 'author',
                            title: t('article:attr.author'),
                        },
                        {
                            dataIndex: 'abstract',
                            title: t('article:attr.abstract'),
                        },
                        {
                            dataIndex: 'op',
                            width: 300,
                            title: '操作',
                            align: 'center',
                            render: (value, record, index) => {
                                return (_jsxs(Space, { children: [_jsx(Button, { type: "link", onClick: () => {
                                                goDetailById(record.id);
                                            }, children: "\u8BE6\u60C5" }), _jsx(Button, { type: "link", onClick: () => {
                                                goUpsertById(record.id);
                                            }, children: "\u7F16\u8F91" }), _jsx(Button, { type: "link", onClick: () => {
                                                const modal = Modal.confirm({
                                                    title: '确认删除该文章吗？',
                                                    content: '删除后，文章不可恢复',
                                                    okText: '确定',
                                                    cancelText: '取消',
                                                    onOk: async (e) => {
                                                        onRemove(record.id);
                                                        modal.destroy();
                                                    },
                                                    onCancel: (e) => {
                                                        modal.destroy();
                                                    },
                                                });
                                            }, children: "\u5220\u9664" })] }));
                            },
                            fixed: 'right',
                        },
                    ], pagination: {
                        total,
                        pageSize,
                        current: currentPage,
                        onShowSizeChange: (current, pageSize) => {
                            setPageSize(pageSize);
                        },
                        onChange: (current) => {
                            setCurrentPage(current);
                        },
                    } })] }) }));
}
