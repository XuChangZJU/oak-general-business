"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const pageHeader_1 = tslib_1.__importDefault(require("../../../../components/common/pageHeader"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
function Render(props) {
    const { data, methods } = props;
    const { t, setPageSize, setCurrentPage, goCreate, goDetail, goUpdate, goDelete, } = methods;
    const { list, showBack = true, oakLoading, oakPagination } = data;
    const { pageSize, total, currentPage } = oakPagination || {};
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { title: "\u5FAE\u4FE1\u516C\u4F17\u53F7\u6807\u7B7E", showBack: showBack, children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => {
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
                            render: (value, record, index) => {
                                return value ? '同步' : '未同步';
                            },
                        },
                        {
                            dataIndex: 'syncAt',
                            title: t('wechatPublicTag:attr.syncAt'),
                            width: 100,
                            render: (value, record, index) => {
                                return (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm');
                            },
                        },
                        {
                            dataIndex: '$$createAt$$',
                            title: '创建时间',
                            width: 100,
                            render: (value, record, index) => {
                                return (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm');
                            },
                        },
                        {
                            dataIndex: '$$updateAt$$',
                            title: '更新时间',
                            width: 100,
                            render: (value, record, index) => {
                                return (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm');
                            },
                        },
                        {
                            dataIndex: 'op',
                            width: 200,
                            title: '操作',
                            align: 'center',
                            render: (value, record, index) => {
                                return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: () => {
                                                goDetail(record.id);
                                            }, children: "\u8BE6\u60C5" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: () => {
                                                goUpdate(record.id);
                                            }, children: "\u66F4\u65B0" })] }));
                            },
                            fixed: 'right',
                        },
                    ], pagination: {
                        total,
                        pageSize,
                        current: currentPage,
                        onShowSizeChange: (pageSize) => {
                            setPageSize(pageSize);
                        },
                        onChange: (current) => {
                            setCurrentPage(current);
                        },
                    } })] }) }));
}
exports.default = Render;
