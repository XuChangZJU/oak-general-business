"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_react_1 = require("tdesign-react");
var tdesign_icons_react_1 = require("tdesign-icons-react");
function render() {
    var _this = this;
    var t = this.t;
    var event = this.props.event;
    var _a = this.state, _b = _a.userArr, userArr = _b === void 0 ? [] : _b, oakLoading = _a.oakLoading, stateColor = _a.stateColor, pagination = _a.pagination;
    var _c = pagination || {}, pageSize = _c.pageSize, total = _c.total, currentPage = _c.currentPage;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ style: { padding: 16 } }, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Space, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ size: "medium", theme: "primary", onClick: function () {
                        _this.goNewUser();
                    } }, { children: "\u6DFB\u52A0\u7528\u6237" })) }), (0, jsx_runtime_1.jsx)(tdesign_react_1.Table, { loading: oakLoading, data: userArr, rowKey: "id", columns: [
                    {
                        colKey: 'id',
                        title: '序号',
                    },
                    {
                        width: 100,
                        colKey: 'avatar',
                        title: '头像',
                        cell: function (_a) {
                            var row = _a.row;
                            if (!row.avatar) {
                                return (0, jsx_runtime_1.jsx)(tdesign_react_1.Avatar, { icon: (0, jsx_runtime_1.jsx)(tdesign_icons_react_1.UserIcon, {}) });
                            }
                            return (0, jsx_runtime_1.jsx)(tdesign_react_1.Avatar, { image: row.avatar, shape: "circle" });
                        },
                    },
                    {
                        colKey: 'nickname',
                        title: '昵称',
                    },
                    {
                        colKey: 'name',
                        title: '姓名',
                    },
                    {
                        colKey: 'mobile',
                        title: '手机号',
                    },
                    {
                        colKey: 'userState',
                        title: '状态',
                        cell: function (_a) {
                            var row = _a.row, rowIndex = _a.rowIndex;
                            return ((0, jsx_runtime_1.jsx)(tdesign_react_1.Tag, tslib_1.__assign({ theme: stateColor[row.userState] }, { children: t("user:v.userState.".concat(row.userState)) })));
                        },
                    },
                    {
                        colKey: 'op',
                        width: 200,
                        title: '操作',
                        align: 'center',
                        cell: function (_a) {
                            var row = _a.row;
                            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", variant: "text", onClick: function () {
                                            _this.onCellClicked(row.id, event);
                                        } }, { children: "\u8BE6\u60C5" })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", variant: "text", onClick: function () {
                                            var confirmDia = tdesign_react_1.DialogPlugin.confirm({
                                                header: '确认删除该用户吗？',
                                                body: '删除后，用户不可恢复',
                                                confirmBtn: '确定',
                                                cancelBtn: '取消',
                                                onConfirm: function (_a) {
                                                    var e = _a.e;
                                                    return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                        return tslib_1.__generator(this, function (_b) {
                                                            switch (_b.label) {
                                                                case 0: return [4 /*yield*/, this.execute('remove')];
                                                                case 1:
                                                                    _b.sent();
                                                                    confirmDia.hide();
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    });
                                                },
                                                onClose: function (_a) {
                                                    var e = _a.e, trigger = _a.trigger;
                                                    confirmDia.hide();
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
                    onPageSizeChange: function (pageSize) {
                        _this.setPageSize(pageSize);
                    },
                } })] })));
}
exports.default = render;
