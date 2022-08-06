import React from 'react';
import { Table, Tag, Button, DialogPlugin, Space, Avatar } from 'tdesign-react';
import { UserIcon } from 'tdesign-icons-react';

export default function render() {
    const { t } = this;
    const { event } = this.props;
    const { userArr = [], oakLoading, stateColor, pagination } = this.state;
    const { step } = pagination || {};

    return (
        <div style={{ padding: 16 }}>
            <Space>
                <Button
                    size="medium"
                    theme="primary"
                    onClick={() => {
                        this.goNewUser();
                    }}
                >
                    添加用户
                </Button>
            </Space>

            <Table
                loading={oakLoading}
                data={userArr}
                rowKey="id"
                columns={[
                    {
                        colKey: 'id',
                        title: '序号',
                    },
                    {
                        width: 100,
                        colKey: 'avatar',
                        title: '头像',
                        cell: ({ row }) => {
                            if (!row.avatar) {
                                return <Avatar icon={<UserIcon />}></Avatar>;
                            }
                            return <Avatar image={row.avatar} shape="circle" />;
                        },
                    },
                    {
                        colKey: 'nickname',
                        title: '昵称',
                    },
                    {
                        colKey: 'name',
                        title: '姓名',
                    },
                    {
                        colKey: 'mobile',
                        title: '手机号',
                    },
                    {
                        colKey: 'userState',
                        title: '状态',
                        cell: ({ row, rowIndex }) => {
                            return (
                                <Tag theme={stateColor[row.userState]}>
                                    {t(`user:v.userState.${row.userState}`)}
                                </Tag>
                            );
                        },
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
                                            this.onCellClicked(row.id, event);
                                        }}
                                    >
                                        详情
                                    </Button>
                                    <Button
                                        theme="primary"
                                        variant="text"
                                        onClick={() => {
                                            const confirmDia =
                                                DialogPlugin.confirm({
                                                    header: '确认删除该用户吗？',
                                                    body: '删除后，用户不可恢复',
                                                    confirmBtn: '确定',
                                                    cancelBtn: '取消',
                                                    onConfirm: async ({
                                                        e,
                                                    }) => {
                                                        await this.execute(
                                                            'remove'
                                                        );
                                                        confirmDia.hide();
                                                    },
                                                    onClose: ({
                                                        e,
                                                        trigger,
                                                    }) => {
                                                        confirmDia.hide();
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
                    total: 30,
                    pageSize: step,
                    onPageSizeChange: (pageSize: number) => {
                        this.setPageSize(pageSize)
                        
                    },
                }}
            />
        </div>
    );
}
