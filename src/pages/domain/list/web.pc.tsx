import * as React from 'react';
import { Table, Button, Space, Typography, Modal, Tag } from 'antd';
import PageHeader from '../../../components/common/pageHeader';

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
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            goDetail(record.id);
                                        }}
                                    >
                                        概览
                                    </Button>
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            goUpdate(record.id);
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
