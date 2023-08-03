import * as React from 'react';
import { Table, Button, Typography, Modal } from 'antd';
import dayjs from 'dayjs';
import { WebComponentProps } from 'oak-frontend-base';
import ActionBtnPanel from 'oak-frontend-base/lib/components/actionBtnPanel';
import { EntityDict } from '../../../general-app-domain';
import Style from './web.module.less';
import ParasiteDetail from '../detail';

import { useState } from 'react';
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
            qrCodeUrl: string;
            qrCodeExpiresAt: number;
        },
        {
            cancel: () => void;
            getQrCode: () => Promise<void>;
        }
    >
) {
    const {
        oakPagination,
        oakFullpath,
        list = [],
        oakLoading,
    } = props.data;


    const { pageSize, total, currentPage } = oakPagination || {};

    const { t, setPageSize, setCurrentPage, updateItem, execute, getQrCode } = props.methods;
    const [qrCodeOpen, setQrCodeOpen] = useState(false);
    const [parasiteId, setParasiteId] = useState('');
    return (
        <>
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
                    // {
                    //     dataIndex: 'op',
                    //     width: 200,
                    //     title: '操作',
                    //     align: 'center',
                    //     render: (value, record, index) => {
                    //         return (
                    //             <>
                    //                 <Button
                    //                     type="link"
                    //                     onClick={() => {
                    //                         updateItem(
                    //                             {
                    //                                 expired: true
                    //                             },
                    //                             record.id!,
                    //                             'cancel'
                    //                         );
                    //                         execute();
                    //                     }}
                    //                 >
                    //                     失效
                    //                 </Button>
                    //             </>
                    //         );
                    //     },
                    //     fixed: 'right',
                    // },
                    {
                        width: 200,
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        fixed: 'right',
                        render: (value, record, rowIndex) => {
                            return (
                                <ActionBtnPanel
                                    mode="table-cell"
                                    entity="parasite"
                                    items={[
                                        {
                                            label: '失效',
                                            action: 'cancel',
                                            // alerted: true,
                                            show: record[
                                                '#oakLegalActions'
                                            ]?.includes('cancel'),
                                            onClick: () => {
                                                updateItem(
                                                    { expired: true },
                                                    record.id!,
                                                    'cancel'
                                                );
                                                execute();
                                            },
                                        },
                                        {
                                            label: '采集码',
                                            action: 'qrcode',
                                            show: record[
                                                '#oakLegalActions'
                                            ]?.includes('qrcode'),
                                            // alerted: true,
                                            onClick: async () => {
                                                setParasiteId(record.id!);
                                                setQrCodeOpen(true);
                                            },
                                        },
                                    ]}
                                />
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
            <Modal
                width={786}
                open={qrCodeOpen}
                destroyOnClose={true}
                onCancel={() => {
                    setQrCodeOpen(false);
                }}
                footer={null}
            >
                <ParasiteDetail
                    oakId={parasiteId}
                    oakAutoUnmount={true}
                    oakPath="$parasite/list-parasite/detail"
                />
            </Modal>
        </>
    );
}
