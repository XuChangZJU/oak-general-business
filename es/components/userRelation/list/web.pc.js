import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Table, Button, Avatar, Space, Tag, Modal, } from 'antd';
export default function Render(props) {
    const { oakPagination, users = [], entity, entityId, oakLoading, } = props.data;
    const { pageSize, total, currentPage } = oakPagination || {};
    const { goUpsert, t, setCurrentPage, setPageSize, confirmDelete, goUpdate, } = props.methods;
    const [idRemove, setIdRemove] = useState(undefined);
    const [inviteVisible, setInviteVisible] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(Space, { style: { marginBottom: 16 }, children: _jsx(Button, { type: "primary", onClick: () => goUpsert(), children: "\u6DFB\u52A0" }) }), _jsx(Table, { loading: oakLoading, rowKey: "id", columns: [
                    {
                        width: 100,
                        dataIndex: 'index',
                        title: '序号',
                        render: (value, record, index) => index + 1,
                    },
                    {
                        dataIndex: 'avatar',
                        title: '头像',
                        render: (value, record, index) => {
                            return value ? (_jsx(Avatar, { src: value, shape: "circle" })) : (_jsx("span", { children: "\u672A\u8BBE\u7F6E" }));
                        },
                    },
                    {
                        dataIndex: 'name',
                        title: '姓名',
                    },
                    {
                        dataIndex: 'nickname',
                        title: '昵称',
                    },
                    {
                        dataIndex: 'mobile',
                        title: '手机号',
                    },
                    {
                        dataIndex: 'relations',
                        title: '权限',
                        render: (value, record, index) => {
                            return (_jsx(Space, { children: record.userRelation$user?.map((ele, index) => (_jsx(Tag, { children: ele.relation.name
                                        ? t(entity +
                                            ':r.' +
                                            ele.relation.name)
                                        : ele.relation.display }, index))) }));
                        },
                    },
                    {
                        title: '操作',
                        dataIndex: 'operate',
                        render: (value, record, index) => {
                            return (_jsxs(Space, { children: [_jsx("a", { onClick: (e) => goUpdate(record.id), children: !!record.userRelation$user?.length
                                            ? t('common::action.update')
                                            : t('common::action.grant') }), !!record.userRelation$user?.length && (_jsx("a", { style: {
                                            color: 'var(--oak-color-error)',
                                        }, onClick: () => setIdRemove(record.id), children: t('common::action.revoke') }))] }));
                        },
                    },
                ], dataSource: users, pagination: {
                    total,
                    pageSize,
                    current: currentPage,
                    onShowSizeChange: (current, size) => {
                        setPageSize(current);
                    },
                    onChange: (page, pageSize) => {
                        setCurrentPage(page);
                    },
                } }), _jsx(Modal, { title: t('common::areYouSure'), open: !!idRemove, onOk: async () => {
                    await confirmDelete(idRemove);
                    setIdRemove(undefined);
                }, onCancel: () => setIdRemove(undefined), cancelText: t('common::action.cancel'), okText: t('common::action.confirm'), children: _jsx("p", { children: t('confirmRevokeAll') }) })] }));
}
