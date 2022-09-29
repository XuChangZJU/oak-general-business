"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_react_1 = require("tdesign-react");
function render() {
    var _this = this;
    var t = this.t;
    var event = this.props.event;
    var _a = this.state, _b = _a.list, list = _b === void 0 ? [] : _b, oakLoading = _a.oakLoading, pagination = _a.pagination;
    var _c = pagination || {}, pageSize = _c.pageSize, total = _c.total, currentPage = _c.currentPage;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ style: { padding: 16 } }, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Space, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ size: "medium", theme: "primary", onClick: function () {
                        _this.goNewPlatform();
                    } }, { children: "\u6DFB\u52A0\u5E73\u53F0" })) }), (0, jsx_runtime_1.jsx)(tdesign_react_1.Table, { loading: oakLoading, data: list, rowKey: "id", columns: [
                    {
                        colKey: 'id',
                        title: '序号',
                    },
                    {
                        colKey: 'name',
                        title: '名称',
                    },
                    {
                        colKey: 'description',
                        title: '描述',
                        width: 400,
                    },
                    {
                        colKey: 'config',
                        title: '配置',
                        cell: function (_a) {
                            var row = _a.row;
                            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", variant: "text", onClick: function () {
                                        _this.goSetConfig(row.id);
                                    } }, { children: "\u914D\u7F6E" })) }));
                        }
                    },
                    {
                        colKey: 'op',
                        width: 200,
                        title: '操作',
                        align: 'center',
                        cell: function (_a) {
                            var row = _a.row;
                            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", variant: "text", onClick: function () {
                                        _this.goUpdate(row.id);
                                    } }, { children: "\u66F4\u65B0" })) }));
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
