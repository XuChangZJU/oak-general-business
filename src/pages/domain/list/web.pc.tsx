import * as React from 'react';
import { Table, Button, Space, Typography, Modal, Tag } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import ActionBtnPanel from 'oak-frontend-base/lib/components/actionBtnPanel';

import Style from './web.module.less';

import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps, RowWithActions } from 'oak-frontend-base';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'domain',
        true,
        {
            searchValue: string;
            list: RowWithActions<EntityDict, 'domain'>[];
            pagination: any;
            showBack: boolean;
            variant?: 'inline' | 'alone' | 'dialog';
        },
        {
            goDetail: (id: string) => void;
            goCreate: () => void;
            goUpdate: (id: string) => void;
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
        goUpdate,
    } = props.methods;

    return (
        <Container showBack={showBack} variant={variant}>
            <Space>
                <Button
                    type="primary"
                    onClick={() => {
                        goCreate();
                    }}
                >
                    添加域名
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
                        dataIndex: 'url',
                        title: '域名',
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
                        dataIndex: 'apiPath',
                        title: '请求路径',
                    },
                    {
                        dataIndex: 'port',
                        title: '端口',
                    },
                    {
                        dataIndex: 'protocol',
                        title: '协议',
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
                                        entity="domain"
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
        <PageHeader showBack={showBack} title="系统管理">
            <div className={Style.container}>{children}</div>
        </PageHeader>
    );
}
