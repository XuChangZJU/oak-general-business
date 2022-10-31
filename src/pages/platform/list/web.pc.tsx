import * as React from 'react';
import { Table, Button, Space } from 'antd';
import Style from './web.module.less';

export default function render(this: any) {
    const { list = [], oakLoading, pagination } = this.state;
    const { pageSize, total, currentPage } = pagination || {};

    return (
        <div className={Style.container}>
            <Space>
                <Button
                    type="primary"
                    onClick={() => {
                        this.goNewPlatform();
                    }}
                >
                    添加平台
                </Button>
            </Space>

            <Table
                loading={oakLoading}
                dataSource={list}
                rowKey="id"
                columns={[
                    {
                        dataIndex: 'id',
                        title: '序号',
                        render: (value, record, index) => {
                            return index + 1;
                        },
                    },
                    {
                        dataIndex: 'name',
                        title: '名称',
                    },
                    {
                        dataIndex: 'description',
                        title: '描述',
                        width: 400,
                    },
                    {
                        dataIndex: 'config',
                        title: '配置',
                        render: (value, record, index) => {
                            return (
                                <>
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            this.goSetConfig(record.id);
                                        }}
                                    >
                                        配置
                                    </Button>
                                </>
                            );
                        },
                    },
                    {
                        dataIndex: 'op',
                        width: 200,
                        title: '操作',
                        align: 'center',
                        render: (value, record, index) => {
                            return (
                                <>
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            this.goUpdate(record.id);
                                        }}
                                    >
                                        更新
                                    </Button>
                                </>
                            );
                        },
                        fixed: 'right',
                    },
                ]}
                pagination={{
                    total,
                    pageSize,
                    current: currentPage,
                    onShowSizeChange: (pageSize: number) => {
                        this.setPageSize(pageSize);
                    },
                    onChange: (current: number) => {
                        this.setCurrentPage(current);
                    },
                }}
            />
        </div>
    );
}
