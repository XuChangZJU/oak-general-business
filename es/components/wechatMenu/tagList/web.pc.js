import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Table } from 'antd';
import Style from './web.module.less';
export default function Render(props) {
    const { rows, oakLoading, getTag } = props.data;
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    return (_jsx("div", { className: Style.container, children: _jsx(Table, { loading: oakLoading, dataSource: rows || [], rowKey: "id", columns: [
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
            }, pagination: false }) }));
}
