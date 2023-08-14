import * as React from 'react';
import { Table, Button, Space, Typography, Modal } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import ActionBtnPanel from 'oak-frontend-base/lib/components/actionBtnPanel';

import Style from './web.module.less';
import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps, RowWithActions } from 'oak-frontend-base';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'application',
        true,
        {
            searchValue: string;
            list: RowWithActions<EntityDict, 'application'>[];
            pagination: any;
            showBack: boolean;
            variant?: 'inline' | 'alone' | 'dialog';
        },
        {
            goDetail: (id: string) => void;
            goCreate: () => void;
            goSetConfig: (id: string) => void;
            goUpdate: (id: string) => void;
            removeApplication: (id: string) => void;
        }
    >
) {
    const {
        oakPagination,
        list = [],
        oakLoading,
        showBack,
        variant,
        oakFullpath,
    } = props.data;

    const { pageSize, total, currentPage } = oakPagination || {};

    const {
        t,
        setPageSize,
        setCurrentPage,
        goCreate,
        goDetail,
        goSetConfig,
        goUpdate,
        removeApplication,
    } = props.methods;

    return (
        <Container variant={variant}>
            <Space>
                <Button
                    type="primary"
                    onClick={() => {
                        goCreate();
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
                                        goDetail(record.id!);
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
                            return t(`application:v.type.${value}`);
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
                                            goSetConfig(record.id!);
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
                                    <ActionBtnPanel
                                        mode="table-cell"
                                        entity="application"
                                        items={[
                                            {
                                                label: '详情',
                                                onClick: () => {
                                                    goDetail(record.id!);
                                                },
                                            },

                                            {
                                                action: 'update',
                                                show: record?.['#oakLegalActions']?.includes('update'),
                                                onClick: () => {
                                                    goUpdate(record.id!);
                                                },
                                            },
                                            {
                                                action: 'remove',
                                                alerted: true,
                                                show: record?.['#oakLegalActions']?.includes('remove'),
                                                onClick: () => {
                                                    removeApplication(
                                                        record.id!
                                                    );
                                                },
                                            },
                                        ]}
                                    />
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
                        setPageSize(pageSize);
                    },
                    onChange: (current: number) => {
                        setCurrentPage(current);
                    },
                }}
            />
        </Container>
    );
}

function Container(props: {
    children: React.ReactNode;
    variant?: 'inline' | 'alone' | 'dialog';
    showBack?: boolean;
}) {
    const { children, variant = 'alone', showBack } = props;
    if (['inline', 'dialog'].includes(variant)) {
        return <>{children}</>;
    }
    return (
        <PageHeader showBack={showBack} title="应用管理">
            <div className={Style.container}>{children}</div>
        </PageHeader>
    );
}
