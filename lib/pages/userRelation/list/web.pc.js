"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
// import UserEntityGrantList from '../../../pages/userEntityGrant/list';
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var _this = this;
    var _a = props.data, pagination = _a.pagination, _b = _a.users, users = _b === void 0 ? [] : _b, entity = _a.entity, entityId = _a.entityId, oakLoading = _a.oakLoading, _c = _a.showBack, showBack = _c === void 0 ? false : _c;
    var _d = pagination || {}, pageSize = _d.pageSize, total = _d.total, currentPage = _d.currentPage;
    var _e = props.methods, goUpsert = _e.goUpsert, t = _e.t, setCurrentPage = _e.setCurrentPage, setPageSize = _e.setPageSize, confirmDelete = _e.confirmDelete, goUpdate = _e.goUpdate;
    var _f = tslib_1.__read((0, react_1.useState)(undefined), 2), idRemove = _f[0], setIdRemove = _f[1];
    var _g = tslib_1.__read((0, react_1.useState)(false), 2), inviteVisible = _g[0], setInviteVisible = _g[1];
    return ((0, jsx_runtime_1.jsxs)(pageHeader_1.default, tslib_1.__assign({ title: "\u6743\u9650\u5217\u8868", showBack: showBack }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () { return goUpsert(); } }, { children: "\u6DFB\u52A0" })) }), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, rowKey: "id", columns: [
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
                                    return ((0, jsx_runtime_1.jsx)(antd_1.Space, { children: (_a = record.relations) === null || _a === void 0 ? void 0 : _a.map(function (ele, index) { return ((0, jsx_runtime_1.jsx)(antd_1.Tag, { children: t(entity + ':r.' + ele) }, index)); }) }));
                                },
                            },
                            {
                                title: '操作',
                                dataIndex: 'operate',
                                render: function (value, record, index) {
                                    var _a, _b;
                                    return ((0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function (e) { return goUpdate(record.id); } }, { children: ((_a = record.relations) === null || _a === void 0 ? void 0 : _a.length) > 0
                                                    ? t('common:action.update')
                                                    : t('common:action.grant') })), ((_b = record.relations) === null || _b === void 0 ? void 0 : _b.length) > 0 && ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ danger: true, type: "link", onClick: function () {
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
                }); }, onCancel: function () { return setIdRemove(undefined); }, cancelText: t('common:action.cancel'), okText: t('common:action.confirm') }, { children: (0, jsx_runtime_1.jsx)("p", { children: t('confirmRevokeAll') }) }))] })));
}
exports.default = Render;
