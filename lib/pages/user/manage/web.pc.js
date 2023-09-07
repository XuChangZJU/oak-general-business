"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var filterPanel_1 = tslib_1.__importDefault(require("oak-frontend-base/es/components/filterPanel"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var methods = props.methods, data = props.data;
    var t = methods.t, setPageSize = methods.setPageSize, setCurrentPage = methods.setCurrentPage, goNewUser = methods.goNewUser, onCellClicked = methods.onCellClicked;
    var oakFullpath = data.oakFullpath, oakLoading = data.oakLoading, oakPagination = data.oakPagination, _a = data.userArr, userArr = _a === void 0 ? [] : _a, stateColor = data.stateColor, isRoot = data.isRoot;
    var _b = oakPagination || {}, pageSize = _b.pageSize, total = _b.total, currentPage = _b.currentPage;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [isRoot && ((0, jsx_runtime_1.jsx)(antd_1.Space, tslib_1.__assign({ style: { marginBottom: 16 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                        goNewUser();
                    } }, { children: "\u6DFB\u52A0\u7528\u6237" })) }))), (0, jsx_runtime_1.jsx)(filterPanel_1.default, { entity: "user", oakPath: oakFullpath, columns: [
                    {
                        attr: 'nickname',
                        op: '$includes',
                    },
                    {
                        attr: 'name',
                        op: '$includes',
                    },
                    {
                        attr: 'userState',
                    },
                ] }), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: userArr, rowKey: "id", columns: [
                    {
                        dataIndex: 'id',
                        title: '#',
                        render: function (value, record, index) {
                            return index + 1;
                        },
                    },
                    {
                        width: 100,
                        dataIndex: 'avatar',
                        title: '头像',
                        render: function (value, record, index) {
                            if (!value) {
                                return ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { icon: (0, jsx_runtime_1.jsx)(icons_1.UserOutlined, {}) }));
                            }
                            return (0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: value, shape: "circle" });
                        },
                    },
                    {
                        dataIndex: 'nickname',
                        title: '昵称',
                    },
                    {
                        dataIndex: 'name',
                        title: '姓名',
                    },
                    {
                        dataIndex: 'mobile',
                        title: '手机号',
                    },
                    {
                        dataIndex: 'userState',
                        title: '状态',
                        render: function (value, record, index) {
                            return ((0, jsx_runtime_1.jsx)(antd_1.Tag, tslib_1.__assign({ color: stateColor[value] }, { children: t("user:v.userState.".concat(value)) })));
                        },
                    },
                    {
                        dataIndex: 'op',
                        width: 200,
                        title: '操作',
                        align: 'center',
                        render: function (value, record, index) {
                            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                        onCellClicked(record.id);
                                    } }, { children: "\u8BE6\u60C5" })) }));
                        },
                        fixed: 'right',
                    },
                ], pagination: {
                    total: total,
                    pageSize: pageSize,
                    current: currentPage,
                    onShowSizeChange: function (pageSize) {
                        setPageSize(pageSize);
                    },
                    onChange: function (page) {
                        setCurrentPage(page);
                    },
                } })] })));
}
exports.default = Render;
