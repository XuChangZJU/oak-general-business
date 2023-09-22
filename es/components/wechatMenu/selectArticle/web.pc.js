import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { Button, Table, Space, Input, Popover, Select } from 'antd';
const { TextArea } = Input;
import Style from './web.module.less';
import dayjs from 'dayjs';
import ShowNews from '../showNews';
export default function Render(props) {
    const { changeOpen, materials, total, getUrl } = props.data;
    const { getArticleList, setMessage, upload } = props.methods;
    const [currentPage, setCurrentPage] = useState(1);
    const [url, setUrl] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const selectRef = useRef(null);
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
                    return (_jsx("div", { children: _jsx(Select, { ref: selectRef, style: { width: 160 }, bordered: false, value: urlList.includes(url) ? url : '请选择一篇文章', dropdownRender: () => _jsx("div", { className: Style.select, children: record.content.news_item.map((ele, index) => (_jsx(Popover, { content: _jsx("div", { style: { padding: 12 }, children: _jsx(ShowNews, { oakAutoUnmount: true, news: record.content.news_item.filter((ele, index2) => index === index2) }) }), placement: 'right', children: _jsx("div", { className: Style.selectItem, onClick: () => {
                                            selectRef.current.blur();
                                            setUrl(ele.url);
                                            setSelectedRowKeys([record.article_id]);
                                        }, children: ele.url }) }))) }) }) }));
                }
                else {
                    return (_jsx("div", { children: _jsx("div", { children: record.content.news_item[0].url }) }));
                }
            }
        },
        {
            dataIndex: 'update_time',
            title: '更新时间',
            render: (value, record, index) => {
                return _jsx(_Fragment, { children: dayjs(value).format('YYYY-MM-DD HH:mm') });
            }
        },
        {
            dataIndex: 'op',
            title: '操作',
            render: (value, record, index) => {
                return _jsx(Popover, { content: _jsx("div", { style: { padding: 12 }, children: _jsx(ShowNews, { oakAutoUnmount: true, news: record.content.news_item }) }), children: _jsx("div", { style: { cursor: 'pointer', color: '#1677ff' }, children: "\u9884\u89C8" }) });
            }
        }
    ];
    return (_jsxs("div", { className: Style.container, children: [_jsx("div", { className: Style.list, children: _jsx(Table, { dataSource: materials, columns: columns, rowKey: "article_id", pagination: {
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
                    } }) }), _jsxs(Space, { style: { display: 'flex', justifyContent: 'center' }, children: [_jsx(Button, { disabled: !url, type: 'primary', onClick: () => {
                            getUrl(url);
                            setUrl('');
                            changeOpen(false);
                        }, children: "\u786E\u5B9A" }), _jsx(Button, { onClick: () => {
                            setUrl('');
                            changeOpen(false);
                        }, children: "\u53D6\u6D88" })] })] }));
}
