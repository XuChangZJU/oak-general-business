import React, { useState } from 'react';
import { Table } from 'antd';
import Style from './web.module.less';
export default function Render(props) {
    const { rows, oakLoading, getTag, oakPagination } = props.data;
    const { setPageSize, setCurrentPage } = props.methods;
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const { pageSize, total, currentPage } = oakPagination || {};
    return (<div className={Style.container}>
            <Table loading={oakLoading} dataSource={rows || []} rowKey="id" columns={[
            {
                dataIndex: 'text',
                title: '标签名',
            },
        ]} rowSelection={{
            type: 'radio',
            onSelect: (record) => {
                getTag({ id: record.id, name: record.text, wechatId: `${record.wechatId}` });
            },
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys) => {
                setSelectedRowKeys(selectedRowKeys);
            }
        }} onRow={(record) => {
            return {
                onClick: () => {
                    setSelectedRowKeys([record.id]);
                    getTag({ id: record.id, name: record.text, wechatId: `${record.wechatId}` });
                }
            };
        }} pagination={{
            total,
            pageSize,
            current: currentPage,
            onShowSizeChange: (pageSize) => {
                setPageSize(pageSize);
            },
            onChange: (current) => {
                setCurrentPage(current);
            },
        }}/>
        </div>);
}
