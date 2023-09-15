"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
// import UserEntityGrantList from '../../../pages/userEntityGrant/list';
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { oakPagination, users = [], entity, entityId, oakLoading, } = props.data;
    const { pageSize, total, currentPage } = oakPagination || {};
    const { goUpsert, t, setCurrentPage, setPageSize, confirmDelete, goUpdate, } = props.methods;
    const [idRemove, setIdRemove] = (0, react_1.useState)(undefined);
    const [inviteVisible, setInviteVisible] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)(antd_1.Space, { style: { marginBottom: 16 }, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => goUpsert(), children: "\u6DFB\u52A0" }) }), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, rowKey: "id", columns: [
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
                                    return value ? ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: value, shape: "circle" })) : ((0, jsx_runtime_1.jsx)("span", { children: "\u672A\u8BBE\u7F6E" }));
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
                                    return ((0, jsx_runtime_1.jsx)(antd_1.Space, { children: record.userRelation$user?.map((ele, index) => ((0, jsx_runtime_1.jsx)(antd_1.Tag, { children: ele.relation.name ? t(entity + ':r.' + ele.relation.name) : ele.relation.display }, index))) }));
                                },
                            },
                            {
                                title: '操作',
                                dataIndex: 'operate',
                                render: (value, record, index) => {
                                    return ((0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)("a", { onClick: (e) => goUpdate(record.id), children: !!record.userRelation$user?.length
                                                    ? t('common::action.update')
                                                    : t('common::action.grant') }), !!record.userRelation$user?.length && ((0, jsx_runtime_1.jsx)("a", { style: {
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
                        } })] }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { title: t('common::areYouSure'), open: !!idRemove, onOk: async () => {
                    await confirmDelete(idRemove);
                    setIdRemove(undefined);
                }, onCancel: () => setIdRemove(undefined), cancelText: t('common::action.cancel'), okText: t('common::action.confirm'), children: (0, jsx_runtime_1.jsx)("p", { children: t('confirmRevokeAll') }) })] }));
}
exports.default = Render;
