"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
const actionBtnPanel_1 = tslib_1.__importDefault(require("oak-frontend-base/es/components/actionBtnPanel"));
function Render(props) {
    const { data, methods } = props;
    const { t, setPageSize, setCurrentPage, goDetailById } = methods;
    const { messages, oakFullpath, oakLoading, oakPagination } = data;
    const { pageSize, total, currentPage } = oakPagination || {};
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { title: "\u6D88\u606F\u901A\u77E5", children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: messages || [], rowKey: "id", 
                // scroll={{ x: 1200 }}
                columns: [
                    {
                        dataIndex: 'serial-number',
                        title: '#',
                        render: (value, record, index) => {
                            return index + 1;
                        },
                    },
                    {
                        dataIndex: 'title',
                        title: '消息内容',
                        render: (value, record, index) => {
                            if (record.visitState === 'unvisited') {
                                return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Badge, { style: { marginRight: 5 }, status: "processing" }), (0, jsx_runtime_1.jsx)(antd_1.Typography.Link, { onClick: () => {
                                                goDetailById(record.id);
                                            }, children: value })] }));
                            }
                            return ((0, jsx_runtime_1.jsx)(antd_1.Typography.Text, { onClick: () => {
                                    goDetailById(record.id);
                                }, children: value }));
                        },
                    },
                    {
                        dataIndex: 'type',
                        title: '类型',
                        render: (value, record, index) => {
                            return '';
                        },
                    },
                    {
                        dataIndex: 'visitState',
                        title: '是否已读',
                        render: (value, record, index) => {
                            return value === 'unvisited' ? '未读' : '已读';
                        },
                    },
                    {
                        dataIndex: '$$createAt$$',
                        title: '接收时间',
                        render: (value, record, index) => {
                            return ((0, jsx_runtime_1.jsx)("div", { children: (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm:ss') }));
                        },
                    },
                    {
                        dataIndex: 'op',
                        width: 300,
                        title: '操作',
                        align: 'center',
                        render: (value, record, index) => {
                            return ((0, jsx_runtime_1.jsx)(actionBtnPanel_1.default, { mode: "table-cell", entity: "message", items: [
                                    {
                                        label: '详情',
                                        onClick: () => {
                                            goDetailById(record.id);
                                        },
                                    },
                                    {
                                        action: 'visit',
                                        show: record['#oakLegalActions']?.includes('visit'),
                                        onClick: async () => {
                                            methods.updateItem({}, record.id, 'visit');
                                            await methods.execute();
                                        },
                                    },
                                ] }));
                        },
                        fixed: 'right',
                    },
                ], pagination: {
                    total: total,
                    pageSize: pageSize,
                    current: currentPage,
                    onShowSizeChange: (current, pageSize) => {
                        setPageSize(pageSize);
                    },
                    onChange: (page, pageSize) => {
                        setCurrentPage(page);
                    },
                } }) }) }));
}
exports.default = Render;
