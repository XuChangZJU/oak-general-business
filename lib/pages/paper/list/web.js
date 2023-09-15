"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
function render(props) {
    const { pagination, articles = [], oakLoading, searchValue, title, showBack = false, } = props.data;
    const { pageSize, total, currentPage } = pagination || {};
    const { t, goUpsert, goDetailById, goUpsertById, searchConfirm, searchValueChange, setCurrentPage, setPageSize, onRemove, } = props.methods;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { title: title || '文章管理', showBack: showBack, children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { flex: "auto", children: (0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => {
                                        goUpsert();
                                    }, children: t('action.add') }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { flex: "none", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u6807\u9898", value: searchValue, allowClear: true, onChange: (e) => {
                                    searchValueChange(e.target.value);
                                }, suffix: (0, jsx_runtime_1.jsx)(icons_1.SearchOutlined, {}), onPressEnter: (e) => {
                                    searchConfirm();
                                } }) })] }), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: articles, rowKey: "index", columns: [
                        {
                            align: 'center',
                            dataIndex: 'serial-number',
                            title: '序号',
                            render(value, record, index) {
                                return index + 1;
                            },
                        },
                        {
                            dataIndex: 'iState',
                            title: t('book:attr.iState'),
                            render: (value, record, index) => {
                                return ((0, jsx_runtime_1.jsx)(antd_1.Tag, { color: "processing", children: t(`book:v.iState.${value}`) }));
                            },
                        },
                        {
                            dataIndex: 'title',
                            title: t('article:attr.title'),
                        },
                        {
                            dataIndex: 'author',
                            title: t('article:attr.author'),
                        },
                        {
                            dataIndex: 'abstract',
                            title: t('article:attr.abstract'),
                        },
                        {
                            dataIndex: 'op',
                            width: 300,
                            title: '操作',
                            align: 'center',
                            render: (value, record, index) => {
                                return ((0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: () => {
                                                goDetailById(record.id);
                                            }, children: "\u8BE6\u60C5" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: () => {
                                                goUpsertById(record.id);
                                            }, children: "\u7F16\u8F91" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: () => {
                                                const modal = antd_1.Modal.confirm({
                                                    title: '确认删除该文章吗？',
                                                    content: '删除后，文章不可恢复',
                                                    okText: '确定',
                                                    cancelText: '取消',
                                                    onOk: async (e) => {
                                                        onRemove(record.id);
                                                        modal.destroy();
                                                    },
                                                    onCancel: (e) => {
                                                        modal.destroy();
                                                    },
                                                });
                                            }, children: "\u5220\u9664" })] }));
                            },
                            fixed: 'right',
                        },
                    ], pagination: {
                        total,
                        pageSize,
                        current: currentPage,
                        onShowSizeChange: (current, pageSize) => {
                            setPageSize(pageSize);
                        },
                        onChange: (current) => {
                            setCurrentPage(current);
                        },
                    } })] }) }));
}
exports.default = render;
