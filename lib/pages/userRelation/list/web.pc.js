"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
// import UserEntityGrantList from '../../../pages/userEntityGrant/list';
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var _this = this;
    var _a = props.data, oakPagination = _a.oakPagination, _b = _a.users, users = _b === void 0 ? [] : _b, entity = _a.entity, entityId = _a.entityId, oakLoading = _a.oakLoading;
    var _c = oakPagination || {}, pageSize = _c.pageSize, total = _c.total, currentPage = _c.currentPage;
    var _d = props.methods, goUpsert = _d.goUpsert, t = _d.t, setCurrentPage = _d.setCurrentPage, setPageSize = _d.setPageSize, confirmDelete = _d.confirmDelete, goUpdate = _d.goUpdate;
    var _e = tslib_1.__read((0, react_1.useState)(undefined), 2), idRemove = _e[0], setIdRemove = _e[1];
    var _f = tslib_1.__read((0, react_1.useState)(false), 2), inviteVisible = _f[0], setInviteVisible = _f[1];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Space, tslib_1.__assign({ style: { marginBottom: 16 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () { return goUpsert(); } }, { children: "\u6DFB\u52A0" })) })), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, rowKey: "id", columns: [
                            {
                                width: 100,
                                dataIndex: 'index',
                                title: '序号',
                                render: function (value, record, index) { return index + 1; },
                            },
                            {
                                dataIndex: 'avatar',
                                title: '头像',
                                render: function (value, record, index) {
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
                                render: function (value, record, index) {
                                    var _a;
                                    return ((0, jsx_runtime_1.jsx)(antd_1.Space, { children: (_a = record.userRelation$user) === null || _a === void 0 ? void 0 : _a.map(function (ele, index) { return ((0, jsx_runtime_1.jsx)(antd_1.Tag, { children: ele.relation.name ? t(entity + ':r.' + ele.relation.name) : ele.relation.display }, index)); }) }));
                                },
                            },
                            {
                                title: '操作',
                                dataIndex: 'operate',
                                render: function (value, record, index) {
                                    var _a, _b;
                                    return ((0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)("a", tslib_1.__assign({ onClick: function (e) { return goUpdate(record.id); } }, { children: !!((_a = record.userRelation$user) === null || _a === void 0 ? void 0 : _a.length)
                                                    ? t('common:action.update')
                                                    : t('common:action.grant') })), !!((_b = record.userRelation$user) === null || _b === void 0 ? void 0 : _b.length) && ((0, jsx_runtime_1.jsx)("a", tslib_1.__assign({ style: {
                                                    color: 'var(--oak-color-error)',
                                                }, onClick: function () {
                                                    return setIdRemove(record.id);
                                                } }, { children: t('common:action.revoke') })))] }));
                                },
                            },
                        ], dataSource: users, pagination: {
                            total: total,
                            pageSize: pageSize,
                            current: currentPage,
                            onShowSizeChange: function (current, size) {
                                setPageSize(current);
                            },
                            onChange: function (page, pageSize) {
                                setCurrentPage(page);
                            },
                        } })] })), (0, jsx_runtime_1.jsx)(antd_1.Modal, tslib_1.__assign({ title: t('common:areYouSure'), open: !!idRemove, onOk: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, confirmDelete(idRemove)];
                            case 1:
                                _a.sent();
                                setIdRemove(undefined);
                                return [2 /*return*/];
                        }
                    });
                }); }, onCancel: function () { return setIdRemove(undefined); }, cancelText: t('common:action.cancel'), okText: t('common:action.confirm') }, { children: (0, jsx_runtime_1.jsx)("p", { children: t('confirmRevokeAll') }) }))] }));
}
exports.default = Render;
