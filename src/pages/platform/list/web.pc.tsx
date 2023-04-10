import * as React from 'react';
import { Table, Button, Space, Typography } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import ActionBtnPanel from '../../../../../oak-frontend-base/lib/components/actionBtnPanel';

import Style from './web.module.less';
import dayjs from 'dayjs';

import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps, RowWithActions } from 'oak-frontend-base';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'platform',
        true,
        {
            searchValue: string;
            list: RowWithActions<EntityDict, 'platform'>[];
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
        <PageHeader title="平台管理">
            <div className={Style.container}>
                <Space>
                    <Button
                        type="primary"
                        onClick={() => {
                            goCreate();
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
                        // {
                        //     dataIndex: 'id',
                        //     title: '序号',
                        //     render: (value, record, index) => {
                        //         return index + 1;
                        //     },
                        // },
                        {
                            dataIndex: 'name',
                            title: '平台名称',
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
                            title: '描述',
                            width: 200,
                            ellipsis: true,
                        },
                        {
                            dataIndex: '$$createAt$$',
                            title: '创建时间',
                            width: 200,
                            render: (value, record, index) => {
                                return dayjs(value).format('YYYY-MM-DD HH:mm');
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
                                            entity="platform"
                                            oakAutoUnmount={true}
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
            </div>
        </PageHeader>
    );
}
