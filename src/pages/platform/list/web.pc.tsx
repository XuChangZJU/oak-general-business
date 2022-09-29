import * as React from 'react';
import { Table, Tag, Button, DialogPlugin, Space, Avatar } from 'tdesign-react';
import { UserIcon } from 'tdesign-icons-react';

export default function render(this: any) {
    const { t } = this;
    const { event } = this.props;
    const { list = [], oakLoading, pagination } = this.state;
    const { pageSize, total, currentPage } = pagination || {};

    return (
        <div style={{ padding: 16 }}>
            <Space>
                <Button
                    size="medium"
                    theme="primary"
                    onClick={() => {
                        this.goNewPlatform();
                    }}
                >
                    添加平台
                </Button>
            </Space>

            <Table
                loading={oakLoading}
                data={list}
                rowKey="id"
                columns={[
                    {
                        colKey: 'id',
                        title: '序号',
                    },
                    {
                        colKey: 'name',
                        title: '名称',
                    },
                    {
                        colKey: 'description',
                        title: '描述',
                        width: 400,
                    },
                    {
                        colKey: 'config',
                        title: '配置',
                        cell: ({ row }) => {
                            return (
                                <>
                                    <Button
                                        theme="primary"
                                        variant="text"
                                        onClick={() => {
                                            this.goSetConfig(row.id);
                                        }}
                                    >
                                        配置
                                    </Button>
                                </>
                            )
                        }
                    },
                    {
                        colKey: 'op',
                        width: 200,
                        title: '操作',
                        align: 'center',
                        cell: ({ row }) => {
                            return (
                                <>
                                    <Button
                                        theme="primary"
                                        variant="text"
                                        onClick={() => {
                                            this.goUpdate(row.id);
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
                    total: total,
                    pageSize: pageSize,
                    current: currentPage,
                    onPageSizeChange: (pageSize: number) => {
                        this.setPageSize(pageSize);
                    },
                }}
            />
        </div>
    );
}
