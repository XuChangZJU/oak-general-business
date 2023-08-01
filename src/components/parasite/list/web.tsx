import * as React from 'react';
import { Table, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import Style from './web.module.less';

export default function render(
    props: WebComponentProps<
        EntityDict,
        'parasite',
        true,
        {
            searchValue: string;
            list: EntityDict['userEntityGrant']['Schema'][];
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
        variant,
    } = props.data;

    const { pageSize, total, currentPage } = oakPagination || {};

     const { t, setPageSize, setCurrentPage } = props.methods;

    return (
        <Container variant={variant}>
            <Table
                loading={oakLoading}
                dataSource={list}
                rowKey="id"
                columns={[
                    {
                        dataIndex: 'id',
                        title: '#',
                        render: (value, record, index) => {
                            return index + 1;
                        },
                    },
                    {
                        dataIndex: ['user', 'nickname'],
                        title: '姓名',
                        render: (value, record, index) => {
                            return value || '--';
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
}) {
    const { children, variant = 'alone' } = props;
    if (['inline', 'dialog'].includes(variant)) {
        return <>{children}</>;
    }
    return <div className={Style.container}>{children}</div>;
}
