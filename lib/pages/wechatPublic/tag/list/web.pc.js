"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../../components/common/pageHeader"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
function Render(props) {
    var data = props.data, methods = props.methods;
    var t = methods.t, setPageSize = methods.setPageSize, setCurrentPage = methods.setCurrentPage, goCreate = methods.goCreate, goDetail = methods.goDetail, goUpdate = methods.goUpdate, goDelete = methods.goDelete;
    var list = data.list, _a = data.showBack, showBack = _a === void 0 ? true : _a, oakLoading = data.oakLoading, oakPagination = data.oakPagination;
    var _b = oakPagination || {}, pageSize = _b.pageSize, total = _b.total, currentPage = _b.currentPage;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { title: "\u5FAE\u4FE1\u516C\u4F17\u53F7\u6807\u7B7E", showBack: showBack, children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () {
                            goCreate();
                        }, children: "\u6DFB\u52A0TAG" }) }), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
                        {
                            dataIndex: '$$seq$$',
                            title: '序号',
                            width: 100,
                        },
                        {
                            dataIndex: 'text',
                            title: t('wechatPublicTag:attr.text'),
                            width: 200,
                            ellipsis: true,
                        },
                        {
                            dataIndex: 'wechatId',
                            title: t('wechatPublicTag:attr.wechatId'),
                            width: 100,
                        },
                        {
                            dataIndex: 'sync',
                            title: t('wechatPublicTag:attr.sync'),
                            width: 100,
                            render: function (value, record, index) {
                                return value ? '同步' : '未同步';
                            },
                        },
                        {
                            dataIndex: 'syncAt',
                            title: t('wechatPublicTag:attr.syncAt'),
                            width: 100,
                            render: function (value, record, index) {
                                return (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm');
                            },
                        },
                        {
                            dataIndex: '$$createAt$$',
                            title: '创建时间',
                            width: 100,
                            render: function (value, record, index) {
                                return (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm');
                            },
                        },
                        {
                            dataIndex: '$$updateAt$$',
                            title: '更新时间',
                            width: 100,
                            render: function (value, record, index) {
                                return (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm');
                            },
                        },
                        {
                            dataIndex: 'op',
                            width: 200,
                            title: '操作',
                            align: 'center',
                            render: function (value, record, index) {
                                return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: function () {
                                                goDetail(record.id);
                                            }, children: "\u8BE6\u60C5" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: function () {
                                                goUpdate(record.id);
                                            }, children: "\u66F4\u65B0" })] }));
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
                        onChange: function (current) {
                            setCurrentPage(current);
                        },
                    } })] }) }));
}
exports.default = Render;
