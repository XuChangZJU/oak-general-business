"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var actionBtnPanel_1 = tslib_1.__importDefault(require("oak-frontend-base/es/components/actionBtnPanel"));
function Render(props) {
    var _this = this;
    var data = props.data, methods = props.methods;
    var t = methods.t, setPageSize = methods.setPageSize, setCurrentPage = methods.setCurrentPage, goDetailById = methods.goDetailById;
    var messages = data.messages, oakFullpath = data.oakFullpath, oakLoading = data.oakLoading, oakPagination = data.oakPagination;
    var _a = oakPagination || {}, pageSize = _a.pageSize, total = _a.total, currentPage = _a.currentPage;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ title: "\u6D88\u606F\u901A\u77E5" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: messages || [], rowKey: "id", 
                // scroll={{ x: 1200 }}
                columns: [
                    {
                        dataIndex: 'serial-number',
                        title: '#',
                        render: function (value, record, index) {
                            return index + 1;
                        },
                    },
                    {
                        dataIndex: 'title',
                        title: '消息内容',
                        render: function (value, record, index) {
                            if (record.visitState === 'unvisited') {
                                return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Badge, { style: { marginRight: 5 }, status: "processing" }), (0, jsx_runtime_1.jsx)(antd_1.Typography.Link, tslib_1.__assign({ onClick: function () {
                                                goDetailById(record.id);
                                            } }, { children: value }))] }));
                            }
                            return ((0, jsx_runtime_1.jsx)(antd_1.Typography.Text, tslib_1.__assign({ onClick: function () {
                                    goDetailById(record.id);
                                } }, { children: value })));
                        },
                    },
                    {
                        dataIndex: 'type',
                        title: '类型',
                        render: function (value, record, index) {
                            return '';
                        },
                    },
                    {
                        dataIndex: 'visitState',
                        title: '是否已读',
                        render: function (value, record, index) {
                            return value === 'unvisited' ? '未读' : '已读';
                        },
                    },
                    {
                        dataIndex: '$$createAt$$',
                        title: '接收时间',
                        render: function (value, record, index) {
                            return ((0, jsx_runtime_1.jsx)("div", { children: (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm:ss') }));
                        },
                    },
                    {
                        dataIndex: 'op',
                        width: 300,
                        title: '操作',
                        align: 'center',
                        render: function (value, record, index) {
                            var _a;
                            return ((0, jsx_runtime_1.jsx)(actionBtnPanel_1.default, { mode: "table-cell", entity: "message", items: [
                                    {
                                        label: '详情',
                                        onClick: function () {
                                            goDetailById(record.id);
                                        },
                                    },
                                    {
                                        action: 'visit',
                                        show: (_a = record['#oakLegalActions']) === null || _a === void 0 ? void 0 : _a.includes('visit'),
                                        onClick: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                            return tslib_1.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        methods.updateItem({}, record.id, 'visit');
                                                        return [4 /*yield*/, methods.execute()];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); },
                                    },
                                ] }));
                        },
                        fixed: 'right',
                    },
                ], pagination: {
                    total: total,
                    pageSize: pageSize,
                    current: currentPage,
                    onShowSizeChange: function (current, pageSize) {
                        setPageSize(pageSize);
                    },
                    onChange: function (page, pageSize) {
                        setCurrentPage(page);
                    },
                } }) })) })));
}
exports.default = Render;
