import React from 'react';
import { Table, Button, Space, Typography } from 'antd';
export default function Render(props) {
    const { oakPagination, list = [], oakLoading, oakFullpath, } = props.data;
    const { pageSize, total, currentPage } = oakPagination || {};
    const { t, setPageSize, setCurrentPage, goCreate, goDetail, goSetConfig, goUpdate, remove, } = props.methods;
    return (<>
            <Space style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={() => {
            goCreate();
        }}>
                    添加订阅号
                </Button>
            </Space>

            <Table loading={oakLoading} dataSource={list} rowKey="id" columns={[
            // {
            //     dataIndex: 'id',
            //     title: '序号',
            //     render: (value, record, index) => {
            //         return index + 1;
            //     },
            // },
            {
                dataIndex: 'name',
                title: '订阅号名称',
                width: 300,
                render: (value, record, index) => {
                    return (<Typography.Link onClick={() => {
                            goDetail(record.id);
                        }}>
                                    {value}
                                </Typography.Link>);
                },
            },
            {
                dataIndex: 'description',
                title: '描述',
                width: 200,
                ellipsis: true,
            },
            {
                dataIndex: 'config',
                title: '配置',
                align: 'center',
                render: (value, record, index) => {
                    return (<>
                                    <Button type="link" onClick={() => {
                            goSetConfig(record.id);
                        }}>
                                        配置
                                    </Button>
                                </>);
                },
            },
            {
                dataIndex: 'op',
                width: 200,
                title: '操作',
                align: 'center',
                render: (value, record, index) => {
                    return (<>
                                    <Button type="link" onClick={() => {
                            goDetail(record.id);
                        }}>
                                        详情
                                    </Button>
                                    <Button type="link" onClick={() => {
                            goUpdate(record.id);
                        }}>
                                        更新
                                    </Button>
                                    <Button type="link" onClick={() => {
                            remove(record.id);
                        }}>
                                        删除
                                    </Button>
                                </>);
                },
                fixed: 'right',
            },
        ]} pagination={{
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
        </>);
}
