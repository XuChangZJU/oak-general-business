"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var cellButton_1 = tslib_1.__importDefault(require("../../../components/message/cellButton"));
var MessageType = {
    adminNotification: '系统通知',
    conversationMessage: '客服消息',
};
function Render(props) {
    var data = props.data, methods = props.methods;
    var t = methods.t, setPageSize = methods.setPageSize, setCurrentPage = methods.setCurrentPage, goDetailById = methods.goDetailById;
    var messages = data.messages, oakFullpath = data.oakFullpath, oakLoading = data.oakLoading, pagination = data.pagination;
    var _a = pagination || {}, pageSize = _a.pageSize, total = _a.total, currentPage = _a.currentPage;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ title: "\u6D88\u606F\u901A\u77E5" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: messages || [], rowKey: "id", 
                // scroll={{ x: 1200 }}
                columns: [
                    // {
                    //     dataIndex: 'serial-number',
                    //     title: '序号',
                    //     render: (value, record, index) => {
                    //         return index + 1;
                    //     },
                    // },
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
                            return MessageType[value];
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
                            return ((0, jsx_runtime_1.jsxs)(antd_1.Space, tslib_1.__assign({ wrap: true }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                            goDetailById(record === null || record === void 0 ? void 0 : record.id);
                                        } }, { children: "\u8BE6\u60C5" })), (0, jsx_runtime_1.jsx)(cellButton_1.default, { oakId: record.id, oakPath: "".concat(oakFullpath, ".").concat(record.id) })] })));
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
