"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { rows, oakLoading, getTag, oakPagination } = props.data;
    const { setPageSize, setCurrentPage } = props.methods;
    const [selectedRowKeys, setSelectedRowKeys] = (0, react_1.useState)([]);
    const { pageSize, total, currentPage } = oakPagination || {};
    return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: rows || [], rowKey: "id", columns: [
                {
                    dataIndex: 'text',
                    title: '标签名',
                },
            ], rowSelection: {
                type: 'radio',
                onSelect: (record) => {
                    getTag({ id: record.id, name: record.text, wechatId: `${record.wechatId}` });
                },
                selectedRowKeys: selectedRowKeys,
                onChange: (selectedRowKeys) => {
                    setSelectedRowKeys(selectedRowKeys);
                }
            }, onRow: (record) => {
                return {
                    onClick: () => {
                        setSelectedRowKeys([record.id]);
                        getTag({ id: record.id, name: record.text, wechatId: `${record.wechatId}` });
                    }
                };
            }, pagination: {
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
