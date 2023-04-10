import * as React from 'react';
import { Table, Button, Space, Typography, Modal, Tag } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import ActionBtnPanel from '@oak-frontend-base/components/actionBtnPanel';

import Style from './web.module.less';

import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'system',
        true,
        {
            searchValue: string;
            list: EntityDict['system']['Schema'][];
            pagination: any;
            showBack: boolean;
            variant?: 'inline' | 'alone' | 'dialog';
        },
        {
            goDetail: (id: string) => void;
            goCreate: () => void;
            goSetConfig: (id: string) => void;
            goUpdate: (id: string) => void;
        }
    >
) {
    const {
        pagination,
        list = [],
        oakLoading,
        showBack,
        variant,
        oakFullpath,
    } = props.data;

    const { pageSize, total, currentPage } = pagination || {};

    const {
        t,
        setPageSize,
        setCurrentPage,
        goCreate,
        goDetail,
        goSetConfig,
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
                                        goDetail(record.id);
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
                        dataIndex: 'domain$system',
                        title: '访问域名',
                        render: (value, record, index) => {
                            return value
                                ? value.map((ele: { url: string }) => (
                                      <Space direction="vertical">
                                          <Tag>{ele.url}</Tag>
                                      </Space>
                                  ))
                                : '';
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
                                            goSetConfig(record.id);
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
                                        entity="system"
                                        oakAutoUnmount={true}
                                        oakId={record.id}
                                        oakPath={`${oakFullpath}.${record.id}`}
                                        items={[
                                            {
                                                label: '详情',
                                                onClick: () => {
                                                    goDetail(record.id);
                                                },
                                            },

                                            {
                                                action: 'update',
                                                onClick: () => {
                                                    goUpdate(record.id);
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
