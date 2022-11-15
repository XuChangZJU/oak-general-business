import * as React from 'react';
import { Table, Button, Space, Typography, Modal } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
// import ApplicationUpsert from '../../../pages/application/upsert';

import Style from './web.module.less';

export default function render(this: any) {
    const { variant, namespace, systemId } = this.props;

    const { list = [], oakLoading, pagination } = this.state;
    const { pageSize, total, currentPage } = pagination || {};

    return (
        <Container variant={variant}>
            <Space>
                <Button
                    type="primary"
                    onClick={() => {
                        this.goCreate();
                    }}
                >
                    添加应用
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
                        title: '应用名称',
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
                        title: '应用描述',
                        width: 200,
                        ellipsis: true,
                    },
                    {
                        dataIndex: 'type',
                        title: '应用类型',
                        render: (value, record, index) => {
                            return this.t(`application:v.type.${value}`);
                        },
                    },
                    {
                        dataIndex: 'config',
                        title: '应用配置',
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
                                        详情
                                    </Button>
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            this.goUpdate(record.id);
                                        }}
                                    >
                                        更新
                                    </Button>
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            this.removeApplication(record.id);
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

            {/* <Modal
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
                        '$application/list-application/upsert'
                    );
                    this.setState({
                        open: false,
                    });
                }}
                okText="确定"
                cancelText="取消"
            >
                <ApplicationUpsert
                    platformId={platformId}
                    namespace={namespace}
                    variant="dialog"
                    oakPath="$application/list-application/upsert"
                />
            </Modal> */}
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
        <PageHeader showBack={showBack} title="应用管理">
            <div className={Style.container}>{children}</div>
        </PageHeader>
    );
}
