"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const { TextArea } = antd_1.Input;
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const showNews_1 = tslib_1.__importDefault(require("../showNews"));
function Render(props) {
    const { changeOpen, materials, total, getUrl } = props.data;
    const { getArticleList, setMessage, upload } = props.methods;
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const [url, setUrl] = (0, react_1.useState)('');
    const [selectedRowKeys, setSelectedRowKeys] = (0, react_1.useState)([]);
    const selectRef = (0, react_1.useRef)(null);
    const columns = [
        {
            dataIndex: 'serial-number',
            title: '序号',
            render: (value, record, index) => {
                return index + 1;
            },
            width: 100
        },
        {
            dataIndex: 'url',
            title: '图文链接',
            render: (value, record, index) => {
                if (record.content.news_item.length > 1) {
                    const urlList = record.content.news_item.map((ele) => {
                        return ele.url;
                    });
                    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Select, { ref: selectRef, style: { width: 160 }, bordered: false, value: urlList.includes(url) ? url : '请选择一篇文章', dropdownRender: () => (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.select, children: record.content.news_item.map((ele, index) => ((0, jsx_runtime_1.jsx)(antd_1.Popover, { content: (0, jsx_runtime_1.jsx)("div", { style: { padding: 12 }, children: (0, jsx_runtime_1.jsx)(showNews_1.default, { oakAutoUnmount: true, news: record.content.news_item.filter((ele, index2) => index === index2) }) }), placement: 'right', children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.selectItem, onClick: () => {
                                            selectRef.current.blur();
                                            setUrl(ele.url);
                                            setSelectedRowKeys([record.article_id]);
                                        }, children: ele.url }) }))) }) }) }));
                }
                else {
                    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("div", { children: record.content.news_item[0].url }) }));
                }
            }
        },
        {
            dataIndex: 'update_time',
            title: '更新时间',
            render: (value, record, index) => {
                return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm') });
            }
        },
        {
            dataIndex: 'op',
            title: '操作',
            render: (value, record, index) => {
                return (0, jsx_runtime_1.jsx)(antd_1.Popover, { content: (0, jsx_runtime_1.jsx)("div", { style: { padding: 12 }, children: (0, jsx_runtime_1.jsx)(showNews_1.default, { oakAutoUnmount: true, news: record.content.news_item }) }), children: (0, jsx_runtime_1.jsx)("div", { style: { cursor: 'pointer', color: '#1677ff' }, children: "\u9884\u89C8" }) });
            }
        }
    ];
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.list, children: (0, jsx_runtime_1.jsx)(antd_1.Table, { dataSource: materials, columns: columns, rowKey: "article_id", pagination: {
                        total: total,
                        pageSize: 10,
                        current: currentPage,
                        onChange: (page, pageSize) => {
                            setCurrentPage(page);
                            getArticleList(page);
                        },
                    }, rowSelection: {
                        type: 'radio',
                        selectedRowKeys: selectedRowKeys,
                        onSelect: (record) => {
                            if (record.content.news_item.length > 1) {
                                return;
                            }
                            else {
                                setUrl(record.content.news_item[0].url);
                            }
                        },
                        onChange: (selectedRowKeys) => {
                            setSelectedRowKeys(selectedRowKeys);
                        }
                    } }) }), (0, jsx_runtime_1.jsxs)(antd_1.Space, { style: { display: 'flex', justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { disabled: !url, type: 'primary', onClick: () => {
                            getUrl(url);
                            setUrl('');
                            changeOpen(false);
                        }, children: "\u786E\u5B9A" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => {
                            setUrl('');
                            changeOpen(false);
                        }, children: "\u53D6\u6D88" })] })] }));
}
exports.default = Render;
