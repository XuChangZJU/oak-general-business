import * as React from 'react';
import { Table, Tag, Button, Modal, Space, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function render(this: any) {
    const { t } = this;
    const { event } = this.props;
    const { userArr = [], oakLoading, stateColor, pagination } = this.state;
    const { pageSize, total, currentPage } = pagination || {};

    return (
        <div style={{ padding: 16 }}>
            <Space>
                <Button
                    type="primary"
                    onClick={() => {
                        this.goNewUser();
                    }}
                >
                    添加用户
                </Button>
            </Space>

            <Table
                loading={oakLoading}
                dataSource={userArr}
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
                        width: 100,
                        dataIndex: 'avatar',
                        title: '头像',
                        render: (value, record, index) => {
                            if (!value) {
                                return (
                                    <Avatar icon={<UserOutlined />}></Avatar>
                                );
                            }
                            return <Avatar src={value} shape="circle" />;
                        },
                    },
                    {
                        dataIndex: 'nickname',
                        title: '昵称',
                    },
                    {
                        dataIndex: 'name',
                        title: '姓名',
                    },
                    {
                        dataIndex: 'mobile',
                        title: '手机号',
                    },
                    {
                        dataIndex: 'userState',
                        title: '状态',
                        render: (value, record, index) => {
                            return (
                                <Tag color={stateColor[value]}>
                                    {t(`user:v.userState.${value}`)}
                                </Tag>
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
                                            this.onCellClicked(
                                                record.id,
                                                event
                                            );
                                        }}
                                    >
                                        详情
                                    </Button>
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            const modal = Modal.confirm!({
                                                title: '确认删除该用户吗？',
                                                content: '删除后，用户不可恢复',
                                                okText: '确定',
                                                cancelText: '取消',
                                                onOk: async (e) => {
                                                    await this.addOperation({
                                                        action: 'remove',
                                                        data: {},
                                                        filter: {
                                                            id: record.id,
                                                        },
                                                    });
                                                    await this.execute();
                                                    modal.destroy!();
                                                },
                                                onCancel: (e) => {
                                                    modal.destroy!();
                                                },
                                            });
                                        }}
                                    >
                                        删除
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
                    onShowSizeChange: (pageSize: number) => {
                        this.setPageSize(pageSize);
                    },
                    onChange: (page: number) => {
                        this.setCurrentPage(page);
                    }
                }}
            />
        </div>
    );
}
