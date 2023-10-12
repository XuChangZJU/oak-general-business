import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Table, Button, Space, Typography, Select } from 'antd';
import Styles from './web.module.less';
export default function Render(props) {
    const { oakPagination, mtt = [], dirtyIds = [], oakLoading, messageTypes = [], applicationId, wechatPublicTemplates = [], } = props.data;
    const { setCurrentPage, setPageSize, t, addItem, syncTemplate, removeItem, updateItem, recoverItem, resetItem, execute } = props.methods;
    const [syncDisable, setSyncDisable] = useState(false);
    const [open, setOpen] = useState(false);
    const { pageSize, total, currentPage } = oakPagination || {};
    console.log(messageTypes, wechatPublicTemplates);
    return (_jsxs("div", { className: Styles.container, children: [_jsxs(Space, { children: [_jsx(Button, { type: "default", disabled: !(messageTypes.length > 0 && wechatPublicTemplates.length > 0), onClick: () => {
                            addItem({
                                templateId: wechatPublicTemplates[0].id,
                            });
                        }, children: t('common::action.create') }), _jsx(Button, { type: "default", disabled: syncDisable, onClick: async () => {
                            setSyncDisable(true);
                            await syncTemplate();
                            setSyncDisable(false);
                        }, children: '同步模板' }), dirtyIds.length > 0 && (_jsx(Button, { type: "primary", onClick: () => {
                            execute();
                        }, children: t('common::action.confirm') }))] }), _jsx(Table, { loading: oakLoading, dataSource: mtt, rowKey: "id", columns: [
                    {
                        dataIndex: 'type',
                        title: '消息类型',
                        width: 180,
                        render: (value, record, index) => {
                            if (dirtyIds.includes(record.id) && !record.$$deleteAt$$) {
                                return (_jsx(Select, { style: {
                                        width: '100%',
                                    }, value: value, onChange: (e) => updateItem({
                                        type: e,
                                    }, record.id), options: messageTypes.map(ele => ({
                                        value: ele,
                                        label: ele
                                    })) }));
                            }
                            return (_jsx(Typography.Text, { type: !!record.$$deleteAt$$ ? 'danger' : undefined, delete: !!record.$$deleteAt$$, children: value }));
                        },
                    },
                    {
                        dataIndex: 'templateId',
                        title: '模板消息标题',
                        width: 300,
                        render: (value, record, index) => {
                            if (dirtyIds.includes(record.id) && !record.$$deleteAt$$) {
                                return (_jsx(Select, { style: {
                                        width: '100%',
                                    }, value: value, onChange: (e) => updateItem({
                                        type: e,
                                    }, record.id), options: wechatPublicTemplates.map(ele => ({
                                        value: ele.id,
                                        label: ele.title
                                    })) }));
                            }
                            return (_jsx(Typography.Text, { type: !!record.$$deleteAt$$ ? 'danger' : undefined, delete: !!record.$$deleteAt$$, children: record?.template?.title }));
                        },
                    },
                    {
                        dataIndex: 'op',
                        width: 200,
                        title: '操作',
                        align: 'center',
                        render: (value, record, index) => {
                            return (_jsxs(_Fragment, { children: [!record.$$deleteAt$$ ? (_jsx(Button, { type: "link", danger: true, onClick: () => {
                                            removeItem(record.id);
                                        }, children: t('common::action.remove') })) : (_jsx(Button, { type: "link", onClick: () => {
                                            recoverItem(record.id);
                                        }, children: "\u6062\u590D" })), !record.$$deleteAt$$ && (!dirtyIds.includes(record.id) ? (_jsx(Button, { type: "link", onClick: () => {
                                            updateItem({}, record.id);
                                        }, children: t('common::action.update') })) : (_jsx(Button, { type: "link", onClick: () => {
                                            resetItem(record.id);
                                        }, children: "\u6062\u590D" })))] }));
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
