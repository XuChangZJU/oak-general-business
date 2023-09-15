"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
const actionBtnPanel_1 = tslib_1.__importDefault(require("oak-frontend-base/es/components/actionBtnPanel"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
function Render(props) {
    const { oakPagination, list = [], oakLoading, oakFullpath, oakLegalActions } = props.data;
    const { pageSize, total, currentPage } = oakPagination || {};
    const { t, setPageSize, setCurrentPage, goCreate, goDetail, goSetConfig, goUpdate, } = props.methods;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { title: "\u5E73\u53F0\u7BA1\u7406", children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [oakLegalActions?.includes('create') && ((0, jsx_runtime_1.jsx)(antd_1.Space, { style: { marginBottom: 16 }, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => {
                            goCreate();
                        }, children: "\u6DFB\u52A0\u5E73\u53F0" }) })), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
                        {
                            dataIndex: 'id',
                            title: '#',
                            render: (value, record, index) => {
                                return index + 1;
                            },
                        },
                        {
                            dataIndex: 'name',
                            title: '平台名称',
                            width: 300,
                            render: (value, record, index) => {
                                return ((0, jsx_runtime_1.jsx)(antd_1.Typography.Link, { disabled: !record?.['#oakLegalActions']?.includes('update'), onClick: () => {
                                        goDetail(record.id);
                                    }, children: value }));
                            },
                        },
                        {
                            dataIndex: 'description',
                            title: '描述',
                            width: 200,
                            ellipsis: true,
                        },
                        {
                            dataIndex: '$$createAt$$',
                            title: '创建时间',
                            width: 200,
                            render: (value, record, index) => {
                                return (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm');
                            },
                        },
                        {
                            dataIndex: 'config',
                            title: '配置',
                            align: 'center',
                            render: (value, record, index) => {
                                return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", disabled: !record?.['#oakLegalActions']?.includes('update'), onClick: () => {
                                            goSetConfig(record.id);
                                        }, children: "\u914D\u7F6E" }) }));
                            },
                        },
                        {
                            dataIndex: 'op',
                            width: 200,
                            title: '操作',
                            align: 'center',
                            render: (value, record, index) => {
                                return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(actionBtnPanel_1.default, { mode: "table-cell", entity: "platform", items: [
                                            {
                                                label: '详情',
                                                onClick: () => {
                                                    goDetail(record.id);
                                                },
                                            },
                                            {
                                                action: 'update',
                                                show: record?.['#oakLegalActions']?.includes('update'),
                                                onClick: () => {
                                                    goUpdate(record.id);
                                                },
                                            },
                                        ] }) }));
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
