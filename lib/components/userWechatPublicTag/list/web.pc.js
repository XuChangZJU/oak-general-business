"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const { confirm } = antd_1.Modal;
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
function Render(props) {
    const { data, methods } = props;
    const { t, setPageSize, setCurrentPage, sync, } = methods;
    const { userWechatPublicTags, showBack = true, oakLoading, oakPagination, applicationId, oakFullpath } = data;
    const { pageSize, total, currentPage } = oakPagination || {};
    return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: userWechatPublicTags, rowKey: "id", columns: [
                {
                    dataIndex: 'text',
                    title: '标签名称',
                    width: 150,
                    ellipsis: true,
                },
                {
                    dataIndex: 'iState',
                    title: '状态',
                    width: 100,
                    render: (value, record, index) => {
                        return value === 'wait' ? '待同步' : value === 'success' ? '同步成功' : '同步失败';
                    },
                },
                {
                    dataIndex: 'syncAt',
                    title: '同步时间',
                    width: 150,
                    render: (value, record, index) => {
                        return value ? (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm') : '--';
                    },
                },
                {
                    dataIndex: '$$createAt$$',
                    title: '创建时间',
                    width: 150,
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
                        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: () => {
                                    sync(record.id, record.openId);
                                }, children: "\u540C\u6B65" }) }));
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
            } }) }));
}
exports.default = Render;
