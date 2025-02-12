import React from 'react';
import { Button, Badge, Table, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import ActionBtnPanel from 'oak-frontend-base/es/components/actionBtnPanel';

import { WebComponentProps, RowWithActions } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';

const MessageType = {
    adminNotification: '系统通知',
    conversationMessage: '客服消息',
};


export default function Render(
    props: WebComponentProps<
        EntityDict,
        'message',
        true,
        {
            messages: RowWithActions<EntityDict, 'message'>[];
        },
        {
            goDetailById: (id: string) => void;
        }
    >
) {
    const { data, methods } = props;
    const { t, setPageSize, setCurrentPage, goDetailById } = methods;
    const { messages, oakFullpath, oakLoading, oakPagination } = data;
    const { pageSize, total, currentPage } = oakPagination || {};

    return (
        <Table
            loading={oakLoading}
            dataSource={messages || []}
            rowKey="id"
            // scroll={{ x: 1200 }}
            columns={[
                // {
                //     dataIndex: 'serial-number',
                //     title: '序号',
                //     render: (value, record, index) => {
                //         return index + 1;
                //     },
                // },
                {
                    dataIndex: 'title',
                    title: '消息内容',
                    render: (value, record, index) => {
                        if (record.visitState === 'unvisited') {
                            return (
                                <>
                                    <Badge
                                        style={{ marginRight: 5 }}
                                        status="processing"
                                    ></Badge>
                                    <Typography.Link
                                        onClick={() => {
                                            goDetailById(record.id!);
                                        }}
                                    >
                                        {value}
                                    </Typography.Link>
                                </>
                            );
                        }
                        return (
                            <Typography.Text
                                onClick={() => {
                                    goDetailById(record.id!);
                                }}
                            >
                                {value}
                            </Typography.Text>
                        );
                    },
                },
                {
                    dataIndex: 'type',
                    title: '类型',
                    render: (value, record, index) => {
                        return MessageType[value as keyof typeof MessageType];
                    },
                },
                {
                    dataIndex: 'visitState',
                    title: '是否已读',
                    render: (value, record, index) => {
                        return value === 'unvisited' ? '未读' : '已读';
                    },
                },
                {
                    dataIndex: '$$createAt$$',
                    title: '接收时间',
                    render: (value, record, index) => {
                        return (
                            <div>
                                {dayjs(value).format('YYYY-MM-DD HH:mm:ss')}
                            </div>
                        );
                    },
                },
                {
                    dataIndex: 'op',
                    width: 300,
                    title: '操作',
                    align: 'center',
                    render: (value, record, index) => {
                        return (
                            <ActionBtnPanel
                                mode="table-cell"
                                entity="message"
                                items={[
                                    {
                                        label: '详情',
                                        onClick: () => {
                                            goDetailById(record.id!);
                                        },
                                    },
                                    {
                                        action: 'visit',
                                        show: record[
                                            '#oakLegalActions'
                                        ]?.includes('visit'),
                                        onClick: async () => {
                                            methods.updateItem(
                                                {},
                                                record.id!,
                                                'visit'
                                            );
                                            await methods.execute();
                                        },
                                    },
                                ]}
                            ></ActionBtnPanel>
                        );
                    },
                    fixed: 'right',
                },
            ]}
            pagination={{
                total: total,
                pageSize: pageSize,
                current: currentPage,
                onShowSizeChange: (current: number, pageSize: number) => {
                    setPageSize(pageSize);
                },
                onChange: (page: number, pageSize: number) => {
                    setCurrentPage(page);
                },
            }}
        />
    );
}
