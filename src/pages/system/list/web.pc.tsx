import * as React from 'react';
import { Table, Button, Space, Typography, Modal } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import SystemUpsert from '../../../pages/system/upsert';

import Style from './web.module.less';

export default function render(this: any) {
    const { variant, namespace, platformId, showBack } = this.props;

    const { list = [], oakLoading, pagination } = this.state;
    const { pageSize, total, currentPage } = pagination || {};

    return (
        <Container showBack={showBack} variant={variant}>
            <Space>
                <Button
                    type="primary"
                    onClick={() => {
                        this.goCreate();
                    }}
                >
                    添加系统
                </Button>
            </Space>

            <Table
                loading={oakLoading}
                dataSource={list}
                rowKey="id"
                columns={[
                    // {
                    //     dataIndex: 'id',
                    //     title: '序号',
                    //     render: (value, record, index) => {
                    //         return index + 1;
                    //     },
                    // },
                    {
                        dataIndex: 'name',
                        title: '系统名称',
                        width: 300,
                        render: (value, record, index) => {
                            return (
                                <Typography.Link
                                    onClick={() => {
                                        this.goDetail(record.id);
                                    }}
                                >
                                    {value}
                                </Typography.Link>
                            );
                        },
                    },
                    {
                        dataIndex: 'description',
                        title: '描述',
                        width: 200,
                        ellipsis: true,
                    },
                    {
                        dataIndex: 'super',
                        title: '是否为超级系统',
                        render: (value, record, index) => {
                            return value ? '是' : '否';
                        },
                    },
                    {
                        dataIndex: 'config',
                        title: '配置',
                        align: 'center',
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
                                            this.goDetail(record.id);
                                        }}
                                    >
                                        概览
                                    </Button>
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

            <Modal
                title="创建系统"
                destroyOnClose={true}
                open={this.state.open}
                onCancel={() => {
                    this.setState({
                        open: false,
                    });
                }}
                width="60%"
                onOk={async () => {
                    await this.execute(
                        {
                            action: 'create',
                            data: {
                                id: await generateNewId(),
                            },
                        },
                        // '$system/list-system/upsert'
                    );
                    this.setState({
                        open: false,
                    });
                }}
                okText="确定"
                cancelText="取消"
            >
                <SystemUpsert
                    platformId={platformId}
                    namespace={namespace}
                    variant="dialog"
                    oakPath={this.state.oakFullpath}
                    // oakPath="$system/list-system/upsert"
                />
            </Modal>
        </Container>
    );
}

function Container(props: {
    children: React.ReactNode;
    variant?: 'inline' | 'alone';
    showBack?: boolean;
}) {
    const { children, variant, showBack } = props;
    if (variant === 'inline') {
        return <>{children}</>;
    }
    return (
        <PageHeader showBack={showBack} title="系统管理">
            <div className={Style.container}>{children}</div>
        </PageHeader>
    );
}
