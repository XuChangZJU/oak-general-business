import * as React from 'react';
import { Table, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import { WebComponentProps } from 'oak-frontend-base';
import PageHeader from '../../../components/common/pageHeader';
import { EntityDict } from '../../../oak-app-domain';
import Style from './web.module.less';

export default function render(
    props: WebComponentProps<
        EntityDict,
        'userEntityGrant',
        true,
        {
            searchValue: string;
            list: EntityDict['userEntityGrant']['Schema'][];
            pagination: any;
            showBack: boolean;
            variant?: 'inline' | 'alone' | 'dialog';
        },
        {}
    >
) {
    const {
        oakPagination,
        oakFullpath,
        list = [],
        oakLoading,
        showBack,
        variant,
    } = props.data;

    const { pageSize, total, currentPage } = oakPagination || {};

     const { t, setPageSize, setCurrentPage } = props.methods;

    return (
        <Container showBack={showBack} variant={variant}>
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
                        title: '授权人',
                        render: (value, record, index) => {
                            return (
                                <Space direction="vertical">
                                    <Typography.Text>
                                        姓名：{record.granter?.name || '-'}
                                    </Typography.Text>
                                    <Typography.Text>
                                        昵称：{record.granter?.nickname}
                                    </Typography.Text>
                                </Space>
                            );
                        },
                    },
                    {
                        dataIndex: 'number',
                        title: '邀请成员数',
                        render: (value, record, index) => {
                            return `${value || 0}人`;
                        },
                    },
                    {
                        dataIndex: 'confirmed',
                        title: '加入成员数',
                        render: (value, record, index) => {
                            return `${value || 0}人`;
                        },
                    },
                    {
                        dataIndex: 'type',
                        title: '授权类型',
                        render: (value, record, index) => {
                            return t(`userEntityGrant:v.type.${value}`);
                        },
                    },
                    {
                        dataIndex: 'relation',
                        title: '权限',
                        render: (value, record, index) => {
                            return value.display || t(`${record.entity}:r.${value.name}`);
                        },
                    },
                    {
                        dataIndex: '$$createAt$$',
                        title: '创建时间',
                        render: (value, record, index) => {
                            return dayjs(value).format('YYYY-MM-DD HH:mm');
                        },
                    },
                    {
                        dataIndex: 'expired',
                        title: '状态',
                        render: (value, record, index) => {
                            return (
                                <Typography.Text
                                    type={record.expired ? 'danger' : 'success'}
                                >
                                    {record.expired ? '失效' : '有效'}
                                    {!record.expired && (
                                        <Typography.Text>
                                            &nbsp;
                                            {dayjs(record.expiresAt).format(
                                                'YYYY-MM-DD HH:mm'
                                            )}
                                        </Typography.Text>
                                    )}
                                </Typography.Text>
                            );
                        },
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
        <PageHeader showBack={showBack} title="授权记录">
            <div className={Style.container}>{children}</div>
        </PageHeader>
    );
}
