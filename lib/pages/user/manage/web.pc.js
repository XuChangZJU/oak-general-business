"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
function render() {
    var _this = this;
    var t = this.t;
    var event = this.props.event;
    var _a = this.state, _b = _a.userArr, userArr = _b === void 0 ? [] : _b, oakLoading = _a.oakLoading, stateColor = _a.stateColor, pagination = _a.pagination;
    var _c = pagination || {}, pageSize = _c.pageSize, total = _c.total, currentPage = _c.currentPage;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ style: { padding: 16 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                        _this.goNewUser();
                    } }, { children: "\u6DFB\u52A0\u7528\u6237" })) }), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: userArr, rowKey: "id", columns: [
                    {
                        dataIndex: 'id',
                        title: '序号',
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
                            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                            _this.onCellClicked(record.id, event);
                                        } }, { children: "\u8BE6\u60C5" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                            var modal = antd_1.Modal.confirm({
                                                title: '确认删除该用户吗？',
                                                content: '删除后，用户不可恢复',
                                                okText: '确定',
                                                cancelText: '取消',
                                                onOk: function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                    return tslib_1.__generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, this.addOperation({
                                                                    action: 'remove',
                                                                    data: {},
                                                                    filter: {
                                                                        id: record.id,
                                                                    },
                                                                })];
                                                            case 1:
                                                                _a.sent();
                                                                return [4 /*yield*/, this.execute()];
                                                            case 2:
                                                                _a.sent();
                                                                modal.destroy();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); },
                                                onCancel: function (e) {
                                                    modal.destroy();
                                                },
                                            });
                                        } }, { children: "\u5220\u9664" }))] }));
                        },
                        fixed: 'right',
                    },
                ], pagination: {
                    total: total,
                    pageSize: pageSize,
                    current: currentPage,
                    onShowSizeChange: function (pageSize) {
                        _this.setPageSize(pageSize);
                    },
                    onChange: function (page) {
                        _this.setCurrentPage(page);
                    }
                } })] })));
}
exports.default = render;
